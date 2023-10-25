import { RecoilRoot } from 'recoil';
import MainRouter from 'common/MainRouter';
import 'common/scss/reset.scss';

function App() {
  return (
    <RecoilRoot>
      <MainRouter />
    </RecoilRoot>
  );
}

export default App;
