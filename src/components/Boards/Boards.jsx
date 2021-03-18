import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { Container as BootstapContainer, Button } from 'react-bootstrap';
import Modal from './Modal';

const data = require('./data.json');

// eslint-disable-next-line react/prefer-stateless-function
class Boards extends Component {

  constructor(props) {
    super(props);
    this.state = {showModal: false, laneid: ''};
  }

  closeModal = () => {
    this.setState({showModal: false, laneid: ''});
  }

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
                    <Button 
                      variant="link" 
                      className="header-btn" 
                      onClick={() => this.setState({showModal: true, laneid: lane.id})}>Add card</Button>
                    <Modal 
                      key={lane.id}
                      show={this.state.showModal} 
                      onHide={this.closeModal}
                      laneid={this.state.laneid}
                    />
                    <Button>{lane.id}</Button>
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