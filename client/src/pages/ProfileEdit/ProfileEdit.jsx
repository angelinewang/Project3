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
  // console.log("userID ->", userID);

  let navigate = useNavigate();

  // TODO: Upload / edit profile picture
  const [profileEdit, setProfileEdit] = useState(initialProfileDataObject);
  const [imageFile, setImageFile] = useState("");
  // console.log("profile bio", profileEdit.bio);

  useEffect(() => {
    if (!userID) {
      return;
    }
    fetch(`/api/users/${userID}`)
      .then((res) => res.json())
      .then((userData) => {
        const newUserObject = { ...initialProfileDataObject, ...userData };
        setProfileEdit(newUserObject);
        // console.log("profile bio", profileEdit.bio);
        // if (
        //   userData.bio ||
        //   userData.image ||
        //   userData.socialMediaProfiles[0].linkToProfile ||
        //   userData.socialMediaProfiles[1].linkToProfile === false
        // ) {
        // setProfileEdit({
        //   bio: "",
        //   image: "",
        //   socialMediaProfiles: [
        //     {
        //       platform: "twitter",
        //       linkToProfile: "",
        //     },
        //     {
        //       platform: "instagram",
        //       linkToProfile: "",
        //     },
        //   ],
        // });

        // if (
        //   userData.bio &&
        //   userData.image &&
        //   userData.socialMediaProfiles[0] &&
        //   userData.socialMediaProfiles[1] === undefined
        // ) {
        //   profileEdit.bio = "";
        //   profileEdit.image = "";
        //   profileEdit.socialMediaProfiles[0].linkToProfile = "";
        //   profileEdit.socialMediaProfiles[1].linkToProfile = "";
        // } else {
        //   setProfileEdit(userData);
        // }
        // setProfileEdit(userData);
        // no errors:
        // if (userData.bio === undefined) {
        //   console.log("no user bio");
        //   profileEdit.bio = "";
        //   console.log("user in state->", profileEdit);
        // } else {
        //   profileEdit.bio = userData.bio;
        //   console.log("user bio in state->", profileEdit.bio);
        // }

        // if (userData.image === undefined) {
        //   console.log("no user image");
        //   profileEdit.image = "";
        //   console.log("empty image set check->", profileEdit);
        // } else {
        //   profileEdit.image = userData.image;
        //   console.log("user image in state->", profileEdit.image);
        //   console.log("user state->", profileEdit);
        // }

        // if (userData.socialMediaProfiles[0] === undefined) {
        //   console.log("no user twitter");
        //   profileEdit.socialMediaProfiles[0].linkToProfile = "";
        //   console.log("user in state->", profileEdit);
        // } else {
        //   profileEdit.socialMediaProfiles[0].linkToProfile =
        //     userData.socialMediaProfiles[0].linkToProfile;
        //   console.log(
        //     "user twitter in state->",
        //     profileEdit.socialMediaProfiles[0].linkToProfile
        //   );
        // }

        // if (userData.socialMediaProfiles[1] === undefined) {
        //   console.log("no user instagram");
        //   profileEdit.socialMediaProfiles[1].linkToProfile = "";
        //   console.log("user in state->", profileEdit);
        // } else {
        //   profileEdit.socialMediaProfiles[1].linkToProfile =
        //     userData.socialMediaProfiles[1].linkToProfile;
        //   console.log(
        //     "user instagram in state->",
        //     profileEdit.socialMediaProfiles[1].linkToProfile
        //   );
        // }

        //
        //  let ProfileEdit.bio = userData.bio;

        // setProfileEdit({
        //   bio: userData.bio || "",
        //   image: userData.image || "",
        //   socialMediaProfiles: [
        //     {
        //       platform: "twitter",
        //       linkToProfile:
        //         userData.socialMediaProfiles[0].linkToProfile || "",
        //     },
        //     {
        //       platform: "instagram",
        //       linkToProfile:
        //         userData.socialMediaProfiles[1].linkToProfile || "",
        //     },
        //   ],
        // });

        // if (userData.bio) {
        //   setProfileEdit({
        //     ...profileEdit.bio,
        //     bio: userData.bio,
        //   });
        // } else {
        //   setProfileEdit({
        //     ...profileEdit,
        //     bio: "",
        //   });
        // }

        // if (userData.image) {
        //   return setProfileEdit({
        //     ...profileEdit.image,
        //     image: userData.image,
        //   });
        // } else {
        //   return setProfileEdit({
        //     ...profileEdit,
        //     image: "",
        //   });
        // }

        // if (userData.socialMediaProfiles) {
        //   return  setProfileEdit({
        //     ...profileEdit,
        //     socialMediaProfiles[0].linkToProfile: userData.socialMediaProfiles[0].linkToProfile
        //   });
        // } else {
        //   return setProfileEdit({
        //     ...profileEdit,
        //     image: "",
        //   });
        // }

        // setProfileEdit.image = userData.image || profileEdit.bio;

        // profileEdit.bio = "test";

        // setProfileEdit.socialMediaProfiles[0].linkToProfile =
        //   userData.socialMediaProfiles[0].linkToProfile ||
        //   profileEdit.socialMediaProfiles[0].linkToProfile;

        // setProfileEdit.socialMediaProfiles[1].linkToProfile =
        //   userData.socialMediaProfiles[1].linkToProfile ||
        //   profileEdit.socialMediaProfiles[1].linkToProfile;

        // if (
        //   // profileEdit.bio &&
        //   // profileEdit.image &&
        //   // profileEdit.socialMediaProfiles[0].linkToProfile &&
        //   // profileEdit.socialMediaProfiles[1].linkToProfile === ""
        // ) {
        //   setProfileEdit({
        //     bio: "",
        //     image: "",
        //     socialMediaProfiles: [
        //       {
        //         platform: "twitter",
        //         linkToProfile: "",
        //       },
        //       {
        //         platform: "instagram",
        //         linkToProfile: "",
        //       },
        //     ],
        //   });
        // } else {
        //   setProfileEdit(userData);
        // }
        // console.log("user data", userData);
      });
  }, [userID]);

  // const handleChange = (e) => {
  //   // console.log(e.target.files[0]);
  //   setProfileEdit({
  //     ...profileEdit,
  //     [e.target.name]: e.target.value,
  //   });
  // };

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(profileEdit);
  //   updateProfileInfo(profileEdit, userID).then((res) => {
  //     console.log("testing form data", res);
  //     navigate(`/profile/${userID}`);
  //   });

  // const [profileEdit, setProfileEdit] = useState({
  //   image: "",
  // });

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

    // console.log("profile image content", profileEdit);
    // console.log(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("check submit", profileEdit);

    // if (profileEdit.bio === "") {
    //   deleteProfileBio(profileEdit, userID).then((res) => {
    //     console.log("bio deleted", res);
    //   });
    // }

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
