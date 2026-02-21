import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const BookSession = () => {
  const [formData, setFormData]= useState({
    first_name:"",
    last_name:"",
    email:"",
    phone:"",
    program:"",
    experience:"",
    agree:false

  });
  const handleChange=(e)=>{
    setFormData(e.target.value)
  }
  return (
    <>
      <section className="hero  flex bg-gray-200 justify-evenly items-start ">
        <div className="max-w-2xl space-y-6 ml-8 mx-auto py-8">
          <span className="font-bold">Transform</span>
          <h1 className="text-2xl font-semibold md:max-w-80 text-5xl">
            Train smarter. Get stronger
          </h1>
          <p>
            Book your personal training sessions online with flexible scheduling
            that fits your life.
          </p>
          <div className="cta-buttons flex flex-row gap-x-4 mt-12">
            <a
              href="#booking"
              className="bg-green-400 text-white px-4 py-2 rounded"
            >
              Book
            </a>
            <a
              href="/booking"
              className="bg-gray-400 text-black px-4 py-2 rounded"
            >
              Learn
            </a>
          </div>
        </div>
      </section>

      <section className=" px-8 py-20 text-white bg-black">
        <div className="max-w-6xl mx-auto text-center  ">
          <div className=" ">
            <h2 className="font-semibold text-2xl font-outfit md:text-1xl font-bold">
              Program
            </h2>
            <h2 className="text-black font-outfit min-w-1xl font-semibold text-5xl">
              Strength Training built to last
            </h2>
            <p className="text-white ">
              Six weeks to progressive resistance work
            </p>
          </div>

          <div className="grid grid-cols-1 ml-8 md:grid-cols-2 gap-8 mt-12 rounded-xl  border-1 border-gray-300 rounded-md ">
            <div className="h-96  overflow-hidden">
              <img
                src="/src/assets/strength.jpg"
                className="w-full h-full rounded-lg rounded-tr-none rounded-br-none object-cover"
              />
            </div>
            <div className="text-left flex flex-col justify-center space-y-2 ml-8">
              <h2 className="font-semibold text-md">Training</h2>
              <h3 className="text-2xl font-semibold md:text-4xl">
                Build muscle and power with proven methods
              </h3>
              <p>
                We focus on compound movements and consistent progression. Your
                body responds to what you demand of it.
              </p>
              <div className=" mb-8 ml-2  md:col-span-3 mt-8 ">
                <a
                  href="/booking"
                  className=" hover:bg-green-400 hover:text-white bg-gray-400 text-black shadow-lg px-4 py-2 rounded mt-8 "
                >
                  Details
                </a>
                <a href="#booking" className="  px-4 py-2 rounded mt-8  ">
                  Book
                </a>
                <FontAwesomeIcon icon={faAngleRight} className="mt-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-20 text-black bg-white" id="booking">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4  ">
          <div className="space-y-4 md:col-span-2">
            <h2 className="text-2xl">Booking</h2>
            <h3 className="3xl font-semibold md:text-4xl">
              Reserve your session
            </h3>
            <p>
              Select your preferred time and confirm your training appointment
            </p>

            <div className="md:col-span-3 mt-12 mb-8">
              <div>
                <FontAwesomeIcon icon={faEnvelope} className="mt-2" />
                <span>contact@fitness.io.com</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faPhone} className="mt-2" />
                <span>+1(555) 123-4567</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faLocationDot} className="mt-2" />
                <span>123 Fitness Street, Health City</span>
              </div>
            </div>
            <div></div>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 ">
              <div>
                <label htmlFor="first">First name</label>
                <input
                  type="text"
                  id="first"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="outline-black border border-gray-300 rounded px-4 py-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="last_name">Last name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="outline-none border border-gray-300 rounded px-4 py-2 w-full"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="outline-none border border-gray-300 rounded px-4 py-2 w-full"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="phone">Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="outline-none border border-gray-300 rounded px-4 py-2 w-full"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="program">Which program interestst you?</label>
                <select
                  id="program"
                  name="program"
                  className="  outline-none border border-gray-300 rounded px-4 py-2 w-full"
                >
                  <option value="">Select a program</option>
                  <option value="strength">Strength Training</option>
                  <option value="hiit">HIIT</option>
                  <option value="weight_loss">Weight Loss</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-2  gap-4 font-semibold ">
              <label htmlFor="date" className="  col-span-2 font-normal">
                What is your experience level?
              </label>
              <div className="w-full space-x-4">
                <input
                  type="radio"
                  id="experience"
                  name="experience"
                  value="beginner"
                  className=" inline outline-none border border-gray-300 rounded px-4 py-2 "
                />
                <label htmlFor="experience" className="inline">
                  Complete Beginner
                </label>
              </div>
              <div className="w-full space-x-4">
                <input
                  type="radio"
                  id="experience"
                  name="experience"
                  value="some_experience"
                  className=" inline outline-none border border-gray-300 rounded px-4 py-2 "
                />
                <label htmlFor="experience" className="inline">
                  Some experience
                </label>
              </div>
              <div className="w-full space-x-4">
                <input
                  type="radio"
                  id="experience"
                  name="experience"
                  value="intermediate"
                  className=" outline-none border border-gray-300 rounded px-4 py-2 "
                />
                <label htmlFor="experience" className="">
                  Intermediate lifter
                </label>
              </div>
              <div className="w-full space-x-4">
                <input
                  type="radio"
                  id="experience"
                  name="experience"
                  value="advanced"
                  className="outline-none border border-gray-300 rounded px-4 py-2 "
                />
                <label htmlFor="experience">Advanced athlete</label>
              </div>
              <div className="w-full space-x-4">
                <input
                  type="radio"
                  id="experience"
                  name="experience"
                  value="returning"
                  className="outline-none border border-gray-300 rounded px-4 py-2 "
                />
                <label htmlFor="experience">Returning client</label>
              </div>
              <div className="w-full space-x-4">
                <input
                  type="radio"
                  id="experience"
                  name="experience"
                  value="other"
                  className="outline-none border border-gray-300 rounded px-4 py-2 "
                />
                <label htmlFor="experience">Other </label>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-2  gap-4 font-semibold">
              <label htmlFor="notes" className="l">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="col-span-2 outline-none border border-gray-300 rounded px-4 py-2 w-full h-64"
                placeholder="Tell us about your goals"
              ></textarea>
            </div>
            <div className="mt-2  gap-4 space-x-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
                className="outline-none border border-gray-300 rounded px-4 py-2 "
              />
              <label htmlFor="terms" className="inline">
                I agree to the terms and conditions
              </label>
            </div>
            <div className="mx-auto">
              <button
                type="submit"
                className="bg-green-400 text-white px-4 py-2 rounded mt-4"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="py-10 px-12 bg-gray-200 ">
        <div className="  space-y-4 md: flex-col items-center justify-center">
          <h3 className="text-5xl font-bold text-center">
            Questions before you book?
          </h3>
          <p className="text-center">
            Reach out to our team.We're here to help you get started
          </p>

          <div className="flex flex-row space-x-4 mt-4 mx-auto justify-center">
            <a href="" className="bg-green-400 text-white px-4 py-2 rounded">
              Contact
            </a>
            <a href="" className="bg-gray-400 text-black px-4 py-2 rounded">
              Learn more
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
export default BookSession;
