import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Confetti from "react-confetti";

function GirlModel({ position, targetPosition }) {
    const { scene } = useGLTF("tara.glb"); // Replace with your 3D model path

    useFrame(() => {
        if (targetPosition && (position.x !== targetPosition.x || position.z !== targetPosition.z)) {
            // Smooth transition using easing effect
            position.x += (targetPosition.x - position.x) * 0.5;
            position.z += (targetPosition.z - position.z) * 0.5;
            position.y += (targetPosition.y - position.y) * 0.5;
        }
    });

    return <primitive object={scene} scale={1.5} position={[position.x, position.y, position.z]} rotation={[0.2, 0.5, 0]} />;
}

export default function Nirnay() {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [position, setPosition] = useState({ x: -16, y: 5, z: -7 });
    const [gameOver, setGameOver] = useState(false);  // To track if the player has won
    const targetPositions = [
        { x: -16, y: 5, z: -7 }, // Start
        { x: -12, y: 3.75, z: -7 },   // Level 1
        { x: -8, y: 2.5, z: -7 },   // Level 2
        { x: -4, y: 1.25, z: -7 },    // Level 3
        { x: 0, y: 0, z: -7 },   // Level 4
        { x: 4.25, y: -2, z: -7 },   // Level 5
        { x: 8.5, y: -4, z: -7 },   // Level 6
        { x: 12.75, y: -6, z: -7 },   // Level 7
        { x: 17, y: -8, z: -7 },   // Finish
    ];

    const questions = [
        { question: "What is 5 + 3?", answers: ["7", "8", "9"], correct: "8" },
        { question: "What is the capital of India?", answers: ["Delhi", "Mumbai", "Kolkata"], correct: "Delhi" },
        { question: "What is 12 / 4?", answers: ["3", "4", "5"], correct: "3" },
        { question: "Which is the largest planet?", answers: ["Earth", "Mars", "Jupiter"], correct: "Jupiter" },
        { question: "What is the square of 5?", answers: ["15", "25", "30"], correct: "25" },
        { question: "Who painted the Mona Lisa?", answers: ["Van Gogh", "Da Vinci", "Picasso"], correct: "Da Vinci" },
        { question: "What is the boiling point of water?", answers: ["50°C", "100°C", "200°C"], correct: "100°C" },
        { question: "Who discovered gravity?", answers: ["Einstein", "Newton", "Galileo"], correct: "Newton" },
    ];

    const handleAnswer = (answer) => {
        if (answer === questions[currentLevel].correct) {
            if (currentLevel < targetPositions.length - 1) {
                setCurrentLevel((prev) => prev + 1);
                setPosition(targetPositions[currentLevel + 1]);
            }
        } else {
            if (currentLevel > 0) {
                setCurrentLevel((prev) => prev - 1);
                setPosition(targetPositions[currentLevel - 1]);
            }
        }
    };

    // Trigger the win condition when reaching the last position
    if (currentLevel === targetPositions.length - 1 && !gameOver) {
        setGameOver(true);
    }

    // Determine if the question box should be top-right or bottom-left
    const isTopRight = currentLevel % 2 === 0;

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center relative">
            {/* Heading */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
                <h1 className="text-white text-4xl font-bold">Nirnay</h1>
            </div>

            {/* Fullscreen Canvas */}
            <div className="absolute inset-0">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 10, 5]} intensity={1} />
                    <GirlModel position={position} targetPosition={targetPositions[currentLevel + 1]} />
                    <OrbitControls enableZoom={false} enableRotate={false} />
                </Canvas>
            </div>

            {/* Confetti when the game is over */}
            {gameOver && <Confetti />}

            {/* Question and Answers */}
            {!gameOver ? (
                <div
                    className={`absolute ${isTopRight ? "top-10 right-10" : " ml-10 bottom-10 left-40 transform -translate-x-1/2"} z-20 text-center bg-white p-6 rounded-lg shadow-xl`}
                >
                    <h2 className="text-xl font-semibold mb-4">{questions[currentLevel]?.question}</h2>
                    <div className="flex space-x-4">
                        {questions[currentLevel]?.answers.map((answer, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(answer)}
                                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                // Modal with blur background
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
                    {/* Modal content */}
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full text-center">
                        <h2 className="text-3xl font-semibold text-teal-600 mb-4">Congratulations! You've won!</h2>
                        <p className="text-xl text-teal-500 mb-6">Great job! You've completed all levels successfully.</p>
                        <button
                            onClick={() => window.location.reload()}  // Reset the game if needed
                            className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
