
const info = (...params) => {
	if (process.send.NODE_ENV !== 'test') console.log(...params)
}

const error = (...params) => {
	if (process.send.NODE_ENV !== 'test') console.error(...params)
}

module.exports = {
	info, error
}
