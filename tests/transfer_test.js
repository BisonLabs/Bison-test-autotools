const { ethers } = require("ethers");

// Connect to the Ethereum network via JSON-RPC
const provider = new ethers.JsonRpcProvider("https://private-testnet.blifeprotocol.com:25600");
// const provider = new ethers.JsonRpcProvider("http://private-testnet.blifeprotocol.com:12345");

// Define a private key and create a wallet instance
const privateKey = '08dc1c568f8d9616b12bc227c9deefbfaa8d8edf8be325b4fc75eadd0284bebd';
const wallet = new ethers.Wallet(privateKey, provider);

// Define a mnemonic phrase
const phrase = "bamboo spin reject worth claim result search patch torch either bring stadium";

const main = async () => {
    console.log("1. Testing creation of a random wallet");
    // Create a random wallet object
    const wallet1 = ethers.Wallet.createRandom();
    const wallet1WithProvider = wallet1.connect(provider);
    const address1 = await wallet1.getAddress();
    console.log(`Random wallet address: ${address1}`);
    const txCount1 = await wallet1WithProvider.getNonce();
    console.log(`Number of transactions sent from random wallet address: ${txCount1}\n`);

    console.log("2. Testing account import from private key");
    const testPrivateKey = '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b';
    const wallet2 = new ethers.Wallet(testPrivateKey, provider);
    console.log(`Wallet private key: ${wallet2.privateKey}`);
    const address2 = await wallet2.getAddress();
    console.log(`Private key wallet address: ${address2}`);
    const txCount2 = await wallet2.getNonce();
    console.log(`Number of transactions sent from private key wallet address: ${txCount2}\n`);

    console.log("3. Testing wallet import from mnemonic phrase");
    const wallet3 = ethers.Wallet.fromPhrase(phrase);
    const address3 = await wallet3.getAddress();
    console.log(`Mnemonic wallet phrase: ${wallet3.mnemonic.phrase}`);
    console.log(`Mnemonic wallet address: ${address3}`);
    const wallet3WithProvider = wallet3.connect(provider);
    const txCount3 = await wallet3WithProvider.getNonce();
    console.log(`Number of transactions sent from mnemonic wallet address: ${txCount3}\n`);

    console.log("4. Testing transfers to the three wallets");
    console.log(`i. Balances before transfer`);
    console.log(`\tWallet 1: ${ethers.formatEther(await provider.getBalance(wallet))} ETH`);
    console.log(`\tRandom wallet: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`);
    console.log(`\tPrivate key wallet: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`);
    console.log(`\tMnemonic wallet: ${ethers.formatEther(await provider.getBalance(wallet3WithProvider))} ETH`);

    const transferTx1 = {
        to: address1,
        value: ethers.parseEther("0.1")
    };

    const transferTx2 = {
        to: address2,
        value: ethers.parseEther("0.2")
    };

    const transferTx3 = {
        to: address3,
        value: ethers.parseEther("0.3")
    };

    console.log(`\nii. Waiting for transactions to be confirmed on the blockchain (this may take a few minutes)`);
    const receipt1 = await wallet.sendTransaction(transferTx1);
    await receipt1.wait(); // Wait for the transaction to be confirmed on-chain
    console.log(`\nii. Transfer to the first wallet successful!`);

    const receipt2 = await wallet.sendTransaction(transferTx2);
    await receipt2.wait(); // Wait for the transaction to be confirmed on-chain
    console.log(`\nii. Transfer to the second wallet successful!`);

    const receipt3 = await wallet.sendTransaction(transferTx3);
    await receipt3.wait(); // Wait for the transaction to be confirmed on-chain
    console.log(`\nii. Transfer to the third wallet successful!`);

    console.log(`\niii. Balances after transfer`);
    console.log(`\tWallet 1: ${ethers.formatEther(await provider.getBalance(wallet))} ETH`);
    console.log(`\tRandom wallet: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`);
    console.log(`\tPrivate key wallet: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`);
    console.log(`\tMnemonic wallet: ${ethers.formatEther(await provider.getBalance(wallet3WithProvider))} ETH`);
};

main();
