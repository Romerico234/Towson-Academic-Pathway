// NOTE: THIS IS JUST A TESTING COMPONENT

import React, { useState } from "react";
import api from "../shared/services/api-service";

export default function OpenAITestComponent() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!prompt.trim()) {
            alert("Please enter a prompt.");
            return;
        }

        setLoading(true);

        try {
            const res = await api.post("/openai/generate", { prompt });
            setResponse(JSON.stringify(res.data, null, 2));
        } catch (error: any) {
            console.error("Error calling OpenAI API:", error);
            alert(
                error.response?.data?.message ||
                    "An error occurred while fetching the response."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold mb-4">OpenAI Test Component</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <textarea
                    className="w-full border border-gray-300 p-2 rounded mb-2"
                    rows={6}
                    placeholder="Enter your prompt here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Response"}
                </button>
            </form>
            {response && (
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-2xl font-bold mb-2">Response:</h2>
                    <pre className="whitespace-pre-wrap">{response}</pre>
                </div>
            )}
        </div>
    );
}
