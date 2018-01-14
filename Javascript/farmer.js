var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    var provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    var web3 = new Web3(provider);
}

var mangoInstance;
var addr;
var creationBlock = 0;

function watchEverything() {

    document.getElementById("startE").style.visibility = "hidden";
    document.getElementById("contract").style.visibility = "hidden";

    mangoInstance = createContract();

    // General
    document.getElementById('address').innerText = "Contract's address: " + addr;

    var res = mangoInstance.owner.call();
    document.getElementById('owner').innerText = "Owner's address: " + res;

    var res2 = mangoInstance.creationBlock.call();
    creationBlock = res2;
    document.getElementById('creation').innerText = "Creation's block number: " + res2;

    // Farmer
    var res3 = mangoInstance.farmer.call();
    document.getElementById('farmer').innerText = "Farmer's address: " + res3;

    document.getElementById('lot').innerText = "Lot ID: " + addr;

    var res5 = mangoInstance.cropId.call();
    document.getElementById('crop').innerText = "Crop ID: " + res5;

    var res6 = mangoInstance.quantity.call();
    document.getElementById('kg').innerText = "Quantity (in kg): " + res6;

    web3.eth.filter('latest').watch(function() {

        res = mangoInstance.owner.call();
        document.getElementById('owner').innerText = "Owner's address: " + res;

        // Farmer
        res3 = mangoInstance.farmer.call();
        document.getElementById('farmer').innerText = "Farmer's address: " + res3;

        document.getElementById('lot').innerText = "Lot ID: " + addr;

        res5 = mangoInstance.cropId.call();
        document.getElementById('crop').innerText = "Crop ID: " + res5;

        res6 = mangoInstance.quantity.call();
        document.getElementById('kg').innerText = "Quantity (in kg): " + res6;

    });

    mangoInstance.SetFarmerLog({}, { fromBlock: creationBlock, toBlock: 'latest' }).get(function (error, result) {
        if (!error) {
            console.log(result);
            for(var i = 0; i < result.length ; i++){
                logger(result[i], 'history');
            }
        }
    });

    var event = mangoInstance.SetFarmerLog({}, function(error, result) {
        if (!error) {
            console.log(result);
            logger(result, 'history');
        }
    });

    mangoInstance.RequireTransfer({}, { fromBlock: creationBlock, toBlock: 'latest' }).get(function (error, result) {
        if (!error) {
            // console.log(result);
            var index = result.length - 1;
            if (index >= 0) {
                console.log(result[index]);
                var _result = result[index].args._time;
                var _date = calculateTS(_result); // function works on sec.
                document.getElementById('whenTransfer').innerText = "When: " + _date;
            }
        }
    });

    var event = mangoInstance.RequireTransfer({}, function(error, result) {
        if (!error) {
            console.log(result);
            var _result = result.args._time;
            var _date = calculateTS(_result); // function works on sec.
            document.getElementById('whenTransfer').innerText = "When: " + _date;
        }
    });

}

function transferToDriver() {

    var _driver = document.getElementById('driver').value;
    console.log(_driver);
    mangoInstance.transferToDriver.sendTransaction(_driver , {from: web3.eth.accounts[0]});

}

function setQuantity() {

    var _kg = document.getElementById('quantKg').value;
    console.log(_kg);
    mangoInstance.setQuantity.sendTransaction(_kg , {from: web3.eth.accounts[0]});

}

function setFarmerLog() {

    var _log = document.getElementById('log').value;
    console.log(_log);
    mangoInstance.setFarmerLog.sendTransaction(_log , {from: web3.eth.accounts[0]});

}

function requireTransfer() {

    if (!isNaN(document.getElementById('myDate').value)){
        alert("Please enter the date.");
        return;
    }

    document.getElementById('inform').style.visibility = 'hidden';
    console.log(true);

    var _date = document.getElementById('myDate').value;
    console.log(_date);
    var timestamp1 = calcDatetoTS(_date); // to sec
    console.log(timestamp1);
    mangoInstance.requireTransfer.sendTransaction(timestamp1, {from: web3.eth.accounts[0]});

}
