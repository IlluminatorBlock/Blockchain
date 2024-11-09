const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  let votingInstance;
  const [owner] = accounts;

  beforeEach(async () => {
    votingInstance = await Voting.new({ from: owner });
  });

  it("should add a candidate", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });
    const candidate = await votingInstance.getCandidate(1);

    assert.equal(candidate[0], "Alice", "Candidate name was not set correctly");
    assert.equal(candidate[1].toNumber(), 0, "Vote count should start at 0");
  });

  it("should remove a candidate and reassign IDs", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });
    await votingInstance.addCandidate("Bob", { from: owner });
    await votingInstance.addCandidate("Charlie", { from: owner });

    await votingInstance.removeCandidate(2, { from: owner });

    const candidatesCount = await votingInstance.getCandidatesCount();
    assert.equal(candidatesCount.toNumber(), 2, "Candidates count should be 2 after removal");

    const candidate1 = await votingInstance.getCandidate(1);
    assert.equal(candidate1[0], "Alice", "Candidate 1 should be Alice");
    
    const candidate2 = await votingInstance.getCandidate(2);
    assert.equal(candidate2[0], "Charlie", "Candidate 2 should be Charlie");
  });

  it("should vote for a candidate and increment the vote count", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });
    await votingInstance.addCandidate("Bob", { from: owner });

    await votingInstance.vote(1, { from: owner });

    const aliceVoteCount = await votingInstance.getVoteCount(1);
    assert.equal(aliceVoteCount.toNumber(), 1, "Alice's vote count should be 1");

    await votingInstance.vote(2, { from: owner });

    const bobVoteCount = await votingInstance.getVoteCount(2);
    assert.equal(bobVoteCount.toNumber(), 1, "Bob's vote count should be 1");
  });

  it("should return the correct total vote count", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });
    await votingInstance.addCandidate("Bob", { from: owner });

    await votingInstance.vote(1, { from: owner });
    await votingInstance.vote(2, { from: owner });

    const totalVotes = await votingInstance.getTotalVotes();
    assert.equal(totalVotes.toNumber(), 2, "Total votes should be 2 after two votes");
  });

  it("should return the correct vote count for a specific candidate", async () => {
    await votingInstance.addCandidate("Alice", { from: owner });
    await votingInstance.addCandidate("Bob", { from: owner });

    await votingInstance.vote(1, { from: owner });

    const aliceVoteCount = await votingInstance.getVoteCount(1);
    assert.equal(aliceVoteCount.toNumber(), 1, "Alice's vote count should be 1");

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
