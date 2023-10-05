import { IoIosArrowDropleft } from 'react-icons/io';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import './header.scss';

export default function PrevNextBtn() {
  return (
    <div id='prev-next-btn'>
      <button>
        <IoIosArrowDropleft />
      </button>
      <button>
        <IoIosArrowDroprightCircle />
      </button>
    </div>
  );
}
