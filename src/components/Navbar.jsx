import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Hide Navbar on /signin page
  if (location.pathname === "/signin") return null;

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="text-sm md:text-2xl uppercase font-extrabold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent tracking-tight"
        >
          Graha Pravesh
        </Link>

        {/* Centered Menu (Desktop only) */}
        <ul className="hidden md:flex flex-1 justify-center space-x-8 text-gray-700 font-medium items-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/wishlist"><Heart size={22} className="hover:text-amber-600 transition" /></Link>
          <Link to="/cart"><ShoppingCart size={22} className="hover:text-amber-600 transition" /></Link>
          <Link to="/signin" className="btn btn-sm btn-primary rounded-full px-6">Login</Link>
        </div>

        {/* Actions (Mobile) */}
        <div className="flex md:hidden items-center space-x-4">
          <Link to="/wishlist"><Heart size={22} className="hover:text-amber-600 transition" /></Link>
          <Link to="/cart"><ShoppingCart size={22} className="hover:text-amber-600 transition" /></Link>
          <Link to="/signin" className="btn btn-xs btn-primary rounded-full px-4">Login</Link>

          {/* Mobile Hamburger */}
          <button
            className="text-gray-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (only navigation links) */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-6 py-4">
          <ul className="space-y-4 text-gray-700 font-medium">
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/products" onClick={() => setOpen(false)}>Products</Link></li>
            <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
