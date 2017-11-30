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
    uint public quantity; // kg
    event SetFarmerLog(string log, uint time);

    // transfer
    bool public informedDriver;

    // driver
    address public driver;
    uint public start;
    uint public end;
    int8 public temC;
    event SetDriverLog(string log, uint time);

    // lab
    address public lab;
    bool public certificate;
    event SetLabLog(string log, uint time);

    function Mango(string _crop) {
        farmer = msg.sender;
        cropId = _crop;
        creationBlock = block.number;
    }

    // Set
    function setFarmerLog(string _log) public onlyBy(farmer) {
        SetFarmerLog(_log, now);
    }

    function setQuantity(uint _quantity) public onlyBy(farmer) {
        quantity = _quantity;
    }

    function requireTransfer() public onlyBy(farmer) {
        informedDriver = true;
    }

    function setDriverLog(string _log) public onlyBy(driver) {
        SetDriverLog(_log, now);
    }

    function setTemC(int8 _temC) public onlyBy(driver) {
        temC = _temC;
    }

    function setLabLog(string _log) public onlyBy(lab) {
      SetLabLog(_log, now);
    }

    function setCertificate(bool _cert) public onlyBy(lab) {
        certificate = _cert;
    }

    function transferToDriver(address _account) onlyBy(farmer) {
        owner = _account;
        driver = _account;
        start = now;
        informedDriver = false;
    }

    function transferToLab(address _account) onlyBy(driver) {
        owner = _account;
        lab = _account;
        end = now;             // block.timestamp == now
    }

}
