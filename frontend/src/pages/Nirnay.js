import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Confetti from "react-confetti";

function GirlModel({ position, targetPosition }) {
    const { scene } = useGLTF("tara.glb"); // Replace with your 3D model path

    useFrame(() => {
        if (targetPosition && (position.x !== targetPosition.x || position.z !== targetPosition.z || position.y !== targetPosition.y)) {

            position.x += (targetPosition.x - position.x) * 0.05;
            position.z += (targetPosition.z - position.z) * 0.05;
            position.y += (targetPosition.y - position.y) * 0.1; // Smooth transition for height
        }
    });

    return <primitive object={scene} scale={1.5} position={[position.x, position.y, position.z]} rotation={[0.2, 0.5, 0]} />;
}

export default function Nirnay() {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [position, setPosition] = useState({ x: -16, y: -8, z: -7 });
    const [gameOver, setGameOver] = useState(false);  // To track if the player has won

    // Define steps as target positions, adjusting the y-value for each step.
    const targetPositions = [
        { x: -16, y: -8, z: -7 }, // Start
        { x: -12, y: -6, z: -7 },   // Level 1 (Step 1)
        { x: -8, y: -4, z: -7 },    // Level 2 (Step 2)
        { x: -4, y: -2, z: -7 },    // Level 3 (Step 3)
        { x: 0, y: 0, z: -7 },      // Level 4 (Step 4)
        { x: 4.25, y: 2, z: -7 },   // Level 5 (Step 5)
        { x: 8.5, y: 4, z: -7 },    // Level 6 (Step 6)
        { x: 12.75, y: 6, z: -7 },  // Level 7 (Step 7)
        { x: 17, y: 8, z: -7 },     // Finish (Final Step)
    ];

    const questions = [
        {
            question: "Ramu earns ₹5,000 a month by selling fruits.", answers: ["Ramu saves ₹2,000 every month in a bank to use in emergencies or invest in expanding his fruit business.", "Ramu spends all ₹5,000 on buying a new phone, leaving nothing for savings or future needs."], correct: "Ramu saves ₹2,000 every month in a bank to use in emergencies or invest in expanding his fruit business."
        },
        {
            question: "Radha’s crop failed, and she needs ₹10,000.", answers: ["Radha borrows from a moneylender who charges very high interest, and she struggles to pay it back.", "Radha borrows from the cooperative bank at a low interest rate and repays it slowly."], correct: "Radha borrows from the cooperative bank at a low interest rate and repays it slowly."
        },
        {
            question: "Lalita earns ₹3,000 selling handmade baskets.", answers: ["Lalita saves ₹1,000 every month to repair her house before the monsoon.", "Lalita spends all her money on festivals, leaving nothing for house repairs."], correct: "Lalita saves ₹1,000 every month to repair her house before the monsoon."
        },
        {
            question: "Kiran hears about a scheme to double his savings in a month.", answers: ["Kiran puts his money in a bank account, where it grows slowly but safely.", "Kiran gives his money to the scheme and loses everything when it turns out to be a fraud."], correct: "Kiran puts his money in a bank account, where it grows slowly but safely."
        },
        {
            question: "Mohan earns ₹6,000 a month and spends ₹5,000.", answers: ["Mohan saves ₹1,000 every month for emergencies like illness or crop failure.", "Mohan spends the extra ₹1,000 on luxuries, leaving nothing for emergencies"], correct: "Mohan saves ₹1,000 every month for emergencies like illness or crop failure."
        },
        {
            question: "Sita sells vegetables and earns ₹4,000 a month.", answers: ["Sita spends all her earnings on sweets and festivals, so her business doesn’t grow.", "Sita saves ₹2,000 to buy a cart, which will help her sell more vegetables and earn more."], correct: "Sita saves ₹2,000 to buy a cart, which will help her sell more vegetables and earn more."
        },
        {
            question: "Raju has ₹3,000 to spend for farming.", answers: ["Raju buys good-quality seeds that will give him a better harvest next season", "Raju spends the money on a new watch, leaving nothing for his farm."], correct: "Raju buys good-quality seeds that will give him a better harvest next season"
        },
        {
            question: "Pooja borrows ₹20,000 to expand her tailoring business.", answers: ["Pooja spends the loan on a wedding, leaving her with debt and no way to repay it.", "Pooja uses the loan to buy a sewing machine and earns more money by stitching faster."], correct: "Pooja uses the loan to buy a sewing machine and earns more money by stitching faster."
        },
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

    // Determine if the question box should be top-left or bottom-right
    const isTopLeft = currentLevel % 2 === 0;

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
            {/* Question and Answers */}
            {/* Question and Answers */}
            {!gameOver ? (
                <div
                    className={`absolute ${isTopLeft ? "top-10 left-10" : "bottom-10 right-10"} z-20 text-center bg-white p-6 rounded-lg shadow-xl w-80`}
                >
                    <h2 className="text-xl font-semibold mb-4">{questions[currentLevel]?.question}</h2>
                    <div className="flex flex-col space-y-4"> {/* Changed to flex-col and added space-y-4 */}
                        {questions[currentLevel]?.answers.map((answer, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(answer)}
                                className="px-4 py-6 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition w-full self-center text-left whitespace-normal"
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
