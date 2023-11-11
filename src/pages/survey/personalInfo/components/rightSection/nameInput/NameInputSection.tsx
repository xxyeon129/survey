import { useRecoilState } from 'recoil';
import { personalInfoNameState } from 'pages/survey/personalInfo/personalInfo.state';
import styles from './nameInputSection.module.scss';

export default function NameInputSection() {
  const [name, setName] = useRecoilState(personalInfoNameState);

  const onChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName(inputValue);
  };

  return (
    <section>
      <label htmlFor="name">성명</label>
      <input
        className={styles['name-input']}
        type="text"
        id="name"
        value={name}
        onChange={onChangeNameInput}
        placeholder="설문 대상 환자의 성명을 입력해주세요."
      />
    </section>
  );
}
