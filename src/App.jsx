import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/signin";
  return (
    <div>
  <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow" />
  
  {/* Push content down */}
  <main className="pt-16">
    <Routes>
      <Route path="/signin" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  </main>
  
  <Footer />
</div>

  );
}

export default App;
