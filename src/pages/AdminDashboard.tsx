import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBus,
  faPiggyBank,
  faUserPlus,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  return (
    <>
      <section className="px-8 py-20 text-black bg-white">
        <div className="max-w-6xl text-center mx-auto">
          <div className="space-y-4 md:text-left">
            <h2 className="text-2xl font-semibold md:text-1xl font-bold">
              Control
            </h2>
            <p className="text-black font-outfit min-w-64 font-bold text-4xl ">
              Manage your business from one place.Track clients schedules
              sessions, and handle payments without the friction.
            </p>
            <div className="mx-auto ">
              <a
                href="#"
                className=" hover:bg-green-400 hover:text-white bg-gray-400 text-black shadow-lg px-4 py-2 rounded mt-8 "
              >
                Explore
              </a>
              <a href="#" className="  px-4 py-2 rounded mt-8 ">
                Settings
              </a>
              <FontAwesomeIcon icon={faAngleRight} className="mt-3" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-20 text-black bg-white">
        <div className="max-w-6xl text-center mx-auto">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-1xl font-bold">
              Overview
            </h2>
            <h2 className="text-black font-outfit min-w-1xl font-semibold text-5xl">
              Your business at a glance
            </h2>
            <p>Monitor key metrics in real time</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 ">
            <div className="border-2 border-gray-200 h-[16rem] px-4 rounded-md flex flex-col justify-start py-8 space-y-4 text-left">
              <FontAwesomeIcon icon={faUserPlus} size="xl" className="mt-3" />
              <h3>Total clients trained</h3>
              <p>See your complete roster</p>
              <div>
                <a href="#" className="mt-2">
                  View
                </a>
                <FontAwesomeIcon icon={faAngleRight} className="mt-3" />
              </div>
            </div>

            <div className="border-2 border-gray-200 h-[16rem] px-4 rounded-md flex flex-col justify-start py-8 space-y-4 text-left">
              <FontAwesomeIcon icon={faInbox} size="xl" className="mt-3" />
              <h3>Upcoming bookings this week</h3>
              <p>Stay on top of your schedule</p>
              <div>
                <a href="#" className="mt-2">
                  View
                </a>
                <FontAwesomeIcon icon={faAngleRight} className="mt-3" />
              </div>
            </div>

            <div className="border-2 border-gray-200 h-[16rem] px-4 rounded-md flex flex-col justify-start py-8 space-y-4 text-left">
              <FontAwesomeIcon icon={faPiggyBank} size="xl" className="mt-3" />
              <h3>Revenue earned this month</h3>
              <p>Track your earnings growth</p>
              <div>
                <a href="#" className="mt-2">
                  View
                </a>
                <FontAwesomeIcon icon={faAngleRight} className="mt-3" />
              </div>
            </div>
            <div className="border-2 border-gray-200 h-[16rem] px-4 rounded-md flex flex-col justify-start py-8 space-y-4 text-left">
              <FontAwesomeIcon icon={faBus} size="xl" className="mt-3" />
              <h3>Active training programs</h3>
              <p>Manage all your offerings</p>
              <div>
                <a href="#" className="mt-2">
                  View
                </a>
                <FontAwesomeIcon icon={faAngleRight} className="mt-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-20 text-black bg-white">
        <div className="max-w-6xl text-left mx-auto px-8 py-20">
          <div className="  space-y-8 md:grid grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold md:text-1xl font-bold">
                Activity
              </h2>
              <h2 className="text-black font-outfit min-w-1xl font-semibold text-5xl">
                Your recent training sessions
              </h2>
            </div>
            <div className="space-y-4 ">
              <p>
                Every booking and client interaction appears here. Nothing gets
                missed
              </p>
              <ul className="list-disc pl-4 ">
                <li>Sarah Mitchell</li>
                <li>James Rodriguez</li>
                <li>Emma Thompson</li>
              </ul>

              <div className="mx-auto ">
                <a
                  href="#"
                  className=" hover:bg-green-400 hover:text-white bg-gray-400 text-black shadow-lg px-4 py-2 rounded mt-8 "
                >
                  Export
                </a>
                <a href="#" className="  px-4 py-2 rounded mt-8 ">
                  More
                </a>
                <FontAwesomeIcon icon={faAngleRight} className="mt-3" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
