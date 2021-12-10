pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'LawEnforcementRole' to manage this role - add, remove, check
contract LawEnforcementRole {
    using Roles for Roles.Role;

    // Define 2 events, one for Adding, and other for Removing
    event LawEnforcementAdded(address indexed account);
    // event LawEnforcementRemoved(address indexed account);

    // Define a struct 'lawEnforcements' by inheriting from 'Roles' library, struct Role
    Roles.Role private lawEnforcements;

    // In the constructor make the address that deploys this contract the 1st manufacturer
    constructor() public {
        _addLawEnforcement(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyLawEnforcement() {
        require(isLawEnforcement(msg.sender));
        _;
    }

    // Define a function 'isLawEnforcement' to check this role
    function isLawEnforcement(address account) public view returns (bool) {
        return lawEnforcements.has(account);
    }

    // Define a function 'addLawEnforcement' that adds this role
    function addLawEnforcement(address account) public {
        _addLawEnforcement(account);
    }

    // Define a function 'renounceLawEnforcement' to renounce this role
    // function renounceLawEnforcement() public {
    //     _removeLawEnforcement(msg.sender);
    // }

    // Define an internal function '_addLawEnforcement' to add this role, called by 'addLawEnforcement'
    function _addLawEnforcement(address account) internal {
        lawEnforcements.add(account);
        emit LawEnforcementAdded(account);
    }

//     // Define an internal function '_removeLawEnforcement' to remove this role, called by 'removeLawEnforcement'
//     function _removeLawEnforcement(address account) internal {
//         lawEnforcements.remove(account);
//         emit ManufacturerRemoved(account);
//     }
}