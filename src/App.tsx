import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookSession from "./pages/BookSession";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ClientSignIn from "./pages/ClientSignIn";
import ClientDashboard from "./pages/ClientDashboard";
import "./index.css";

function AppWrapper() {
  const location = useLocation();

  // If on the special page, footer is black
  const footerClass = ["/book", "/dashboard"].includes(location.pathname)
    ? "bg-black text-white"
    : "bg-white text-black";

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookSession />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/client_login" element={<ClientSignIn />} />
        <Route path="/client_dashboard" element={<ClientDashboard />} />
      </Routes>

      <Footer className={footerClass} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
export default App;
