import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const KahaniKosh = () => {
    // Sample chapters for financial literacy
    const navigate = useNavigate();

    const chapters = [
        {
            title: "Introduction to Financial Literacy",
            description: "Learn the basics of financial literacy and why it's important for your future.",
            link: "/chapter/1",
        },
        {
            title: "Budgeting and Money Management",
            description: "Understand how to create and manage a budget effectively.",
            link: "/chapter/2",
        },
        {
            title: "Saving and Investing",
            description: "Learn about the importance of saving and different investment strategies.",
            link: "/chapter/3",
        },
        {
            title: "Understanding Debt",
            description: "Learn how to manage debt and the impact it has on your financial health.",
            link: "/chapter/4",
        },
        {
            title: "Insurance and Risk Management",
            description: "Explore different types of insurance and how they protect your financial future.",
            link: "/chapter/5",
        },
        {
            title: "Retirement Planning",
            description: "Get tips and strategies for planning for a secure retirement.",
            link: "/chapter/6",
        },
    ];

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
                <h1 className="ml-20 text-white text-5xl font-bold pl-20">KahaniKosh - Financial Literacy</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {chapters.map((chapter, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
                    >
                        <h2 className="text-xl font-semibold text-teal-500">{chapter.title}</h2>
                        <p className="mt-4 text-gray-700">{chapter.description}</p>
                        <Link
                            to={chapter.link}
                            className="mt-6 inline-block bg-teal-500 text-white px-6 py-2 rounded-lg text-center hover:bg-teal-600 transition duration-300"
                        >
                            Read Chapter
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default KahaniKosh;
