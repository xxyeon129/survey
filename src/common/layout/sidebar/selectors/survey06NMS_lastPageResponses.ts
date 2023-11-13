import { selector } from 'recoil';
import { totalScoreState } from 'pages/survey/survey-06-NMS/survey06NMS.state';

export const survey06NMS_lastPageResponses = selector({
  key: 'survey06NMS_lastPageResponses',
  get: ({ get }) => {
    const totalScore = get(totalScoreState);
    const lastPageResponseList = [];

    totalScore === '-' ? lastPageResponseList.push('') : lastPageResponseList.push(totalScore);

    return lastPageResponseList;
  },
});
