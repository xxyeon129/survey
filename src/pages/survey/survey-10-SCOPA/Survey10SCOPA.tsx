// states
import { useSetRecoilState } from 'recoil';
import {
  survey09CurrentPageState,
  survey10CurrentPageState,
  survey11CurrentPageState,
} from '../common/surveyPaginationStates';
// constants
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import {
  SCOPA_QUESTIONS,
  SCOPA_QUESTIONS_MEDICINE,
  SCOPA_QUESTIONS_PER_PAGE,
} from './survey.const';
import { SURVEY_09_TIRED_TOTAL_PAGES } from '../survey-09-TIRED/survey.const';
// components
import SurveyTitle from '../common/components/survey-title/SurveyTitle';
import SurveyContentWithShortAnswers from '../common/components/survey-contents/survey-contents-with-short-answers/SurveyContent';
import BottomPrevNextButton from '../common/components/bottom-prev-next-button/BottomPrevNextButton';
// hooks
import usePagination from '../common/hooks/usePagination';
import useSeparateGender from './hook/useSeparateGender';
// styles
import styles from '../common/survey.module.scss';
import contentStyles from '../common/components/survey-contents/survey-contents-with-short-answers/surveyContent.module.scss';
import GenderCheckSection from '../personalInfo/components/rightSection/genderCheck/GenderCheckSection';
import { useState } from 'react';

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

  // for separate question 22-23 by gender
  const categorizedQuestionList = useSeparateGender();
  // for re-select gender
  const [showReSelectGender, setShowReSelectGender] = useState(false);

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
      8번부터 13번 문항은 <span className={contentStyles['explain-emphasize']}>배뇨장애</span>에
      대한 설문입니다.
      <br />
      만약 도뇨관을 사용 중이라면 "도뇨관 사용"에 표시해주세요.
    </p>
  );
  const before22SectionExplain = (
    <article>
      <p>
        다음은 <span className={contentStyles['explain-emphasize']}>성생활</span>에 대한 설문입니다.
        <br />
        성생활은 성행위 상대자와의 모든 형태의 성적 접촉과 자위 행위를 포함합니다.
        <br />
        만약 지난 한 달간 성생활을 한 적이 없거나, 다른 이유로 답을 하기 어려운 경우에는{' '}
        <span className={contentStyles['explain-emphasize']}>"해당 없음"</span>에 표시해 주세요.
        <br />
        개인정보 입력 시 체크한 성별에 따라 다른 설문 내용으로 구성되므로, 환자의 성별을 잘못
        체크하셨다면 아래 버튼을 눌러 성별을 수정해주세요.
      </p>
      <button
        className={contentStyles['explain-gender-change-button']}
        onClick={() => setShowReSelectGender(!showReSelectGender)}
      >
        성별 변경하기
      </button>
      {showReSelectGender && <GenderCheckSection isSurveyPage={true} />}
    </article>
  );
  const before24SectionExplain = (
    <p>
      다음은 <span className={contentStyles['explain-emphasize']}>복용했던 약</span>에 대한
      질문입니다.
      <br />
      의사에게 처방을 받은 약과, 처방 없이 살 수 있는 일반약 모두를 포함합니다.
      <br />
      만약 약을 먹었다면, <span className={contentStyles['explain-emphasize']}>약 이름</span>이나
      성분명을 입력해주세요.
    </p>
  );

  const explainSectionList = [
    { questionNumber: 8, element: before08SectionExplain, key: 8000 },
    { questionNumber: 22, element: before22SectionExplain, key: 2200 },
    { questionNumber: 24, element: before24SectionExplain, key: 2400 },
  ];

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY_TITLE_LIST[10].TITLE} subTitle={SURVEY_TITLE_LIST[10].SUB_TITLE} />
      {surveyExplain}
      <ul>
        {currentPageQuestions.map((question) => (
          <SurveyContentWithShortAnswers
            question={question}
            explainSectionList={explainSectionList}
            categorizedQuestionList={categorizedQuestionList}
            exceptionalTypeQuestion={SCOPA_QUESTIONS_MEDICINE}
            key={question.No}
          />
        ))}
      </ul>

      <BottomPrevNextButton handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </article>
  );
}
