const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	blogs = blogs.map(blog => blog.likes)
	const total = blogs.reduce((currsum, val) => currsum + val, 0)
	return total
}

const favoriteBlog = (blogs) => {
	let max
	let maxlikes = 0
	for(let i = 0; i < blogs.length; i ++){
		if (blogs[i].likes > maxlikes){
			max = blogs[i]
			maxlikes = blogs[i].likes
		}
	}
	return max
}

const mostBlogs = (blogs) => {
	const count = _.countBy(blogs, (obj) => obj.author)
	const names = Object.keys(count)
	const values = Object.values(count)
	// console.log(count, names, values)
	let maxblog = 0
	let author = 0

	for(let i = 0; i < values.length; i ++){
		if(values[i] > maxblog){
			maxblog = values[i]
			author = names[i]
		}
	}

	return { 'author': author, 'blogs': maxblog }
}

const mostLikes = (blogs) => {
	const temp = _.groupBy(blogs, (obj) => obj.author)
	const names = Object.keys(temp)
	const values = Object.values(temp)
	let name
	let maxlikes = 0
	// console.log(names, values)
	for (let i = 0; i < values.length; i++){
		let temp = 0
		for (let j = 0; j < values[i].length; j ++){
			temp += values[i][j].likes
		}
		if(temp > maxlikes){
			maxlikes = temp
			name = names[i]
		}
	}
	// console.log(maxlikes, name)
	return { 'author': name, 'likes': maxlikes }
}

module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}