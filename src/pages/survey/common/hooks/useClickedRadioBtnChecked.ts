import { RecoilState, useRecoilState, useSetRecoilState } from 'recoil';
import { responseState } from '../states/surveyResponse.state';
import { HAVE_NO_FG_SYMPTOM } from 'pages/survey/survey-02-FG/survey.const';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
import { RespondedCheckObjectStateType } from '../types/respondedCheckObjectState.types';

interface ClickedRadioBtnCheckedProps {
  surveyStateKeyword: string;
  clickedQuestionNumber: string;

  // for show not-responded question "!" icon, not-responded question number message
  respondedCheckObject: RecoilState<RespondedCheckObjectStateType>;

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

  // for hide question right not-responded "!" icon when checked
  const setRespondedCheckObject = useSetRecoilState(props.respondedCheckObject);

  const handleRadioBtnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectValue = e.target.value;
    setResponseValue(selectValue);

    // for survey-01-UPDRS setting header current page 1
    props.isUPDRSPreQuestion && setHeaderCurrentPage(1);

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
