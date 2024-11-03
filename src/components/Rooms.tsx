import { Button } from 'antd';
import { SocketUtils } from '../socket/socketClient';
import { chatStore } from '../state/chat';
import ChangeRoom from './ChangeRoom';

function Rooms() {
  const setRoom = chatStore((selector) => selector.setRoom);
  const rooms = chatStore((selector) => selector.rooms);

  const onRoomClick = (room: string) => {
    setRoom(room);
    SocketUtils.changeRoom(room);
  }

  return (
    <div className='p-4 border border-gray-500 rounded-lg mt-5'>
      <ul className='flex flex-wrap gap-2'>
        {rooms?.map((room) => (
          <li key={room}>
            <Button
              onClick={() => onRoomClick(room)}
            >{room}</Button>
          </li>
        ))}
      </ul>

      <ChangeRoom />
    </div>
  )
}

export default Rooms