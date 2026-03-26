import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookSession from "./pages/BookSession";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ClientSignIn from "./pages/ClientSignIn";
import ClientDashboard from "./pages/ClientDashboard";
import DashboardNavbar from "./components/DashboardNavbar";
import "./index.css";
import LoadingSpinner from "./components/LoadingSpinner";
import { UserAuth } from "./Context/AuthContext";

function AppWrapper() {
  const location = useLocation();

  const { session, role, loading, fullName } = UserAuth();

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  // If on the special page, footer is black
  const footerClass = ["/book", "/dashboard"].includes(location.pathname)
    ? "bg-black text-white"
    : "bg-white text-black";

  // Hide NavBar on dashboards
  const showDashboardNavbar =
    session && role && location.pathname.includes("dashboard");

  return (
    <>
      {showDashboardNavbar ? (
        <DashboardNavbar role={role} session={session} fullName={fullName} />
      ) : (
        <Navbar />
      )}
      <main>
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <AdminLogin />
              </>
            }
          />

          <Route
            path="/client_login"
            element={
              <>
                <ClientSignIn />
              </>
            }
          />
          <Route
            path="/book"
            element={
              <>
                <BookSession />
              </>
            }
          />

          {/* Dashboard routes */}
          <Route
            path="/dashboard"
            element={
              session && role === "trainer" ? (
                <>
                  <AdminDashboard />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/client_dashboard"
            element={
              loading ? (
                <div>Loading...</div> // wait for role to load
              ) : session && role === "client" ? (
                <>
                  <ClientDashboard />
                </>
              ) : (
                <Navigate to="/client_login" replace />
              )
            }
          />
        </Routes>
      </main>
      <Footer className={footerClass} />
    </>
  );
}

function App() {
  return <AppWrapper />;
}
export default App;
