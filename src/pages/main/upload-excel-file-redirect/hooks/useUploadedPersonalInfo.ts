import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import useSelectBirthdayList from 'pages/survey/personalInfo/components/rightSection/selectBirthday/hook/useSelectBirthdayList';
import {
  personalInfoBirthdayState,
  personalInfoGenderState,
  personalInfoNameState,
} from 'pages/survey/personalInfo/personalInfo.state';
import { uploadedResponseStates } from 'pages/test/uploadedResponseDataStates/uploadedResponseData.state';

export default function useUploadedPersonalInfo() {
  const personalInfo_excelFileRawData = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[0].TITLE)
  );
  // set data from uploaded raw data file
  const [nameData, setNameData] = useState('');
  const [birthData, setBirthData] = useState('');
  const [genderData, setGenderData] = useState('');

  // set localStorage state
  const setSelectedName = useSetRecoilState(personalInfoNameState);
  const setSelectedBirth = useSetRecoilState(personalInfoBirthdayState);
  const setSeclectedGender = useSetRecoilState(personalInfoGenderState);

  // for display uploaded data in select UI
  const { setSelectedYear, setSelectedMonth, setSelectedDay } = useSelectBirthdayList();

  useEffect(() => {
    // get data from uploaded raw data file
    if (personalInfo_excelFileRawData.length > 0) {
      const personalInfo_excelFileDataObject = personalInfo_excelFileRawData[0];
      console.log(personalInfo_excelFileDataObject);

      setNameData(personalInfo_excelFileDataObject.성명);
      setBirthData(personalInfo_excelFileDataObject.생년월일);
      setGenderData(personalInfo_excelFileDataObject.성별);

      // for display uploaded data in select UI
      const uploadedBirthDataList = birthData.split('.');
      const uploadedBirthYear = uploadedBirthDataList[0];
      setSelectedYear(uploadedBirthYear);
      const uploadedBirthMonth = uploadedBirthDataList[1];
      setSelectedMonth(uploadedBirthMonth);
      const uploadedBirthDay = uploadedBirthDataList[2];
      setSelectedDay(uploadedBirthDay);
    }
  }, []);

  return { nameData, birthData, genderData, setSelectedName, setSelectedBirth, setSeclectedGender };
}
