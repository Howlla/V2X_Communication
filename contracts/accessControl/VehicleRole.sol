pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'VehicleRole' to manage this role - add, remove, check
contract VehicleRole {
    using Roles for Roles.Role;

    // Define 2 events, one for Adding, and other for Removing
    event VehicleAdded(address indexed account);
    event VehicleRemoved(address indexed account);

    // Define a struct 'vehicles' by inheriting from 'Roles' library, struct Role
    Roles.Role private vehicles;

    // In the constructor make the address that deploys this contract the 1st vehicle
    constructor() public {
        _addVehicle(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyVehicle() {
        require(isVehicle(msg.sender));
        _;
    }

    // Define a function 'isVehicle' to check this role
    function isVehicle(address account) public view returns (bool) {
        return vehicles.has(account);
    }

    // Define a function 'addVehicle' that adds this role
    function addVehicle(address account) public {
        _addVehicle(account);
    }

    // Define an internal function '_addVehicle' to add this role, called by 'addVehicle'
    function _addVehicle(address account) internal {
        vehicles.add(account);
        emit VehicleAdded(account);
    }

    // Define an internal function '_removeVehicle' to remove this role, called by 'removeVehicle'
    function _removeVehicle(address account) internal {
        vehicles.remove(account);
        emit VehicleRemoved(account);
    }
}