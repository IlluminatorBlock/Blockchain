from web3 import Web3

# Connect to Ganache
ganache_url = "http://127.0.0.1:7545"  # Adjust if necessary
w3 = Web3(Web3.HTTPProvider(ganache_url))

# Check if connected
if not w3.is_connected():
    raise Exception("Failed to connect to Ganache!")


contract_abi = [
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": True,
                "internalType": "uint256",
                "name": "candidateId",
                "type": "uint256"
            },
            {
                "indexed": False,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "CandidateAdded",
        "type": "event"
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": True,
                "internalType": "uint256",
                "name": "candidateId",
                "type": "uint256"
            }
        ],
        "name": "CandidateRemoved",
        "type": "event"
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": True,
                "internalType": "address",
                "name": "voter",
                "type": "address"
            },
            {
                "indexed": True,
                "internalType": "uint256",
                "name": "candidateId",
                "type": "uint256"
            }
        ],
        "name": "Voted",
        "type": "event"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "name": "candidates",
        "outputs": [
            {"internalType": "uint256", "name": "id", "type": "uint256"},
            {"internalType": "string", "name": "name", "type": "string"},
            {"internalType": "uint256", "name": "voteCount", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": True
    },
    {
        "inputs": [],
        "name": "candidatesCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function",
        "constant": True
    },
    {
        "inputs": [],
        "name": "totalVotes",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function",
        "constant": True
    },
    {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "voters",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function",
        "constant": True
    },
    {
        "inputs": [{"internalType": "string", "name": "_name", "type": "string"}],
        "name": "addCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "_candidateId", "type": "uint256"}],
        "name": "removeCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "_candidateId", "type": "uint256"}],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "_candidateId", "type": "uint256"}],
        "name": "getVoteCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function",
        "constant": True
    },
    {
        "inputs": [{"internalType": "uint256", "name": "_candidateId", "type": "uint256"}],
        "name": "getCandidate",
        "outputs": [
            {"internalType": "string", "name": "name", "type": "string"},
            {"internalType": "uint256", "name": "voteCount", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": True
    },
    {
        "inputs": [],
        "name": "getCandidatesCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function",
        "constant": True
    },
    {
        "inputs": [],
        "name": "getTotalVotes",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function",
        "constant": True
    }
]

# Replace with your actual contract address from Ganache or deployment output
contract_address = '0x6fb89EB9E65b6B39EE75283c6AbC2CA2C98B5DE2'

# Initialize the contract
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

def get_contract():
    return contract
