import { Link } from "react-router-dom";

type FooterProps = {
  className?: string;
};

const Footer = ({ className = "bg-white text-black" }: FooterProps) => {
  return (
    <>
      <section className={` py-6  ${className}`}>
        <div className="grid grid-cols-1 container mx-auto text-center">
          <div className="logo text-2xl font-bold">Fitness.io</div>
          <div className="nav">
            <ul className=" font-inter flex flex-col md:flex-row justify-center gap-4 mt-4 font-bold">
              <Link
                to="/"
                className="px-4 px-4 hover:text-green-400 text-underline-offset-4 hover:decoration-2 "
              >
                Home
              </Link>
              <Link
                to="/services"
                className="px-4 px-4 hover:text-green-400 text-underline-offset-4 hover:decoration-2 "
              >
                Services
              </Link>
              <Link
                to="#about"
                className="px-4 px-4 hover:text-green-400 text-underline-offset-4 hover:decoration-2"
              >
                About
              </Link>
              <Link
                to="/admin"
                className="px-4 px-4 hover:text-green-400 text-underline-offset-4 hover:decoration-2"
              >
                Admin
              </Link>
              <Link
                to="/contact"
                className="px-4 mb-6 px-4 hover:text-green-400 text-underline-offset-4 hover:decoration-2"
              >
                Contact
              </Link>
            </ul>
          </div>
          <hr className="border-gray-700"></hr>
          <div className="flex flex-col md:flex-row justify-between gap-4 mt-4  mb-12">
            <div className="mx-8  ">
              <ul className="flex flex-col md:flex-row gap-4">
                <Link
                  to="/privacy"
                  className="px-4 hover:text-green-400 text-underline-offset-4"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="px-4 px-4 hover:text-green-400 text-underline-offset-4"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/cookies"
                  className="px-4 mb-4 px-4 hover:text-green-400 text-underline-offset-4"
                >
                  Cookie settings
                </Link>
              </ul>
            </div>
            <div className="md:order-first mx-8">
              <p>&copy;2025 Fitness.io. All rights reserved.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
