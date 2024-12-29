import React, { useState, useEffect } from "react";

const BachatSaathiPage = () => {
  const [formData, setFormData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savingsPlan, setSavingsPlan] = useState(""); // New state to hold savings plan

  // Fetch form data and recommendations from localStorage on mount
  useEffect(() => {
    const storedFormData = localStorage.getItem("villagerFormData");
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

      // Fetch savings plan after recommendations are fetched
      fetchSavingsPlan({ savingsGoals: data.savingsGoals, recommendations });
    } catch (err) {
      setError("Error while fetching recommendation: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch creative savings plan from backend based on savings goals and recommendations
  const fetchSavingsPlan = async ({ savingsGoals, recommendations }) => {
    try {
      const response = await fetch("http://localhost:5000/savings-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ savingsGoals, recommendations }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch savings plan");
      }

      const result = await response.json();
      setSavingsPlan(result.savingsPlan); // Store the generated savings plan
    } catch (err) {
      setError("Error while fetching savings plan: " + err.message);
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
                <strong>Family Size:</strong> {formData.familySize}
              </p>
              <p>
                <strong>Occupation:</strong> {formData.occupation.join(", ")}
              </p>
              <p>
                <strong>Monthly Income:</strong> ₹{formData.monthlyIncome}
              </p>
              <p>
                <strong>Savings Goals:</strong> {formData.savingsGoals.join(", ")}
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

            {/* New section for displaying the creative savings plan */}
            {savingsPlan && (
              <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
                <h3 className="text-2xl font-semibold text-teal-500 mb-4">
                  Creative Savings Plan
                </h3>
                <p className="text-lg">{savingsPlan}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BachatSaathiPage;
