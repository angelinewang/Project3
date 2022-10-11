import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { updateProfileInfo } from "../../utils/userService";
import "./ProfileEdit.css";

function ProfileEdit() {
  const { user } = useUser();

  const { userID } = useParams();
  // console.log("userID ->", userID);

  let navigate = useNavigate();

  // TODO: Upload / edit profile picture

  const [profileEdit, setProfileEdit] = useState({
    bio: "",
    image: "",
    socialMediaProfiles: [
      {
        platform: "twitter",
        linkToProfile: "",
      },
      {
        platform: "instagram",
        linkToProfile: "",
      },
    ],
  });

  useEffect(() => {
    if (!userID) {
      return;
    }
    fetch(`/api/users/${userID}`)
      .then((res) => res.json())
      .then((userData) => {
        setProfileEdit(userData);
        console.log(userData);
      });
  }, [userID]);

  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    setProfileEdit({
      ...profileEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleTwitterChange = (e) => {
    setProfileEdit({
      ...profileEdit,
      socialMediaProfiles: [
        {
          platform: "twitter",
          linkToProfile: e.target.value,
        },
        {
          platform: "instagram",
          linkToProfile: profileEdit.socialMediaProfiles[1].linkToProfile,
        },
      ],
    });
  };
  const handleInstagramChange = (e) => {
    setProfileEdit({
      ...profileEdit,
      socialMediaProfiles: [
        {
          platform: "twitter",
          linkToProfile: profileEdit.socialMediaProfiles[0].linkToProfile,
        },
        {
          platform: "instagram",
          linkToProfile: e.target.value,
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profileEdit);
    updateProfileInfo(profileEdit, userID).then((res) => {
      console.log("testing form data", res);
      navigate(`/profile/${userID}`);
    });

    //! not working
    // let formData = new FormData();
    // formData.append("bio", profileEdit.value);
    // formData.append("image", profileEdit.files[0]);
    // formData.append("twitterHandle", profileEdit.value);
    // formData.append("instagramHandle", profileEdit.value);
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

        <label>Profile picture:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          value={profileEdit.image}
          className="pfp"
          onChange={handleChange}
        />
        <button>Upload photo</button>

        <label>Twitter handle:</label>
        <input
          type="text"
          name="twitter"
          value={profileEdit.socialMediaProfiles[0].linkToProfile}
          onChange={handleTwitterChange}
        />
        <label>Instagram handle:</label>
        <input
          type="text"
          name="instagram"
          value={profileEdit.socialMediaProfiles[1].linkToProfile}
          onChange={handleInstagramChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ProfileEdit;
