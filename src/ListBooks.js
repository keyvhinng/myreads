// @flow
import React from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI';
import './App.css';

class ListBooks extends React.Component {
  state = {
    books : []
  };

  componentDidMount(){
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  handleChangeShelf(bookId:string,e:any){
    let temp = this.state.books;
    const book = temp.filter(t => t.id === bookId)[0];
    book.shelf = e.target.value;
    this.setState({
      books: temp
    })
  }

  render(){
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {this.state.books.filter( (book) =>
                  book.shelf === 'currentlyReading'
                ).map((book) =>
                  <li key={book.id} className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+book.imageLinks.thumbnail+')' }}></div>
                      <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(e)=>this.handleChangeShelf(book.id,e)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors[0]}</div>
                  </li>
                )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.state.books.filter( (book) =>
                      book.shelf === 'wantToRead'
                    ).map((book) =>
                      <li key={book.id} className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+book.imageLinks.thumbnail+')' }}></div>
                          <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(e)=>this.handleChangeShelf(book.id,e)}>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors[0]}</div>
                      </li>
                    )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books
                    .filter( (book) => {
                      return book.shelf === 'read';
                    })
                    .map( (book) =>
                      <li key={book.id} className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+book.imageLinks.thumbnail+')' }}></div>
                          <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(e)=>this.handleChangeShelf(book.id,e)}>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors[0]}</div>
                      </li>
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}
export default ListBooks
