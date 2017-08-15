// @flow
import React from "react";
import { Route } from "react-router-dom";

import "./App.css";
import SearchPage from "./SearchPage";
import ListBooks from "./ListBooks";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
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

  handleChangeShelf = (bookId: string, shelf: any) => {
    let temp = this.state.books;
    const book = temp.filter(t => t.id === bookId)[0];
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(response => {
      this.setState({
        books: temp
      });
    });
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <ListBooks booksOnShelf={this.state.books} />} />
        <Route
          path="/search"
          render={() =>
            <SearchPage onChangeShelf={this.handleChangeShelf} booksOnShelf={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp;
