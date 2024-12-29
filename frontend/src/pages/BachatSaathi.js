import React, { useState, useEffect } from "react";

const BachatSaathiPage = () => {
  const [formData, setFormData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch form data from local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("transactionFormData");

    if (storedData) {
      setFormData(JSON.parse(storedData));
    } else {
      setError("No data found in local storage.");
    }
  }, []);

  // Send data to backend to get a recommendation
  const getRecommendation = async () => {
    if (!formData) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendation");
      }

      const result = await response.json();
      setRecommendation(result.recommendation);
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

            <div className="flex justify-center mb-6">
              <button
                onClick={getRecommendation}
                className="bg-teal-500 hover:bg-teal-600 text-white py-4 px-8 rounded-lg shadow-xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300"
              >
                Get Personalized Recommendation
              </button>
            </div>

            {loading && <div className="text-center text-lg">Fetching your recommendation...</div>}

            {recommendation && (
              <div className="mt-6 p-4 bg-teal-100 rounded-lg">
                <h3 className="text-2xl font-semibold text-teal-500 mb-4">Your Personalized Recommendation</h3>
                <div
                  className="text-lg"
                  dangerouslySetInnerHTML={{ __html: recommendation }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BachatSaathiPage;
