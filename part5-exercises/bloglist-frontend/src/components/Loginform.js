import React from 'react'

const Loginform = ({ handleLogin, username, password, setUsername, setPassword }) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
            username <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)}/>
            password <input type='text' value={password} name='Password' onChange={({ target }) => setPassword(target.value)}/>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Loginform