import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { SURVEY_01_UPDRS_STATE_KEYWORD, TAKE_MEDICINE } from '../survey.const';
import { useEffect } from 'react';
import { SURVEY_02_FG_STATE_KEYWORD } from 'pages/survey/survey-02-FG/survey.const';

interface ResetLocalStorageResponseProps {
  questionList: SurveyContentObjectType[];
  resetTarget: string;
}

export default function Survey01UPDRS_ResetLocalStorageResponse(
  props: ResetLocalStorageResponseProps
) {
  return (
    <>
      {props.resetTarget === TAKE_MEDICINE ? (
        <>
          {props.questionList.map((question) => (
            <ResetTakeMedicineQuestion question={question} />
          ))}
        </>
      ) : (
        <>
          {props.questionList.map((question) => (
            <ResetNotTakeMedicineQuestion question={question} />
          ))}
        </>
      )}
    </>
  );
}

interface ResetQuestionProps {
  question: SurveyContentObjectType;
}

function ResetTakeMedicineQuestion(props: ResetQuestionProps) {
  const resetTakeMedicineResponseSurvey01UPDRS = useResetRecoilState(
    responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${props.question.No}-${TAKE_MEDICINE}`)
  );
  const resetTakeMedicineResponseSurvey02FG = useResetRecoilState(
    responseState(`${SURVEY_02_FG_STATE_KEYWORD}-${props.question.No}-${TAKE_MEDICINE}`)
  );

  const preQuestion = useRecoilValue(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));

  useEffect(() => {
    resetTakeMedicineResponseSurvey01UPDRS();
    resetTakeMedicineResponseSurvey02FG();
  }, [preQuestion]);

  return <></>;
}

function ResetNotTakeMedicineQuestion(props: ResetQuestionProps) {
  const resetResponseSurvey01UPDRS = useResetRecoilState(
    responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-${props.question.No}`)
  );
  const resetResponseSurvey02FG = useResetRecoilState(
    responseState(`${SURVEY_02_FG_STATE_KEYWORD}-${props.question.No}`)
  );

  const preQuestion = useRecoilValue(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));

  useEffect(() => {
    resetResponseSurvey01UPDRS();
    resetResponseSurvey02FG();
  }, [preQuestion]);

  return <></>;
}
