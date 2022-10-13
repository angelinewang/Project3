import { useParams } from "react-router-dom"
// import userService from "../../utils/userService.js"
import React from "react";
import {Link} from "react-router-dom";

import TokenService from '../../utils/tokenService';

export default function UserBlogs() {

    const [user, setUser] = React.useState(null)

    console.log(TokenService.getUserFromToken().blogs)
    const id = useParams().id
    let fetchUser = () => {
        console.log("Reached fetchUser function!")
        console.log(id)
        let res = TokenService.getUserFromToken()
        
        console.log(res);
        setUser(res)
    }

    React.useEffect(() => {
        fetchUser()
     })
    
    return (
        user ? ( 
            user.blogs ? 
            (<ul>{user.blogs.map(((blog) =>(<Link to={`/detail/${blog._id}`}><li className="message is-link" key={blog._id}>{blog.title}</li></Link>)))}</ul>
            )
        :null ): null
    )
}