import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({
  id,
  name,
  price,
  img,
  images,
  description,
  variants,
  className,
}) => {
  return (
    <div
      className={`flex flex-col bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden ${className}`}
    >
      {/* Single Main Image */}
      <div className="w-full aspect-square overflow-hidden">
        <img src={img} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Title + Price */}
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1">
          {name}
        </h3>
        <p className="text-amber-600 font-medium text-xs sm:text-sm mt-1">
          {price}
        </p>

        {/* Small Image Previews */}
        {/* <div className="flex gap-2 mt-3">
          {images?.slice(0, 3).map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${name} preview ${i + 1}`}
              className="w-10 h-10 object-cover rounded border"
            />
          ))}
        </div> */}

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <Link
            to={`/product/${id}`}
            className="flex-1 py-1.5 sm:py-2 rounded-full bg-amber-500 text-white text-xs sm:text-sm font-medium shadow hover:bg-amber-600 transition text-center"
          >
            Buy Now
          </Link>
          <Link
            to={`/product/${id}`}
            className="px-3 py-1.5 rounded-full border border-gray-200 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
