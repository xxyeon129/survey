import { useState } from 'react';
import styles from 'pages/survey/common/components/survey-contents/survey-contents-with-short-answers/surveyContent.module.scss';
import GenderCheckSection from 'pages/survey/personalInfo/components/rightSection/genderCheck/GenderCheckSection';

// for explain text box before question number 8~13, 22~23, 24
export default function useExplainSectionElements() {
  const explainSectionList = [
    { questionNumber: 8, element: Before08SectionExplain },
    { questionNumber: 22, element: Before22SectionExplain },
    { questionNumber: 24, element: Before24SectionExplain },
  ];

  return explainSectionList;
}

// for explain text box before question number 8~13
function Before08SectionExplain() {
  return (
    <p>
      8번부터 13번 문항은 <span className={styles['explain-emphasize']}>배뇨장애</span>에 대한
      설문입니다.
      <br />
      만약 도뇨관을 사용 중이라면 "도뇨관 사용"에 표시해주세요.
    </p>
  );
}

// for explain text box before question number 22~23
function Before22SectionExplain() {
  // for re-select gender
  const [showReSelectGender, setShowReselectGender] = useState(false);
  return (
    <article>
      <p>
        다음은 <span className={styles['explain-emphasize']}>성생활</span>에 대한 설문입니다.
        <br />
        성생활은 성행위 상대자와의 모든 형태의 성적 접촉과 자위 행위를 포함합니다.
        <br />
        만약 지난 한 달간 성생활을 한 적이 없거나, 다른 이유로 답을 하기 어려운 경우에는{' '}
        <span className={styles['explain-emphasize']}>"해당 없음"</span>에 표시해 주세요.
        <br />
        성생활에 대한 설문은 개인정보 입력 시 선택한 성별에 따라 다른 설문 내용으로 구성됩니다.
        <br />
        환자의 성별을 잘못 선택하셨다면 아래 버튼을 눌러 성별을 수정해 주세요.
      </p>
      <button
        className={styles['explain-gender-change-button']}
        onClick={() => setShowReselectGender(!showReSelectGender)}
      >
        성별 변경하기
      </button>
      {showReSelectGender && <GenderCheckSection isSurveyPage={true} />}
    </article>
  );
}

// for explain text box before question number 24
function Before24SectionExplain() {
  return (
    <p>
      다음은 파킨슨병 증상 이외의 증상으로{' '}
      <span className={styles['explain-emphasize']}>복용했던 약</span>
      에 대한 질문입니다.
      <br />
      의사에게 처방을 받은 약과, 처방 없이 살 수 있는 일반약 모두를 포함합니다.
      <br />
      만약 파킨슨병 증상 이외 약을 먹었다면,{' '}
      <span className={styles['explain-emphasize']}>약 이름</span>이나 성분명을 입력해주세요.
    </p>
  );
}
