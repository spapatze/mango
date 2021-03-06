var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    var provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    var web3 = new Web3(provider);
}

var mangoInstance;
var addr;
var creationBlock;

function watchEverything() {

    document.getElementById("startE").style.visibility = "hidden";
    document.getElementById("contract").style.visibility = "hidden";
    if (document.getElementById("contract").value == ""){
        addr = "0x75a941ce4b02c71038ea22f62b51056ff1c30698";
    }
    else{
        addr = document.getElementById("contract").value;
    }

    var mangoContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getQuantity","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_quantity","type":"uint256"}],"name":"setQuantity","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cropId","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"creationBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"quantity","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLab","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCreationBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_log","type":"string"}],"name":"setFarmerLog","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getFarmer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"temC","outputs":[{"name":"","type":"int8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getInTransit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lab","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"certificate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"requireTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getFarmerLog","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getDriver","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTemC","outputs":[{"name":"","type":"int8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLotId","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"driverLog","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"farmerLog","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_log","type":"string"}],"name":"setLabLog","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"driver","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCropId","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"labLog","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getEnd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCertificate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_cert","type":"bool"}],"name":"setCertificate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"start","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_temC","type":"int8"}],"name":"setTemC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getStart","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"inTransit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_account","type":"address"}],"name":"transferToLab","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDriverLog","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRequireTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"farmer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_log","type":"string"}],"name":"setDriverLog","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"end","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_account","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"}],"name":"destroyAndSend","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getLabLog","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_account","type":"address"}],"name":"transferToDriver","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_crop","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"log","type":"string"},{"indexed":false,"name":"time","type":"uint256"}],"name":"SetFarmerLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"log","type":"string"},{"indexed":false,"name":"time","type":"uint256"}],"name":"SetDriverLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"log","type":"string"},{"indexed":false,"name":"time","type":"uint256"}],"name":"SetLabLog","type":"event"}]);

    mangoInstance = mangoContract.at(addr);

    // General
    document.getElementById('address').innerText = "Contract's address: " + addr;

    var res = mangoInstance.owner.call();
    document.getElementById('owner').innerText = "Owner's address: " + res;

    var res2 = mangoInstance.getCreationBlock.call();
    document.getElementById('creation').innerText = "Creation's block number: " + res2;
    creationBlock = res2;

    // Farmer
    var res3 = mangoInstance.getFarmer.call();
    document.getElementById('farmer').innerText = "Farmer's address: " + res3;

    var res4 = mangoInstance.getLotId.call();
    document.getElementById('lot').innerText = "Lot ID: " + res4;

    var res5 = mangoInstance.getCropId.call();
    document.getElementById('crop').innerText = "Crop ID: " + res5;

    var res6 = mangoInstance.getQuantity.call();
    document.getElementById('kg').innerText = "Quantity (in kg): " + res6;

    var res7 = mangoInstance.getFarmerLog.call();
    document.getElementById('farmLog').innerText = "Farmer's Log: " + res7;

    var res8 = mangoInstance.getRequireTransfer.call();
    document.getElementById('requireTransfer').innerText = "Require Transfer: " + res8;


    web3.eth.filter('latest').watch(function() {

        res = mangoInstance.owner.call();
        document.getElementById('owner').innerText = "Owner's address: " + res;

        //res2 = mangoInstance.getCreationBlock.call();
        //document.getElementById('creation').innerText = "Creation's block number: " + res2;

        // Farmer
        res3 = mangoInstance.getFarmer.call();
        document.getElementById('farmer').innerText = "Farmer's address: " + res3;

        res4 = mangoInstance.getLotId.call();
        document.getElementById('lot').innerText = "Lot ID: " + res4;

        res5 = mangoInstance.getCropId.call();
        document.getElementById('crop').innerText = "Crop ID: " + res5;

        res6 = mangoInstance.getQuantity.call();
        document.getElementById('kg').innerText = "Quantity (in kg): " + res6;

        res7 = mangoInstance.getFarmerLog.call();
        document.getElementById('farmLog').innerText = "Farmer's Log: " + res7;

        res8 = mangoInstance.getRequireTransfer.call();
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

    document.getElementById('inform').style.visibility = 'hidden';
    console.log(true);
    mangoInstance.requireTransfer.sendTransaction({from: web3.eth.accounts[0]});

}

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
