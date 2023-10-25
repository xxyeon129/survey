import { IoIosArrowDropleft } from 'react-icons/io';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import styles from '../header.module.scss';

export default function PrevNextBtn() {
  return (
    <div className={styles['prev-next-btn']}>
      <button>
        <IoIosArrowDropleft />
      </button>
      <button>
        <IoIosArrowDroprightCircle />
      </button>
    </div>
  );
}
