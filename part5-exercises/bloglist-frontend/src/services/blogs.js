import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
    const request = await axios.get(baseUrl)
    // console.log(request.data)
    let blogs = request.data
    blogs.sort((a , b) => {
        if(a.likes < b.likes) return 1
        else return -1
    })
    return blogs
}

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const create = async (newObject) => {
    const config = {
        headers : { Authorization : token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (newObject) => {

    const config = {
        headers : { Authorization: token }
    }

    const newurl = baseUrl+`/${newObject.id}`

    const response = await axios.put(newurl, newObject, config)

    return response.data
}

const deleteBlog = async (id) => {

    const config = {
        headers: { Authorization: token }
    }
    const newurl = baseUrl+`/${id}`
    // console.log(config, newurl)
    const response = await axios.delete(newurl, config)
    return response.data
}

export default { getAll , setToken, create, update, deleteBlog }