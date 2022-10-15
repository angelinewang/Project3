import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'

import userService from "../../utils/userService"
import { createABlog } from '../../utils/blogService'
import TextEditor from '../../components/TextEditor/TextEditor'
import "./CreateBlog.css"

function CreateBlogPage() {

  let user = userService.getUser()

  let navigate = useNavigate()

  const [blog, setBlog] = useState({
    title: '', 
    description: "",
    content: '',
    tags: []
  })

  const [titleTouched, setTitleTouched] = useState(false)
  const [descriptionTouched, setDescriptionTouched] = useState(false)
  const [contentTouched, setContentTouched] = useState(false)

  let titleIsValid = blog.title.trim() !== "" && blog.title.length > 25
  let descriptionIsValid = blog.description.trim() !== "" && blog.description.length > 100
  let contentIsValid = blog.content.trim() !== "" && blog.content.length > 1000


  let handleChange = (e) => {
    setBlog({...blog, [e.target.name]: e.target.value})
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    createABlog(blog).then(res => {
      navigate("/")
    })
  }

  let handleKeyDown = (e) => {
    if (e.key !== 'Enter') return 
    e.preventDefault()
    const value = e.target.value
    if (!value.trim()) return 
    setBlog({ ...blog, tags: [...blog.tags, value] });
    e.target.value = ''
  }

  let removeTag = (index) => {
    setBlog({...blog, tags: [...blog.tags.filter((el, i) => i !== index)]})
  }

  let blurHandler = (e) => {
    if (e.target.name === 'title') {
      setTitleTouched(true)
    }
    if (e.target.name === 'description') {
      setDescriptionTouched(true)
      console.log(blog.content.length)
    }
    if (e.target.name === 'content') {
      setContentTouched(true)
    }
  }

  let titleIsInvalid = titleTouched && !titleIsValid
  let descriptionIsInvalid = descriptionTouched && !descriptionIsValid
  let contentIsInvalid = contentTouched && !contentIsValid
  let formIsValid = titleIsValid && descriptionIsValid && contentIsValid



  return (
    <> { user ?
      <form className='form-container' onSubmit={handleSubmit} encType="multipart/form-data" >

        <label><strong>Title</strong></label>
        <input name='title' value={blog.title} onChange={handleChange} onBlur={blurHandler}/>
        {titleIsInvalid ? <p className='error-message'>Please provide a valid title (min. 25 characters)</p>: <></>}

        <label><strong>Tags</strong></label>
        <div className='tags-input-container'>
        {blog.tags.map((tag, index) => (
          <div className='tag-item' key={uuid()}>
            <span className='text'>{tag}</span>
            <span className='close' onClick={() => removeTag(index)}>&times;</span>
          </div>
        ))}
        <input type='text' name={blog.tags} placeholder='Add a tag' className='tags-input' onKeyDown={handleKeyDown}/>
        </div>

        <label><strong>Description</strong></label>
        <textarea rows={3} name='description' value={blog.description} onChange={handleChange} onBlur={blurHandler} />
        {descriptionIsInvalid ? <p className='error-message'>Please provide a valid description (min. 100 characters)</p>: <></> }

        <label><strong>Content</strong></label>
        <TextEditor  setBlog={setBlog} initContValue='' setContentTouched={setContentTouched} />
        {contentIsInvalid ? <p className='error-message'>Please provide a valid content (min. 1000 characters)</p> : <></> }

        <div className='image-input-container'>
          <label>Upload Image</label>
          <input type="file" name="image" />
        </div>

        <button type='Submit' disabled={!formIsValid} className={!formIsValid ? 'not-allowed': 'allowed'}>CREATE NEW BLOG</button>

      </form> : <p>You are not logged in</p> }
    </>
  )
}

export default CreateBlogPage