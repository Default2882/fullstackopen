const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')
const testhelper = require('./testhelper.js')


const newblog = {
	'title' : 'New Blog',
	'author': 'Soumya Saurav',
	'url': 'http://www.fakeurl.com',
	'likes': 999
}

let id;

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await api.post('/api/users/').send(testhelper.initialusers[0]).expect(200)
    const user = await User.findOne({username: 'Test1'})
    id = user._id
    const blogs = testhelper.initialblogs.map(blog => blog = {...blog, user: {_id : user._id}})
    await Blog.insertMany(blogs)
})

test('Checking if adding a new blog works with a valid token', async () => {
    newblog.user = {_id : id}
    const result = await api
                        .post('/api/login/')
                        .send({username: 'Test1' , password: 'password1'})
                        .expect(200)
    // console.log(result)
    const token = result.body.token
    await api
        .post('/api/blogs/')
        .set({'Authorization': 'Bearer ' + token})    
        .send(newblog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const content = response.body
    expect(content).toHaveLength(testhelper.initialblogs.length + 1)
})

test('Checking if adding a new blog fails with an invalid token', async () => {
    newblog.user = {_id : id}
    const result = await api
                        .post('/api/login/')
                        .send({username: 'Test1' , password: 'password1'})
                        .expect(200)
    // console.log(result)
    const token = result.body.token
    await api
        .post('/api/blogs/')
        .set({'Authorization': 'Bearer ' + token + 'wrong'})    
        .send(newblog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
})


afterAll(() => {
	mongoose.connection.close()
})