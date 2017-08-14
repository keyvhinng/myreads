// @flow
import React from "react";
import { Link } from "react-router-dom";

import BookShelf from "./Book";

import * as BooksAPI from "./BooksAPI";
import "./App.css";

class ListBooks extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  handleChangeShelf = (bookId: string, e: any) => {
    let temp = this.state.books;
    const book = temp.filter(t => t.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: temp
      });
    });
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            key="currently"
            books={this.state.books.filter(book => book.shelf === "currentlyReading")}
            onChangeShelf={this.handleChangeShelf}
            shelftitle="Currently Reading"
          />
          <BookShelf
            key="wantToRead"
            books={this.state.books.filter(book => book.shelf === "wantToRead")}
            onChangeShelf={this.handleChangeShelf}
            shelftitle="Want to Read"
          />
          <BookShelf
            key="read"
            books={this.state.books.filter(book => book.shelf === "read")}
            onChangeShelf={this.handleChangeShelf}
            shelftitle="Read"
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
export default ListBooks;
