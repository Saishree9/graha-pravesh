import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent tracking-tight"
        >
          Graha Pravesh
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {/* Login Button → routes to /signin */}
          <li>
            <Link
              to="/signin"
              className="btn btn-sm btn-primary rounded-full px-6"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-6 py-4">
          <ul className="space-y-4 text-gray-700 font-medium">
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/products" onClick={() => setOpen(false)}>Products</Link></li>
            <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
            <li>
              <Link
                to="/signin"
                className="btn btn-sm btn-primary w-full"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
