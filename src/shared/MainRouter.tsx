import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH_URL } from './constants/path.const';
import Layout from 'components/layout/Layout';
// pages
import Main from 'pages/main/Main';
import Test from 'pages/Test';
import NotFound from 'pages/error/NotFound';
import PersonalInfo from 'pages/survey/survey-00-personalInfo/PersonalInfo';
import Survey01BDI from 'pages/survey/survey-01-BDI/Survey01BDI';
import Survey02RBD from 'pages/survey/survey-02-RBD/Survey02RBD';
import Survey03SCOPA from 'pages/survey/survey-03-SCOPA/Survey03SCOPA';
import Survey04UPDRS from 'pages/survey/survey-TEST/Survey04UPDRS';
import Survey05FG from 'pages/survey/survey-TEST/Survey05FG';

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path={PATH_URL.SURVEY.PERSONAL} element={<PersonalInfo />} />
          <Route path={PATH_URL.SURVEY['01_BDI']} element={<Survey01BDI />} />
          <Route path={PATH_URL.SURVEY['02_RBD']} element={<Survey02RBD />} />
          <Route path={PATH_URL.SURVEY['03_SCOPA']} element={<Survey03SCOPA />} />
          <Route path={PATH_URL.SURVEY['04_UPDRS']} element={<Survey04UPDRS />} />
          <Route path={PATH_URL.SURVEY['05_FG']} element={<Survey05FG />} />
          <Route path={PATH_URL.TEST} element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
