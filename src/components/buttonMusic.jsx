import { useEffect, useState } from 'react';
import Button from './button';
import useAudio from '../hooks/useAudio';

export default function ButtonMusic() {
  const music = useAudio('./sounds/music.mp3', { loop: true });
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (playing) music.play();
    else music.pause();
  }, [playing]);

  const onToggleMusic = () => setPlaying((prevState) => (!prevState));

  return (
    <Button onClick={onToggleMusic} className="h-12 w-12 sm:h-20 sm:w-20">
      {
        playing ? (
          <img
            src="./speaker_unmute.png"
            alt="speaker"
            className="w-20"
          />
        ) : (
          <img
            src="./speaker_mute.png"
            alt="speaker"
            className="w-20"
          />
        )
      }
    </Button>
  );
}
