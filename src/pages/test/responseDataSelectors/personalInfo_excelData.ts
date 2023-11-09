import {
  personalInfoBirthdayState,
  personalInfoGenderState,
  personalInfoNameState,
} from 'pages/survey/personalInfo/personalInfo.state';
import { selector } from 'recoil';

export const personalInfo_excelData = selector({
  key: 'personalInfo_excelData',
  get: ({ get }) => {
    const name = get(personalInfoNameState);
    const birthday = get(personalInfoBirthdayState);
    const gender = get(personalInfoGenderState);

    const responseList = [
      {
        성명: name,
        생년월일: birthday,
        성별: gender,
      },
    ];
    return responseList;
  },
});
