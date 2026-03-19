import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { isValidPhoneNumber } from "libphonenumber-js";
import { supabase } from "../SupabaseClient";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const userFormSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(3, "First name should be more than 3 characters")
    .refine((val) => /^[A-Za-z]+$/.test(val), {
      message: "Only letters allowed",
    }),
  lastName: z
    .string()
    .nonempty("First name is required")
    .min(3, "Last name should be more than 3 characters")
    .regex(/^[A-Za-z]+$/, "Only letters allowed"),
  email: z.string().nonempty("Emai is required").email("Invalid email format"),

  phone: z
    .string()
    .nonempty("Phone number is required")
    .refine((val) => isValidPhoneNumber(val), {
      message: "Invalid phone number",
    }),
  program: z.string().nonempty("Please select a program"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  level: z.string("Please select a level"),
  agree: z.boolean().refine((val) => val === true, {
    message: "You must accept terms",
  }),
  goals: z.string().optional(),
});
type UserForm = z.infer<typeof userFormSchema>;

const BookSession = () => {
  // const form = useForm<UserForm>({
  //   resolver: zodResolver(userFormSchema),
  // });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
  });
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const fetchBookedTimes = async (date: string) => {
    if (!date) return;

    const { data, error } = await supabase
      .from("bookings")
      .select("start_time")
      .eq("booking_date", date)
      .neq("status", "cancelled");

    if (error) {
      alert("Error fetching booked times:", error.message);
      return;
    }

    const times = (data || []).map((b: any) => b.start_time?.slice(0, 5));

    setBookedTimes(times);
  };
  const selectedDate = watch("date");

  useEffect(() => {
    if (selectedDate) {
      fetchBookedTimes(selectedDate);
    }
  }, [selectedDate]);
  const timeOptions = Array.from({ length: 33 }, (_, i) => {
    // 5:00 AM is start, 30-minute intervals
    const totalMinutes = 5 * 60 + i * 30;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  });

  const onSubmit = async (data: UserForm) => {
    // Step 1: Find the program by name
    try {
      const { data: programData, error: programError } = await supabase
        .from("programs")
        .select("id, trainer_id")
        .eq("name", data.program.trim())
        .single();

      if (programError || !programData) {
        alert("Program not found");
        return;
      }
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", data.email)
        .maybeSingle();

      const userId = existingUser?.id ?? null;

      const programId = programData.id;
      // Step 2: Insert booking using program id
      const { error: bookingError } = await supabase.from("bookings").insert([
        {
          user_id: userId,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          program_id: programId,
          booking_date: data.date,
          start_time: data.time,
          experience: data.level,
          goals: data.goals,
        },
      ]);
      if (bookingError) {
        alert("Failed to book" + bookingError.message);
      } else {
        alert("Session has been booked");
        reset();
      }
    } catch (err) {
      alert("Somehing went wrong");
    }
  };
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

          <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 ">
              <div>
                <label htmlFor="first">First name</label>
                <input
                  type="text"
                  id="first_name"
                  {...register("firstName")}
                  className="outline-black border border-gray-300 rounded px-4 py-2 w-full"
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="last_name">Last name</label>
                <input
                  type="text"
                  id="last_name"
                  {...register("lastName")}
                  className="outline-none border border-gray-300 rounded px-4 py-2 w-full"
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>
              <div className="col-span-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="outline-none border border-gray-300 rounded px-4 py-2 w-full"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="col-span-2">
                <label htmlFor="phone">Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+27 71 234 5678"
                  {...register("phone")}
                  className="outline-none border border-gray-300 rounded px-4 py-2 w-full"
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </div>
              <div className="col-span-2">
                <label htmlFor="program">Which program interests you?</label>
                <select
                  id="program"
                  {...register("program")}
                  className="  outline-none border border-gray-300 rounded px-4 py-2 w-full"
                >
                  <option value="">Select a program</option>
                  <option value="Strength Training">Strength Training</option>
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
                    <option
                      key={t}
                      value={t}
                      disabled={bookedTimes.includes(t)}
                      className={bookedTimes.includes(t) ? "text-gray-300" : ""}
                    >
                      {bookedTimes.includes(t) ? `${t} — Booked` : t}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-red-500">{errors.time.message}</p>
                )}
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
                  {...register("level")}
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
                  value="some_experience"
                  {...register("level")}
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
                  value="intermediate"
                  {...register("level")}
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
                  value="advanced"
                  {...register("level")}
                  className="outline-none border border-gray-300 rounded px-4 py-2 "
                />
                <label htmlFor="experience">Advanced athlete</label>
              </div>
              <div className="w-full space-x-4">
                <input
                  type="radio"
                  id="experience"
                  value="returning"
                  {...register("level")}
                  className="outline-none border border-gray-300 rounded px-4 py-2 "
                />
                <label htmlFor="experience">Returning client</label>
              </div>
              <div className="w-full space-x-4">
                <input
                  type="radio"
                  id="experience"
                  value="other"
                  {...register("level")}
                  className="outline-none border border-gray-300 rounded px-4 py-2 "
                />
                <label htmlFor="experience">Other </label>
              </div>
            </div>
            {errors.level && (
              <p className="text-red-500">{errors.level.message}</p>
            )}

            <div className="grid grid-cols-2 mt-2  gap-4 font-semibold">
              <label htmlFor="goals" className="">
                Notes
              </label>
              <textarea
                id="goals"
                rows={4}
                {...register("goals")}
                className="col-span-2 outline-none border border-gray-300 rounded px-4 py-2 w-full h-64"
                placeholder="Tell us about your goals"
              ></textarea>
            </div>
            <div className="mt-2  gap-4 space-x-2">
              <input
                type="checkbox"
                id="agree"
                {...register("agree")}
                className="outline-none border border-gray-300 rounded px-4 py-2 "
              />
              <label htmlFor="agree" className="inline">
                I agree to the terms and conditions
              </label>
            </div>
            {errors.agree && (
              <p className="text-red-500">{errors.agree.message}</p>
            )}
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
