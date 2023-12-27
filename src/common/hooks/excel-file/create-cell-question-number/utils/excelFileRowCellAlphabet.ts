import { alphabetArray } from 'common/hooks/excel-file/constants/excelFileCellAlphabetArray.const';

// for get startRowCellAlphabet (getRowCellAlphabetArray props)
export function getStartRowCellAlphabet(prevSurveyLastRowCellAlphabet: string) {
  const prevSurveyAlphabetArrayIndex = alphabetArray.indexOf(prevSurveyLastRowCellAlphabet);

  const currentSurveyAlphabetArrayIndex = prevSurveyAlphabetArrayIndex + 1;
  if (currentSurveyAlphabetArrayIndex < alphabetArray.length) {
    return alphabetArray[currentSurveyAlphabetArrayIndex];
  } else {
    return ''; // end of alphabetArray
  }
}

// for header cell setting question number
export function getRowCellAlphabetArray(startRowCellAlphabet: string, questionsLength: number) {
  const rowCellAlphabetArray = [];
  const startIndex = alphabetArray.indexOf(startRowCellAlphabet);

  for (let i = startIndex; i < startIndex + questionsLength; i++) {
    if (alphabetArray[i]) {
      rowCellAlphabetArray.push(alphabetArray[i]);
    } else {
      break;
    }
  }

  return rowCellAlphabetArray;
}
