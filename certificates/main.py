import os
import solcx
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

PROVIDER_URL = 'https://sepolia.infura.io/v3/6503d426dbff47df8ff6259418f1404a'
WALLET_ADDRESS = '0x50cE4EcA5ec60418e8BCC71040cA10E7FD93B9ec'
SEPOLIA_CHAIN_ID = 11155111
PRIVATE_KEY = os.environ.get('PRIVATE_KEY')
if PRIVATE_KEY is None:
    raise Exception('PRIVATE_KEY not found in .env')


def compile_contract(contract_path):
    solcx.install_solc()

    with open(contract_path, 'r') as f:
        certificate_data = f.read()

    compiled_sol = solcx.compile_source(certificate_data, output_values=['abi', 'bin'])
    _contract_id, contract_interface = compiled_sol.popitem()

    return contract_interface['abi'], contract_interface['bin']


def deploy_contract(contract_abi, contract_bytecode, w3):
    contract = w3.eth.contract(abi=contract_abi, bytecode=contract_bytecode)
    tx = contract.constructor().build_transaction(
        {
            "gasPrice": w3.eth.gas_price,
            "chainId": SEPOLIA_CHAIN_ID,
            "from": WALLET_ADDRESS,
            "nonce": w3.eth.get_transaction_count(WALLET_ADDRESS),
        }
    )
    signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

    return w3.eth.wait_for_transaction_receipt(tx_hash)


def main():
    contract_path = 'Certificates.sol'
    contract_abi, contract_bytecode = compile_contract(contract_path)
    w3 = Web3(Web3.HTTPProvider(PROVIDER_URL))
    tx_receipt = deploy_contract(contract_abi, contract_bytecode, w3)
    print(f'Transaction hash: {tx_receipt.transactionHash.hex()}')
    print(f'Contract address: {tx_receipt.contractAddress}')

    with open('tx_receipt.txt', 'w') as f:
        f.write(str(tx_receipt))

    with open('abi.txt', 'w') as f:
        f.write(str(contract_abi))


if __name__ == '__main__':
    main()
