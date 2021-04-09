const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {username:1, name:1})
	response.json(blogs)
})

blogsRouter.post('/', middleware.tokenExtractor , middleware.userExtractor ,async (request, response) => {
	const content = request.body
	const userid = request.user
	if(!userid){
		return response.status(401).json({error: 'token missing or invalid'})
	}
	const user = await User.findById(userid.toString())
	if (!content.likes){
		content.likes = 0
	}
	content.user = user._id
	const blog = new Blog(content)
	const result = await blog.save()
	user.blogs = user.blogs.concat(result._id)
	await user.save()
	response.status(201).json(result)
})

blogsRouter.get('/:id', async (request, response) => {
	const id = request.params.id
	const result = await Blog.findById(id)
	if (result) response.status(200).json(result)
	else response.status(404).end()
})

blogsRouter.delete('/:id', middleware.tokenExtractor , middleware.userExtractor, async (request, response) => {
	const id = request.params.id
	const user = request.user
	if(!user) return response.status(401).json({error: 'Invalid or missing token'})
	const blog = await Blog.findById(id)
	// console.log(blog.user._id, decodedToken.id)
	if (!blog) return response.status(404).json({error: 'invalid blog ID'})
	if (blog.user._id.toString() !== user){
		return response.status(401).json({error: 'Permission denied'})
	}
	await Blog.deleteOne({_id: id})
	return response.status(200).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
	}

	if (!body.likes) blog.likes = 0
	else blog.likes = body.likes

	const updatedblog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(updatedblog)
})

module.exports = blogsRouter