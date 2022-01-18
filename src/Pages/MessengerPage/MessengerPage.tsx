import { FC } from "react";
import Messenger from "../../components/Messenger/Messenger";
import "./messengerPage.sass";

const MessengerPage: FC = () => {
  return (
    <div className="messengerPage__container">
      <h2 className="messengerPage__title">Messages</h2>
      <Messenger />
    </div>
  );
};

export default MessengerPage;
