import blogService from '../services/blogs'
import React from 'react'

const Blogcontent = ({ moreinfo, blog, handleclick, setErrormessage, setBlogs }) => {

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

    if (moreinfo){
        return (
            <div>
                <p>Blog title : {blog.title}, written by {blog.author}</p>
                <div>
                    <p>Likes: {blog.likes}</p>
                    <button onClick={handlelike}>Like</button>
                </div>
                <p>Website: {blog.url}</p>
                <button onClick={handleclick}>Hide info</button>
                <button onClick={handledelete}>Delete Blog</button>
            </div>
        )
    }
    else{
        return (
            <div>
                <p>{blog.title} by {blog.author}<button onClick={handleclick}>View more info</button></p>
            </div>
        )
    }
}

export default Blogcontent