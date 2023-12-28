import {
  getRowCellAlphabetArray,
  getStartRowCellAlphabet,
} from 'common/hooks/excel-file/create-cell-question-number/utils/excelFileRowCellAlphabet';
import { BAI_QUESTIONS } from 'pages/survey/survey-03-BAI/survey.const';
import { BDI_QUESTIONS } from 'pages/survey/survey-04-BDI/survey.const';
import { RBD_QUESTIONS } from 'pages/survey/survey-05-RBD/survey.const';
import { NMS_QUESTIONS } from 'pages/survey/survey-06-NMS/survey.const';

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

const survey03BAI_prevAlphabet =
  WS_COLUMN_SURVEY_02_FG.EFFECT_ON[WS_COLUMN_SURVEY_02_FG.EFFECT_ON.length - 1];
const survey03BAI_startAlphabet = getStartRowCellAlphabet(survey03BAI_prevAlphabet);
export const WS_COLUMN_SURVEY_03_BAI = getRowCellAlphabetArray(
  survey03BAI_startAlphabet,
  BAI_QUESTIONS.length + addSumIndex
);

const additionalQuestionLength = 1;
const survey04BDI_prevAlphabet = WS_COLUMN_SURVEY_03_BAI[WS_COLUMN_SURVEY_03_BAI.length - 1];
const survey04BDI_startAlphabet = getStartRowCellAlphabet(survey04BDI_prevAlphabet);
export const WS_COLUMN_SURVEY_04_BDI = getRowCellAlphabetArray(
  survey04BDI_startAlphabet,
  BDI_QUESTIONS.length + additionalQuestionLength + addSumIndex
);

const preQuestionLength = 1;
const survey05RBD_prevAlphabet = WS_COLUMN_SURVEY_04_BDI[WS_COLUMN_SURVEY_04_BDI.length - 1];
const survey05RBD_startAlphabet = getStartRowCellAlphabet(survey05RBD_prevAlphabet);
export const WS_COLUMN_SURVEY_05_RBD = getRowCellAlphabetArray(
  survey05RBD_startAlphabet,
  RBD_QUESTIONS.length + preQuestionLength + addSumIndex
);

const sectionLength = 9;
const survey06NMS_prevAlphabet = WS_COLUMN_SURVEY_05_RBD[WS_COLUMN_SURVEY_05_RBD.length - 1];
const survey06NMS_startAlphabet = getStartRowCellAlphabet(survey06NMS_prevAlphabet);
export const WS_COLUMN_SURVEY_06_NMS = getRowCellAlphabetArray(
  survey06NMS_startAlphabet,
  NMS_QUESTIONS.length + sectionLength + addSumIndex
);
