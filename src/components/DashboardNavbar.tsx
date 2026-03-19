import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";
{
  /* FontAwesome Icons */
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const DashboardNavbar = ({
  role,
  session,
  fullName,
}: {
  role: string | null;
  session: any;
  fullName: string | null;
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
     alert("Error" + error.message);
      return;
    }

   
    // Navigate to login
    if (role === "trainer") {
      navigate("/login");
    } else {
      navigate("/client_login");
    }
  };
  return (
    <>
      <nav className=" relative flex flex-row justify-between items-center bg-black text-white p-4">
        <div className="logo text-2xl font-bold">Fitness.io</div>
        <div className="space-x-4 flex flex-row  items-center">
          <img
            src="src/assets/user.png"
            alt="avator=icon"
            className="w-10 inline "
          />

          <span>
            Welcome{" "}
            <span className="text-green-500 ml-4">{fullName || "User"}</span>
          </span>
        </div>

        <div>
          <button
            onClick={handleSignOut}
            className="bg-green-400 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
        {/*Hamburger */}
        <button className="md:hidden" onClick={handleClick}>
          <FontAwesomeIcon
            icon={isOpen ? faXmark : faBars}
            size="lg"
            className="text-white"
          />
        </button>
        {isOpen && (
          <ul className=" absolute top-full right-0 bg-green-400 p-12 flex flex-col gap-y-4 text-white md:hidden">
            <li className=" font-inter text-white">
              <Link to="/" className="block hover:text-black hover:font-bold">
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/book"
                className="block hover:text-black hover:font-bold"
              >
                Book
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block hover:text-black hover:font-bold"
              >
                Admin
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default DashboardNavbar;
