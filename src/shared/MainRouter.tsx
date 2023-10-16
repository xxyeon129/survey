import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH_URL } from './constants/path.const';
import Layout from 'components/layout/Layout';
// pages
import Main from 'pages/main/Main';
import Test from 'pages/Test';
import NotFound from 'pages/error/NotFound';
import PersonalInfo from 'pages/survey/survey-00-personalInfo/PersonalInfo';
import Survey01UPDRS from 'pages/survey/survey-01-UPDRS/Survey01UPDRS';
import Survey02FG from 'pages/survey/survey-TEST/Survey02FG';
import Survey03BAI from 'pages/survey/survey-TEST/Survey03BAI';
import Survey04NMS from 'pages/survey/survey-TEST/Survey04NMS';
import Survey05RBD from 'pages/survey/survey-TEST/Survey05RBD';
import Survey06PDQ from 'pages/survey/survey-TEST/Survey06PDQ';
import Survey07PDSS from 'pages/survey/survey-TEST/Survey07PDSS';
import Survey08SCOPA from 'pages/survey/survey-TEST/Survey08SCOPA';
import Survey09NPI from 'pages/survey/survey-TEST/Survey09NPI';
import Survey10FOOD from 'pages/survey/survey-TEST/Survey10FOOD';

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path={PATH_URL.SURVEY.PERSONAL} element={<PersonalInfo />} />
          <Route path={PATH_URL.SURVEY['01_UPDRS']} element={<Survey01UPDRS />} />
          <Route path={PATH_URL.SURVEY['02_FG']} element={<Survey02FG />} />
          <Route path={PATH_URL.SURVEY['03_BAI']} element={<Survey03BAI />} />
          <Route path={PATH_URL.SURVEY['04_NMS']} element={<Survey04NMS />} />
          <Route path={PATH_URL.SURVEY['05_RBD']} element={<Survey05RBD />} />
          <Route path={PATH_URL.SURVEY['06_PDQ']} element={<Survey06PDQ />} />
          <Route path={PATH_URL.SURVEY['07_PDSS']} element={<Survey07PDSS />} />
          <Route path={PATH_URL.SURVEY['08_SCOPA']} element={<Survey08SCOPA />} />
          <Route path={PATH_URL.SURVEY['09_NPI']} element={<Survey09NPI />} />
          <Route path={PATH_URL.SURVEY['10_FOOD']} element={<Survey10FOOD />} />
          <Route path={PATH_URL.TEST} element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
