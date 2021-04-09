const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', {url:1 , title: 1, author: 1})
	response.status(200).json(users)
})

usersRouter.post('/', async (request , response) => {
	const body = request.body
	// console.log(body)

	if (!body.username){
		response.status(400).json({ error: 'Username is missing' })
		return
	}
	if (!body.password){
		response.status(400).json({ error: 'Password is missing' })
		return
	}
	// console.log('here',body.password.length)
	if (body.password.length < 3){
		response.status(400).json({ error: 'Password should be atleast 3 characters long' })
		return
	}
	const saltrounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltrounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash
	})

	const saved = await user.save()
	response.status(200).json(saved)
})

module.exports = usersRouter