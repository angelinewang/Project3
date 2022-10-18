import React from 'react';
import './InstagramPhotos.css';

// import {instagramMediaEdge} from "../../utils/instagramService";

function InstagramPhotos(code) {

const [photos, setPhotos] = React.useState([]);

// const getAccessToken = (code) => {
//     // console.log(code)
//     // console.log(instagramAccessToken(code))
//     // instagramAccessToken(code)
//     setPhotos(instagramMediaEdge("IGQVJYeUtRVkRVMl9HZAGhOUGU4WjFsaXFQdUhEbk95MnNsclFPWm4xZAGdBUFhFQ09hZAG1TN2J5d1UySk95MWZAIWWV0RFpqZAmF0bjlvNWtMZAzNhYTV5MjVwSUJRNlFsaUtIYVZAoNzNyS3h0Y2RON190d2FCMHRQOXJkX3lv").data)
//     const images = photos.filter(photo => photo.media_type === "IMAGE")
//     setPhotos(images)
// }   


//   async function getBlogs() {
//     try {
//       const response = await fetch("/api/blogs");
//       const blogs = await response.json();
//       setBlogs(blogs);
//     } catch (err) {
//       console.log(err);
//     }
//   }


async function instagramAccessToken () {
  try {
    const res = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     Authorization: "Bearer " + token,
    //   },
      body: JSON.stringify({
        mode: "no-cors",
        client_id: `6002320329798591`,
        grant_type: `authorization_code`,
        client_secret: `f3a3601c3603c3ec30a8c73939de20e4`,
        scope: ["user_media"],
        redirect_uri: `https://celebrated-salmiakki-a8925d.netlify.app/instagram/photos/`,
        code: "AQB8CQ2MX2QBVh8xHKyJyNy8vsmFbkIF5xtYSETwQqkALtRf5FykbMiw1zbmW_hCGzX9w1Z_LL4ZX8XY0x2pCB5VAJWeYZi1_Hk21UQtlGsG0QYTPo50ttIB_fs_VUAoNipAqWpl1PSx_KOKagMzS5VhYX_nQkNEPIVc8pYwWfdU1NzUhOWf_At9yRAjiiQZF2d6K3ip8mDcZgLGg0kNUuYqS2owaRW4caRpq8ShlqzC3w",
        //Fill in "code"
        //Fill in "redirect_uri"
      }),
    });
    const photos = await res.json();
    setPhotos(photos)
        const images = photos.filter(photo => photo.media_type === "IMAGE")
    setPhotos(images)
    //Returned user-id and access-token will be used to query the user node
  } catch (error) {
    console.log(error);
  }
};


    React.useEffect(() => {
        instagramAccessToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])

    return (
       
        <div>
  {
    photos.map((photo) => { return (<>
        <img src={photo.media_url} alt={photo.caption} />
        <p>{photo.caption}</p>
        </>)
    })
  }
    </div>

    )
};

export default InstagramPhotos