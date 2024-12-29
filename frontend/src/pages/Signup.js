import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = { mobile, password };
    localStorage.setItem("signupData", JSON.stringify(formData));

    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 text-white">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6 text-teal-500">Signup</h2>
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-lg font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white py-4 px-8 rounded-lg shadow-xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300"
            >
              Signup
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/login")}
            className="text-teal-500 hover:text-teal-700 font-semibold"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
