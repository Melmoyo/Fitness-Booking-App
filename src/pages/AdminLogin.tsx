import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../SupabaseClient";
const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.log("Login failed");
      return;
    }
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", data?.user?.id)
      .single();
    if (userData?.role !== "trainer" || userError) {
      alert("Access Denied. Not an trainer");
    } else {
      setFormData({
        email: "",
        password: "",
      });
      navigate("/dashboard");
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
              <form onSubmit={handleLogin} className="py-8 px-10 ">
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
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="outline-black border border-gray-300 rounded-lg px-4 py-2 w-full mt-2 "
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="outline-black border border-gray-300 rounded-lg px-4 py-2 w-full mt-2 "
                    />
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
