import { useForm } from "react-hook-form";
import { chatStore } from "../state/chat";
import toast from "react-hot-toast";
import { SocketUtils } from "../socket/socketClient";
import React from "react";

interface IForm {
  room: string;
}

export const useRoomSettingsForm = () => {
  const { setRoom, room } = chatStore();
  const { handleSubmit, formState, register, trigger, getValues, setValue } = useForm<IForm>({
    mode: "onSubmit",
    defaultValues: { room }
  });

  React.useEffect(() => {
    setValue("room", room);
  }, [room])

  const onSubmitHandler = (values: IForm) => {
    setRoom(values.room);

    SocketUtils.changeRoom(values.room);

    toast.success("Settings was applied")
  };

  const onFormSubmit = handleSubmit(onSubmitHandler);

  const inputValue = getValues("room");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("room", e.target.value);
    trigger("room");
  }

  const { onChange, ...registerInput } = register("room", {
    required: { value: true, message: "Room field is empty" },
  });

  const errors = formState.errors.room?.message;


  return {
    inputValue,
    onFormSubmit, onInputChange,
    registerInput,
    errors
  }
}