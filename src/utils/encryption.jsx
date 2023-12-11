// Import the necessary CryptoJS components
import CryptoJS from 'crypto-js';

// Encryption function
function encryptData(data, key) {
  // const encrypted = CryptoJS.AES.encrypt(data, key);
  // return encrypted.toString();
  // Convert the data to a WordArray with UTF-8 encoding
  const dataUtf8 = CryptoJS.enc.Utf8.parse(data);

  // Encrypt the data using AES with the UTF-8 encoded WordArray
  const encrypted = CryptoJS.AES.encrypt(dataUtf8, key);

  // Return the encrypted data as a string
  return encrypted.toString();
}

// Decryption function
function decryptData(encryptedData, key) {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key);
  // const decrypted = CryptoJS.AES.decrypt(encryptedData, key, { format: CryptoJS.format.OpenSSL });
  return decrypted.toString(CryptoJS.enc.Utf8);
  // return decrypted;
  // return decrypted.toString();
}

// // Usage examplel
// const secretData = 'Sensitive information';
// const encryptionKey = 'Secret passphrase';

// // Encrypt the data
// const encryptedData = encryptData(secretData, encryptionKey);
// console.log(encryptedData);

// // Decrypt the data
// const decryptedData = decryptData(encryptedData, encryptionKey);
// console.log(decryptedData);

export { encryptData, decryptData }