import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import './Navigation.css';


const NavigationItems = props => (
  <Nav className='ml-auto' navbar>
    {props.paths.map(path => {
      return (
        <NavItem className='navItem' key={path}>
          <Link className='navLink' to={`/${path}`}>{path}</Link>
        </NavItem>
      );
    })}
  </Nav>
);

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false };
  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    const currentPath = this.props && this.props.pathname ? this.props.pathname : null;
    const paths = ['projects'];

    return (
      <div className='navigation'>
        <Navbar color='faded' light expand='sm'>
          <Link className='navBrand' to='/'>CV</Link>

          <NavbarToggler onClick={this.toggle} />

          <Collapse isOpen={this.state.isOpen} navbar>
            <NavigationItems paths={paths} />
          </Collapse>
        </Navbar>

        {currentPath !== '/' &&
          <div className='extraMargin' />}
      </div>
    );
  }
}


export default Navigation;
