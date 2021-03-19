import React, { Component } from 'react';
import { Modal as BootstrapModal, Button, InputGroup, FormControl, Form } from 'react-bootstrap';

// eslint-disable-next-line react/prefer-stateless-function
class Modal extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    // alert(event.target.title.value + ' ' + event.target.description.value + " " + event.target.tags.value)
    alert(this.props.laneid)
  }

  render() {
    return (
      <BootstrapModal
        // eslint-disable-next-line
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="Modal"
      >
        <BootstrapModal.Header>
          <BootstrapModal.Title id="contained-modal-title-vcenter">
            Add card
          </BootstrapModal.Title>
        </BootstrapModal.Header>
        <Form onSubmit={this.handleSubmit} > 
          <BootstrapModal.Body>
            <Form.Group controlId="title">
              <InputGroup className="mb-3">
                <Form.Control type="Title" placeholder="Enter Title" />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="description">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>Description</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="textarea" aria-label="description" />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="tags">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Tags"
                  aria-label="tags"
                />
              </InputGroup>
            </Form.Group>
          </BootstrapModal.Body>
          <BootstrapModal.Footer>
            <Button variant="success" type="submit">Add</Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </BootstrapModal.Footer>
        </Form>
      </BootstrapModal>
    );
  }
}

export default Modal;