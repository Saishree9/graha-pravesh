import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/signin";
  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
      {!hideNavbar && <Footer/>}
    </div>
  );
}

export default App;
