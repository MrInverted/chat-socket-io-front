import Form from "../components/Form";
import Chat from "../components/Chat";
import Rooms from "../components/Rooms";
import PersonalInfo from "../components/PersonalInfo";

function MainPage() {
  return (
    <>
      <h1 className="text-xl font-bold text-center mb-5">
        <span className="block">React</span>
        <span className="block">Express + Socket.io</span>
        <span className="block">Sequilize + Sqlite</span>
      </h1>

      <PersonalInfo />
      <Chat />
      <Form />
      <Rooms />
    </>
  )
}

export default MainPage