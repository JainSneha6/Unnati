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

  // Handle query submission
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

  const navigateToHomepage = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex flex-col items-center justify-center p-8">
      <div className="flex items-center mb-6 w-full max-w-6xl ">
        <button
          onClick={navigateToHomepage}
          className="flex items-center text-white-700 font-bold text-lg mr-4 hover:text-teal-800 transition"
        >
          {/* Arrow icon styled with CSS */}
          <span className="material-icons">arrow_back</span>
        </button>
        <h1 className="ml-20 text-white text-5xl font-bold pl-20">Saheli</h1>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex flex-wrap justify-center gap-4 mb-8">
        {["Expert Advice", "Webinars", "FAQs", "Community Forum", "Tips", "Resources", "Success Stories", "Events"].map((segment) => (
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

      {/* Dynamic Segments */}
      <div className="w-full max-w-6xl  p-8 text-gray-800">
        {activeSegment === "Expert Advice" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Expert Advice</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {adviceList.map((advice, index) => (
                <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                  <h3 className="text-2xl font-semibold text-teal-500">{advice.title}</h3>
                  <p className="text-gray-700 mt-2">{advice.content}</p>
                  <p className="text-sm text-gray-500 mt-4">Posted on {advice.timestamp}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSegment === "Webinars" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Upcoming Webinars</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {webinars.map((webinar, index) => (
                <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                  <h3 className="text-2xl font-semibold text-teal-500">{webinar.title}</h3>
                  <p className="text-gray-700 mt-2">{webinar.description}</p>
                  <p className="text-sm text-gray-500 mt-4">Date: {webinar.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSegment === "FAQs" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">FAQs</h2>
            <ul className="space-y-4">
              {faqs.map((faq, index) => (
                <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-teal-500">{faq.question}</h3>
                  <p className="text-gray-700 mt-2">{faq.answer}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeSegment === "Community Forum" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Community Forum</h2>
            <form onSubmit={handleQuerySubmit} className="mb-8">
              <textarea
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                rows="4"
                placeholder="What's on your mind? Post your query here..."
                value={newQuery}
                onChange={(e) => setNewQuery(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-blue-600 shadow-md"
              >
                Post Query
              </button>
            </form>
            {queries.length > 0 ? (
              <ul className="space-y-6">
                {queries.map((query, index) => (
                  <li
                    key={index}
                    className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                  >
                    <p className="text-lg text-gray-800">{query.text}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Posted on {query.timestamp.toLocaleDateString()} at {query.timestamp.toLocaleTimeString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white text-center">No queries posted yet. Be the first to share!</p>
            )}
          </section>
        )}

        {activeSegment === "Tips" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Financial Tips</h2>
            <ul className="list-disc pl-5 space-y-2">
              {tips.map((tip, index) => (
                <li key={index} className="text-white">{tip}</li>
              ))}
            </ul>
          </section>
        )}

        {activeSegment === "Resources" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-teal-500">{resource.title}</h3>
                  <p className="text-gray-700">{resource.type}</p>
                  <a href={resource.link} className="text-black mt-2 block">Learn More</a>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSegment === "Success Stories" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Success Stories</h2>
            <ul className="space-y-4">
              {successStories.map((story, index) => (
                <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-teal-500">{story.name}</h3>
                  <p className="text-gray-700">{story.story}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeSegment === "Events" && (
          <section>
            <h2 className="text-4xl font-bold mb-4 text-white">Upcoming Events</h2>
            <ul className="space-y-4">
              {events.map((event, index) => (
                <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-teal-500">{event.event}</h3>
                  <p className="text-gray-700 mt-2">Date: {event.date}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div >
  );
};

export default Saheli;
