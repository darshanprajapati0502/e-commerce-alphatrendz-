import React, { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "./Fireconfig";

const AdminProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Addproduct"),
      (snapshot) => {
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching products: ", error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

 async function deletefn(id) {
    console.log(id);
    await deleteDoc(doc(db, "Addproduct", id))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })}

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#645221]">
        Men Fashions
      </h1>
      {loading ? (
        <div className="flex justify-center items-center text-center text-gray-700">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(({ id, photo, name, category, price, description }) => (
            <div
              key={id}
              className="bg-white p-4 rounded-lg shadow-lg relative"
            >
              {photo && (
                <img
                  src={photo}
                  alt={name}
                  className="w-auto h-56 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{name}</h2>

              <p className="text-gray-700 mb-2">Category: {category}</p>
              <p className="text-gray-700 mb-2">Price: ${price}</p>
              <p className="text-gray-700">{description}</p>
              <button
                onClick={() => {
                  deletefn(id);
                }}
                className="mx-32 my-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProductGrid;
