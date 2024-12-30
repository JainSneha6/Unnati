import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BachatSaathiPage = () => {
  const [formData, setFormData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savingsPlan, setSavingsPlan] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedFormData = localStorage.getItem("villagerFormData");
    const storedRecommendations = localStorage.getItem("recommendations");
    const storedSavingsPlan = localStorage.getItem("savingsPlan");

    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    } else {
      setError("No form data found in local storage.");
    }

    if (storedRecommendations) {
      setRecommendations(JSON.parse(storedRecommendations));
    } else if (storedFormData) {
      getRecommendation(JSON.parse(storedFormData));
    }

    if (storedSavingsPlan) {
      setSavingsPlan(storedSavingsPlan);
    }
  }, []);

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
      setRecommendations(result.recommendations);
      localStorage.setItem("recommendations", JSON.stringify(result.recommendations));

      fetchSavingsPlan({ savingsGoals: data.savingsGoals, recommendations: result.recommendations });
    } catch (err) {
      setError("Error while fetching recommendation: " + err.message);
    } finally {
      setLoading(false);
    }
  };

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
      setSavingsPlan(result.savingsPlan);
      localStorage.setItem("savingsPlan", result.savingsPlan);
    } catch (err) {
      setError("Error while fetching savings plan: " + err.message);
    }
  };

  const navigateToSavingsPlan = () => {
    navigate("/savings-plan", { state: { savingsPlan } });
  };

  const navigateToHomepage = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-teal-100 p-8 rounded-2xl shadow-2xl text-gray-800">
        {/* Back Arrow Button */}
      <button
        onClick={navigateToHomepage}
        className="flex items-center text-teal-700 font-bold text-lg mb-6 hover:text-teal-800 transition"
      >
        {/* Arrow icon styled with CSS */}
        <span className="material-icons">arrow_back</span>
      </button>


        <h2 className="text-4xl font-bold text-center mb-6 text-teal-700">
          Bachat Saathi
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {!formData ? (
          <div className="text-center text-xl">Loading your data...</div>
        ) : (
          <div>

            {loading ? (
              <div className="text-center text-lg">Fetching your recommendation...</div>
            ) : (
              <>
                {recommendations.length > 0 ? (
                  <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold text-teal-700 mb-4">
                      Your Personalized Recommendation
                    </h3>
                    <ul className="text-lg space-y-3">
                      {recommendations.map((rec, index) => (
                        <li key={index} className="p-3 bg-teal-50 rounded shadow">
                          <strong>{rec.category}</strong> - ₹{rec.amount}
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

            {savingsPlan && (
              <button
                onClick={navigateToSavingsPlan}
                className="mt-6 w-full bg-yellow-400 text-teal-800 text-lg font-bold py-3 px-6 rounded-lg shadow hover:bg-yellow-500 transition"
              >
                Enroll Now
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BachatSaathiPage;
