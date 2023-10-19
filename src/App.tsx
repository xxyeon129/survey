import 'shared/scss/reset.scss';
import MainRouter from 'shared/MainRouter';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <MainRouter />
    </RecoilRoot>
  );
}

export default App;
