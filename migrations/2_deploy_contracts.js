// migrating the appropriate contracts
var ManufacturerRole = artifacts.require("./VehicleMonitor.sol");
var RetailerRole = artifacts.require("./GatewayRole.sol");
var CustomerRole = artifacts.require("./LawEnforcementRole.sol");
var SupplyChain = artifacts.require("./VehicleRole.sol");

module.exports = function(deployer) {
  deployer.deploy(ManufacturerRole);
  deployer.deploy(RetailerRole);
  deployer.deploy(CustomerRole);
  deployer.deploy(SupplyChain);
};