var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");

const abi = [
    {
      "constant": false,
      "inputs": [],
      "name": "renounceGateway",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "account",
          "type": "address"
        }
      ],
      "name": "addGateway",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "account",
          "type": "address"
        }
      ],
      "name": "addLawEnforcement",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isOwner",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "addressofsender",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "account",
          "type": "address"
        }
      ],
      "name": "isLawEnforcement",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "account",
          "type": "address"
        }
      ],
      "name": "isGateway",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "state",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "vehicle",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "location",
          "type": "bytes32"
        }
      ],
      "name": "Danger",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "vehicle",
          "type": "address"
        }
      ],
      "name": "Blacklist",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "vehicle",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "location",
          "type": "bytes32"
        }
      ],
      "name": "BlacklistDetected",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "account",
          "type": "address"
        }
      ],
      "name": "LawEnforcementAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "account",
          "type": "address"
        }
      ],
      "name": "GatewayAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "account",
          "type": "address"
        }
      ],
      "name": "GatewayRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "oldOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "TransferOwnership",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "state",
          "type": "uint8"
        },
        {
          "name": "vehicleAddress",
          "type": "address"
        },
        {
          "name": "location",
          "type": "bytes32"
        }
      ],
      "name": "danger",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "vehicleAddress",
          "type": "address"
        }
      ],
      "name": "blacklist",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "vehicleAddress",
          "type": "address"
        }
      ],
      "name": "getRating",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "destroyContract",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  
// Smart contract address for vehicleMonitor.sol
const addr = '0x3d3e7bda51c02e09c294fe668d9ad9ba329f992c'
// connect to Infura node
const url = "http://127.0.0.1:8545";

//Gateway Public address
const lawEnforcementPublicAddress = "0x27d8d15cbc94527cadf5ec14b69519ae23288b95";
const privateKey = "9137dc4de37d28802ff9e5ee3fe982f1ca2e5faa52f54a00a6023f546b23e779";

const provider = new Provider(privateKey, url);
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(abi, addr);

// let dangerEvent = contract.events.Danger({},{fromBlock:0,toBlock: 'latest'})
var topic = 'Danger'

client.on('message', (topic,message) => {
    message = message.toString(); 
    web3.eth.getTransactionReceipt(message, (err,txr) => {
        if(err){
            return;
        }
        var logs = txr.logs[0].topics
        // console.log(logs)
        console.log("Danger Detected")
        console.log("Event Signature:" , logs[0])
        console.log("Danger Type", parseInt(logs[1]))
        console.log("Vehicle:",web3.eth.abi.decodeParameter('address', logs[2]))
        console.log("Location:", web3.utils.hexToAscii(logs[3]) )

    })

    // dangerEvent.getPastEvents((error,logs) => {
    //     logs.forEach(log => console.log(log.args))   
    // })
    console.log(message)
})

client.on('connect', () => {
    client.subscribe(topic)
})
