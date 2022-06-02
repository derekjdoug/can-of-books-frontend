import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import bookImg from './bookImg.jpg';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      errorMessage: ''
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

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

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>
              {this.state.books.map(book => (
              <Carousel.Item>
                <Image
                  className="w-100"
                  src={bookImg}
                  alt={book.title}
                />
                <Carousel.Caption>
                  <h2 className="carousel-text">{book.title}</h2>
                  <p className="carousel-text">{book.description}</p>
                  <p className="carousel-text">{book.status}</p>
                </Carousel.Caption>
              </Carousel.Item>
              ))}
            </Carousel>
        ) : (
          <h3>No Books Found :</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
