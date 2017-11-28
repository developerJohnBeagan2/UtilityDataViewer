import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const HeadeNav = () => {
  const activeStyle = { color: 'orange' };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>Bar Chart</NavLink>
      <span style={{color: "#d3d3d3", marginLeft: "15px", marginRight: "15px"}}>|</span>
      <NavLink to="/lineChart" activeStyle={activeStyle}>Line Chart</NavLink>
      <span style={{color: "#d3d3d3", marginLeft: "15px", marginRight: "15px"}}>|</span>
      <NavLink to="/admin" activeStyle={activeStyle}>Admin</NavLink>
    </nav>
  );
};

HeadeNav.propTypes = {

};

export default HeadeNav;
