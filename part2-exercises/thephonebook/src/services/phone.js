import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'

const initialFetch = () => {
    console.log("fetching")
    const response = axios.get(baseurl)
                    .then(response => response.data)
                    .catch(reason => {
                        console.log("HTTP GET failed!")
                        console.log(reason)
                      })
    //console.log("HEllo",response)
    return response
}

const deleteContact = (id) => {
    const newbase = baseurl + "/" + id
    console.log("Deleting : ", newbase)
    const response = axios.delete(newbase)
        .then(response => {
            console.log("Succesfully Deleted")
        })
        .catch(reason => {
            console.log("Delete failed")
            console.log(reason)
        })
    return response
}

const addContact = (newobject) => {
    const response = axios.post(baseurl, newobject)
                    .then(response => response.data)
                    .catch(reason => {
                        console.log("HTTP POST failed!")
                        console.log(reason)
                      })
    return response
}

export default { initialFetch, addContact, deleteContact }