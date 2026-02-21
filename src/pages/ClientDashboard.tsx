import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBus,
  faPiggyBank,
  faUserPlus,
  faInbox,
  faEnvelope,
  faPhone, faLocationDot
 
} from "@fortawesome/free-solid-svg-icons";
import {  faYoutube,  faLinkedin, faSquareXTwitter }
from "@fortawesome/free-brands-svg-icons";

const ClientDashboard = () => {
  return (
    <>
      <section className="  bg-gray-500  flex items-center bg-cover bg-center ">
        <div className="cta  text-white flex flex-col gap-12 w-full p-8 h-[400px] md:justify-center items-center">
          <div className="w-100  ">
            <h1 className="text-2xl text-center text-uppercase leading-[4rem] font-bold font-outfit min-w-24">
              Welcome
            </h1>
            <h2 className="text-uppercase  text-center text-6xl font-bold">
              Ready to train
            </h2>
            <div className="cta-text mt-4 text-center    mx-auto md:text-right max-w-2xl ml-auto">
              <p>
                Your sessions are waiting. Check your upcoming bookings and
                manage your training schedule.
              </p>
            </div>
            <div className="cta-buttons mx-auto flex flex-row justify-center gap-x-4 mt-12">
              <Link
                to="/book"
                className="bg-white text-black px-4 py-2 rounded"
              >
                Book
              </Link>
              <a
                href="/booking"
                className="bg-opacity-0 shadow-lg text-white px-4 py-2 rounded border-1 border-white"
              >
                Schedule
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-20 text-black bg-white">
        <div className="max-w-6xl text-left mx-auto md:grid grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-1xl font-bold">
              Overview
            </h2>
            <h2 className="text-black text-uppercase font-outfit min-w-1xl font-semibold text-5xl">
              Track your progress at a glance
            </h2>
            <p>
              See what's ahead and what you've accomplished.Yor training metrics
              are here, ready to show you how far you've come.
            </p>
          </div>
          <div className="grid grid-cols-1 md: gap-8 mt-12 ">
            <div className="border-2 border-gray-200 h-[16rem] px-4 rounded-md flex flex-col justify-start py-8 space-y-4 text-left">
              <FontAwesomeIcon icon={faUserPlus} size="xl" className="mt-3" />
              <h3>Upcoming sessions</h3>
              <p>Your next training appointments are locked in.Everything you need to know is right here.</p>
              
            </div>

            <div className="border-2 border-gray-200 h-[16rem] px-4 rounded-md flex flex-col justify-start py-8 space-y-4 text-left">
              <FontAwesomeIcon icon={faInbox} size="xl" className="mt-3" />
              <h3>Past sessions</h3>
              <p>Look back at the work you've put in.Every session counts towrad your strangth</p>
             
            </div>

            <div className="border-2 border-gray-200 h-[16rem] px-4 rounded-md flex flex-col justify-start py-8 space-y-4 text-left">
              <FontAwesomeIcon icon={faPiggyBank} size="xl" className="mt-3" />
              <h3>Total sessions</h3>
              <p>The number doesnt lie.This is the sum of your commitment and consistency</p>
             
            </div>
            <div className="border-2 border-gray-200 h-[16rem] px-4 rounded-md flex flex-col justify-start py-8 space-y-4 text-left">
              <FontAwesomeIcon icon={faBus} size="xl" className="mt-3" />
              <h3>Membership status</h3>
              <p>Your plan is active and ready.Everything is in order for your training journey</p>
             
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-12 bg-gray-200 ">
        <div className="  space-y-4 md: flex-col items-center justify-center">
          <h3 className="text-5xl font-bold text-center text-uppercase">
            Bookings
          </h3>
          <p className="text-center text-uppercase">
            Your training sessions are scheduled and ready see whats coming next and manage your appointments with ease
          </p>

          <div className="flex flex-row space-x-4 mt-4 mx-auto justify-center">
            <a href="" className="bg-green-400 text-black  px-4 py-2 rounded">
              Reschedule
            </a>
           
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section className=" flex items-center bg-cover bg-center ">
        <div className="cta  text-black flex flex-col gap-12 w-full p-8 ">
          <div className="w-100 md:mx-auto ">
            <h1 className="text-2xl text-center text-uppercase leading-[4rem] font-bold font-outfit ">
              Trainers
            </h1>
            <h2 className="text-uppercase  text-center text-6xl font-bold">
              Your coaches
            </h2>
         
            <div className="cta-text mt-4 text-center  md: max-w-2xl ml-auto">
              <p>
                Meet the trainers pushing you forward.
              </p>
            </div>
            
            </div>
            <div className="md:grid grid-cols-3 gap-x-4 ">
            <div className=" grid grid-col-1 mx-auto text-center border-2 border-black rounded-lg px-12 py-20 cta-buttons  mt-12 ">
              <img src=""/>
              <h3>Marcus Reid</h3>
              <h4>Strength coach</h4>
              <p>Builds power and muscle with precision programming and relentless focus</p>
              <div className="social-links space-x-2">
              <a href="#"
                
                className="bg-white text-black  py-2 rounded"
              >
               <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="#"
                className="bg-white text-black  py-2 rounded"
              >
               <FontAwesomeIcon icon={faYoutube} />
              </a>
                <a
                href="#"
                className="bg-white text-black  py-2 rounded"
              >
               <FontAwesomeIcon icon={faSquareXTwitter} />
              </a>
              
             </div>
            </div>
             <div className="cta-buttons mx-auto grid grid-col-1 place-items-center border-2 border-black rounded-lg px-12 py-20 gap-x-4 mt-12 ">
              <img src=""/>
              <h3>Sarah Chen</h3>
              <h4>HIIT Specialist</h4>
              <p>Drives intensity and results through high-energy training and smart conditioning.</p>
              <div className="social-links space-x-2">
              <a
                href="#"
                className="bg-white text-black  py-2 rounded"
              >
               <FontAwesomeIcon icon={faLinkedin}/>
              </a>
              <a
             href="#"
                className="bg-white text-black py-2 rounded"
              >
               <FontAwesomeIcon icon={faYoutube} />
              </a>
                <a
               href="#"
                className="bg-white text-black  py-2 rounded"
              >
               <FontAwesomeIcon icon={faSquareXTwitter} />
              </a>
              
             </div>
             </div>
              <div className="cta-buttons mx-auto grid grid-col-1 place-items-center border-2 border-black rounded-lg px-12 py-20 grid grid-col-1 place-items-center border-2 border-black rounded-lg px-12 py-20 gap-x-4 mt-12">
              <img src=""/>
              <h3>James Torres</h3>
              <h4>Weight loss coach</h4>
              <p>Transforms bodies and mindsets with sustainable nutrition and training strategies</p>
              <div className="social-links space-x-2">
              <a
                href="#"
                className="bg-white text-black py-2 rounded"
              >
               <FontAwesomeIcon icon={faLinkedin}/>
              </a>
              <a
                href="#"
                className="bg-white text-black py-2 rounded"
              >
               <FontAwesomeIcon icon={faYoutube} />
              </a>
                <a
                href="#"
                className="bg-white text-black  py-2 rounded"
              >
               <FontAwesomeIcon icon={faSquareXTwitter} />
              </a>
              
             </div>
</div>
          </div>
          </div>
        
      </section>

       <section className="  min-h-screen flex items-center bg-cover ">
        <div className="cta  flex flex-col gap-12 w-full p-8 h-[400px] md:flex items-center ">
          <div className="  text-black text-center">
            <h1 className="text-5xl text-uppercase  font-bold font-outfit md:text-6xl">
            Ready for your next session?</h1>
              <div className="cta-text  text-black mx-auto md:text-right max-w-2xl ml-auto">
            <p className="text-center">
              Pick a time that works.Your trainer is ready when you are.
            </p>
          </div>
            <div className="cta-buttons flex flex-row items-center justify-center gap-x-4 mt-12">
              <Link
                to="/book"
                className="bg-green-400 text-white px-4 py-2 rounded "
              >
                Book
              </Link>
              <a
                href="/booking"
                className="bg-opacity-0 shadow-lg text-black px-4 py-2 rounded "
              >
                Browse
              </a>
            </div>
          </div>

          
        </div>
      </section>

       <section className="px-8 py-20 text-black bg-white">
        <div className="max-w-6xl text-left mx-auto px-8 py-20">
          <div className="  space-y-8 md:grid grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold md:text-1xl font-bold">
              Support
              </h2>
              <h2 className="text-black  text-uppercase font-outfit min-w-1xl font-semibold text-5xl">
                Need help?
              </h2>
            </div>
            <div className="space-y-4 ">
              <p>
               We're here when you need us. Reach out with questions about your account or training.
              </p>
              <div className=" space-y-4">
                <div>
                  <FontAwesomeIcon icon={faEnvelope} /><span>Email</span>
                <div>support@fitnessio.com</div>
                </div>
                  <div>
                  <FontAwesomeIcon icon={faPhone} />
                    <span>Phone</span>
                
                  <div>+1(600) 555-0000</div>
                </div>
                  <div>
                  <FontAwesomeIcon icon={faLocationDot} /><span>Office</span>
                <div>456 Fitness Ave, Sydnney,NSW 2000 AU</div>
                </div>
              
                
              </div>

             
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientDashboard;
