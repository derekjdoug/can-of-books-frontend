import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// DONE: pass showModal, handleBookCreate(), hideModal, and modal var in state above
// TODO: change backend to include boolean status
class AddBook extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleBookCreate({ title: event.target.formTitle.value, description: event.target.formDescription.value, status: event.target.formStatus.checked });
    this.props.hideModal();
  }
  render() {
    return (
      <>
        <Button onClick={this.props.showModal}>Create a New Book!</Button>
        <Modal show={this.props.modalState} onHide={this.props.hideModal}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Create a new book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="name" placeholder="Book title go here" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="name" placeholder="Description" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formStatus">
                  <Form.Check type="checkbox" label="Available?" />
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

export default AddBook;
