import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Redirection01UPDRS from './components/Redirection01UPDRS';
import useUploadedPersonalInfo from './hooks/useUploadedPersonalInfo';
import RedirectionLoadingSpinner from '../components/loading-spinner/RedirectionLoadindSpinner';
import { PATH_URL } from 'common/constants/path.const';
import Redirection02FG from './components/Redirection02FG';
import Redirection03BAI from './components/Redirection03BAI';
import Redirection04BDI from './components/Redirection04BDI';
import Redirection05RBD from './components/Redirection05RBD';
import Redirection07PDQ from './components/Redirection07PDQ';
import Redirection08PDSS from './components/Redirection08PDSS';
import Redirection09Tired from './components/Redirection09Tired';
import Redirection11Constipation from './components/Redirection11Constipation';
import Redirection12Food from './components/Redirection12Food';

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
      <Redirection04BDI />
      <Redirection05RBD />
      <Redirection07PDQ />
      <Redirection08PDSS />
      <Redirection09Tired />
      <Redirection11Constipation />
      <Redirection12Food />
      {/* 
      <Redirection06NMS />
      <Redirection10SCOPA />
       */}
    </>
  );
}
