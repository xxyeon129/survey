import { useResetRecoilState } from 'recoil';
import { SURVEY_10_SCOPA_STATE_KEYWORD } from '../survey.const';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';

// for survey-10-SCOPA reset recoil state when change gender
export default function useResetGenderQuestionResponseState() {
  const resetSurvey10SCOPA_genderQuestion22ResponseState = useResetRecoilState(
    responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-22`)
  );
  const resetSurvey10SCOPA_genderQuestion23ResponseState = useResetRecoilState(
    responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-23`)
  );
  const resetSurvey10SCOPA_genderQuestion23aResponseState = useResetRecoilState(
    responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-23a`)
  );
  const resetSurvey10SCOPA_genderQuestion24ResponseState = useResetRecoilState(
    responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-24`)
  );
  const resetSurvey10SCOPA_genderQuestion25ResponseState = useResetRecoilState(
    responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-25`)
  );

  const resetGenderQuestionResponseState = () => {
    resetSurvey10SCOPA_genderQuestion22ResponseState();
    resetSurvey10SCOPA_genderQuestion23ResponseState();
    resetSurvey10SCOPA_genderQuestion23aResponseState();
    resetSurvey10SCOPA_genderQuestion24ResponseState();
    resetSurvey10SCOPA_genderQuestion25ResponseState();
  };

  return resetGenderQuestionResponseState;
}
