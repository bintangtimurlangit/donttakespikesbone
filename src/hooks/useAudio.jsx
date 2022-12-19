import { useEffect, useRef } from 'react';

const useAudio = (src, setting) => {
  const audio = useRef(new Audio(src));

  useEffect(() => {
    audio.current.loop = setting?.loop || false;
    audio.current.volume = setting?.volume || 1;

    return () => audio.current.remove();
  }, []);

  return audio.current;
};

export default useAudio;
