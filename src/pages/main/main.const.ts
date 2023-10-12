import continueIcon from 'assets/mainpage-continue-icon.svg';
import createIcon from 'assets/mainpage-create-icon.svg';
import excelIcon from 'assets/mainpage-excel-icon.svg';

export const routeItems = [
  {
    id: 'CONTINUE',
    icon: continueIcon,
    title: '작성한 내용 이어서 작성',
    description: '해당 페이지에서 작성하신 내용이 있다면\n이어서 작성해주세요.',
    alt: 'pencil icon',
  },
  {
    id: 'CREATE',
    icon: createIcon,
    title: '새로 작성',
    description: '설문이 처음이시라면 새로 작성해주세요.',
    alt: 'create file icon',
  },
  {
    id: 'EXCEL',
    icon: excelIcon,
    title: 'Excel 파일 첨부 후 이어서 작성',
    description: '기존 작성 내용이 저장된 엑셀 파일이 있다면\n첨부 후 이어서 작성해주세요.',
    alt: 'excel icon',
  },
];
