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
        addr = "0x4c7f50bab2ba259d2508e55571597cf3a0852040";
    }
    else{
        addr = document.getElementById("contract").value;
    }

    var mangoContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_quantity","type":"uint256"}],"name":"setQuantity","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cropId","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"creationBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"quantity","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_log","type":"string"}],"name":"setFarmerLog","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"temC","outputs":[{"name":"","type":"int8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lab","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"certificate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"requireTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_log","type":"string"}],"name":"setLabLog","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"driver","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_cert","type":"bool"}],"name":"setCertificate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"start","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_temC","type":"int8"}],"name":"setTemC","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"inTransit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_account","type":"address"}],"name":"transferToLab","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"farmer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_log","type":"string"}],"name":"setDriverLog","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"end","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"}],"name":"destroyAndSend","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_account","type":"address"}],"name":"transferToDriver","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_crop","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"log","type":"string"},{"indexed":false,"name":"time","type":"uint256"}],"name":"SetFarmerLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"log","type":"string"},{"indexed":false,"name":"time","type":"uint256"}],"name":"SetDriverLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"log","type":"string"},{"indexed":false,"name":"time","type":"uint256"}],"name":"SetLabLog","type":"event"}]);

    mangoInstance = mangoContract.at(addr);

    // General
    document.getElementById('address').innerText = "Contract's address: " + addr;

    var res = mangoInstance.owner.call();
    document.getElementById('owner').innerText = "Owner's address: " + res;

    var res2 = mangoInstance.creationBlock.call();
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
    if (res11){
        res11 = calculateTS(res11);
    }
    document.getElementById('start').innerText = "Start: " + res11;

    var res12 = mangoInstance.end.call();
    if (res12){
        res12 = calculateTS(res12);
    }
    document.getElementById('end').innerText = "End: " + res12;

    var res13 = mangoInstance.inTransit.call();
    document.getElementById('transit').innerText = "In Driver's Possesion: " + res13;
    document.getElementById('transit2').innerText = "In Driver's Possesion: " + res13;

    // Lab
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
        if (res11){
            res11 = calculateTS(res11);
        }
        document.getElementById('start').innerText = "Start: " + res11;

        res12 = mangoInstance.end.call();
        if (res12){
            res12 = calculateTS(res12);
        }
        document.getElementById('end').innerText = "End: " + res12;

        res13 = mangoInstance.inTransit.call();
        document.getElementById('transit').innerText = "In Driver's Possesion: " + res13;

        // Lab
        document.getElementById('transit2').innerText = "In Driver's Possesion: " + res13;

        res15 = mangoInstance.lab.call();
        document.getElementById('lab').innerText = "Lab's address: " + res15;

        res17 = mangoInstance.certificate.call();
        document.getElementById('certificate').innerText = "Certified: " + res17;
    });

}
