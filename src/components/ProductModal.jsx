import React, { useState } from "react";
import { X } from "lucide-react";

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  // track selected image (main display)
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || product.img);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full mx-4 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT: Images */}
          <div className="p-6 flex flex-col items-center">
            {/* Main Image */}
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-72 object-cover rounded-lg shadow"
            />

            {/* Thumbnail previews */}
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="variant"
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                    selectedImage === img ? "border-amber-500" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-amber-600 text-lg font-semibold mt-2">{product.price}</p>

              {/* Description */}
              <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
                {product.description ||
                  "A premium handcrafted piece designed to add elegance to your home. Made with love and care to last for years."}
              </p>

              {/* Customisation Options */}
              <div className="mt-6">
                <h3 className="text-md font-semibold text-gray-800 mb-2">Customisation</h3>
                <div className="flex gap-4">
                  <select className="select select-bordered w-full max-w-xs text-sm">
                    <option disabled selected>
                      Select Material
                    </option>
                    <option>Wood</option>
                    <option>Marble</option>
                    <option>Brass</option>
                  </select>
                  <select className="select select-bordered w-full max-w-xs text-sm">
                    <option disabled selected>
                      Select Size
                    </option>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>

              {/* Variants */}
              {product.variants?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-md font-semibold text-gray-800 mb-2">Available Variants</h3>
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
            </div>

            {/* Action Button */}
            <button className="mt-8 w-full py-3 rounded-full bg-amber-500 text-white font-medium shadow hover:bg-amber-600 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
