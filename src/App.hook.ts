import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useMatch } from "react-router-dom";
import { authStore } from "./state/auth";

interface IResponse {
  success: boolean;
  token: string;
  user: {
    login: string;
  }
}

export const useAppAuth = () => {
  const navigate = useNavigate();
  const isIndexUrl = useMatch("/");
  const { token, setLogin, setToken } = authStore();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const localStorageToken = window.localStorage.getItem("token");

        const isTryingToIndexWithoutToken = isIndexUrl && !token && !localStorageToken;

        if (isTryingToIndexWithoutToken) return navigate("/login");

        const { data } = await axios.get<IResponse>(`${import.meta.env.VITE_SERVER_URL}/me`, {
          headers: { Authorization: localStorageToken }
        })

        if (!data.success) return navigate("/login");

        setToken(data.token);
        setLogin(data.user.login);

        toast.success("Loginning was successful");

        return navigate("/");
      }

      catch (error) {
        console.warn(error);
        return navigate("/login");
      }

      finally {
        setIsLoading(false);
      }
    })();
  }, [token])



  return { isLoading }
}