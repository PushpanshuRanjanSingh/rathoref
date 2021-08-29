import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import showNotification from "../../services/notificationService";
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import Header from '../header/header';
import Footer from '../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import apiUrl from '../../globals/config';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Cmtcreate from './component/Cmtcreate';
import Insurancecreate from './component/Insurancecreate';
import Financecreate from './component/financecreate';
import Naayak from './component/Naayak';
import Financer from './component/Financer';
import Insurance from './component/Insurance';
// import UserBanner from './component/UserBanner';
import Delear from './component/Delear';
import DealerTab from '../customermanpanel/component/DealerTabProfoma';
import DealerTabProfoma from '../customermanpanel/component/DealerTabProfoma';
import DealerTabDo from '../customermanpanel/component/DealerTabDo';
import DealerTabL2 from '../customermanpanel/component/DealerTabL2';
import DealerTabInsurance from '../customermanpanel/component/DealerTabInsurance';
import DealerTabTaxToken from '../customermanpanel/component/DealerTabTaxToken';
import DealerTabL5 from '../customermanpanel/component/DealerTabL5';
import DealerTabLClosingDocuments from '../customermanpanel/component/DealerTabClosingDocuments';
import EstimatePDF from '../customermanpanel/component/estimatePDF';
import Stage from '../customermanpanel/component/Stage';
function DealerSection(props) {

  return (
    <>
        {/* <Header /> */}
        <div className='content-body'>
        <div className='container-fluid'>
         
          <Stage/>
          <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
            <Tab label='Proforma '>
            <DealerTabProfoma />
            </Tab>
            <Tab label='DO'>
              <DealerTabDo />
            </Tab>
            <Tab label='L2 '>
              <DealerTabL2 />
            </Tab>
            <Tab label='Insurance '>
              <DealerTabInsurance />
            </Tab>
            <Tab label='Tax Token '>
              <DealerTabTaxToken />
            </Tab>
            <Tab label='L5'>
              <DealerTabL5 />
            </Tab>
            <Tab label='Closing Documents'>
              <DealerTabLClosingDocuments />
            </Tab>
          </Tabs>
         
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
  
 
}

export default DealerSection;
