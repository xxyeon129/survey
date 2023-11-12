import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  SCOPA_QUESTIONS,
  SCOPA_QUESTIONS_FEMALE,
  SCOPA_QUESTIONS_MALE,
  SCOPA_QUESTIONS_WITH_INPUT,
  SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST,
  SURVEY_10_SCOPA_STATE_KEYWORD,
} from 'pages/survey/survey-10-SCOPA/survey.const';
import { personalInfoGenderState } from 'pages/survey/personalInfo/personalInfo.state';
import {
  FEMALE,
  MALE,
} from 'pages/survey/personalInfo/components/rightSection/genderCheck/genderCheckSection.const';

export const survey10SCOPA_excelData = selector({
  key: 'survey10SCOPA_excelData',
  get: ({ get }) => {
    const selectedGender = get(personalInfoGenderState);
    const responseList = [];

    for (let i = 1; i <= SCOPA_QUESTIONS.length; i++) {
      const genderQuestions = i > 22;
      const responseValue: string = get(responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${i}`));

      if (!genderQuestions) {
        responseList.push({
          문항번호: `${i}`,
          질문내용: SCOPA_QUESTIONS[i - 1].Q,
          응답내용: responseValue,
        });
      } else if (genderQuestions) {
        if (i === 22) {
          if (selectedGender === FEMALE) {
            responseList.push({
              문항번호: `${i}`,
              질문내용: SCOPA_QUESTIONS_FEMALE[0].Q,
              응답내용: responseValue,
            });
          }
          if (selectedGender === MALE) {
            responseList.push({
              문항번호: `${i}`,
              질문내용: SCOPA_QUESTIONS_MALE[0].Q,
              응답내용: responseValue,
            });
          }
        } else if (i === 23) {
          if (selectedGender === FEMALE) {
            responseList.push({
              문항번호: `${i}`,
              질문내용: SCOPA_QUESTIONS_FEMALE[1].Q,
              응답내용: responseValue,
            });
          }
          if (selectedGender === MALE) {
            responseList.push({
              문항번호: `${i}`,
              질문내용: SCOPA_QUESTIONS_MALE[1].Q,
              응답내용: responseValue,
            });
          }
        }
      }

      if (i === SCOPA_QUESTIONS.length) {
        for (let j = 0; j < SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST.length; j++) {
          const inputCheckResponseValue: string = get(
            responseState(
              `${SURVEY_10_SCOPA_STATE_KEYWORD}-${i}-${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[j]}`
            )
          );
          const inputTextResponseValue: string = get(
            responseState(
              `${SURVEY_10_SCOPA_STATE_KEYWORD}-${i}-${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[j]}-medicineName`
            )
          );

          responseList.push({
            문항번호: `${i}`,
            질문내용: `${SCOPA_QUESTIONS_WITH_INPUT.Q}-${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[j]}`,
            응답내용: inputCheckResponseValue,
          });
          responseList.push({
            문항번호: `${i}`,
            질문내용: `${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[j]}-약 이름`,
            응답내용: inputTextResponseValue,
          });
        }
      }
    }

    return responseList;
  },
});
