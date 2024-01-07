import { useNavigate } from 'react-router-dom';
// constants
import { PATH_URL } from 'common/constants/path.const';
// hooks
import useExcelFile from 'common/hooks/useExcelFile';
// styles
import excelIcon from 'assets/mainpage-excel-icon.svg';
import styles from 'pages/main/main.module.scss';

export default function UploadExcelFileBox() {
  // TO DO: 작성한 부분까지 페이지 이동, 헤더 현재 페이지 업데이트
  // const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);
  const navigate = useNavigate();
  const { uploadExcelFileHandler, fileRef } = useExcelFile({});

  const onClickExcelBox = async () => {
    await uploadExcelFileHandler();
    // TO DO: 작성한 부분까지 페이지 이동, 헤더 현재 페이지 업데이트
    navigate(PATH_URL.REDIRECT);
  };

  // for responsive UI
  const isTabletMaxWidth = window.innerWidth <= 1280;

  return (
    <li className={styles['route-box']}>
      <input
        type="file"
        accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ref={fileRef}
        id="excel"
        className={styles['excel-input']}
        onChange={onClickExcelBox}
      />
      <label htmlFor="excel" className={styles['route-box-content']}>
        {/* for responsive UI */}
        {isTabletMaxWidth && <div className={styles['responsive-adjust-height']} />}
        {/* */}
        <figure className={styles['route-box-icon-wrapper']}>
          <img src={excelIcon} alt="excel icon" />
        </figure>
        <div className={styles['route-box-text-wrapper']}>
          <h3>Excel 파일 첨부 후 이어서 작성</h3>
          <div className={styles['route-box-description']}>
            기존 작성 내용이 저장된
            <br className={isTabletMaxWidth ? '' : styles['hide-br']} /> 엑셀 파일이 있다면
            <br />
            첨부 후 이어서 작성해주세요.
          </div>
        </div>
      </label>
    </li>
  );
}
