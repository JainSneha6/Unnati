import React, { useState, useRef } from "react";

const LanguageSelection = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorderRef = useRef(null);

    const languages = [
        { name: "Hindi", phrase: "स्वागत है। कृपया अपने बारे में बताएं।" },
        { name: "Tamil", phrase: "வரவேற்கிறோம். உங்கள் பற்றி சொல்லுங்கள்." },
        { name: "Bengali", phrase: "স্বাগতম। দয়া করে নিজের সম্পর্কে বলুন।" },
        { name: "Telugu", phrase: "స్వాగతం. దయచేసి మీ గురించి చెప్పండి." },
        { name: "Gujarati", phrase: "સ્વાગત છે. કૃપા કરીને તમારા વિશે કહો." },
        { name: "Kannada", phrase: "ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಬಗ್ಗೆ ಹೇಳಿ." },
        { name: "Punjabi", phrase: "ਸੁਆਗਤ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਬਾਰੇ ਦੱਸੋ।" },
        { name: "Marathi", phrase: "स्वागत आहे. कृपया तुमच्याबद्दल सांगा." },
        { name: "Malayalam", phrase: "സ്വാഗതം. ദയവായി നിങ്ങളുടെ കാര്യം പറയുക." },
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
        { name: "Manipuri", phrase: "ꯑꯅꯤꯗꯕꯦꯝꯗ꯭ꯕꯤ। ꯑꯪꯄꯨꯗꯝ ꯌꯥꯎꯂꯩꯀꯗꯥ ꯑꯗꯁꯤꯡꯅꯤ।" },
        { name: "Tripuri", phrase: "ꯑꯗꯨꯔꯕꯦꯝꯖꯤ। ꯑꯣꯏꯕꯨꯁꯅꯤꯗꯕꯨꯒꯤ।" },
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
                const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                setAudioBlob(blob);
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
                        <p className="text-xl font-semibold">{lang.name}</p>
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

                        <h2 className="text-2xl font-semibold mb-4">{selectedLanguage.name}</h2>
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelection;