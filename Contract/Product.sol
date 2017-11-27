pragma solidity ^0.4.18;

contract Ownable {

    address public owner; // possesor

    function Ownable() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyBy(address _account) {
        require(msg.sender == owner);
        require(msg.sender == _account);
        _;
    }

    // Change Ownership
    function transferOwnership(address _account) onlyOwner() {
        owner = _account;
    }

}

contract Destructible is Ownable {

    function Destructible() payable {}

    function destroy() onlyOwner {
        selfdestruct(owner);
    }

    function destroyAndSend(address _recipient) onlyOwner {
        selfdestruct(_recipient);
    }

}

contract Mango is Ownable, Destructible {

    // block
    uint public creationBlock;

    // farmer
    address public farmer;
    string public cropId;
    string public farmerLog;
    uint public quantity; // kg
    event SetFarmerLog(string log, uint time);

    // transfer
    bool public requireTransfer = false;
    bool public inTransit = false;

    // driver
    address public driver;
    uint public start;
    uint public end;
    int8 public temC; // [-128, 127]
    string public driverLog;
    event SetDriverLog(string log, uint time);

    // lab
    address public lab;
    bool public certificate;
    string public labLog;
    event SetLabLog(string log, uint time);

    function Mango(string _crop) {
        farmer = msg.sender;
        cropId = _crop;
        creationBlock = block.number;
    }

    // Set
    function setFarmerLog(string _log) public onlyBy(farmer) {
        SetFarmerLog(_log, now);
        farmerLog = _log;
    }

    function setQuantity(uint _quantity) public onlyBy(farmer) {
        quantity = _quantity;
    }

    function requireTransfer() public onlyBy(farmer) {
        requireTransfer = true;
    }

    function setDriverLog(string _log) public onlyBy(driver) {
        SetDriverLog(_log, now);
        driverLog = _log;
    }

    function setTemC(int8 _temC) public onlyBy(driver) {
        temC = _temC;
    }

    function setLabLog(string _log) public onlyBy(lab) {
      SetLabLog(_log, now);
      labLog = _log;
    }

    function setCertificate(bool _cert) public onlyBy(lab) {
        certificate = _cert;
    }

    // Get
    function getCreationBlock() constant returns (uint) {
        return creationBlock;
    }

    function getFarmer() constant returns (address) {
        return farmer;
    }

    function getLotId() constant returns (address) {
        return address(this);
    }

    function getCropId() constant returns (string) {
        return cropId;
    }

    function getFarmerLog() constant returns (string) {
        return farmerLog;   // contract to contract cant return string?
    }

    function getQuantity() constant returns (uint) {
        return quantity;   // contract to contract cant return string?
    }

    function getRequireTransfer() constant returns (bool) {
        return requireTransfer;
    }

    function getInTransit() constant returns (bool) {
        return inTransit;
    }

    function getDriver() constant returns (address) {
        return driver;
    }

    function getDriverLog() constant returns (string) {
        return driverLog;
    }

    function getStart() constant returns (uint) {
        return start;
    }

    function getEnd() constant returns (uint) {
        return end;
    }

    function getTemC() constant returns (int8) {
        return temC;
    }

    function getLab() constant returns (address) {
        return lab;
    }

    function getCertificate() constant returns (bool) {
        return certificate;
    }

    function getLabLog() constant returns (string) {
        return labLog;
    }

    // Change Ownership
    function transferToDriver(address _account) onlyBy(farmer) {
        owner = _account;
        driver = _account;
        start = now;
        inTransit = true;
        requireTransfer = false;
    }

    function transferToLab(address _account) onlyBy(driver) {
        owner = _account;
        lab = _account;
        end = now;             // block.timestamp == now
        inTransit = false;
    }

}
