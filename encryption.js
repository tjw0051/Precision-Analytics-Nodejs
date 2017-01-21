var crypto = require("crypto");
var path = require("path");
var fs = require("fs");

var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toEncrypt);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

var decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};

class encryption {
    setKeys(publicKey, privateKey) {
        var absolutePath = path.resolve(publicKey);
        self.publicKey = fs.readFileSync(absolutePath, "utf8");

        var absolutePath = path.resolve(privateKey);
        self.publicKey = fs.readFileSync(absolutePath, "utf8");
    }

    encrypt(data) {
        var buffer = new Buffer(data);
        var encrypted = crypto.publicEncrypt(self.publicKey, buffer);
        return encrypted.toString("base64");
    }

    decrypt(data) {
        var buffer = new Buffer(data, "base64");
        var decrypted = crypto.privateDecrypt(self.privateKey, buffer);
        return decrypted.toString("utf8");
    }
}

module.exports = encryption;