import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { authStore } from "../state/auth";

interface IFields {
  login: string;
  password: string;
}

interface IProps {
  type: "login" | "register";
}

interface IResponse {
  success: boolean;
  token: string;
  user: {
    login: string;
  }
}



export const useAuthForm = ({ type }: IProps) => {
  const {
    handleSubmit,
    register,
    formState,
    clearErrors,
    setError,
    setValue,
    getValues,
    trigger,
    reset
  } = useForm<IFields>({
    mode: "all",
    defaultValues: { login: "", password: "" }
  })

  const navigate = useNavigate();

  const { setToken, setLogin } = authStore();

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmitHandler = async (inc: IFields) => {
    try {
      setIsLoading(true);
      const { login, password } = inc;
      const { data } = await axios.post<IResponse>(`${import.meta.env.VITE_SERVER_URL}/${type}`, { login, password });
      const { success, token, user } = data;
      if (!success) return setError("root", { message: "Something wrong with server's success message" });
      setToken(token);
      setLogin(user.login);
      window.localStorage.setItem("token", token);
      toast.success("Loginning was successful");
      navigate("/");
      reset();
    } catch (e) {
      const error = e as AxiosError<{ err: string }>;
      const message = error.response?.data.err;
      if (message) setError("root", { message });
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    reset();
  }, [type])

  const isError = formState.errors.login?.message ||
    formState.errors.password?.message ||
    formState.errors.root?.message;

  const { onChange: a, ...registerLogin } = register("login", {
    required: { value: true, message: "Login field is required" },
    minLength: { value: 3, message: "Login length should be at least 3 chars" },
  })

  const { onChange: b, ...registerPassword } = register("password", {
    required: { value: true, message: "Password field is required" },
    minLength: { value: 6, message: "Password length should be at least 6 chars" },
  })

  const onSubmit = handleSubmit(onSubmitHandler);

  const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("login", e.target.value);
    clearErrors("root");
    trigger("login");
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("password", e.target.value);
    clearErrors("root");
    trigger("password");
  };



  return {
    onSubmit, onLoginChange, onPasswordChange,
    registerPassword, registerLogin,
    getValues,
    isLoading, isError
  }
}