import React from 'react';
import './InstagramPhotos.css';

import {useParams} from 'react-router-dom';
import {useQueryParams, StringParam, BooleanParam} from 'use-query-params';

import {instagramAccessToken, instagramMediaEdge} from "../../utils/instagramService";

function InstagramPhotos() {

const [photos, setPhotos] = React.useState([]);

const [search
     // eslint-disable-next-line react-hooks/exhaustive-deps
   ] = useQueryParams({code: StringParam})

const getAccessToken = (code) => {
    setPhotos(instagramMediaEdge(instagramAccessToken(code).access_token).data)
}

    React.useEffect(() => {
        getAccessToken(search.get('code'))
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