import React from "react";

const Home = () => {
  const products = [
    { id: 1, name: "Handcrafted Lamp", price: "₹3,499", img: "https://picsum.photos/500/500?random=11" },
    { id: 2, name: "Luxury Wooden Mandir", price: "₹15,999", img: "https://picsum.photos/500/500?random=12" },
    { id: 3, name: "Pure Brass Diya Set", price: "₹2,499", img: "https://picsum.photos/500/500?random=13" },
    { id: 4, name: "Designer Wall Hanging", price: "₹1,999", img: "https://picsum.photos/500/500?random=14" },
  ];

  return (
    <div className="bg-gradient-to-b from-[#faf7f2] to-white">
      {/* Hero Section */}
      <div className="relative h-[90vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=80"
          alt="Luxury Home"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white max-w-2xl px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Graha Pravesh
          </h1>
          <p className="mt-6 text-lg md:text-xl font-light leading-relaxed">
            Curated luxury home décor & spiritual essentials — bringing grace,
            tradition, and timeless elegance into your home.
          </p>
          <button className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-lg font-medium shadow-lg hover:scale-105 transition-transform">
            Explore Collection
          </button>
        </div>
      </div>

      {/* Products Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Featured Collection
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
            >
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-amber-300 font-medium">{p.price}</p>
              </div>
              <button className="absolute bottom-5 right-5 px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-medium shadow hover:bg-amber-600 transition">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
