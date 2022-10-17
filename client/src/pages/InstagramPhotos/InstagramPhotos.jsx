import React from 'react';
import './InstagramPhotos.css';
import axios from 'axios';
import {Link, useParams, useSearchParams} from 'react-router-dom';

import {instagramAccessToken, instagramMediaEdge} from "../../utils/instagramService";


function InstagramPhotos() {

const [searchParams, setSearchParams] = useSearchParams();

const [photos, setPhotos] = React.useState([]);


let getAccessToken = (searchParams) => {
    let code = searchParams.get("code")
    setPhotos(instagramMediaEdge(instagramAccessToken(code).access_token).data)
}

    React.useEffect(() => {
        getAccessToken()
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