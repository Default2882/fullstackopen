const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const content = request.body
	if (!content.likes){
		content.likes = 0
	}
	const blog = new Blog(content)
	const result = await blog.save()
	response.status(201).json(result)
})

blogsRouter.get('/:id', async (request, response) => {
	const id = request.params.id
	const result = await Blog.findById(id)
	if (result) response.status(200).json(result)
	else response.status(404).end()
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
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