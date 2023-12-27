import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import useSelectBirthdayList from 'pages/survey/personalInfo/components/rightSection/selectBirthday/hook/useSelectBirthdayList';
import {
  personalInfoBirthdayState,
  personalInfoGenderState,
  personalInfoNameState,
} from 'pages/survey/personalInfo/personalInfo.state';
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';

export default function useUploadedPersonalInfo() {
  const personalInfo_excelFileData = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[0].TITLE)
  );
  // for set data from uploaded raw data file
  const [nameData, setNameData] = useState('');
  const [birthData, setBirthData] = useState('');
  const [genderData, setGenderData] = useState('');

  // localStorage state setting
  const setSelectedName = useSetRecoilState(personalInfoNameState);
  const setSelectedBirth = useSetRecoilState(personalInfoBirthdayState);
  const setSeclectedGender = useSetRecoilState(personalInfoGenderState);

  // for display uploaded data in select UI
  const { setSelectedYear, setSelectedMonth, setSelectedDay } = useSelectBirthdayList();

  useEffect(() => {
    // get data from uploaded raw data file
    if (Object.keys(personalInfo_excelFileData).length > 0) {
      setNameData(personalInfo_excelFileData.name);
      setBirthData(personalInfo_excelFileData.birthday);
      setGenderData(personalInfo_excelFileData.gender);
    }
  }, []);

  // for display uploaded data in select UI
  useEffect(() => {
    if (birthData.length > 0) {
      const uploadedBirthDataList = birthData.split('.');
      const uploadedBirthYear = uploadedBirthDataList[0];
      setSelectedYear(uploadedBirthYear);
      const uploadedBirthMonth = uploadedBirthDataList[1];
      setSelectedMonth(uploadedBirthMonth);
      const uploadedBirthDay = uploadedBirthDataList[2];
      setSelectedDay(uploadedBirthDay);
    }
  }, [birthData]);

  return { nameData, birthData, genderData, setSelectedName, setSelectedBirth, setSeclectedGender };
}
