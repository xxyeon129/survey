import { PiWarningCircleBold } from 'react-icons/pi';
import commonStyles from 'common/scss/common.module.scss';
import styles from './sendGmailModal.module.scss';
import useExcelFile from 'common/hooks/useExcelFile';
import { useRecoilValue } from 'recoil';
import {
  personalInfoBirthdayState,
  personalInfoNameState,
} from 'pages/survey/personalInfo/personalInfo.state';

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
      <article className={styles['modal']} onClick={keepModalOpen}>
        <section className={styles['title']}>
          <div className={styles.warnLogoBackground}>
            <PiWarningCircleBold className={styles.warnLogo} />
          </div>
          <h1>파일 다운로드 후 첨부해 메일을 전송해주세요.</h1>
        </section>

        <p>
          {'1)'} 하단의 "작성 내용 다운로드" 버튼을 클릭해 파일을 다운로드하고,
          <br />
          {'2)'}"작성 내용 병원에 전송하기" 버튼을 클릭해 이동한 창에서
          <br />
          <span className={styles.highlight}>반드시 다운로드한 파일을 첨부해</span> 메일을
          전송해주세요.
        </p>

        <section className={styles.btnContainer}>
          <button className={styles.downloadBtn} onClick={downloadExcelFileHandler}>
            1. 작성 내용 다운로드
          </button>
          <button className={styles.sendBtn} onClick={sendGmailHandler}>
            2. 작성 내용 병원에 전송하기
          </button>
        </section>
      </article>
    </div>
  );
}
