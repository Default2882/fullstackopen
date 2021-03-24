
const Notification = ({message, isok}) => {
    if (message == null || message === ""){
        return null
    }
    if(isok){
        return (
            <div className="notif">{message}</div>
        )
    }
    else{
        return (
            <div className="error">{message}</div>
        )
    }
}

export default Notification