import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../components/button';
import CharacterSlider from '../components/characterSlider';

export default function HomePage(props) {
  const {
    onPlayerChange, players, onReset, isLoading, setIsLoading,
  } = props;

  const newPlayerNameInput = useRef(null);
  const newPlayerCharacterInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    onReset();
  }, []);

  const onAddPlayerHandle = (event) => {
    event.preventDefault();

    const newPlayerName = newPlayerNameInput.current.value;
    if (!newPlayerName) Swal.fire('Failed adding player', 'Please fill the name field to add player', 'error');
    else if (players.findIndex((player) => player.name === newPlayerName) >= 0) Swal.fire('Failed adding player', 'The player name already registered', 'error');
    else if (players.length === 4) Swal.fire('Failed adding player', 'Maximum player limit exceeded', 'error');
    else {
      onPlayerChange({
        name: newPlayerName,
        avatar: newPlayerCharacterInput.current.value,
      });
      newPlayerNameInput.current.value = '';
    }
  };

  const onPlayHandle = () => {
    if (players.length < 2) Swal.fire('Failed to start the game', 'The game can be played with 2 player at least', 'error');
    else navigate('/play');
  };

  return (
    <>
      <form onSubmit={onAddPlayerHandle} className="flex flex-col items-center justify-center gap-8 overflow-hidden">
        <CharacterSlider
          ref={newPlayerCharacterInput}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <div className="w-fit overflow-hidden rounded-[20px] border-[5px] bg-white border-r-brown-500 border-b-brown-500 border-t-brown-900  border-l-brown-900 [&:has(input:focus)]:ring-2 [&:has(input:focus)]:ring-white/50">
          <input
            ref={newPlayerNameInput}
            type="text"
            className="bg-brown-500/80 py-1 px-4 font-pixel text-2xl text-white placeholder:text-center placeholder:text-white placeholder:underline focus:outline-none"
            placeholder="New Player"
          />
        </div>
        <div className="flex gap-8">
          <Button isPrimary isSubmit>Add Player</Button>
          <Button isPrimary onClick={onPlayHandle}>Play</Button>
        </div>
      </form>
      <div className="mt-8 flex w-full flex-col items-center font-pixel text-slate-900 underline dark:text-white">
        <p className="text-4xl">Player List :</p>
        <ul className="flex flex-col gap-1">
          {players.length ? players.map((player) => (
            <li className="flex gap-2 text-2xl" key={player.name}>
              <img src={player.avatar} alt={player.name} className="h-8 w-8" />
              {player.name}
            </li>
          )) : <li>No player yet</li>}
        </ul>
      </div>
    </>
  );
}
