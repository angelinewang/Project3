import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom"

import userService from "../../utils/userService"
import { updateABlog } from '../../utils/blogService'
import TextEditor from '../../components/TextEditor/TextEditor'

import "./EditBlogPage.css"

function EditPage() {

    const user = userService.getUser()

    const [blog, setBlog] = useState() 
    const [contentTouched, setContentTouched] = useState(false)


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
    contentIsValid = blog.content.length > 250
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
        <h2 className='main_header'>Edit Blog</h2>
        <label>Title <span>*</span></label>
        <input name='title' value={blog.title} onChange={handleChange} maxLength={50}/>
        {!titleIsValid ? <p className='error_message'>Please provide a valid title (min. 25 characters)</p>: <></>}

        <label>Tags</label>
        <div className='tags_input_container'>
        {blog.tags ? ( blog.tags.map((tag, index) => (
          <div className='tag_item' key={index}>
            <span className='span_text'>{tag}</span>
            <span className='span_close' onClick={() => removeTag(index)}>&times;</span>
          </div>
        ))): <></>}
        <input type='text' name={blog.tags} className='tags_input' onKeyDown={handleKeyDown}/>
      </div>

        <label>Description <span>*</span></label>
        <textarea rows={3} name='description' value={blog.description} onChange={handleChange} maxLength={200}/>
        {!descriptionIsValid ? <p className='error_message'>Please provide a valid description (min. 100 characters)</p>: <></> }

        <label>Content <span>*</span></label>
        <TextEditor blog={blog} setBlog={setBlog} initContValue={blog.content} setContentTouched={setContentTouched}/>
        {!contentIsValid ? <p className='error_message'>Please provide a valid content (min. 250 characters)</p> : <></> }

        <div className="button_container">
        <button className="cancel_button" onClick={handleCancel} >CANCEL</button>
        <button type='Submit' disabled={!formIsValid} className={!formIsValid ? 'not_allowed_button': 'allowed_button'}>UPDATE BLOG</button>
        </div>
      </form>
      </>
      : 
      <p className='authorization_error'>YOU DO NOT HAVE THE AUTHORIZATION TO EDIT THIS BLOG</p>): 
      <p className='authorization_error'>BLOG DOES NOT EXIST</p> 
      : <p className='authorization_error'>YOU ARE NOT LOGGED IN</p>}
    </>
  )
}

export default EditPage