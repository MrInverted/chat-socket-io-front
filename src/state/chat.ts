import { create } from 'zustand';

type Statuses = "online" | "pending" | "offline";

interface IStore {
  id: string;
  room: string;
  rooms: string[];
  status: Statuses;
  bgColor: string;
  textColor: string;

  messages: {
    userId: string;
    text: string;
    room: string;
    login: string;
    bgColor: string;
    textColor: string;
    createdAt: string;
  }[];

  setRoom: (room: string) => void;
  setBgColor: (color: string) => void;
  setTextColor: (color: string) => void;
}

const chatStore = create<IStore>((set) => ({
  id: "",
  room: "Basic",
  status: "offline",
  messages: [],
  rooms: [],
  bgColor: "#f3e8ff",
  textColor: "#000000",

  setRoom: (room) => set(() => ({ room })),
  setBgColor: (color) => set(() => ({ bgColor: color })),
  setTextColor: (color) => set(() => ({ textColor: color })),
}))

export { chatStore };