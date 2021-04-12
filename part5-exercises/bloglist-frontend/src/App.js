import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errormessage, setErrormessage] = useState('')
  const [newtitle, setNewtitle] = useState('')
  const [newauthor, setNewauthor] = useState('')
  const [newurl, setNewurl] = useState('')
  
  const loginform = () => {
    return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username <input type='text' value={username} name='Username' onChange={({target}) => setUsername(target.value)}/>
          password <input type='text' value={password} name='Password' onChange={({target}) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
    )
  }

  const blogform = () => {
    return(
    <div>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      <form onSubmit={addBlog}>
        <p>Title: <input value={newtitle} onChange={({target}) => setNewtitle(target.value)}/></p>
        <p>Author: <input value={newauthor} onChange={({target}) => setNewauthor(target.value)}/></p>
        <p>URL: <input value={newurl} onChange={({target}) => setNewurl(target.value)}/></p>
        <button type='submit'>Create Blog!</button>
      </form>
    </div>
    )
  }

  const userform = () => {
    return(
      <div>
        <p>{user.name} is logged in <button type='submit' onClick={handlelogout}>logout</button></p>
      </div>
    )
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

  const addBlog = async (event) => {
    event.preventDefault()
    try{
      const response = await blogService.create({
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
      await blogService.getAll().then(blogs => setBlogs(blogs))
    }
    catch(exception){
      setErrormessage('Adding blog Failed')
      setTimeout(() => { setErrormessage(null)}, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedBlogappuser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception){
      setErrormessage('Wrong Credentials')
      setTimeout(() => { setErrormessage(null)}, 5000)
    }
  }

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

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errormessage} />
      {user === null && loginform()}
      {user !== null && userform()}
      {user !== null && blogform()}
   </div>
  )
}

export default App