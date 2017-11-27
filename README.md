# mango
Blockchain Meets The Supply Chain

## 1. Ethereum Blockchain.

Geth node.
1. Archive node: Retains all historical data.
2. Full node: Retains recent data only. [Historical data can only be queried from that block onward.]

## 2. Testing using Rinkeby: Ethereum Testnet.

### 2.1. Geth Node Init.

- geth --datadir=$HOME/.rinkeby init rinkeby.json

### 2.2. Running the blockchain.

- geth --networkid=4 --datadir=$HOME/.rinkeby --cache=1024 --syncmode=full --ethstats='yournode:Respect my authoritah!@stats.rinkeby.io' --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303

### 2.3. Geth console.
- geth attach ipc:/home/tutten/.rinkeby/geth.ipc
- admin.startRPC("127.0.0.1", 8545, "*", "eth,net,web3")  // Geth console.

## 3. Using the official network.

To be continued.

### 3.1. Geth Node Init.
### 3.2. Running the blockchain.
### 3.3. Geth console.

## 4. The application.

### 4.1 Intro



### 4.2 The roles

1. The farmer.
2. The driver.
3. The factory, aka lab.
