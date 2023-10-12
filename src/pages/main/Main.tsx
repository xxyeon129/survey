import { HOSPITAL_NAME, SURVEY_TITLE } from 'shared/constants/survey.const';
import styles from './main.module.scss';
import { routeItems } from './main.const';

export default function Main() {
  return (
    <article className={styles['main-container']}>
      <hgroup className={styles['title-container']}>
        <h4>{HOSPITAL_NAME}</h4>
        <h1>{`${SURVEY_TITLE} 전자설문`}</h1>
      </hgroup>
      <ul className={styles['route-container']}>
        {routeItems.map((routeList) => (
          <li className={styles['route-box']} key={routeList.id}>
            <div className={styles['route-box-content']}>
              <figure className={styles['route-box-icon-wrapper']}>
                <img src={routeList.icon} alt={routeList.alt} />
              </figure>
              <div className={styles['route-box-text-wrapper']}>
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
