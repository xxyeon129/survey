import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
// components
import RedirectionLoadingSpinner from '../loading-spinner/RedirectionLoadindSpinner';
// states
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
import {
  personalInfoBirthdayState,
  personalInfoGenderState,
  personalInfoNameState,
} from 'pages/survey/personalInfo/personalInfo.state';
import {
  selectedBirthDayState,
  selectedBirthMonthState,
  selectedBirthYearState,
} from 'pages/survey/personalInfo/components/rightSection/selectBirthday/selectBirthdaySection.state';
// constants
import { PATH_URL } from 'common/constants/path.const';
import {
  SURVEY_01_UPDRS_STATE_KEYWORD,
  TAKE_MEDICINE,
  UPDRS_QUESTIONS,
  UPDRS_TAKE_MEDICINE_QUESTIONS,
} from 'pages/survey/survey-01-UPDRS/survey.const';
import {
  FG_QUESTIONS,
  FG_TAKE_MEDICINE_QUESTIONS,
  SURVEY_02_FG_STATE_KEYWORD,
} from 'pages/survey/survey-02-FG/survey.const';
import {
  SCOPA_QUESTIONS,
  SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST,
  SURVEY_10_SCOPA_STATE_KEYWORD,
} from 'pages/survey/survey-10-SCOPA/survey.const';
import {
  BDI_QUESTIONS,
  SURVEY_04_BDI_STATE_KEYWORD,
} from 'pages/survey/survey-04-BDI/survey.const';
import {
  NMS_QUESTIONS,
  SURVEY_06_NMS_STATE_KEYWORD,
} from 'pages/survey/survey-06-NMS/survey.const';
import {
  RBD_QUESTIONS,
  SURVEY_05_RBD_STATE_KEYWORD,
} from 'pages/survey/survey-05-RBD/survey.const';
import {
  BAI_QUESTIONS,
  SURVEY_03_BAI_STATE_KEYWORD,
} from 'pages/survey/survey-03-BAI/survey.const';
import {
  PDQ_QUESTIONS,
  SURVEY_07_PDQ_STATE_KEYWORD,
} from 'pages/survey/survey-07-PDQ/survey.const';
import {
  PDSS_QUESTIONS,
  SURVEY_08_PDSS_STATE_KEYWORD,
} from 'pages/survey/survey-08-PDSS/survey.const';
import {
  SURVEY_09_TIRED_STATE_KEYWORD,
  TIRED_QUESTIONS,
} from 'pages/survey/survey-09-TIRED/survey.const';
import {
  CONSTIPATION_QUESTIONS,
  SURVEY_11_CONSTIPATION_STATE_KEYWORD,
} from 'pages/survey/survey-11-CONSTIPATION/survey.const';
import {
  FOOD_QUESTIONS,
  SURVEY_12_FOOD_STATE_KEYWORD,
} from 'pages/survey/survey-12-FOOD/survey.const';
// types
import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';

export default function RedirectionForResetResponseState() {
  const resetPersonalInfoName = useResetRecoilState(personalInfoNameState);
  const resetPersonalInfoBirthday = useResetRecoilState(personalInfoBirthdayState);
  const resetPersonalInfoGender = useResetRecoilState(personalInfoGenderState);
  const resetSelectedBirthYear = useResetRecoilState(selectedBirthYearState);
  const resetSelectedBirthMonth = useResetRecoilState(selectedBirthMonthState);
  const resetSelectedBirthDay = useResetRecoilState(selectedBirthDayState);

  // for survey-01,02 question
  const haveTakeMedicine = useRecoilValue(responseState(`${SURVEY_01_UPDRS_STATE_KEYWORD}-pre`));
  const [questions01UPDRS, setQuestion01UPDRS] = useState(UPDRS_QUESTIONS);
  const [question02FG, setQuestion02FG] = useState(FG_QUESTIONS);

  const question03BAI = BAI_QUESTIONS;
  const question04BDI = BDI_QUESTIONS;
  const question05RBD = RBD_QUESTIONS;
  const question06NMS = NMS_QUESTIONS;
  const question07PDQ = PDQ_QUESTIONS;
  const question08PDSS = PDSS_QUESTIONS;
  const question09Tired = TIRED_QUESTIONS;
  const question10SCOPA = SCOPA_QUESTIONS;
  const question11Constipation = CONSTIPATION_QUESTIONS;
  const question12Food = FOOD_QUESTIONS;

  const navigate = useNavigate();
  useEffect(() => {
    // for survey-01,02 question
    if (haveTakeMedicine === TAKE_MEDICINE) {
      setQuestion01UPDRS(UPDRS_TAKE_MEDICINE_QUESTIONS);
      setQuestion02FG(FG_TAKE_MEDICINE_QUESTIONS);
    }

    resetPersonalInfoName();
    resetPersonalInfoBirthday();
    resetPersonalInfoGender();
    resetSelectedBirthYear();
    resetSelectedBirthMonth();
    resetSelectedBirthDay();

    setTimeout(() => {
      navigate(PATH_URL.PERSONAL);
    }, 1000);
  }, []);

  return (
    <>
      <RedirectionLoadingSpinner />
      <ResetPreQuestion surveyStateKeyword={SURVEY_01_UPDRS_STATE_KEYWORD} />
      <ResetPreQuestion surveyStateKeyword={SURVEY_02_FG_STATE_KEYWORD} />
      <ResetPreQuestion surveyStateKeyword={SURVEY_05_RBD_STATE_KEYWORD} />

      {questions01UPDRS.map((question) => (
        <>
          <ResetQuestion question={question} surveyStateKeyword={SURVEY_01_UPDRS_STATE_KEYWORD} />
          <ResetTakeMedicineQuestion
            question={question}
            surveyStateKeyword={SURVEY_01_UPDRS_STATE_KEYWORD}
          />
        </>
      ))}
      {question02FG.map((question) => (
        <>
          <ResetQuestion question={question} surveyStateKeyword={SURVEY_02_FG_STATE_KEYWORD} />
          <ResetTakeMedicineQuestion
            question={question}
            surveyStateKeyword={SURVEY_02_FG_STATE_KEYWORD}
          />
        </>
      ))}
      {question03BAI.map((question) => (
        <ResetQuestion question={question} surveyStateKeyword={SURVEY_03_BAI_STATE_KEYWORD} />
      ))}
      {question04BDI.map((question) => (
        <ResetQuestion question={question} surveyStateKeyword={SURVEY_04_BDI_STATE_KEYWORD} />
      ))}
      {question05RBD.map((question) => (
        <ResetQuestion question={question} surveyStateKeyword={SURVEY_05_RBD_STATE_KEYWORD} />
      ))}
      {question06NMS.map((question) => (
        <ResetSurvey06NMS question={question} />
      ))}
      {question07PDQ.map((question) => (
        <ResetQuestion question={question} surveyStateKeyword={SURVEY_07_PDQ_STATE_KEYWORD} />
      ))}
      {question08PDSS.map((question) => (
        <ResetQuestion question={question} surveyStateKeyword={SURVEY_08_PDSS_STATE_KEYWORD} />
      ))}
      {question09Tired.map((question) => (
        <ResetQuestion question={question} surveyStateKeyword={SURVEY_09_TIRED_STATE_KEYWORD} />
      ))}
      {question10SCOPA.map((question) => (
        <ResetQuestion question={question} surveyStateKeyword={SURVEY_10_SCOPA_STATE_KEYWORD} />
      ))}
      {question11Constipation.map((question) => (
        <ResetQuestion
          question={question}
          surveyStateKeyword={SURVEY_11_CONSTIPATION_STATE_KEYWORD}
        />
      ))}
      {question12Food.map((question) => (
        <ResetQuestion question={question} surveyStateKeyword={SURVEY_12_FOOD_STATE_KEYWORD} />
      ))}

      <ResetAdditionalQuestion />
    </>
  );
}

interface ResetQuestionProps {
  question: SurveyContentObjectType;
  surveyStateKeyword: string;
}

function ResetQuestion(props: ResetQuestionProps) {
  const resetResponse = useResetRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}`)
  );

  useEffect(() => {
    resetResponse();
  }, []);

  return <></>;
}

function ResetPreQuestion({ surveyStateKeyword }: { surveyStateKeyword: string }) {
  const resetPreQuestionResponse = useResetRecoilState(responseState(`${surveyStateKeyword}-pre`));

  useEffect(() => {
    resetPreQuestionResponse();
  }, []);

  return <></>;
}

function ResetTakeMedicineQuestion(props: ResetQuestionProps) {
  const resetTakeMedicineResponse = useResetRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.question.No}-${TAKE_MEDICINE}`)
  );

  useEffect(() => {
    resetTakeMedicineResponse();
  }, []);

  return <></>;
}

function ResetSurvey06NMS({ question }: { question: SurveyContentObjectType }) {
  const resetFrequencyResponse = useResetRecoilState(
    responseState(`${SURVEY_06_NMS_STATE_KEYWORD}-${question.No}빈도`)
  );
  const resetDegreeResponse = useResetRecoilState(
    responseState(`${SURVEY_06_NMS_STATE_KEYWORD}-${question.No}중증도`)
  );

  useEffect(() => {
    resetFrequencyResponse();
    resetDegreeResponse();
  }, []);
  return <></>;
}

function ResetAdditionalQuestion() {
  // survey-04-BDI
  const resetAdditionalResponse_04BDI = useResetRecoilState(
    responseState(`${SURVEY_04_BDI_STATE_KEYWORD}-19-additional`)
  );

  // survey-10-SCOPA
  const medicineCheckQuestionNumber = 24;
  const resetYesOrNotResponse_list1 = useResetRecoilState(
    responseState(
      `${SURVEY_10_SCOPA_STATE_KEYWORD}-${medicineCheckQuestionNumber}-${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[0]}`
    )
  );
  const resetMedicineNameResponse_list1 = useResetRecoilState(
    responseState(
      `${SURVEY_10_SCOPA_STATE_KEYWORD}-${medicineCheckQuestionNumber}-${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[0]}-medicineName`
    )
  );
  const resetYesOrNotResponse_list2 = useResetRecoilState(
    responseState(
      `${SURVEY_10_SCOPA_STATE_KEYWORD}-${medicineCheckQuestionNumber}-${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[1]}`
    )
  );
  const resetMedicineNameResponse_list2 = useResetRecoilState(
    responseState(
      `${SURVEY_10_SCOPA_STATE_KEYWORD}-${medicineCheckQuestionNumber}-${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[1]}-medicineName`
    )
  );
  const resetYesOrNotResponse_list3 = useResetRecoilState(
    responseState(
      `${SURVEY_10_SCOPA_STATE_KEYWORD}-${medicineCheckQuestionNumber}-${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[2]}`
    )
  );
  const resetMedicineNameResponse_list3 = useResetRecoilState(
    responseState(
      `${SURVEY_10_SCOPA_STATE_KEYWORD}-${medicineCheckQuestionNumber}-${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[2]}-medicineName`
    )
  );
  const resetYesOrNotResponse_list4 = useResetRecoilState(
    responseState(
      `${SURVEY_10_SCOPA_STATE_KEYWORD}-${medicineCheckQuestionNumber}-${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[3]}`
    )
  );
  const resetMedicineNameResponse_list4 = useResetRecoilState(
    responseState(
      `${SURVEY_10_SCOPA_STATE_KEYWORD}-${medicineCheckQuestionNumber}-${SCOPA_QUESTIONS_WITH_INPUT_TITLE_LIST[3]}-medicineName`
    )
  );

  useEffect(() => {
    // survey-04-BDI
    resetAdditionalResponse_04BDI();
    // survey-10-SCOPA
    resetYesOrNotResponse_list1();
    resetYesOrNotResponse_list2();
    resetYesOrNotResponse_list3();
    resetYesOrNotResponse_list4();
    resetMedicineNameResponse_list1();
    resetMedicineNameResponse_list2();
    resetMedicineNameResponse_list3();
    resetMedicineNameResponse_list4();
  }, []);

  return <></>;
}
