import React, { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "./Fireconfig";
import './AddProduct.css'


const AddProduct = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
   
    name: "",
    description: "",
    file: null,
    category: "Jeans", // Default value
    price: "", // New field for price
  });

  // Handle change for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle change for file input
  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
    setFile(e.target.files[0]);
  };

  // Handle change for dropdown
  const handleCategoryChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `/images/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setImage(url);

        await addDoc(collection(db, "Addproduct"), {
          name: formData.name,
          description: formData.description,
          category: formData.category,
          price: formData.price, // Include price in the document
          photo: url, // Use the URL from getDownloadURL
        });

        console.log("Document successfully written.");
      } catch (error) {
        console.error("Error uploading file or adding document: ", error);
      }
    } else {
      console.error("No file selected for upload.");
    }
  };

  const [user, setUser] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Addproduct"), (snap) => {
      const allData = snap.docs.map((doc) => ({
        keyid: doc.id,
        ...doc.data(),
      }));
      console.log(allData);
      setUser(allData);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <div className="addproduct flex items-center justify-center  p-8">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-medium mb-2"
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-gray-700 font-medium mb-2"
            >
              File:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="w-full text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="Jeans">Jeans</option>
              <option value="Shirt">Shirt</option>
              <option value="T-Shirt">T-Shirt</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
