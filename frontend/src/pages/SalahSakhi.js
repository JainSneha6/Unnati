import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SalahSakhi = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm Salah Sakhi. How can I assist you today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const speak = (messageText) => {
    if (!selectedVoice) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(messageText);
    speech.voice = selectedVoice;
    speech.rate = 1;
    speech.volume = 1;
    speech.pitch = 1;

    speech.onstart = () => setIsSpeaking(true);
    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    let isLoaded = false;

    const loadVoiceAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0 && !isLoaded) {
        const voice = voices.find(v => v.name.includes('Microsoft Zira')) ||
          voices.find(v => v.name.includes('Google UK English Female')) ||
          voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
          voices[0];

        setSelectedVoice(voice);
        isLoaded = true;

        setTimeout(() => {
          speak(messages[0].text);
        }, 100);
      }
    };

    loadVoiceAndSpeak();

    window.speechSynthesis.onvoiceschanged = loadVoiceAndSpeak;

    return () => {
      window.speechSynthesis.cancel();
      isLoaded = true;
    };
  }, []);

  const handleSend = async () => {
    if (userInput.trim() !== "") {
      setMessages([...messages, { sender: "user", text: userInput }]);
      setUserInput("");
      setIsBotTyping(true);

      try {
        // Send the user's message to the backend
        const response = await fetch("http://localhost:5000/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();
        const botResponse = data.response || "Sorry, I didn't understand that.";

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: botResponse },
        ]);

        speak(botResponse);
        setIsBotTyping(false);
      } catch (error) {
        console.error("Error sending message:", error);
        setIsBotTyping(false);
      }
    }
  };

  const startListening = () => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => console.error("Error occurred in speech recognition: ", event.error);

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setUserInput(speechToText);
      handleSend();
    };

    recognition.start();
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
        <h1 className="ml-20 text-white text-5xl font-bold pl-20">Salah Sakhi</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start w-full p-6">
        <div className="sticky top-0 w-full md:w-1/3 flex justify-center p-6">
          <img
            src={isSpeaking ? "AI-talking-avatar.gif" : "AI-idle-avatar.png"}
            alt="Chatbot Avatar"
            className="shadow-lg border-4 border-white w-240 h-240"
          />
        </div>

        <div className="flex flex-col items-center justify-center flex-grow md:w-2/3 w-full max-w-3xl p-6">
          <div className="w-full bg-white text-gray-800 p-4 rounded-lg shadow-lg max-h-[400px] overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${message.sender === "bot" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`p-3 rounded-lg shadow-md ${message.sender === "bot" ? "bg-blue-100 text-blue-800" : "bg-teal-100 text-teal-800"}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex items-center mt-4">
            <input
              type="text"
              className="flex-grow p-3 rounded-lg shadow-md text-gray-800"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-4 bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md transition duration-200"
            >
              Send
            </button>
            <button
              onClick={startListening}
              className={`ml-4 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg shadow-md transition duration-200 ${isListening ? "bg-gray-500" : ""}`}
              disabled={isListening}
            >
              {isListening ? "Listening..." : "Talk to Me"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalahSakhi;
