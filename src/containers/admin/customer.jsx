import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import Header from '../header/header';
import Footer from '../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import apiUrl from '../../globals/config';
import Alluser from './component/Alluser';
import Allverifyuser from './component/Allverifyuser';
import Coustomerbought from './component/Coustomerbought';
import Rejected from './component/Rejected';
function Customer(props) {
  const [state, setstate] = React.useState({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Interest',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  });
  const [page, setPage] = useState(1);
  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  const [confirmLeadr, setconfirmLeadr] = useState([]);
  const [confirmLeadv, setconfirmLeadv] = useState([]);
  
  return (
    <>
      {/* <Header /> */}
      <div className='content-body'>
        <div className='container-fluid'>
          <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
            <Tab label='All Users '>
              <Alluser />
            </Tab>
            <Tab label='Verified Users'>
              <Allverifyuser />
            </Tab>
            <Tab label='Rejected Users'>
              <Rejected />
            </Tab>
            <Tab label='Customers'>
              <Coustomerbought />
            </Tab>
          </Tabs>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Customer;
