import { RecoilState, useRecoilState, useSetRecoilState } from 'recoil';
import { responseState } from '../states/surveyResponse.state';
import { HAVE_NO_FG_SYMPTOM } from 'pages/survey/survey-02-FG/survey.const';
import { RespondedCheckObjectStateType } from '../types/respondedCheckObjectState.types';

interface ClickedRadioBtnCheckedProps {
  surveyStateKeyword: string;
  clickedQuestionNumber: string;

  // for show not-responded question "!" icon, not-responded question number message
  respondedCheckObject: RecoilState<RespondedCheckObjectStateType>;

  // for survey-02-FG route to next survey
  routeToNextSurvey?: () => void;
}

export default function useClickedRadioBtnChecked(props: ClickedRadioBtnCheckedProps) {
  const [responseValue, setResponseValue] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.clickedQuestionNumber}`)
  );

  // for hide question right not-responded "!" icon when checked
  const setRespondedCheckObject = useSetRecoilState(props.respondedCheckObject);

  const handleRadioBtnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectValue = e.target.value;
    setResponseValue(selectValue);

    // for survey-02-FG route to next survey
    if (props.routeToNextSurvey && selectValue === HAVE_NO_FG_SYMPTOM) {
      props.routeToNextSurvey();
    }

    // for hide question right not-responded "!" icon when checked
    setRespondedCheckObject((prev: RespondedCheckObjectStateType) => {
      let objectKey = props.clickedQuestionNumber;
      if (props.clickedQuestionNumber === 'pre') {
        objectKey = '0';
      }

      return { ...prev, [objectKey]: false };
    });
  };

  return { responseValue, handleRadioBtnChange };
}
