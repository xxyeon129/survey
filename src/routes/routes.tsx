import { createBrowserRouter } from 'react-router-dom';
import { PATH_URL } from 'common/constants/path.const';
// pages
import SelectHomePage from 'pages/select-home/SelectHomePage';
import MainPage from 'pages/main/MainPage';
import PersonalInfo from 'pages/survey/personalInfo/PersonalInfo';
import Survey01UPDRS from 'pages/survey/survey-01-UPDRS/Survey01UPDRS';
import Survey02FG from 'pages/survey/survey-02-FG/Survey02FG';
import Survey03BAI from 'pages/survey/survey-03-BAI/Survey03BAI';
import Survey04BDI from 'pages/survey/survey-04-BDI/Survey04BDI';
import Survey05RBD from 'pages/survey/survey-05-RBD/Survey05RBD';
import Survey06NMS from 'pages/survey/survey-06-NMS/Survey06NMS';
import Survey07PDQ from 'pages/survey/survey-07-PDQ/Survey07PDQ';
import Survey08PDSS from 'pages/survey/survey-08-PDSS/Survey08PDSS';
import Survey09Tired from 'pages/survey/survey-09-TIRED/Survey09Tired';
import Survey10SCOPA from 'pages/survey/survey-10-SCOPA/Survey10SCOPA';
import Survey11Constipation from 'pages/survey/survey-11-CONSTIPATION/Survey11Constipation';
import Survey12Food from 'pages/survey/survey-12-FOOD/Survey12Food';
import NotFound from 'pages/error/NotFound';
import Test from 'pages/test/Test';
// redirections
import RedirectionForUploadFile from 'pages/main/upload-excel-file-redirect/RedirectionForUploadFile';
import RedirectionForResetResponseState from 'pages/main/components/reset-response-state-redirect/RedirectionForResetResponseState';

// TO DO: MainRouter 대체
const homePagerouter = createBrowserRouter([
  {
    path: '/',
    element: <SelectHomePage />,
  },
  {
    path: PATH_URL.MAIN,
    element: <MainPage />,
  },
  {
    path: PATH_URL.PERSONAL,
    element: <PersonalInfo />,
  },
  {
    path: PATH_URL.SURVEY['01_UPDRS'],
    element: <Survey01UPDRS />,
  },
  {
    path: PATH_URL.SURVEY['02_FG'],
    element: <Survey02FG />,
  },
  {
    path: PATH_URL.SURVEY['03_BAI'],
    element: <Survey03BAI />,
  },
  {
    path: PATH_URL.SURVEY['04_BDI'],
    element: <Survey04BDI />,
  },
  {
    path: PATH_URL.SURVEY['05_RBD'],
    element: <Survey05RBD />,
  },
  {
    path: PATH_URL.SURVEY['06_NMS'],
    element: <Survey06NMS />,
  },
  {
    path: PATH_URL.SURVEY['07_PDQ'],
    element: <Survey07PDQ />,
  },
  {
    path: PATH_URL.SURVEY['08_PDSS'],
    element: <Survey08PDSS />,
  },
  {
    path: PATH_URL.SURVEY['09_TIRED'],
    element: <Survey09Tired />,
  },
  {
    path: PATH_URL.SURVEY['10_SCOPA'],
    element: <Survey10SCOPA />,
  },
  {
    path: PATH_URL.SURVEY['11_CONSTIPATION'],
    element: <Survey11Constipation />,
  },
  {
    path: PATH_URL.SURVEY['12_FOOD'],
    element: <Survey12Food />,
  },
  {
    path: PATH_URL.REDIRECT,
    element: <RedirectionForUploadFile />,
  },
  {
    path: PATH_URL.RESET,
    element: <RedirectionForResetResponseState />,
  },
  {
    path: PATH_URL.TEST,
    element: <Test />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default homePagerouter;
