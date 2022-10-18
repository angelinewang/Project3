import React from 'react';
import './InstagramPhotos.css';

import {instagramAccessToken, instagramMediaEdge} from "../../utils/instagramService";

function InstagramPhotos(code) {

const [photos, setPhotos] = React.useState([]);

const getAccessToken = (code) => {
    // console.log(code)
    // console.log(instagramAccessToken(code))
    // instagramAccessToken(code)
    setPhotos(instagramMediaEdge("IGQVJYeUtRVkRVMl9HZAGhOUGU4WjFsaXFQdUhEbk95MnNsclFPWm4xZAGdBUFhFQ09hZAG1TN2J5d1UySk95MWZAIWWV0RFpqZAmF0bjlvNWtMZAzNhYTV5MjVwSUJRNlFsaUtIYVZAoNzNyS3h0Y2RON190d2FCMHRQOXJkX3lv").data)
    const images = photos.filter(photo => photo.media_type === "IMAGE")
    setPhotos(images)
}   

    React.useEffect(() => {
        getAccessToken(code)
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