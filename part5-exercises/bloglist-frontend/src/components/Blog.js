import React, { useState } from 'react'
import Blogcontent from './Blogcontent'

const Blog = ({blog, setErrormessage, setBlogs}) => {
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

  //console.log(blog)

  return ( 
    <div style={blogStyle}>
      <Blogcontent moreinfo={moreinfo} blog={blog} setBlogs={setBlogs} handleclick={handleclick} setErrormessage={setErrormessage}/>
    </div>
  )
}

export default Blog