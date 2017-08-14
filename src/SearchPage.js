// @flow
import React from "react";
import { Link } from "react-router-dom";
import Rx from "rxjs/Rx";

import * as BooksAPI from "./BooksAPI";
import "./App.css";

class SearchPage extends React.Component {
  state = {
    query: "",
    books: []
  };

  searchInput: Rx.Subject<any>;

  constructor() {
    super();
    this.searchInput = new Rx.Subject();
    this.searchInput.debounceTime(500).subscribe(param => {
      this.fireSearchBook(param);
    });
  }

  updateQuery = (query: string) => {
    this.setState({
      query: query
    });
    if (query) {
      this.searchInput.next(query);
    } else {
      this.setState({
        books: []
      });
    }
  };

  updateBooks(books: any) {
    const verifiedBooks = books.forEach(book => {
      console.log(book);
    });
    console.log(verifiedBooks);
  }

  fireSearchBook(query: string) {
    BooksAPI.search(query, 20).then(
      response => {
        if (response.error) {
          this.setState({
            books: []
          });
        } else {
          this.setState({
            books: response
          });
        }
      },
      error => {
        console.log("error ocurred");
      }
    );
  }

  handleChangeShelf(bookId: string, e: any) {
    let temp = this.state.books;
    const book = temp.filter(t => t.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: temp
      });
    });
  }

  render() {
    this.state.books.forEach(book => {
      console.log(book);
    });
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book =>
              <li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                    }}
                  />
                  <div className="book-shelf-changer">
                    <h3>
                      {book.shelf}
                    </h3>
                    <select value={book.shelf} onChange={e => this.handleChangeShelf(book.id, e)}>
                      <option value="none" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
                  {book.title}
                </div>
                {book.authors &&
                  <div className="book-authors">
                    {book.authors[0]}
                  </div>}
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchPage;
