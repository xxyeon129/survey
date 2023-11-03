import { RecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
import { totalPagesList } from 'common/layout/header/pagination/totalPages.const';
import { useNavigate } from 'react-router-dom';

interface SetPrevSurveyPageProps {
  beforPrevSurveyIndex: number;
  prevSurveyCurrentPageState: RecoilState<number>;
  prevSurveyPath: string;
}

export default function useSetPrevSurveyFirstPage(props: SetPrevSurveyPageProps) {
  const navigate = useNavigate();
  // for header page display
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);
  const beforPrevSurveyPagesList = totalPagesList.slice(0, props.beforPrevSurveyIndex);
  const prevSurveyFirstPage = beforPrevSurveyPagesList.reduce((acc, cur) => acc + cur, 1);
  // for reset prev survey current page state
  const resetPrevSurveyCurrentPageState = useResetRecoilState(props.prevSurveyCurrentPageState);

  const setPrevSurveyFirstPage = () => {
    setHeaderCurrentPage(prevSurveyFirstPage);
    resetPrevSurveyCurrentPageState();
    navigate(props.prevSurveyPath);
  };

  return setPrevSurveyFirstPage;
}
