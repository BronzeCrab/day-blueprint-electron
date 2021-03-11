import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import '../App.global.css';

// eslint-disable-next-line react/prefer-stateless-function
class Navbar extends Component {
  render() {
    return (
      <Nav>
        <Nav.Item className="nav-link">
          <Link to="/">Boards</Link>
        </Nav.Item>
        <Nav.Item className="nav-link">
          <Link to="/stats">Stats</Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default Navbar;
