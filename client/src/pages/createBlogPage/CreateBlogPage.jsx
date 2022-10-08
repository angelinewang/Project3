import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { createABlog } from '../../utils/blogService'
import TextEditor from '../../components/TextEditor/TextEditor'
import "./CreateBlog.css"

function CreateBlogPage() {

  let navigate = useNavigate()

  const [blog, setBlog] = useState({
    title: '', 
    description: "",
    content: '',
    tags: []
  })

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


  return (
    <>
      <form className='form-container' onSubmit={handleSubmit} encType="multipart/form-data" >

        <label><strong>Title</strong></label>
        <input name='title' value={blog.title} onChange={handleChange} />

        <label><strong>Tags</strong></label>
        <div className='tags-input-container'>
        {blog.tags.map((tag, index) => (
          <div className='tag-item' key={index}>
            <span className='text'>{tag}</span>
            <span className='close' onClick={() => removeTag(index)}>&times;</span>
          </div>
        ))}
        <input type='text' name={blog.tags} placeholder='Add a tag' className='tags-input' onKeyDown={handleKeyDown}/>
        </div>

        <label><strong>Description</strong></label>
        <textarea rows={3} name='description' value={blog.description} onChange={handleChange} />

        <label><strong>Content</strong></label>
        <TextEditor  setBlog={setBlog} initContValue='' />

        <div className='image-input-container'>
          <label>Upload Image</label>
          <input type="file" name="image" />
        </div>

        <button type='Submit'>CREATE NEW BLOG</button>

      </form>
    </>
  )
}

export default CreateBlogPage