export default function Weather(props) {
  const { hour, weather } = props;

  return (
    <div className="absolute right-8 bottom-4 flex flex-col items-center justify-center font-pixel text-xl dark:text-white sm:text-2xl">
      <div className="flex items-end gap-2">
        <p>{hour > 12 ? `${hour - 12} PM` : `${hour} AM`}</p>
        <img src={`./weathers/${weather.icon}.png`} className="h-10 w-10 object-cover sm:h-12 sm:w-12" alt={weather.description} />
      </div>
      <div>{weather.description}</div>
    </div>
  );
}
