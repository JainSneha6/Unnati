import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CreativeSavingsPlanPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { savingsPlan } = location.state || {};
  const [recommendations, setRecommendations] = useState([]);
  const [weeklySavings, setWeeklySavings] = useState({});

  // Load recommendations and weekly savings progress from localStorage
  useEffect(() => {
    const storedRecommendations = localStorage.getItem("recommendations");
    const storedWeeklySavings = localStorage.getItem("weeklySavings");

    if (storedRecommendations) {
      const filteredRecommendations = JSON.parse(storedRecommendations).filter((rec) =>
        rec.category.toLowerCase().includes("fund") || rec.category.toLowerCase().includes("savings")
      );
      setRecommendations(filteredRecommendations);
    }

    if (storedWeeklySavings) {
      setWeeklySavings(JSON.parse(storedWeeklySavings));
    }
  }, []);

  // Save weekly savings data to localStorage immediately on change
  const handleWeeklySavingsChange = (category, week, value) => {
    const amountSaved = parseFloat(value) || 0;

    setWeeklySavings((prev) => {
      const updatedSavings = {
        ...prev,
        [category]: {
          ...prev[category],
          [week]: amountSaved,
        },
      };

      // Update localStorage immediately
      localStorage.setItem("weeklySavings", JSON.stringify(updatedSavings));

      return updatedSavings;
    });
  };

  // Calculate total saved for a category
  const getTotalSaved = (category) => {
    const savings = weeklySavings[category] || {};
    return Object.values(savings).reduce((total, weekSavings) => total + weekSavings, 0);
  };

  // Calculate remaining amount for a category
  const getRemainingAmount = (category, recommendedAmount) => {
    return Math.max(0, recommendedAmount - getTotalSaved(category));
  };

  // Calculate progress percentage for a category
  const getProgressPercentage = (category, recommendedAmount) => {
    const totalSaved = getTotalSaved(category);
    return Math.min(100, (totalSaved / recommendedAmount) * 100);
  };

  const goBack = () => navigate(-1);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 text-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-teal-100 p-8 rounded-2xl shadow-2xl text-gray-800">
        {savingsPlan ? (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-4xl font-bold text-center text-teal-500">
              {savingsPlan}
            </h2>
          </div>
        ) : (
          <div className="text-center text-lg mb-6">No savings plan available.</div>
        )}

        {recommendations.length > 0 ? (
          <div>
            <h3 className="text-2xl font-semibold text-black mb-4">
              Weekly Savings Progress
            </h3>
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-md"
                >
                  <div>
                    <p className="text-lg font-medium">{rec.category}</p>
                    <p className="text-sm text-gray-500">
                      Recommended: ₹{rec.amount}
                    </p>
                    <p className="text-sm text-gray-500">
                      Remaining: ₹{getRemainingAmount(rec.category, rec.amount)}
                    </p>
                    <div className="h-4 bg-gray-200 rounded-lg overflow-hidden mt-2">
                      <div
                        style={{
                          width: `${getProgressPercentage(rec.category, rec.amount)}%`,
                        }}
                        className="h-full bg-teal-500"
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-2">Weekly Savings:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((week) => (
                        <div key={week}>
                          <label
                            htmlFor={`week-${week}-${index}`}
                            className="block text-xs text-gray-600"
                          >
                            Week {week}:
                          </label>
                          <input
                            type="number"
                            id={`week-${week}-${index}`}
                            value={
                              (weeklySavings[rec.category] &&
                                weeklySavings[rec.category][week]) ||
                              ""
                            }
                            onChange={(e) =>
                              handleWeeklySavingsChange(
                                rec.category,
                                week,
                                e.target.value
                              )
                            }
                            className="p-2 w-full border border-gray-300 rounded-lg"
                            placeholder="₹0"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-teal-500 mt-4">
                    Total Saved: ₹{getTotalSaved(rec.category)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-lg">
            No recommendations related to funds or savings available to track.
          </div>
        )}

        <button
          onClick={goBack}
          className="mt-6 bg-yellow-400 text-black text-lg font-bold py-3 px-6 rounded-lg shadow hover:bg-yellow-500 transition w-full"
        >
          Back to Bachat Saathi
        </button>
      </div>
    </div>
  );
};

export default CreativeSavingsPlanPage;
