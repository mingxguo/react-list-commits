import React from 'react';
import logo from '../../logo.svg';

// Header component for the application.
function AppHeader(){
  return (
    <div>
      <img src={logo} className="header-logo" alt="logo" />
      <label className="header-title"> React </label>
    </div>
  );
}

export default AppHeader;
