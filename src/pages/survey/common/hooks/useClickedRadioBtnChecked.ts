import { useRecoilState } from 'recoil';
import { responseState } from '../states/surveyResponse.state';

interface ClickedRadioBtnCheckedProps {
  surveyStateKeyword: string;
  clickedQuestionNumber: string;
}

export default function useClickedRadioBtnChecked(props: ClickedRadioBtnCheckedProps) {
  const [responseValue, setResponseValue] = useRecoilState(
    responseState(`${props.surveyStateKeyword}-${props.clickedQuestionNumber}`)
  );

  const handleRadioBtnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectValue = e.target.value;
    setResponseValue(selectValue);
  };

  return { responseValue, handleRadioBtnChange };
}
