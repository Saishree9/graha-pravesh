import React, { useState, useEffect } from "react";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  // ✅ Dummy cart items
  const [cartItems, setCartItems] = useState([
    {
      _id: "1",
      product: {
        _id: "p1",
        name: "Handcrafted Lamp",
        bannerImage: "https://picsum.photos/200/200?random=1",
        category: "Home Decor",
        price: 3499,
        rating: 4.2,
        noOfRatings: 12,
        stocks: [
          { size: "Small", unit: 5 },
          { size: "Large", unit: 3 },
        ],
      },
      quantity: 1,
      size: "Small",
      price: 3499,
    },
    {
      _id: "2",
      product: {
        _id: "p2",
        name: "Luxury Wooden Mandir",
        bannerImage: "https://picsum.photos/200/200?random=2",
        category: "Spiritual",
        price: 15999,
        rating: 4.8,
        noOfRatings: 8,
        stocks: [
          { size: "Teak Wood", unit: 2 },
          { size: "Rosewood", unit: 1 },
        ],
      },
      quantity: 1,
      size: "Teak Wood",
      price: 15999,
    },
  ]);

  const [selectedSizes, setSelectedSizes] = useState({});
  const [removeLoading, setRemoveLoading] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const initialSizes = {};
    cartItems.forEach((item) => {
      initialSizes[item._id] = item.size;
    });
    setSelectedSizes(initialSizes);
  }, [cartItems]);

  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1,
              price: item.product.price * (item.quantity + 1),
            }
          : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              price: item.product.price * (item.quantity - 1),
            }
          : item
      )
    );
  };

  const confirmRemoveItem = (itemId) => {
    setItemToDelete(itemId);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    setShowDeleteConfirm(false);
  };

  const removeItem = () => {
    if (!itemToDelete) return;
    setRemoveLoading(true);
    setTimeout(() => {
      setCartItems((prev) => prev.filter((item) => item._id !== itemToDelete));
      setRemoveLoading(false);
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }, 500);
  };

  const handleSizeChange = (itemId, newSize) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: newSize }));
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, size: newSize } : item
      )
    );
  };

  const getUnitType = (item) => {
    if (item.product?.stocks?.length > 0) {
      const match = item.product.stocks[0].size.match(/[a-zA-Z]+/);
      return match ? match[0] : "unit";
    }
    return "unit";
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems, subtotal } });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mt-5 mb-2 text-gray-900 tracking-tight">
        Shopping cart
      </h2>
      <div className="py-3 sm:py-4 md:py-5 lg:py-6 whitebg-layout">
        {cartItems.length === 0 ? (
          <div className="text-center py-10 h-screen flex justify-center items-center">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            {/* Desktop Layout */}
            {/* Mobile Layout */}
            <div className="block md:hidden space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="border border-[#CEB28380] rounded-lg shadow-sm p-4 flex space-x-4 items-start"
                >
                  {/* Image */}
                  <img
                    src={item.product.bannerImage}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.product.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.product.category}
                    </p>

                    {/* Rating */}
                    <div className="flex space-x-1 text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${
                            i < Math.floor(item.product.rating || 0)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-xs text-gray-500">
                      {item.product.noOfRatings} reviews
                    </p>

                    {/* Price */}
                    <p className="text-green-600 font-semibold mt-1">
                      ₹{item.price.toFixed(2)}
                    </p>

                    {/* Quantity + Size */}
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        className="px-2 border rounded"
                        onClick={() => decreaseQuantity(item._id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 border rounded"
                        onClick={() => increaseQuantity(item._id)}
                      >
                        +
                      </button>

                      <select
                        className="px-2 border rounded text-sm"
                        value={selectedSizes[item._id]}
                        onChange={(e) =>
                          handleSizeChange(item._id, e.target.value)
                        }
                      >
                        {item.product.stocks.map((s, i) => (
                          <option key={i} value={s.size}>
                            {s.size}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                    onClick={() => confirmRemoveItem(item._id)}
                  >
                    <FaTrashAlt className="text-gray-600" />
                  </button>
                </div>
              ))}
            </div>

            <div className="hidden md:block">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="border border-[#CEB28380] rounded-lg shadow-sm overflow-hidden mt-4 lg:mt-5"
                >
                  <div className="grid grid-cols-12 px-3 sm:px-4 md:px-5 lg:px-6 py-3 md:py-4 items-center">
                    {/* Product Info */}
                    <div className="col-span-4 flex items-center space-x-4">
                      <img
                        src={item.product.bannerImage}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <div className="flex space-x-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(item.product.rating || 0)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">
                          {item.product.noOfRatings} reviews
                        </p>
                        <p className="font-medium text-sm">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.product.category}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center">
                      ₹{item.product.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-3 flex justify-center space-x-3">
                      <button
                        className="px-2 border rounded"
                        onClick={() => decreaseQuantity(item._id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 border rounded"
                        onClick={() => increaseQuantity(item._id)}
                      >
                        +
                      </button>

                      <select
                        className="px-2 border rounded"
                        value={selectedSizes[item._id]}
                        onChange={(e) =>
                          handleSizeChange(item._id, e.target.value)
                        }
                      >
                        {item.product.stocks.map((s, i) => (
                          <option key={i} value={s.size}>
                            {s.size}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 text-center text-green-600 font-semibold">
                      ₹{item.price.toFixed(2)}
                    </div>

                    {/* Delete */}
                    <div className="col-span-1 flex justify-center">
                      <button
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                        onClick={() => confirmRemoveItem(item._id)}
                      >
                        <FaTrashAlt className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal + Actions */}
            <div className="mt-6 flex flex-col items-center space-y-4">
              <p className="font-semibold text-lg">
                Subtotal: ₹{subtotal.toFixed(2)}
              </p>
              <div className="flex space-x-3">
                <button
                  className="bg-gray-200 px-4 py-2 rounded-full"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-full"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>

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

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="font-medium text-lg mb-4">Confirm Deletion</h3>
            <p className="mb-6">Remove this product from your cart?</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border rounded"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={removeItem}
                disabled={removeLoading}
              >
                {removeLoading ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
