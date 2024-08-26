import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./Fireconfig";
import './ProductGrid.css'

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Addproduct"), (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <div className=" productgrid p-8  min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8  text-[#645221] items-center flex justify-center">
        Men Fashions
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
            {product.photo && (
              <img
                src={product.photo}
                alt={product.name}
                className="border-2 h-96  rounded-2xl shadow-2xl mb-6"
              />
            )}
            <h2 className="text-xl font-semibold text-[#3ec3d7] mb-2">
              {product.name}
            </h2>
            {/* <p className="text-gray-700 mb-2">ID: {product.id}</p>
            <p className="text-gray-700 mb-2">Category: {product.category}</p> */}
            <div className="flex">
              <p className=" font-bold text-lg text-[#7f6933]">Price:</p>
              <p className=" text-[#32a4b8] mx-4 my-1">₹{product.price}</p>
            </div>
            <p className="font-bold text-lg text-[#7f6933]"> Description:</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
