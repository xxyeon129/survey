import { NMS_SectionType } from 'pages/survey/survey-06-NMS/survey06NMS.type';

export interface SurveyContentType {
  question: { No: number; Q?: string; EXPLAIN?: string; A?: string[] };
}

export interface SurveyContentObjectType {
  No: number;
  Q?: string;
  A?: string[];
  EXPLAIN?: string;

  // for survey-06-NMS
  section?: NMS_SectionType;
}
