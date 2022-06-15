# Comandos utilizado na aula 74
Web3

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))

web3.eth.getAccounts().then(console.log)

let myContract = new web3.eth.Contract([
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_myUint",
				"type": "uint256"
			}
		],
		"name": "setUint",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "myUint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
], "0x3e5230022F9f20b2252221b861619a06CC11d6Ac")

myContract.methods.myUint().call().then(result => console.log(result.toString()))

myContract.methods.setUint(50).send({ from: "0x3e5230022F9f20b2252221b861619a06CC11d6Ac" })
