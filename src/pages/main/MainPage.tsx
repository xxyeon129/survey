import { useNavigate } from 'react-router-dom';
import { routeItems } from './main.const';
import { HOSPITAL_NAME, SURVEY_NAME } from 'common/constants/survey.const';
import { PATH_URL } from 'common/constants/path.const';
import styles from './main.module.scss';

export default function MainPage() {
  const navigate = useNavigate();

  const handleRouteBoxClick = (id: string) => {
    switch (id) {
      case 'CONTINUE': // 작성 내용 이어서 작성
        onClickContinueBox();
        break;
      case 'CREATE': // 새로 작성
        onClickCreateBox();
        break;
      case 'EXCEL': // Excel 파일 첨부 후 이어서 작성
        onClickExcelBox();
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
    navigate(PATH_URL.SURVEY.PERSONAL);
  };

  const onClickExcelBox = () => {
    // TO DO: 엑셀 파일 받아서 설문 페이지 전체 적용, 설문 페이지로 이동
    console.log('Excel 파일 첨부 후 이어서 작성');
  };

  const routeBoxes = routeItems.map((routeList) => (
    <li
      className={styles['route-box']}
      key={routeList.id}
      onClick={() => handleRouteBoxClick(routeList.id)}
    >
      <div className={styles['route-box-content']}>
        <figure className={styles['route-box-icon-wrapper']}>
          <img src={routeList.icon} alt={routeList.alt} />
        </figure>
        <div className={styles['route-box-text-wrapper']}>
          <h3>{routeList.title}</h3>
          <div className={styles['route-box-description']}>{routeList.description}</div>
        </div>
      </div>
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
