import React , { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    const [visible , setVisible] = useState(false)

    const hidewhenvisible = { display : visible ? 'none' : '' }
    const showwhenvisible = { display : visible ? '' : 'none' }

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

Togglable.propTypes = {
    buttonlabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable