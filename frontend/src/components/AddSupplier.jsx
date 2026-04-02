import React, { useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSupplier = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    uid: "",
    contact: "",
    email: "",
    category: "",
    rating: "",
    phone: "",
    website: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.email) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "/backend/suppliers.php",
        {
          ...formData,
          rating: formData.rating ? Number(formData.rating) : 0,
        },
        { withCredentials: true },
      );

      if (response.data?.status === "success") {
        navigate("/supplier");
      } else {
        setError(response.data?.message || "Unable to add supplier.");
      }
    } catch {
      setError("Network error while creating supplier.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-slate-50">
      <div className="px-6 py-8">
        <div className="mb-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/supplier")}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <MdOutlineArrowBackIosNew className="h-4 w-4" />
            Back to Supplier List
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Onboard New Supplier
          </h1>
        </div>

        <div className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="mb-4 text-sm text-gray-500">
            Register a new supplier in the procurement system.
          </p>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="mb-1 block text-xs font-bold text-gray-900"
                  htmlFor="name"
                >
                  Supplier Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Global Tech Corp"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-xs font-bold text-gray-900"
                  htmlFor="uid"
                >
                  Supplier UID
                </label>
                <input
                  id="uid"
                  name="uid"
                  type="text"
                  value={formData.uid}
                  onChange={handleChange}
                  placeholder="e.g., SUP-0144"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-xs font-bold text-gray-900"
                  htmlFor="contact"
                >
                  Primary Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-xs font-bold text-gray-900"
                  htmlFor="email"
                >
                  Primary Contact Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contact@globaltech.com"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-xs font-bold text-gray-900"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Raw Materials">Raw Materials</option>
                </select>
              </div>

              <div>
                <label
                  className="mb-1 block text-xs font-bold text-gray-900"
                  htmlFor="rating"
                >
                  Initial Rating (1-5)
                </label>
                <input
                  id="rating"
                  name="rating"
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="4.0"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-xs font-bold text-gray-900"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-xs font-bold text-gray-900"
                  htmlFor="website"
                >
                  Website URL
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.globaltech.com"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label
                className="mb-1 block text-xs font-bold text-gray-900"
                htmlFor="address"
              >
                Physical Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Logistics Blvd, Suite 400, Tech City, TC 12345"
                className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="mt-4 flex justify-end gap-3 border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={() => navigate("/supplier")}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Supplier"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSupplier;
