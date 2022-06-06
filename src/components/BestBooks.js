import React from 'react';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook';
import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBook: null
    }
  }
  handleBookSelect = (book) => {
    this.setState({ selectedBook: book });
  };

  handleClose = () => {
    this.setState({ selectedBook: null });
  }

  render() {
    return (
      <>
        <AddBook handleBookCreate={this.props.handleBookCreate} showModal={this.props.showModal} hideModal={this.props.hideModal} modalState={this.props.modalState} />
        <ListGroup>
          {this.props.books.length && this.props.books.map(book => (
            <ListGroup.Item key={book._id} >
              <Book info={book} onDelete={this.props.handleBookDelete} onSelect={this.handleBookSelect} />
            </ListGroup.Item>

          ))}
        </ListGroup>
        {this.state.selectedBook && (
          <UpdateBook book={this.state.selectedBook} show={this.state.selectedBook !== null} showModal={this.props.showModal} hideModal={this.props.hideModal} handleBookUpdate={this.props.handleBookUpdate} modalState={this.props.modalState} onClose={this.handleClose} />
        )}

      </>
    )
  }
}
class Book extends React.Component {

  update = () => {
    this.props.onSelect(this.props.info);
  }

  delete = () => {
    this.props.onDelete(this.props.info._id);
    console.log(this.props.info)
  }

  render() {
    return (
      <>
        <h3>
          {this.props.info.title}
          ,description: {this.props.info.title}
          ,status: {String(this.props.info.status)}
        </h3>
        <p>
          {/* <span onClick={this.update}>[Update]</span>
          <span onClick={this.delete}>[Delete]</span> */}
          <Button onClick={this.update}>Update This Book!</Button>
          <Button onClick={this.delete}>Delete This Book!</Button>
        </p>
      </>

    );
  }
}

export default BestBooks;
