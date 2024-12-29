import React, { useEffect, useState } from 'react';

const LanguageSelection = () => {
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    const languages = [
        { name: 'Hindi', phrase: 'स्वागत है', englishPhrase: 'Swagat Hai' },
        { name: 'Tamil', phrase: 'வரவேற்கிறோம்', englishPhrase: 'Varaverkiram' },
        { name: 'Bengali', phrase: 'স্বাগতম', englishPhrase: 'Swagatam' },
        { name: 'Telugu', phrase: 'స్వాగతం', englishPhrase: 'Swagatham' },
        { name: 'Gujarati', phrase: 'સ્વાગત છે', englishPhrase: 'Swagat Chhe' },
        { name: 'Kannada', phrase: 'ಸ್ವಾಗತ', englishPhrase: 'Swagatha' },
        { name: 'Punjabi', phrase: 'ਸੁਆਗਤ ਹੈ', englishPhrase: 'Swagat Hai' },
        { name: 'Marathi', phrase: 'स्वागत आहे', englishPhrase: 'Swagat Aahe' },
        { name: 'Malayalam', phrase: 'സ്വാഗതം', englishPhrase: 'Swagatham' },
        { name: 'Odia', phrase: 'ସ୍ଵାଗତ', englishPhrase: 'Swagata' },
        { name: 'Assamese', phrase: 'স্বাগতম', englishPhrase: 'Swagatam' },
        { name: 'Maithili', phrase: 'स्वागतम्', englishPhrase: 'Swagatam' },
        { name: 'Konkani', phrase: 'स्वागत', englishPhrase: 'Swagat' },
        { name: 'Santali', phrase: 'ᱵᱟᱝᱞᱟ ᱮᱱᱟ', englishPhrase: 'Bengsa Ensa' },
        { name: 'Tulu', phrase: 'ಸ್ವಾಗತ', englishPhrase: 'Swagatha' },
        { name: 'Bhojpuri', phrase: 'स्वागत बा', englishPhrase: 'Swagat Ba' },
        { name: 'Dogri', phrase: 'स्वागतम्', englishPhrase: 'Swagatam' },
        { name: 'Kashmiri', phrase: 'خوش آمدید', englishPhrase: 'Khush Aamdid' },
        { name: 'Sindhi', phrase: 'ڀلي ڪري آيا', englishPhrase: 'Bhale Kari Aaya' },
        { name: 'Urdu', phrase: 'خوش آمدید', englishPhrase: 'Khush Aamdid' },
        { name: 'Manipuri', phrase: 'ꯃꯔꯤ ꯃꯇꯝ', englishPhrase: 'Meiri Metam' },
        { name: 'Mizo', phrase: 'Ka lawm e', englishPhrase: 'Ka lawm e' },
        { name: 'Bodo', phrase: 'विजयफ', englishPhrase: 'Bijayf' },
        { name: 'Garhwali', phrase: 'स्वागत छ', englishPhrase: 'Swagat Chha' },
        { name: 'Bhili/Bhilodi', phrase: 'स्वागत छे', englishPhrase: 'Swagat Che' },
        { name: 'Gondi', phrase: 'स्वागत', englishPhrase: 'Swagat' },
        { name: 'Ho', phrase: 'ᱵᱟᱝᱞᱟ ᱮᱱᱟ', englishPhrase: 'Bengsa Ensa' },
        { name: 'Khasi', phrase: 'Sngewbha', englishPhrase: 'Sngewbha' },
        { name: 'Lepcha', phrase: 'ᰛᰩᰵᰛᰦᰢ', englishPhrase: 'Leptcha' },
        { name: 'Angika', phrase: 'स्वागत छन्हि', englishPhrase: 'Swagat Chhahi' },
        { name: 'Kumaoni', phrase: 'स्वागत छु', englishPhrase: 'Swagat Chu' },
        { name: 'Nagpuri', phrase: 'स्वागत अछी', englishPhrase: 'Swagat Achi' },
        { name: 'Sanskrit', phrase: 'स्वागतम्', englishPhrase: 'Swagatam' },
        { name: 'English', phrase: 'Welcome', englishPhrase: 'Welcome' },
        { name: 'Chhattisgarhi', phrase: 'स्वागत हे', englishPhrase: 'Swagat He' },
        { name: 'Rajasthani', phrase: 'स्वागत है', englishPhrase: 'Swagat Hai' },
        { name: 'Sylheti', phrase: 'স্বাগতম', englishPhrase: 'Swagatam' },
        { name: 'Haryanvi', phrase: 'स्वागत है', englishPhrase: 'Swagat Hai' },
        { name: 'Tamang', phrase: 'བཀའ་བཏང་འཇོ', englishPhrase: 'Bak Tang Jo' },
        { name: 'Marwari', phrase: 'स्वागत छ', englishPhrase: 'Swagat Chha' },
        { name: 'Awadhi', phrase: 'स्वागत बा', englishPhrase: 'Swagat Ba' },
        { name: 'Karakana', phrase: 'ᬳᬸᬗᬸᬦᬸ', englishPhrase: 'Karaka' },
        { name: 'Madhya Pradesh Hindi', phrase: 'स्वागत है', englishPhrase: 'Swagat Hai' },
        { name: 'Pahari', phrase: 'स्वागत है', englishPhrase: 'Swagat Hai' },
        { name: 'Sourashtra', phrase: 'வரவேற்கிறோம்', englishPhrase: 'Varaverkiram' },
        { name: 'Bengali (Chittagonian)', phrase: 'স্বাগতম', englishPhrase: 'Swagatam' },
        { name: 'Meitei', phrase: 'ꯃꯔꯤ ꯃꯇꯝ', englishPhrase: 'Meiri Metam' },
        { name: 'Kashmiri Pandit', phrase: 'خوش آمدید', englishPhrase: 'Khush Aamdid' },
        { name: 'Urdu (Deccan)', phrase: 'خوش آمدید', englishPhrase: 'Khush Aamdid' },
        { name: 'Telugu (Rayalaseema)', phrase: 'స్వాగతం', englishPhrase: 'Swagatham' },
        { name: 'Manipuri (Meitei)', phrase: 'ꯃꯔꯤ ꯃꯇꯝ', englishPhrase: 'Meiri Metam' },
    ];

    // Fetch and load voices on component mount
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        loadVoices();

        // Listen for voices to be loaded
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const handleLanguageClick = (englishPhrase, phrase) => {
        if (voices.length === 0) {
            alert("No voices available yet. Please wait.");
            return;
        }

        // Find a suitable voice (preferably in English for transliteration)
        const voice = voices.find(v => v.lang.includes('en')) || voices[0]; // Default to English or fallback to first voice
        const utteranceEnglish = new SpeechSynthesisUtterance(englishPhrase);
        utteranceEnglish.voice = voice;

        // Speak the English phrase first
        speechSynthesis.speak(utteranceEnglish);

        // Then speak the native language phrase
        const utteranceNative = new SpeechSynthesisUtterance(phrase);
        utteranceNative.voice = voice;
        speechSynthesis.speak(utteranceNative);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400">
            <h1 className="text-white text-3xl font-bold mb-6">Choose Your Language</h1>
            <p className="text-white text-lg mb-8">
                Click or speak to select your preferred language.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {languages.map((lang, index) => (
                    <button
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-lg text-center hover:bg-teal-100 transition duration-300"
                        onClick={() => handleLanguageClick(lang.englishPhrase, lang.phrase)}
                    >
                        <p className="text-xl font-semibold">{lang.name}</p>
                        <p className="text-lg mt-1">{lang.phrase} ({lang.englishPhrase})</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelection;
