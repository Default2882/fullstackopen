import axios from 'axios'
const baseurl = '/api/persons'

const initialFetch = () => {
    console.log("fetching")
    const response = axios.get(baseurl)
                    .then(response => response.data)
    //console.log("HEllo",response)
    return response
}

const deleteContactapi = (id, status, setNotif, notifDisplay, setStatus, name) => {
    const newbase = baseurl + "/" + id
    console.log("Deleting : ", newbase)
    const response = axios.delete(newbase)
        .then(response => {
            console.log("Succesfully Deleted")
        })
    return response
}

const addContact = (newobject) => {
    const response = axios.post(baseurl, newobject)
                    .then(response => response.data)
    return response
}

const updateContact = (id , newobject) => {
    const newbase = baseurl + "/" + id
    const response = axios.put(newbase, newobject)
                    .then(response => {
                        console.log("Successfully updated")
                        return response.data
                    })
    return response
}

export default { initialFetch, addContact, deleteContactapi,updateContact }
