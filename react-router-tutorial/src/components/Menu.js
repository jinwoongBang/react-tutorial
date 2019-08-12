import React from 'react';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  const activeStyle = {
    color: 'green',
    fontSize: '2rem'
  };
  return (
    <div>
      <ul>
        <li>
          {/* <Link to="/">Home</Link> */}
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
        </li>
        <li>
          {/* <Link to="/about">About</Link> */}
          <NavLink exact to="/about" activeStyle={activeStyle}>About</NavLink>
        </li>
        <li>
          {/* <Link to="/about/foo">About Foo</Link> */}
          <NavLink exact to="/about/foo" activeStyle={activeStyle}>About Foo</NavLink>
        </li>
        <li>
          {/* <Link to="/about/foo">About Foo</Link> */}
          <NavLink exact to="/posts" activeStyle={activeStyle}>Posts</NavLink>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default Menu;
