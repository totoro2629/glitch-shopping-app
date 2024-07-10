// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #007bff;
  padding: 25px 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  margin-left: 20px;

  &:hover {
    text-decoration: sway;
  }
`;

const Logo = styled.h2`
  color: #fff;
  margin: 0;
`;

const Navbar = () => (
  <Nav>
    <Logo>My Shopping App</Logo>
    <NavLinks>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/mystylist">My Stylist</NavLink>
      <NavLink to="/minis">Minis</NavLink>
    </NavLinks>
  </Nav>
);

export default Navbar;
