const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  let votingInstance;
  const [owner, voter1, voter2] = accounts;

  beforeEach(async () => {
    // Deploy a fresh instance of the Voting contract before each test
    votingInstance = await Voting.new({ from: owner });
  });

  it("should add a candidate", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });
    const candidate = await votingInstance.getCandidate(1);
    
    assert.equal(candidate.name, "Alice", "Candidate name was not set correctly");
    assert.equal(candidate.voteCount.toNumber(), 0, "Candidate vote count should start at 0");
  });

  it("should allow a voter to vote", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });

    // First vote by voter1
    await votingInstance.vote(1, { from: voter1 });
    const voteCount = await votingInstance.getVoteCount(1);
    
    assert.equal(voteCount.toNumber(), 1, "Vote count should be 1 after first vote");

    // Second vote by voter2
    await votingInstance.vote(1, { from: voter2 });
    const updatedVoteCount = await votingInstance.getVoteCount(1);

    assert.equal(updatedVoteCount.toNumber(), 2, "Vote count should be 2 after second vote");
  });

  it("should revert if a voter votes twice", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });

    // First vote by voter1
    await votingInstance.vote(1, { from: voter1 });

    // Attempting to vote again with the same voter should revert
    try {
      await votingInstance.vote(1, { from: voter1 });
      assert.fail("The transaction should have failed due to double voting");
    } catch (error) {
      assert(
        error.message.includes("You have already voted"),
        "Expected 'You have already voted' error message"
      );
    }
  });

  it("should return the correct candidates count", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });
    await votingInstance.addCandidate("Bob", { from: owner });

    const candidatesCount = await votingInstance.getCandidatesCount();
    assert.equal(candidatesCount.toNumber(), 2, "Candidates count should be 2 after adding two candidates");
  });

  it("should return the correct total votes after voting", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });
    await votingInstance.addCandidate("Bob", { from: owner });

    await votingInstance.vote(1, { from: voter1 });
    await votingInstance.vote(2, { from: voter2 });

    const totalVotes = await votingInstance.getTotalVotes();
    assert.equal(totalVotes.toNumber(), 2, "Total votes should be 2 after two people vote");
  });
});
