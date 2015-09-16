// Async

	// To hash a password:

	var bcrypt = require('bcrypt');
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash('bacon', salt, function(err, hash) {
	        // Store hash in your password DB. 
	    });
	});

	// To check a password:

	// Load hash from your password DB. 
	bcrypt.compare('bacon', hash, function(err, res) {
	    // res == true 
	});
	bcrypt.compare('veggies', hash, function(err, res) {
	    // res == false 
	});

	// Auto-gen a salt and hash:

	bcrypt.hash('bacon', 8, function(err, hash) {
	});

// Sync

	// To hash a password:

	var bcrypt = require('bcrypt');
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync('bacon', salt);
	// Store hash in your password DB.

	// To check a password:

	// Load hash from your password DB. 
	bcrypt.compareSync('bacon', hash); // true 
	bcrypt.compareSync('veggies', hash); // false 

	// Auto-gen a salt and hash:

	var hash = bcrypt.hashSync('bacon', 8);