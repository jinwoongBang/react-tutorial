import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Row,
  Col
} from 'reactstrap';

import styled from 'styled-components';

const HeaderContainer = styled(Container)`
  /* text-align: center; */
  a {
    margin-right: 20px;
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props);
    const { changeToggle, changePage, toggle } = this.props;
    console.log('toggle : ', toggle);

    return (
      <HeaderContainer className="border" fluid={true}>
        <Row className="">
          <Col className="p-0">
            <Navbar className="border" color="light" light expand="md">
                <Nav>
                  <NavItem><Link to="/">Home</Link></NavItem>
                </Nav>
              <NavbarToggler onClick={changeToggle} />
              <Collapse isOpen={toggle} navbar>
                <Nav className="ml-auto">
                  <NavItem className="">
                    <Link to="/about">About</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/about/foo">About Foo</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/deviceList">Device</Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
      </HeaderContainer>
    );
  }
}

export default Header;
