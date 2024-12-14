import json
import os
from web3 import Web3  # type: ignore

ganache_url = "http://127.0.0.1:7545"
w3 = Web3(Web3.HTTPProvider(ganache_url))

if not w3.is_connected():
    raise Exception("Failed to connect to Ganache!")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
TRUFFLE_BUILD_PATH = os.path.join(BASE_DIR, 'Truffle', 'build', 'contracts')
CONTRACT_FILE = 'Voting.json'

contract_path = os.path.join(TRUFFLE_BUILD_PATH, CONTRACT_FILE)

if not os.path.exists(contract_path):
    raise FileNotFoundError(f"Contract file not found: {contract_path}")

with open(contract_path, 'r') as file:
    contract_json = json.load(file)
    contract_abi = contract_json['abi']
    contract_address = contract_json['networks']['5777']['address']

contract = w3.eth.contract(address=contract_address, abi=contract_abi)

def get_contract():
    return contract