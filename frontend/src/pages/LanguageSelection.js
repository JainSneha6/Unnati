import React, { useState } from "react";

const LanguageSelection = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const languages = [
        { name: "Hindi", phrase: "स्वागत है। कृपया अपने बारे में बताएं।" },
        { name: "Tamil", phrase: "வரவேற்கிறோம். உங்கள் பற்றி சொல்லுங்கள்." },
        { name: "Bengali", phrase: "স্বাগতম। দয়া করে নিজের সম্পর্কে বলুন।" },
        { name: "Telugu", phrase: "స్వాగతం. దయచేసి మీ గురించి చెప్పండి." },
        { name: "Gujarati", phrase: "સ્વાગત છે. કૃપા કરીને તમારા વિશે કહો." },
        { name: "Kannada", phrase: "ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಬಗ್ಗೆ ಹೇಳಿ." },
        { name: "Punjabi", phrase: "ਸੁਆਗਤ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਬਾਰੇ ਦੱਸੋ।" },
        { name: "Marathi", phrase: "स्वागत आहे. कृपया तुमच्याबद्दल सांगा." },
        { name: "Malayalam", phrase: "സ്വാഗതം. ദയവായി നിങ്ങളുടെ കാര്യത്തിന് പറയുക." },
        { name: "Odia", phrase: "ସ୍ଵାଗତ। ଦୟାକରି ଆପଣଙ୍କ ବିଷୟରେ କହନ୍ତୁ।" },
        { name: "Assamese", phrase: "স্বাগতম। অনুগ্ৰহ কৰি আপোনাৰ বিষয়ে ক'ব।" },
        { name: "Maithili", phrase: "स्वागतम्। कृपया अपने बारे में बताऊ।" },
        { name: "Konkani", phrase: "स्वागत। कृपया तुजेबद्दल सांग." },
        { name: "Santali", phrase: "ᱵᱟᱝᱞᱟ ᱮᱱᱟ। ᱵᱟᱢᱟᱜ ᱠᱷᱚᱸᱛᱷᱟᱹ ᱢᱩᱱᱜ ᱱᱟᱲᱟᱞᱮᱱ।" },
        { name: "Tulu", phrase: "ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ನಿನ್ನ ಬಗ್ಗೆ ಹೇಳು." },
        { name: "Bhojpuri", phrase: "स्वागत बा। कृपया अपने बारे में बताईं।" },
        { name: "Dogri", phrase: "स्वागतम्। कृपया अपने बारे में बताइए।" },
        { name: "Kashmiri", phrase: "خوش آمدید۔ براہ کرم اپنے بارے میں بتائیں۔" },
        { name: "Sindhi", phrase: "ڀلي ڪري آيا. مهرباني ڪري پاڻ بابت ٻڌايو." },
        { name: "Mizo", phrase: "Ka lawm e. I lawmthu sawi rawh." },
        { name: "Bodo", phrase: "विजयफ। गwjwng नि बfwrwwn बwi." },
        { name: "Garhwali", phrase: "स्वागत छ। कृपया अपने बारे में बताओ।" },
        { name: "Bhili", phrase: "स्वागत छे। कृपया अपने बारे में बताओ।" },
        { name: "Gondi", phrase: "स्वागत। कृपया अपने बारे में बताएं।" },
        { name: "Khasi", phrase: "Sngewbha. Melei ia thuh pat ia lade." },
        { name: "Lepcha", phrase: "ᰛᰩᰵᰛᰦᰢ। ᰛᰶᰱᰵᰛ ᰪ᰷ᰬ᰷ᰢᰧ ᰵ᰷ᰵ᰷ᰪᰵᰴ᰷ᰬᰲᰧ।" },
        { name: "Sanskrit", phrase: "स्वागतम्। कृपया आत्मनः विषयं वदतु।" },
        { name: "English", phrase: "Welcome! Please tell us about yourself." },
        { name: "Haryanvi", phrase: "स्वागत स। अपने बारे में बताओ।" },
        { name: "Awadhi", phrase: "स्वागत बा। अपने बारे में बताइए।" },
        { name: "Chhattisgarhi", phrase: "स्वागत हे। कृपया अपन बारे में बताव।" },
        { name: "Nagpuri", phrase: "स्वागत अछी। कृपया अपने बारे में बताइए।" },
        { name: "Kumaoni", phrase: "स्वागत छु। अपने बारे में बताओ।" },
        { name: "Rajasthani", phrase: "स्वागत है। कृपया अपने बारे में बताइए।" },
        { name: "Bhatneri", phrase: "स्वागत। अपने बारे में बताओ।" },
        { name: "Bundeli", phrase: "स्वागत। कृपया अपने बारे में बताइए।" },
        { name: "Sourashtra", phrase: "வரவேற்கிறோம். உங்கள் பற்றி சொல்லுங்கள்." },
        { name: "Kodava", phrase: "ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಬಗ್ಗೆ ಹೇಳಿ." },
        { name: "Ho", phrase: "ᱵᱟᱝᱞᱟ ᱮᱱᱟ। ᱟᱞᱮᱱ ᱠᱷᱚᱸᱛᱟᱞᱟ।" },
        { name: "Banjara", phrase: "स्वागत। अपने बारे में बताइए।" },
        { name: "Kurukh", phrase: "सुआगत। अपने बारे में बताइए।" },
        { name: "Kharia", phrase: "सुआगत। अपने बारे में बताइए।" },
        { name: "Mundari", phrase: "ᱟᱵᱮᱞᱜ। ᱢᱩᱱᱜ ᱢᱮᱨᱟᱹᱜ ᱨᱤ।" },
        { name: "Marwari", phrase: "स्वागत है। कृपया अपने बारे में बताइए।" },
        { name: "Pahari", phrase: "स्वागत छ। कृपया अपने बारे में बताओ।" },
        { name: "Tirhuti", phrase: "स्वागतम्। कृपया अपने बारे में बताऊ।" },
        { name: "Sambalpuri", phrase: "ସ୍ଵାଗତ। ଦୟାକରି ଆପଣଙ୍କ ବିଷୟରେ କହନ୍ତୁ।" }
    ];

    const handleLanguageClick = (language) => {
        setSelectedLanguage(language);
    };

    const closeModal = () => {
        setSelectedLanguage(null);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 relative overflow-hidden">
            <div className={`${selectedLanguage ? 'backdrop-blur-2xl' : 'backdrop-blur-lg'} w-full h-full absolute top-0 left-0 z-20 flex items-center justify-center`}>
                {/* Decorative Background */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 to-teal-400 opacity-20 animate-pulse blur-lg"></div>

                {/* Language Cards */}
                <div className={`grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-6 gap-5 bg-opacity-75 rounded-lg w-full max-w-screen-xl`}>
                    {languages.map((lang, index) => (
                        <button
                            key={index}
                            className="bg-white p-3 rounded-lg shadow-lg hover:bg-indigo-100 transform hover:scale-95 transition duration-300"
                            onClick={() => handleLanguageClick(lang)}
                        >
                            <p className="text-xl font-bold text-gray-800">{lang.name}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Modal for Selected Language */}
            {selectedLanguage && (
                <div className="z-20 fixed inset-0 bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto relative z-50 flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedLanguage.name}</h2>
                    <p className="text-lg text-gray-600">{selectedLanguage.phrase}</p>
                    <button
                        className="mt-8 bg-teal-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-teal-600 transition"
                        onClick={closeModal}
                    >
                        Back to Language Selection
                    </button>
                </div>
            )}
        </div>
    );
};

export default LanguageSelection;
