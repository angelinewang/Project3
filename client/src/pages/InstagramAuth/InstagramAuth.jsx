import React from 'react';
import './InstagramAuth.css';
import axios from 'axios';
import {Link, useParams, useSearchParams} from 'react-router-dom';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import TokenService from "../../utils/tokenService";
// import { getBlog } from "../../utils/blogService";
import HTMLReactParser from 'html-react-parser';
import { removeABlog } from "../../utils/blogService";

function InstagramAuth() {

window.location.replace("https://api.instagram.com/oauth/authorize?client_id=6002320329798591&redirect_uri=https://celebrated-salmiakki-a8925d.netlify.app/instagram/photos&scope=user_profile,user_media&response_type=code")

// const [searchParams, setSearchParams] = useSearchParams();


// let getAuthToken = () => {
    

// }

    // React.useEffect(() => {
    //     getAuthToken()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //  },[])

//     return (
       
//         <div>
//      <Link to="https://api.instagram.com/oauth/authorize
//   ?client_id=6002320329798591
//   &redirect_uri=https://celebrated-salmiakki-a8925d.netlify.app/instagram/photos
//   &scope=user_media
//   &response_type=code"> Click here to authorise your Instagram! </Link>
//     </div>

//     )
};

export default InstagramAuth