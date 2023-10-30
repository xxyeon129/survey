import useSelectBirthdayList from './hook/useSelectBirthdayList';
import SelectDropdown from './component/SelectDropdown';
import styles from './selectBirthdaySection.module.scss';

export default function SelectBirthdaySection() {
  const selectBirthdayList = useSelectBirthdayList();

  return (
    <section>
      <label>생년월일</label>
      <div className={styles['birthday-select-dropdown-container']}>
        {selectBirthdayList.map((listOption) => (
          <SelectDropdown
            key={listOption.id}
            dropdownOptions={listOption.dropdownOptions}
            selectBarDefaultText={listOption.selectBarDefaultText}
            selectedOption={listOption.selectedOption}
            setSelectedOption={listOption.setSelectedOption}
            additionalText={listOption.additionalText}
          />
        ))}
      </div>
    </section>
  );
}
