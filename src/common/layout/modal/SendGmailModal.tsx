import { useRecoilValue } from 'recoil';
// states
import {
  personalInfoBirthdayState,
  personalInfoNameState,
} from 'pages/survey/personalInfo/personalInfo.state';
// hooks
import useExcelFile from 'common/hooks/useExcelFile';
// styles
import attachImg from 'assets/send-gmail-attach-img.png';
import { PiWarningCircleBold } from 'react-icons/pi';
import commonStyles from 'common/scss/common.module.scss';
import styles from './sendGmailModal.module.scss';

export default function SendGmailModal({ onClose }: { onClose: () => void }) {
  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const { downloadExcelFileHandler } = useExcelFile({ onCloseModal: onClose });

  const patientName = useRecoilValue(personalInfoNameState);
  const patientBirth = useRecoilValue(personalInfoBirthdayState);

  const sendGmailHandler = () => {
    const mailTo1 = import.meta.env.VITE_APP_MAIL_TO_1;
    const mailTo2 = import.meta.env.VITE_APP_MAIL_TO_2;
    const mailSubject = `[이상운동질환 비운동증상 전자설문 임시저장 Excel 파일] ${patientName}환자`;
    const mailBody = `생년월일 ${patientBirth}, ${patientName} 환자의 이상운동질환 비운동증상 전자설문 임시저장 Excel 파일입니다.`;

    const gmailComposeUrl = `https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&su=${mailSubject}&body=${mailBody}&to=${mailTo1},${mailTo2}`;

    window.open(gmailComposeUrl, '_blank');
  };

  return (
    <div className={commonStyles['modal-background']} onClick={onClose}>
      <article className={styles.modal} onClick={keepModalOpen}>
        <section className={styles.title}>
          <div className={styles.warnLogoBackground}>
            <PiWarningCircleBold className={styles.warnLogo} />
          </div>
          <h1>아래 안내에 따라 메일을 전송해 주세요.</h1>
        </section>

        <section className={styles.content}>
          <p>1. 하단 다운로드 버튼을 클릭해 파일을 다운로드해 주세요.</p>
          <button className={styles.downloadBtn} onClick={downloadExcelFileHandler}>
            <span className={styles.numberCircle}>1</span>작성 내용 다운로드
          </button>
        </section>

        <section className={styles.content}>
          <p>
            2. 하단 전송하기 버튼을 클릭해 이동한 창에서
            <br />
            <span className={styles.highlight}>반드시 다운로드한 파일을 첨부해</span> 메일을
            전송해주세요.
            <br />
            이동한 창의 좌측 하단 클립 아이콘이 파일 첨부 버튼입니다.
          </p>

          <img
            className={styles['attach-example-img']}
            src={attachImg}
            alt="gmail attach icon example"
          />

          <button className={styles.sendBtn} onClick={sendGmailHandler}>
            <span className={styles.numberCircle}>2</span>작성 내용 병원에 전송하기
          </button>
        </section>
      </article>
    </div>
  );
}
