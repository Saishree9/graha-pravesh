import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
