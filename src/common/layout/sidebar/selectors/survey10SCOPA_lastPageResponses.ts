import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  SURVEY_10_SCOPA_FEMALE_LAST_PAGE_QUESTION_NUMBER_LIST,
  SURVEY_10_SCOPA_MALE_LAST_PAGE_QUESTION_NUMBER_LIST,
  SURVEY_10_SCOPA_STATE_KEYWORD,
} from 'pages/survey/survey-10-SCOPA/survey.const';
import { personalInfoGenderState } from 'pages/survey/personalInfo/personalInfo.state';
import { FEMALE } from 'pages/survey/personalInfo/components/rightSection/genderCheck/genderCheckSection.const';

export const survey10SCOPA_lastPageResponses = selector({
  key: 'survey10SCOPA_lastPageResponses',
  get: ({ get }) => {
    const lastPageResponseList = [];

    const selectedGender = get(personalInfoGenderState);

    let questionNumberList = SURVEY_10_SCOPA_MALE_LAST_PAGE_QUESTION_NUMBER_LIST;

    if (selectedGender === FEMALE) {
      questionNumberList = SURVEY_10_SCOPA_FEMALE_LAST_PAGE_QUESTION_NUMBER_LIST;
    }

    for (
      let questionNumberIndex = 0;
      questionNumberIndex < questionNumberList.length;
      questionNumberIndex++
    ) {
      const localStorageState = get(
        responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-${questionNumberList[questionNumberIndex]}`)
      );
      lastPageResponseList.push(localStorageState);
    }

    return lastPageResponseList;
  },
});
