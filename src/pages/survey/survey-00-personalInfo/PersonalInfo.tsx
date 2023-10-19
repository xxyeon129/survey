import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { headerCurrentPageState } from 'components/layout/header/pagination/headerPageState';
import styles from 'pages/survey/common/survey.module.scss';
import { SURVEY } from 'shared/constants/survey.const';
import SurveyTitle from '../common/survey-title/SurveyTitle';
import BottomPrevNextButton from '../common/bottom-prev-next-button/BottomPrevNextButton';
import usePagination from '../common/hooks/usePagination';

export default function PersonalInfo() {
  const setHeaderCurrentPage = useSetRecoilState(headerCurrentPageState);

  // TEST CODE: 개인정보 입력 내용 결정되면 survey.const.ts에 추가
  const questions = ['성함', '전화번호', '이메일', '성별'];
  const { currentPage, currentSurveyTotalPages, handleNextPage, handlePrevPage } = usePagination(
    questions,
    SURVEY[0].PAGINATION_QUESTIONS_LIMIT
  );

  useEffect(() => {
    setHeaderCurrentPage(1);
  }, []);

  return (
    <article className={styles['survey-container']}>
      <SurveyTitle title={SURVEY[0].TITLE} subTitle={SURVEY[0].SUB_TITLE} />

      <BottomPrevNextButton
        currentPage={currentPage}
        currentSurveyTotalPages={currentSurveyTotalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </article>
  );
}
