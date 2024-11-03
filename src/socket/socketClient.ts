import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { chatStore } from "../state/chat";

const socket = io(`${import.meta.env.VITE_SERVER_URL}`, {});

socket.on("connect", () => {
  toast.success("Connection established");
  chatStore.setState({ id: socket.id });
  chatStore.setState({ status: "online" });
});

socket.on("disconnect", () => {
  toast.error("Disconnected");
  chatStore.setState({ status: "offline" });
});

socket.on("connect_error", (error) => {
  if (socket.active) {
    chatStore.setState({ status: "pending" });
    toast.error("Error, reconnecting...");
  } else {
    toast.error("Disconnected");
    console.log({ connect_error: error });
  }
});

// ------------------

socket.once("init", (inc,) => {
  chatStore.setState({ messages: inc })
});

socket.on("server", (inc) => {
  chatStore.setState({ messages: inc });
  console.log(inc);
});

socket.on("server-error", (inc,) => {
  toast.error(inc);
});

socket.on("rooms", (inc: string[]) => {
  if (inc) chatStore.setState({ rooms: inc.map(item => item) });
  console.log(inc);
})

interface ISend {
  login: string;
  text: string;
  room: string;
  textColor: string;
  bgColor: string;
};

class SocketUtils {
  public static sendMessage(inc: ISend) {

    const sending = new Promise<void>((resolve, reject) => {
      socket.emit("client", inc);

      socket.on("server", () => resolve());

      setTimeout(() => reject(), 2000);
    });

    toast.promise(sending, {
      loading: "Sending message...",
      success: "Sending message - success!",
      error: "Sending message - error!"
    });

  };



  public static changeRoom(room: string) {

    const changing = new Promise<void>((resolve, reject) => {
      socket.emit("change-room", room);

      socket.on("server", () => resolve());

      setTimeout(() => reject(), 2000);
    });

    toast.promise(changing, {
      loading: "Changing room...",
      success: "Changing room - success!",
      error: "Changing room - error!"
    });

  };
};


export { SocketUtils, socket };