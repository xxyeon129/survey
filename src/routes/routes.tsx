import { createBrowserRouter } from 'react-router-dom';
import SelectHomePage from 'pages/select-home/SelectHomePage';

// TO DO: 모든 경로 연결, MainRouter 대체
const homePagerouter = createBrowserRouter([
  {
    path: '/',
    element: <SelectHomePage />,
  },
]);

export default homePagerouter;
