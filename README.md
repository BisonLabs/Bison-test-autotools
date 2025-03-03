# Bison-test-autotools
bison test tools

```
Bison-test-autotools
├── tests
│   ├── transfer_test.js              # Transfer test script
│   └── concurrent_call.js            # Concurrent contract call test script
│   └── concurrent_erc20_transfer.js  # Concurrent ERC-20 transfer test script

```

## Installation and Usage
*Ubuntu20.04 +*
    1.install node
    ```bash
        sudo apt install -y npm
        sudo apt install -y nodejs

        #Verify the installation
        node -v
    ```
    2.test
        #The tests support both HTTP and HTTPS protocols; manual modifications may be required.
    ```bash
        cd tests
        #download 
        npm install
        #Test a single transfer
        node transfer_test.js
        #Perform concurrent transfer tests
        node concurrent_erc20_transfer.js
        #Perform concurrent contract call tests
        node concurrent_call.js
    ```

