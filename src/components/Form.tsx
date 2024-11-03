import { Button, Input } from "antd";
import { useChatForm } from "./Form.hook";


function Form() {
  const { onSubmit, onTextChange, textValue, registerText, errors } = useChatForm();

  return (
    <>
      <form onSubmit={onSubmit} className="p-4 border border-gray-500 rounded-lg mt-5">
        <div className="flex flex-col gap-3">

          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 10 }}
            value={textValue}
            onChange={onTextChange}
            {...registerText}
          />

          <Button
            type="primary"
            htmlType="submit"
            size="large"
          >Send message</Button>
        </div>

        {errors && <div className="text-center mt-2 text-red-700 font-bold">{errors}</div>}
      </form>
    </>

  )
}

export default Form