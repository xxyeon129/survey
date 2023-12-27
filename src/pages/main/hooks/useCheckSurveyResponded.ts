import { useRecoilValue } from 'recoil';
import { uploadedResponseStates } from 'common/layout/header/excelFileHandle/states/uploadedResponseData.state';
import { SURVEY_TITLE_LIST } from 'common/constants/survey.const';
import { PATH_URL } from 'common/constants/path.const';
import {
  UploadedResponseDataListType,
  UploadedResponseDataType,
} from 'common/layout/header/excelFileHandle/types/uploadedResponseData.type';

// for navigate to survey page in process
export default function useCheckSurveyResponded() {
  const checkSurveyResponded = (list: UploadedResponseDataListType) => {
    const notRespondedList = list.filter(
      (question: UploadedResponseDataType) => question.응답내용 === ''
    );
    const isNotRespondedSurvey = notRespondedList.length > 0;
    return isNotRespondedSurvey;
  };

  // 01 UPDRS
  const survey01UPDRS_excelList = useRecoilValue(
    uploadedResponseStates(SURVEY_TITLE_LIST[1].TITLE)
  );
  const isNotRespondedSurvey01UPDRS = checkSurveyResponded(survey01UPDRS_excelList);

  // // 02 FG
  // const survey02FG_excelList = useRecoilValue(uploadedResponseStates(SURVEY_TITLE_LIST[2].TITLE));
  // const isNotRespondedSurvey02FG = checkSurveyResponded(survey02FG_excelList);

  // // 03 BAI
  // const survey03BAI_excelList = useRecoilValue(uploadedResponseStates(SURVEY_TITLE_LIST[3].TITLE));
  // const isNotRespondedSurvey03BAI = checkSurveyResponded(survey03BAI_excelList);

  // // 04 BDI
  // const survey04BDI_excelList = useRecoilValue(uploadedResponseStates(SURVEY_TITLE_LIST[4].TITLE));
  // const isNotRespondedSurvey04BDI = checkSurveyResponded(survey04BDI_excelList);

  // // 05 RBD
  // const survey05RBD_excelList = useRecoilValue(uploadedResponseStates(SURVEY_TITLE_LIST[5].TITLE));
  // const isNotRespondedSurvey05RBD = checkSurveyResponded(survey05RBD_excelList);

  // // 06 NMS
  // const survey06NMS_excelList = useRecoilValue(uploadedResponseStates(SURVEY_TITLE_LIST[6].TITLE));
  // const isNotRespondedSurvey06NMS = checkSurveyResponded(survey06NMS_excelList);

  // // 07 PDQ
  // const survey07PDQ_excelList = useRecoilValue(uploadedResponseStates(SURVEY_TITLE_LIST[7].TITLE));
  // const isNotRespondedSurvey07PDQ = checkSurveyResponded(survey07PDQ_excelList);

  // // 08 PDSS
  // const survey08PDSS_excelList = useRecoilValue(uploadedResponseStates(SURVEY_TITLE_LIST[8].TITLE));
  // const isNotRespondedSurvey08PDSS = checkSurveyResponded(survey08PDSS_excelList);

  // // 09 Tired
  // const survey09Tired_excelList = useRecoilValue(
  //   uploadedResponseStates(SURVEY_TITLE_LIST[9].TITLE)
  // );
  // const isNotRespondedSurvey09Tired = checkSurveyResponded(survey09Tired_excelList);

  // // 10 SCOPA
  // const survey10SCOPA_excelList = useRecoilValue(
  //   uploadedResponseStates(SURVEY_TITLE_LIST[10].TITLE)
  // );
  // const survey10SCOPA_notRespondedList = survey10SCOPA_excelList.filter(
  //   (question: UploadedResponseDataType) => question.응답내용 === ''
  // );
  // const filterMedicineNameInputValues = survey10SCOPA_notRespondedList.filter(
  //   (question: UploadedResponseDataType) => question.문항번호 !== '24-약 이름'
  // );

  // const isNotRespondedSurvey10SCOPA = filterMedicineNameInputValues.length > 0;

  // // 11 Constipation
  // const survey11Constipation_excelList = useRecoilValue(
  //   uploadedResponseStates(SURVEY_TITLE_LIST[11].TITLE)
  // );
  // const isNotRespondedSurvey11Constipation = checkSurveyResponded(survey11Constipation_excelList);

  // // 12 Food
  // const survey12Food_excelList = useRecoilValue(
  //   uploadedResponseStates(SURVEY_TITLE_LIST[12].TITLE)
  // );
  // const isNotRespondedSurvey12Food = checkSurveyResponded(survey12Food_excelList);

  const isRespondedSurveyList = [
    { isNotResponded: isNotRespondedSurvey01UPDRS, path: PATH_URL.SURVEY['01_UPDRS'] },
    // { isNotResponded: isNotRespondedSurvey02FG, path: PATH_URL.SURVEY['02_FG'] },
    // { isNotResponded: isNotRespondedSurvey03BAI, path: PATH_URL.SURVEY['03_BAI'] },
    // { isNotResponded: isNotRespondedSurvey04BDI, path: PATH_URL.SURVEY['04_BDI'] },
    // { isNotResponded: isNotRespondedSurvey05RBD, path: PATH_URL.SURVEY['05_RBD'] },
    // { isNotResponded: isNotRespondedSurvey06NMS, path: PATH_URL.SURVEY['06_NMS'] },
    // { isNotResponded: isNotRespondedSurvey07PDQ, path: PATH_URL.SURVEY['07_PDQ'] },
    // { isNotResponded: isNotRespondedSurvey08PDSS, path: PATH_URL.SURVEY['08_PDSS'] },
    // { isNotResponded: isNotRespondedSurvey09Tired, path: PATH_URL.SURVEY['09_TIRED'] },
    // { isNotResponded: isNotRespondedSurvey10SCOPA, path: PATH_URL.SURVEY['10_SCOPA'] },
    // {
    //   isNotResponded: isNotRespondedSurvey11Constipation,
    //   path: PATH_URL.SURVEY['11_CONSTIPATION'],
    // },
    // { isNotResponded: isNotRespondedSurvey12Food, path: PATH_URL.SURVEY['12_FOOD'] },
  ];

  return isRespondedSurveyList;
}
