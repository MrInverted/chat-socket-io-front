import { Button, Input } from "antd";
import { useRoomSettingsForm } from "./ChangeRoom.hook";



function ChangeRoom() {
  const { onFormSubmit, onInputChange, registerInput, inputValue, errors } = useRoomSettingsForm();

  return (
    <>
      <form onSubmit={onFormSubmit} className="border-t border-gray-500 pt-3 mt-5">
        <div className="flex gap-3">
          <Input
            size="large"
            placeholder="room"
            value={inputValue}
            onChange={onInputChange}
            {...registerInput}
          />

          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="flex-shrink-0"
          >
            Change room
          </Button>
        </div>

        {errors && <div className="text-center mt-2 text-red-700 font-bold">{errors}</div>}
      </form>
    </>

  )
}

export default ChangeRoom