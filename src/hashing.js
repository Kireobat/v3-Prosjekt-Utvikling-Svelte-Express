const bcrypt = require('bcrypt');

let saltRounds = 10;

// Hash string function

let hashString = (string, salt) => {
  console.log("saltTest1: "+salt)
  if (!salt == undefined) {
    const hash = bcrypt.hashSync(string, salt);
    console.log('Hash:',hash)
    return {hash: hash, salt: salt};
  } 
  salt = bcrypt.genSaltSync(saltRounds); 
  console.log("saltTest2: "+salt)
  const hash = bcrypt.hashSync(string, salt);
  console.log('Hash:',hash)
  return {hash: hash, salt: salt};
};

// compare hash function

let compareHash = (string, storedHash) => {
    const result = bcrypt.compareSync(string, storedHash);
    return result;
};

exports.hashString = hashString;
exports.compareHash = compareHash;