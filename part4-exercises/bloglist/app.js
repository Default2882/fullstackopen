require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const Blog = require('./models/blog')

const mongoUrl = process.env.MONGODB_URI

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
app.use('/api/blogs',blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app