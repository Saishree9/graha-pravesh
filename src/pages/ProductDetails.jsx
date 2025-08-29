import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";
import CustomisationModal from "../components/CustomisationModal";

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

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || product.img);
  const [isCustomisationOpen, setIsCustomisationOpen] = useState(false);

  if (!product) return <p className="p-10">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Images */}
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl shadow"
          />

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="preview"
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition ${
                  selectedImage === img ? "border-amber-500" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-amber-600 text-xl font-semibold mt-2">{product.price}</p>

          <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

          {/* Variants */}
          {product.variants?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">Available Variants</h3>
              <div className="flex gap-3">
                {product.variants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(variant.img)}
                    className="px-4 py-2 rounded-lg border hover:bg-amber-50 transition text-sm"
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customisation */}
          <div className="mt-6">
            <button
              onClick={() => setIsCustomisationOpen(true)}
              className="px-6 py-3 rounded-full bg-amber-500 text-white font-medium shadow hover:bg-amber-600 transition"
            >
              Customise This Product
            </button>
          </div>

          {/* Add to Cart */}
          <button className="mt-4 w-full py-3 rounded-full bg-gray-800 text-white font-medium shadow hover:bg-gray-900 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Customisation Modal */}
      <CustomisationModal
        isOpen={isCustomisationOpen}
        onClose={() => setIsCustomisationOpen(false)}
        product={product}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default ProductDetails;
