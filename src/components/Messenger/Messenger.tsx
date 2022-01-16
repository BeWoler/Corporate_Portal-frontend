import { FC, useState, useEffect, useContext, useRef } from "react";
import { Context } from "../../index";
import { Input, Button } from "@mui/material";
import ConversationService from "../../services/ConverstionService";
import MessagesService from "../../services/MessageService";
import Conversation from "../../components/Conversation/Conversation";
import Message from "../../components/Message/Message";
import { io } from "socket.io-client";
import "./messenger.css";

const Messenger: FC = () => {
  const { store } = useContext(Context);
  const [fromFriend, setFromFriend] = useState<boolean>(false);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [currentUser, setCurrentUser] = useState(store.user);
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef<any>();
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("ws://localhost:3020");
    socket.current.on("getMessage", (data: any) => {
      setArrivalMessage({
        sender: data.sender,
        text: data.text,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", store.user.id);
  }, [store.user.id, currentChat]);

  useEffect(() => {
    ConversationService.getConversation(store.user.id).then((res) =>
      setConversations(res.data)
    );
    return () => setConversations(null);
  }, [store.user.id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, arrivalMessage, newMessage]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        await MessagesService.getMessages(currentChat._id).then((res) => {
          setMessages(res.data);
        });
      }
      return;
    };
    getMessages();
    if (currentUser.messagesFromFriend) {
      let privateMessage = currentUser.friends.find(
        (friend: any) => friend === store.user.id
      );
      setFromFriend(privateMessage === store.user.id);
    }
    if (!currentUser.messagesFromFriend) {
      setFromFriend(true);
    }
  }, [
    currentChat,
    currentUser.friends,
    store.user.id,
    currentUser.messagesFromFriend,
    arrivalMessage,
  ]);

  const sendMessage = async () => {
    const res = await MessagesService.message(
      currentChat._id,
      store.user.id,
      newMessage
    );
    await socket.current.emit("sendMessage", {
      sender: store.user,
      receiverId: currentUser._id,
      text: newMessage,
    });
    setMessages([...messages, res.data]);
    setNewMessage("");
  };

  const deleteConversation = async () => {
    await ConversationService.delete(currentChat._id);
    await ConversationService.getConversation(store.user.id).then((res) =>
      setConversations(res.data)
    );
    setCurrentChat(null);
  };

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

  return (
    <div className="messenger__box">
      <div className="messenger__conversations">
        {conversations ? (
          conversations.map((conversation) => {
            return (
              <div
                key={conversation._id}
                onClick={() => {
                  setCurrentChat(conversation);
                  setCurrentUser(
                    conversation.members.find(
                      (member: any) => member._id !== store.user.id
                    )
                  );
                }}
              >
                <Conversation conversation={conversation.members} />
              </div>
            );
          })
        ) : (
          <div className="messenger__conversations"></div>
        )}
      </div>
      <div className="messenger__chat__column">
        {currentChat ? (
          <>
            <div className="messenger__chat__user">
              <h3>
                {currentUser.firstName} {currentUser.lastName}
              </h3>
              <Button
                sx={btnStyles}
                variant="contained"
                onClick={deleteConversation}
              >
                Delete Dialog
              </Button>
            </div>
            <hr />
            <div className="messenger__chat">
              {messages
                ? messages.map((message) => {
                    return (
                      <div key={message._id} ref={scrollRef}>
                        <Message
                          message={message}
                          own={message.sender._id === store.user.id}
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <hr />
            <form className="messenger__form">
              {fromFriend ? (
                <Input
                  value={newMessage}
                  type="text"
                  placeholder="Message"
                  multiline={true}
                  sx={inputStyles}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              ) : (
                <div className="messenger__private">
                  Only friends can send messages to this user
                </div>
              )}
              {newMessage !== "" ? (
                <Button
                  variant="contained"
                  sx={btnStyles}
                  onClick={sendMessage}
                >
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
          </>
        ) : (
          <div className="messenger__choose__chat">Choose Dialog</div>
        )}
      </div>
    </div>
  );
};

export default Messenger;
