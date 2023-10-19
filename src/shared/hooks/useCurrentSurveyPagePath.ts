import { useLocation } from 'react-router-dom';

export default function useCurrentSurveyPagePath() {
  const location = useLocation();
  const currentSurveyPath = +location.pathname.slice(8);

  return currentSurveyPath;
}
