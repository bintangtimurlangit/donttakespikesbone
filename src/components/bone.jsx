import useAudio from '../hooks/useAudio';
import Button from './button';

export default function Bone({ isBomb, taken, onClick }) {
  const audioTaking = useAudio('./sounds/click.wav');
  const audioExplode = useAudio('./sounds/explode.mp3');
  const audioHover = useAudio('./sounds/hover.mp3');

  const onHoverHandle = () => {
    audioHover.play();
  };

  const onClickHandle = () => {
    if (isBomb) audioExplode.play();
    else audioTaking.play();
    onClick();
  };

  if (!taken) return <Button onClick={onClickHandle} className="h-12 w-12"><img onMouseEnter={onHoverHandle} src="./bone.png" alt="bone" className="h-12 w-12" /></Button>;
  return <div className="h-12 w-12" />;
}
