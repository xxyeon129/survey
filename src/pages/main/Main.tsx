import { HOSPITAL_NAME, SURVEY_TITLE } from 'shared/constants/survey.const';
import styles from './main.module.scss';
import continueIcon from 'assets/mainpage-continue-icon.svg';
import createIcon from 'assets/mainpage-create-icon.svg';
import excelIcon from 'assets/mainpage-excel-icon.svg';

export default function Main() {
  const routeItems = [
    {
      icon: continueIcon,
      title: '작성한 내용 이어서 작성',
      description: '해당 페이지에서 작성하신 내용이 있다면\n이어서 작성해주세요.',
      alt: 'pencil icon',
    },
    {
      icon: createIcon,
      title: '새로 작성',
      description: '설문이 처음이시라면 새로 작성해주세요.',
      alt: 'create file icon',
    },
    {
      icon: excelIcon,
      title: 'Excel 파일 첨부 후 이어서 작성',
      description: '기존 작성 내용이 저장된 엑셀 파일이 있다면\n첨부 후 이어서 작성해주세요.',
      alt: 'excel icon',
    },
  ];

  return (
    <article className={styles['main-container']}>
      <hgroup className={styles['title-container']}>
        <h4>{HOSPITAL_NAME}</h4>
        <h1>{`${SURVEY_TITLE} 전자설문`}</h1>
      </hgroup>
      <ul className={styles['route-container']}>
        {routeItems.map((routeList) => (
          <li className={styles['route-box']}>
            <div className={styles['route-box-content']}>
              <figure className={styles['route-box-icon-container']}>
                <img src={routeList.icon} alt={routeList.alt} />
              </figure>
              <div className={styles['route-box-text-container']}>
                <h3>{routeList.title}</h3>
                <div>{routeList.description}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
