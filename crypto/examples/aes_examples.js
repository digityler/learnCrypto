// CBC Mode

var aes = require('aes-js');

var key = aes.util.convertStringToBytes("Example128BitKey");
 
// The initialization vector, which must be 16 bytes 
var iv = aes.util.convertStringToBytes("IVMustBe16Bytes.");
 
// Convert text to bytes 
var text = 'TextMustBe16Byte';
var textBytes = aes.util.convertStringToBytes(text);
 
var aesCbc = new aes.ModeOfOperation.cbc(key, iv);
var encryptedBytes = aesCbc.encrypt(textBytes);
 
// The cipher-block chaining mode of operation maintains internal 
// state, so to decrypt a new instance must be instantiated. 
var aesCbc = new aes.ModeOfOperation.cbc(key, iv);
var decryptedBytes = aesCbc.decrypt(encryptedBytes);
 
// Convert our bytes back into text 
var decryptedText = aes.util.convertBytesToString(decryptedBytes);
console.log(decryptedText);
// "TextMustBe16Byte" 