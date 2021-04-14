/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';
import {
  Modal as BootstrapModal,
  Button,
  InputGroup,
  Form,
} from 'react-bootstrap';

import EditorInput from './EditorInput';
import TagsInput from './TagsInput/TagsInput';
import { asyncLocalStorage } from './utils';

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
    } = this.state;
    // I used to match values, The setState will only happen once the value changes.
    if (nextProps.editTitle !== title) {
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
    // Grabing all the tags from state and make it lowercase
    const updatedTags = tags.map(tag => tag.toLowerCase());

    if (title?.trim() && description) {
      // Here I'm checking the edit flag, If it's true it means user want to edit the card details
      if (isEdit) {
        updateCardDetails({ title, description, laneid, cardID, tags: updatedTags });
      } else {
        addcard({ title, description, laneid, tags: updatedTags });
      }
    } else {
      alert('Please enter all the details');
    }
  };

  handleChangeTag = async (tags, callback) => {
    const copiedData = await JSON.parse(await asyncLocalStorage.getItem('boards'));
    let updatedTags = [...copiedData?.tags, ...tags].map(tag => tag.toLowerCase());

    // Remove repeated values from the array
    updatedTags = [...new Set(updatedTags)];

    copiedData.tags = updatedTags.map(tag => tag.toLowerCase());
    this.setState({ tags });

    // Set updated tags to the localStorage
    await asyncLocalStorage.setItem('boards', JSON.stringify(copiedData));

    // Get tags from localStorage to use in tagInput component
    callback();
  };

  setDescriptionValue = (e) => this.setState({ description: e });

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
                <EditorInput
                  editorState={description}
                  onChange={this.setDescriptionValue}
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
