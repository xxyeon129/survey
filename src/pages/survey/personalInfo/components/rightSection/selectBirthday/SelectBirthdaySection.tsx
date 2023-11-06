// components
import SelectDropdown from './component/SelectDropdown';
// states
import { useRecoilValue, useSetRecoilState } from 'recoil';
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

export default function SelectBirthdaySection() {
  const setBirthday = useSetRecoilState(personalInfoBirthdayState);
  const selectedBirthYear = useRecoilValue(selectedBirthYearState);
  const selectedBirthMonth = useRecoilValue(selectedBirthMonthState);
  const selectedBirthDay = useRecoilValue(selectedBirthDayState);

  const selectBirthdayList = useSelectBirthdayList();

  useEffect(() => {
    if (selectedBirthYear !== 0 && selectedBirthMonth !== 0 && selectedBirthDay !== 0) {
      setBirthday(`${selectedBirthYear}.${selectedBirthMonth}.${selectedBirthDay}`);
    }
  }, [selectBirthdayList]);

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
