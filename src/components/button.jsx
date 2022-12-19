import classcat from 'classcat';
import { Link } from 'react-router-dom';

export default function Button({
  children, onClick = () => {}, className = '', isLink = false, isPrimary = false, href = '/', isSubmit = false,
}) {
  const isString = typeof children === 'string';
  const buttonClassname = classcat([{
    "relative flex items-center rounded-full bg-black py-2 px-5 font-pixel text-2xl text-white before:absolute before:-left-1 before:h-full before:w-6 before:bg-button before:bg-cover before:bg-left before:bg-no-repeat before:content-[''] after:absolute after:-right-1 after:h-full after:w-6 after:bg-button after:bg-cover after:bg-right after:bg-no-repeat after:content-[''] hover:scale-110": isPrimary,
    uppercase: isString,
  }, className]);

  if (isLink) {
    return (
      <Link to={href} className={buttonClassname}>
        { children}
      </Link>
    );
  }

  return (
    <button type={isSubmit ? 'submit' : 'button'} onClick={onClick} className={buttonClassname}>
      { children}
    </button>
  );
}
