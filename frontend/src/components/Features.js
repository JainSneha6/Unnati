import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const features = [
  { title: 'Kahani Kosh', description: 'Financial storytelling for growth.', icon: '📘', path: '/kahani-kosh' },
  { title: 'Bachat Saathi', description: 'Your saving companion.', icon: '💰', path: '/bachat-saathi' },
  { title: 'Smart Nivesh', description: 'Invest smartly with AI insights.', icon: '📊', path: '/smart-nivesh' },
  { title: 'Salah Sakhi', description: 'Personalized financial advice.', icon: '🤝', path: '/salahsakhi' },
  { title: 'Nirnay', description: 'Decision-making simplified.', icon: '⚖️', path: '/nirnay' },
  { title: 'Saheli', description: 'Empowering women in finance.', icon: '🌸', path: '/saheli' },
];

function Features() {
  return (
    <section id="features" className="py-12 px-4">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link to={feature.path} key={index}>
              <div
                className="bg-white p-10 rounded shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl min-h-[210px]"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h4 className="text-2xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
