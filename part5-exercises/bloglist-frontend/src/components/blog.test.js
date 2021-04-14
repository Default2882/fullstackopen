import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Blogcontent from './Blogcontent'
import Blogform from './Blogform'

test('renders content', () => {
    const blog = {
        author: 'TestAuthor',
        title: 'TestBlog',
        website: 'fakeurl.com',
        likes: '99'
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent('TestAuthor')
    expect(component.container).toHaveTextContent('TestBlog')
    expect(component.container).not.toHaveTextContent('fakeurl.com')
    expect(component.container).not.toHaveTextContent('99')

})

test('testing the view more info button' , () => {
    const blog = {
        author: 'TestAuthor',
        title: 'TestBlog',
        url: 'fakeurl.com',
        likes: '99'
    }

    const mockhandler = jest.fn()
    const component = render(
        <Blog blog={blog} handleclick={mockhandler}/>
    )
    const button = component.getByText('View more info')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('fakeurl.com')
    expect(component.container).toHaveTextContent('99')
})

test('Testing the like button', () => {
    const blog = {
        author: 'TestAuthor',
        title: 'TestBlog',
        url: 'fakeurl.com',
        likes: '99'
    }

    const mocklikehandler = jest.fn()
    const component = render(
        <Blogcontent moreinfo={true} blog={blog} handlelike={mocklikehandler}/>
    )
    const likebutton = component.getByText('Like')
    fireEvent.click(likebutton)
    fireEvent.click(likebutton)
    expect(mocklikehandler.mock.calls).toHaveLength(2)
})

test('Testing the create new form', () => {
    const blog = {
        author: 'TestAuthor',
        title: 'TestBlog',
        url: 'fakeurl.com',
        likes: '99'
    }

    const mockaddBlog = jest.fn()
    const component = render(
        <Blogform 
            setNewauthor={mockaddBlog}
            setNewtitle={mockaddBlog} 
            setNewurl={mockaddBlog} 
            addBlog={mockaddBlog}
        />
    )

    const titleinput = component.container.querySelector('#title')
    const authorinput = component.container.querySelector('#author')
    const urlinput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
    fireEvent.change(titleinput, {target : {value : blog.title}})
    fireEvent.change(authorinput, {target : {value : blog.author}})
    fireEvent.change(urlinput, {target : {value : blog.url}})
    // console.log(titleinput, authorinput, urlinput, form)
    // console.log(form)
    fireEvent.submit(form)
    expect(mockaddBlog.mock.calls).toHaveLength(4)
    expect(mockaddBlog.mock.calls[0][0]).toBe(blog.title)
    expect(mockaddBlog.mock.calls[1][0]).toBe(blog.author)
    expect(mockaddBlog.mock.calls[2][0]).toBe(blog.url)
})
