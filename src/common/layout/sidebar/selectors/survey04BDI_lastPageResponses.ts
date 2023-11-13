import { selector } from 'recoil';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { SURVEY_04_BDI_STATE_KEYWORD } from 'pages/survey/survey-04-BDI/survey.const';

export const survey04BDI_lastPageResponses = selector({
  key: 'survey04BDI_lastPageResponses',
  get: ({ get }) => {
    const lastPageQeustionStartQuestionNumber = 21;
    const responseValue = get(
      responseState(`${SURVEY_04_BDI_STATE_KEYWORD}-${lastPageQeustionStartQuestionNumber}`)
    );
    const lastPageResponseList = [responseValue];

    return lastPageResponseList;
  },
});
