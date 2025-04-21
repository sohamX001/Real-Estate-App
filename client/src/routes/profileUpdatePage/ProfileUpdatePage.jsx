import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { userData } from "../../lib/dummyData.js";
import apiRequest from "../../lib/apiRequest.js";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget.jsx";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });
      updateUser(res.data);
      navigate("/profile");
      // console.log(res.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Update Profile</h1>
            <div className="item">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                defaultValue={currentUser.username}
              />
            </div>
            <div className="item">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={currentUser.email}
              />
            </div>
            <div className="item">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" />
            </div>
            <button>Update</button>
            {error && <span>{error}</span>}
          </form>
        </div>

        <div className="sideContainer">
          <img
            src={avatar[0] || currentUser.avatar || userData.img}
            alt="Profile image"
            className="avatar"
          />
          <UploadWidget
            className="uploadWidget"
            uwConfig={{
              cloudName: "shmx001",
              uploadPreset: "HomeTrail",
              multiple: false,
              maxImageFileSize: 5000000,
              folder: "avatars",
            }}
            setState={setAvatar}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
