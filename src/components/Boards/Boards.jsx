import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { Container as BootstapContainer, Button } from 'react-bootstrap';
import Modal from './Modal';
import Header from '../Header';
import { applyDrag } from './utils';

const data = require('./data.json');

// eslint-disable-next-line react/prefer-stateless-function
class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, laneid: '', data: data };
  }

  closeModal = () => {
    this.setState({ showModal: false, laneid: '' });
  };

  addCard = ({ title, description, laneid }) => {
    let _data = this.state.data;
    _data.lanes[laneid].cards.push({
      title,
      description,
      id: btoa(Math.random()).substring(0, 12),
      tags: ['tag1', 'tag2'],
    });
    this.setState({ data: _data });
  };

  getCardPayload = (columnId, index) => {
    return this.state.data.lanes.filter((p) => p.id === columnId)[0].cards[
      index
    ];
  };

  onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = Object.assign({}, this.state.data);
      const column = scene.lanes.filter((p) => p.id === columnId)[0];
      const columnIndex = scene.lanes.indexOf(column);

      const newColumn = Object.assign({}, column);
      newColumn.cards = applyDrag(newColumn.cards, dropResult);
      scene.lanes.splice(columnIndex, 1, newColumn);

      this.setState({
        data: scene,
      });
    }
  };

  deleteCards = () => {
    const { data } = this.state;
    const copiedData = JSON.parse(JSON.stringify(data));
    copiedData.lanes.forEach((lane) => {
      lane.cards = [];
    });
    this.setState({ data: copiedData });
  };

  render() {
    return (
      <>
        <Header deleteCards={this.deleteCards} />
        <BootstapContainer className="board-container">
          <Container orientation="horizontal">
            {this.state.data.lanes.map((column, ind) => {
              return (
                <div key={column.id} className="lane">
                  <div className="card-container">
                    <div className="card-column-header">
                      <span className="column-drag-handle">&#x2630;</span>
                      {column.name}
                    </div>
                    <Container
                      {...column.props}
                      groupName="col"
                      onDrop={(e) => this.onCardDrop(column.id, e)}
                      getChildPayload={(index) =>
                        this.getCardPayload(column.id, index)
                      }
                      dragClass="card-ghost"
                      dropClass="card-ghost-drop"
                      dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'drop-preview',
                      }}
                      dropPlaceholderAnimationDuration={200}
                    >
                      {column.cards.map((card) => {
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
                </div>
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
      </>
    );
  }
}

export default Boards;
