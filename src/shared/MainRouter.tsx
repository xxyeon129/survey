import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH_URL } from './constants/path.const';
import Layout from 'components/layout/Layout';
// pages
import Main from 'pages/main/Main';
import Test from 'pages/Test';
import NotFound from 'pages/error/NotFound';
import PersonalInfo from 'pages/survey/survey-00-personalInfo/PersonalInfo';
import Survey01UPDRS from 'pages/survey/survey-01-UPDRS/Survey01UPDRS';
import Survey02FG from 'pages/survey/survey-02-FG/Survey02FG';
import Survey04BDI from 'pages/survey/survey-04-BDI/Survey04BDI';
import Survey05RBD from 'pages/survey/survey-05-RBD/Survey05RBD';
import Survey10SCOPA from 'pages/survey/survey-10-SCOPA/Survey10SCOPA';

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path={PATH_URL.SURVEY.PERSONAL} element={<PersonalInfo />} />
          <Route path={PATH_URL.SURVEY['01_UPDRS']} element={<Survey01UPDRS />} />
          <Route path={PATH_URL.SURVEY['02_FG']} element={<Survey02FG />} />
          {/* <Route path={PATH_URL.SURVEY['03_BAI']} element={} /> */}
          <Route path={PATH_URL.SURVEY['04_BDI']} element={<Survey04BDI />} />
          <Route path={PATH_URL.SURVEY['05_RBD']} element={<Survey05RBD />} />
          {/* <Route path={PATH_URL.SURVEY['06_NMS']} element={} /> */}
          {/* <Route path={PATH_URL.SURVEY['07_PDQ']} element={} /> */}
          {/* <Route path={PATH_URL.SURVEY['08_PDSS']} element={} /> */}
          {/* <Route path={PATH_URL.SURVEY['09_TIRED']} element={} /> */}
          <Route path={PATH_URL.SURVEY['10_SCOPA']} element={<Survey10SCOPA />} />
          {/* <Route path={PATH_URL.SURVEY['11_CONSTIPATION']} element={} /> */}
          {/* <Route path={PATH_URL.SURVEY['12_FOOD']} element={} /> */}
          <Route path={PATH_URL.TEST} element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
