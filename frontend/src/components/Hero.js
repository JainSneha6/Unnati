import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("isLoggedIn"); // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    alert("You have logged out successfully!");
    window.location.reload(); // Reload to update the UI
  };

  return (
    <section className="text-white text-center pt-8">
      <h2 className="text-4xl font-bold mb-4">Unnati</h2>
      <p className="text-lg mb-6">Empowering Financial Growth with AI</p>

      <div className="flex justify-center gap-4 mt-6">
        {isLoggedIn ? (
          <>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Logout
            </button>
            <button
              onClick={() => navigate("/detail")}
              className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              Villager Form
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/signup")}
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Signup
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/detail")}
              className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              Villager Form
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default Hero;
