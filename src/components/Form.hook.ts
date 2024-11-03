import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { chatStore } from "../state/chat";
import { SocketUtils } from "../socket/socketClient";
import React from "react";
import { authStore } from "../state/auth";

interface IForm {
  text: string;
}



export const useChatForm = () => {
  const room = chatStore(selector => selector.room);
  const bgColor = chatStore(selector => selector.bgColor);
  const textColor = chatStore(selector => selector.textColor);
  const login = authStore(selector => selector.login);

  const { handleSubmit, formState, resetField, register, getValues, setValue, trigger } = useForm<IForm>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { text: "" }
  });

  const onSubmitHandler = (values: IForm) => {
    resetField("text");

    SocketUtils.sendMessage({
      text: values.text,
      login, room, bgColor, textColor
    });
  };

  const errors = formState.errors.text?.message;

  if (errors && formState.isSubmitting) toast.error(errors);

  const onSubmit = handleSubmit(onSubmitHandler);

  const { onChange, ...registerText } = register("text", {
    required: { value: true, message: "Message field is empty" }
  });

  const textValue = getValues("text");

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue("text", e.target.value);
    trigger("text");
  }



  return {
    onSubmit, onTextChange,
    registerText, textValue,
    errors
  }
}