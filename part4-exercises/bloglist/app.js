require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const mongoUrl = process.env.NODE_ENV === 'test'
	? process.env.TEST_MONGODB_URI
	: process.env.MONGODB_URI

mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})
	.then(result => {
		logger.info('Connected to MongoDB')
		// logger.info(result)
	})
	.catch(result => {
		logger.info('Failed connecting to MongoDB')
		logger.info(result)
	})


app.use(express.json())
app.use(middleware.requestLogger)
app.use(cors())
app.use(express.json())
// app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)
app.use('/api/login/', loginRouter)
app.use('/api/blogs/', blogsRouter)
app.use('/api/users/', usersRouter)

if (process.env.NODE_ENV === 'test'){
	const testingRouter = require('./controllers/testing')
	app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app