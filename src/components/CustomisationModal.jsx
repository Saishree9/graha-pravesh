import React from "react";
import { X } from "lucide-react";

const CustomisationModal = ({ isOpen, onClose, product, setSelectedImage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Customisation Options</h2>

        {/* Example Options */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Material</label>
            <div className="flex gap-3">
              {["Wood", "Marble", "Brass"].map((material, idx) => (
                <button
                  key={idx}
                  className="px-4 py-2 border rounded-lg hover:bg-amber-50 transition text-sm"
                >
                  {material}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Size</label>
            <div className="flex gap-3">
              {["Small", "Medium", "Large"].map((size, idx) => (
                <button
                  key={idx}
                  className="px-4 py-2 border rounded-lg hover:bg-amber-50 transition text-sm"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Variant Preview (if applicable) */}
          {product.variants?.length > 0 && (
            <div>
              <label className="block mb-2 text-sm font-medium">Variants</label>
              <div className="flex gap-3">
                {product.variants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(variant.img)}
                    className="px-4 py-2 border rounded-lg hover:bg-amber-50 transition text-sm"
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="mt-6 w-full py-3 rounded-full bg-amber-500 text-white font-medium shadow hover:bg-amber-600 transition">
          Apply Customisation
        </button>
      </div>
    </div>
  );
};

export default CustomisationModal;
