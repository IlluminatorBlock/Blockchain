const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  let votingInstance;
  const [owner] = accounts;

  beforeEach(async () => {
    // Deploy a fresh instance of the Voting contract before each test
    votingInstance = await Voting.new({ from: owner });
  });

  it("should add a candidate", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });
    const candidate = await votingInstance.getCandidate(1); // ID starts from 1

    assert.equal(candidate[0], "Alice", "Candidate name was not set correctly");
    assert.equal(candidate[1].toNumber(), 0, "Vote count should start at 0");
  });

  it("should remove a candidate and reassign IDs", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });
    await votingInstance.addCandidate("Bob", { from: owner });
    await votingInstance.addCandidate("Charlie", { from: owner });

    // Remove the second candidate (Bob with ID 2)
    await votingInstance.removeCandidate(2, { from: owner });

    // Check that remaining candidate count is updated
    const candidatesCount = await votingInstance.getCandidatesCount();
    assert.equal(candidatesCount.toNumber(), 2, "Candidates count should be 2 after removal");

    // Fetch the remaining candidates
    const candidate1 = await votingInstance.getCandidate(1); // Alice should be at ID 1
    assert.equal(candidate1[0], "Alice", "Candidate 1 should be Alice");
    
    const candidate2 = await votingInstance.getCandidate(2); // Charlie should be at ID 2
    assert.equal(candidate2[0], "Charlie", "Candidate 2 should be Charlie");
  });

  it("should vote for a candidate and increment the vote count", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });
    await votingInstance.addCandidate("Bob", { from: owner });

    // Vote for Alice (ID 1)
    await votingInstance.vote(1, { from: owner });

    // Get the updated vote count for Alice
    const aliceVoteCount = await votingInstance.getVoteCount(1);
    assert.equal(aliceVoteCount.toNumber(), 1, "Alice's vote count should be 1");

    // Vote for Bob (ID 2)
    await votingInstance.vote(2, { from: owner });

    // Get the updated vote count for Bob
    const bobVoteCount = await votingInstance.getVoteCount(2);
    assert.equal(bobVoteCount.toNumber(), 1, "Bob's vote count should be 1");
  });

  it("should return the correct total vote count", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });
    await votingInstance.addCandidate("Bob", { from: owner });

    // Vote for Alice and Bob
    await votingInstance.vote(1, { from: owner });
    await votingInstance.vote(2, { from: owner });

    // Get the updated total votes
    const totalVotes = await votingInstance.getTotalVotes();
    
    // In the current contract, totalVotes will not increment automatically, so manually calculate
    assert.equal(totalVotes.toNumber(), 2, "Total votes should be 2 after two votes");
  });

  it("should return the correct vote count for a specific candidate", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });
    await votingInstance.addCandidate("Bob", { from: owner });

    // Vote for Alice (ID 1)
    await votingInstance.vote(1, { from: owner });

    // Get the vote count for Alice
    const aliceVoteCount = await votingInstance.getVoteCount(1);
    assert.equal(aliceVoteCount.toNumber(), 1, "Alice's vote count should be 1");

    // Get the vote count for Bob (ID 2)
    const bobVoteCount = await votingInstance.getVoteCount(2);
    assert.equal(bobVoteCount.toNumber(), 0, "Bob's vote count should be 0");
  });

  it("should revert if a voter attempts to vote for a non-existent candidate", async () => {
    try {
      await votingInstance.vote(999, { from: owner });
      assert.fail("Expected an error when voting for a non-existent candidate");
    } catch (error) {
      assert(error.message.includes("Invalid candidate ID"), "Expected 'Invalid candidate ID' error");
    }
  });
});
