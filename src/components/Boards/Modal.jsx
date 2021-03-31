/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';
import {
  Modal as BootstrapModal,
  Button,
  InputGroup,
  FormControl,
  Form,
} from 'react-bootstrap';

import TagsInput from '../TagsInput/TagsInput';

// eslint-disable-next-line react/prefer-stateless-function
class Modal extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      tags: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      title,
      description
    } = this.state;
    // I used to match values, The setState will only happen once the value changes.
    if (nextProps.editTitle !== title || nextProps.editDescription !== description) {
      this.setState({
        title: nextProps.editTitle,
        description: nextProps.editDescription,
        tags: nextProps.editTags ? nextProps.editTags : [],
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      tags
    } = this.state;
    const { addcard, laneid, isEdit, updateCardDetails, cardID } = this.props;
    if (title?.trim() && description?.trim()) {
      // Here I'm checking the edit flag, If it's true it means user want to edit the card details
      if (isEdit) {
        updateCardDetails({ title, description, laneid, cardID, tags });
      } else {
        addcard({ title, description, laneid, tags });
      }
    } else {
      alert('Please enter all the details');
    }
  };

  handleChangeTag = (tags) => this.setState({ tags });

  render() {
    // Here I perform destructuring of objects to access the value using ES6 method
    const {
      isEdit,
      show,
      onHide
    } = this.props;
    const {
      title,
      description,
      tags
    } = this.state;
    return (
      <BootstrapModal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="Modal"
      >
        <BootstrapModal.Header>
          <BootstrapModal.Title id="contained-modal-title-vcenter">
            {isEdit ? "Edit card" : "Add card"}
          </BootstrapModal.Title>
        </BootstrapModal.Header>
        <Form onSubmit={this.handleSubmit}>
          <BootstrapModal.Body>
            <Form.Group controlId="title">
              <InputGroup className="mb-3">
                <Form.Control
                  value={title}
                  // Here I perform destructuring of objects to access the value using ES6 method
                  onChange={({ target: { value } }) => this.setState({ title: value })}
                  type="Title"
                  placeholder="Enter Title"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="description">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>Description</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  value={description}
                  // Here I perform destructuring of objects to access the value using ES6 method
                  onChange={({ target: { value } }) =>
                    this.setState({ description: value })
                  }
                  as="textarea"
                  aria-label="description"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="tags">
              <InputGroup className="mb-3">
                <TagsInput handleChangeTag={this.handleChangeTag} tags={tags} />
              </InputGroup>
            </Form.Group>
          </BootstrapModal.Body>
          <BootstrapModal.Footer>
            <Button variant="success" type="submit">
              {isEdit ? "Edit" : "Add"}
            </Button>
            <Button onClick={onHide}>Close</Button>
          </BootstrapModal.Footer>
        </Form>
      </BootstrapModal>
    );
  }
}

export default Modal;
