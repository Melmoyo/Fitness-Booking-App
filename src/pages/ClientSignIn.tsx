import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseClient";

const ClientSignIn = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const navigate = useNavigate();

  const handleSignIn = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      alert("Failed to sign in" + error.message);
      return;
    }
    const { data: userData, error: profileError } = await supabase
      .from("users")
      .select("role")
      .eq("id", data?.user?.id)
      .single();
    if (profileError) {
      alert("Login failed");
    } else {
      if (userData?.role === "client") {
        navigate("/client_dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  };

  const handleSignUp = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.log("Sign Up failed: " + error.message);
      return;
    } else {
      alert("Sign Up successful");
      await supabase.from("users").insert([
        {
          id: data?.user?.id,
          full_name: formData.name,
          role: "client",
        },
      ]);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        rememberMe: false,
      });
    }
    setIsSignIn(true);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    if (!isSignIn) {
      await handleSignUp(e);
      console.log("Signing up with:", formData);
    } else {
      await handleSignIn(e);
      console.log("Signing in with:", formData);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (!isSignIn) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Confirm Password is required";
      if (
        formData.password &&
        formData.confirmPassword &&
        formData.password !== formData.confirmPassword
      )
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSignIn && (
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {!isSignIn && (
              <div>
                <label className="block mb-1 font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {isSignIn && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="form-checkbox h-4 w-4 text-green-500"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <a href="#" className="text-sm text-green-500 hover:underline">
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
    </>
  );
};

export default ClientSignIn;
