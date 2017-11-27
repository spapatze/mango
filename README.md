# mango
Blockchain Meets The Supply Chain

## Ethereum Blockchain.

Geth node.

## Testing using Rinkeby: Ethereum Testnet.

1. Archive node: Retains all historical data.
2. Full node: Retains recent data only. [Historical data can only be queried from that block onward.]

- geth --datadir=$HOME/.rinkeby init rinkeby.json
- geth --networkid=4 --datadir=$HOME/.rinkeby --cache=1024 --syncmode=full --ethstats='yournode:Respect my authoritah!@stats.rinkeby.io' --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303

