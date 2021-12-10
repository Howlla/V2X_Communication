pragma solidity ^0.4.24;
// Define a contract 'Supplychain'

import "../core/Ownable.sol";
import "../accessControl/GatewayRole.sol";
import "../accessControl/LawEnforcementRole.sol";

contract VehicleMonitor is Ownable,GatewayRole,LawEnforcementRole {

    address chainOwner;

    mapping(address => uint) dangerRatings;
    mapping(address => bool) blacklistedVehicles;

    event Danger(uint indexed state,address indexed vehicle, bytes32 indexed location);
    event Blacklist(address vehicle);
    event BlacklistDetected(address indexed vehicle, bytes32 indexed location);

    enum State{
        Speeding,  //0
        DrowsyDriving,  //1
        Crashed//2
    }

    constructor() public payable {
     chainOwner = msg.sender;
    }

    function danger(State state,address vehicleAddress, bytes32 location) public onlyGateway{
        // check if vehicle
        // check if blacklisted
        if (blacklistedVehicles[vehicleAddress]){
            emit BlacklistDetected(vehicleAddress,location);
        }
        if(state == State.Speeding){
            dangerRatings[vehicleAddress] = dangerRatings[vehicleAddress] + 1;
        }else if(state == State.DrowsyDriving){
            dangerRatings[vehicleAddress] = dangerRatings[vehicleAddress] + 2;
        }else if(state == State.Crashed){
            dangerRatings[vehicleAddress] = dangerRatings[vehicleAddress] + 3;
        }
        emit Danger(uint(state),vehicleAddress,location);
    }

    function blacklist(address vehicleAddress) public onlyLawEnforcement{
        blacklistedVehicles[vehicleAddress] = true;
        emit Blacklist(vehicleAddress);
    }
    function getRating(address vehicleAddress) public onlyOwner view returns (uint) {
        return dangerRatings[vehicleAddress];
    }
    function destroyContract() public {
        if (msg.sender == chainOwner) {
        selfdestruct(chainOwner);
        }
    }

    // Define a modifer that checks to see if msg.sender == owner of the contract
  modifier onlyOwner() {
    require(msg.sender == owner(),"only owner can do this");
    _;
  }


}