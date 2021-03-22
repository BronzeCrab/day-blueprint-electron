import React, { Component } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCalendarDay,
} from '@fortawesome/free-solid-svg-icons';
import { getTodayDate } from './utils';

const date = getTodayDate();

// eslint-disable-next-line react/prefer-stateless-function
class Navbar extends Component {
  render() {
    const { deleteCards } = this.props;
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
              <Button variant="primary" className="header-btn">
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
            <FontAwesomeIcon icon={faArrowLeft} />
          </Col>
          <Col md="auto">
            {date} <FontAwesomeIcon icon={faCalendarDay} />
          </Col>
          <Col>
            <FontAwesomeIcon icon={faArrowRight} className="right-arrow" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Navbar;
