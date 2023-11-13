import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { survey01UPDRS_lastPageResponses } from '../selectors/survey01UPDRS_lastPageResponses';
import { survey02FG_lastPageResponses } from '../selectors/survey02FG_lastPageResponses';
import { survey03BAI_lastPageResponses } from '../selectors/survey03BAI_lastPageResponses';
import { survey04BDI_lastPageResponses } from '../selectors/survey04BDI_lastPageResponses';
import { survey05RBD_lastPageResponses } from '../selectors/survey05RBD_lastPageResponses';
import { survey06NMS_lastPageResponses } from '../selectors/survey06NMS_lastPageResponses';
import { survey07PDQ_lastPageResponses } from '../selectors/survey07PDQ_lastPageResponses';
import { survey08PDSS_lastPageResponses } from '../selectors/survey08PDSS_lastPageResponses';
import { survey09Tired_lastPageResponses } from '../selectors/survey09Tired_lastPageResponses';
import { survey10SCOPA_lastPageResponses } from '../selectors/survey10SCOPA_lastPageResponses';
import { survey11Constipation_lastPageResponses } from '../selectors/survey11Constipation_lastPageResponses';

export default function useCheckRespondedForSidebar() {
  // survey-01-UPDRS -> survey-02-FG
  const lastPageResponseList_01UPDRS = useRecoilValue(survey01UPDRS_lastPageResponses);
  const [notAllowedClick02FG, setNotAllowedClick02FG] = useState(true);
  useEffect(() => {
    const notResponded_01UPDRS = lastPageResponseList_01UPDRS.some((response) => response === '');
    notResponded_01UPDRS ? setNotAllowedClick02FG(true) : setNotAllowedClick02FG(false);
    lastPageResponseList_01UPDRS.length === 0 && setNotAllowedClick02FG(true);
  }, [lastPageResponseList_01UPDRS]);

  // survey-02-FG -> survey-03-BAI
  const lastPageResponseList_02FG = useRecoilValue(survey02FG_lastPageResponses);
  const [notAllowedClick03BAI, setNotAllowedClick03BAI] = useState(true);
  useEffect(() => {
    const notResponded_02FG = lastPageResponseList_02FG.some((response) => response === '');
    notResponded_02FG ? setNotAllowedClick03BAI(true) : setNotAllowedClick03BAI(false);
    lastPageResponseList_02FG.length === 0 && setNotAllowedClick03BAI(true);
  }, [lastPageResponseList_02FG]);

  // survey-03-BAI -> survey-04-BDI
  const lastPageResponseList_03BAI = useRecoilValue(survey03BAI_lastPageResponses);
  const [notAllowedClick04BDI, setNotAllowedClick04BDI] = useState(true);
  useEffect(() => {
    const notResponded_03BAI = lastPageResponseList_03BAI.some((response) => response === '');
    notResponded_03BAI ? setNotAllowedClick04BDI(true) : setNotAllowedClick04BDI(false);
    lastPageResponseList_03BAI.length === 0 && setNotAllowedClick04BDI(true);
  }, [lastPageResponseList_03BAI]);

  // survey-04-BDI -> survey-05-RBD
  const lastPageResponseList_04BDI = useRecoilValue(survey04BDI_lastPageResponses);
  const [notAllowedClick05RBD, setNotAllowedClick05RBD] = useState(true);
  useEffect(() => {
    const notResponded_04BDI = lastPageResponseList_04BDI.some((response) => response === '');
    notResponded_04BDI ? setNotAllowedClick05RBD(true) : setNotAllowedClick05RBD(false);
    lastPageResponseList_04BDI.length === 0 && setNotAllowedClick05RBD(true);
  }, [lastPageResponseList_04BDI]);

  // survey-05-RBD -> survey-06-NMS
  const lastPageResponseList_05RBD = useRecoilValue(survey05RBD_lastPageResponses);
  const [notAllowedClick06NMS, setNotAllowedClick06NMS] = useState(true);
  useEffect(() => {
    const notResponded_05RBD = lastPageResponseList_05RBD.some((response) => response === '');
    notResponded_05RBD ? setNotAllowedClick06NMS(true) : setNotAllowedClick06NMS(false);
    lastPageResponseList_05RBD.length === 0 && setNotAllowedClick06NMS(true);
  }, [lastPageResponseList_05RBD]);

  // survey-06-NMS -> survey-07-PDQ
  const lastPageResponseList_06NMS = useRecoilValue(survey06NMS_lastPageResponses);
  const [notAllowedClick07PDQ, setNotAllowedClick07PDQ] = useState(true);
  useEffect(() => {
    const notResponded_06NMS = lastPageResponseList_06NMS.some((response) => response === '');
    notResponded_06NMS ? setNotAllowedClick07PDQ(true) : setNotAllowedClick07PDQ(false);
    lastPageResponseList_06NMS.length === 0 && setNotAllowedClick07PDQ(true);
  }, [lastPageResponseList_06NMS]);

  // survey-07-PDQ -> survey-08-PDSS
  const lastPageResponseList_07PDQ = useRecoilValue(survey07PDQ_lastPageResponses);
  const [notAllowedClick08PDSS, setNotAllowedClick08PDSS] = useState(true);
  useEffect(() => {
    const notResponded_07PDQ = lastPageResponseList_07PDQ.some((response) => response === '');
    notResponded_07PDQ ? setNotAllowedClick08PDSS(true) : setNotAllowedClick08PDSS(false);
    lastPageResponseList_07PDQ.length === 0 && setNotAllowedClick08PDSS(true);
  }, [lastPageResponseList_07PDQ]);

  // survey-08-PDSS -> survey-09-Tired
  const lastPageResponseList_08PDSS = useRecoilValue(survey08PDSS_lastPageResponses);
  const [notAllowedClick09Tired, setNotAllowedClick09Tired] = useState(true);
  useEffect(() => {
    const notResponded_08PDSS = lastPageResponseList_08PDSS.some((response) => response === '');
    notResponded_08PDSS ? setNotAllowedClick09Tired(true) : setNotAllowedClick09Tired(false);
    lastPageResponseList_08PDSS.length === 0 && setNotAllowedClick09Tired(true);
  }, [lastPageResponseList_08PDSS]);

  // survey-09-Tired -> survey-10-SCOPA
  const lastPageResponseList_09Tired = useRecoilValue(survey09Tired_lastPageResponses);
  const [notAllowedClick10SCOPA, setNotAllowedClick10SCOPA] = useState(true);
  useEffect(() => {
    const notResponded_09Tired = lastPageResponseList_09Tired.some((response) => response === '');
    notResponded_09Tired ? setNotAllowedClick10SCOPA(true) : setNotAllowedClick10SCOPA(false);
    lastPageResponseList_09Tired.length === 0 && setNotAllowedClick10SCOPA(true);
  }, [lastPageResponseList_09Tired]);

  // survey-10-SCOPA -> survey-11-Constipation
  const lastPageResponseList_10SCOPA = useRecoilValue(survey10SCOPA_lastPageResponses);
  const [notAllowedClick11Constipation, setNotAllowedClick11Constipation] = useState(true);
  useEffect(() => {
    const notResponded_10SCOPA = lastPageResponseList_10SCOPA.some((response) => response === '');
    notResponded_10SCOPA
      ? setNotAllowedClick11Constipation(true)
      : setNotAllowedClick11Constipation(false);
    lastPageResponseList_10SCOPA.length === 0 && setNotAllowedClick11Constipation(true);
  }, [lastPageResponseList_10SCOPA]);

  //  survey-11-Constipation -> survey-12-Food
  const lastPageResponseList_11Constipation = useRecoilValue(
    survey11Constipation_lastPageResponses
  );
  const [notAllowedClick12Food, setNotAllowedClick12Food] = useState(true);
  useEffect(() => {
    const notResponded_11Constipation = lastPageResponseList_11Constipation.some(
      (response) => response === ''
    );
    notResponded_11Constipation ? setNotAllowedClick12Food(true) : setNotAllowedClick12Food(false);
    lastPageResponseList_11Constipation.length === 0 && setNotAllowedClick12Food(true);
  }, [lastPageResponseList_11Constipation]);

  return {
    notAllowedClick02FG,
    notAllowedClick03BAI,
    notAllowedClick04BDI,
    notAllowedClick05RBD,
    notAllowedClick06NMS,
    notAllowedClick07PDQ,
    notAllowedClick08PDSS,
    notAllowedClick09Tired,
    notAllowedClick10SCOPA,
    notAllowedClick11Constipation,
    notAllowedClick12Food,
  };
}
