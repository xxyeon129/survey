import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Redirection01UPDRS from './components/Redirection01UPDRS';
import useUploadedPersonalInfo from './hooks/useUploadedPersonalInfo';
import RedirectionLoadingSpinner from '../components/loading-spinner/RedirectionLoadindSpinner';
import { PATH_URL } from 'common/constants/path.const';
import Redirection02FG from './components/Redirection02FG';
import Redirection03BAI from './components/Redirection03BAI';

export default function RedirectionForUploadFile() {
  // personal info
  const { nameData, birthData, genderData, setSelectedName, setSelectedBirth, setSeclectedGender } =
    useUploadedPersonalInfo();

  useEffect(() => {
    nameData.length > 0 && setSelectedName(nameData);
    birthData.length > 0 && setSelectedBirth(birthData);
    genderData.length > 0 && setSeclectedGender(genderData);
  }, [nameData, birthData, genderData]);

  // for navigate to not responded page
  const navigate = useNavigate();

  // const isRespondedSurveyList = useCheckSurveyResponded();

  setTimeout(() => {
    // for (let i = 0; i < isRespondedSurveyList.length; i++) {
    //   if (isRespondedSurveyList[i].isNotResponded) {
    //     navigate(isRespondedSurveyList[i].path);
    //     break;
    //   } else {
    //     // TO DO: "모든 항목에 응답하셨습니다" 모달창
    //     navigate(PATH_URL.SURVEY['12_FOOD']);
    //   }
    // }
    navigate(PATH_URL.PERSONAL);
  }, 1000);

  return (
    <>
      <RedirectionLoadingSpinner />
      <Redirection01UPDRS />
      <Redirection02FG />
      <Redirection03BAI />
      {/* 
      <Redirection04BDI />
      <Redirection06NMS />
      <Redirection07PDQ />
      <Redirection08PDSS />
      <Redirection05RBD />
      <Redirection09Tired />
      <Redirection10SCOPA />
      <Redirection11Constipation />
      <Redirection12Food /> */}
    </>
  );
}
