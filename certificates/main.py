import solcx


def compile_contract(contract_path):
    solcx.install_solc()

    with open(contract_path, 'r') as f:
        certificate_data = f.read()

    compiled_sol = solcx.compile_source(certificate_data, output_values=['abi', 'bin'])
    _contract_id, contract_interface = compiled_sol.popitem()

    return contract_interface


def main():
    contract_path = 'Certificates.sol'
    contract_interface = compile_contract(contract_path)
    print(contract_interface)


if __name__ == '__main__':
    main()
