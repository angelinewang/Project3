import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom"

import userService from "../../utils/userService"
import { updateABlog } from '../../utils/blogService'
import TextEditor from '../../components/TextEditor/TextEditor'

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

    const [titleTouched, setTitleTouched] = useState(false)
    const [descriptionTouched, setDescriptionTouched] = useState(false)
    const [contentTouched, setContentTouched] = useState(false)

    let titleIsValid, descriptionIsValid, contentIsValid = null

    if (blog) {
    titleIsValid = blog.title.trim() !== "" && blog.title.length > 25
    descriptionIsValid = blog.description.trim() !== "" && blog.description.length > 100
    contentIsValid = blog.content.trim() !== "" && blog.content.length > 1000
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
    <>
        {user ?
        blog ? (
        user._id === blog.author._id ?
        <>
        <form className='form-container' onSubmit={handleSubmit}>

        <label><strong>Title</strong></label>
        <input name='title' value={blog.title} onChange={handleChange} onBlur={blurHandler} />
        {titleIsInvalid ? <p className='error-message'>Please provide a valid title (min. 25 characters)</p>: <></>}

        <label><strong>Tags</strong></label>
        <div className='tags-input-container'>
        {blog.tags ? ( blog.tags.map((tag, index) => (
          <div className='tag-item' key={index}>
            <span className='text'>{tag}</span>
            <span className='close' onClick={() => removeTag(index)}>&times;</span>
          </div>
        ))): <></>}
        <input type='text' name={blog.tags} placeholder='Add a tag' className='tags-input' onKeyDown={handleKeyDown}/>
      </div>

        <label><strong>Description</strong></label>
        <textarea rows={3} name='description' value={blog.description} onChange={handleChange} onBlur={blurHandler} />
        {descriptionIsInvalid ? <p className='error-message'>Please provide a valid description (min. 100 characters)</p>: <></> }

        <label><strong>Content</strong></label>
        <TextEditor blog={blog} setBlog={setBlog} initContValue={blog.content} setContentTouched={setContentTouched}/>
        {contentIsInvalid ? <p className='error-message'>Please provide a valid content (min. 1000 characters)</p> : <></> }

        <button type='Submit' disabled={!formIsValid} className={!formIsValid ? 'not-allowed': 'allowed'}>UPDATE BLOG</button>
      </form>
      </>
      : 
      <p>You Do Not Have the Authorization to Edit This Blog</p>): <p>Blog does not exist</p> : <p>Only Logged In Users Can Edit Their Blogs</p>}
    </>
  )
}

export default EditPage