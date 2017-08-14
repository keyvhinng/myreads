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

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <ListBooks />} />
        <Route path="/search" render={() => <SearchPage />} />
      </div>
    );
  }
}

export default BooksApp;
