import { Button, ColorPicker } from "antd";
import { authStore } from "../state/auth";
import { chatStore } from "../state/chat";

function PersonalInfo() {
  const { login, logOut } = authStore();
  const id = chatStore(selector => selector.id);
  const room = chatStore(selector => selector.room);
  const status = chatStore(selector => selector.status);
  const setBgColor = chatStore(selector => selector.setBgColor);
  const setTextColor = chatStore(selector => selector.setTextColor);

  const onLogoutClick = () => {
    logOut();
    localStorage.removeItem("token");
  }

  return (
    <div className='p-4 border border-gray-500 rounded-lg mb-5'>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-base">Login: <b>{login}</b></p>
          <Button type="default" onClick={onLogoutClick}>Log-out</Button>
        </div>

        <p className="text-base">Status: <b>{status}</b></p>
        <p className="text-base">Client ID: <b>{id}</b></p>
        <p className="text-base">Room: <b>{room}</b></p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-base">Background</p>
            <ColorPicker defaultValue={"#f3e8ff"} onChangeComplete={(e) => setBgColor(e.toHexString())} format="hex" />
          </div>

          <div className="flex items-center flex-row-reverse gap-4">
            <p className="text-base">Text</p>
            <ColorPicker defaultValue={"#000000"} onChangeComplete={(e) => setTextColor(e.toHexString())} format="hex" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default PersonalInfo