
var eth = require('ethereumjs-lib')
var coder = require('./node_modules/web3/lib/solidity/coder')
var sha3 = require('sha3')

var LightWalletUtils = module.exports = (function () {

    var lw = {}

    lw.encodeFunctionTxData = function (functionName, types, args) {

		var fullName = functionName + '(' + types.join() + ')'
		var sha3hasher = new sha3.SHA3Hash(256)
		var signature = (sha3hasher.update(fullName)).digest('hex').slice(0, 8)
		var dataHex = signature + coder.encodeParams(types, args)
		var dataBuffer = new Buffer(dataHex, 'hex')

		return dataBuffer
    }

    lw.createFunctionTx = function (functionName, types, args, txObject) {
		// txObject contains gasPrice, gasLimit, nonce, to
	
		var txData = lw.encodeFunctionTxData(functionName, types, args)

		var txObjectCopy = {}
		txObjectCopy.to = txObject.to
		txObjectCopy.gasPrice = txObject.gasPrice
		txObjectCopy.gasLimit = txObject.gasLimit
		txObjectCopy.nonce = txObject.nonce
		txObjectCopy.data = txData
		
		return new eth.Transaction(txObjectCopy)
    }

    return lw;

}());