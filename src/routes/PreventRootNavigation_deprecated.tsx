/* UNUSED FILE: for login page */

// import { Outlet, useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useRecoilValue } from 'recoil';
// import { loginState } from 'pages/login/loginState';
// import { PATH_URL } from 'common/constants/path.const';

// // for redirect to main page when enter root path(login page) while logged in
// export default function PreventRootNavigation() {
//   const navigate = useNavigate();
//   const isLogin = useRecoilValue(loginState);

//   useEffect(() => {
//     isLogin && navigate(PATH_URL.MAIN);
//   }, [navigate]);

//   return <Outlet />;
// }
