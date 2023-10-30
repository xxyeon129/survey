import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import styles from './selectDropdown.module.scss';

interface SelectDropdownProps {
  dropdownOptions: number[];
  selectBarDefaultText: string;
  selectedOption: number;
  setSelectedOption: React.Dispatch<React.SetStateAction<number>>;
  additionalText: string;
}

export default function SelectDropdown(props: SelectDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // for close dropdown
  const dropdownRef = useRef<HTMLUListElement>(null);
  const onClickOutside = (e: MouseEvent) => {
    if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  const onClickSelectBar = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onClickOption = (option: number) => {
    props.setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isDropdownOpen, dropdownRef.current]);

  return (
    <section className={styles['select-dropdown-container']}>
      <div className={styles['select-bar-container']} onClick={onClickSelectBar}>
        <span className={styles['select-bar-text-wrapper']}>
          <p className={styles['selected-value']}>
            {props.selectedOption !== 0
              ? `${props.selectedOption}${props.additionalText}`
              : props.selectBarDefaultText}
          </p>
        </span>
        {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>

      {isDropdownOpen && (
        <ul className={styles['dropdown-ul']} ref={dropdownRef}>
          {props.dropdownOptions.map((option, index) => (
            <li className={styles['dropdown-li']} key={index} onClick={() => onClickOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
