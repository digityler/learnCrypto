// Params

	var scrypt = require("scrypt");
	console.log(scrypt.params.config); //Outputs the config object to screen

	//Synchronous
	try {
	    //Uses 0.1 for maxtime, and the values in the config object for maxmem and maxmemfrac
	    var scryptParameters = scrypt.params(0.1); 
	    console.log(scryptParameters);
	} catch(err) {
	    
	}

	//Asynchronous
	scrypt.params(0.1, function(err, scryptParameters) {
	    console.log(scryptParameters);
	});

// Hash

	var scrypt = require("scrypt");
	var scryptParameters = scrypt.params(0.1);
	var key = new Buffer("this is a key"); //key defaults to buffer in config, so input must be a buffer

	//Synchronous example that will output in hexidecimal encoding
	scrypt.hash.config.outputEncoding = "hex";
	var hash = scrypt.hash(key, scryptParameters); //should be wrapped in try catch, but leaving it out for brevity
	console.log("Synchronous result: "+hash);

	//Asynchronous example that expects key to be ascii encoded
	scrypt.hash.config.keyEncoding = "ascii";
	scrypt.hash("ascii encoded key", {N: 1, r:1, p:1}, function(err, result){
	    //result will be hex encoded
	    //Note how scrypt parameters was passed as a JSON object
	    console.log("Asynchronous result: "+result);
	});

// Verify

	var scrypt = require("scrypt");
	var scryptParameters = scrypt.params(0.1);
	scrypt.hash.config.keyEncoding = "ascii";
	scrypt.verify.config.keyEncoding = "ascii";
	var hash = scrypt.hash("password", scryptParameters);

	//Synchronous
	scrypt.verify(hash, "password"); //result will be true
	scrypt.verify(hash, "incorrect password"); //result will be false

	//Asynchronous
	scrypt.verify(hash, "password", function(err, result) {
	    //result will be true
	});

// Key Derivation Function

	// Test Vector 1

	var scrypt = require("scrypt");
	scrypt.kdf.config.saltEncoding = "ascii";
	var key = new Buffer("");

	//Synchronous
	var res = scrypt.kdf(key,{"N":16,"r":1,"p":1},64,"");
	console.log(res.hash.toString("hex"));

	//Asynchronous
	scrypt.kdf(key, {"N":16,"r":1,"p":1},64,"", function(err, res) {
	    console.log(res.hash.toString("hex"));
	});

	// Test Vector 2

	var scrypt = require("scrypt");
	scrypt.kdf.config.keyEncoding = "ascii";
	var salt = new Buffer("NaCl");

	//Synchronous
	var res = scrypt.kdf("password",{"N":1024,"r":8,"p":16},64,salt);
	console.log(res.hash.toString("hex"));

	scrypt.kdf("password", {"N":1024,"r":8,"p":16},64,salt, function(err, res) {
	    console.log(res.hash.toString("hex"));
	});
		
	// Test Vector 3

	var scrypt = require("scrypt");
	scrypt.kdf.config.outputEncoding = "hex";
	var key = new Buffer("pleaseletmein");
	var salt = new Buffer("SodiumChloride");

	//Synchronous
	var res = scrypt.kdf(key,{"N":16384,"r":8,"p":1},64,salt);
	console.log(res.hash);

	//Asynchronous
	scrypt.kdf(key, {"N":16384,"r":8,"p":1},64,salt, function(err, res) {
	    console.log(res.hash);
	});
