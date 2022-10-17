import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { updateProfileInfo } from "../../utils/userService";
import "./ProfileEdit.css";

const initialProfileDataObject = {
  bio: "",
  image: "",
  twitter: "",
  instagram: "",
};

function ProfileEdit() {
  const { user } = useUser();

  const { userID } = useParams();

  let navigate = useNavigate();

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

  // console.log({ profileEdit });

  // const handleTwitterChange = (e) => {
  //   console.log({ twitter: e.target.value });
  //   setProfileEdit({
  //     ...profileEdit,
  //     socialMediaProfiles: [
  //       // ...profileEdit.socialMediaProfiles,
  //       { platform: "twitter", linkToProfile: e.target.value },
  //     ],
  //     // socialMediaProfiles: [
  //     //   {
  //     //     platform: "twitter",
  //     //     linkToProfile: e.target.value,
  //     //   },
  //     //   {
  //     //     platform: "instagram",
  //     //     linkToProfile: profileEdit.socialMediaProfiles[1].linkToProfile,
  //     //   },
  //     // ],
  //   });
  // };

  // const handleInstagramChange = (e) => {
  //   console.log({ insta: e.target.value });

  //   setProfileEdit({
  //     ...profileEdit,
  //     socialMediaProfiles: [
  //       // ...profileEdit.socialMediaProfiles,
  //       { platform: "instagram", linkToProfile: e.target.value },
  //     ],
  //   });
  //   // setProfileEdit({
  //   //   ...profileEdit,
  //   //   socialMediaProfiles: [
  //   //     ...profileEdit.socialMediaProfiles,
  //   //     {
  //   //       platform: "instagram",
  //   //       linkToProfile: e.target.value,
  //   //     },
  //   //   ],
  //   // });
  // };

  // const handleInstagramChange = (e) => {
  //   setProfileEdit({
  //     ...profileEdit,
  //     socialMediaProfiles: [
  //       {
  //         platform: "twitter",
  //         linkToProfile: profileEdit.socialMediaProfiles[0].linkToProfile,
  //       },
  //       {
  //         platform: "instagram",
  //         linkToProfile: e.target.value,
  //       },
  //     ],
  //   });
  // };

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
        {profileEdit.image ? (
          <img
            src={profileEdit.image}
            alt="profile avatar"
            className="profile"
          />
        ) : (
          <img
            src={require("../../images/default-user.png")}
            alt="profile avatar"
            className="pfp"
          />
        )}

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
          value={profileEdit.twitter}
          // onChange={(e) => handleTwitterChange(e)}
          onChange={handleChange}
        />
        <label>Instagram handle:</label>
        <input
          type="text"
          name="instagram"
          value={profileEdit.instagram}
          // onChange={(e) => handleInstagramChange(e)}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ProfileEdit;
