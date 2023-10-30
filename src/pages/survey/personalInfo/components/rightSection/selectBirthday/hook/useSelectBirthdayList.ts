import { useState } from 'react';

// for birthday select dropdown
export default function useSelectBirthdayList() {
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  // year
  const currentYear = new Date().getFullYear();
  const startYear = 1900;
  const yearsArray: number[] = [];
  for (let year = currentYear; year >= startYear; year--) yearsArray.push(year);

  // month
  const monthsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // day
  const daysArray: number[] = [];
  for (let day = 1; day <= 31; day++) daysArray.push(day);

  const selectBirthdayList = [
    {
      id: 1,
      dropdownOptions: yearsArray,
      selectBarDefaultText: '년도 선택',
      selectedOption: selectedYear,
      setSelectedOption: setSelectedYear,
      additionalText: '년',
    },
    {
      id: 2,
      dropdownOptions: monthsArray,
      selectBarDefaultText: '월 선택',
      selectedOption: selectedMonth,
      setSelectedOption: setSelectedMonth,
      additionalText: '월',
    },
    {
      id: 3,
      dropdownOptions: daysArray,
      selectBarDefaultText: '일 선택',
      selectedOption: selectedDay,
      setSelectedOption: setSelectedDay,
      additionalText: '일',
    },
  ];

  return selectBirthdayList;
}
