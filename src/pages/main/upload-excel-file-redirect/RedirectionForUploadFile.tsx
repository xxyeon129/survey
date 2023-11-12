import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from 'common/constants/path.const';
import Redirection01UPDRS from './components/Redirection01UPDRS';
import useUploadedPersonalInfo from './hooks/useUploadedPersonalInfo';
import Redirection02FG from './components/Redirection02FG';
import Redirection04BDI from './components/Redirection04BDI';
import Redirection05RBD from './components/Redirection05RBD';
import Redirection10SCOPA from './components/Redirection10SCOPA';
import Redirection11Constipation from './components/Redirection11Constipation';
import Redirection06NMS from './components/Redirection06NMS';

export default function RedirectionForUploadFile() {
  // personal info
  const { nameData, birthData, genderData, setSelectedName, setSelectedBirth, setSeclectedGender } =
    useUploadedPersonalInfo();

  useEffect(() => {
    nameData.length > 0 && setSelectedName(nameData);
    birthData.length > 0 && setSelectedBirth(birthData);
    genderData.length > 0 && setSeclectedGender(genderData);
  }, [nameData, birthData, genderData]);

  const navigate = useNavigate();

  // setTimeout(() => {
  //   navigate(PATH_URL.SURVEY['01_UPDRS']);
  // }, 2000);

  return (
    <>
      {/* TO DO : spinner */}
      <Redirection01UPDRS />
      <Redirection02FG />
      <Redirection04BDI />
      <Redirection06NMS />
      <Redirection05RBD />
      <Redirection10SCOPA />
      <Redirection11Constipation />
    </>
  );
}
