import React, { useState } from "react";
import { Heart, Eye } from "lucide-react";
import ProductModal from "../components/ProductModal";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const products = [
    {
      id: 1,
      name: "Handcrafted Lamp",
      price: "₹3,499",
      img: "https://picsum.photos/500/500?random=11",
      images: [
        "https://picsum.photos/500/500?random=11",
        "https://picsum.photos/500/500?random=21",
        "https://picsum.photos/500/500?random=31",
      ],
      description:
        "A beautifully handcrafted lamp made from eco-friendly materials. Perfect for adding warmth and style to your living room or bedroom.",
      variants: [
        { name: "Wood Finish", img: "https://picsum.photos/500/500?random=41" },
        {
          name: "Brass Finish",
          img: "https://picsum.photos/500/500?random=42",
        },
      ],
    },
    {
      id: 2,
      name: "Luxury Wooden Mandir",
      price: "₹15,999",
      img: "https://picsum.photos/500/500?random=12",
      images: [
        "https://picsum.photos/500/500?random=12",
        "https://picsum.photos/500/500?random=22",
        "https://picsum.photos/500/500?random=32",
      ],
      description:
        "Intricately carved wooden mandir with a luxurious finish, ideal for your puja room.",
      variants: [
        { name: "Teak Wood", img: "https://picsum.photos/500/500?random=43" },
        { name: "Rosewood", img: "https://picsum.photos/500/500?random=44" },
        { name: "Sandalwood", img: "https://picsum.photos/500/500?random=45" },
      ],
    },
    {
      id: 3,
      name: "Pure Brass Diya Set",
      price: "₹2,499",
      img: "https://picsum.photos/500/500?random=13",
      images: [
        "https://picsum.photos/500/500?random=13",
        "https://picsum.photos/500/500?random=23",
        "https://picsum.photos/500/500?random=33",
      ],
      description:
        "Traditional brass diya set that brings divine light and auspiciousness to every occasion.",
      variants: [
        { name: "Set of 2", img: "https://picsum.photos/500/500?random=46" },
        { name: "Set of 4", img: "https://picsum.photos/500/500?random=47" },
      ],
    },
    {
      id: 4,
      name: "Designer Wall Hanging",
      price: "₹1,999",
      img: "https://picsum.photos/500/500?random=14",
      images: [
        "https://picsum.photos/500/500?random=14",
        "https://picsum.photos/500/500?random=24",
        "https://picsum.photos/500/500?random=34",
      ],
      description:
        "Elegant wall hanging made with premium fabric and intricate embroidery to elevate your home decor.",
      variants: [
        { name: "Red & Gold", img: "https://picsum.photos/500/500?random=48" },
        {
          name: "Blue & Silver",
          img: "https://picsum.photos/500/500?random=49",
        },
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#faf7f2] to-white">
      {/* Hero Section */}
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=80"
          alt="Luxury Home"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>

        <div className="relative text-center text-white max-w-2xl px-6 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg pt-10">
            Graha Pravesh
          </h1>
          <p className="mt-6 text-lg md:text-xl font-light leading-relaxed">
            Luxury home décor & spiritual essentials — handcrafted with love,
            designed to bring elegance & serenity to your space.
          </p>
          <button className="mt-8 px-10 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-lg font-medium shadow-xl hover:scale-105 transition-transform">
            Explore Collection
          </button>
          <p className="mt-3 text-sm opacity-80">
            ✨ Free Shipping on orders above ₹999
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-10 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Lamps", "Mandirs", "Diyas", "Wall Décor"].map((cat, i) => (
            <div
              key={i}
              className="relative group h-36 md:h-48 rounded-md overflow-hidden shadow-md cursor-pointer"
            >
              <img
                src={`https://picsum.photos/400/400?random=${20 + i}`}
                alt={cat}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white text-lg font-semibold">{cat}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="px-6 sm:px-10 py-12 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-gray-900 tracking-tight">
          Featured Collection
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Product Image */}
              <div className="hidden lg:flex overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-40 sm:h-52 md:h-64 lg:h-72 object-cover transform group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* MOBILE/TABLET INFO CARD */}
              <div className="grid grid-cols-1 gap-5 sm:hidden">
                {products.map((p) => (
                  <ProductCard key={p.id} {...p} className="h-full" />
                ))}
              </div>

              {/* DESKTOP HOVER OVERLAY */}
              <div className="hidden lg:flex flex-col justify-between absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="flex justify-end gap-2 p-4">
                  <button className="p-2 bg-white/80 rounded-full hover:bg-amber-500 hover:text-white transition">
                    <Heart size={18} />
                  </button>
                  <Link
                    to={`/product/${p.id}`}
                    className="p-2 bg-white/80 rounded-full hover:bg-amber-500 hover:text-white transition"
                  >
                    <Eye size={18} />
                  </Link>
                </div>

                <div className="p-5 text-white">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 text-amber-300 font-medium">{p.price}</p>
                  <Link
                    to={`/product/${p.id}`}
                    className="mt-4 inline-block px-5 py-2 rounded-full bg-amber-500 text-white text-sm font-medium shadow hover:bg-amber-600 transition"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 bg-amber-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">
            Why Choose Graha Pravesh?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                desc: "Handpicked luxury materials for timeless durability.",
              },
              {
                title: "Tradition Meets Modern",
                desc: "Blend of spiritual elegance with contemporary design.",
              },
              {
                title: "Trusted by Families",
                desc: "Serving homes with love and trust for generations.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-amber-600">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
