import React, { useContext, useState } from "react";
import "./profilePage.scss";
import { userData } from "../../lib/dummyData";
import List from "../../components/list/List";
import Chat from "../../components/chat/Chat";
import { MessageSquareText } from "lucide-react";
import apiRequest from "../../lib/apiRequest";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const posts = useLoaderData();
  // console.log(posts);

  const [msgActive, setMsgActive] = useState(false);
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleChatActive = () => {
    setMsgActive(!msgActive);
  };

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      // localStorage.removeItem("user");
      updateUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update profile</button>
            </Link>
          </div>
          <div className="info">
            <div className="user-info">
              <img
                src={currentUser.avatar || userData.img}
                alt="Profile image"
              />
              <div className="userName">
                <span>{currentUser.username}</span>
                <span>{currentUser.email}</span>
              </div>
            </div>
            <MessageSquareText
              className="msg-icon"
              onClick={() => {
                setMsgActive(!msgActive);
              }}
            />
            <div className="logout-btn">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/addpost">
              <button>Crete new post</button>
            </Link>
          </div>
          <List posts={posts.postPromise.data.userPosts} />
          <div className="title">
            <h1>Saved list</h1>
          </div>
          <List posts={posts.postPromise.data.savedPosts} />
        </div>
      </div>
      <div className={`chatContainer ${msgActive ? "msg-active" : ""}`}>
        <div className="wrapper">
          <Chat chats={posts.chatPromise.data} onClose={toggleChatActive} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
