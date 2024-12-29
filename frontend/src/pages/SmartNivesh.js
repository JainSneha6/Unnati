import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="w-16 h-16 border-4 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
  </div>
);

const SmartNiveshPage = () => {
  const [formData, setFormData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [investmentOpportunities, setInvestmentOpportunities] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [minInvestment, setMinInvestment] = useState(0);
  const [riskLevel, setRiskLevel] = useState("");
  const [investmentType, setInvestmentType] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [investmentDescription, setInvestmentDescription] = useState(""); // State to store the investment description
  const navigate = useNavigate();

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
      setError("No recommendations found in local storage.");
    }
  }, []);

  const fetchInvestmentOpportunities = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/smart-nivesh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recommendations,
          formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch investment opportunities");
      }

      const result = await response.json();
      setInvestmentOpportunities(result.investmentOpportunities);

      localStorage.setItem(
        "investmentOpportunities",
        JSON.stringify(result.investmentOpportunities)
      );
    } catch (err) {
      setError("Error while fetching investment opportunities: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData && recommendations.length > 0) {
      fetchInvestmentOpportunities();
    }
  }, [formData, recommendations]);

  useEffect(() => {
    let filtered = investmentOpportunities;

    if (minInvestment > 0) {
      filtered = filtered.filter((investment) => investment.amount >= minInvestment);
    }

    if (riskLevel) {
      filtered = filtered.filter((investment) => investment.risk === riskLevel);
    }

    if (investmentType) {
      filtered = filtered.filter((investment) => investment.type === investmentType);
    }

    setFilteredInvestments(filtered);

    localStorage.setItem("filteredInvestments", JSON.stringify(filtered));
  }, [minInvestment, riskLevel, investmentType, investmentOpportunities]);

  useEffect(() => {
    const storedFilteredInvestments = localStorage.getItem("filteredInvestments");
    if (storedFilteredInvestments) {
      setFilteredInvestments(JSON.parse(storedFilteredInvestments));
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInvestmentClick = async (investment) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/investment-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ investmentName: investment.investment }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch investment description");
      }

      const result = await response.json();
      setInvestmentDescription(result.description); // Store the description in state
    } catch (err) {
      setError("Error while fetching investment description: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToHomepage = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 text-white py-12 px-4 relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-teal-800 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-white mb-4">Filters</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="minInvestment" className="block font-medium">Minimum Investment Amount (₹)</label>
              <select
                id="minInvestment"
                value={minInvestment}
                onChange={(e) => setMinInvestment(e.target.value)}
                className="p-2 w-full border rounded-lg text-black"
              >
                <option value={0}>Any amount</option>
                <option value={1000}>₹1000+</option>
                <option value={2000}>₹2000+</option>
                <option value={3000}>₹3000+</option>
                <option value={5000}>₹5000+</option>
                <option value={10000}>₹10000+</option>
              </select>
            </div>

            <div>
              <label htmlFor="riskLevel" className="block font-medium">Risk Level</label>
              <select
                id="riskLevel"
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value)}
                className="p-2 w-full border rounded-lg text-black"
              >
                <option value="">Any Risk Level</option>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
              </select>
            </div>

            <div>
              <label htmlFor="investmentType" className="block font-medium">Investment Type</label>
              <select
                id="investmentType"
                value={investmentType}
                onChange={(e) => setInvestmentType(e.target.value)}
                className="p-2 w-full border rounded-lg text-black"
              >
                <option value="">Any Type</option>
                <option value="Government Scheme">Government Scheme</option>
                <option value="Bank Deposit">Bank Deposit</option>
                <option value="Fixed Deposit">Fixed Deposit</option>
                <option value="Savings Account">Savings Account</option>
                <option value="Fixed Income Security">Fixed Income Security</option>
                <option value="Government Savings Scheme">Government Savings Scheme</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={`transition-all ${isSidebarOpen ? "ml-64" : ""}`}>
        <div className="max-w-4xl mx-auto bg-teal-100 p-8 rounded-2xl shadow-2xl text-gray-800">
          <button
            onClick={navigateToHomepage}
            className="flex items-center text-teal-700 font-bold text-lg mb-6 hover:text-teal-800 transition"
          >
            <span className="material-icons">arrow_back</span>
          </button>

          <h2 className="text-4xl font-bold text-center mb-6 text-teal-700">Smart Nivesh</h2>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          {loading ? (
            <LoadingSpinner />
          ) : !formData ? (
            <div className="text-center text-xl">Loading your data...</div>
          ) : (
            <div>
              <div className="my-6">
                <button
                  onClick={toggleSidebar}
                  className="bg-teal-700 text-white p-2 rounded-lg mb-6"
                >
                  {isSidebarOpen ? "Close Filters" : "Open Filters"}
                </button>
                <div>
                  <h3 className="text-2xl font-semibold text-teal-700 mb-4">Micro-Investment Opportunities</h3>
                  <ul className="text-lg space-y-3">
                    {filteredInvestments.map((investment, index) => (
                      <li key={index} className="p-3 bg-teal-50 rounded shadow"
                        onClick={() => handleInvestmentClick(investment)}
                      >
                        <strong>{investment.investment}</strong> - ₹{investment.amount}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {investmentDescription && (
                <div className="mt-6 p-4 bg-teal-50 rounded shadow">
                  <h3 className="text-xl font-semibold text-teal-700">Investment Description:</h3>
                  <p className="text-lg">{investmentDescription}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartNiveshPage;
