/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import DatePicker from './Boards/DatePicker';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component {

  render() {
    const {
      copyCardsFromPrevDate,
      deleteCards,
      goLeft,
      goRight,
      date,
      handleChangeDate
    } = this.props;
    return (
      <Container className="header-container">
        <Row>
          <Col>
            <ButtonGroup>
              <Button variant="secondary" className="header-btn">
                daily
              </Button>
              <Button variant="secondary" className="header-btn">
                weekly
              </Button>
            </ButtonGroup>
            <ButtonGroup className="right-btn-group">
              <Button
                variant="primary"
                className="header-btn"
                onClick={copyCardsFromPrevDate}
              >
                Copy
              </Button>
              <Button
                variant="danger"
                className="header-btn"
                onClick={deleteCards}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <FontAwesomeIcon icon={faArrowLeft} onClick={goLeft} />
          </Col>
          <Col md="auto">
            <DatePicker handleChange={handleChangeDate} dateVal={date} />
          </Col>
          <Col>
            <FontAwesomeIcon icon={faArrowRight} onClick={goRight} className="right-arrow" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;
