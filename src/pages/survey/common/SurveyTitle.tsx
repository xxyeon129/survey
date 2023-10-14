import styles from './surveyTitle.module.scss';

interface SurveyTitleProps {
  title: string;
  subTitle?: string;
}

export default function SurveyTitle(props: SurveyTitleProps) {
  return (
    <article className={styles['title-container']}>
      <header>
        <div className={styles.circle} />
        <hgroup>
          <h1 className={styles.title}>{props.title}</h1>
          <h3 className={styles['sub-title']}>{props.subTitle}</h3>
        </hgroup>
      </header>
      {/* TO DO: 설명이 있는 설문 종류일 경우 추가, css setting */}
      {/* <p></p> */}
    </article>
  );
}
