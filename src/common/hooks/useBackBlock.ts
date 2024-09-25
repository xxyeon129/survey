import { useEffect } from 'react';
import { NavigationType, Pathname, useNavigate } from 'react-router-dom';
import homePagerouter from 'routes/routes';

export default function useBackBlock(propsLocation: Location | Pathname) {
  const navigate = useNavigate();

  const blockBackEvent = () => {
    navigate(propsLocation);
  };

  useEffect(() => {
    const unsubscribe = homePagerouter.subscribe((state) => {
      if (state.historyAction === NavigationType.Pop) {
        blockBackEvent();
      }
    });

    // component unmount unsubscribe for non-homepage
    return () => {
      unsubscribe();
    };
  }, []);
}
