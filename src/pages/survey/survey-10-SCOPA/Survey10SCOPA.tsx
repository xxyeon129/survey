// states
import { useSetRecoilState } from 'recoil';
import {
  survey09CurrentPageState,
  survey10CurrentPageState,
  survey11CurrentPageState,
} from '../common/surveyPaginationStates';
// hooks
import usePagination from '../common/hooks/usePagination';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { SCOPA_QUESTIONS, SCOPA_QUESTIONS_PER_PAGE } from './survey.const';
import { SURVEY_09_TIRED_TOTAL_PAGES } from '../survey-09-TIRED/survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentWithShortAnswers from '../common/components/survey-contents/survey-contents-with-short-answers/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// styles
import styles from '../common/survey.module.scss';
import contentStyles from '../common/components/survey-contents/survey-contents-with-short-answers/surveyContent.module.scss';

export default function Survey10SCOPA() {
  // pagination hook props
  const setPrevSurveyPage = useSetRecoilState(survey09CurrentPageState);
  const setNextSurveyPage = useSetRecoilState(survey11CurrentPageState);
  const prevSurveyTotalPages = SURVEY_09_TIRED_TOTAL_PAGES;
  const currentPageState = survey10CurrentPageState;
  const questions = SCOPA_QUESTIONS;
  const questionsPerPage = SCOPA_QUESTIONS_PER_PAGE;

  const { currentPageQuestions, handleNextPage, handlePrevPage } = usePagination({
    setPrevSurveyPage,
    setNextSurveyPage,
    prevSurveyTotalPages,
    currentPageState,
    questions,
    questionsPerPage,
  });

  const surveyExplain = (
    <p className={styles.explain}>
      다음은 <span className={styles['explain-emphasize']}>지난 한 달 동안</span>의 자율신경계
      증상에 대한 설문지입니다. 본인의 증상을 가장 잘 설명하는 답안을 선택해주세요. 만약 이런
      증상들에 대해 약을 복용하는 것이 있다면,{' '}
      <span className={styles['explain-emphasize']}>약을 먹은 상태에서</span> 어느 정도인지를
      평가해주시기 바랍니다. 복용하는 약 이름은 마지막 페이지에 적어주세요.
    </p>
  );

  // for explain text box before question number 8~13, 22~23, 24
  const before08SectionExplain = (
    <p>
      8번부터 13번 문항은 배뇨장애에 대한 설문입니다.
      <br />
      만약 도뇨관을 사용 중이라면 "도뇨관 사용"에 표시해주세요.
    </p>
  );
  const before22SectionExplain = (
    <p>
      다음은 성생활에 대한 설문입니다.
      <br />
      성생활은 성행위 상대자와의 모든 형태의 성적 접촉과 자위 행위를 포함합니다.
      <br />
      만약 지난 한 달간 성생활을 한 적이 없거나, 다른 이유로 답을 하기 어려운 경우에는{' '}
      <span className={contentStyles['explain-emphasize']}>"해당 없음"</span>에 표시해 주세요.
    </p>
  );

  const explainSectionList = [
    { questionNumber: 8, element: before08SectionExplain },
    { questionNumber: 22, element: before22SectionExplain },
  ];

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[10].TITLE} subTitle={SURVEY_TITLE_LIST[10].SUB_TITLE} />
      {surveyExplain}
      <ul>
        {/* 개인정보 입력 페이지 성별 체크 따라 다른 설문 내용 보여주기,
        TO DO: 마지막 질문 안내 텍스트 추가 */}

        {currentPageQuestions.map((question) => (
          <SurveyContentWithShortAnswers
            question={question}
            explainSectionList={explainSectionList}
            key={question.No}
          />
        ))}
      </ul>

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
