import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom"

import userService from "../../utils/userService"
import { updateABlog } from '../../utils/blogService'
import TextEditor from '../../components/TextEditor/TextEditor'

import "./EditBlogPage.css"

function EditPage() {

    const user = userService.getUser()

    const [blog, setBlog] = useState() 

    let navigate = useNavigate()

    let blogId = useParams().blogID

    useEffect(() => {
        let fetchForm = async () => {
            try {
                let response = await fetch(`/api/blogs/${blogId}`)
                if (response.status === 200) {
                    let data = await response.json()
                    setBlog(data)
                }
            } catch(error) {
                console.log(error)
            }
        }
        fetchForm()
    }, [blogId])

    let titleIsValid, descriptionIsValid, contentIsValid = null

    if (blog) {
    titleIsValid = blog.title.length > 25
    descriptionIsValid = blog.description.length > 100
    contentIsValid = blog.content.length > 1000
    }


    let removeTag = (index) => {
        setBlog({...blog, tags: [...blog.tags.filter((el, i) => i !== index)]})
      }

      function handleSubmit(e) {
        e.preventDefault()
        updateABlog(blog).then(res => {
            navigate('/')
        })
      }

      function handleChange(e) {
        setBlog({...blog, [e.target.name]: e.target.value})
      }

      let handleKeyDown = (e) => {
        if (e.key !== 'Enter') return 
        e.preventDefault()
        const value = e.target.value
        if (!value.trim()) return 
        setBlog({ ...blog, tags: [...blog.tags, value] });
        e.target.value = ''
      }

      let formIsValid = titleIsValid && descriptionIsValid && contentIsValid
    
      let handleCancel = () => {
        navigate(-1)
      }

  return (
    <>
        {user ?
        blog ? (
        user._id === blog.author._id ?
        <>
        <form className='form_container' onSubmit={handleSubmit}>

        <label>Title <span>*</span></label>
        <input name='title' value={blog.title} onChange={handleChange} maxLength={50}/>
        {!titleIsValid ? <p className='error-message'>Please provide a valid title (min. 25 characters)</p>: <></>}

        <label>Tags</label>
        <div className='tags-input-container'>
        {blog.tags ? ( blog.tags.map((tag, index) => (
          <div className='tag-item' key={index}>
            <span className='text'>{tag}</span>
            <span className='close' onClick={() => removeTag(index)}>&times;</span>
          </div>
        ))): <></>}
        <input type='text' name={blog.tags} placeholder='Add a tag' className='tags-input' onKeyDown={handleKeyDown}/>
      </div>

        <label>Description <span>*</span></label>
        <textarea rows={3} name='description' value={blog.description} onChange={handleChange} maxLength={200}/>
        {!descriptionIsValid ? <p className='error-message'>Please provide a valid description (min. 100 characters)</p>: <></> }

        <label>Content <span>*</span></label>
        <TextEditor blog={blog} setBlog={setBlog} initContValue={blog.content}/>
        {!contentIsValid ? <p className='error-message'>Please provide a valid content (min. 1000 characters)</p> : <></> }

        <div className="button-container">
        <button className="cancel-button" onClick={handleCancel} >CANCEL</button>
        <button type='Submit' disabled={!formIsValid} className={!formIsValid ? 'not-allowed': 'allowed'}>UPDATE BLOG</button>
        </div>
      </form>
      </>
      : 
      <p>You Do Not Have the Authorization to Edit This Blog</p>): <p>Blog does not exist</p> : <p>Only Logged In Users Can Edit Their Blogs</p>}
    </>
  )
}

export default EditPage