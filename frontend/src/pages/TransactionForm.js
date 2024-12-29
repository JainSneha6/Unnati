import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VillagerForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [familySize, setFamilySize] = useState(0);
  const [occupation, setOccupation] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [savingsGoals, setSavingsGoals] = useState([]);

  const occupationOptions = [
    "Farmer",
    "Daily Wage Laborer",
    "Small Shop Owner",
    "Teacher",
    "Household Worker",
    "Fisherman",
    "Driver",
    "Craftsman",
    "Other",
  ];

  const savingsGoalsOptions = [
    "Save for child's education",
    "Build a house",
    "Buy farming equipment",
    "Start a small business",
    "Purchase livestock",
    "Plan for medical emergencies",
    "Save for a family wedding",
    "Other",
  ];

  const navigate = useNavigate();

  const handleOccupationChange = (e) => {
    const value = e.target.value;
    if (occupation.includes(value)) {
      setOccupation(occupation.filter((item) => item !== value));
    } else {
      setOccupation([...occupation, value]);
    }
  };

  const handleSavingsGoalChange = (e) => {
    const value = e.target.value;
    if (savingsGoals.includes(value)) {
      setSavingsGoals(savingsGoals.filter((goal) => goal !== value));
    } else {
      setSavingsGoals([...savingsGoals, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      age,
      familySize,
      occupation,
      monthlyIncome,
      savingsGoals,
    };

    // Store form data in localStorage
    localStorage.setItem("villagerFormData", JSON.stringify(formData));

    // Alert and navigate to login page
    alert("Form submitted successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-teal-400 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-6 text-teal-500">Villager Details Form</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-lg font-semibold mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your age"
                required
              />
            </div>

            <div>
              <label htmlFor="familySize" className="block text-lg font-semibold mb-2">
                Family Size
              </label>
              <input
                type="range"
                id="familySize"
                min="1"
                max="20"
                value={familySize}
                onChange={(e) => setFamilySize(e.target.value)}
                className="w-full h-2 bg-teal-300 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center mt-2">
                <span className="text-xl font-semibold">{familySize} members</span>
              </div>
            </div>

            <div>
              <label htmlFor="occupation" className="block text-lg font-semibold mb-2">
                Occupation
              </label>
              <div className="flex flex-wrap gap-4">
                {occupationOptions.map((job, index) => (
                  <label key={index} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={job}
                      checked={occupation.includes(job)}
                      onChange={handleOccupationChange}
                      className="mr-2 rounded-md focus:ring-teal-500"
                    />
                    {job}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="monthlyIncome" className="block text-lg font-semibold mb-2">
                Monthly Income (₹)
              </label>
              <input
                type="range"
                id="monthlyIncome"
                min="1000"
                max="500000"
                step="500"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full h-2 bg-teal-300 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center mt-2">
                <span className="text-xl font-semibold">₹{monthlyIncome}</span>
              </div>
            </div>

            <div>
              <label htmlFor="savingsGoals" className="block text-lg font-semibold mb-2">
                Savings Goals
              </label>
              <div className="flex flex-wrap gap-4">
                {savingsGoalsOptions.map((goal, index) => (
                  <label key={index} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={goal}
                      checked={savingsGoals.includes(goal)}
                      onChange={handleSavingsGoalChange}
                      className="mr-2 rounded-md focus:ring-teal-500"
                    />
                    {goal}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white py-4 px-8 rounded-lg shadow-xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VillagerForm;
