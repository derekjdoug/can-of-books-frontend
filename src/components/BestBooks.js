import React from 'react';
import axios from 'axios';
import BookCarousel from './BookCarousel';
import AddBook from './AddBook';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      errorMessage: '',
      modalState: false,
    }
  }
  showModal = () => this.setState({modalState: true});
  hideModal = () => this.setState({modalState: false});

  /* DONE: Make a GET request to your API to fetch all the books from the database  */
  
  // async componentDidMount() {
  //   let url = `http://localhost:3001/books`;
  //   const response = await axios.get(url);
  //   console.log(response.data);
  //   this.setState({ books: response.data });
  // }

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
    this.props.updateBooksArray(response.data); // TODO: build updateBooksArray into app.js
  }


  render() {

    /* DONE: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <AddBook handleBookCreate={this.handleBookCreate} showModal={this.showModal} hideModal={this.hideModal}/>
        {this.state.books.length ? (<BookCarousel book={this.state.books}/>) : (
          <h3>No Books Found :</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
