import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { Container as BootstapContainer, Button } from 'react-bootstrap';
import Modal from './Modal';
import { applyDrag } from './utils';

const data = require('./data.json');

// eslint-disable-next-line react/prefer-stateless-function
class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, laneid: '', data: JSON.parse(JSON.stringify(data)) };
  }

  closeModal = () => {
    this.setState({ showModal: false, laneid: '' });
  };

  addCard = ({ title, description, laneid }) => {
    let _data = JSON.parse(JSON.stringify(this.state.data));
    _data.children[laneid].children.push({
      title,
      description,
      id: btoa(Math.random()).substring(0,12),
      "type": "draggable",
      "props": {
        "className": "card",
        "style": {}
      },
      "tags": ["tag1", "tag2"],
    });
    this.setState({ data: _data });
  };

  getCardPayload = (columnId, index) => {
    return this.state.data.children.filter(p => p.id === columnId)[0].children[
      index
    ];
  }

  onColumnDrop = (dropResult) => {
    const scene = Object.assign({}, this.state.data);
    scene.children = applyDrag(this.state.data.children, dropResult);
    this.setState({
      data: scene
    });
  }

  onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = Object.assign({}, this.state.data);
      const column = scene.children.filter(p => p.id === columnId)[0];
      const columnIndex = scene.children.indexOf(column);

      const newColumn = Object.assign({}, column);
      newColumn.children = applyDrag(newColumn.children, dropResult);
      scene.children.splice(columnIndex, 1, newColumn);

      this.setState({
        data: scene
      });
    }
  }

  render() {
    return (
      <BootstapContainer className="board-container">
        <Container
          orientation="horizontal"
          onDrop={this.onColumnDrop}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
        >
          {this.state.data.children.map((column, ind) => {
            return (
              <Draggable key={column.id}>
                <div className={column.props.className}>
                  <div className="card-column-header">
                    <span className="column-drag-handle">&#x2630;</span>
                    {column.name}
                  </div>
                  <Container
                    {...column.props}
                    groupName="col"
                    onDrop={e => this.onCardDrop(column.id, e)}
                    getChildPayload={index =>
                      this.getCardPayload(column.id, index)
                    }
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{                      
                      animationDuration: 150,
                      showOnTop: true,
                      className: 'drop-preview' 
                    }}
                    dropPlaceholderAnimationDuration={200}
                  >
                    {column.children.map(card => {
                      return (
                        <Draggable className="card" key={card.id}>
                          <div className="title">
                            <p>{card.title}</p>
                          </div>
                          <hr />
                          <div className="description">
                            <p>{card.description}</p>
                          </div>
                        </Draggable>
                      );
                    })}
                    <Button
                      variant="link"
                      className="header-btn"
                      onClick={() =>
                        this.setState({
                          showModal: true,
                          laneid: ind,
                        })
                      }
                    >
                      Add card
                    </Button>
                  </Container>
                </div>
              </Draggable>
            );
          })}
          <Modal
            show={this.state.showModal}
            onHide={this.closeModal}
            _addcard={this.addCard}
            laneid={this.state.laneid}
          />
        </Container>
      </BootstapContainer>
    );
  }
}

export default Boards;
