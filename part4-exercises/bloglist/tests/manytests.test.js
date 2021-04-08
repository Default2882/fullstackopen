const listhelper = require('../utils/list_helper')
const testhelper = require('./testhelper')

const listWithOneBlog = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	}
]

const blogs = testhelper.initialblogs


test('dummy functions returns 1', () => {
	const blogs = []
	const result = listhelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
	test('when list has only one blog, equals the likes of that', () => {
		const result = listhelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})

	test('when the list is empty, we expect 0', () => {
		const result = listhelper.totalLikes([])
		expect(result).toBe(0)
	})

	test('multiple blogs', () => {
		const result = listhelper.totalLikes(blogs)
		expect(result).toBe(36)
	})
})

describe('favorite blogs', () => {
	test('The blog with the highest number of upvotes', () => {
		const result = listhelper.favoriteBlog(blogs)
		// console.log("resilt is : ", result)
		expect(result).toEqual(blogs[2])
	})
})

describe('Max number of blogs', () => {
	test('Maximum number of blogs by an author', () => {
		const result = listhelper.mostBlogs(blogs)
		// console.log("resilt is : ", result)
		expect(result).toEqual({
			author: 'Robert C. Martin',
			blogs: 3
		})
	})
})

describe('Max number of likes from an author', () => {
	test('Maximum number of likes on all the blogs written by an author', () => {
		const result = listhelper.mostLikes(blogs)
		// console.log("resilt is : ", result)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17
		})
	})
})

