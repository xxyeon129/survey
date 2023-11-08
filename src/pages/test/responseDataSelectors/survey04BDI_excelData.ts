import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { selector } from 'recoil';
import {
  BDI_ADDITIONAL_QUESTIONS_19,
  BDI_QUESTIONS,
  SURVEY_04_BDI_STATE_KEYWORD,
} from 'pages/survey/survey-04-BDI/survey.const';

export const survey04BDI_excelData = selector({
  key: 'survey04BDI_excelData',
  get: ({ get }) => {
    const responseList = [];

    for (let i = 1; i <= BDI_QUESTIONS.length; i++) {
      const responseValue = get(responseState(`${SURVEY_04_BDI_STATE_KEYWORD}-${i}`));

      responseList.push({
        문항번호: `${i}`,
        질문내용: ' ',
        응답내용: responseValue,
      });

      // for additional question
      const additionalQuestionNumber = 19;
      const additionalResponseValue = get(
        responseState(`${SURVEY_04_BDI_STATE_KEYWORD}-${i}-additional`)
      );

      if (i === additionalQuestionNumber) {
        responseList.push({
          문항번호: '19-1',
          질문내용: BDI_ADDITIONAL_QUESTIONS_19.Q,
          응답내용: additionalResponseValue,
        });
      }
    }
    return responseList;
  },
});
