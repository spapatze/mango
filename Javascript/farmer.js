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

    var res8 = mangoInstance.informedDriver.call();
    //console.log(res8);
    document.getElementById('requireTransfer').innerText = "Require Transfer: " + res8;

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

        res8 = mangoInstance.informedDriver.call();
        document.getElementById('requireTransfer').innerText = "Require Transfer: " + res8;
    });

    mangoInstance.SetFarmerLog({}, { fromBlock: creationBlock, toBlock: 'latest' }).get(function (error, result) {
        if (!error) {
            console.log(result);
            for(var i = 0; i < result.length ; i++){
                logger(result[i]);
            }
        }
    });

    var event = mangoInstance.SetFarmerLog({}, function(error, result) {
        if (!error) {
            console.log(result);
            logger(result);
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

// input: date [format: YYYY-MM-DD]
// output: timestamp [hour 08:00:00] in sec
function calcDatetoTS(_date) {
    _date = _date.split("-");
    var _date = new Date(_date[0], _date[1]-1, _date[2], 8, 0, 0, 0);
    var _timestamp = _date.getTime() / 1000;
    return _timestamp;
}


// _timestamp in sec
function calculateTS(_timestamp){
    var date = new Date(_timestamp * 1000);
    var formattedDate = (('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ', ' + ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()) ;
    return formattedDate;
}

function logger(result) {
    var hist = document.getElementById('history');
    var newP = document.createElement('P');
    hist.appendChild(newP);
    var msg = "\"" + result.args.log + "\"";
    var content = document.createTextNode(msg);
    newP.appendChild(content);

    var formattedDate = calculateTS(result.args.time);
    var msg2 = " at " + formattedDate + ".";

    var newSpan = document.createElement('SPAN');
    var content2 = document.createTextNode(msg2);
    newSpan.appendChild(content2);
    newP.appendChild(newSpan);
}
