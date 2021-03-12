import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prefer-stateless-function
class Navbar extends Component {
  render() {
    return (
      <Container className="header-container">
        <Row>
          <Col xs lg="2">
            1 of 3
          </Col>
          <Col md="auto">Variable width content</Col>
          <Col xs lg="2">
            3 of 3
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col><FontAwesomeIcon icon={faArrowLeft} /></Col>
          <Col md="auto">
            31.01.2021 <FontAwesomeIcon icon={faCalendarDay}/>
          </Col>
          <Col>
            <FontAwesomeIcon icon={faArrowRight} className="right-arrow"/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Navbar;
