import { useRecoilState, useRecoilValue } from 'recoil';
import { questionScoreState, sectionScoreState } from '../survey06NMS.state';

// TO DO: state refactoring, reduce repeat
export default function useGetSectionScore(sectionNumber: number | undefined) {
  const [sectionScore, setSectionScore] = useRecoilState(
    sectionScoreState(`section${sectionNumber}`)
  );

  // section 1
  const question01Score = useRecoilValue(questionScoreState(1));
  const question02Score = useRecoilValue(questionScoreState(2));
  const section1ScoreList = [question01Score, question02Score];
  // section 2
  const question03Score = useRecoilValue(questionScoreState(3));
  const question04Score = useRecoilValue(questionScoreState(4));
  const question05Score = useRecoilValue(questionScoreState(5));
  const question06Score = useRecoilValue(questionScoreState(6));
  const section2ScoreList = [question03Score, question04Score, question05Score, question06Score];
  // section 3
  const question07Score = useRecoilValue(questionScoreState(7));
  const question08Score = useRecoilValue(questionScoreState(8));
  const question09Score = useRecoilValue(questionScoreState(9));
  const question10Score = useRecoilValue(questionScoreState(10));
  const question11Score = useRecoilValue(questionScoreState(11));
  const question12Score = useRecoilValue(questionScoreState(12));
  const section3ScoreList = [
    question07Score,
    question08Score,
    question09Score,
    question10Score,
    question11Score,
    question12Score,
  ];
  // section 4
  const question13Score = useRecoilValue(questionScoreState(13));
  const question14Score = useRecoilValue(questionScoreState(14));
  const question15Score = useRecoilValue(questionScoreState(15));
  const section4ScoreList = [question13Score, question14Score, question15Score];
  // section 5
  const question16Score = useRecoilValue(questionScoreState(16));
  const question17Score = useRecoilValue(questionScoreState(17));
  const question18Score = useRecoilValue(questionScoreState(18));
  const section5ScoreList = [question16Score, question17Score, question18Score];
  // section 6
  const question19Score = useRecoilValue(questionScoreState(19));
  const question20Score = useRecoilValue(questionScoreState(20));
  const question21Score = useRecoilValue(questionScoreState(21));
  const section6ScoreList = [question19Score, question20Score, question21Score];
  // section 7
  const question22Score = useRecoilValue(questionScoreState(22));
  const question23Score = useRecoilValue(questionScoreState(23));
  const question24Score = useRecoilValue(questionScoreState(24));
  const section7ScoreList = [question22Score, question23Score, question24Score];
  // section 8
  const question25Score = useRecoilValue(questionScoreState(25));
  const question26Score = useRecoilValue(questionScoreState(26));
  const section8ScoreList = [question25Score, question26Score];
  // section 9
  const question27Score = useRecoilValue(questionScoreState(27));
  const question28Score = useRecoilValue(questionScoreState(28));
  const question29Score = useRecoilValue(questionScoreState(29));
  const question30Score = useRecoilValue(questionScoreState(30));
  const section9ScoreList = [question27Score, question28Score, question29Score, question30Score];

  const getSectionTotalScore = (scoreList: (string | number)[]) => {
    if (!scoreList.includes('-')) {
      const sectionTotalScore = scoreList.reduce((acc, cur) => +acc + +cur, 0);
      setSectionScore(sectionTotalScore);
    }
  };

  switch (sectionNumber) {
    case 1:
      getSectionTotalScore(section1ScoreList);
      break;
    case 2:
      getSectionTotalScore(section2ScoreList);
      break;
    case 3:
      getSectionTotalScore(section3ScoreList);
      break;
    case 4:
      getSectionTotalScore(section4ScoreList);
      break;
    case 5:
      getSectionTotalScore(section5ScoreList);
      break;
    case 6:
      getSectionTotalScore(section6ScoreList);
      break;
    case 7:
      getSectionTotalScore(section7ScoreList);
      break;
    case 8:
      getSectionTotalScore(section8ScoreList);
      break;
    case 9:
      getSectionTotalScore(section9ScoreList);
      break;
  }

  return sectionScore;
}
