import { PATH_URL } from 'common/constants/path.const';
import useCheckRespondedForSidebar from 'common/layout/sidebar/hooks/useCheckRespondedForSidebar';
import { useNavigate } from 'react-router-dom';

export default function useNaviateNotRespondedSurveyPage() {
  const navigate = useNavigate();

  // for navigate continue page
  const {
    notAllowedClick02FG,
    notAllowedClick03BAI,
    notAllowedClick04BDI,
    notAllowedClick05RBD,
    notAllowedClick06NMS,
    notAllowedClick07PDQ,
    notAllowedClick08PDSS,
    notAllowedClick09Tired,
    notAllowedClick10SCOPA,
    notAllowedClick11Constipation,
    notAllowedClick12Food,
  } = useCheckRespondedForSidebar();

  const naviageNotRespondedSurveyPage = () => {
    if (notAllowedClick02FG) {
      navigate(PATH_URL.SURVEY['01_UPDRS']);
    } else if (!notAllowedClick02FG && notAllowedClick03BAI) {
      navigate(PATH_URL.SURVEY['02_FG']);
    } else if (!notAllowedClick03BAI && notAllowedClick04BDI) {
      navigate(PATH_URL.SURVEY['03_BAI']);
    } else if (!notAllowedClick04BDI && notAllowedClick05RBD) {
      navigate(PATH_URL.SURVEY['04_BDI']);
    } else if (!notAllowedClick05RBD && notAllowedClick06NMS) {
      navigate(PATH_URL.SURVEY['05_RBD']);
    } else if (!notAllowedClick06NMS && notAllowedClick07PDQ) {
      navigate(PATH_URL.SURVEY['06_NMS']);
    } else if (!notAllowedClick07PDQ && notAllowedClick08PDSS) {
      navigate(PATH_URL.SURVEY['07_PDQ']);
    } else if (!notAllowedClick08PDSS && notAllowedClick09Tired) {
      navigate(PATH_URL.SURVEY['08_PDSS']);
    } else if (!notAllowedClick09Tired && notAllowedClick10SCOPA) {
      navigate(PATH_URL.SURVEY['09_TIRED']);
    } else if (!notAllowedClick10SCOPA && notAllowedClick11Constipation) {
      navigate(PATH_URL.SURVEY['10_SCOPA']);
    } else if (!notAllowedClick11Constipation && notAllowedClick12Food) {
      navigate(PATH_URL.SURVEY['11_CONSTIPATION']);
    } else {
      navigate(PATH_URL.SURVEY['12_FOOD']);
    }
    return;
  };

  return naviageNotRespondedSurveyPage;
}
