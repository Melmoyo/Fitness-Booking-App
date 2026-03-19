// Get current session
// useEffect(() => {
//   supabase.auth.getSession().then(({ data }) => {
//     setSession(data.session);
//     if (data.session?.user?.user_metadata?.role) {
//       setRole(data.session.user.user_metadata?.role || null);
//     }
//   });
//   // Listen for changes
//   const { data: listener } = supabase.auth.onAuthStateChange(
//     (_event, session) => {
//       setSession(session);

//       setRole(session?.user.user_metadata?.role || null);
//     },
//   );

//   return () => {
//     listener.subscription.unsubscribe();
//   };
// }, []);
// useEffect(() => {
//   supabase.auth.getSession().then(async ({ data }) => {
//     setSession(data.session);

//     if (data.session?.user) {
//       // Query your custom users table
//       const { data: userData, error } = await supabase
//         .from("users")
//         .select("full_name, role")
//         .eq("id", data.session.user.id) // assuming you store auth user.id in users table
//         .single();

//       if (!error && userData) {
//         setRole(userData.role);
//         setFullName(userData.full_name);
//       }
//     }
//   });

//   const { data: listener } = supabase.auth.onAuthStateChange(
//     async (_event, session) => {
//       setSession(session);

//       if (session?.user) {
//         const { data: userData, error } = await supabase
//           .from("users")
//           .select("full_name, role")
//           .eq("id", session.user.id)
//           .single();

//         if (!error && userData) {
//           setRole(userData.role);
//           setFullName(userData.full_name);
//         }
//       } else {
//         setRole(null);
//         setFullName(null);
//       }
//     },
//   );

//   return () => {
//     listener.subscription.unsubscribe();
//   };
// }, []);
// <>
//   {hideNav ? (
//     <DashboardNavbar role={role} session={session} fullName={fullName} />
//   ) : (
//     <Navbar />
//   )}

//   <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/book" element={<BookSession />} />

//     <Route
//       path="/dashboard"
//       element={
//         <ProtectedRoute
//           session={session}
//           role={role}
//           requiredRole="trainer"
//         >
//           <AdminDashboard />
//         </ProtectedRoute>
//       }
//     />
//     <Route path="/login" element={<AdminLogin />} />
//     <Route
//       path="/client_dashboard"
//       element={
//         <ProtectedRoute session={session} role={role} requiredRole="client">
//           {" "}
//           <ClientDashboard />{" "}
//         </ProtectedRoute>
//       }
//     />
//     <Route path="/client_login" element={<ClientSignIn />} />
//   </Routes>

//   <Footer className={footerClass} />
// </>
{
  /* <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/book" element={<BookSession />} />

  {/* Fixed logic: No more ternary defaults if loading is handled above */
}
//   <Route
//     path="/dashboard"
//     element={
//       session && role === "trainer" ? (
//         <AdminDashboard />
//       ) : (
//         <Navigate to="/login" />
//       )
//     }
//   />
//   <Route path="/login" element={<AdminLogin />} />

//   <Route
//     path="/client_dashboard"
//     element={
//       session && role === "client" ? (
//         <ClientDashboard />
//       ) : (
//         <Navigate to="/client_login" />
//       )
//     }
//   />
//   <Route path="/client_login" element={<ClientSignIn />} />
//</Routes>; */}
//import ProtectedRoute from "./components/ProtectedRoutes";

// if (data.session?.user) {
//   // Query your custom users table
//   const { data: userData, error } = await supabase
//     .from("users")
//     .select("full_name, role")
//     .eq("id", data.session.user.id) // assuming you store auth user.id in users table
//     .single();
//   console.log("Initial users table lookup:", { userData, error });
//   console.log("Session:", session); console.log("Role:", role);

//   if (!error && userData) {
//     setRole(userData.role);
//     setFullName(userData.full_name);
//   }
// }
// if (session?.user) {
//   const { data: userData, error } = await supabase
//     .from("users")
//     .select("full_name, role")
//     .eq("id", session.user.id)
//     .single();
//   console.log("Auth change users table lookup:", { userData, error });
//   console.log("Fetched role:", userData?.role);
//   if (!error && userData) {
//     setRole(userData.role);
//     setFullName(userData.full_name);
//   }
// } else {
//   setRole(null);
//   setFullName(null);
// }
// const [formData, setFormData] = useState({
//   email: "",
//   password: "",
// });
// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { name, value, type, checked } = e.target;
//   setFormData((prev) => ({
//     ...prev,
//     [name]: type === "checkbox" ? checked : value,
//   }));
// };
// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { name, value, type, checked } = e.target;
//   setFormData((prev) => ({
//     ...prev,
//     [name]: type === "checkbox" ? checked : value,
//   }));
// };
// setFormData({
//   name: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
//   rememberMe: false,
// });
// setFormData({
//   email: "",
//   password: "",
//   confirmPassword: "",
//   rememberMe: false,
// });
// const handleChange = async (
//   e: React.ChangeEvent<
//     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//   >,
// ) => {
//   e.preventDefault();
//   const { name, value, type } = e.target;
//   const checked = (e.target as HTMLInputElement).checked;
//   if (name === "date") {
//     const today = new Date();
//     const selectedDate = new Date(value);
//     // reset time to midnight for comparison
//     today.setHours(0, 0, 0, 0);
//     selectedDate.setHours(0, 0, 0, 0);

//     if (selectedDate < today) return; // ignore dates before today
//   }

//   if (name === "appointment_time") {
//     if (value < "05:00" || value > "19:00") return;
//   }
//   setFormData((prev) => ({
//     ...prev,
//     [name]: type === "checkbox" ? checked : value,
//   }));
// };
// const handleChange = async (
//   e: React.ChangeEvent<
//     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//   >,
// ) => {
//   e.preventDefault();
//   const { name, type, value } = e.target;
//   const checked = (e.target as HTMLInputElement).checked;
//   if (name === "date") {
//     const today = new Date();
//     const selectedDate = new Date(value);
//     // reset time to midnight for comparison
//     today.setHours(0, 0, 0, 0);
//     selectedDate.setHours(0, 0, 0, 0);

//     if (selectedDate < today) return; // ignore dates before today
//   }

//   if (name === "appointment_time") {
//     if (value < "05:00" || value > "19:00") return;
//   }
//   setFormData((prev) => ({
//     ...prev,
//     [name]: type === "checkbox" ? checked : value,
//   }));
// };
