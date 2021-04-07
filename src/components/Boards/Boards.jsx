/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { Container as BootstapContainer, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import Modal from './Modal';
import Header from '../Header';
import {
  applyDrag,
  getTodayDate,
  handleDateExp,
  asyncLocalStorage,
  extractTextContent,
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
      const cards = await asyncLocalStorage.getItem('boards');
      if (!cards) {
        await asyncLocalStorage.setItem('boards', JSON.stringify(mockedData));
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
    const { date, data } = this.state;
    const cards = JSON.parse(await asyncLocalStorage.getItem('boards'));
    const copiedData = JSON.parse(JSON.stringify(data));

    copiedData.tags = cards.tags;
    if (!copiedData.lanes[laneid].cards[date]) {
      copiedData.lanes[laneid].cards[date] = [];
    }
    copiedData.lanes[laneid].cards[date].push({
      title,
      description,
      id: btoa(Math.random()).substring(0, 12),
      tags,
    });

    this.setState({ data: copiedData });
    this.closeModal();

    // Update localStorage data after adding a new card.
    await asyncLocalStorage.setItem('boards', JSON.stringify(copiedData));
  };

  getCardPayload = (columnId, index) => {
    const { data, date } = this.state;
    return data.lanes.filter((p) => p.id === columnId)[0].cards[date][index];
  };

  onCardDrop = async (columnId, dropResult) => {
    const { data, date } = this.state;

    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = JSON.parse(JSON.stringify(data));
      const column = scene.lanes.filter((p) => p.id === columnId)[0];
      const columnIndex = scene.lanes.indexOf(column);

      const newColumn = JSON.parse(JSON.stringify(column));
      newColumn.cards[date] = applyDrag(newColumn.cards[date] || [], dropResult);
      scene.lanes.splice(columnIndex, 1, newColumn);

      this.setState({
        data: scene,
      });

      // After card swapping, Saving updated cards data into the localStorage.
      await asyncLocalStorage.setItem('boards', JSON.stringify(scene));
    }
  };

  copyCardsFromPrevDate = async () => {
    if (window.confirm('Are you sure to copy all cards from previous date?')) {
      let { data, date } = this.state;
      const copiedData = data;
      date = new Date(date);
      let yesterday;
      for (let i = 1; i < 366; i += 1) {
        yesterday = date - 1000 * 60 * 60 * 24 * i;
        yesterday = new Date(yesterday);
        yesterday = handleDateExp(yesterday);
        const updatedDate = handleDateExp(date);
        let ifBreak = false;
        copiedData.lanes.forEach((lane) => {
          if (lane.cards[yesterday] && lane.cards[yesterday].length > 0) {
            lane.cards[updatedDate] = lane.cards[yesterday];
            ifBreak = true;
          };
        });
        if (ifBreak) {
          break;
        }
      }

      this.setState({ data: copiedData });
      // Delete cards handling, Saving updated card to the localStorage.
      await asyncLocalStorage.setItem('boards', JSON.stringify(copiedData));
    };
  };

  deleteCards = async () => {
    if (window.confirm('Are you sure to delete all cards for current date?')) {
      const { data, date } = this.state;
      const copiedData = data;

      // Grab selected date and delete cards of specific date
      copiedData.lanes.forEach((lane) => {
        lane.cards[date] = [];
      });
      this.setState({ data: copiedData });

      // Delete cards handling, Saving updated card to the localStorage.
      await asyncLocalStorage.setItem('boards', JSON.stringify(copiedData));
    };
  };

  goLeft = async () => {
    const { date, data } = this.state;
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);

    const updatedDate = handleDateExp(yesterday);

    // Handle previous date data
    const scene = JSON.parse(JSON.stringify(data));
    scene.lanes.forEach(lane => lane.cards[updatedDate] = lane.cards[updatedDate] ? lane.cards[updatedDate] : []);

    this.setState({
      date: updatedDate,
      data: scene,
    });

    // Save the updated date in localStorage when user clicks on the left icon
    await asyncLocalStorage.setItem('boardDate', updatedDate);
  }

  goRight = async () => {
    const { date, data } = this.state;
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const updatedDate = handleDateExp(tomorrow);

    // Handle next date date
    const scene = JSON.parse(JSON.stringify(data));
    scene.lanes.forEach(lane => {
      lane.cards[updatedDate] = lane.cards[updatedDate] ? lane.cards[updatedDate] : [];
    });


    this.setState({
      date: updatedDate,
      data: scene,
    });

    // Save the updated date in the localStorage when user clicks on right icon
    await asyncLocalStorage.setItem('boardDate', updatedDate);
  }

  handleChangeDate = async ({ target: { value } }) => {
    const { data } = this.state;
    const scene = JSON.parse(JSON.stringify(data));
    scene.lanes.forEach(lane => {
      lane.cards[value] = lane.cards[value] ? lane.cards[value] : [];
    });

    this.setState({ date: value, data: scene });

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
    const { data, date } = this.state;

    // Here we are using deep cloning method to remove the reference from the data object.
    const copiedData = JSON.parse(JSON.stringify(data));
    copiedData.lanes[laneid].cards[date][cardID].title = title;
    copiedData.lanes[laneid].cards[date][cardID].description = description;
    copiedData.lanes[laneid].cards[date][cardID].tags = tags;

    this.setState({
      data: copiedData
    });

    // Closing the modal after update card details.
    this.closeModal();

    // update localStorage cards data after updating card title, description, tags...
    await asyncLocalStorage.setItem('boards', JSON.stringify(copiedData));
  }

  delCard = async (laneId, cardId) => {
    if (window.confirm('Are you sure to delete this card?')) {
      const { data, date } = this.state;

      // Here we are using deep cloning method to remove the reference from the data object.
      const copiedData = JSON.parse(JSON.stringify(data));
      copiedData.lanes[laneId].cards[date].splice(cardId, 1)

      this.setState({
        data: copiedData
      });

      await asyncLocalStorage.setItem('boards', JSON.stringify(copiedData));

    }
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
          copyCardsFromPrevDate={this.copyCardsFromPrevDate}
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
                    {column.cards[date]?.map((card, cardInd) => (
                      <Draggable className="card" key={card.id}>
                        <div className="title">
                          <p>{card.title}</p>
                        </div>
                        <hr />
                        <div className="description">
                          <p>{extractTextContent(card.description)}</p>
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
                        <FontAwesomeIcon onClick={
                          () => this.delCard(ind, cardInd)}
                          icon={faTrash}
                          className="fa-trash-icon" />
                      </Draggable>
                    ))}
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
  };
};

export default Boards;
