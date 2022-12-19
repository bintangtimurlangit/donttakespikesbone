import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useTimer } from 'use-timer';
import { generateBones, generateNumbers } from '../utils';
import DisplayLose from '../components/displayLose';
import DisplayGame from '../components/displayGame';

export default function PlayPage(props) {
  const { players = [] } = props;
  if (!players.length) return <Navigate to="/" />;

  const boneCount = (players.length + 2) * 4;
  const bombCount = Math.ceil(Math.random() * players.length);
  const bombs = generateNumbers(bombCount, [], boneCount);

  const initialGame = {
    players: players.map((player, index) => ({
      ...player,
      turn: index + 1,
    })),
    bones: generateBones(boneCount, bombs),
    isOver: false,
    isTimeout: false,
  };

  const [game, setGame] = useState(initialGame);
  const { time, start, reset } = useTimer({
    initialTime: 10,
    timerType: 'DECREMENTAL',
    step: 1,
    endTime: 0,
  });

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (time === 0) {
      game.isOver = true;
      game.isTimeout = true;
    }
  }, [time]);

  const nextTurnHandle = () => {
    setGame((prevState) => ({
      ...prevState,
      takenBones: 0,
      players: prevState.players.map((player) => ({
        ...player,
        turn: player.turn === 1 ? players.length : player.turn - 1,
      })).sort((pda, pdb) => pda.turn - pdb.turn),
    }));
    reset();
    start();
  };

  const onBoneTakenHandle = (id, isBomb) => {
    if (game.isOver) return;
    const boneIndex = game.bones.findIndex((bone) => bone.id === id);

    setGame((prevState) => {
      const newGame = { ...prevState };
      newGame.bones[boneIndex].taken = true;
      if (isBomb) newGame.isOver = true;
      return newGame;
    });

    if (!isBomb) nextTurnHandle();
    else reset();
  };

  if (!game.bones.length) return <p>Loading</p>;

  const onPlayAgainHandle = () => {
    setGame({ ...initialGame, bones: generateBones(boneCount, bombs) });
    start();
  };

  return !game.isOver ? (
    <DisplayGame
      time={time}
      players={game.players}
      bones={game.bones}
      onBoneTaken={onBoneTakenHandle}
    />
  ) : (
    <DisplayLose
      player={game.players[0]}
      onPlayAgain={onPlayAgainHandle}
      isTimeout={game.isTimeout}
    />
  );
}
