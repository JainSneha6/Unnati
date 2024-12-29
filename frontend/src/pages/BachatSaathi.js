import React, { useState, useEffect } from "react";

const BachatSaathiPage = () => {
  const [formData, setFormData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch form data and recommendations from localStorage on mount
  useEffect(() => {
    const storedFormData = localStorage.getItem("transactionFormData");
    const storedRecommendations = localStorage.getItem("recommendations");

    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    } else {
      setError("No form data found in local storage.");
    }

    if (storedRecommendations) {
      setRecommendations(JSON.parse(storedRecommendations));
    } else {
      // If recommendations are not found, call the backend
      if (storedFormData) {
        getRecommendation(JSON.parse(storedFormData));
      }
    }
  }, []);

  // Fetch recommendations from backend and store in localStorage
  const getRecommendation = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendation");
      }

      const result = await response.json();
      const { recommendations } = result;

      // Store recommendations in state and local storage
      setRecommendations(recommendations);
      localStorage.setItem("recommendations", JSON.stringify(recommendations));
    } catch (err) {
      setError("Error while fetching recommendation: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-6 text-teal-500">Bachat Saathi</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {!formData ? (
          <div className="text-center text-xl">Loading your data...</div>
        ) : (
          <div>
            <div className="text-lg mb-6">
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Age:</strong> {formData.age}
              </p>
              <p>
                <strong>Spending Frequency:</strong> {formData.spendingFrequency}
              </p>
              <p>
                <strong>Expense Tracking Habit:</strong> {formData.expenseTracking}
              </p>
              <p>
                <strong>Financial Goals:</strong> {formData.financialGoals.join(", ")}
              </p>
              <p>
                <strong>Income:</strong> ₹{formData.income}
              </p>
            </div>

            {loading ? (
              <div className="text-center text-lg">Fetching your recommendation...</div>
            ) : (
              <>
                {recommendations.length > 0 ? (
                  <div className="mt-6 p-4 bg-teal-100 rounded-lg">
                    <h3 className="text-2xl font-semibold text-teal-500 mb-4">
                      Your Personalized Recommendation
                    </h3>
                    <ul className="text-lg">
                      {recommendations.map((rec, index) => (
                        <li key={index} className="mb-2">
                          {rec.category} - ₹{rec.amount}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center text-lg">
                    No recommendations available. Try fetching them again.
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BachatSaathiPage;
