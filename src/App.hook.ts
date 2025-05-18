import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { useNavigate, useMatch } from "react-router-dom";
import { authStore } from "./state/auth";

interface IResponse {
  success: boolean;
  token: string;
  user: {
    login: string;
  }
}

export const useAppAuth = () => {
  const { token, setLogin, setToken } = authStore();
  const [status, setStatus] = React.useState<"init" | "loading" | "error" | "ok">("init");

  React.useEffect(() => {
    (async () => {
      try {
        setStatus("loading");

        const localStorageToken = window.localStorage.getItem("token");

        if (!localStorageToken) return setStatus("error");

        const { data } = await axios.get<IResponse>(`${import.meta.env.VITE_SERVER_URL}/me`, {
          headers: { Authorization: localStorageToken }
        })

        if (!data.success) return setStatus("error");

        setToken(data.token);
        setLogin(data.user.login);
        setStatus("ok");

        toast.success("Loginning was successful");
      }
      catch (error) {
        setStatus("error");
        console.warn(error);
      }
    })();
  }, [token])



  return { status }
}