

import CryptoJS from 'crypto-js';

const secretKey = "?G&;3GCK0wB?!n5?;q0q_FQt(Adrqa"; 

const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
};


const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export default {encryptPassword, decryptPassword}


