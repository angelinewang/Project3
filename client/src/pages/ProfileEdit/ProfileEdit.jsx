import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import { addProfileInfo } from "../../utils/userService";
import "./ProfileEdit.css";

function ProfileEdit() {
  const { user } = useUser();

  // TODO: Upload / edit profile picture
  // TODO: Upload / edit bio

  const [profileEdit, setProfileEdit] = useState({
    bio: "",
    twitterHandle: "",
    instagramHandle: "",
  });

  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    setProfileEdit({
      ...profileEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // let formData = new FormData();
    // formData.append("bio", e.target.value);
    // formData.append("image", e.target.files[0]);
    // formData.append("twitterHandle", e.target.value);
    // formData.append("instagramHandle", e.target.value);

    addProfileInfo(profileEdit).then((res) => {
      console.log("testing form data", res.data);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <label>Bio:</label>
        <input
          type="text"
          name="bio"
          value={profileEdit.bio}
          onChange={handleChange}
        />
        {/* 
        <label>Profile picture:</label>
        <input
          type="file"
          name="image"
          value={profileEdit.image}
          className="pfp"
          onChange={handleChange}
        />
        <button>Upload photo</button> */}

        <label>Twitter handle:</label>
        <input
          type="text"
          name="twitterHandle"
          value={profileEdit.twitterHandle}
          onChange={handleChange}
        />
        <label>Instagram handle:</label>
        <input
          type="text"
          name="instagramHandle"
          value={profileEdit.instagramHandle}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ProfileEdit;
