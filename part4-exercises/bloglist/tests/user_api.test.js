const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const testhelper = require('./testhelper')

describe('Testing of users upi with invalid data', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		await User.insertMany(testhelper.initialusers)
	})

	test('Missing passowrd', async () => {
		await api
			.post('/api/users/')
			.send({
				'username': 'default28',
				'name': 'Soumya Saurav'
			})
			.expect(400)
	})
	test('Missing username', async () => {
		await api
			.post('/api/users/')
			.send({
				'name': 'Soumya Saurav',
				'password': 'password'
			})
			.expect(400)
	})
	test('Short password', async () => {
		await api
			.post('/api/users/')
			.send({
				'username': 'def8',
				'name': 'Soumya Saurav',
				'password': 'pd'
			})
			.expect(400)
	})
	test('Short username', async () => {
		await api
			.post('/api/users/')
			.send({
				'username': 'de',
				'name': 'Soumya Saurav',
				'password': 'password'
			})
			.expect(400)
	})
})



afterAll(() => {
	mongoose.connection.close()
})