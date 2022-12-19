import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getWeatherData } from './services';
import HomePage from './pages/home';
import PlayPage from './pages/play';
import Loading from './components/loading';
import ButtonMusic from './components/buttonMusic';
import Button from './components/button';
import Info from './components/info';
import Weather from './components/weather';

export default function App() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const [zone, setZone] = useState({
    location: 'Monas',
    weather: {
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
    hour: 7,
  });

  const onGetDataHandle = async () => {
    const data = await getWeatherData();
    if (data) {
      setZone({
        hour: new Date(new Date().getTime() + data.timezone).getHours(),
        location: data.name,
        weather: data.weather[0],
      });
      setIsLoading(false);
    } else Swal.fire('Connection Error', 'Error fetching data', 'error');
  };

  useEffect(() => {
    setIsLoading(true);
    onGetDataHandle();
  }, []);

  const isHome = location.pathname === '/';
  const isNight = zone.hour < 5 || zone.hour > 17;
  const isRainy = zone.weather.main === 'Rain';

  if (isNight) document.body.setAttribute('data-mode', 'dark');

  const backgroundImage = (isRainy ? 'url("./rain.png"), ' : '') + (isNight ? 'url("./background_night.png")' : 'url("./background.png")');
  const backgroundPosition = isRainy ? 'top left, top left' : 'top left';

  const onPlayerChangeHandle = (newPlayer) => setPlayers((prevState) => [...prevState, newPlayer]);
  const onPlayerResetHandle = () => setPlayers([]);

  return (
    <div className="relative h-screen w-screen overflow-y-auto bg-repeat px-4 pb-8 pt-4" style={{ backgroundImage, backgroundPosition }}>
      {
        isLoading ? <Loading /> : (
          <>
            <Weather weather={zone.weather} hour={zone.hour} />
            <div className="flex w-full items-start">
              {
                isHome ? <Info /> : (
                  <Button isLink href="/" className="flex h-12 w-12 items-center sm:h-20 sm:w-20">
                    <img src="./back.png" alt="back button" className="aspect-[14/20] h-full w-12 sm:w-20" />
                  </Button>
                )
              }
              <div className="flex h-28 flex-1 justify-center sm:h-48">
                <img src="./title.png" className="aspect-[1080/400] h-full" alt="title" />
              </div>
              <ButtonMusic />
            </div>
            <Routes>
              <Route path="/" element={<HomePage players={players} onPlayerChange={onPlayerChangeHandle} onReset={onPlayerResetHandle} />} />
              <Route path="/play" element={<PlayPage players={players} />} />
            </Routes>
          </>
        )
      }
    </div>
  );
}
