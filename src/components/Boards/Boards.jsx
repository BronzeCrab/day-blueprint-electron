import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { Container as BootstapContainer } from 'react-bootstrap';

const data = require('./data.json');

// eslint-disable-next-line react/prefer-stateless-function
class Boards extends Component {
  render() {
    return (
      <BootstapContainer className="board-container">
        <Container orientation="horizontal">
          {data.boards[0].lanes.map(column => {
            return (
              <Draggable key={column.id}>
                <div className="card-container">
                  <div className="card-column-header">
                    <span className="column-drag-handle">&#x2630;</span>
                    {column.title}
                  </div>
                  <Container
                    dropPlaceholder={{                      
                      animationDuration: 150,
                      showOnTop: true,
                      className: 'drop-preview' 
                    }}
                    dropPlaceholderAnimationDuration={200}
                  >
                    <Draggable className="card">
                      <div>
                        <p>test</p>
                      </div>
                    </Draggable>
                    <Draggable className="card">
                      <div>
                        <p>test</p>
                      </div>
                    </Draggable>
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