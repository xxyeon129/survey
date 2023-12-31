import { useLocation } from 'react-router-dom';
import { PATH_URL } from 'common/constants/path.const';

// for non-survey page
// sidebar, header right content, header progress bar display
export default function usePathCheck() {
  const location = useLocation();
  const surveyPaths = [...Object.values(PATH_URL.SURVEY)];

  const isSurveyPage = surveyPaths.includes(location.pathname);

  return isSurveyPage;
}
