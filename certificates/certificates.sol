pragma solidity ^0.8.0;

contract Certificates {
    address public owner;

    struct Certificate {
        string course;
        string userName;
        string date;
        string userId;
    }

    uint public certificateCount;
    mapping (uint => Certificate) public certificates;

    constructor() {
        owner = msg.sender;
        certificateCount = 0;
    }

    function addCertificate(string memory _course, string memory _userName, string memory _date, string memory _userId) public returns (uint) {
        require(msg.sender == owner, "Only owner can add certificates");
        certificateCount++;
        certificates[certificateCount] = Certificate(_course, _userName, _date, _userId);
        return certificateCount;
    }

    function getCertificate(uint _id) public view returns (string memory, string memory, string memory, string memory) {
        require(_id > 0 && _id <= certificateCount, "Invalid certificate id");
        Certificate c = certificates[_id];
        return (c.course, c.userName, c.date, c.userId);
    }
}