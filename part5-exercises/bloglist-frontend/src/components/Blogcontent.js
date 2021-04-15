import React from 'react'

const Blogcontent = ({ moreinfo, blog, handleclick, handlelike, handledelete }) => {

    if (moreinfo){
        return (
            <div>
                <p>Blog title : {blog.title}, written by {blog.author}</p>
                <div>
                    <p id='likes'>Likes: {blog.likes}</p>
                    <button id={'likebutton'} onClick={handlelike}>Like</button>
                </div>
                <p>Website: {blog.url}</p>
                <button onClick={handleclick}>Hide info</button>
                <button id={'deletebutton'} onClick={handledelete}>Delete Blog</button>
            </div>
        )
    }
    else{
        return (
            <div>
                <p>{blog.title} by {blog.author}<button id={'moreinfo'} onClick={handleclick}>View more info</button></p>
            </div>
        )
    }
}

export default Blogcontent