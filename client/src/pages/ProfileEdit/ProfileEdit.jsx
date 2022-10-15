import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { updateProfileInfo } from "../../utils/userService";
import "./ProfileEdit.css";

const initialProfileDataObject = {
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
};

function ProfileEdit() {
  const { user } = useUser();

  const { userID } = useParams();

  let navigate = useNavigate();

  // TODO: Upload / edit profile picture
  const [profileEdit, setProfileEdit] = useState(initialProfileDataObject);
  const [imageFile, setImageFile] = useState("");

  useEffect(() => {
    if (!userID) {
      return;
    }
    fetch(`/api/users/${userID}`)
      .then((res) => res.json())
      .then((userData) => {
        const newUserObject = { ...initialProfileDataObject, ...userData };
        setProfileEdit(newUserObject);
      });
  }, [userID]);

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

  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  }

  const handleChange = async (e) => {
    // console.log(e.target.files[0]);

    // If there is an image then we'll want to convert to a Base64
    // - have conditional to test for image

    // console.log(e.target); -> to get the name of image in console write: temp1['name']
    if (e.target["name"] === "image") {
      setImageFile(e.target.value);
      const imageURL = await getBase64(e.target.files[0]);
      setProfileEdit({
        ...profileEdit,
        image: imageURL,
      });
    } else {
      setProfileEdit({
        ...profileEdit,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfileInfo(profileEdit, userID).then((res) => {
      console.log("profile info at submit", profileEdit);
      console.log("testing form data", res);
      navigate(`/profile/${userID}`);
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

        <label>Profile picture:</label>
        <img src={profileEdit.image} alt="profile avatar" className="profile" />
        <input
          type="file"
          name="image"
          accept="image/*"
          value={imageFile}
          onChange={handleChange}
        />

        <label>Twitter handle:</label>
        <input
          type="text"
          name="twitter"
          value={profileEdit?.socialMediaProfiles[0]?.linkToProfile || ""}
          onChange={handleTwitterChange}
        />
        <label>Instagram handle:</label>
        <input
          type="text"
          name="instagram"
          value={profileEdit?.socialMediaProfiles[1]?.linkToProfile || ""}
          onChange={handleInstagramChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ProfileEdit;
