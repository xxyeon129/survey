// components
import SelectDropdown from './component/SelectDropdown';
// states
import { useRecoilState, useRecoilValue } from 'recoil';
import { personalInfoBirthdayState } from 'pages/survey/personalInfo/personalInfo.state';
// hooks
import useSelectBirthdayList from './hook/useSelectBirthdayList';
// styles
import styles from './selectBirthdaySection.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import {
  selectedBirthDayState,
  selectedBirthMonthState,
  selectedBirthYearState,
} from './selectBirthdaySection.state';
import { uploadedResponseStates } from 'pages/test/uploadedResponseDataStates/uploadedResponseData.state';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';

export default function SelectBirthdaySection() {
  const [birthday, setBirthday] = useRecoilState(personalInfoBirthdayState);
  const selectedBirthYear = useRecoilValue(selectedBirthYearState);
  const selectedBirthMonth = useRecoilValue(selectedBirthMonthState);
  const selectedBirthDay = useRecoilValue(selectedBirthDayState);

  const { selectBirthdayList, setSelectedYear, setSelectedMonth, setSelectedDay } =
    useSelectBirthdayList();

  useEffect(() => {
    if (selectedBirthYear !== 0 && selectedBirthMonth !== 0 && selectedBirthDay !== 0) {
      setBirthday(`${selectedBirthYear}.${selectedBirthMonth}.${selectedBirthDay}`);
    }
  }, [selectBirthdayList]);

  // for apply uploaded excel file response
  const uploadedExcelFileDataList = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[0].TITLE)
  );
  const uploadedExcelFileData = uploadedExcelFileDataList[0];

  useEffect(() => {
    if (uploadedExcelFileDataList.length > 0 && birthday.length === 0) {
      const uploadedBirthDataList = uploadedExcelFileData.생년월일.split('.');
      const uploadedBirthYear = uploadedBirthDataList[0];
      setSelectedYear(uploadedBirthYear);
      const uploadedBirthMonth = uploadedBirthDataList[1];
      setSelectedMonth(uploadedBirthMonth);
      const uploadedBirthDay = uploadedBirthDataList[2];
      setSelectedDay(uploadedBirthDay);
    }
  }, []);

  return (
    <section>
      <label>생년월일</label>
      <div className={styles['birthday-select-dropdown-container']}>
        {selectBirthdayList.map((listOption) => (
          <SelectDropdown
            dropdownOptions={listOption.dropdownOptions}
            selectBarDefaultText={listOption.selectBarDefaultText}
            selectedOption={listOption.selectedOption}
            setSelectedOption={listOption.setSelectedOption}
            additionalText={listOption.additionalText}
            key={uuidv4()}
          />
        ))}
      </div>
    </section>
  );
}
