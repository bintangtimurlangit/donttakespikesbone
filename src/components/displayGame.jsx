import Bones from './bones';

export default function DisplayGame(props) {
  const {
    players, bones, onBoneTaken, time,
  } = props;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full max-w-[240px] overflow-hidden font-pixel text-slate-900 dark:text-white">
        <div className="mb-4">
          <p className="flex text-3xl">
            Turns :&nbsp;
            <img src={players[0].avatar} alt={players[0].name} className="h-10 w-10 object-cover" />
            &nbsp;
            {players[0].name}
          </p>
          <p className="text-3xl">
            End in
            {' '}
            {time}
          </p>
        </div>
        <ul className="hidden flex-col gap-2 px-2 md:flex">
          {
            players.map(({ name, avatar }) => (
              <li className="flex items-center gap-2" key={name}>
                <img src={avatar} alt={name} className="h-8 w-8 object-cover" />
                <p className="text-2xl">{name}</p>
              </li>
            ))
          }
        </ul>
      </div>
      <Bones bones={bones} onBoneTaken={onBoneTaken} />
      <div className="w-[240px]" />
    </div>
  );
}
