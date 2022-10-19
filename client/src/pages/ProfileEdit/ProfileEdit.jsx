import React, { useState, useEffect } from "react";
// import useUser from "../../hooks/useUser";
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
  // const { user } = useUser();

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
    <section>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="profile-edit-form">
          <label>Bio:</label>
          <input
            className="edit-input bio"
            type="text"
            name="bio"
            value={profileEdit.bio}
            onChange={handleChange}
          />

          <label>Profile picture:</label>
          <div className="profile-picture">
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
          </div>

          <input
            type="file"
            name="image"
            accept="image/*"
            value={imageFile}
            onChange={handleChange}
          />

          <label>www.twitter.com/</label>
          <input
            className="edit-input"
            type="text"
            name="twitter"
            value={profileEdit.twitter}
            onChange={handleChange}
          />
          <label>www.instagram.com/</label>
          <input
            className="edit-input"
            type="text"
            name="instagram"
            value={profileEdit.instagram}
            onChange={handleChange}
          />
          <button className="form-submit">Submit</button>
        </form>
      </div>
    </section>
  );
}

export default ProfileEdit;