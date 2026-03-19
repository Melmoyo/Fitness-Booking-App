import { useNavigate } from "react-router-dom";
//import { useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const AdminSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z.string().nonempty("Password is required"),
});
type LoginForm = z.infer<typeof AdminSchema>;

const AdminLogin = () => {
  const form = useForm<LoginForm>({
    resolver: zodResolver(AdminSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    
    if (error) {
      alert("Login failed" + error.message);
      return;
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("full_name, role")
      .eq("id", authData.user.id)
      .single();
   
    if (userError || !userData) {
      alert("No user record found ");
      return;
    }

    if (userData?.role === "trainer") {
 
      reset();

      navigate("/dashboard");
    } else {
    
      alert("Access Denied.Not a trainer");
    }
  };
  return (
    <>
      <section className=" bg-green-400 ">
        <div className="flex flex-col gap-12 w-full p-8 h-[400px] items-center justify-center">
          <h1 className="text-6xl leading-[4rem] font-bold font-outfit min-w-24 text-white">
            Admin Portal
          </h1>
          <p className="text-white text-center mx-auto md:text-right max-w-2xl ml-auto">
            Authorized personnel only.Access your training dashboard and manage
            client services
          </p>
        </div>
      </section>

      <section className="px-8 py-20  ">
        <div className=" flex flex-row  text-left space-y-8  md:text-left px-10 w-full  ">
          <div className="  space-y-4  w-full">
            <div className="grid grid-cols-1 gap-8  space-x-8 md:grid-cols-2   ">
              <form onSubmit={handleSubmit(onSubmit)} className="py-8 px-10 ">
                <h2 className="font-semibold text-2xl font-outfit md:text-1xl font-bold">
                  Secure
                </h2>
                <h2 className=" font-outfit min-w-1xl font-semibold text-5xl">
                  Admin Login
                </h2>
                <p className=" ">
                  Enter your credentials to access the dashboard
                </p>
                <div className="text-left  space-y-4">
                  <div className="w-full space-x-4 mt-4">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      // name="email"
                      id="email"
                      // value={formData.email}
                      // onChange={handleChange}
                      {...register("email")}
                      className="outline-black border border-gray-300 rounded-lg px-4 py-2 w-full mt-2 "
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      // name="password"
                      id="password"
                      // value={formData.password}
                      // onChange={handleChange}
                      {...register("password")}
                      className="outline-black border border-gray-300 rounded-lg px-4 py-2 w-full mt-2 "
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="bg-green-400 text-white px-4 py-2 rounded mt-4"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
              <div className="py-0">
                <img
                  src="/src/assets/hiit.jpg"
                  className="w-full h-full rounded-lg  object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
