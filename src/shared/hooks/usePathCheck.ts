import { useLocation } from 'react-router-dom';
import { PATH_URL } from 'shared/constants/path.const';

// for non-survey page
// sidebar, header right content, header progress bar display
export default function usePathCheck() {
  const location = useLocation();
  const normalPaths = [...Object.values(PATH_URL), ...Object.values(PATH_URL.SURVEY)];
  const isSurveyPage = normalPaths.includes(location.pathname);

  return isSurveyPage;
}
