import { useState } from 'react';

export default function useInput() {
  const [inputData, setInputData] = useState('');

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(() => event.target.value);
  };

  return { inputData, inputChangeHandler };
}
