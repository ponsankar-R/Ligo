import React, { useState } from 'react';
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { marked } from "marked"; // Corrected import for marked
import DOMPurify from "dompurify"; // For sanitizing HTML

function InputPrompt({ setCurrentChat }) {
  const [prompt, setPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to track form submission status

  const handleSend = async () => {
    if (!prompt.trim()) {
      alert("Please enter a valid prompt!");
      return;
    }

    setIsSubmitting(true); // Set isSubmitting to true when the form is submitted

    try {
      // Add the user's prompt to the chat history
      setCurrentChat((prev) => [...prev, { type: 'prompt', content: prompt }]);

      // Send the prompt to the backend
      const result = await axios.post("http://localhost:5050/api/ollama/generate", { prompt });

      // Get the raw response from the backend
      const rawResponse = result.data.data;

      // Convert the raw response to HTML (if it's Markdown)
      const htmlResponse = marked(rawResponse);

      // Sanitize the HTML to prevent XSS attacks
      const sanitizedHTML = DOMPurify.sanitize(htmlResponse);

      // Add the sanitized HTML response to the chat history
      setCurrentChat((prev) => [...prev, { type: 'response', content: sanitizedHTML }]);

      // Clear the input field
      setPrompt('');
    } catch (error) {
      console.error("Error sending prompt:", error);
      setCurrentChat((prev) => [
        ...prev,
        { type: 'response', content: "<p>Error communicating with Ollama.</p>" },
      ]);
    } finally {
      setIsSubmitting(false); // Set isSubmitting to false when the form submission is complete
    }
  };

  return (
    <div className='w-full p-4'>
      <form>
        <textarea
          className='w-full h-24 border-2 border-blue-400 rounded-2xl p-4 resize-none focus:outline-blue-500'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Ask anything to Ligo...'
        />
        <button
          type='submit'
          onClick={handleSend}
          className={`absolute mt-2 right-5 text-3xl bg-slate-400 p-2 text-white rounded-3xl hover:bg-teal-800 active:bg-black ${isSubmitting ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

export default InputPrompt;





/* import React, { useEffect, useCallback } from 'react';

function MyComponent() {
  const sendFunction = useCallback(() => {
    // Your logic to send data or perform an action
    console.log('Send function triggered!');
    // ... your code here ...
  }, []); // Empty dependency array ensures this is only created once

  const handleKeyDown = useCallback((event) => {
    if (event.altKey && event.key === 's') { // Alt + S
      event.preventDefault(); // Prevent default browser behavior (e.g., saving the page)
      sendFunction();
    } else if (event.ctrlKey && event.key === 'Enter') { // Ctrl + Enter
        event.preventDefault();
        sendFunction();
    }
  }, [sendFunction]); // Add sendFunction to the dependency array

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Clean up on unmount
    };
  }, [handleKeyDown]); // Add handleKeyDown to the dependency array

 */