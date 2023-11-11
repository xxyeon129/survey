import { useEffect } from 'react';
import useUploadedPersonalInfo from './hooks/useUploadedPersonalInfo';

export default function RedirectionForUploadFile() {
  const { nameData, birthData, genderData, setSelectedName, setSelectedBirth, setSeclectedGender } =
    useUploadedPersonalInfo();

  // personal info
  useEffect(() => {
    nameData.length > 0 && setSelectedName(nameData);
    birthData.length > 0 && setSelectedBirth(birthData);
    genderData.length > 0 && setSeclectedGender(genderData);
  }, [nameData, birthData, genderData]);

  return <></>;
}
