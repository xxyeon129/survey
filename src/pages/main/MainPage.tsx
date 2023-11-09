import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// states
import { useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from 'common/layout/header/pagination/headerPageState';
// constants
import { MAIN_PAGE_CONTINUE, MAIN_PAGE_CREATE, MAIN_PAGE_EXCEL, routeItems } from './main.const';
import { HOSPITAL_NAME, SURVEY_NAME } from 'common/constants/survey.const';
import { PATH_URL } from 'common/constants/path.const';
// hooks
import useExcelFile from 'common/hooks/useExcelFile';
// styles
import styles from './main.module.scss';

export default function MainPage() {
  const navigate = useNavigate();

  const handleRouteBoxClick = (id: string) => {
    switch (id) {
      case MAIN_PAGE_CONTINUE: // 작성 내용 이어서 작성
        onClickContinueBox();
        break;
      case MAIN_PAGE_CREATE: // 새로 작성
        onClickCreateBox();
        break;
      default:
        break;
    }
  };

  const onClickContinueBox = () => {
    // TO DO: 웹스토리지에 저장된 내용 있는지 확인 -> 있으면 설문 페이지로 이동, 없으면 작성된 내용 없습니다 + 새로 작성하시겠습니까 버튼 팝업창
    console.log('작성 내용 이어서 작성');
  };

  const onClickCreateBox = () => {
    // TO DO: 웹스토리지에 저장된 내용이 있는지 확인 -> 있으면 임시저장된 작성 내용이 있습니다. 초기화하시겠습니까? 이어 작성하기 + 초기화 버튼 팝업창
    navigate(PATH_URL.PERSONAL);
  };

  const routeBoxes = routeItems.map((routeBoxesItem) => (
    <li
      className={styles['route-box']}
      key={uuidv4()}
      onClick={() => handleRouteBoxClick(routeBoxesItem.id)}
    >
      {routeBoxesItem.id === MAIN_PAGE_EXCEL ? (
        <UploadExcelFileBox routeBoxesItem={routeBoxesItem} />
      ) : (
        <div className={styles['route-box-content']}>
          <figure className={styles['route-box-icon-wrapper']}>
            <img src={routeBoxesItem.icon} alt={routeBoxesItem.alt} />
          </figure>
          <div className={styles['route-box-text-wrapper']}>
            <h3>{routeBoxesItem.title}</h3>
            <div className={styles['route-box-description']}>{routeBoxesItem.description}</div>
          </div>
        </div>
      )}
    </li>
  ));

  return (
    <article className={styles['main-container']}>
      <hgroup className={styles['title-container']}>
        <h4>{HOSPITAL_NAME}</h4>
        <h1>{SURVEY_NAME} 전자설문</h1>
      </hgroup>
      <ul className={styles['route-container']}>{routeBoxes}</ul>
    </article>
  );
}

function UploadExcelFileBox({ routeBoxesItem }: { routeBoxesItem: { [key: string]: string } }) {
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);
  const navigate = useNavigate();
  const { uploadExcelFileHandler, fileRef } = useExcelFile();

  const onClickExcelBox = () => {
    uploadExcelFileHandler();
    // TO DO: 작성한 부분까지 페이지 이동
    navigate(PATH_URL.SURVEY['01_UPDRS']);
    setHeaderCurrentPage(1);
  };

  return (
    <>
      <input
        type="file"
        accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ref={fileRef}
        id="excel"
        className={styles['excel-input']}
        onChange={onClickExcelBox}
      />
      <label htmlFor="excel" className={styles['route-box-content']}>
        <figure className={styles['route-box-icon-wrapper']}>
          <img src={routeBoxesItem.icon} alt={routeBoxesItem.alt} />
        </figure>
        <div className={styles['route-box-text-wrapper']}>
          <h3>{routeBoxesItem.title}</h3>
          <div className={styles['route-box-description']}>{routeBoxesItem.description}</div>
        </div>
      </label>
    </>
  );
}
