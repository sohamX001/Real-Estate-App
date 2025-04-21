import React, { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { userData } from "../../lib/dummyData";
import { MessageSquareText, Reply, X } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Chat({ chats, onClose }) {
  const [chat, setChat] = useState(null);
  // const [msgActive, setMsgActive] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  // console.log(chat);


  const msgEndRef = useRef();

  const decrease = useNotificationStore((state) => state.decrease);
  

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat])

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest(`/chats/${id}`);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      console.log("API Response:", res.data);
      // setChat({...res.data, receiver});
      setChat({ ...res.data, receiver, messages: res.data.Message || [] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setChat(true);

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;

    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="chat">
      {/* <button onClick={testSocket}>Test here</button> */}
      <div className="msg-container">
        <h1>Messages</h1>
        {/* <MessageSquareText className="msg-icon" onClick={()=>{}}/> */}
        <X className="msg-close" onClick={onClose}/>
        <div className="messages">
          {chats?.map((c) => (
            <div
              className="message"
              key={c.id}
              style={{
                backgroundColor: c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
              }}
              // onClick={() => handleOpenChat(c.id, c.receiver)}
            >
              <img
                src={c.receiver.avatar || userData.img}
                alt="profile image"
              />
              {/* <img src={userData.img} alt="profile image" /> */}
              <div className="msg-text">
                <span>{c.receiver.username || userData.name}</span>
                {/* <span>{userData.name}</span> */}
                <p>{c.lastMessage}</p>
              </div>
              <Reply
                className="replyMsg-icon"
                onClick={() => handleOpenChat(c.id, c.receiver)}
              />
            </div>
          ))}
        </div>
      </div>

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              {/* <img src={chat.receiver.avatar || userData.img} alt="" />
              <span>{chat.receiver.username || userData.name}</span> */}
              {/* FIXED: Added null check for chat.receiver before accessing .avatar */}
              <img
                src={
                  chat.receiver && chat.receiver.avatar
                    ? chat.receiver.avatar
                    : userData.img
                }
                alt=""
              />
              {/* FIXED: Added null check for chat.receiver before accessing .username */}
              <span>
                {chat.receiver && chat.receiver.username
                  ? chat.receiver.username
                  : userData.name}
              </span>
            </div>
            <X className="close" onClick={() => setChat(null)} />
          </div>

          <div className="center">
            {chat?.messages.map((m) => (
              <div
                className="chatMessage"
                key={m.id}
                style={{
                  alignSelf:
                    m.userId === currentUser.id ? "flex-end" : "flex-start",
                  textAlign: m.userId === currentUser.id ? "right" : "left",
                }}
              >
                <p>{m.text}</p>
                <span>{format(m.createdAt)}</span>
              </div>
            ))}
            <div ref={msgEndRef}></div>
          </div>

          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text" id=""></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
