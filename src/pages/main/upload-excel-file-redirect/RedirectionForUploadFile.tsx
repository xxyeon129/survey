import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Redirection01UPDRS from './components/Redirection01UPDRS';
import useUploadedPersonalInfo from './hooks/useUploadedPersonalInfo';
import Redirection02FG from './components/Redirection02FG';
import Redirection04BDI from './components/Redirection04BDI';
import Redirection05RBD from './components/Redirection05RBD';
import Redirection10SCOPA from './components/Redirection10SCOPA';
import Redirection11Constipation from './components/Redirection11Constipation';
import Redirection06NMS from './components/Redirection06NMS';
import Redirection03BAI from './components/Redirection03BAI';
import Redirection07PDQ from './components/Redirection07PDQ';
import Redirection09Tired from './components/Redirection09Tired';
import Redirection12Food from './components/Redirection12Food';
import Redirection08PDSS from './components/Redirection08PDSS';
import useCheckSurveyResponded from '../hooks/useCheckSurveyResponded';
import RedirectionLoadingSpinner from '../components/loading-spinner/RedirectionLoadindSpinner';
import { PATH_URL } from 'common/constants/path.const';

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

  const isRespondedSurveyList = useCheckSurveyResponded();

  setTimeout(() => {
    for (let i = 0; i < isRespondedSurveyList.length; i++) {
      if (isRespondedSurveyList[i].isNotResponded) {
        navigate(isRespondedSurveyList[i].path);
        break;
      } else {
        // TO DO: "모든 항목에 응답하셨습니다" 모달창
        navigate(PATH_URL.SURVEY['12_FOOD']);
      }
    }
  }, 1000);

  return (
    <>
      <RedirectionLoadingSpinner />
      <Redirection01UPDRS />
      <Redirection02FG />
      <Redirection03BAI />
      <Redirection04BDI />
      <Redirection06NMS />
      <Redirection07PDQ />
      <Redirection08PDSS />
      <Redirection05RBD />
      <Redirection09Tired />
      <Redirection10SCOPA />
      <Redirection11Constipation />
      <Redirection12Food />
    </>
  );
}
