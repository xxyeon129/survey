import { useNavigate } from 'react-router-dom';
// states
import { useSetRecoilState } from 'recoil';
import { loginState } from './loginState';
// constants
import { PATH_URL } from 'common/constants/path.const';
// hooks
import useInput from 'common/hooks/useInput';
// styles
import styles from './login.module.scss';
import logo from 'assets/login-personalinfo-page-logo.svg';
import backgroundImg from 'assets/loginpage-background-img.jpeg';
import { totalPagesCount } from 'common/layout/header/pagination/totalPages.const';

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
    <article className={styles['login-page-container']}>
      <section className={styles['top-contents-container']}>
        <article className={styles['top-contents-text-container']}>
          <img src={logo} alt="hospital logo" className={styles.logo} />
          <header>
            <h1>
              <p className={styles['h1-hospital-color-emphasis']}>순천향대학교 병원</p>
              이상운동질환
              <br />
              비운동증상 전자설문
            </h1>
          </header>
          <div className={styles['top-contents-divide-line-container']}>
            <hr className={styles['top-contents-divide-line']} />
            <div className={styles['top-contents-divide-line-circle']} />
          </div>
          <p className={styles['top-contents-explain-text']}>
            총 12 단계, {totalPagesCount} 페이지의 설문으로 이루어진 이상운동질환 비운동증상
            전자설문입니다. <br /> 관련 내용 작성 어쩌고 어쩌고
          </p>
        </article>

        {/* background */}
        <div className={styles['background-overlay']} />
        <img src={backgroundImg} alt="hospital image" className={styles['background-img']} />
      </section>

      <section className={styles['bottom-login-container']}>
        <div className={styles['bottom-login-container-right-blue-box']} />
        <form onSubmit={loginHandler}>
          <article className={styles['bottom-login-input-container']}>
            <p className={styles['bottom-login-explain-text']}>
              아이디와 비밀번호를 입력해주세요. <br />
              아이디와 비밀번호를 모를 경우 담당자에게 문의 바랍니다. <br />
              ex) 담당자 이메일 / 전화번호
            </p>
            <hr className={styles['bottom-login-divide-column-line']} />
            <span className={styles['input-wrapper']}>
              <label>ID</label>
              <input type="text" value={id} onChange={idChangeHandler} />
            </span>
            <hr className={styles['bottom-login-divide-column-line']} />
            <span className={styles['input-wrapper']}>
              <label>Password</label>
              <input type="password" value={password} onChange={passwordChangeHandler} />
            </span>
          </article>
          <button type="submit">설문 시작하기</button>
        </form>
      </section>
    </article>
  );
}
