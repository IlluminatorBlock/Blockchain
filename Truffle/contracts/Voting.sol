// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
        bool exists;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(uint256 => bool) public hasVoted; // to track if a voter has already voted with a specific number
    uint256 public candidatesCount;
    uint256 public totalVotes;

    modifier hasNotVoted(uint256 voterNumber) {
        require(!hasVoted[voterNumber], "This number has already voted");
        _;
    }

    modifier validCandidate(uint256 candidateId) {
        require(candidateId > 0 && candidateId <= candidatesCount && candidates[candidateId].exists, "Invalid candidate ID");
        _;
    }

    // Add a candidate
    function addCandidate(string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(_name, 0, true);
    }

    // Remove a candidate and reassign IDs of subsequent candidates
    function removeCandidate(uint256 candidateId) public validCandidate(candidateId) {
        delete candidates[candidateId];  // Remove the candidate

        // Shift remaining candidates' IDs down
        for (uint256 i = candidateId + 1; i <= candidatesCount; i++) {
            candidates[i - 1] = candidates[i];  // Shift each candidate's data to the previous ID
            delete candidates[i];  // Remove the original data at the old ID
        }
        candidatesCount--;
    }

    // Vote for a candidate
    function vote(uint256 _candidateId) public {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        candidates[_candidateId].voteCount++;
        totalVotes++;
    }

    // Get vote count for a candidate
    function getVoteCount(uint256 candidateId) public view validCandidate(candidateId) returns (uint256) {
        return candidates[candidateId].voteCount;
    }

    // Get total number of candidates
    function getCandidatesCount() public view returns (uint256) {
        return candidatesCount;
    }

    // Get total votes
    function getTotalVotes() public view returns (uint256) {
        return totalVotes;
    }

    // Get candidate by ID
    function getCandidate(uint256 candidateId) public view validCandidate(candidateId) returns (string memory, uint256) {
        Candidate memory candidate = candidates[candidateId];
        return (candidate.name, candidate.voteCount);
    }
}
