import {
  getRowCellAlphabetArray,
  getStartRowCellAlphabet,
} from 'common/hooks/excel-file/create-cell-question-number/utils/excelFileRowCellAlphabet';
import { BAI_QUESTIONS } from 'pages/survey/survey-03-BAI/survey.const';
import { BDI_QUESTIONS } from 'pages/survey/survey-04-BDI/survey.const';
import { RBD_QUESTIONS } from 'pages/survey/survey-05-RBD/survey.const';
import { NMS_QUESTIONS } from 'pages/survey/survey-06-NMS/survey.const';
import { PDQ_QUESTIONS } from 'pages/survey/survey-07-PDQ/survey.const';
import { PDSS_QUESTIONS } from 'pages/survey/survey-08-PDSS/survey.const';
import { TIRED_QUESTIONS } from 'pages/survey/survey-09-TIRED/survey.const';
import { SCOPA_QUESTIONS } from 'pages/survey/survey-10-SCOPA/survey.const';
import { CONSTIPATION_QUESTIONS } from 'pages/survey/survey-11-CONSTIPATION/survey.const';

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

const survey07PDQ_prevAlphabet = WS_COLUMN_SURVEY_06_NMS[WS_COLUMN_SURVEY_06_NMS.length - 1];
const survey07PDQ_startAlphabet = getStartRowCellAlphabet(survey07PDQ_prevAlphabet);
export const WS_COLUMN_SURVEY_07_PDQ = getRowCellAlphabetArray(
  survey07PDQ_startAlphabet,
  PDQ_QUESTIONS.length + addSumIndex
);

const survey08PDSS_prevAlphabet = WS_COLUMN_SURVEY_07_PDQ[WS_COLUMN_SURVEY_07_PDQ.length - 1];
const survey08PDSS_startAlphabet = getStartRowCellAlphabet(survey08PDSS_prevAlphabet);
export const WS_COLUMN_SURVEY_08_PDSS = getRowCellAlphabetArray(
  survey08PDSS_startAlphabet,
  PDSS_QUESTIONS.length + addSumIndex
);

const survey09TIRED_prevAlphabet = WS_COLUMN_SURVEY_08_PDSS[WS_COLUMN_SURVEY_08_PDSS.length - 1];
const survey09TIRED_startAlphabet = getStartRowCellAlphabet(survey09TIRED_prevAlphabet);
export const WS_COLUMN_SURVEY_09_TIRED = getRowCellAlphabetArray(
  survey09TIRED_startAlphabet,
  TIRED_QUESTIONS.length + addSumIndex
);

const addInputQuestion = 3;
const survey10SCOPA_prevAlphabet = WS_COLUMN_SURVEY_09_TIRED[WS_COLUMN_SURVEY_09_TIRED.length - 1];
const survey10SCOPA_startAlphabet = getStartRowCellAlphabet(survey10SCOPA_prevAlphabet);
export const WS_COLUMN_SURVEY_10_SCOPA = getRowCellAlphabetArray(
  survey10SCOPA_startAlphabet,
  SCOPA_QUESTIONS.length + addInputQuestion + addSumIndex
);

const survey11CONSTIPATION_prevAlphabet =
  WS_COLUMN_SURVEY_10_SCOPA[WS_COLUMN_SURVEY_10_SCOPA.length - 1];
const survey11CONSTIPATION_startAlphabet = getStartRowCellAlphabet(
  survey11CONSTIPATION_prevAlphabet
);
export const WS_COLUMN_SURVEY_11_CONSTIPATION = getRowCellAlphabetArray(
  survey11CONSTIPATION_startAlphabet,
  CONSTIPATION_QUESTIONS.length + addSumIndex
);
