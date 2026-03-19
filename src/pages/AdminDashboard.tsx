import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBus,
  faPiggyBank,
  faUserPlus,
  faInbox,
    faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { UserAuth } from "../Context/AuthContext";
import { supabase } from "../SupabaseClient";
// import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  // const navigate = useNavigate();
  const { session, role, fullName } = UserAuth();
   type ModalType = "upcoming" | "past"  | null;
    interface Sessions {
    id: string;
    date: string;
    time: string;
    client: string;
   
  }
   const [user, setUser] = useState<any>(null);
  const today = new Date().toISOString().split("T")[0];
  const [selectedModal, setSelectedModal] = useState<ModalType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pastSessions, setPastSessions] = useState<Sessions[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<Sessions[]>([]);
   
  const [totalClients, setTotalClients] = useState(0);
  const [totalUpcomingSessions, setTotalUpcomingSessions] = useState(0);
const [revenueEarned,setRevenueEarned]= useState(1000);
const [loading, setLoading] = useState(false);


const fetchTrainerData = async () => {
  if (!session?.user) return;

  // Get trainer's programs
  const { data: programs, error: programError } = await supabase
    .from("programs")
    .select("id")
    .eq("trainer_id", session.user.id);

  if (programError || !programs) return;

  const programIds = programs.map((p: any) => p.id);

  if (programIds.length === 0) {

    setTotalClients(0);
    setUpcomingSessions([]);
    setLoading(false);
    return;
  }

  const now = new Date();
  const today = new Date().toISOString().split("T")[0];

  // Get all bookings for trainer's programs
  const { data: bookings, error: bookingError } = await supabase
    .from("bookings")
    .select(`
      id,
      booking_date,
      start_time,
      status,
      first_name,
      last_name,
      email,
      phone,
      programs!bookings_program_fkey (
        name
      )
    `)
    .in("program_id", programIds)
    
    .order("booking_date", { ascending: true });
  

  if (bookingError) {
   
    setLoading(false);
    return;
  }

  // Total unique clients trained (past sessions)
  const pastBookings = (bookings || []).filter((b: any) => {
    const dt = new Date(`${b.booking_date}T${b.start_time}`);
    return dt < now;
  });
  const uniqueClientEmails = new Set(pastBookings.map((b: any) => b.email));
  setTotalClients(uniqueClientEmails.size);

  // Upcoming bookings
  const upcoming = (bookings || []).filter((b: any) => {
    const dt = new Date(`${b.booking_date}T${b.start_time}`);
    return dt >= now;
  });
  setUpcomingSessions(upcoming);
  setTotalUpcomingSessions(upcoming.length);
  setLoading(false);
};

useEffect(() => {
  fetchTrainerData();
}, [session?.user]);

const handleCardClick = async (type: ModalType) => {
  if (!session?.user) return;
  setSelectedModal(type);
 

  const { data: programs } = await supabase
    .from("programs")
    .select("id")
    .eq("trainer_id", session.user.id);

  const programIds = (programs || []).map((p: any) => p.id);



  const now = new Date();

  if (type === "upcoming") {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id,
        booking_date,
        start_time,
        first_name,
        last_name,
        email,
        phone,
        programs!bookings_program_fkey (
          name
        )
      `)
      .in("program_id", programIds)
      .neq("status", "cancelled")
      .order("booking_date", { ascending: true });

    if (error) {
      alert("Error" + error.message);
    
      return;
    }

    const upcoming = (data || []).filter((b: any) => {
      const dt = new Date(`${b.booking_date}T${b.start_time}`);
      return dt >= now;
    }).map((b: any) => ({
      id: b.id,
      date: b.booking_date,
      time: b.start_time?.slice(0, 5),
      client: `${b.first_name} ${b.last_name}`,
      email: b.email,
      phone: b.phone,
      program: b.programs?.name,
    }));

    setUpcomingSessions(upcoming);
  }

 
};

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
               <span className=" text-2xl font-bold text-green-500 md:text-3xl">
                {totalClients}
              </span>
               
              </div>
            </div>

            <div  onClick={async () => (
                setSelectedModal("upcoming"),
                await handleCardClick("upcoming")
              )} className="border-2 border-gray-200 h-[16rem] px-4 rounded-md flex flex-col justify-start py-8 space-y-4 text-left">
              <FontAwesomeIcon icon={faInbox} size="xl" className="mt-3" />
              <h3>Upcoming bookings this week</h3>
              <p>Stay on top of your schedule</p>
              <div>
               
                <span className=" text-2xl font-bold text-green-500 md:text-3xl">
                {totalUpcomingSessions}
              </span>
                
              </div>
            </div>

            <div className="border-2 border-gray-200 h-[16rem] px-4 rounded-md flex flex-col justify-start py-8 space-y-4 text-left">
              <FontAwesomeIcon icon={faPiggyBank} size="xl" className="mt-3" />
              <h3>Revenue earned this month</h3>
              <p>Track your earnings growth</p>
              <div>
               
                <span className=" text-2xl font-bold text-green-500 md:text-3xl">
                R{revenueEarned}
              </span>
               
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

{/*Reusable Modal*/}
      {selectedModal && (
        <div className=" fixed inset-0 flex items-center justify-center ">
          <div className="space-y-4 bg-white w-full max-w-md h-[400px] rounded-2xl p-6 shadow-xl relative md:col-span-2">
            <div className="flex flex-row justify-between">
              <h1 className="text-green-500 text-center text-2xl font-bold">
                Fitness.io
              </h1>
              <button onClick={() => setSelectedModal(null)}>
                <FontAwesomeIcon icon={faRectangleXmark} size="lg" />
              </button>
            </div>
             
            {selectedModal === "upcoming" && (
              <>
                <h2>Upcoming Bookings</h2>
                <table className="w-full border-collapse border-gray-500 ">
                  <thead className="border-b">
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Client</th>
                     
                    </tr>
                  </thead>
                  <tbody className="text-center divide-y divide-x">
                    {upcomingSessions.map((s) => (
                      <tr key={s.id}>
                        <td>{s.date}</td>
                        <td>{s.time}</td>
                        <td>{s.client}</td>
                  
                      </tr>
                    ))}
                  </tbody>
                </table>
                 </>
            
            )}
            </div>
          </div>   
 
  )}
   
    </> 
    ); 
}; 





export default AdminDashboard;
