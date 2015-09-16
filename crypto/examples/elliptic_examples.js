// ECDSA

	var EC = require('elliptic').ec;
	 
	// Create and initialize EC context 
	// (better do it once and reuse it) 
	var ec = new EC('secp256k1');
	 
	// Generate keys 
	var key = ec.genKeyPair();
	 
	// Sign message (must be an array, or it'll be treated as a hex sequence) 
	var msg = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
	var signature = key.sign(msg);
	 
	// Export DER encoded signature in Array 
	var derSign = signature.toDER();
	 
	// Verify signature 
	console.log(key.verify(msg, derSign));

// ECDH

	// Generate keys 
	var key1 = ec.genKeyPair();
	var key2 = ec.genKeyPair();
	 
	var shared1 = key1.derive(key2.getPublic());
	var shared2 = key2.derive(key1.getPublic());
	 
	console.log('Both shared secrets are BN instances');
	console.log(shared1.toString(16));
	console.log(shared2.toString(16));