import { useState } from 'react';

export default function useModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  return { modalOpen, openModalHandler, closeModalHandler };
}
