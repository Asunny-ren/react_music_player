import React, {Component} from 'react';
import './header.styl';
import logo from '../../static/images/logo.png'
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render () {
    return (
      <div className="component-header">
        <NavLink to="/">
          <img src={logo} width="40" alt="" className="-col-auto"/>
          <h1 className="caption">React Music Player</h1>
        </NavLink>
      </div>
    )
  }
}

export default Header;