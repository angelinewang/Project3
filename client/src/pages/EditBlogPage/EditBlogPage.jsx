import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom"

import { updateABlog } from '../../utils/blogService'
import TextEditor from '../../components/TextEditor/TextEditor'

function EditPage() {

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
    }, [])

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

  return (
    <>
    {blog ? (
        <>
        <form className='form-container' onSubmit={handleSubmit}>
        <label><strong>Title</strong></label>
        <input name='title' value={blog.title} onChange={handleChange} />
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
        <textarea rows={3} name='description' value={blog.description} onChange={handleChange} />
        <label><strong>Content</strong></label>
        {/* <textarea rows={10} name='content' value={form.content} onChange={handleChange} /> */}
        <TextEditor blog={blog} setBlog={setBlog} initContValue={blog.content} />
        <button type='Submit'>UPDATE FORM</button>
      </form>
    </>): null}
    </>
  )
}

export default EditPage