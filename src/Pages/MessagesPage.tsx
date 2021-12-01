import { FC } from 'react'
import { socketConnection } from "../socket/socket"

const MessagesPage: FC = () => {
  return (
    <div className="messages__container">
      <button onClick={() => {
        socketConnection();
      }}>Connect</button>
      <div className="messages__user__column"></div>
      <div className="messages__chat__column"></div>
    </div>
  )
}

export default MessagesPage
