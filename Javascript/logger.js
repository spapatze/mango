var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    var provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    var web3 = new Web3(provider);
}

var mangoInstance;
var addr;
var event;

function watchEverything() {

    document.getElementById("startE").style.visibility = "hidden";

    // Account's Balance
    var coinbase = web3.eth.accounts[0];

    var originalBalance = 0;
    var acctBal = web3.fromWei(web3.eth.getBalance(coinbase), "ether");
    originalBalance += parseFloat(acctBal);

    document.getElementById("coinbase").innerText = "Account's Address: " + coinbase;
    document.getElementById("original").innerText = "Original Balance: " + originalBalance + ' watching...';


    // Contract
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

    // Driver
    var res9 = mangoInstance.getDriver.call();
    document.getElementById('driver').innerText = "Driver's address: " + res9;

    var res10 = mangoInstance.getTemC.call();
    document.getElementById('temC').innerText = "Container's temperature: " + res10;

    var res11 = mangoInstance.getStart.call();
    document.getElementById('start').innerText = "Start: " + res11;

    var res12 = mangoInstance.getEnd.call();
    document.getElementById('end').innerText = "End: " + res12;
    document.getElementById('transit2').innerText = "In Driver's Possesion: " + res12;

    var res13 = mangoInstance.getInTransit.call();
    document.getElementById('transit').innerText = "In Driver's Possesion: " + res13;

    var res14 = mangoInstance.getDriverLog.call();
    document.getElementById('driverLog').innerText = "Driver's Log: " + res14;


    // Lab
    var res15 = mangoInstance.getLab.call();
    document.getElementById('lab').innerText = "Lab's address: " + res15;

    var res16 = mangoInstance.getLabLog.call();
    document.getElementById('labLog').innerText = "Lab's Log: " + res16;

    var res17 = mangoInstance.getCertificate.call();
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

        // Driver
        res9 = mangoInstance.getDriver.call();
        document.getElementById('driver').innerText = "Driver's address: " + res9;

        res10 = mangoInstance.getTemC.call();
        document.getElementById('temC').innerText = "Container's temperature: " + res10;

        res11 = mangoInstance.getStart.call();
        document.getElementById('start').innerText = "Start: " + res11;

        res12 = mangoInstance.getEnd.call();
        document.getElementById('end').innerText = "End: " + res12;
        document.getElementById('transit2').innerText = "In Driver's Possesion: " + res12;

        res13 = mangoInstance.getInTransit.call();
        document.getElementById('transit').innerText = "In Driver's Possesion: " + res13;

        res14 = mangoInstance.getDriverLog.call();
        document.getElementById('driverLog').innerText = "Driver's Log: " + res14;


        // Lab
        res15 = mangoInstance.getLab.call();
        document.getElementById('lab').innerText = "Lab's address: " + res15;

        res16 = mangoInstance.getLabLog.call();
        document.getElementById('labLog').innerText = "Lab's Log: " + res16;

        res17 = mangoInstance.getCertificate.call();
        document.getElementById('certificate').innerText = "Certified: " + res17;
    });

}
