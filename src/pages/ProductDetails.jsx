import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
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
    highlights: [
      "Eco-friendly handcrafted design",
      "Durable & long-lasting finish",
      "Perfect for living rooms & bedrooms",
    ],
    reviews: [
      {
        user: "Ravi Kumar",
        rating: 5,
        comment: "Absolutely loved this lamp! The quality is top-notch.",
      },
      {
        user: "Priya Sharma",
        rating: 4,
        comment: "Looks beautiful in my bedroom, just a bit smaller than expected.",
      },
    ],
    faq: [
      { q: "Is this lamp electric or oil-based?", a: "It is electric with a standard bulb holder." },
      { q: "Does it come with a bulb?", a: "No, bulb is not included." },
    ],
  },
  // ... keep your other products here
];

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || product?.img);
  const [isCustomisationOpen, setIsCustomisationOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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

          {/* Highlights */}
          {product.highlights && (
            <ul className="mt-4 list-disc list-inside text-gray-700 space-y-1">
              {product.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}

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

      {/* Reviews */}
      {product.reviews && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review, i) => (
              <div key={i} className="p-4 border rounded-lg shadow-sm bg-white">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={18}
                      className={idx < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}
                    />
                  ))}
                  <span className="font-medium text-gray-700">{review.user}</span>
                </div>
                <p className="text-gray-600 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {product.faq && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {product.faq.map((item, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex justify-between items-center w-full text-left font-medium text-gray-800"
                >
                  {item.q}
                  {openFaq === idx ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openFaq === idx && <p className="mt-2 text-gray-600">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

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
