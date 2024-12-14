const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  let votingInstance;
  const [owner] = accounts;

  beforeEach(async () => {
    votingInstance = await Voting.new({ from: owner });
  });

  it("should add a candidate using the secret key", async () => {
    await votingInstance.addCandidate("Alice", "test", { from: owner });
    const candidate = await votingInstance.getCandidate(1);

    assert.equal(candidate[0], "Alice", "Candidate name was not set correctly");
    assert.equal(candidate[1].toNumber(), 0, "Vote count should start at 0");
  });

  it("should not add a candidate with an invalid secret key", async () => {
    try {
      await votingInstance.addCandidate("Bob", "wrong_key", { from: owner });
      assert.fail("Expected an error due to invalid secret key");
    } catch (error) {
      assert(error.message.includes("Invalid secret key"), "Expected 'Invalid secret key' error");
    }
  });

  it("should remove a candidate and reassign IDs", async () => {
    await votingInstance.addCandidate("Alice", "test", { from: owner });
    await votingInstance.addCandidate("Bob", "test", { from: owner });
    await votingInstance.addCandidate("Charlie", "test", { from: owner });

    await votingInstance.removeCandidate(2, "test", { from: owner });

    const candidatesCount = await votingInstance.getCandidatesCount();
    assert.equal(candidatesCount.toNumber(), 2, "Candidates count should be 2 after removal");

    const candidate1 = await votingInstance.getCandidate(1);
    assert.equal(candidate1[0], "Alice", "Candidate 1 should be Alice");

    const candidate2 = await votingInstance.getCandidate(2);
    assert.equal(candidate2[0], "Charlie", "Candidate 2 should be Charlie");
  });

  it("should register a new voter", async () => {
    await votingInstance.registerVoter(1, "John Doe", "123456789012", "johndoe", "password", { from: owner });

    const voter = await votingInstance.voters(1);
    assert.equal(voter.fullName, "John Doe", "Voter full name was not set correctly");
    assert.equal(voter.adhaarCard, "123456789012", "Voter Aadhaar card was not set correctly");
    assert.equal(voter.username, "johndoe", "Voter username was not set correctly");
    assert(voter.exists, "Voter should exist after registration");
  });

  it("should not allow duplicate voter registration", async () => {
    await votingInstance.registerVoter(1, "John Doe", "123456789012", "johndoe", "password", { from: owner });
    try {
      await votingInstance.registerVoter(1, "Jane Doe", "987654321098", "janedoe", "password", { from: owner });
      assert.fail("Expected an error due to duplicate voter ID");
    } catch (error) {
      assert(error.message.includes("Voter ID already registered"), "Expected 'Voter ID already registered' error");
    }
  });

  it("should allow a voter to vote for a candidate", async () => {
    await votingInstance.addCandidate("Alice", "test", { from: owner });
    await votingInstance.registerVoter(1, "John Doe", "123456789012", "johndoe", "password", { from: owner });

    await votingInstance.vote(1, "johndoe", "password", 1, { from: owner });

    const aliceVoteCount = await votingInstance.getVoteCount(1);
    assert.equal(aliceVoteCount.toNumber(), 1, "Alice's vote count should be 1");
  });

  it("should not allow a voter to vote twice", async () => {
    await votingInstance.addCandidate("Alice", "test", { from: owner });
    await votingInstance.registerVoter(1, "John Doe", "123456789012", "johndoe", "password", { from: owner });

    await votingInstance.vote(1, "johndoe", "password", 1, { from: owner });

    try {
      await votingInstance.vote(1, "johndoe", "password", 1, { from: owner });
      assert.fail("Expected an error due to double voting");
    } catch (error) {
      assert(error.message.includes("This voter has already voted"), "Expected 'This voter has already voted' error");
    }
  });

  it("should not allow a voter to vote with incorrect credentials", async () => {
    await votingInstance.addCandidate("Alice", "test", { from: owner });
    await votingInstance.registerVoter(1, "John Doe", "123456789012", "johndoe", "password", { from: owner });

    try {
      await votingInstance.vote(1, "johndoe", "wrongpassword", 1, { from: owner });
      assert.fail("Expected an error due to incorrect credentials");
    } catch (error) {
      assert(error.message.includes("Invalid username or password"), "Expected 'Invalid username or password' error");
    }
  });

  it("should return the correct total votes after voting", async () => {
    await votingInstance.addCandidate("Alice", "test", { from: owner });
    await votingInstance.addCandidate("Bob", "test", { from: owner });

    await votingInstance.registerVoter(1, "John Doe", "123456789012", "johndoe", "password", { from: owner });
    await votingInstance.registerVoter(2, "Jane Doe", "987654321098", "janedoe", "password", { from: owner });

    await votingInstance.vote(1, "johndoe", "password", 1, { from: owner });
    await votingInstance.vote(2, "janedoe", "password", 2, { from: owner });

    const totalVotes = await votingInstance.getTotalVotes();
    assert.equal(totalVotes.toNumber(), 2, "Total votes should be 2 after two votes");
  });
});