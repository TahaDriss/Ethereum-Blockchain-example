pragma solidity ^0.4.17;
/// @title First Test

contract Inbox {
    string public message;
     

    constructor(string memory initialMsg) public {
        message = initialMsg;
    }
     
    function setMsg(string memory newMsg) public {
        message = newMsg;
    }
}