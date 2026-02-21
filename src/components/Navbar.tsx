import { Link } from "react-router-dom";
import { useState } from "react";
{
  /* FontAwesome Icons */
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  {
    /* State for mobile menu and admin dropdown */
  }
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className=" relative flex flex-row justify-between items-center bg-black text-white p-4">
        <div className="logo text-2xl font-bold">Fitness.io</div>
        <ul className="hidden font-inter md:flex flex-row gap-x-4 text-white">
          <li className=" font-inter text-white">
            <Link
              to="/"
              className="hover:text-green-400 text-underline-offset-4 hover:underline hover:decoration-2 hover:decoration-white"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/book"
              className="hover:text-green-400 text-underline-offset-4 hover:underline hover:decoration-2 hover:decoration-white"
            >
              Book
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="hover:text-green-400 text-underline-offset-4 hover:underline hover:decoration-2 hover:decoration-white"
            >
              Admin
            </Link>
            <button onClick={handleClick}>
              <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
            </button>
            {isOpen && (
              <ul className="absolute rounded-md bg-green-400 p-2 hover:bg-gray-200 text-black font-bold mt-4">
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
        <div className="sign-in-button">
          <Link
            to="/client_login"
            className="bg-green-400 text-white px-4 py-2 rounded"
          >
            Sign In
          </Link>
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

export default Navbar;
