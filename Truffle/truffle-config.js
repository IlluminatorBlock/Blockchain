module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Default Ganache port
      network_id: "*",       // Match any network id
      gas: 6721975,          // Gas limit (optional, you can change this)
      gasPrice: 20000000000  // Gas price (optional)
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",      // Solidity compiler version
    },
  },
};
