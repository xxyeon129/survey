import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import AnswerList from '../answerList/AnswerList';
import styles from 'pages/survey/common/survey.module.scss';
import contentStyles from './surveyContent.module.scss';

type ImageSelectAnswerListType = { key: number; imgSrc: string; explain: string; alt: string }[];

interface SurveyContentWithShortAnswersProps {
  question: SurveyContentObjectType;

  imageSelectAnswersNo?: number;
  imageSelectAnswersList?: ImageSelectAnswerListType;
}

export default function SurveyContentWithShortAnswers(props: SurveyContentWithShortAnswersProps) {
  return (
    <li className={contentStyles['questions-li']}>
      <hr className={styles.hr} />

      <header className={contentStyles['questions-title']}>
        <h4>
          {props.question.No}. {props.question.Q}
        </h4>
        {props.question.EXPLAIN && (
          <span className={contentStyles['question-title-explain']}>
            <strong>* </strong>
            {props.question.EXPLAIN}
          </span>
        )}
      </header>

      <ul className={contentStyles['answers-ul']}>
        {props.question.A &&
          props.question.A.map((answer) => (
            <AnswerList
              answer={answer}
              inputName={`${props.question.No}`}
              inputId={`${props.question.No}${answer}`}
              key={`${props.question.No}${answer}`}
            />
          ))}
      </ul>

      {props.imageSelectAnswersNo &&
        props.question.No === props.imageSelectAnswersNo &&
        props.imageSelectAnswersList && (
          <ImageSelectAnswers imageSelectAnswersList={props.imageSelectAnswersList} />
        )}
    </li>
  );
}

interface ImageSelectAnswersProps {
  imageSelectAnswersList: ImageSelectAnswerListType;
}

function ImageSelectAnswers({ imageSelectAnswersList }: ImageSelectAnswersProps) {
  return (
    <ul className={contentStyles['img-answers-ul']}>
      {imageSelectAnswersList.map((imageList) => (
        <li className={contentStyles['img-answer-li']} key={imageList.key}>
          <input type="radio" id={`img-answer-${imageList.key}`} name="img-answer" />
          <label htmlFor={`img-answer-${imageList.key}`}>
            <figure>
              <img
                className={contentStyles['img-answer-img']}
                src={imageList.imgSrc}
                alt={imageList.alt}
              />
              <figcaption>{imageList.explain}</figcaption>
            </figure>
            <div className={contentStyles['radio-button']}>
              <div className={contentStyles['radio-button-checked-circle']} />
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
}
