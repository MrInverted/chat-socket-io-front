import { authStore } from '../state/auth';
import { chatStore } from '../state/chat'
import Message from './Message'

function Chat() {
  const id = chatStore(selector => selector.id);
  const messages = chatStore(selector => selector.messages);
  const login = authStore(selector => selector.login);

  return (
    <div className='border border-gray-500 rounded-lg overflow-x-hidden overflow-y-auto max-h-96'>
      <ul className='p-4 flex flex-col gap-2 min-h-48'>
        {(!messages || !messages.length) && <span className='text-center'>Chat is empty</span>}

        {messages.map((item, index) => {
          const isYours = item.userId === id || item.login === login;
          const date = new Date(item.createdAt);

          return <Message
            text={item.text}
            whos={isYours ? "mine" : "someones"}
            login={item.login}
            date={date.toLocaleString()}
            bgColor={item.bgColor}
            textColor={item.textColor}
            key={index}
          />
        })}
      </ul>
    </div>
  )
}

export default Chat