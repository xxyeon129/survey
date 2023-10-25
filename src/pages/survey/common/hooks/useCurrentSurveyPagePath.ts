import { useLocation } from 'react-router-dom';

// for pagination
export default function useCurrentSurveyPagePath() {
  const location = useLocation();
  const currentSurveyPath = +location.pathname.slice(8);

  return currentSurveyPath;
}
