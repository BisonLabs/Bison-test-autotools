const { ethers } = require("ethers");

//const provider = new ethers.JsonRpcProvider("http://private-testnet.blifeprotocol.com:12345")
const provider = new ethers.JsonRpcProvider("https://private-testnet.blifeprotocol.com:25600")
const privateKey = '08dc1c568f8d9616b12bc227c9deefbfaa8d8edf8be325b4fc75eadd0284bebd'
const num = 100
const batchSize = 800
const value = BigInt(1656e18)
const wallet = new ethers.Wallet(privateKey, provider)
const pk_list = [];
const address_list = [];
const value_list = [];

const abi =[
        {
                "inputs": [
                        {
                                "internalType": "uint256[]",
                                "name": "_arr",
                                "type": "uint256[]"
                        }
                ],
                "name": "getSum",
                "outputs": [
                        {
                                "internalType": "uint256",
                                "name": "sum",
                                "type": "uint256"
                        }
                ],
                "stateMutability": "pure",
                "type": "function"
        },
        {
                "inputs": [
                        {
                                "internalType": "address payable[]",
                                "name": "_addresses",
                                "type": "address[]"
                        },
                        {
                                "internalType": "uint256[]",
                                "name": "_amounts",
                                "type": "uint256[]"
                        }
                ],
                "name": "multiTransferETH",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
        }
]

const bytecode = "608060405234801561001057600080fd5b506107ac806100206000396000f3fe6080604052600436106100295760003560e01c806377988cf81461002e578063ccb8c1e01461004a575b600080fd5b6100486004803603810190610043919061034e565b610087565b005b34801561005657600080fd5b50610071600480360381019061006c91906103cf565b610235565b60405161007e9190610435565b60405180910390f35b8181905084849050146100cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100c6906104d3565b60405180910390fd5b60006100db8383610235565b905080341461011f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101169061053f565b60405180910390fd5b60005b8585905081101561022d5760008686838181106101425761014161055f565b5b905060200201602081019061015791906105ec565b73ffffffffffffffffffffffffffffffffffffffff168585848181106101805761017f61055f565b5b905060200201356040516101939061064a565b60006040518083038185875af1925050503d80600081146101d0576040519150601f19603f3d011682016040523d82523d6000602084013e6101d5565b606091505b5050905080610219576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610210906106ab565b60405180910390fd5b508080610225906106fa565b915050610122565b505050505050565b600080600090505b838390508110156102825783838281811061025b5761025a61055f565b5b905060200201358261026d9190610742565b9150808061027a906106fa565b91505061023d565b5092915050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f8401126102b8576102b7610293565b5b8235905067ffffffffffffffff8111156102d5576102d4610298565b5b6020830191508360208202830111156102f1576102f061029d565b5b9250929050565b60008083601f84011261030e5761030d610293565b5b8235905067ffffffffffffffff81111561032b5761032a610298565b5b6020830191508360208202830111156103475761034661029d565b5b9250929050565b6000806000806040858703121561036857610367610289565b5b600085013567ffffffffffffffff8111156103865761038561028e565b5b610392878288016102a2565b9450945050602085013567ffffffffffffffff8111156103b5576103b461028e565b5b6103c1878288016102f8565b925092505092959194509250565b600080602083850312156103e6576103e5610289565b5b600083013567ffffffffffffffff8111156104045761040361028e565b5b610410858286016102f8565b92509250509250929050565b6000819050919050565b61042f8161041c565b82525050565b600060208201905061044a6000830184610426565b92915050565b600082825260208201905092915050565b7f4c656e67746873206f662041646472657373657320616e6420416d6f756e747360008201527f204e4f5420455155414c00000000000000000000000000000000000000000000602082015250565b60006104bd602a83610450565b91506104c882610461565b604082019050919050565b600060208201905081810360008301526104ec816104b0565b9050919050565b7f5472616e7366657220616d6f756e74206572726f720000000000000000000000600082015250565b6000610529601583610450565b9150610534826104f3565b602082019050919050565b600060208201905081810360008301526105588161051c565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006105b98261058e565b9050919050565b6105c9816105ae565b81146105d457600080fd5b50565b6000813590506105e6816105c0565b92915050565b60006020828403121561060257610601610289565b5b6000610610848285016105d7565b91505092915050565b600081905092915050565b50565b6000610634600083610619565b915061063f82610624565b600082019050919050565b600061065582610627565b9150819050919050565b7f7472616e73666572206661696c00000000000000000000000000000000000000600082015250565b6000610695600d83610450565b91506106a08261065f565b602082019050919050565b600060208201905081810360008301526106c481610688565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006107058261041c565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610737576107366106cb565b5b600182019050919050565b600061074d8261041c565b91506107588361041c565b92508282019050808211156107705761076f6106cb565b5b9291505056fea2646970667358221220c409a1d7941631bac0587eaf6db9ed8fda08e611c756fc2c88d1418173cbb2ce64736f6c63430008120033"
const main = async () => {
    console.log("1 Deploying contract");
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy({gasLimit: 21000000});
    console.log(`Contract address: ${contract.target}`);
    await contract.waitForDeployment();
    console.log("Contract has been deployed");

    console.log(`2 Creating ${num} random wallets`);
    const address_list = [];
    const value_list = [];
    for (let i = 0; i < num; i++) {
        const wallet = ethers.Wallet.createRandom();
        const address = wallet.address;
        const pk = wallet.privateKey;
        pk_list.push(pk);
        address_list.push(address);
        value_list.push(BigInt(1e18));
    }
    // Process in batches, each batch processes batchSize wallets
    for (let start = 0; start < num; start += batchSize) {
        const end = Math.min(start + batchSize, num);
        const batchAddresses = address_list.slice(start, end);
        const batchValues = value_list.slice(start, end);
        const batchValue = batchValues.reduce((acc, value) => acc + value, BigInt(0));

        console.log(`\nInteracting with contract ${start / batchSize + 1}`);
        try {
            const tx = await contract.multiTransferETH(batchAddresses, batchValues, { value: batchValue });
            console.log(`Transaction details:`);
            await tx.wait();
            console.log(tx);
        } catch (error) {
            console.error(`Transaction failed: ${error.message}`);
        }
    }

    transfer();
};

main();

function transfer() {
    for (i in pk_list) {
        t1(pk_list[i]);
    }
}

const t1 = async (pk) => {
    var i = 0;
    while (i < 1) {
        i++;
        const wallet = new ethers.Wallet(pk, provider);
        const address = wallet.address;
        console.log(`\nii. FROM address: ${address}`);
        const wallet1 = ethers.Wallet.createRandom();
        const address1 = wallet1.address;
        console.log(`\nii. TO address: ${address1}`);

        const transfer_tx = {
            to: address1,
            value: ethers.parseEther("0.0001")
        };
        console.log(`\nii. Waiting for transfer (may take a few minutes)`);
        const receipt = await wallet.sendTransaction(transfer_tx);
        await receipt.wait();
        console.log(`\nii. Transfer successful to random wallet!`);
        console.log(`\tBalance of the random wallet after transfer: ${ethers.formatEther(await provider.getBalance(wallet))} ETH`);
    }
}
