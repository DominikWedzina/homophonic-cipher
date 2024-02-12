import { useState } from "react";
const homophonicTable = {
  "A": ["05", "38", "60", "98"],
  "B": ["06", "39", "61", "99"],
  "C": ["07", "40", "62", "00"],
  "D": ["08", "41", "63", "76"],
  "E": ["09", "42", "64", "77"],
  "F": ["10", "43", "65", "78"],
  "G": ["11", "44", "66", "79"],
  "H": ["12", "45", "67", "80"],
  "I": ["13", "46", "68", "81"],
  "J": ["14", "47", "69", "82"],
  "K": ["15", "48", "70", "83"],
  "L": ["16", "49", "71", "84"],
  "M": ["17", "50", "72", "85"],
  "N": ["18", "51", "73", "86"],
  "O": ["19", "52", "74", "87"],
  "P": ["20", "53", "75", "88"],
  "Q": ["21", "54", "76", "89"],
  "R": ["22", "55", "77", "90"],
  "S": ["23", "56", "78", "91"],
  "T": ["24", "57", "79", "92"],
  "U": ["25", "58", "80", "93"],
  "V": ["26", "59", "81", "94"],
  "W": ["01", "34", "82", "95"],
  "X": ["02", "35", "83", "96"],
  "Y": ["03", "36", "84", "97"],
  "Z": ["04", "37", "85", "98"],
};
// Encrypt function
function encrypt(plaintext) {
  let ciphertext = "";
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i].toUpperCase();
    if (homophonicTable[char]) {
      const substitutes = homophonicTable[char];
      const substitute =
        substitutes[Math.floor(Math.random() * substitutes.length)];
      ciphertext += substitute + " ";
    } else {
      // Append non-alphabetic characters as is
      ciphertext += char + " ";
    }
  }
  return ciphertext.trim();
}

// Decrypt function
function decrypt(ciphertext) {
  let plaintext = "";
  const numbers = ciphertext.split(" ");
  for (let number of numbers) {
    let found = false;
    for (let [letter, codes] of Object.entries(homophonicTable)) {
      if (codes.includes(number)) {
        plaintext += letter;
        found = true;
        break;
      }
    }
    if (!found) {
      plaintext += " "; // Placeholder for numbers that don't match a letter
    }
  }
  return plaintext;
}

function App() {
  const [text, setText] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const handleEncrypt = () => {
    const encryptedText = encrypt(text);
    setEncrypted(encryptedText);
    setDecrypted('');
  };

  const handleDecrypt = () => {
    const decryptedText = decrypt(encrypted);
    setDecrypted(decryptedText);
  };

  return (
    <div className="container">
      <h1>Homophonic Cipher</h1>
      <div className='input-container'>
        <input
          type="text"
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to encrypt"
        />
        <button className="button" onClick={handleEncrypt}>Szyfruj</button>
      </div>
      <div className='input-container'>
        <input
          type="text"
          className="input"
          value={encrypted}
          onChange={(e) => setEncrypted(e.target.value)}
          placeholder="Enter text to decrypt"
        />
        <button className="button" onClick={handleDecrypt}>Deszyfruj</button>
      </div>
      <div className="output">
        <p>Tekst zaszyfrowany: {encrypted}</p>
        <p>Tekst jawny: {decrypted}</p>
      </div>
    </div>
  );
}

export default App
