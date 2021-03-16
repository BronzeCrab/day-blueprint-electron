import React, { Component } from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

// eslint-disable-next-line react/prefer-stateless-function
class Modal extends Component {
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
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title id="contained-modal-title-vcenter">
            Modal heading
          </BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    );
  }
}

export default Modal;