import { useState, useRef } from 'react'
import Loginform from './Loginform'
import Blogform from './Blogform'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Togglable from './Togglable'
import React from 'react'
import PropTypes from 'prop-types'

const Form = ({ user, setErrormessage, setBlogs, setUser, blogs }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [newtitle, setNewtitle] = useState('')
    const [newauthor, setNewauthor] = useState('')
    const [newurl, setNewurl] = useState('')
    const blogformRef = useRef()

    const addBlog = async (event) => {
        event.preventDefault()
        try{
            await blogService.create({
                title:newtitle,
                author: newauthor,
                url: newurl
            })
            // console.log(response)
            setErrormessage(`a new blog ${newtitle} by ${newauthor} has been added`)
            setTimeout(() => {setErrormessage('')}, 5000)
            setNewtitle('')
            setNewauthor('')
            setNewurl('')
            blogformRef.current.toggleVisibility()
            await blogService.getAll().then(blogs => setBlogs(blogs))
        }
        catch(exception){
            setErrormessage('Adding blog Failed')
            setTimeout(() => { setErrormessage(null)}, 5000)
        }
    }
    const userform = () => {
        return(
            <div>
                <p>{user.name} is logged in <button type='submit' onClick={handlelogout}>logout</button></p>
            </div>
        )
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedBlogappuser', JSON.stringify(user))
            blogService.setToken(user.token)
            blogService.getAll().then(blogs => setBlogs(blogs))
            setUser(user)
            setUsername('')
            setPassword('')
            setBlogs(blogs)
        }
        catch(exception){
            setErrormessage('Wrong Credentials')
            setTimeout(() => { setErrormessage(null)}, 5000)
        }
    }
    const handlelogout = () => {
        window.localStorage.removeItem('loggedBlogappuser')
        blogService.setToken(null)
        setUser(null)
        setUsername('')
        setPassword('')
        setBlogs([])
        setNewtitle('')
        setNewauthor('')
        setNewurl('')
        setErrormessage('Logged out')
        setTimeout(() => {setErrormessage(null)}, 5000)
    }

    if (user === null){
        return (
            <>
                {user !== null && userform()}
                <Loginform
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setPassword={setPassword}
                    setUsername={setUsername}
                />
            </>
        )
    }
    else {
        return (
            <>
                {user !== null && userform()}
                <Togglable buttonlabel='New Blog' ref={blogformRef}>
                    <Blogform
                        blogs={blogs}
                        setNewauthor={setNewauthor}
                        setNewtitle={setNewtitle}
                        setNewurl={setNewurl}
                        newurl={newurl}
                        newauthor={newauthor}
                        newtitle={newtitle}
                        addBlog={addBlog}
                    />
                </Togglable>
            </>
        )
    }
}

Form.propTypes = {
    setUser: PropTypes.func.isRequired,
    setErrormessage: PropTypes.func.isRequired,
    setBlogs: PropTypes.func.isRequired,
}

export default Form