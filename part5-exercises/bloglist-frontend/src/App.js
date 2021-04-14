import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Form from './components/Form'
import Blog from './components/Blog'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [errormessage, setErrormessage] = useState('')

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedBlogappuser')
        if(loggedUser){
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    // console.log("user: ", user)

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={errormessage} />
            {user !== null && blogs.map(blog => <Blog key={blog.id} blog={blog} setBlogs={setBlogs} setErrormessage={setErrormessage} />) }
            <Form user={user} setErrormessage={setErrormessage} setBlogs={setBlogs} setUser={setUser} blogs={blogs}/>
        </div>
    )
}

export default App