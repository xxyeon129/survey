interface QuestionType {
  Q: string;
  A: { [key: number]: string };
}

interface QuestionListType {
  [key: string]: QuestionType;
}

export default function useQnAList(questionList: QuestionListType) {
  const questionTitle = Object.values(questionList).map((question) => question.Q);
  const questionAnswers = Object.values(questionList).map((question) => Object.values(question.A));

  return { questionTitle, questionAnswers };
}
