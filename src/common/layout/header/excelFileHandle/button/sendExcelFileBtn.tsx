import styles from './sendExcelFileBtn.module.scss';

export default function SendExcelFileBtn({ onClickBtnHandler }: { onClickBtnHandler: () => void }) {
  return (
    <button className={styles['send-excel-file-btn']} onClick={onClickBtnHandler}>
      진행 내용 저장
    </button>
  );
}
