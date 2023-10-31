export interface SurveyContentType {
  question: { No: number; Q?: string; EXPLAIN?: string; A?: string[] };
}

export type SurveyContentObjectType = {
  No: number;
  Q?: string;
  EXPLAIN?: string;
  A?: string[];
};
