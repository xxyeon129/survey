import { useEffect } from 'react';
import { Pathname, useNavigate } from 'react-router-dom';
import history from 'common/constants/history.const';

export default function useBackBlock(location: Location | Pathname) {
  const navigate = useNavigate();

  useEffect(() => {
    const listenBackEvent = () => {
      navigate(location);
    };

    const historyEvent = history.listen(({ action }) => {
      if (action === 'POP') listenBackEvent();
    });

    return historyEvent;
  }, []);
}
