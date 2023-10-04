import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH_URL } from './constants/path.const';
import Layout from 'components/layout/Layout';
// pages
import Main from 'pages/main/Main';
import Test from 'pages/Test';
import PersonalInfo from 'pages/survey/survey-personalInfo/PersonalInfo';
import SurveyUPDRS from 'pages/survey/survey-UPDRS/SurveyUPDRS';
import NotFound from 'pages/error/NotFound';

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path={PATH_URL.PERSONAL} element={<PersonalInfo />} />
          <Route path={PATH_URL.SURVEY.UPDRS} element={<SurveyUPDRS />} />
          <Route path={PATH_URL.TEST} element={<Test />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
