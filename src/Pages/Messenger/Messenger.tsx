import { FC, useState, useEffect, useContext, useRef } from "react";
import { Context } from "../../index";
import "./messenger.css";
import { socketConnection } from "../../socket/socket";
import { Input, Button } from "@mui/material";
import ConversationService from "../../services/ConverstionService";
import MessagesService from "../../services/MessageService";
import Conversation from "../../components/Conversation/Conversation";
import Message from "../../components/Message/Message";

const Messenger: FC = () => {
  const { store } = useContext(Context);
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState<string>("");
  const [currentChat, setCurrentChat] = useState<string>("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef<any>();
  const inputStyles = {
    margin: "1rem 1rem",
    width: "80%",
    ":after": { borderBottom: "2px solid #534ED9" },
  };
  const btnStyles = {
    margin: "0 1rem 0 0",
    fontSize: ".7rem",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  const getMessages = async (currentChat: string) => {
    await MessagesService.getMessages(currentChat).then((res) => {
      setMessages(res.data);
    });
  };

  const sendMessage = async () => {
    await MessagesService.message(currentChat, store.user.id, message);
    setMessage("");
  };

  useEffect(() => {
    socketConnection();
    ConversationService.getConversation(store.user.id).then((res) =>
      setConversations(res.data)
    );
    return () => setConversations(null);
  }, [store.user.id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messenger__container">
      <h2 className="messenger__title">Messages</h2>
      <div className="messenger__box">
        <div className="messenger__conversations">
          {conversations
            ? conversations.map((conversation) => {
                return (
                  <div
                    key={conversation._id}
                    onClick={() => {
                      setCurrentChat(conversation._id);
                      getMessages(conversation._id);
                    }}
                  >
                    <Conversation conversation={conversation.members} />
                  </div>
                );
              })
            : null}
        </div>
        <div className="messenger__chat__column">
          <div className="messenger__chat">
            {messages
              ? messages.map((message) => {
                  return (
                    <div key={message._id} ref={scrollRef}>
                      <Message
                        text={message.text}
                        own={message.sender._id === store.user.id}
                        sender={message.sender}
                      />
                    </div>
                  );
                })
              : null}
          </div>
          <hr />
          <form className="messenger__form">
            <Input
              value={message}
              type="text"
              placeholder="Message"
              multiline={true}
              sx={inputStyles}
              onChange={(e) => setMessage(e.target.value)}
            />
            {message !== "" ? (
              <Button variant="contained" sx={btnStyles} onClick={sendMessage}>
                Send
              </Button>
            ) : (
              <Button
                disabled
                variant="contained"
                sx={btnStyles}
                onClick={sendMessage}
              >
                Send
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
