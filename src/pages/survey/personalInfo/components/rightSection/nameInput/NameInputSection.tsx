import styles from './nameInputSection.module.scss';

export default function NameInputSection() {
  return (
    <section>
      <label>성함</label>
      <input
        className={styles['name-input']}
        type="text"
        placeholder="설문 대상 환자의 성함을 입력해주세요."
      />
    </section>
  );
}
