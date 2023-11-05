import { useRecoilState, useRecoilValue } from 'recoil';
import { sectionScoreState, totalScoreState } from '../survey06NMS.state';

export default function useGetTotalScore() {
  const [totalScore, setTotalScore] = useRecoilState(totalScoreState);

  const section1Score = useRecoilValue(sectionScoreState('section1'));
  const section2Score = useRecoilValue(sectionScoreState('section2'));
  const section3Score = useRecoilValue(sectionScoreState('section3'));
  const section4Score = useRecoilValue(sectionScoreState('section4'));
  const section5Score = useRecoilValue(sectionScoreState('section5'));
  const section6Score = useRecoilValue(sectionScoreState('section6'));
  const section7Score = useRecoilValue(sectionScoreState('section7'));
  const section8Score = useRecoilValue(sectionScoreState('section8'));
  const section9Score = useRecoilValue(sectionScoreState('section9'));

  const sectionScoreList = [
    section1Score,
    section2Score,
    section3Score,
    section4Score,
    section5Score,
    section6Score,
    section7Score,
    section8Score,
    section9Score,
  ];

  if (!sectionScoreList.includes('-')) {
    const sectionScoreSum = sectionScoreList.reduce((acc, cur) => acc + cur, 0);
    setTotalScore(sectionScoreSum);
  }

  return totalScore;
}
