import React, { useState } from 'react'
import Blogcontent from './Blogcontent'
import blogService from '../services/blogs'

const Blog = ({ blog, setErrormessage, setBlogs }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [moreinfo, setMoreinfo] = useState(false)

    const handleclick = (event) => {
        event.preventDefault()
        // console.log(event)
        setMoreinfo(!moreinfo)
    }

    const handlelike = async (event) => {
        event.preventDefault()
        // console.log(event)
        const newblog = { ...blog }
        newblog.likes = newblog.likes + 1
        try{
            await blogService.update(newblog)
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        catch(exception){
            setErrormessage('Wrong Credentials')
            setTimeout(() => { setErrormessage(null)}, 5000)
        }
    }

    const handledelete = async (event) => {
        event.preventDefault()
        const todelete = window.confirm(`Do you want to delete the blog ${blog.title} by ${blog.author}`)
        if(!todelete) return
        try{
            await blogService.deleteBlog(blog.id)
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        catch(exception){
            setErrormessage('Wrong Credentials')
            setTimeout(() => { setErrormessage(null)}, 5000)
        }
    }


    //console.log(blog)

    return (
        <div style={blogStyle} className='blog' >
            <Blogcontent
                moreinfo={moreinfo}
                blog={blog}
                setBlogs={setBlogs}
                handlelike={handlelike}
                handledelete={handledelete}
                handleclick={handleclick}
            />
        </div>
    )
}

export default Blog