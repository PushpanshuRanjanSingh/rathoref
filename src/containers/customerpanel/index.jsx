import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import Header from '../header/header';
import Footer from '../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import styled from 'styled-components';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
import showNotification from '../../.../../services/notificationService';

import * as constant from '../.../../../services/constant';
import apiUrl from '../../globals/config';
var fileDownload = require('js-file-download');
export default function Index(props) {
  const [viewData, setViewData] = useState();
  const [role, setRole] = useState();
  const [post, setpost] = useState([]);
  const [pramsdata, setpramsdata] = useState(props.location.data);
  const [blockData, setblockData] = useState([]);
  const [state, setState] = React.useState('');
  const [agentdata, setagentdata] = useState('');
  const [stage, setstage] = useState();
  useEffect(() => {}, []);

  return (
    <>
      <div className='content-body'>
        <div className='container-fluid'>
          <div className='container-fluid'>hii</div>
        </div>
      </div>
    </>
  );
}
