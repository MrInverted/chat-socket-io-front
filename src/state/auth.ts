import { create } from "zustand";

interface IAuth {
  token: string;
  login: string;

  setToken: (token: string) => void;
  setLogin: (login: string) => void;
  logOut: () => void;
}

const authStore = create<IAuth>((set) => ({
  token: "",
  login: "",

  setToken: (token) => set(() => ({ token })),
  setLogin: (login) => set(() => ({ login })),
  logOut: () => set(() => ({ login: "", token: "" }))
}))

export { authStore };