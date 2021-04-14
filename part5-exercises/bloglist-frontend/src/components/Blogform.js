import React from 'react'

const Blogform = ({
    setNewauthor,
    setNewtitle,
    setNewurl,
    newtitle,
    newauthor,
    newurl,
    addBlog
}) => {
    return (
        <div>
            <form onSubmit={addBlog}>
                <p>Title: <input id='title' value={newtitle} onChange={({ target }) => setNewtitle(target.value)}/></p>
                <p>Author: <input id='author' value={newauthor} onChange={({ target }) => setNewauthor(target.value)}/></p>
                <p>URL: <input id='url' value={newurl} onChange={({ target }) => setNewurl(target.value)}/></p>
                <button type='submit'>Create Blog!</button>
            </form>
        </div>
    )
}

export default Blogform