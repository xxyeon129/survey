import {
  getRowCellAlphabetArray,
  getStartRowCellAlphabet,
} from 'common/hooks/excel-file/create-cell-question-number/utils/excelFileRowCellAlphabet';
import { BAI_QUESTIONS } from 'pages/survey/survey-03-BAI/survey.const';

export const WS_COLUMN_SURVEY_01_UPDRS = {
  NOT_TAKE: [
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'AA',
    'AB',
  ],
  EFFECT_OFF: [
    'AC',
    'AD',
    'AE',
    'AF',
    'AG',
    'AH',
    'AI',
    'AJ',
    'AK',
    'AL',
    'AM',
    'AN',
    'AO',
    'AP',
    'AQ',
    'AR',
    'AS',
    'AT',
    'AU',
    'AV',
    'AW',
    'AX',
    'AY',
  ],
  EFFECT_ON: [
    'AZ',
    'BA',
    'BB',
    'BC',
    'BD',
    'BE',
    'BF',
    'BG',
    'BH',
    'BI',
    'BJ',
    'BK',
    'BL',
    'BM',
    'BN',
    'BO',
    'BP',
    'BQ',
    'BR',
    'BS',
    'BT',
    'BU',
    'BV',
  ],
};

export const WS_COLUMN_SURVEY_02_FG = {
  NOT_TAKE: ['BW', 'BX', 'BY', 'BZ', 'CA', 'CB', 'CC'],
  EFFECT_OFF: ['CD', 'CE', 'CF', 'CG', 'CH', 'CI', 'CJ'],
  EFFECT_ON: ['CK', 'CL', 'CM', 'CN', 'CO', 'CP', 'CQ'],
};

const addSumIndex = 1;

const survey03BAI_startAlphabet = getStartRowCellAlphabet(
  WS_COLUMN_SURVEY_02_FG.EFFECT_ON[WS_COLUMN_SURVEY_02_FG.EFFECT_ON.length - 1]
);
export const WS_COLUMN_SURVEY_03_BAI = getRowCellAlphabetArray(
  survey03BAI_startAlphabet,
  BAI_QUESTIONS.length + addSumIndex
);
