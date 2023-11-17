import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH_URL } from '../common/constants/path.const';
import Layout from 'common/layout/Layout';
// pages
// import LoginPage from 'pages/login/LoginPage';
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
import EndPage from 'pages/end/EndPage';
import RedirectionForUploadFile from 'pages/main/upload-excel-file-redirect/RedirectionForUploadFile';
// import PreventRootNavigation from './PreventRootNavigation';
import NotFound from 'pages/error/NotFound';
import Test from 'pages/test/Test';
import RedirectionForResetResponseState from 'pages/main/reset-response-state-redirect/RedirectionForResetResponseState';

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<PreventRootNavigation />}>
            <Route index element={<LoginPage />} />
          </Route> */}
          <Route path="/" element={<SelectHomePage />} />
          <Route path={PATH_URL.MAIN} element={<MainPage />} />
          <Route path={PATH_URL.PERSONAL} element={<PersonalInfo />} />
          <Route path={PATH_URL.SURVEY['01_UPDRS']} element={<Survey01UPDRS />} />
          <Route path={PATH_URL.SURVEY['02_FG']} element={<Survey02FG />} />
          <Route path={PATH_URL.SURVEY['03_BAI']} element={<Survey03BAI />} />
          <Route path={PATH_URL.SURVEY['04_BDI']} element={<Survey04BDI />} />
          <Route path={PATH_URL.SURVEY['05_RBD']} element={<Survey05RBD />} />
          <Route path={PATH_URL.SURVEY['06_NMS']} element={<Survey06NMS />} />
          <Route path={PATH_URL.SURVEY['07_PDQ']} element={<Survey07PDQ />} />
          <Route path={PATH_URL.SURVEY['08_PDSS']} element={<Survey08PDSS />} />
          <Route path={PATH_URL.SURVEY['09_TIRED']} element={<Survey09Tired />} />
          <Route path={PATH_URL.SURVEY['10_SCOPA']} element={<Survey10SCOPA />} />
          <Route path={PATH_URL.SURVEY['11_CONSTIPATION']} element={<Survey11Constipation />} />
          <Route path={PATH_URL.SURVEY['12_FOOD']} element={<Survey12Food />} />
          <Route path={PATH_URL.END} element={<EndPage />} />
          <Route path={PATH_URL.REDIRECT} element={<RedirectionForUploadFile />} />
          <Route path={PATH_URL.RESET} element={<RedirectionForResetResponseState />} />
          <Route path={PATH_URL.TEST} element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
