import React , { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
    const [visible , setVisible] = useState(false)

    const hidewhenvisible = {display : visible ? 'none' : ''}
    const showwhenvisible = {display : visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hidewhenvisible}>
                <button onClick={toggleVisibility}>{props.buttonlabel}</button>
            </div>
            <div style={showwhenvisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

export default Togglable