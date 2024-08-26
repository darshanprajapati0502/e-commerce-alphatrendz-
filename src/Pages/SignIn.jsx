import React, { useState } from "react";
import "./CSS/Loginsignup.css"; // Reuse the existing CSS file
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const SignIn = () => {
  const navigate = useNavigate();
  // State to manage form inputs and errors
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length === 0) {
      // Proceed with form submission
      console.log("Form data:", formData);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Email:", formData.email);
          console.log("Password:", formData.password);
          console.log(user)
       
          localStorage.setItem("SignIn",formData.email)
           navigate("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error during sign-in:", errorCode, errorMessage);
          
        });

      // Clear form or redirect as needed
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignupcontainer">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
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

          <button type="submit">Sign In</button>

          <p className="loginsignup-login">
            Don't Have an Account?{" "}
            <span onClick={() => navigate("/login")}>Sign Up Here</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
