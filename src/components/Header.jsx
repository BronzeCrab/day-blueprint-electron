import React, { Component } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prefer-stateless-function
class Navbar extends Component {
  render() {
    return (
      <Container className="header-container">
        <Row>
          <Col>
            <ButtonGroup>
              <Button variant="secondary" className="header-btn">daily</Button>
              <Button variant="secondary" className="header-btn">weekly</Button>
            </ButtonGroup>
            <ButtonGroup className="right-btn-group"> 
              <Button variant="primary" className="header-btn">Copy</Button>
              <Button variant="danger" className="header-btn">Delete</Button>
            </ButtonGroup>
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
