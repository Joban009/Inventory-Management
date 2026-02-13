import React, { useState } from 'react'
import { IoMdAddCircle } from "react-icons/io";


const addItems = ({onClose}) => {
        const[formData, setForrmData] = useState({
            name: "",
            category:"",
            initial: "",
                price: "",
                description: "",
        });

        const[items, setItems] = useState([]);

        const handelChange = (e) => {
            setForrmData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };

        const handelSubmit = (e) => {
            e.preventDefault();

            if(!formData.name || !formData.price){
                alert("Please fill in all required fields");
                return;
            }
            const newItem = {
                id: Date.now(),
                ...formData,
            };
            setItems([...items, newItem]);
            setForrmData({
                name: "",
                category:"",
                initial: "",
                price: "",
                description: "",
            });
            onClose();
    };
  return (
    <div className="flex h-screen justify-center items-center bg-black bg-transparent backdrop-opacity-90 p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="border-1 rounded-md bg-white p-6">
        <h2 className="text-center font-bold text-xl">Create New Item</h2>
        <form
          onSubmit={handelSubmit}
          className="flex flex-col justify-center items-left gap-2"
        >
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Wireless Mechinical Keyboard"
            onChange={handelChange}
            value={formData.name}
            className="border-1 rounded-sm px-2 py-0.5"
          />
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            onChange={handelChange}
            value={formData.category}
            className="border-1 rounded-sm px-2 py-0.5"
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
          </select>
          <div className="flex gap-2 mt-1">
            <label htmlFor="initial">Initial Stock</label>
            <input
              type="number"
              name="initial"
              placeholder="e.g. 0"
              onChange={handelChange}
              value={formData.initial}
              className="border-1 rounded-sm px-2 py-0.5"
            />
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              placeholder="e.g. 100"
              onChange={handelChange}
              value={formData.price}
              className="border-1 rounded-sm px-2 py-0.5"
            />
          </div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            placeholder="e.g. A high-quality wireless mechanical keyboard with customizable RGB lighting and programmable keys."
            onChange={handelChange}
            value={formData.description}
            className="border-1 rounded-sm px-2 py-0.5"
          ></textarea>
          <div className='flex items-center justify-end text-center gap-2 mt-4'>
          <button type="button" onClick={onClose} className='flex gap-1 items-center border border-gray-300 px-4 py-2 rounded-md'>
            Cancel
          </button>
          <button type="submit" className='flex gap-1 items-center bg-blue-500 text-white px-4 py-2 rounded-md'>
            <IoMdAddCircle />
            Add Item
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default addItems

