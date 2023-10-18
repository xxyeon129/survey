import { useState } from 'react';

export default function usePagination(questions: string[]) {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const totalPages = Math.ceil(questions.length / limit);
  const questionStartIndex = (currentPage - 1) * limit;

  const currentPageQuestions = questions.slice(questionStartIndex, currentPage * limit);

  const handleNextPage = () => {
    currentPage < totalPages && setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  return {
    currentPage,
    totalPages,
    questionStartIndex,
    currentPageQuestions,
    handleNextPage,
    handlePrevPage,
  };
}
