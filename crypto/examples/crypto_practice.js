var CryptoJS = require("crypto-js");
//var eth = require('ethereumjs-lib');
//var EC = require('elliptic').ec;
//var ec = new EC('secp256k1');

var LightWalletKeyStore = module.exports = (function () {

	var keyStore = {};

	var encPrivKeys = {};
	var addresses = [];

	var encryptKey = function (password, privKey) {
		var hash = CryptoJS.SHA3(password, { outputLength: 256 });
		var encryptedKey = CryptoJS.AES.encrypt(privKey, hash.toString(CryptoJS.enc.Hex));
		return encryptedKey;
	}

	var decryptKey = function (encryptedKey, password) {
		var hash = CryptoJS.SHA3(password, { outputLength: 256 });
		var decryptedKey = CryptoJS.AES.decrypt(encryptedKey, hash.toString(CryptoJS.enc.Hex));
		return decryptedKey;
	}

	var newPrivateKey = function () {
		var wordArray = CryptoJS.lib.WordArray.random(16);
		var privKey = wordArray.toString(CryptoJS.enc.Hex);
		return privKey;
	}

    var getPrivKeyFromAddress = function (address) {
		return encPrivKeys[address];
    }
    
    keyStore.getAddresses = function () {
		return addresses;
    }

    keyStore.addPrivateKey = function (password) {
    	// public key?
    	var privKey = newPrivateKey();
		var hash = CryptoJS.SHA3(privKey, { outputLength: 256 });
		var address = hash.toString(CryptoJS.enc.Hex)
		var encPrivKey = encryptKey(password, privKey)

		encPrivKeys[address] = encPrivKey;
		addresses.push(address);
    }

    keyStore.signTxWithAddress = function (rawTx, password, signingAddress) {
    	// work in progress
		var txCopy = new eth.Transaction(rawTx);
		var encPrivKey = getPrivKeyFromAddress(signingAddress);
		var privKey = decryptKey(encPrivKey, password);

		txCopy.sign(privkey);

		return txCopy.serialize();
    }

    return keyStore;

}());

LightWalletKeyStore.addPrivateKey("password123");
var addresses = LightWalletKeyStore.getAddresses();
console.log(addresses);