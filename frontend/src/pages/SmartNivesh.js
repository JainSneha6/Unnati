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

  const FilterOption = ({ label, id, value, onChange, options }) => (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 w-full border rounded-lg text-black"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const navigateToHomepage = () => {
    navigate("/home");
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 text-white py-12 px-4 relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-yellow-500 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">Filters</h3>
          <div className="space-y-4">
            <FilterOption
              label="Minimum Investment Amount (₹)"
              id="minInvestment"
              value={minInvestment}
              onChange={setMinInvestment}
              options={[
                { value: 0, label: "Any amount" },
                { value: 1000, label: "₹1000+" },
                { value: 2000, label: "₹2000+" },
                { value: 3000, label: "₹3000+" },
                { value: 5000, label: "₹5000+" },
                { value: 10000, label: "₹10000+" },
              ]}
            />
            <FilterOption
              label="Risk Level"
              id="riskLevel"
              value={riskLevel}
              onChange={setRiskLevel}
              options={[
                { value: "", label: "Any Risk Level" },
                { value: "Low", label: "Low Risk" },
                { value: "Medium", label: "Medium Risk" },
                { value: "High", label: "High Risk" },
              ]}
            />
            <FilterOption
              label="Investment Type"
              id="investmentType"
              value={investmentType}
              onChange={setInvestmentType}
              options={[
                { value: "", label: "Any Type" },
                { value: "Government Scheme", label: "Government Scheme" },
                { value: "Bank Deposit", label: "Bank Deposit" },
                { value: "Fixed Deposit", label: "Fixed Deposit" },
                { value: "Savings Account", label: "Savings Account" },
                { value: "Fixed Income Security", label: "Fixed Income Security" },
                { value: "Government Savings Scheme", label: "Government Savings Scheme" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all ${isSidebarOpen ? "ml-64" : ""}`}>
        <div className="max-w-4xl mx-auto bg-teal-100 p-8 rounded-2xl shadow-2xl text-gray-800">
          {/* Back Button */}
          <button
            onClick={navigateToHomepage}
            className="flex items-center text-teal-700 font-bold text-lg mb-6 hover:text-teal-800 transition"
          >
            <span className="material-icons">arrow_back</span>
          </button>

          {/* Page Title */}
          <h2 className="text-4xl font-bold text-center mb-6 text-teal-700">Smart Nivesh</h2>

          {/* Error and Loading States */}
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          {loading ? (
            <LoadingSpinner />
          ) : !formData ? (
            <div className="text-center text-xl">Loading your data...</div>
          ) : (
            <div>
              {/* Sidebar Toggle Button */}
              <button
                onClick={toggleSidebar}
                className="bg-yellow-500 text-black p-2 rounded-lg mb-6"
              >
                {isSidebarOpen ? "Close Filters" : "Open Filters"}
              </button>

              {/* Investment Opportunities */}
              <div>
                <h3 className="text-2xl font-semibold text-teal-700 mb-4">
                  Micro-Investment Opportunities
                </h3>
                <ul className="text-lg space-y-3">
                  {filteredInvestments.map((investment, index) => (
                    <li
                      key={index}
                      className="p-3 bg-teal-50 rounded shadow cursor-pointer"
                      onClick={() => handleInvestmentClick(investment)}
                    >
                      <strong>{investment.investment}</strong> - ₹{investment.amount}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Investment Description */}
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

