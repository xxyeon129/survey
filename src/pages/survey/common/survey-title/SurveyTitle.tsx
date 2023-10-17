import styles from './surveyTitle.module.scss';

interface SurveyTitleProps {
  title: string;
  subTitle?: string;
  explain?: string;
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
      <div className={styles.explain}>{props.explain}</div>
    </article>
  );
}
