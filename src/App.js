import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './components/BestBooks';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import axios from 'axios';
import BookCarousel from './components/BookCarousel';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      errorMessage: '',
      modalState: false,
    }
  }
  showModal = () => this.setState({ modalState: true });
  hideModal = () => this.setState({ modalState: false });

  componentDidMount = async () => {
    try {
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books'
      }
      const response = await axios(config);
      this.setState({
        books: response.data
      })
    } catch (error) {
      console.error('Error in BestBooks componentDidMount', error);
      this.setState({
        errorMessage: `Status Code: ${error.response.status}: ${error.response.data}`
      })
    }
  }

  handleBookCreate = async (newBookInfo) => {
    const response = await axios.post(`http://localhost:3001/books`, newBookInfo);
    console.log(response.data);
    // this.props.updateBooksArray(response.data); // TODO: build updateBooksArray into app.js
  }

  handleBookDelete = async (event, bookToBeDeleted) => {
    console.log('Book to be deleted: ', bookToBeDeleted);
    const filteredBooks = this.state.books.filter(book => book._id !== bookToBeDeleted);
    this.setState({ books: filteredBooks});
    await axios.delete(`http://localhost:3001/books/${bookToBeDeleted}`);
  }

  handleBookUpdate = async bookToUpdate => {
    try {
      const updatedBooks = this.state.books.map(existingBook => {
        if (existingBook._id === bookToUpdate._id) {
          return bookToUpdate;
        } else {
          return existingBook;
        }
      });
      this.setState({ books: updatedBooks })
      await axios.put(`http://localhost:3001/books/${bookToUpdate._id}`, bookToUpdate);
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              exact path="/"
              element={this.state.books.length ? (<BookCarousel books={this.state.books} handleBookDelete={this.handleBookDelete} />) : (
                <h3>No Books Found :</h3>
              )}
            >
            </Route>
            <Route
              path="/books"
              element={<BestBooks books={this.state.books} handleBookCreate={this.handleBookCreate} showModal={this.showModal} hideModal={this.hideModal} modalState={this.state.modalState} handleBookUpdate={this.handleBookUpdate} handleBookDelete={this.handleBookDelete} />}
            >
            </Route>
            <Route
              path="/about"
              element={<About />}
            >
            </Route>
          </Routes>

          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
