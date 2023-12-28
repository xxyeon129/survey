import { NMS_QUESTIONS } from 'pages/survey/survey-06-NMS/survey.const';

export const survey06NMS_sectionList = {
  1: {
    stateKey: 'section1',
    lastQuestionNumber: 2,
  },
  2: {
    stateKey: 'section2',
    lastQuestionNumber: 6,
  },
  3: {
    stateKey: 'section3',
    lastQuestionNumber: 12,
  },
  4: {
    stateKey: 'section4',
    lastQuestionNumber: 15,
  },
  5: {
    stateKey: 'section5',
    lastQuestionNumber: 18,
  },
  6: {
    stateKey: 'section6',
    lastQuestionNumber: 21,
  },
  7: {
    stateKey: 'section7',
    lastQuestionNumber: 24,
  },
  8: {
    stateKey: 'section8',
    lastQuestionNumber: 26,
  },
  9: {
    stateKey: 'section9',
    lastQuestionNumber: 30,
  },
};

// TO DO: refactoring
const cellQuestionNumberList = [];
const sectionLength = 9;
const cellLength = NMS_QUESTIONS.length + sectionLength;
for (let i = 1; i <= cellLength; i++) {
  cellQuestionNumberList.push(i);
  if (i === survey06NMS_sectionList[1].lastQuestionNumber) cellQuestionNumberList.push('영역1SUM');
  if (i === survey06NMS_sectionList[2].lastQuestionNumber) cellQuestionNumberList.push('영역2SUM');
  if (i === survey06NMS_sectionList[3].lastQuestionNumber) cellQuestionNumberList.push('영역3SUM');
  if (i === survey06NMS_sectionList[4].lastQuestionNumber) cellQuestionNumberList.push('영역4SUM');
  if (i === survey06NMS_sectionList[5].lastQuestionNumber) cellQuestionNumberList.push('영역5SUM');
  if (i === survey06NMS_sectionList[6].lastQuestionNumber) cellQuestionNumberList.push('영역6SUM');
  if (i === survey06NMS_sectionList[7].lastQuestionNumber) cellQuestionNumberList.push('영역7SUM');
  if (i === survey06NMS_sectionList[8].lastQuestionNumber) cellQuestionNumberList.push('영역8SUM');
  if (i === survey06NMS_sectionList[9].lastQuestionNumber) cellQuestionNumberList.push('영역9SUM');
}
export const survey06NMS_cellQuestionNumberList = [...cellQuestionNumberList];
