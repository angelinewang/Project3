import React from 'react';
import './InstagramPhotos.css';
import {useQueryParams, StringParam} from 'use-query-params';

import {instagramAccessToken, instagramMediaEdge} from "../../utils/instagramService";

function InstagramPhotos() {

const [photos, setPhotos] = React.useState([]);

const [search
     // eslint-disable-next-line react-hooks/exhaustive-deps
   ] = useQueryParams({code: StringParam})

const getAccessToken = (code) => {
    console.log(search.code)
    setPhotos(instagramMediaEdge(instagramAccessToken(code).access_token).data)
}

    React.useEffect(() => {
        getAccessToken(search.code)
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