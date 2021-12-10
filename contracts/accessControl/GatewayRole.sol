pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'GatewayRole' to manage this role - add, remove, check
contract GatewayRole {
    using Roles for Roles.Role;

    // Define 2 events, one for Adding, and other for Removing
    event GatewayAdded(address indexed account);
    event GatewayRemoved(address indexed account);

    // Define a struct 'gateways' by inheriting from 'Roles' library, struct Role
    Roles.Role private gateways;

    // In the constructor make the address that deploys this contract the 1st gateway
    constructor() public {
        _addGateway(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyGateway() {
        require(isGateway(msg.sender));
        _;
    }

    // Define a function 'isGateway' to check this role
    function isGateway(address account) public view returns (bool) {
        return gateways.has(account);
    }

    // Define a function 'addGateway' that adds this role
    function addGateway(address account) public {
        _addGateway(account);
    }

    // Define a function 'renounceGateway' to renounce this role
    function renounceGateway() public {
        _removeGateway(msg.sender);
    }

    // Define an internal function '_addGateway' to add this role, called by 'addGateway'
    function _addGateway(address account) internal {
        gateways.add(account);
        emit GatewayAdded(account);
    }

    // Define an internal function '_removeGateway' to remove this role, called by 'removeGateway'
    function _removeGateway(address account) internal {
        gateways.remove(account);
        emit GatewayRemoved(account);
    }
}