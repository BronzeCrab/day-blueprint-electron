/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { Container as BootstapContainer, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import Modal from './Modal';
import Header from '../Header';
import {
  applyDrag,
  getTodayDate,
  handleDateExp,
  asyncLocalStorage,
} from './utils';

const mockedData = require('./data.json');

const currentDate = getTodayDate();

// eslint-disable-next-line react/prefer-stateless-function
class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      laneid: '',
      data: mockedData,
      date: currentDate,
      isEdit: false,
      editTitle: '',
      editDescription: '',
      cardID: '',
    };
  }

  componentDidMount() {
    this.checkStorageForCards();
    this.checkStorageForDate();
  };

  checkStorageForCards = async () => {
    try {
      const cards = await asyncLocalStorage.getItem('cards');
      if (!cards) {
        await asyncLocalStorage.setItem('cards', JSON.stringify(mockedData));
      } else {
        this.setState({ data: JSON.parse(cards) });
      }
    } catch (err) {
      console.error(err);
    }
  };

  checkStorageForDate = async () => {
    try {
      const storageDate = await asyncLocalStorage.getItem('boardDate');
      storageDate && this.setState({ date: storageDate });
    } catch (err) {
      console.error(err);
    }
  };

  closeModal = () => this.setState({
    showModal: false,
    laneid: '',
    isEdit: false,
    editTitle: '',
    editDescription: '',
    editTags: [],
    cardID: '',
  });

  addCard = async ({ title, description, laneid, tags }) => {
    const { data } = this.state;
    const copiedData = JSON.parse(JSON.stringify(data));
    copiedData.lanes[laneid].cards.push({
      title,
      description,
      id: btoa(Math.random()).substring(0, 12),
      tags,
    });
    this.setState({ data: copiedData });
    this.closeModal();

    // Update localStorage data after adding a new card.
    await asyncLocalStorage.setItem('cards', JSON.stringify(copiedData));
  };

  getCardPayload = (columnId, index) => {
    const { data } = this.state;
    return data.lanes.filter((p) => p.id === columnId)[0].cards[
      index
    ];
  };

  onCardDrop = async (columnId, dropResult) => {
    const { data } = this.state;
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = { ...data };
      const column = scene.lanes.filter((p) => p.id === columnId)[0];
      const columnIndex = scene.lanes.indexOf(column);

      const newColumn = { ...column };
      newColumn.cards = applyDrag(newColumn.cards, dropResult);
      scene.lanes.splice(columnIndex, 1, newColumn);

      this.setState({
        data: scene,
      });

      // After card swapping, Saving updated cards data into the localStorage.
      await asyncLocalStorage.setItem('cards', JSON.stringify(scene));
    }
  };

  deleteCards = async () => {
    const { data } = this.state;
    const copiedData = data;
    copiedData.lanes.forEach((lane) => {
      lane.cards = [];
    });
    this.setState({ data: copiedData });

    // Delete cards handling, Saving updated card to the localStorage.
    await asyncLocalStorage.setItem('cards', JSON.stringify(copiedData));
  };

  goLeft = async () => {
    const { date } = this.state;
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    this.setState({
      date: handleDateExp(yesterday),
    });

    // Save the updated date in localStorage when user clicks on the left icon
    asyncLocalStorage.setItem('boardDate', handleDateExp(yesterday));
  }

  goRight = async () => {
    const { date } = this.state;
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.setState({
      date: handleDateExp(tomorrow),
    });
    // Save the updated date in the localStorage when user clicks on right icon
    await asyncLocalStorage.setItem('boardDate', handleDateExp(tomorrow));
  }

  handleChangeDate = async ({ target: { value } }) => {
    this.setState({ date: value });
    // Save the updated date in localStorage
    await asyncLocalStorage.setItem('boardDate', value);
  }

  updateCardDetails = async ({
    title,
    description,
    laneid,
    cardID,
    tags
  }) => {
    const { data } = this.state;

    // Here we are using deep cloning method to remove the reference from the data object.
    const copiedData = JSON.parse(JSON.stringify(data));
    copiedData.lanes[laneid].cards[cardID].title = title;
    copiedData.lanes[laneid].cards[cardID].description = description;
    copiedData.lanes[laneid].cards[cardID].tags = tags;

    this.setState({
      data: copiedData
    });

    // use to close the modal.
    this.closeModal();

    // update localStorage cards data after updating card title, description, tags...
    await asyncLocalStorage.setItem('cards', JSON.stringify(copiedData));
  }

  render() {
    const {
      date,
      data,
      laneid,
      showModal,
      isEdit,
      editTitle,
      editDescription,
      cardID,
      editTags
    } = this.state;
    return (
      <>
        <Header
          deleteCards={this.deleteCards}
          goLeft={this.goLeft}
          goRight={this.goRight}
          date={date}
          handleChangeDate={this.handleChangeDate}
        />
        <BootstapContainer className="board-container">
          <Container orientation="horizontal">
            {data.lanes.map((column, ind) => (
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
                    {column.cards.map((card, cardInd) => {
                      return (
                        <Draggable className="card" key={card.id}>
                          <div className="title">
                            <p>{card.title}</p>
                          </div>
                          <hr />
                          <div className="description">
                            <p>{card.description}</p>

                          </div>
                          <FontAwesomeIcon onClick={() =>
                            this.setState({
                              showModal: true,
                              laneid: ind,
                              isEdit: true,
                              editTitle: card.title,
                              editDescription: card.description,
                              cardID: cardInd,
                              editTags: card.tags,
                            })
                          } icon={faEdit} />
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
                      + Add card
                      </Button>
                  </Container>
                </div>
              </div>
            ))}
            <Modal
              show={showModal}
              onHide={this.closeModal}
              addcard={this.addCard}
              laneid={laneid}
              isEdit={isEdit}
              editTitle={editTitle}
              editDescription={editDescription}
              updateCardDetails={this.updateCardDetails}
              cardID={cardID}
              editTags={editTags}
            />
          </Container>
        </BootstapContainer>
      </>
    );
  }
}

export default Boards;
