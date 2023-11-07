import { useRecoilState } from 'recoil';
import { responseState } from '../states/surveyResponse.state';
import { HAVE_NO_FG_SYMPTOM } from 'pages/survey/survey-02-FG/survey.const';

interface ClickedRadioBtnCheckedProps {
  surveyStateKeyword: string;
  clickedQuestionNumber: string;

  // for survey-02-FG route to next survey
  routeToNextSurvey?: () => void;
}

export default function useClickedRadioBtnChecked(props: ClickedRadioBtnCheckedProps) {
  const [responseValue, setResponseValue] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.clickedQuestionNumber}`)
  );

  const handleRadioBtnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectValue = e.target.value;
    setResponseValue(selectValue);

    // for survey-02-FG route to next survey
    if (props.routeToNextSurvey && selectValue === HAVE_NO_FG_SYMPTOM) {
      props.routeToNextSurvey();
    }
  };

  return { responseValue, handleRadioBtnChange };
}
