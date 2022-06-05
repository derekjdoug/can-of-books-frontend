import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';

class UpdateBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.book?._id,
      title: this.props.book?.title,
      description: this.props.book?.description,
      status: this.props.book?.status,
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleBookUpdate(this.state);
    this.props.hideModal();
    this.handleClose();
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  handleStatusChange = event => {
    this.setState({ status: event.target.checked });
  };

  handleClose = () => {
    this.props.hideModal();
  }


  render() {
    return (
      <>
      <Button onClick={this.props.showModal}>Update This Book!</Button>
      <Modal show={this.props.modalState} onHide={this.props.hideModal}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Update a book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                type="name"
                placeholder="Book title go here"
                onChange={this.handleTitleChange}
                value={this.state.title}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                type="name"
                placeholder="Description"
                onChange={this.handleDescriptionChange}
                value={this.state.description}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStatus">
                <Form.Check
                type="checkbox"
                label="Available?"
                onChange={this.handleStatusChange}
                checked={this.state.status}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.hideModal} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
    )
  }
}

export default UpdateBook;
