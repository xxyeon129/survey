import { SurveyContentObjectType } from 'pages/survey/common/types/surveyTypes';
import AnswerList from '../answerList/AnswerList';
import styles from 'pages/survey/common/survey.module.scss';
import contentStyles from './surveyContent.module.scss';

type ImageSelectAnswerListType = { key: number; imgSrc: string; explain: string; alt: string }[];

interface SurveyContentWithShortAnswersProps {
  question: SurveyContentObjectType;

  // for survey-10-SCOPA explain text box option, categorized questions, exceptional type question
  explainSectionList?: { questionNumber: number; element: () => JSX.Element; key: number }[];
  categorizedQuestionList?: SurveyContentObjectType[];
  exceptionalTypeQuestion?: {
    No: number;
    Q: string;
    EXPLAIN: string;
    Q_TYPE: string[];
    A: string[];
  };
  // for survey-11-Constipation image select option
  imageSelectAnswersNo?: number;
  imageSelectAnswersList?: ImageSelectAnswerListType;
}

export default function SurveyContentWithShortAnswers(props: SurveyContentWithShortAnswersProps) {
  return (
    <li className={contentStyles['questions-li']}>
      {/* for explain question section text box */}
      {props.explainSectionList &&
        props.explainSectionList.map(
          (explain) =>
            props.question.No === explain.questionNumber && (
              <section className={contentStyles['explain-section']} key={explain.key}>
                <span className={contentStyles['explain-section-asterisk']}>
                  <strong>*</strong>
                </span>
                {explain.element()}
              </section>
            )
        )}

      <hr className={styles.hr} />

      <header className={contentStyles['questions-title']}>
        <h4>
          {props.question.No}. {props.question.Q}
          {/* for additional categorized question (according to specific conditions) */}
          {props.categorizedQuestionList?.map(
            (categorizedQuestion) =>
              props.question.No === categorizedQuestion.No && categorizedQuestion.Q
          )}
          {/* for exceptional type question */}
          {props.question.No === props.exceptionalTypeQuestion?.No &&
            props.exceptionalTypeQuestion.Q}
        </h4>
        {/* for question explain text */}
        {props.question.EXPLAIN && (
          <span className={contentStyles['question-title-explain']}>
            <strong>* </strong>
            {props.question.EXPLAIN}
          </span>
        )}
      </header>

      <ul className={contentStyles['answers-ul']}>
        {props.question.A?.map((answer) => (
          <AnswerList
            answer={answer}
            inputName={`${props.question.No}`}
            inputId={`${props.question.No}${answer}`}
            key={`${props.question.No}${answer}`}
          />
        ))}

        {/* for additional categorized question (according to specific conditions) */}
        {props.categorizedQuestionList?.map(
          (categorizedList) =>
            props.question.No === categorizedList.No &&
            categorizedList.A?.map((categorizedAnswer) => (
              <AnswerList
                answer={categorizedAnswer}
                inputName={`${props.question.No}`}
                inputId={`${props.question.No}${categorizedAnswer}`}
                key={`${props.question.No}${categorizedAnswer}`}
              />
            ))
        )}
      </ul>

      {/* for image select type */}
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
