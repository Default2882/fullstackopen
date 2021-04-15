
describe('Blog app', function(){
    
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function(){
        cy.get('#username')
        cy.get('#password')
    })
})


describe('Testing logging in', function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Test One',
            username: 'Test1',
            password: 'password1'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('A successful login attempt' , function(){
        cy.get('#username').type('Test1')
        cy.get('#password').type('password1')
        cy.contains('login').click()
        cy.contains('Test One is logged in')
    })

    it('Failed login attempt', function(){
        cy.get('#username').type('Test1')
        cy.get('#password').type('wrong')
        cy.contains('login').click()
        cy.contains('Wrong Credentials')
    })
})

describe('When logged in', function(){

    beforeEach(function(){
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Test One',
            username: 'Test1',
            password: 'password1'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.request('POST', 'http://localhost:3001/api/login/', {
            username: 'Test1',
            password: 'password1'
        })
        .then(response => {
            localStorage.setItem('loggedBlogappuser', JSON.stringify(response.body))
        })
        cy.visit('http://localhost:3000')
    })

    it('Creating a new blog', function(){
        cy.contains('New Blog').click()
        cy.get('#title').type('Creating a blog with cypress')
        cy.get('#author').type('Cypress Auth')
        cy.get('#url').type('fakeurl.com')
        cy.contains('Create Blog!').click()
        cy.contains('Creating a blog with cypress')
    })
})

describe('When a blog is created', function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Test One',
            username: 'Test1',
            password: 'password1'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.request('POST', 'http://localhost:3001/api/login/', {
            username: 'Test1',
            password: 'password1'
        })
        .then(response => {
            localStorage.setItem('loggedBlogappuser', JSON.stringify(response.body))
        })
        cy.visit('http://localhost:3000')
        cy.contains('New Blog').click()
        cy.get('#title').type('Creating a blog with cypress')
        cy.get('#author').type('Cypress Auth')
        cy.get('#url').type('fakeurl.com')
        cy.contains('Create Blog!').click()
        cy.contains('Creating a blog with cypress')
    })

    it('Liking an existing blog', function(){
        cy.get('#moreinfo').click()
        cy.get('#likebutton').click()
    })

    it('Deleting an existing blog', function(){
        cy.get('#moreinfo').click()
        cy.get('#deletebutton').click()
    })
})

describe('When multiple blogs', function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
            const user = {
                name: 'Test One',
                username: 'Test1',
                password: 'password1'
            }
            cy.request('POST', 'http://localhost:3001/api/users/', user)
            cy.request('POST', 'http://localhost:3001/api/login/', {
                username: 'Test1',
                password: 'password1'
            })
            .then(response => {
                localStorage.setItem('loggedBlogappuser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
                cy.createblog({
                    author: 'T1',
                    title: 'S1',
                    url: 'fakeurl1.com',
                    likes: 1
                })
                cy.createblog({
                    author: 'T2',
                    title: 'S2',
                    url: 'fakeurl2.com',
                    likes: 4
                })
                cy.createblog({
                    author: 'T3',
                    title: 'S3',
                    url: 'fakeurl2.com',
                    likes: 2
                })
            })
    })

    it('Checking whether the blogs are sorted or not', function(){
        cy.get('#moreinfo').click()
        cy.get('#likes').contains(4)
    })
})