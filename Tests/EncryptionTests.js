var chai = require('chai');
var expect = chai.expect;
var encryption = require('../src/encryption.js')

describe('Encryption', function() {
  it('Test encryption and decryption', function() {
    var encrypt = new encryption();
    encrypt.setKeys('key.pub', 'key');
    var input = 'hello'
    var encryptedData = encrypt.encrypt(input);
    var output = encrypt.decrypt(encryptedData);
    expect(output).to.equal(input);
  });
});