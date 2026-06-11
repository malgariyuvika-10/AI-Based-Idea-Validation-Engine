import { useState } from "react";

const SubmitIdea = () => {
  const [idea, setIdea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(idea);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Submit Idea
      </h2>

      <form onSubmit={handleSubmit}>
        <textarea
          className="border p-3 w-full"
          rows="6"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 mt-4"
        >
          Validate
        </button>
      </form>
    </div>
  );
};

export default SubmitIdea;