import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([
    {
      _id: "1",
      product: {
        _id: "p1",
        name: "Handcrafted Lamp",
        bannerImage: "https://picsum.photos/200/200?random=11",
        rating: 4.3,
        reviewsCount: 12,
        price: 3499,
        discountPrice: 3999,
        stocks: [{ size: "M", unit: 5 }],
      },
    },
    {
      _id: "2",
      product: {
        _id: "p2",
        name: "Elegant Vase",
        bannerImage: "https://picsum.photos/200/200?random=12",
        rating: 3.8,
        reviewsCount: 8,
        price: 1299,
        discountPrice: null,
        stocks: [{ size: "L", unit: 0 }],
      },
    },
  ]);

  const handleAddToCart = (item) => {
    toast.success(`${item.product.name} added to cart!`);
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((i) => i._id !== id));
    toast.success("Removed from wishlist");
  };

  const handleMoveWishlistToCart = () => {
    if (wishlistItems.length === 0) {
      toast.error("No items in wishlist");
    } else {
      toast.success("All items moved to cart!");
      setWishlistItems([]);
      navigate("/cart");
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mt-5 mb-2 text-gray-900 tracking-tight">
        My Wishlist
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlistItems?.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-medium mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Add items to your wishlist to save them for later.
            </p>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition duration-300"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {wishlistItems?.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md mb-4 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative"
              >
                {/* Delete button */}
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>

                {/* Product Image */}
                <div className="w-32 h-32 flex-shrink-0 rounded-md overflow-hidden">
                  <img
                    src={item?.product?.bannerImage}
                    alt={item?.product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {item?.product?.name}
                  </h3>
                  <div className="flex items-center text-sm mt-1">
                    {renderStars(item?.product?.rating)}
                    <span className="ml-2 text-gray-500">
                      ({item?.product?.reviewsCount || 0} reviews)
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">
                    Estimated delivery:{" "}
                    <span className="font-medium text-gray-800">
                      2–4 business days
                    </span>
                  </p>
                </div>

                {/* Price & Stock */}
                <div className="text-center sm:text-right">
                  <p className="font-bold text-[#7FBA00]">
                    ₹{item?.product?.price?.toFixed(2)}
                  </p>
                  {item?.product?.discountPrice && (
                    <p className="line-through text-gray-400 text-sm">
                      ₹{item?.product?.discountPrice}
                    </p>
                  )}
                  {item?.product?.stocks.reduce(
                    (sum, stock) => sum + stock.unit,
                    0
                  ) > 0 ? (
                    <span className="mt-2 inline-block text-green-600 bg-green-100 px-2 py-1 rounded text-xs">
                      In Stock
                    </span>
                  ) : (
                    <span className="mt-2 inline-block text-red-600 bg-red-100 px-2 py-1 rounded text-xs">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-[#7FBA00] hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => navigate(`/product/${item?.product?._id}`)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm transition"
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))}

            {/* Bulk Actions */}
            <div className="flex flex-col sm:flex-row justify-between mt-6 gap-2">
              <button
                onClick={() => navigate("/")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition duration-300 w-full sm:w-auto"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleMoveWishlistToCart}
                className="bg-[#7FBA00] hover:bg-green-600 text-white px-6 py-2 rounded-md transition duration-300 w-full sm:w-auto"
              >
                Add All to Cart
              </button>
            </div>

            {/* Recommendations */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">You may also like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                    onClick={() => navigate(`/product/${i}`)}
                  >
                    <img
                      src={`https://picsum.photos/200/200?random=${i}`}
                      alt="Recommended"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <h3 className="mt-2 text-sm font-medium text-gray-800">
                      Product {i}
                    </h3>
                    <p className="text-[#7FBA00] font-bold">₹{i * 499}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
