const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  deployer.deploy(Voting, { gas: 6721975 }); // Set a high gas limit
};
