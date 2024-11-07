// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Mappings
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;

    // State variables
    uint public candidatesCount;
    uint public totalVotes;

    // Events
    event Voted(address indexed voter, uint indexed candidateId);
    event CandidateAdded(uint indexed candidateId, string name);
    event CandidateRemoved(uint indexed candidateId);

    // Modifier to check for valid candidate ID
    modifier validCandidate(uint _candidateId) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");
        _;
    }

    // Add a new candidate
    function addCandidate(string memory _name) public {
        require(bytes(_name).length > 0, "Candidate name must be non-empty.");
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        emit CandidateAdded(candidatesCount, _name);
    }

    // Remove a candidate
    function removeCandidate(uint _candidateId) public validCandidate(_candidateId) {
        Candidate storage candidateToRemove = candidates[_candidateId];
        require(bytes(candidateToRemove.name).length > 0, "Candidate does not exist.");

        delete candidates[_candidateId];
        emit CandidateRemoved(_candidateId);
    }

    // Vote for a candidate
    function vote(uint _candidateId) public validCandidate(_candidateId) {
        require(!voters[msg.sender], "You have already voted.");

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        totalVotes++;

        emit Voted(msg.sender, _candidateId);
    }

    // Get the vote count for a candidate
    function getVoteCount(uint _candidateId) public view validCandidate(_candidateId) returns (uint) {
        return candidates[_candidateId].voteCount;
    }

    // Get candidate details (name and vote count)
    function getCandidate(uint _candidateId) public view validCandidate(_candidateId) returns (string memory name, uint voteCount) {
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.name, candidate.voteCount);
    }

    // Get the total number of candidates
    function getCandidatesCount() public view returns (uint) {
        return candidatesCount;
    }

    // Get total votes cast in the election
    function getTotalVotes() public view returns (uint) {
        return totalVotes;
    }
}
