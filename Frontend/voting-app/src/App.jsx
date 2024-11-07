import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Django backend URL

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [voteId, setVoteId] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [leadingCandidate, setLeadingCandidate] = useState(null);

  // Fetch candidates list directly from Postman response format
  const fetchCandidates = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get_candidates/`);
      const fetchedCandidates = response.data.candidates || [];

      setCandidates(fetchedCandidates);
      findLeadingCandidate(fetchedCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  // Identify the leading candidate
  const findLeadingCandidate = (candidates) => {
    if (candidates.length === 0) return;

    const leading = candidates.reduce((max, candidate) =>
      candidate.vote_count > max.vote_count ? candidate : max
    );
    setLeadingCandidate(leading);
  };

  // Submit vote to the backend
  const handleVote = async () => {
    if (!voteId || !privateKey) {
      alert("Please select a candidate and enter your private key.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/vote/`, {
        candidate_id: voteId,
        private_key: privateKey,
      });
      alert("Vote cast successfully!");
      setVoteId(""); // Clear selection after voting
      setPrivateKey(""); // Clear private key after voting
      fetchCandidates(); // Refresh candidates list to update vote counts
    } catch (error) {
      console.error("Error casting vote:", error);
      alert(`Failed to cast vote: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="app-container">
      <h1>Voting DApp</h1>

      {/* Candidates List */}
      <div className="candidates-list">
        <h2>Candidates</h2>
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.id}>
              {candidate.name} - Votes: {candidate.vote_count}
            </li>
          ))}
        </ul>
      </div>

      {/* Vote Section */}
      <div className="vote-section">
        <h2>Cast Your Vote</h2>
        <select onChange={(e) => setVoteId(e.target.value)} value={voteId}>
          <option value="">Select a candidate</option>
          {candidates.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name}
            </option>
          ))}
        </select>
        <input
          type="password"
          placeholder="Enter your private key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
        <button onClick={handleVote}>Vote</button>
      </div>

      {/* Leading Candidate */}
      <div className="leading-candidate">
        <h2>Leading Candidate</h2>
        {leadingCandidate ? (
          <p>
            {leadingCandidate.name} with {leadingCandidate.vote_count} votes
          </p>
        ) : (
          <p>No votes yet</p>
        )}
      </div>
    </div>
  );
};

export default App;
