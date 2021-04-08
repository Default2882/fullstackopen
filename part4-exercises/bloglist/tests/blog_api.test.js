const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testhelper = require('./testhelper')

const newblog = {
	'title' : 'New Blog',
	'author': 'Soumya Saurav',
	'url': 'http://www.fakeurl.com',
	'likes': 999
}

beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = testhelper.initialblogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

describe('Testing the fetch of valid blogs', () => {
	test('Testing the get method to make sure all blogs are fetched', async () => {
		const response = await api.get('/api/blogs')
		const contents = response.body
		expect(contents).toHaveLength(testhelper.initialblogs.length)
	})

	test('Testing that unique identifier is named as id', async () => {
		const response = await api.get('/api/blogs')
		// console.log(response.body)
		const contents = response.body
		// console.log(contents)
		expect(contents[0].id).toBeDefined()
	})

})

describe('Testing creation of blogs with valid as well as missing fields' , () => {
	test('Testing whether post creates a new blog or not', async () => {
		await api
			.post('/api/blogs')
			.send(newblog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		const contents = response.body
		expect(contents).toHaveLength(testhelper.initialblogs.length + 1)

	})

	test('Testing whether the number of likes default to 0, if the field is missing', async () => {
		delete newblog.likes
		await api
			.post('/api/blogs')
			.send(newblog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		const content = response.body
		let likes
		for(let i = 0; i < content.length; i ++){
			if (content[i].title === newblog.title) likes = content[i].likes
		}
		expect(likes).toEqual(0)

	})

	test('Testing whether we get 400 status code if title is missing', async () => {
		delete newblog.title
		await api
			.post('/api/blogs')
			.send(newblog)
			.expect(400)
	})


	test('Testing whether we get 400 status code if title is missing', async () => {
		delete newblog.url
		await api
			.post('/api/blogs')
			.send(newblog)
			.expect(400)
	})
})

afterAll(() => {
	mongoose.connection.close()
})