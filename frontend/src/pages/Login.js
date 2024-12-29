import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedData = JSON.parse(localStorage.getItem("signupData"));

    if (savedData && savedData.mobile === mobile && savedData.password === password) {
      // Save login state in localStorage
      localStorage.setItem("isLoggedIn", "true");

      alert("Login successful!");
      navigate("/home");  // Redirect to home page after successful login
    } else {
      alert("Invalid mobile number or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 text-white">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6 text-teal-500">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-lg font-semibold mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              pattern="[0-9]{10}"
              title="Enter a valid 10-digit mobile number"
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white py-4 px-8 rounded-lg shadow-xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/signup")}
            className="text-teal-500 hover:text-teal-700 font-semibold"
          >
            Don't have an account? Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
