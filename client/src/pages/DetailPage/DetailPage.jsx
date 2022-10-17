import React from 'react';
import './DetailPage.css';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TokenService from "../../utils/tokenService";
import blogService from "../../utils/blogService";
import HTMLReactParser from 'html-react-parser';


function DetailPage() {

    const id = useParams().id

    const [blog, setBlog] = React.useState(!!blogService.getBlog(id))

    var MySwal = withReactContent(Swal)

    const [comment, setComment] = React.useState(!!blog)

    const [isAuthor, setIsAuthor] = React.useState(!!TokenService.getUserFromToken())
    const [isUser, setIsUser] = React.useState(!!blog)

    let fetchBlog = () => {
        console.log("Reached fetchBlog function!")
        console.log(id)
        blogService.getBlog(id).then((res) => {console.log(res); setBlog(res)
        if(TokenService.getUserFromToken()._id) {
            setIsUser(true)
            if(blog.author) {
                console.log(TokenService.getUserFromToken()._id)
                console.log(blog.author._id)
                if(TokenService.getUserFromToken()._id === blog.author._id) {
                    setIsAuthor(true)
                }
            }
           
    }
        })
}

    React.useEffect(() => {
        fetchBlog()
        // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])

    let deleteBlog = () => {
        
        axios.delete(`api/blogs/${id}`)
        .then(res => console.log(res.data)) 
        .then(() =>  {MySwal.fire({
                title: <strong>Blog Deleted!</strong>,
                html: <i>Your blog was deleted</i>,
                icon: 'success'
            })
        })
        .then(() => {fetchBlog()})
    }

    let handleChange = (e) => {
        setComment(`${e.target.value}`)
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        console.log('comment was submitted!')
        axios.patch(`api/blogs/${id}`, comment)
        .then((res) => {
            console.log(res.data)
            fetchBlog()
        })
    }

    return (
       
        <div>
        {blog ? 
        (
            <article className="message is-primary" key={blog._id}>
                <div className="message-header">

                    {blog.image ? (<img src={blog.image} alt={blog.title}/>) : null}
                    <h3 className="title">{blog.title}</h3>
                    <h4 className="description">{blog.description} </h4>
                </div>
                <div className="detail-box">
                    <div className="message-body">
                        <div>{HTMLReactParser(blog.content || "")}</div>
                        <p><strong>Tags:</strong></p>
                        {blog.tags ? ( <ul className="tags"><div className="tags-container"><div className="tags-box">{blog.tags.map((tag) => (<li className="tag" id="tag" key={tag}>{tag}</li>))}</div></div></ul>) : null}
                        <p><strong>Comments:</strong></p>
                        {blog.comments ? ( <ul className="comments">{blog.comments[0]?.comments.map((comment) => (<li className="message is-dark comment" key={comment}>{comment}</li>))} </ul>) : null}
                        
                        {isUser ? (
                                <div className="user-box">

                                <form onSubmit={handleSubmit} className="message is-primary user-only">
                                <label className="message-header"><strong>Add a comment</strong></label>
                                    <textarea id='comment-input' className="comment-input textarea is-small is-hover" name="comment" value={comment} onChange={handleChange}></textarea>
                                    <button className="add button is-primary" type="Submit" value="Submit">Submit</button>
                                </form>

                                </div>
                            ) : null}

                        {isAuthor ? (
                            <div className="author-box">
                            <div className='author-only message is-warning'>
                                <p className='message-header'>Author-only Functions</p>
                                <div className="author-functions">
                                <div className="delete-function">
                                <button className="delete" aria-label="delete" onClick={() => {deleteBlog(blog._id)}}></button>
                                <p>Delete Blog</p>
                                </div>
                                
                                <Link to={`/edit/${blog._id}`}>
                                    <button className="edit button is-info">Edit Blog</button>
                                </Link>
                                </div>
                            </div>
                            </div>
                        ) : null}
                                            
                        {/* <p>Author: {blog.author.name}</p> */}
                        <div className="footnotes">
                            <p>This blog was posted at: {blog.createdAt} </p>
                            <p>This blog was updated at: {blog.updatedAt} </p>
                        </div>
                        
                    </div>
                    </div>
              
            </article> 
            )
            : null} 
    </div>

    )
};

export default DetailPage