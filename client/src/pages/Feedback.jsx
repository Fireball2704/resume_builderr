import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../styles/tailwind.css'

function preprocessFeedback(feedback) {
    // Remove lines that start with "start" and end with "end"
    const filteredFeedback = feedback
        .split("\n")
        .filter((line) => !line.startsWith("`") && !line.endsWith("`"))
        .join("\n");

    return filteredFeedback;
}

function renderValue(value) {
    // If the value is an object, recursively render its properties
    if (typeof value === "object" && value !== null) {
        return (
            <ul className="">
            {Object.entries(value).map(([nestedKey, nestedValue]) => {
                // Check if nestedKey contains a digit
                const hasDigit = /\d/.test(nestedKey);

                // If it contains a digit, add 1 to it; otherwise, keep it as is
                const modifiedKey = hasDigit ? (parseInt(nestedKey) + 1).toString() : nestedKey;

                return (
                    <li key={modifiedKey}>
                        {hasDigit ? modifiedKey : <><strong>{modifiedKey}</strong>: </>} {renderValue(nestedValue)}
                    </li>
                );
            })}
        </ul>
        );
    }
    // Otherwise, render the value directly
    return value;
}

function Feedback() {
    const location = useLocation();
    let feedback = location.state.feedback;
    console.log(feedback);
    // Preprocess feedback to remove specific lines
    feedback = preprocessFeedback(feedback);
    const feedbackObject = JSON.parse(feedback)
    // Extract keys and values from the object
    const feedbackEntries = Object.entries(feedbackObject);
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />

            <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow-lg">
                {feedbackEntries.map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <p className="font-bold text-lg mb-2">{key}:</p>
                        <div className="ml-4">
                            {renderValue(value)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feedback;