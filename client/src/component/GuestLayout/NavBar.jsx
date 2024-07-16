import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

// import './NavBar.css'; // Import the CSS file for additional styling

const NavBar = () => {
  return (
    <div>
      <Navbar expand='lg' className="navbar">
        <Container>
          <Navbar.Toggle aria-controls='basic-navbar-nav'>
            <FaBars />
          </Navbar.Toggle>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={NavLink} to='/home'>Home</Nav.Link>
              <Nav.Link as={NavLink} to='/about'>About</Nav.Link>
              <Nav.Link as={NavLink} to='/signUp'>Signup</Nav.Link>

              <NavDropdown title="Login" id="collasible-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/guestLayout/Login">Login</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/guestLayout/adminlogin">Admin Login</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/guestLayout/staffLogin">Staff Login</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/guestLayout/circleOfficerLogin">Circle Officer Login</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={NavLink} to='/schemes'>Schemes</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
