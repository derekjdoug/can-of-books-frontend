import React from 'react';
import bookImg from './bookImg.jpg';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

class BookCarousel extends React.Component {
  render() {
    return (
      <>
        <Carousel id="carousel">
          {this.props.books.map(book => (
            <Carousel.Item>
              <Image id="carousel-image"
                className="w-100"
                src={bookImg}
                alt={book.title}
              />
              <Carousel.Caption id="carousel-text-box">
                <h2 className="carousel-text">{book.title}</h2>
                <p className="carousel-text">{book.description}</p>
                <p className="carousel-text">{book.status}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </>
    )
  }
}

export default BookCarousel;
