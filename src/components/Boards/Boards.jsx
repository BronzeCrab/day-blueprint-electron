import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { Container as BootstapContainer, Button } from 'react-bootstrap';

const data = require('./data.json');

// eslint-disable-next-line react/prefer-stateless-function
class Boards extends Component {
  render() {
    return (
      <BootstapContainer className="board-container">
        <Container orientation="horizontal">
          {data.boards[0].lanes.map(lane => {
            return (
              <Draggable key={lane.id}>
                <div className="card-container">
                  <div className="card-column-header">
                    <span className="column-drag-handle">&#x2630;</span>
                    {lane.title}
                  </div>
                  <Container>
                    <Draggable className="card">
                      <div>
                        <p>test</p>
                      </div>
                    </Draggable>
                    <Button variant="link" className="header-btn">Add card</Button>
                  </Container>
                </div>
              </Draggable>
            );
          })}
        </Container>
      </BootstapContainer>
    );
  }
}

export default Boards;