// states
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { personalInfoGenderState } from 'pages/survey/personalInfo/personalInfo.state';
import { responseState } from 'pages/survey/common/states/surveyResponse.state';
// constants
import { FEMALE, GENDER, MALE } from './genderCheckSection.const';
import { SURVEY_10_SCOPA_STATE_KEYWORD } from 'pages/survey/survey-10-SCOPA/survey.const';
// styles
import styles from './genderCheckSection.module.scss';
import { useEffect } from 'react';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { uploadedResponseStates } from 'pages/test/uploadedResponseDataStates/uploadedResponseData.state';

interface GenderCheckSection {
  isSurveyPage?: boolean;
}

export default function GenderCheckSection(props: GenderCheckSection) {
  const [selectedGender, setSeclectedGender] = useRecoilState(personalInfoGenderState);

  // for survey-10-SCOPA reset recoil state when change gender
  const resetSurvey10SCOPA_genderQuestion22ResponseState = useResetRecoilState(
    responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-22`)
  );
  const resetSurvey10SCOPA_genderQuestion23ResponseState = useResetRecoilState(
    responseState(`${SURVEY_10_SCOPA_STATE_KEYWORD}-23`)
  );

  const updateGenderState = (selectedGender: string) => {
    setSeclectedGender(selectedGender);

    // for survey-10-SCOPA reset recoil state when change gender
    if (props.isSurveyPage) {
      resetSurvey10SCOPA_genderQuestion22ResponseState();
      resetSurvey10SCOPA_genderQuestion23ResponseState();
    }
  };

  // for apply uploaded excel file response
  const uploadedExcelFileDataList = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[0].TITLE)
  );

  const uploadedExcelFileData = uploadedExcelFileDataList[0];
  useEffect(() => {
    if (uploadedExcelFileDataList.length > 0) {
      setSeclectedGender(uploadedExcelFileData.성별);
    }
  }, []);

  return (
    <section>
      {!props.isSurveyPage && <label>성별</label>}
      <ul className={styles['gender-section-checkbox-container']}>
        <li className={styles['gender-section-checkbox']}>
          <input
            type="radio"
            id={MALE}
            name={GENDER}
            value={MALE}
            checked={selectedGender === MALE}
            onClick={() => updateGenderState(MALE)}
          />
          <label htmlFor={MALE}>
            <div className={styles['radio-button']}>
              <div className={styles['radio-button-checked-circle']} />
            </div>
            {MALE}
          </label>
        </li>
        <li className={styles['gender-section-checkbox']}>
          <input
            type="radio"
            id={FEMALE}
            name={GENDER}
            value={FEMALE}
            checked={selectedGender === FEMALE}
            onClick={() => updateGenderState(FEMALE)}
          />
          <label htmlFor={FEMALE}>
            <div className={styles['radio-button']}>
              <div className={styles['radio-button-checked-circle']} />
            </div>
            {FEMALE}
          </label>
        </li>
      </ul>
    </section>
  );
}
