import React, { Component } from 'react';
import * as loadjs from 'loadjs';
import base from './../globals/base';
import * as service from '../services/apiServices';
import showNotification from '../services/notificationService';
import * as constant from '../services/constant';
import ViewCompany from './viewCompany';
import { useHistory } from 'react-router-dom';
const Services = (props) => {
  const history = useHistory();
  var user = JSON.parse(localStorage.getItem('user'));
  const [state, setState] = React.useState(history?.location?.data ?? user);
  console.log(`history`, state);
  if (state) {
    localStorage.setItem('user', JSON.stringify(state));
  }

  return (
    <div className='page-wrapper services-page'>
      <ViewCompany state={state} />
    </div>
  );
};
export default Services;
