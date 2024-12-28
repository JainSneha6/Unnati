import React, { useState } from "react";

const TransactionForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [spendingFrequency, setSpendingFrequency] = useState("");
  const [expenseTracking, setExpenseTracking] = useState("");
  const [financialGoals, setFinancialGoals] = useState([]);
  const [income, setIncome] = useState(0);

  const financialGoalsOptions = [
    "Save for emergency fund",
    "Buy a house",
    "Pay off debt",
    "Invest in stocks",
    "Start a business",
  ];

  const spendingFrequencyOptions = [
    "Once or twice a week",
    "3-4 times a week",
    "5 or more times a week",
  ];

  const expenseTrackingOptions = [
    "Yes, I keep track regularly",
    "Sometimes, but not consistently",
    "No, I don’t track my expenses",
  ];

  const handleGoalChange = (e) => {
    const value = e.target.value;
    if (financialGoals.includes(value)) {
      setFinancialGoals(financialGoals.filter((goal) => goal !== value));
    } else {
      setFinancialGoals([...financialGoals, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      age,
      spendingFrequency,
      expenseTracking,
      financialGoals,
      income,
    };

    // Store form data in localStorage
    localStorage.setItem("transactionFormData", JSON.stringify(formData));

    console.log("Form data saved to localStorage", formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-teal-400 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-6 text-teal-500">Transaction Form</h2>

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
              <label htmlFor="spendingFrequency" className="block text-lg font-semibold mb-2">
                How often do you make purchases on non-essential items?
              </label>
              <select
                id="spendingFrequency"
                value={spendingFrequency}
                onChange={(e) => setSpendingFrequency(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select Spending Frequency</option>
                {spendingFrequencyOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="expenseTracking" className="block text-lg font-semibold mb-2">
                Do you track your expenses regularly?
              </label>
              <select
                id="expenseTracking"
                value={expenseTracking}
                onChange={(e) => setExpenseTracking(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select Expense Tracking Habit</option>
                {expenseTrackingOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="financialGoals" className="block text-lg font-semibold mb-2">
                Financial Goals
              </label>
              <div className="flex flex-wrap gap-4">
                {financialGoalsOptions.map((goal, index) => (
                  <label key={index} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={goal}
                      checked={financialGoals.includes(goal)}
                      onChange={handleGoalChange}
                      className="mr-2 rounded-md focus:ring-teal-500"
                    />
                    {goal}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="income" className="block text-lg font-semibold mb-2">
                Income (per month)
              </label>
              <input
                type="range"
                id="income"
                min="1000"
                max="500000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full h-2 bg-teal-300 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center mt-2">
                <span className="text-xl font-semibold">₹{income}</span>
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

export default TransactionForm;
