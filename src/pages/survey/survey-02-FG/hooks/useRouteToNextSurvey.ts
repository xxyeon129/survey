import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
import { totalPagesList } from 'common/layout/header/pagination/totalPages.const';

interface RouteToNextSurveyProps {
  currentSurveyIndex: number;
  nextSurveyPath: string;
}

export default function useRouteToNextSurvey(props: RouteToNextSurveyProps) {
  const navigate = useNavigate();
  // for header page display
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);
  const prevPagesList = totalPagesList.slice(0, props.currentSurveyIndex);
  const prevPagesCount = prevPagesList.reduce((acc, cur) => acc + cur, 1);

  const routeToNextSurvey = () => {
    setHeaderCurrentPage(prevPagesCount);
    navigate(props.nextSurveyPath);
  };

  return routeToNextSurvey;
}
