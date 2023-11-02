import { SURVEY_01_UPDRS_TOTAL_PAGES } from 'pages/survey/survey-01-UPDRS/survey.const';
import { SURVEY_02_FG_TOTAL_PAGES } from 'pages/survey/survey-02-FG/survey.const';
import { SURVEY_03_BAI_TOTAL_PAGES } from 'pages/survey/survey-03-BAI/survey.const';
import { SURVEY_04_BDI_TOTAL_PAGES } from 'pages/survey/survey-04-BDI/survey.const';
import { SURVEY_05_RBD_TOTAL_PAGES } from 'pages/survey/survey-05-RBD/survey.const';
import { SURVEY_06_NMS_TOTAL_PAGES } from 'pages/survey/survey-06-NMS/survey.const';
import { SURVEY_07_PDQ_TOTAL_PAGES } from 'pages/survey/survey-07-PDQ/survey.const';
import { SURVEY_08_PDSS_TOTAL_PAGES } from 'pages/survey/survey-08-PDSS/survey.const';
import { SURVEY_09_TIRED_TOTAL_PAGES } from 'pages/survey/survey-09-TIRED/survey.const';
import { SURVEY_10_SCOPA_TOTAL_PAGES } from 'pages/survey/survey-10-SCOPA/survey.const';
import { SURVEY_11_CONSTIPATION_TOTAL_PAGES } from 'pages/survey/survey-11-CONSTIPATION/survey.const';
import { SURVEY_12_FOOD_TOTAL_PAGES } from 'pages/survey/survey-12-FOOD/survey.const';

// for calculate header current page count when click sidebar survey list
export const totalPagesList = [
  SURVEY_01_UPDRS_TOTAL_PAGES,
  SURVEY_02_FG_TOTAL_PAGES,
  SURVEY_03_BAI_TOTAL_PAGES,
  SURVEY_04_BDI_TOTAL_PAGES,
  SURVEY_05_RBD_TOTAL_PAGES,
  SURVEY_06_NMS_TOTAL_PAGES,
  SURVEY_07_PDQ_TOTAL_PAGES,
  SURVEY_08_PDSS_TOTAL_PAGES,
  SURVEY_09_TIRED_TOTAL_PAGES,
  SURVEY_10_SCOPA_TOTAL_PAGES,
  SURVEY_11_CONSTIPATION_TOTAL_PAGES,
  SURVEY_12_FOOD_TOTAL_PAGES,
];

// for header total page, progressbar
export const totalPagesCount = totalPagesList.reduce((acc, cur) => acc + cur, 0);
