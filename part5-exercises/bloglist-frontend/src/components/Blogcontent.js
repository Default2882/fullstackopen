import React from 'react'

const Blogcontent = ({ moreinfo, blog, handleclick, handlelike, handledelete }) => {

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