interface QuestionType {
  Q: string;
  A: { [key: number]: string };
}

interface QuestionListType {
  [key: string]: QuestionType;
}

export default function useQnAList(questionList: QuestionListType) {
  const questions = Object.values(questionList).map((question) => question.Q);
  const answers = Object.values(questionList).map((question) => Object.values(question.A));

  return { questions, answers };
}
