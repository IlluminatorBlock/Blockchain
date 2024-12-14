// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
        bool exists;
    }

    struct Voter {
        string fullName;
        string adhaarCard;
        string username;
        string password;
        bool exists;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(uint256 => bool) public hasVoted; // Track if a voter has already voted with their voter ID
    mapping(uint256 => Voter) public voters; // Store voter information by voter ID

    uint256 public candidatesCount;
    uint256 public totalVotes;
    string private constant SECRET_KEY = "test";

    modifier hasNotVoted(uint256 voterId) {
        require(!hasVoted[voterId], "This voter has already voted");
        _;
    }

    modifier validCandidate(uint256 candidateId) {
        require(candidateId > 0 && candidateId <= candidatesCount && candidates[candidateId].exists, "Invalid candidate ID");
        _;
    }

    modifier validVoter(uint256 voterId, string memory username, string memory password) {
        require(voters[voterId].exists, "Voter does not exist");
        require(
            keccak256(abi.encodePacked(voters[voterId].username)) == keccak256(abi.encodePacked(username)) &&
            keccak256(abi.encodePacked(voters[voterId].password)) == keccak256(abi.encodePacked(password)),
            "Invalid username or password"
        );
        _;
    }

    // Add a candidate using the secret key
    function addCandidate(string memory _name, string memory _secretKey) public {
        require(keccak256(abi.encodePacked(_secretKey)) == keccak256(abi.encodePacked(SECRET_KEY)), "Invalid secret key");
        candidatesCount++;
        candidates[candidatesCount] = Candidate(_name, 0, true);
    }

    // Remove a candidate using the secret key
    function removeCandidate(uint256 candidateId, string memory _secretKey) public validCandidate(candidateId) {
        require(keccak256(abi.encodePacked(_secretKey)) == keccak256(abi.encodePacked(SECRET_KEY)), "Invalid secret key");

        delete candidates[candidateId];

        // Shift remaining candidates' IDs down
        for (uint256 i = candidateId + 1; i <= candidatesCount; i++) {
            candidates[i - 1] = candidates[i];
            delete candidates[i];
        }
        candidatesCount--;
    }

    // Register a new voter
    function registerVoter(
        uint256 voterId,
        string memory fullName,
        string memory adhaarCard,
        string memory username,
        string memory password
    ) public {
        require(!voters[voterId].exists, "Voter ID already registered");

        voters[voterId] = Voter({
            fullName: fullName,
            adhaarCard: adhaarCard,
            username: username,
            password: password,
            exists: true
        });
    }

    // Vote for a candidate
    function vote(
        uint256 voterId,
        string memory username,
        string memory password,
        uint256 candidateId
    ) public validCandidate(candidateId) validVoter(voterId, username, password) hasNotVoted(voterId) {
        candidates[candidateId].voteCount++;
        hasVoted[voterId] = true;
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