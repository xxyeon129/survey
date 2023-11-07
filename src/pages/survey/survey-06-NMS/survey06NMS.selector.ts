import { selector } from 'recoil';
import { questionScoreState } from './survey06NMS.state';
import { NMS_QUESTIONS } from './survey.const';

export const survey06NMS_responseSelector = selector({
  key: 'survey06NMS_responseStateSelector',
  get: ({ get }) => {
    const responseList = [];
    for (let i = 1; i <= NMS_QUESTIONS.length; i++) {
      responseList.push(get(questionScoreState(i)));
    }
    return responseList;
  },
});
