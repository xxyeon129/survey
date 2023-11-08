import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { personalInfoNameState } from 'pages/survey/personalInfo/personalInfo.state';
import { uploadedResponseStates } from 'pages/test/uploadedResponseDataStates/uploadedResponseData.state';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import styles from './nameInputSection.module.scss';

export default function NameInputSection() {
  const [name, setName] = useRecoilState(personalInfoNameState);

  const onChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName(inputValue);
  };

  // for apply uploaded excel file response
  const uploadedExcelFileDataList = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[0].TITLE)
  );

  const uploadedExcelFileData = uploadedExcelFileDataList[0];
  useEffect(() => {
    if (uploadedExcelFileDataList.length > 0) {
      setName(uploadedExcelFileData.성함);
    }
  }, []);

  return (
    <section>
      <label htmlFor="name">성함</label>
      <input
        className={styles['name-input']}
        type="text"
        id="name"
        value={name}
        onChange={onChangeNameInput}
        placeholder="설문 대상 환자의 성함을 입력해주세요."
      />
    </section>
  );
}
