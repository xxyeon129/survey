import { useRecoilState, useSetRecoilState } from 'recoil';
import { responseState } from '../states/surveyResponse.state';
import { HAVE_NO_FG_SYMPTOM } from 'pages/survey/survey-02-FG/survey.const';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';

interface ClickedRadioBtnCheckedProps {
  surveyStateKeyword: string;
  clickedQuestionNumber: string;

  // for survey-01-UPDRS setting header current page 1
  isUPDRSPreQuestion?: boolean;

  // for survey-02-FG route to next survey
  routeToNextSurvey?: () => void;
}

export default function useClickedRadioBtnChecked(props: ClickedRadioBtnCheckedProps) {
  const [responseValue, setResponseValue] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.clickedQuestionNumber}`)
  );
  // for survey-01-UPDRS setting header current page 1
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);

  const handleRadioBtnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectValue = e.target.value;
    setResponseValue(selectValue);

    // for survey-01-UPDRS setting header current page 1
    props.isUPDRSPreQuestion && setHeaderCurrentPage(1);

    // for survey-02-FG route to next survey
    if (props.routeToNextSurvey && selectValue === HAVE_NO_FG_SYMPTOM) {
      props.routeToNextSurvey();
    }
  };

  return { responseValue, handleRadioBtnChange };
}
