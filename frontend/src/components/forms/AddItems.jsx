import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const AddItems = ({ onClose, onItemAdded }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const [items, setItems] = useState([]);

  const handelChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/backend/products.php", formData, {
        withCredentials: true,
      });

      console.log(res.data);
      alert("Data submitted successfully!");

      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
      });

      onItemAdded && onItemAdded();
      onClose(); // optional
    } catch (error) {
      console.error(error);
      alert("Error submitting data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-item-title"
    >
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2
            id="create-item-title"
            className="text-lg font-bold text-gray-900"
          >
            Create New Item
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            <IoClose className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handelSubmit} className="px-6 py-5">
          {/* <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600"></div> */}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-xs font-bold text-gray-900"
              >
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="e.g., Wireless Mechanical Keyboard"
                onChange={handelChange}
                value={formData.name}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-1.5 block text-xs font-bold text-gray-900"
              >
                Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  onChange={handelChange}
                  value={formData.category}
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="apparel">Apparel</option>
                  <option value="accessories">Accessories</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ▼
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="stock"
                  className="mb-1.5 block text-xs font-bold text-gray-900"
                >
                  Initial Stock
                </label>
                <input
                  id="stock"
                  type="number"
                  name="stock"
                  placeholder="0"
                  min={0}
                  onChange={handelChange}
                  value={formData.stock}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="mb-1.5 block text-xs font-bold text-gray-900"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3 text-sm font-medium text-gray-500">
                    $
                  </span>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    placeholder="0.00"
                    step="0.01"
                    min={0}
                    onChange={handelChange}
                    value={formData.price}
                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-7 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-xs font-bold text-gray-900"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Provide details about the item's specifications, condition, or storage requirements..."
                onChange={handelChange}
                value={formData.description}
                className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95 disabled:opacity-60"
              style={{ backgroundColor: "#1D72E7" }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Saving...
                </span>
              ) : (
                <>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <IoMdAdd className="h-4 w-4" />
                  </span>
                  Save Item
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
