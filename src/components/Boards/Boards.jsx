import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

// eslint-disable-next-line react/prefer-stateless-function
class Boards extends Component {
  render() {
    return (
      <div>
        <Container>
          <Draggable>
            item
          </Draggable>
        </Container>
      </div>
    );
  }
}

export default Boards;