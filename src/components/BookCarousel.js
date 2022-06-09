import React from 'react';
import bookImg from '../bookImg.jpg';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Login from './Login.js';
import Profile from './Profile.js';
import Logout from './Logout.js';
import { withAuth0 } from '@auth0/auth0-react';

class BookCarousel extends React.Component {
  render() {
    return (
      <>
        {this.props.auth0.isAuthenticated ?
          <>
            <Logout />
            <Profile />
            {this.props.books.length ?
              <Carousel id="carousel">
                {this.props.books.map(book => (
                  <Carousel.Item>
                    <Image id="carousel-image"
                      className="w-100"
                      src={bookImg}
                      alt={book.title}
                    />
                    < Button onClick={event => this.props.handleBookDelete(event, book._id)} > Delete this Book!</Button >
                    <Carousel.Caption id="carousel-text-box">
                      <h2 className="carousel-text">{book.title}</h2>
                      <p className="carousel-text">{book.description}</p>
                      <p className="carousel-text">{book.status}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
              : <h3>no books found</h3>
          }
          </>
        : <Login />}
      </>
    )
  }
}

export default withAuth0(BookCarousel);
