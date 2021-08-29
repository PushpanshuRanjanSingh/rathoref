import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../../globals/base';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import styled from 'styled-components';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Topfivefreshlead from '../component/Topfivefreshlead';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Stage from '../component/Stage';
import apiUrl from '../../../globals/config';
import FinanceApproved from '../component/FinanceApproved';
import FinanceREject from '../component/FinanceREject';
import DropLead from '../component/DropLead';
import EstimateDisapproved from '../component/EstimateDisapproved';
import Alluser from '../../admin/component/Alluser';
import EstimateGenerated from '../component/EstimateGenerated';
import Approved from '../Approved';
import Reject from '../Reject';
function Index() {
  const [page, setPage] = useState(1);
  const [countLeadd, setcountLeadd] = useState('');
  useEffect(() => {
    lead();
  }, [page]);
  const lead = () => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'user/totalLeadCountCMT', headers)

      .then((resp) => {
        setcountLeadd(resp?.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <>
      {/* <Header /> */}
      <div className='content-body'>
        <div className='container-fluid'>
         
         <Stage/>
          <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
            <Tab label='Approved '>
              <FinanceApproved />
            </Tab>
            <Tab label='Rejected'>
              <FinanceREject />
            </Tab>
          </Tabs>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Index;
