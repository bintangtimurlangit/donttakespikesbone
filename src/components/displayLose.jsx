import Button from './button';

export default function DisplayLose(props) {
  const { player, isTimeout, onPlayAgain } = props;
  return (
    <div className="mb-2 flex flex-col items-center text-slate-900 dark:text-white">
      <div className="h-80 p-20">
        <img src="./dog_wake.png" alt="dog wake" className="h-full animate-zooming" />
      </div>
      <div className="flex items-center gap-2">
        <img src={player.avatar} alt={player.name} className="h-12 w-12 object-cover" />
        <p className="font-pixel text-3xl  ">{player.name}</p>
      </div>
      <p className="text-center font-pixel text-4xl">
        { isTimeout ? 'Too slow! the dog already wake up' : 'Oh no! You wake him up' }
      </p>
      <div className="flex justify-center">
        <div className="flex gap-6">
          <Button onClick={onPlayAgain} isPrimary>Play Again</Button>
          <Button isLink href="/" isPrimary>Back To Home</Button>
        </div>
      </div>
    </div>
  );
}
