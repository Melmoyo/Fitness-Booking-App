import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Home />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
