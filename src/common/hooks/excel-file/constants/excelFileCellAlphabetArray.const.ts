// for header cell setting question number
function generateAlphabetArray() {
  const alphabetArray = [];
  const startCharCode = 'A'.charCodeAt(0);
  const endCharCode = 'Z'.charCodeAt(0);

  for (let i = startCharCode; i <= endCharCode; i++) {
    alphabetArray.push(String.fromCharCode(i));
  }

  for (let i = startCharCode; i <= endCharCode; i++) {
    for (let j = startCharCode; j <= endCharCode; j++) {
      alphabetArray.push(String.fromCharCode(i) + String.fromCharCode(j));
    }
  }

  return alphabetArray;
}

export const alphabetArray = generateAlphabetArray();
