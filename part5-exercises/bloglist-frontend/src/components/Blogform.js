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
                <p>Title: <input value={newtitle} onChange={({ target }) => setNewtitle(target.value)}/></p>
                <p>Author: <input value={newauthor} onChange={({ target }) => setNewauthor(target.value)}/></p>
                <p>URL: <input value={newurl} onChange={({ target }) => setNewurl(target.value)}/></p>
                <button type='submit'>Create Blog!</button>
            </form>
        </div>
    )
}

export default Blogform