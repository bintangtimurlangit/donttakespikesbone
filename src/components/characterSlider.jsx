import Swal from 'sweetalert2';
import { useEffect, useState, forwardRef } from 'react';
import { getDogsData } from '../services';
import Button from './button';

const CharacterSlider = forwardRef((_, ref) => {
  const [characters, setCharacters] = useState([]);
  const [index, setIndex] = useState(0);

  const onGetDataHandle = async () => {
    const data = await getDogsData();
    if (data.status === 'success') setCharacters(() => [...data.message]);
    else Swal.fire('Connection Error', 'Error fetching data', 'error');
  };

  useEffect(() => {
    onGetDataHandle();
  }, []);

  useEffect(() => {
    if (characters.length) ref.current.value = characters[index];
  }, [index, characters]);

  const onPrevHandle = () => setIndex(((prevState) => (prevState === 0 ? 3 : prevState - 1)));
  const onNextHandle = () => setIndex(((prevState) => (prevState === 3 ? 0 : prevState + 1)));

  return (
    <div className="flex items-center gap-8">
      <input type="hidden" ref={ref} />
      <Button isPrimary onClick={onPrevHandle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </Button>
      <img className="h-40 w-40 border-4 border-black object-cover" src={characters[index]} alt={characters[index]} />
      <Button isPrimary onClick={onNextHandle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </Button>
    </div>
  );
});

export default CharacterSlider;
