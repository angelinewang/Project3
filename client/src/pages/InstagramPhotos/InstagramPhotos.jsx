import React from 'react';
import './InstagramPhotos.css';

import {instagramAccessToken, instagramMediaEdge} from "../../utils/instagramService";

function InstagramPhotos(code) {

const [photos, setPhotos] = React.useState([]);



const getAccessToken = (code) => {
    console.log(code)
    console.log(instagramAccessToken(code))
    instagramAccessToken(code)
    // setPhotos(instagramMediaEdge(instagramAccessToken(code).access_token).data)
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