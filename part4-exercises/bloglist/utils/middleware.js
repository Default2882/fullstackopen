const logger = require('./logger')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	else if (error.name === 'JsonWebTokenError') {    
		return response.status(401).json({error: 'invalid token'})
	}
	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')  
	// logger.info()
	logger.info("Extracting token", authorization)
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) 
		request.token = authorization.substring(7)
	else request.token = null
	logger.info("got token: ", request.token)
	next()
}

const userExtractor = (request, response, next) => {
	const token = request.token
	logger.info("Decoding token")
	const decodedToken = jwt.verify(token, process.env.SECRET)
	logger.info("Token Decoded", decodedToken)
	if (!token || !decodedToken) request.user = null
	else {
		request.user = decodedToken.id.toString()
	}
	logger.info("User is: ", request.user)
	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor
}