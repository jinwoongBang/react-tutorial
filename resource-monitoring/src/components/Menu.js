import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import styled from 'styled-components';

const MenuContainer = styled(Row)`
`;

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props);
    const { changeToggle, toggle } = this.props;
    console.log('toggle : ', toggle);

    return (
      <MenuContainer className="border">
          <Navbar color="light" light expand="md">
            <Link to="/">Home</Link>
            <NavbarToggler onClick={changeToggle} />
            <Collapse isOpen={toggle} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/about">About</Link>
                </NavItem>
                <NavItem>
                  <Link to="/about/foo">About Foo</Link>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Option 1</DropdownItem>
                    <DropdownItem>Option 2</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
      </MenuContainer>
    );
  }
}

export default Menu;
