import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Loginsignup.css";
import { db } from "../Fireconfig";
import { addDoc, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export const Loginsignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData) newErrors.formData = alert("Name is required,Email is required,Password is requiredYou must agree to the terms");
 

    if (Object.keys(newErrors).length === 0) {
      // Submit form data or perform navigation upon successful submission
      console.log("Form data:", formData);
      const docRef = await addDoc(collection(db, 'users'), {
          name: formData.name,
          email: formData.email,
          password: formData.password // In a real app, you shouldn't store passwords in plaintext
        });
        console.log('Document written with ID: ', docRef.id);
        // Redirect to Sign In page or perform another action
        navigate('/signin');
       
    } else {
      setErrors(newErrors);
    }
     const auth = getAuth();
     createUserWithEmailAndPassword(auth, formData.email, formData.password)
       .then((userCredential) => {
         // Signed up
         const user = userCredential.user;
         console.log(user)
         // ...
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log(errorCode,errorMessage)
         // ..
       });
     
  };

  return (
    <div className="loginsignup">
      <div className="loginsignupcontainer">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Type your Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit">Continue</button>

          <p className="loginsignup-login">
            Already Have an Account?{" "}
            <span
              onClick={() => navigate("/signin")}
              style={{ color: "#FF4141", fontWeight: "600", cursor: "pointer" }}
            >
              Login Here
            </span>
          </p>

          <div className="loginsignup-agree">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <label htmlFor="agree">
              By continuing, I agree to the terms of Use & Privacy Policy.
            </label>
            {errors.agree && <p className="error">{errors.agree}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginsignup;
