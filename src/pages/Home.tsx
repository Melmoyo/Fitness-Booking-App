import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <>
      <section className=" bg-[url('/src/assets/trainer.jpg')] min-h-screen flex items-center bg-cover bg-center ">
        <div className="cta  flex flex-col gap-12 w-full p-8 h-[400px]">
          <div className="w-100  text-white ">
            <h1 className="text-6xl leading-[4rem] font-bold font-outfit min-w-24">
              Train Smarter. Get Stronger
            </h1>
            <div className="cta-buttons flex flex-row gap-x-4 mt-12">
              <a
                href="/booking"
                className="bg-green-400 text-white px-4 py-2 rounded"
              >
                Book
              </a>
              <a
                href="/booking"
                className="bg-gray-400 shadow-lg text-white px-4 py-2 rounded"
              >
                Learn
              </a>
            </div>
          </div>

          <div className="cta-text  text-white mx-auto md:text-right max-w-2xl ml-auto">
            <p>
              Book your personal training sessions online with fleible
              scheduling.Start your transformation today with a trainer who
              knows how to push you toward real results
            </p>
          </div>
        </div>
      </section>

      <section className=" px-8 py-20 text-white  bg-black ">
        <div className="max-w-6xl mx-auto text-center ">
          <div className="space-y-4">
            <h2 className="font-semibold text-2xl font-outfit md:text-1xl font-bold">
              Programs
            </h2>
            <h2 className="text-white font-outfit min-w-1xl font-semibold text-5xl">
              Our training programs
            </h2>
            <p className="text-white ">
              Pick the program that matches your goals & finess level
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            <div className="strength rounded-lg overflow-hidden flex flex-col  border-1 text-left border-gray-300">
              <img
                src="/src/assets/strength.jpg"
                className="w-full h-56 object-cover"
              />
              <div className="p-6 flex flex-col gap-3 ">
                <span className="text-sm uppercase">Strength</span>
                <h3 className="text-xl font-semibold">Strength training</h3>
                <p>
                  Build muscle and power with progressive resistance training.
                </p>
                <div className="flex items-center ">
                  <a href="/booking" className="text-white mt-2">
                    Book
                  </a>
                  <FontAwesomeIcon icon={faAngleRight} className="mt-3" />
                </div>
              </div>
            </div>
            <div className="hiit rounded-lg overflow-hidden flex flex-col  border-1 text-left border-gray-300">
              <img
                src="/src/assets/hiit.jpg"
                className="w-full h-56 object-cover"
              />
              <div className="p-6 flex flex-col gap-3  ">
                <span className="text-sm uppercase ">HIIT</span>
                <h3 className="text-xl  font-semibold">HIIT workouts</h3>
                <p>
                  Burn calories fast wih high-intensity interval training
                  sessions.
                </p>
                <div className="flex items-center ">
                  <a href="/booking" className="text-white mt-2 ">
                    Book
                  </a>
                  <FontAwesomeIcon icon={faAngleRight} className="mt-3" />
                </div>
              </div>
            </div>
            <div className="weightloss rounded-lg  overflow-hidden flex flex-col  border-1 text-left border-gray-300 md:flex-row md:col-span-2">
              <img
                src="/src/assets/weight-loss.jpg"
                className=" flex flex-col w-full md:w-1/2 object-cover"
              />
              <div className="p-6 flex flex-col justify-center gap-3 md:w-1/2">
                <span className="text-sm uppercase">Weight Loss</span>
                <h3 className="text-xl font-semibold">Weight loss coaching </h3>
                <p>
                  Lose weight and keep it off with personalized nutrition
                  guidance.
                </p>
                <div className="flex items-center ">
                  {" "}
                  <a href="/booking" className="text-white mt-2">
                    Book
                  </a>
                  <FontAwesomeIcon icon={faAngleRight} className="mt-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-20 text-black bg-white">
        <div className="max-w-6xl text-center mx-auto">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-1xl font-bold">
              Process
            </h2>
            <h2 className="text-black font-outfit min-w-1xl font-semibold text-5xl">
              Three simple steps to start
            </h2>
            <p>
              Getting started takes minutes.No complicated forms or long waits.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 ">
            <div className="">
              <img
                src="/src/assets/fitness-program.jpg"
                className="w-full h-56 mx-auto mb-4 rounded-lg"
              />
              <h3 className=" text-3xl font-semibold mb-2 md:text-xl">
                Choose a program
              </h3>
              <p>
                Select from strength training, HIIT, or weight loss training.
              </p>
            </div>
            <div className="">
              <img
                src="/src/assets/select-date-time.jpg"
                className="w-full h-56 mx-auto mb-4 rounded-lg"
              />

              <h3 className="text-3xl font-semibold mb-2 md:text-xl">
                Select date and time
              </h3>
              <p>
                Pick a session that fits your schedule with flexible
                availability
              </p>
            </div>
            <div className="">
              <img
                src="/src/assets/confirm-booking.png"
                className="w-full h-56 mx-auto mb-4 rounded-lg"
              />
              <h3 className="text-3xl font-semibold mb-2 md:text-xl">
                Confirm your booking
              </h3>
              <p>
                Complete payment and receive your session details immediately.
              </p>
            </div>
            <div className="md:col-span-3 mt-12">
              <a
                href="/booking"
                className=" hover:bg-green-400 hover:text-white bg-gray-400 text-black shadow-lg px-4 py-2 rounded mt-8 "
              >
                Start
              </a>
              <a href="/booking" className="  px-4 py-2 rounded mt-8 ">
                Book
              </a>
              <FontAwesomeIcon icon={faAngleRight} className="mt-2" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
