import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChapterPage = () => {
    const { id } = useParams();
    const [story, setStory] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [storyLines, setStoryLines] = useState([]);
    const [videoUrl, setVideoUrl] = useState(""); // State to store the video URL

    // Sample data for chapters (this can be fetched dynamically)
    const chapters = {
        1: { title: "Introduction to Financial Literacy", content: "Detailed content for the introduction." },
        2: { title: "Budgeting and Money Management", content: "Detailed content for budgeting." },
        3: { title: "Saving and Investing", content: "Detailed content for saving and investing." },
        4: { title: "Understanding Debt", content: "Detailed content for understanding debt." },
        5: { title: "Insurance and Risk Management", content: "Detailed content for insurance." },
        6: { title: "Retirement Planning", content: "Detailed content for retirement planning." },
    };

    const chapter = chapters[id];

    // Function to send story lines to the backend separately
    const sendStoryLinesToBackend = (story, lines) => {
        const requestData = {
            chapterId: id, // Include chapter ID
            story,         // Full story
            lines,         // Story lines
        };

        // Send the story and story lines to the backend
        fetch("http://localhost:5000/save-story-lines", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => response.blob()) // Expect a video blob in response
            .then((videoBlob) => {
                const videoUrl = URL.createObjectURL(videoBlob); // Create URL for the video blob
                setVideoUrl(videoUrl); // Set the video URL for playback
            })
            .catch((error) => {
                console.error("Failed to send story and lines to the backend:", error);
            });
    };

    useEffect(() => {
        const storedStory = localStorage.getItem(`story_${id}`);
        const storedStoryLines = JSON.parse(localStorage.getItem(`storyLines_${id}`));

        if (storedStory) {
            setStory(storedStory);
            setLoading(false);

            if (storedStoryLines) {
                setStoryLines(storedStoryLines);
                // Send story and lines to backend after fetching from localStorage
                sendStoryLinesToBackend(storedStory, storedStoryLines);
            } else {
                sendStoryToBackend(storedStory);
            }
        } else {
            const requestData = {
                chapterTitle: chapter?.title,
                languageAndDialect: localStorage.getItem("languageAndDialect"),
                location: localStorage.getItem("userLocation"),
                villagerFormData: JSON.parse(localStorage.getItem("villagerFormData")),
            };

            fetch("http://localhost:5000/generate-story", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            })
                .then((response) => response.json())
                .then((data) => {
                    setStory(data.story);
                    localStorage.setItem(`story_${id}`, data.story);
                    setLoading(false);

                    // Store storyLines and send them to the backend
                    if (data.lines) {
                        setStoryLines(data.lines);
                        localStorage.setItem(`storyLines_${id}`, JSON.stringify(data.lines));
                        sendStoryLinesToBackend(data.story, data.lines);
                    }
                })
                .catch((error) => {
                    setError("Failed to load story");
                    setLoading(false);
                });
        }
    }, [id, chapter?.title]);

    // Function to send the story to the backend if lines are not available
    const sendStoryToBackend = (story) => {
        const requestData = { story };

        fetch("http://localhost:5000/save-story", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Story successfully sent to the backend:", data);

                if (data.lines) {
                    setStoryLines(data.lines);
                    localStorage.setItem(`storyLines_${id}`, JSON.stringify(data.lines));
                    // Send story and lines to backend
                    sendStoryLinesToBackend(story, data.lines);
                }
            })
            .catch((error) => {
                console.error("Failed to send story to the backend:", error);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex flex-col items-center justify-center p-8">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl w-full">
                <h1 className="text-3xl font-bold text-teal-500">{chapter?.title}</h1>
                <p className="mt-4 text-gray-700">{chapter?.content}</p>
                {loading ? (
                    <p className="mt-4 text-gray-500">Loading the story...</p>
                ) : error ? (
                    <p className="mt-4 text-red-500">{error}</p>
                ) : (
                    <div className="mt-4 text-gray-700">
                        <h2 className="font-semibold text-teal-500">Generated Story:</h2>
                        <p>{story}</p>

                        <div className="mt-6">
                            <h3 className="font-semibold text-teal-500">10 Lines for Image Generation:</h3>
                            <ul className="list-disc pl-5">
                                {storyLines.length > 0 ? (
                                    storyLines.map((line, index) => (
                                        <li key={index} className="text-gray-700">{line}</li>
                                    ))
                                ) : (
                                    <p>No lines available for image generation.</p>
                                )}
                            </ul>
                        </div>

                        {videoUrl && (
                            <div className="mt-6">
                                <h3 className="font-semibold text-teal-500">Generated Video:</h3>
                                <video controls className="w-full max-w-3xl mt-4">
                                    <source src={videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChapterPage;
