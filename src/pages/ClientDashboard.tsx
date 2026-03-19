import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";

import {
  faBus,
  faPiggyBank,
  faUserPlus,
  faInbox,
  faEnvelope,
  faPhone,
  faLocationDot,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faYoutube,
  faLinkedin,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserAuth } from "../Context/AuthContext";

const BookSchema = z.object({
  program: z.string().nonempty("Select a program"),
  date: z.string().nonempty("Select a date"),
  time: z.string().nonempty("Select a time"),
});
type UserForm = z.infer<typeof BookSchema>;

const RescheduleSchema = z.object({
  bookingId: z.string().nonempty("Select a session"),
  program: z.string().nonempty("Select a program"),
  date: z.string().nonempty("Select a date"),
  time: z.string().nonempty("Select a time"),
});
type RescheduleForm = z.infer<typeof RescheduleSchema>;

const CancelSchema = z.object({
  bookingId: z.string().nonempty("Select a session"),
});

type CancelForm = z.infer<typeof CancelSchema>;

const ClientDashboard = () => {
  //The only values to be in the modal
  type ModalType =
    | "upcoming"
    | "past"
    | "book"
    | "reschedule"
    | null
    | "cancel";
  interface Sessions {
    id: string;
    date: string;
    time: string;
    trainer: string;
    program: string;
  }

  const [selectedModal, setSelectedModal] = useState<ModalType>(null);
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [pastSessions, setPastSessions] = useState<Sessions[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<Sessions[]>([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalUpcomingSessions, setTotalUpcomingSessions] = useState(0);
  const [totalPastSessions, setTotalPastSessions] = useState(0);
  const [membershipStatus, _setMembershipStatus] = useState("Starter");
  const [_loading, setLoading] = useState(false);
  const [_isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [rescheduleOptions, setRescheduleOptions] = useState<Sessions[]>([]);
  const [cancelOptions, setCancelOptions] = useState<Sessions[]>([]);
  const [_isCancelOpen, _setIsCancelOpen] = useState(false);
  const form = useForm<UserForm>({
    resolver: zodResolver(BookSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const rescheduleForm = useForm<RescheduleForm>({
    resolver: zodResolver(RescheduleSchema),
  });
  const {
    register: registerReschedule,
    handleSubmit: handleRescheduleSubmit,
    reset: resetReschedule,
    formState: { errors: rescheduleErrors },
  } = rescheduleForm;

  const cancelForm = useForm<CancelForm>({
    resolver: zodResolver(CancelSchema),
  });
  const {
    register: registerCancel,
    handleSubmit: handleCancelSubmit,
    reset: resetCancel,
    formState: { errors: cancelErrors },
  } = cancelForm;
  const { session } = UserAuth();

  // const fetchPastSessions = async () => {
  //   if (!session?.user) return [];

  //   const { data, error } = await supabase
  //     .from("bookings")
  //     .select("*")
  //     .eq("user_id", session.user.id)
  //     .lt("booking_date", today);

  //   if (error) {
  //     alert("Error" + error.message);
  //     return [];
  //   }

  //   return data || [];
  // };
  // const fetchUpcomingSessions = async () => {
  //   if (!session?.user) return [];

  //   const { data, error } = await supabase
  //     .from("bookings")
  //     .select("*")
  //     .eq("user_id", session.user.id)
  //     .gte("booking_date", today);

  //   if (error) {
  //     alert("Error" + error.message);
  //     return [];
  //   }

  //   return data || [];
  // };
  const fetchSessionTotals = async () => {
    if (!session?.user) return;

    const now = new Date();

    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        id,
        booking_date,
        start_time
      `,
      )
      .eq("user_id", session.user.id)
      .neq("status", "cancelled");

    if (error) {
      alert("Error fetching sessions: " + error.message);
      return;
    }

    const pastCount = (data || []).filter((item: any) => {
      const bookingDateTime = new Date(
        `${item.booking_date}T${item.start_time}`,
      );
      return bookingDateTime < now;
    }).length;

    const upcomingCount = (data || []).filter((item: any) => {
      const bookingDateTime = new Date(
        `${item.booking_date}T${item.start_time}`,
      );
      return bookingDateTime >= now;
    }).length;

    const totalCount = data?.length || 0;

    setTotalSessions(totalCount);
    setTotalPastSessions(pastCount);
    setTotalUpcomingSessions(upcomingCount);
  };
  useEffect(() => {
    fetchSessionTotals();
  }, [session?.user]);

  const handleCardClick = async (type: ModalType) => {
    if (!session?.user) return;
    setSelectedModal(type);
    setLoading(true);

    const now = new Date();
    const today = new Date().toISOString().split("T")[0];
    if (type === "past") {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
      id,
      booking_date,
      start_time,
      programs (
        name,
        trainer:trainer_id (
          full_name
        )
      )
    `,
        )
        .eq("user_id", session.user.id)
        .lt("booking_date", today)
        .order("booking_date", { ascending: false });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      const past = (data || []).filter((item: any) => {
        const bookingDateTime = new Date(
          `${item.booking_date}T${item.start_time}`,
        );
        return bookingDateTime < now;
      });

      const formatted = past.map((item: any) => ({
        id: item.id,
        date: item.booking_date,
        time: item.start_time.slice(0, 5),
        program: item.programs?.name,
        trainer: item.programs?.trainer?.full_name,
      }));

      setPastSessions(formatted);
    }

    if (type === "upcoming") {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
      id,
      booking_date,
      start_time,
      programs (
        name,
        trainer:trainer_id (
          full_name
        )
      )
    `,
        )
        .eq("user_id", session.user.id)
        .eq("status", "upcoming")
        .gte("booking_date", today)
        .order("booking_date", { ascending: true });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
      const upcoming = (data || []).filter((item: any) => {
        const bookingDateTime = new Date(
          `${item.booking_date}T${item.start_time}`,
        );
        return bookingDateTime >= now;
      });
      const formatted = upcoming.map((item: any) => ({
        id: item.id,
        date: item.booking_date,
        time: item.start_time.slice(0, 5),
        program: item.programs?.name,
        trainer: item.programs?.trainer?.full_name,
      }));

      setUpcomingSessions(formatted);
    }

    setLoading(false);
  };

  {
    /*Submit Booking*/
  }
  const onSubmit = async (data: UserForm) => {
    const userId = session?.user?.id;
    const { data: programData, error: programError } = await supabase
      .from("programs")
      .select("id, trainer_id")
      .eq("name", data.program)
      .single();

    if (programError || !programData) {
      alert("program not found" + programError.message);
      return;
    }
    const programId = programData.id;
    const { error } = await supabase.from("bookings").insert([
      {
        user_id: userId,
        program_id: programId,
        booking_date: data.date,
        start_time: data.time,
      },
    ]);
    if (error) {
      alert("Failed to book");
    } else {
      alert("Session Booked");
      reset();
      setIsModalOpen(false);
      await fetchSessionTotals();
    }
  };
  const timeOptions = Array.from({ length: 33 }, (_, i) => {
    // 5:00 AM is start, 30-minute intervals
    const totalMinutes = 5 * 60 + i * 30;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  });

  const fetchRescheduleOptions = async () => {
    if (!session?.user) return;
    const now = new Date();
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
      id,
      booking_date,
      start_time,
      programs!bookings_program_fkey (
        name,
        trainer_id
      )
    `,
      )
      .eq("user_id", session.user.id)
      .eq("status", "upcoming")
      .gte("booking_date", today)
      .order("booking_date", { ascending: true });

    if (error) {
      alert(error.message);
      return;
    }

    const formatted = (data || [])
      .filter((item: any) => {
        const bookingDateTime = new Date(
          `${item.booking_date}T${item.start_time}`,
        );
        return bookingDateTime >= now; // ← only truly upcoming
      })
      .map((item: any) => ({
        id: item.id,
        date: item.booking_date,
        time: item.start_time?.slice(0, 5),
        program: item.programs?.name,
        trainer: "",
      }));

    setRescheduleOptions(formatted);
  };
  const onReschedule = async (data: RescheduleForm) => {
    const { data: programData, error: programError } = await supabase
      .from("programs")
      .select("id")
      .eq("name", data.program)
      .single();

    if (programError || !programData) {
      alert("Program not found");
      return;
    }

    const { error } = await supabase
      .from("bookings")
      .update({
        program_id: programData.id,
        booking_date: data.date,
        start_time: data.time,
      })
      .eq("id", data.bookingId);

    if (error) {
      alert("Failed to reschedule: " + error.message);
    } else {
      alert("Session rescheduled!");
      resetReschedule();
      setIsRescheduleOpen(false);
      await fetchSessionTotals();
    }
  };

  const fetchCancelOptions = async () => {
    if (!session?.user) return;

    const now = new Date();
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
      id,
      booking_date,
      start_time,
      programs!bookings_program_fkey (
        name
      )
    `,
      )
      .eq("user_id", session.user.id)
      .eq("status", "upcoming")
      .gte("booking_date", today)
      .order("booking_date", { ascending: true });

    if (error) {
      alert("Error" + error.message);
      return;
    }

    const formatted = (data || [])
      .filter((item: any) => {
        const bookingDateTime = new Date(
          `${item.booking_date}T${item.start_time}`,
        );
        return bookingDateTime >= now;
      })
      .map((item: any) => ({
        id: item.id,
        date: item.booking_date,
        time: item.start_time?.slice(0, 5),
        program: item.programs?.name,
        trainer: "",
      }));

    setCancelOptions(formatted);
  };

  const onCancel = async (data: CancelForm) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", data.bookingId)
      .neq("status", "cancelled");

    if (error) {
      alert("Failed to cancel session: " + error.message);
    } else {
      alert("Session cancelled successfully");
      resetCancel();
      setSelectedModal(null);
      await fetchSessionTotals();
    }
  };
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
              <button
                onClick={() => setSelectedModal("book")}
                className="bg-white text-black px-4 py-2 rounded"
              >
                Book
              </button>
              <button
                onClick={async () => {
                  await fetchCancelOptions();
                  setSelectedModal("cancel");
                }}
                className="bg-green-400 text-black  px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*Cards Populate Data*/}
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
            <div
              className="border-2 border-gray-200 h-[16rem] px-4 rounded-md flex flex-col justify-start py-8 space-y-4 text-left"
              onClick={async () => (
                setSelectedModal("upcoming"),
                await handleCardClick("upcoming")
              )}
            >
              <FontAwesomeIcon icon={faUserPlus} size="xl" className="mt-3" />
              <h3>Upcoming sessions</h3>
              <p>
                Your next training appointments are locked in. Everything you
                need to know is right here.
              </p>
              <span className=" text-2xl font-bold text-green-500 md:text-3xl">
                {totalUpcomingSessions}
              </span>
            </div>

            <div
              className="border-2 border-gray-200 h-[16rem] px-4 rounded-md flex flex-col justify-start py-8 space-y-4 text-left"
              onClick={async () => (
                setSelectedModal("past"),
                await handleCardClick("past")
              )}
            >
              <FontAwesomeIcon icon={faInbox} size="xl" className="mt-3" />
              <h3>Past sessions</h3>
              <p>
                Look back at the work you've put in. Every session counts toward
                your strength
              </p>
              <span className=" text-2xl font-bold text-green-500 md:text-3xl">
                {totalPastSessions}
              </span>
            </div>

            <div className="border-2 border-gray-200 h-[16rem] px-4 rounded-md flex flex-col justify-start py-8 space-y-4 text-left">
              <FontAwesomeIcon icon={faPiggyBank} size="xl" className="mt-3" />
              <h3>Total sessions</h3>
              <p>
                The number doesnt lie.This is the sum of your commitment and
                consistency
              </p>
              <span className=" text-2xl font-bold text-green-500 md:text-3xl">
                {totalSessions}
              </span>
            </div>
            <div className="border-2 border-gray-200 h-[16rem] px-4 rounded-md flex flex-col justify-start py-8 space-y-4 text-left">
              <FontAwesomeIcon icon={faBus} size="xl" className="mt-3" />
              <h3>Membership status</h3>
              <p>
                Your plan is active and ready.Everything is in order for your
                training journey
              </p>
              <span className=" text-2xl font-bold text-green-500 md:text-3xl">
                {membershipStatus}
              </span>
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
            Your training sessions are scheduled and ready see whats coming next
            and manage your appointments with ease
          </p>

          <div className="flex flex-row space-x-4 mt-4 mx-auto justify-center">
            <button
              onClick={async () => {
                await fetchRescheduleOptions();
                setSelectedModal("reschedule");
              }}
              className="bg-green-400 text-black  px-4 py-2 rounded"
            >
              Reschedule
            </button>
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
              <p>Meet the trainers pushing you forward.</p>
            </div>
          </div>
          <div className="md:grid grid-cols-3 gap-x-4 ">
            <div className=" grid grid-col-1 mx-auto text-center border-2 border-black rounded-lg px-12 py-20 cta-buttons  mt-12 ">
              <img src="#" />
              <h3>Marcus Reid</h3>
              <h4>Strength coach</h4>
              <p>
                Builds power and muscle with precision programming and
                relentless focus
              </p>
              <div className="social-links space-x-2">
                <a href="#" className="bg-white text-black  py-2 rounded">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="#" className="bg-white text-black  py-2 rounded">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="#" className="bg-white text-black  py-2 rounded">
                  <FontAwesomeIcon icon={faSquareXTwitter} />
                </a>
              </div>
            </div>
            <div className="cta-buttons mx-auto grid grid-col-1 place-items-center border-2 border-black rounded-lg px-12 py-20 gap-x-4 mt-12 ">
              <img src="#" />
              <h3>Sarah Chen</h3>
              <h4>HIIT Specialist</h4>
              <p>
                Drives intensity and results through high-energy training and
                smart conditioning.
              </p>
              <div className="social-links space-x-2">
                <a href="#" className="bg-white text-black  py-2 rounded">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="#" className="bg-white text-black py-2 rounded">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="#" className="bg-white text-black  py-2 rounded">
                  <FontAwesomeIcon icon={faSquareXTwitter} />
                </a>
              </div>
            </div>
            <div className="cta-buttons mx-auto grid grid-col-1 place-items-center border-2 border-black rounded-lg px-12 py-20 grid grid-col-1 place-items-center border-2 border-black rounded-lg px-12 py-20 gap-x-4 mt-12">
              <img src="" />
              <h3>James Torres</h3>
              <h4>Weight loss coach</h4>
              <p>
                Transforms bodies and mindsets with sustainable nutrition and
                training strategies
              </p>
              <div className="social-links space-x-2">
                <a href="#" className="bg-white text-black py-2 rounded">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="#" className="bg-white text-black py-2 rounded">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="#" className="bg-white text-black  py-2 rounded">
                  <FontAwesomeIcon icon={faSquareXTwitter} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="   flex items-center bg-cover ">
        <div className="cta  flex flex-col gap-12 w-full p-8 h-[400px] md:flex items-center ">
          <div className="  text-black text-center">
            <h1 className="text-5xl text-uppercase  font-bold font-outfit md:text-6xl">
              Ready for your next session?
            </h1>
            <div className="cta-text  text-black mx-auto md:text-right max-w-2xl ml-auto">
              <p className="text-center">
                Pick a time that works.Your trainer is ready when you are.
              </p>
            </div>
            <div className="cta-buttons flex flex-row items-center justify-center gap-x-4 mt-12">
              <button
                onClick={() => setSelectedModal("book")}
                className="bg-green-400 text-white px-4 py-2 rounded "
              >
                Book
              </button>
              <a
                href="#"
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
                We're here when you need us. Reach out with questions about your
                account or training.
              </p>
              <div className=" space-y-4">
                <div>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>Email</span>
                  <div>support@fitnessio.com</div>
                </div>
                <div>
                  <FontAwesomeIcon icon={faPhone} />
                  <span>Phone</span>

                  <div>+1(600) 555-0000</div>
                </div>
                <div>
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>Office</span>
                  <div>456 Fitness Ave, Sydnney,NSW 2000 AU</div>
                </div>
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
                <h2>Upcoming Sessions</h2>
                <table className="w-full border-collapse border-gray-500 ">
                  <thead className="border-b">
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Trainer</th>
                      <th>Program</th>
                    </tr>
                  </thead>
                  <tbody className="text-center divide-y divide-x">
                    {upcomingSessions.map((s) => (
                      <tr key={s.id}>
                        <td>{s.date}</td>
                        <td>{s.time}</td>
                        <td>{s.trainer}</td>
                        <td>{s.program}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {selectedModal === "past" && (
              <>
                <div>
                  <h2>Past Sessions</h2>
                  <table className="w-full border-collapse border-gray-500">
                    <thead className="border-b">
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Trainer</th>
                        <th>Program</th>
                      </tr>
                    </thead>
                    <tbody className="text-center divide-y divide-x">
                      {pastSessions.map((s) => (
                        <tr key={s.id}>
                          <td>{s.date}</td>
                          <td>{s.time}</td>
                          <td>{s.trainer}</td>
                          <td>{s.program}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {selectedModal === "book" && (
              <>
                <form
                  className="md:col-span-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4 ">
                    <div className="col-span-2">
                      <label htmlFor="program">
                        Which program interests you?
                      </label>
                      <select
                        id="program"
                        {...register("program")}
                        className="  outline-none border border-gray-300 rounded px-4 py-2 w-full"
                      >
                        <option value="">Select a program</option>
                        <option value="Strength Training">
                          Strength Training
                        </option>
                        <option value="HIIT">HIIT</option>
                        <option value="Weightloss">Weightloss</option>
                      </select>
                      {errors.program && (
                        <p className="text-red-500">{errors.program.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="appointment_date">Select Date</label>
                      <input
                        type="date"
                        id="appointment_date"
                        {...register("date")}
                        min={new Date().toISOString().split("T")[0]}
                        className="outline-none border border-gray-300 rounded px-4 py-2 w-full"
                      />
                      {errors.date && (
                        <p className="text-red-500">{errors.date.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="appointment_time">Time </label>
                      <select
                        {...register("time")}
                        className="  outline-none border border-gray-300 rounded px-4 py-2 w-full"
                      >
                        <option value="">Select a time</option>
                        {timeOptions.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors.time && (
                        <p className="text-red-500">{errors.time.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mx-auto">
                    <button
                      type="submit"
                      className="bg-green-400 text-white px-4 py-2 rounded mt-4"
                    >
                      Book
                    </button>
                  </div>
                </form>
              </>
            )}

            {selectedModal === "cancel" && (
              <>
                <h2 className="text-red-500 font-bold text-xl">
                  Cancel Session
                </h2>
                <form
                  onSubmit={handleCancelSubmit(onCancel)}
                  className="space-y-4"
                >
                  <div>
                    <label>Select Session to Cancel</label>
                    <select
                      {...registerCancel("bookingId")}
                      className="outline-none border border-gray-300 rounded px-4 py-2 w-full"
                    >
                      <option value="">Select a session</option>
                      {cancelOptions.length === 0 ? (
                        <option disabled>No upcoming sessions</option>
                      ) : (
                        cancelOptions.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.program} — {s.date} at {s.time}
                          </option>
                        ))
                      )}
                    </select>
                    {cancelErrors.bookingId && (
                      <p className="text-red-500">
                        {cancelErrors.bookingId.message}
                      </p>
                    )}
                  </div>

                  <p className="text-gray-500 text-sm">
                    This will mark your session as cancelled. This action cannot
                    be undone.
                  </p>

                  <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded w-full font-semibold"
                  >
                    Confirm Cancellation
                  </button>
                </form>
              </>
            )}
            {selectedModal === "reschedule" && (
              <>
                <form
                  className="md:col-span-2 h-full"
                  onSubmit={handleRescheduleSubmit(onReschedule)}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label>Select Session</label>
                      <select
                        {...registerReschedule("bookingId")}
                        className="outline-none border border-gray-300 rounded px-4 py-2 w-full"
                      >
                        <option value="">Select a session</option>
                        {rescheduleOptions.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.program} — {s.date} at {s.time}
                          </option>
                        ))}
                      </select>
                      {rescheduleErrors.bookingId && (
                        <p className="text-red-500">
                          {rescheduleErrors.bookingId.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <label>Program</label>
                      <select
                        {...registerReschedule("program")}
                        className="outline-none border border-gray-300 rounded px-4 py-2 w-full"
                      >
                        <option value="">Select a program</option>
                        <option value="Strength Training">
                          Strength Training
                        </option>
                        <option value="HIIT">HIIT</option>
                        <option value="Weightloss">Weightloss</option>
                      </select>
                      {rescheduleErrors.program && (
                        <p className="text-red-500">
                          {rescheduleErrors.program.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label>New Date</label>
                      <input
                        type="date"
                        {...registerReschedule("date")}
                        min={new Date().toISOString().split("T")[0]}
                        className="outline-none border border-gray-300 rounded px-4 py-2 w-full"
                      />
                      {rescheduleErrors.date && (
                        <p className="text-red-500">
                          {rescheduleErrors.date.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label>New Time</label>
                      <select
                        {...registerReschedule("time")}
                        className="outline-none border border-gray-300 rounded px-4 py-2 w-full"
                      >
                        <option value="">Select a time</option>
                        {timeOptions.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {rescheduleErrors.time && (
                        <p className="text-red-500">
                          {rescheduleErrors.time.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-400 text-white px-4 py-2 rounded mt-4 w-full"
                  >
                    Confirm Reschedule
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ClientDashboard;
