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

    // Account's Balance
    var coinbase = web3.eth.accounts[0];

    var originalBalance = 0;
    var acctBal = web3.fromWei(web3.eth.getBalance(coinbase), "ether");
    originalBalance += parseFloat(acctBal);

    document.getElementById("coinbase").innerText = "Account's Address: " + coinbase;
    document.getElementById("original").innerText = "Original Balance: " + originalBalance + ' watching...';

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
    document.getElementById('requireTransfer').innerText = "Require Transfer: " + res8;

    // Driver
    var res9 = mangoInstance.driver.call();
    document.getElementById('driver').innerText = "Driver's address: " + res9;

    var res10 = mangoInstance.temC.call();
    document.getElementById('temC').innerText = "Container's temperature: " + res10;

    var res11 = mangoInstance.start.call();
    if (res11.e){
        res11 = calculateTS(res11);
    }
    document.getElementById('start').innerText = "Start: " + res11;

    var res12 = mangoInstance.end.call();
    if (res12.e){
        res12 = calculateTS(res12);
    }
    document.getElementById('end').innerText = "End: " + res12;

    // if driver == owner, then inTransit = true
    // inTransit = res13
    var res13 = false;
    if (res == res9) res13 = true;
    document.getElementById('transit').innerText = "In Driver's Possesion: " + res13;

    // Lab
    document.getElementById('transit2').innerText = "In Driver's Possesion: " + res13;

    var res15 = mangoInstance.lab.call();
    document.getElementById('lab').innerText = "Lab's address: " + res15;

    var res17 = mangoInstance.certificate.call();
    document.getElementById('certificate').innerText = "Certified: " + res17;

    web3.eth.filter('latest').watch(function() {
        var currentBalance = 0;
        var curBal = web3.fromWei(web3.eth.getBalance(coinbase), "ether");
        currentBalance += parseFloat(curBal);

        //var currentBalance = web3.eth.getBalance(coinbase).toNumber();
        document.getElementById("current").innerText = 'Current Balance:  ' + currentBalance;
        document.getElementById("diff").innerText = 'Difference in Balance: ' + (currentBalance - originalBalance);

        // General
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

        // Driver
        res9 = mangoInstance.driver.call();
        document.getElementById('driver').innerText = "Driver's address: " + res9;

        res10 = mangoInstance.temC.call();
        document.getElementById('temC').innerText = "Container's temperature: " + res10;

        res11 = mangoInstance.start.call();
        if (res11.e){
            res11 = calculateTS(res11);
        }
        document.getElementById('start').innerText = "Start: " + res11;

        res12 = mangoInstance.end.call();
        if (res12.e){
            res12 = calculateTS(res12);
        }
        document.getElementById('end').innerText = "End: " + res12;

        // if driver == owner, then inTransit = true
        // inTransit = res13
        res13 = false;
        if (res == res9) res13 = true;
        document.getElementById('transit').innerText = "In Driver's Possesion: " + res13;

        // Lab
        document.getElementById('transit2').innerText = "In Driver's Possesion: " + res13;

        res15 = mangoInstance.lab.call();
        document.getElementById('lab').innerText = "Lab's address: " + res15;

        res17 = mangoInstance.certificate.call();
        document.getElementById('certificate').innerText = "Certified: " + res17;
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
