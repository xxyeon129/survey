import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from './loginState';
import { PATH_URL } from 'common/constants/path.const';
import useInput from 'common/hooks/useInput';

export default function LoginPage() {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(loginState);
  const { inputData: id, inputChangeHandler: idChangeHandler } = useInput();
  const { inputData: password, inputChangeHandler: passwordChangeHandler } = useInput();

  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isSavedID = id === import.meta.env.VITE_LOGIN_ID;
    const isSavedPW = password === import.meta.env.VITE_LOGIN_PW;
    const isSavedAccount = isSavedID && isSavedPW;

    if (isSavedAccount) {
      setIsLogin(true);
      navigate(PATH_URL.MAIN);
    }
  };

  return (
    <article onSubmit={loginHandler}>
      <form>
        <input type="text" value={id} onChange={idChangeHandler} />
        <input type="password" value={password} onChange={passwordChangeHandler} />
        <button type="submit">로그인</button>
      </form>
    </article>
  );
}
