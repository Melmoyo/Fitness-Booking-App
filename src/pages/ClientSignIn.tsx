import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseClient";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserAuth } from "../Context/AuthContext";

const SignInSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z.string().nonempty("Password is required"),
  rememberMe: z.boolean().optional(),
});
const SignUpSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "First name should be more than 3 characters")
      .refine((val) => /^[A-Za-z]+$/.test(val), {
        message: "Only letters allowed",
      }),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email format"),

    password: z.string().nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
type AuthForm = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
  rememberMe?: boolean;
};
type SignInForm = z.infer<typeof SignInSchema>;
type SignUpForm = z.infer<typeof SignUpSchema>;

const ClientSignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { session, role } = UserAuth();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(() => {

  return !!localStorage.getItem("rememberedEmail");
});
const [isForgotPassword, setIsForgotPassword] = useState(false);
const [forgotEmail, setForgotEmail] = useState("");
const [resetSent, setResetSent] = useState(false);
  const form = useForm<AuthForm>({
    resolver: zodResolver(isSignIn ? SignInSchema : SignUpSchema),
  });
  const {
    register,
    handleSubmit,
    reset,setValue,
    formState: { errors },
  } = form;
const handleForgotPassword = async () => {
  if (!forgotEmail) {
    showAlert("Please enter your email", "error");
    return;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    showAlert("Failed to send reset email: " + error.message, "error");
    return;
  }

  setResetSent(true);
};
  const handleSignIn = async (data: SignInForm) => {
    

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    
    if (error) {
      alert("Failed to sign in" + error.message);
      return;
    }
    if (data.rememberMe) {
    localStorage.setItem("rememberedEmail", data.email);
  } else {
    localStorage.removeItem("rememberedEmail");
  }
    reset();
    navigate("/client_dashboard");

    // const { data: userData, error: profileError } = await supabase
    //   .from("users")
    //   .select("full_name, role")
    //   .eq("id", authData.user.id)
    //   .single();
    // console.log("Users table lookup:", { userData, profileError });
    // if (profileError || !userData) {
    //   alert("Login failed");
    //   return;
    // }
    // if (userData?.role === "client") {
    //   reset();

    //   navigate("/client_dashboard");
    // }
  };
useEffect(() => {
  const savedEmail = localStorage.getItem("rememberedEmail");
  if (savedEmail) {
    setValue("email", savedEmail); 
    setValue("rememberMe", true);
  }
}, []);
  const handleSignUp = async (data: SignUpForm) => {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.log("Sign Up failed: " + error.message);
      return;
    }
    if (!authData.user) return;
    await supabase.auth.updateUser({
      data: { role: "client" },
    });

    await supabase.from("users").insert([
      {
        id: authData.user.id,
        full_name: data.name,
        role: "client",
      },
    ]);

    alert("Sign Up successful");
    reset();

    setIsSignIn(false);
  };

  const onSubmit = async (data: SignInForm | SignUpForm) => {
    if (!isSignIn) {
      await handleSignUp(data as SignUpForm);
      console.log("Signing up with:", data);
    } else {
      await handleSignIn(data as SignInForm);
      console.log("Signing in with:", data);
    }
  };

  return (
    <>
      <section className=" bg-gray-400 ">
        <div className="flex flex-col gap-12 w-full p-8 h-[400px] items-center justify-center">
          <h1 className="text-6xl leading-[4rem] font-bold font-outfit min-w-24 text-white">
            Client Portal
          </h1>
          <p className="text-white text-center mx-auto md:text-right max-w-2xl ml-auto">
            Enter your email and password to access your training
            schedule.Manage your sessions and track your progress with ease.
          </p>
        </div>
      </section>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 px-4">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 md:p-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="font-bold text-4xl text-green-400">Fitness.io</div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center mb-6">
            {isSignIn ? "Client Sign In" : "Client Sign Up"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isSignIn && (
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 ">{errors.name.message}</p>
                )}
              </div>
            )}

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                {...register("email")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 ">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                {...register("password")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 ">{errors.password.message}</p>
              )}
            </div>

            {!isSignIn && (
              <div>
                <label className="block mb-1 font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500  ">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}

            {isSignIn && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("rememberMe")}
                    checked={rememberMe}
  onChange={(e) => {
    setRememberMe(e.target.checked);
    setValue("rememberMe", e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem("rememberedEmail"); 
    }
  }}
                    className="form-checkbox h-4 w-4 text-green-500"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <a href="#" onClick={(e) => {
    e.preventDefault();
    setIsForgotPassword(true);
  }} className="text-sm text-green-500 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium transition"
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {/* Toggle link */}
          <p className="text-center text-sm mt-4">
            {isSignIn ? (
              <>
                Don't have an account?
                <button
                  type="button"
                  onClick={() => setIsSignIn(false)}
                  className="text-green-500 font-medium hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignIn(true)}
                  className="text-green-500 font-medium hover:underline"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </div>
      {isForgotPassword && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl space-y-4">
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Reset Password</h2>
        <button
          onClick={() => {
            setIsForgotPassword(false);
            setResetSent(false);
            setForgotEmail("");
          }}
          className="text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ✕
        </button>
      </div>

      {resetSent ? (
        // Success state
        <div className="space-y-4 text-center">
          <p className="text-green-500 font-semibold">Reset link sent!</p>
          <p className="text-gray-600 text-sm">
            Check your email at <strong>{forgotEmail}</strong> for a password reset link.
          </p>
          <button
            onClick={() => {
              setIsForgotPassword(false);
              setResetSent(false);
              setForgotEmail("");
            }}
            className="w-full bg-green-500 text-white py-2 rounded-md font-medium"
          >
            Back to Sign In
          </button>
        </div>
      ) : (
        // Email input state
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Enter your email and we'll send you a link to reset your password.
          </p>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <button
            onClick={handleForgotPassword}
            className="w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 transition"
          >
            Send Reset Link
          </button>
        </div>
      )}

    </div>
  </div>
)}
    </>
  );
};

export default ClientSignIn;
