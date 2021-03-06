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

### 2.3. Unlock account.

When you want to write data on the blockachain, you have to unlock the account from which you will send the transaction.

## 3. Using the official network.

### 3.1. Geth Node Init.
### 3.2. Running the blockchain.
### 3.3. Geth console.

## 4. The application.

### 4.1. Intro, aka the problem.

A person, let's call him Alex, goes to the supermarket to buy a mango. There, Alex finds himself between different choices; mangos from different places, from different farmers and different farming practices. How can Alex choose between these? He will go for the cheapest, or for the organic, etc.? What if Alex could access some information about the mangos, like the farmer or the place? Then his choice would become easier.

What if we found a place where we could store all the information. Then, we could just give read access to Alex.
Here comes the blockchain. We will use the blockchain as a database.

#### Questions- Answers:

- Q1: Who will store the information on the blockchain? 
- A1: The mango's route from farmer to Alex includes many people or organisations, like the farmer, the driver, the factory, the supermarket, the authority who certify the product. In our project, we assume that the people who will participate in the proccess are the described in paragraph [4.3 THe Roles].

- Q2: What kind of information is stored on the blockchain?
- A2: See paragraph [4.4 Data Stored].

- Q3: Who can have access to the information?
- A3: The blockchain is public. The information is there to get. 

- Q4: How can the people involved gain access to blockchain?
- A4: We have created the some interfaces. Using the appropiate interface, the different roles will have access to different read,write operations.

- Q: Why someone do all this work? How can we convince (persuade) them to do all this work? [Use the blockchain, store information ont the blockchain, etc]

### 4.2. Why blockchain?

tamper-proof, no revision

### 4.3. The roles.

1. The farmer.
2. The driver.
3. The factory, aka lab.

### 4.4. Data Stored.

Everyone involved have to create the account to write data on the blockchain. The account's address is unique so we are using the address to identify the different parties.

The farmer's data:
- Farmer ID (address).
- Farm ID (lot ID).
- Crop ID (mango, tanjarines, etc).
- Log (string).
- Quantity in kg (uint).
- Require transfer? (bool).

The driver's data:
- Driver ID (address).
- Container's temperature (int).
- Log (string).
- From when to when? [Product in his possesion] (timestamp x 2)
- Product in transit? [Product in his possesion] (bool)

The lab's data:
- Lab ID (address).
- Log (string).
- Product Certified? (bool)
