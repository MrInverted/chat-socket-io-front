import classNames from "classnames";

interface IProps {
  text: string;
  whos: 'mine' | 'someones';
  login: string;
  date: string;
  textColor?: string;
  bgColor?: string;
}

function Message({ text, whos, login, date, textColor, bgColor }: IProps) {
  const liClass = classNames('w-5/6 relative text-base', whos === "mine" ? 'self-end' : 'self-start');
  const spanClass = classNames('text-md block p-3 rounded-lg', whos === "mine" ? 'bg-yellow-100' : 'bg-purple-100');

  return (
    <li className={liClass}>
      <span className={spanClass} style={{ backgroundColor: bgColor, color: textColor }}>
        {text}
      </span>

      <span className="absolute top-0 right-1 text-xs">{login}</span>
      <span className="absolute bottom-0 right-1 text-xs">{date}</span>
    </li>
  )
}

export default Message