import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Saheli = () => {
  const [activeSegment, setActiveSegment] = useState("Expert Advice");
  const [queries, setQueries] = useState([]);
  const [newQuery, setNewQuery] = useState("");
  const navigate = useNavigate();

  // Hardcoded data for each segment
  const adviceList = [
    { title: "Start Small, Dream Big", content: "Begin your financial journey with small, consistent savings.", timestamp: "2024-01-01" },
    { title: "Leverage Technology", content: "Explore AI-powered tools to manage your investments efficiently.", timestamp: "2024-01-02" },
    { title: "Create Passive Income", content: "Invest in assets that generate passive income to build long-term wealth.", timestamp: "2024-01-03" },
    { title: "Stay Financially Independent", content: "Always have your own source of income to maintain independence.", timestamp: "2024-01-04" },
  ];

  const webinars = [
    { title: "Mastering Personal Finance", date: "2024-02-01", description: "Learn the fundamentals of managing personal finances." },
    { title: "Investment Strategies for Beginners", date: "2024-02-05", description: "Explore effective investment strategies." },
    { title: "Women in Finance", date: "2024-02-10", description: "Empowering women to take charge of their financial future." },
    { title: "Real Estate Investments", date: "2024-02-15", description: "Learn the essentials of real estate investing." },
    { title: "Retirement Planning", date: "2024-02-20", description: "Secure your future with effective retirement planning." },
  ];

  const faqs = [
    { question: "What is passive income?", answer: "Income earned with little day-to-day effort, like dividends or rental income." },
    { question: "How do I start investing in stocks?", answer: "Research the market, choose a brokerage, and invest in index funds." },
    { question: "What is an emergency fund?", answer: "Savings set aside for unexpected expenses, typically 3-6 months of expenses." },
    { question: "How do I reduce debt effectively?", answer: "Follow the snowball or avalanche method to tackle your debts systematically." },
    { question: "What is the 50/30/20 rule?", answer: "A budgeting rule allocating 50% to needs, 30% to wants, and 20% to savings." },
  ];

  const tips = [
    "Track your expenses daily for better budgeting.",
    "Invest in yourself through education and skill-building.",
    "Diversify your investments to minimize risks.",
    "Set short-term and long-term financial goals.",
    "Build an emergency fund for unexpected situations.",
    "Review your financial plan annually.",
    "Automate your savings to ensure consistency.",
  ];

  const resources = [
    { title: "The Intelligent Investor", type: "Book", link: "#" },
    { title: "Budgeting 101", type: "Article", link: "#" },
    { title: "Stock Market Basics", type: "Video", link: "#" },
    { title: "How to Build Credit", type: "Podcast", link: "#" },
    { title: "Mutual Fund Investments", type: "Guide", link: "#" },
    { title: "Retirement Planning for Women", type: "eBook", link: "#" },
  ];

  const successStories = [
    { name: "Priya Sharma", story: "Built a successful portfolio starting with just ₹1000." },
    { name: "Aarti Singh", story: "Achieved financial freedom by investing in real estate." },
    { name: "Ritika Agarwal", story: "Started a thriving side hustle to supplement her income." },
    { name: "Neha Verma", story: "Saved ₹1,00,000 in one year by following a disciplined budget." },
    { name: "Simran Kaur", story: "Transitioned to a high-paying career by investing in education." },
  ];

  const events = [
    { date: "2024-02-10", event: "Financial Freedom Webinar" },
    { date: "2024-03-05", event: "Entrepreneur Investment Summit" },
    { date: "2024-04-15", event: "Real Estate Investment Workshop" },
    { date: "2024-05-01", event: "Women Empowerment in Finance Conference" },
    { date: "2024-06-20", event: "Global Finance and Investment Forum" },
  ];

  const loans = [
    {
      type: "Personal Loan",
      bank: "State Bank of India (SBI)",
      interestRate: "10.5% p.a.",
      tenure: "1-5 years",
      description: "Unsecured loan for personal use.",
      features: "Quick processing, minimal documentation, no collateral required.",
      eligibility: "Minimum salary of ₹25,000 per month; age 21-58 years.",
      applyLink: "https://sbi.co.in/personal-loan-apply",
    },
    {
      type: "Home Loan",
      bank: "HDFC Bank",
      interestRate: "8.25% p.a.",
      tenure: "5-30 years",
      description: "Loan for purchasing or constructing a home.",
      features: "Flexible repayment options, affordable interest rates.",
      eligibility: "Salaried or self-employed individuals; minimum income ₹50,000/month.",
      applyLink: "https://hdfc.com/home-loan-apply",
    },
    {
      type: "Education Loan",
      bank: "Punjab National Bank (PNB)",
      interestRate: "9.5% p.a.",
      tenure: "5-15 years",
      description: "Loan for funding education expenses.",
      features: "Covers tuition, books, travel, and living expenses.",
      eligibility: "Indian nationals aged 18-35 pursuing recognized courses.",
      applyLink: "https://pnbindia.in/education-loan.html",
    },
    {
      type: "Car Loan",
      bank: "ICICI Bank",
      interestRate: "7.8% p.a.",
      tenure: "1-7 years",
      description: "Loan for purchasing a vehicle.",
      features: "Fast approval, up to 90% financing of on-road price.",
      eligibility: "Age 21-65 years; stable income source required.",
      applyLink: "https://icicibank.com/car-loan-apply",
    },
    {
      type: "Business Loan",
      bank: "Bank of Baroda",
      interestRate: "12% p.a.",
      tenure: "1-10 years",
      description: "Loan for business-related expenses.",
      features: "High loan limits, collateral-free loans for MSMEs.",
      eligibility: "Small businesses registered in India; good credit score.",
      applyLink: "https://bankofbaroda.in/business-loan",
    },
  ];


  const navigateToHomepage = () => {
    navigate("/home");
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (newQuery.trim()) {
      const newQueryObject = {
        text: newQuery,
        timestamp: new Date(),
      };
      setQueries([newQueryObject, ...queries]);
      setNewQuery("");
    }
  };

  const handleJoinNow = () => {
    // Redirecting to the specified URL (replace with the actual URL).
    window.location.href = "https://sync-space-nine.vercel.app/video";
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex flex-col items-center justify-center p-8">
      <div className="flex items-center mb-6 w-full max-w-6xl">
        <button
          onClick={navigateToHomepage}
          className="flex items-center text-white font-bold text-lg mr-4 hover:text-teal-800 transition"
        >
          <span className="material-icons">arrow_back</span>
        </button>
        <h1 className="text-white text-5xl font-bold">Saheli</h1>
      </div>

      <div className="mb-6 w-full max-w-6xl text-right">
        <button
          onClick={handleJoinNow}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-bold hover:bg-teal-700 transition"
        >
          Join Now
        </button>
      </div>

      <nav className="flex flex-wrap justify-center gap-4 mb-8">
        {[
          "Expert Advice",
          "Webinars",
          "FAQs",
          "Community Forum",
          "Tips",
          "Resources",
          "Success Stories",
          "Events",
          "Loan Options",
        ].map((segment) => (
          <button
            key={segment}
            className={`px-4 py-2 rounded-lg ${activeSegment === segment ? "bg-teal-500 text-white" : "bg-white text-teal-500"
              }`}
            onClick={() => setActiveSegment(segment)}
          >
            {segment}
          </button>
        ))}
      </nav>

      <div className="w-full max-w-6xl p-8 text-gray-800">
        {activeSegment === "Expert Advice" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Expert Advice</h2>
            {adviceList.map((advice, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
                <h3 className="text-2xl font-semibold">{advice.title}</h3>
                <p>{advice.content}</p>
                <span className="text-gray-500 text-sm">{advice.timestamp}</span>
              </div>
            ))}
          </section>
        )}
        {activeSegment === "Webinars" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Webinars</h2>
            {webinars.map((webinar, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
                <h3 className="text-2xl font-semibold">{webinar.title}</h3>
                <p>{webinar.description}</p>
                <span className="text-gray-500">{webinar.date}</span>
              </div>
            ))}
          </section>
        )}
        {activeSegment === "FAQs" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">FAQs</h2>
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </section>
        )}
        {activeSegment === "Community Forum" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Community Forum</h2>
            <form onSubmit={handleQuerySubmit} className="mb-4">
              <input
                type="text"
                placeholder="Ask a question..."
                value={newQuery}
                onChange={(e) => setNewQuery(e.target.value)}
                className="border rounded-lg p-2 w-full mb-2"
              />
              <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-lg">
                Submit
              </button>
            </form>
            {queries.map((query, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
                <p>{query.text}</p>
                <span className="text-gray-500 text-sm">{query.timestamp.toString()}</span>
              </div>
            ))}
          </section>
        )}
        {activeSegment === "Tips" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Tips</h2>
            <ul className="list-disc pl-6">
              {tips.map((tip, index) => (
                <li key={index} className="mb-2">
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        )}
        {activeSegment === "Resources" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Resources</h2>
            {resources.map((resource, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
                <h3 className="text-2xl font-semibold">{resource.title}</h3>
                <p>{resource.type}</p>
                <a href={resource.link} className="text-teal-500 underline">
                  Learn more
                </a>
              </div>
            ))}
          </section>
        )}
        {activeSegment === "Success Stories" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Success Stories</h2>
            {successStories.map((story, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
                <h3 className="text-2xl font-semibold">{story.name}</h3>
                <p>{story.story}</p>
              </div>
            ))}
          </section>
        )}
        {activeSegment === "Events" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Events</h2>
            {events.map((event, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
                <h3 className="text-2xl font-semibold">{event.event}</h3>
                <span className="text-gray-500">{event.date}</span>
              </div>
            ))}
          </section>
        )}
        {activeSegment === "Loan Options" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Loan Options</h2>
            {loans.map((loan, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
                <h3 className="text-2xl font-semibold">{loan.type}</h3>
                <p><strong>Bank:</strong> {loan.bank}</p>
                <p><strong>Interest Rate:</strong> {loan.interestRate}</p>
                <p><strong>Tenure:</strong> {loan.tenure}</p>
                <p>{loan.description}</p>
                <p><strong>Features:</strong> {loan.features}</p>
                <p><strong>Eligibility:</strong> {loan.eligibility}</p>
                <a
                  href={loan.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-bold mt-2 inline-block hover:bg-teal-700 transition"
                >
                  Apply Now
                </a>
              </div>
            ))}

          </section>
        )}
      </div>
    </div >
  );
};

export default Saheli;
