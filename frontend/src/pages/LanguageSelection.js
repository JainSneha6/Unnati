import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const LanguageSelection = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [loading, setLoading] = useState(false);
    const mediaRecorderRef = useRef(null);
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);

    const languages = [
        { name: "Hindi", nameInLanguage: "हिंदी", phrase: "स्वागत है। कृपया अपने बारे में बताएं।" },
        { name: "Tamil", nameInLanguage: "தமிழ்", phrase: "வரவேற்கிறோம். உங்கள் பற்றி சொல்லுங்கள்." },
        { name: "Bengali", nameInLanguage: "বাংলা", phrase: "স্বাগতম। দয়া করে নিজের সম্পর্কে বলুন।" },
        { name: "Telugu", nameInLanguage: "తెలుగు", phrase: "స్వాగతం. దయచేసి మీ గురించి చెప్పండి." },
        { name: "Gujarati", nameInLanguage: "ગુજરાતી", phrase: "સ્વાગત છે. કૃપા કરીને તમારા વિશે કહો." },
        { name: "Kannada", nameInLanguage: "ಕನ್ನಡ", phrase: "ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಬಗ್ಗೆ ಹೇಳಿ." },
        { name: "Punjabi", nameInLanguage: "ਪੰਜਾਬੀ", phrase: "ਸੁਆਗਤ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਬਾਰੇ ਦੱਸੋ।" },
        { name: "Marathi", nameInLanguage: "मराठी", phrase: "स्वागत आहे. कृपया तुमच्याबद्दल सांगा." },
        { name: "Malayalam", nameInLanguage: "മലയാളം", phrase: "സ്വാഗതം. ദയവായി നിങ്ങളുടെ കാര്യം പറയുക." },
        { name: "Odia", nameInLanguage: "ଓଡ଼ିଆ", phrase: "ସ୍ଵାଗତ। ଦୟାକରି ଆପଣଙ୍କ ବିଷୟରେ କହନ୍ତୁ।" },
        { name: "Assamese", nameInLanguage: "অসমীয়া", phrase: "স্বাগতম। অনুগ্ৰহ কৰি আপোনাৰ বিষয়ে ক'ব।" },
        { name: "Maithili", nameInLanguage: "मैथिली", phrase: "स्वागतम्। कृपया अपने बारे में बताऊ।" },
        { name: "Konkani", nameInLanguage: "कोंकणी", phrase: "स्वागत। कृपया तुजेबद्दल सांग." },
        { name: "Santali", nameInLanguage: "संताली", phrase: "ᱵᱟᱝᱞᱟ ᱮᱱᱟ। ᱵᱟᱢᱟᱜ ᱠᱷᱚᱸᱛᱷᱟᱹ ᱢᱩᱱᱜ ᱱᱟᱲᱟᱞᱮᱱ।" },
        { name: "Tulu", nameInLanguage: "ತುಳು", phrase: "ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ನಿನ್ನ ಬಗ್ಗೆ ಹೇಳು." },
        { name: "Bhojpuri", nameInLanguage: "भोजपुरी", phrase: "स्वागत बा। कृपया अपने बारे में बताईं।" },
        { name: "Dogri", nameInLanguage: "डोगरी", phrase: "स्वागतम्। कृपया अपने बारे में बताइए।" },
        { name: "Kashmiri", nameInLanguage: "کشميري", phrase: "خوش آمدید۔ براہ کرم اپنے بارے میں بتائیں۔" },
        { name: "Sindhi", nameInLanguage: "سنڌي", phrase: "ڀلي ڪري آيا. مهرباني ڪري پاڻ بابت ٻڌايو." },
        { name: "Mizo", nameInLanguage: "Mizo", phrase: "Ka lawm e. I lawmthu sawi rawh." },
        { name: "Bodo", nameInLanguage: "बोडो", phrase: "विजयफ। गwjwng नि बfwrwwn बwi." },
        { name: "Garhwali", nameInLanguage: "गढ़वाली", phrase: "स्वागत छ। कृपया अपने बारे में बताओ।" },
        { name: "Bhili", nameInLanguage: "भीली", phrase: "स्वागत छे। कृपया अपने बारे में बताओ।" },
        { name: "Gondi", nameInLanguage: "गोंडी", phrase: "स्वागत। कृपया अपने बारे में बताएं।" },
        { name: "Khasi", nameInLanguage: "खासी", phrase: "Sngewbha. Melei ia thuh pat ia lade." },
        { name: "Lepcha", nameInLanguage: "लेपचा", phrase: "ᰛᰩᰵᰛᰦᰢ। ᰛᰶᰱᰵᰛ ᰪ᰷ᰬ᰷ᰢᰧ ᰵ᰷ᰵ᰷ᰪᰵᰴ᰷ᰬᰲᰧ।" },
        { name: "Sanskrit", nameInLanguage: "संस्कृत", phrase: "स्वागतम्। कृपया आत्मनः विषयं वदतु।" },
        { name: "English", nameInLanguage: "English", phrase: "Welcome! Please tell us about yourself." },
        { name: "Haryanvi", nameInLanguage: "हरियाणवी", phrase: "स्वागत स। अपने बारे में बताओ।" },
        { name: "Awadhi", nameInLanguage: "अवधी", phrase: "स्वागत बा। अपने बारे में बताइए।" },
        { name: "Chhattisgarhi", nameInLanguage: "छत्तीसगढ़ी", phrase: "स्वागत हे। कृपया अपन बारे में बताव।" },
        { name: "Manipuri", nameInLanguage: "মণিপুরি", phrase: "ꯑꯅꯤꯗꯕꯦꯝꯗ꯭ꯕꯤ। ꯑꯪꯄꯨꯗꯝ ꯌꯥꯎꯂꯩꯀꯗꯥ ꯑꯗꯁꯤꯡꯅꯤ।" },
        { name: "Tripuri", nameInLanguage: "ত্রিপুরী", phrase: "ꯑꯗꯨꯔꯕꯦꯝꯖꯤ। ꯑꯣꯏꯕꯨꯁꯅꯤꯗꯕꯨꯒꯤ।" },
        { name: "Nagpuri", nameInLanguage: "नागपुरी", phrase: "स्वागत अछी। कृपया अपने बारे में बताइए।" },
        { name: "Kumaoni", nameInLanguage: "कुमाऊँनी", phrase: "स्वागत छु। अपने बारे में बताओ।" },
        { name: "Rajasthani", nameInLanguage: "राजस्थानी", phrase: "स्वागत है। कृपया अपने बारे में बताइए।" },
        { name: "Bhatneri", nameInLanguage: "भटनारी", phrase: "स्वागत। अपने बारे में बताओ।" },
        { name: "Bundeli", nameInLanguage: "बुंदेली", phrase: "स्वागत। कृपया अपने बारे में बताइए।" },
        { name: "Sourashtra", nameInLanguage: "સૌરાષ્ટ્ર", phrase: "வரவேற்கிறோம். உங்கள் பற்றி சொல்லுங்கள்." },
        { name: "Kodava", nameInLanguage: "ಕೋಡವ", phrase: "ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಬಗ್ಗೆ ಹೇಳಿ." },
        { name: "Ho", nameInLanguage: "ᱧᱟᱝᱞᱟ", phrase: "ᱵᱟᱝᱞᱟ ᱮᱱᱟ। ᱟᱞᱮᱱ ᱠᱷᱚᱸᱛᱟᱞᱟ।" },
        { name: "Banjara", nameInLanguage: "बंजारा", phrase: "स्वागत। अपने बारे में बताइए।" },
        { name: "Kurukh", nameInLanguage: "कुरुख", phrase: "सुआगत। अपने बारे में बताइए।" },
        { name: "Kharia", nameInLanguage: "खरिया", phrase: "सुआगत। अपने बारे में बताइए।" },
        { name: "Mundari", nameInLanguage: "मुंडारी", phrase: "ᱟᱵᱮᱞᱜ। ᱢᱩᱱᱜ ᱢᱮᱨᱟᱹᱜ ᱨᱤ।" },
        { name: "Marwari", nameInLanguage: "मारवाड़ी", phrase: "स्वागत है। कृपया अपने बारे में बताइए।" },
        { name: "Pahari", nameInLanguage: "पहाड़ी", phrase: "स्वागत छ। कृपया अपने बारे में बताओ।" },
        { name: "Tirhuti", nameInLanguage: "तिरहूटी", phrase: "स्वागतम्। कृपया अपने बारे में बताऊ।" },
        { name: "Sambalpuri", nameInLanguage: "ସମ୍ବଲପୁରୀ", phrase: "ସ୍ଵାଗତ। ଦୟାକରି ଆପଣଙ୍କ ବିଷୟରେ କହନ୍ତୁ।" }
    ];


    useEffect(() => {
        // Get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    setLocation(userLocation);
                    // Save location to localStorage
                    localStorage.setItem("userLocation", JSON.stringify(userLocation));
                },
                (error) => {
                    console.error("Error getting location:", error);
                    // Fallback if location permission is denied
                    setLocation({ latitude: null, longitude: null });
                }
            );
        }
    }, []);

    const handleLanguageClick = async (language) => {
        setSelectedLanguage(language);

        // Request microphone permission and start recording
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            const chunks = [];
            mediaRecorder.ondataavailable = (event) => chunks.push(event.data);

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: "audio/wav" }); // Using .wav for consistency
                setAudioBlob(blob);

                // Automatically send audio to backend after stop
                if (blob) {
                    const formData = new FormData();
                    formData.append("audio", blob, "recording.wav"); // Ensure the file extension is .wav

                    setLoading(true); // Show loading state while waiting for response
                    fetch("http://localhost:5000/detect_language", {
                        method: "POST",
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((result) => {
                            console.log("Detected Language:", result.language);
                            setLoading(false);

                            // Store the language and dialect in localStorage
                            const languageAndDialect = result.language || "Unknown";
                            localStorage.setItem("languageAndDialect", JSON.stringify(languageAndDialect));
                            navigate('/home'); // Redirect to home page
                        })
                        .catch((error) => {
                            console.error("Error sending audio to backend:", error);
                            setLoading(false);
                        });
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Microphone access denied:", err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const closeLanguageModal = () => {
        setSelectedLanguage(null);
        setAudioBlob(null);
        setIsRecording(false);
    };

    const playAudio = () => {
        if (audioBlob) {
            const audioURL = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioURL);
            audio.play();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 relative">
            <h1 className="text-white text-3xl font-bold mb-6">Choose Your Language</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6">
                {languages.map((lang, index) => (
                    <button
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-lg text-center hover:bg-teal-100 transition duration-300"
                        onClick={() => handleLanguageClick(lang)}
                    >
                        <p className="text-xl font-semibold">{lang.nameInLanguage}</p>
                    </button>
                ))}
            </div>

            {selectedLanguage && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center relative">
                        {/* Close Button (X) */}
                        <button
                            className="absolute top-2 right-2 text-2xl font-bold text-gray-700 hover:text-gray-900"
                            onClick={closeLanguageModal}
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-semibold mb-4">{selectedLanguage.nameInLanguage}</h2>
                        <p className="text-xl">{selectedLanguage.phrase}</p>

                        {isRecording ? (
                            <button
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                                onClick={stopRecording}
                            >
                                Stop Recording
                            </button>
                        ) : (
                            <button
                                className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600 transition"
                                onClick={playAudio}
                                disabled={!audioBlob}
                            >
                                Play Recording
                            </button>
                        )}

                        {loading ? (
                            <p className="mt-4 text-blue-500">Sending audio...</p>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelection;
