/* UNUSED FILE: for login page */

// import { useNavigate } from 'react-router-dom';
// // states
// import { useSetRecoilState } from 'recoil';
// import { loginState } from './loginState';
// // constants
// import { PATH_URL } from 'common/constants/path.const';
// // hooks
// import useInput from 'common/hooks/useInput';
// // styles
// import styles from './login.module.scss';
// import logo from 'assets/login-personalinfo-page-logo.svg';
// import backgroundImg from 'assets/loginpage-background-img.jpeg';
// import { totalPagesCount } from 'common/layout/header/pagination/totalPages.const';

// export default function LoginPage() {
//   const navigate = useNavigate();

//   const setIsLogin = useSetRecoilState(loginState);
//   const { inputData: id, inputChangeHandler: idChangeHandler } = useInput();
//   const { inputData: password, inputChangeHandler: passwordChangeHandler } = useInput();

//   const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const isSavedID = id === import.meta.env.VITE_LOGIN_ID;
//     const isSavedPW = password === import.meta.env.VITE_LOGIN_PW;
//     const isSavedAccount = isSavedID && isSavedPW;

//     if (isSavedAccount) {
//       setIsLogin(true);
//       navigate(PATH_URL.MAIN);
//     }
//   };

//   return (
//     <article className={styles['login-page-container']}>
//       <section className={styles['top-contents-container']}>
//         <article className={styles['top-contents-text-container']}>
//           <img src={logo} alt="hospital logo" className={styles.logo} />
//           <header>
//             <h1>
//               <p className={styles['h1-hospital-color-emphasis']}>순천향대학교 병원</p>
//               이상운동질환
//               <br />
//               비운동증상 전자설문
//             </h1>
//           </header>
//           <div className={styles['top-contents-divide-line-container']}>
//             <hr className={styles['top-contents-divide-line']} />
//             <div className={styles['top-contents-divide-line-circle']} />
//           </div>
//           <p className={styles['top-contents-explain-text']}>
//             총 12 단계, {totalPagesCount} 페이지의 설문으로 이루어진 이상운동질환 비운동증상
//             전자설문입니다. <br /> 작성하신 설문 내용은 창을 닫아도 동일한 기기에서는
//             임시저장됩니다.
//             <br />
//             다른 기기에서 이어서 설문을 작성하실 경우 설문 페이지의 우측 상단 메일 전송 버튼을
//             클릭해주세요.
//           </p>
//         </article>

//         {/* background */}
//         <div className={styles['background-overlay']} />
//         <img src={backgroundImg} alt="hospital image" className={styles['background-img']} />
//       </section>

//       <section className={styles['bottom-login-container']}>
//         <div className={styles['bottom-login-container-right-blue-box']} />
//         <form onSubmit={loginHandler}>
//           <article className={styles['bottom-login-input-container']}>
//             <p className={styles['bottom-login-explain-text']}>
//               아이디와 비밀번호를 입력해주세요. <br />
//               아이디와 비밀번호를 모르실 경우 담당자에게 문의해 주시기 바랍니다. <br />
//             </p>
//             <hr className={styles['bottom-login-divide-column-line']} />
//             <span className={styles['input-wrapper']}>
//               <label>ID</label>
//               <input type="text" value={id} onChange={idChangeHandler} />
//             </span>
//             <hr className={styles['bottom-login-divide-column-line']} />
//             <span className={styles['input-wrapper']}>
//               <label>Password</label>
//               <input type="password" value={password} onChange={passwordChangeHandler} />
//             </span>
//           </article>
//           <button type="submit">설문 시작하기</button>
//         </form>
//       </section>
//     </article>
//   );
// }
