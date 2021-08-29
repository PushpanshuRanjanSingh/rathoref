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
import apiUrl from '../../../globals/config';
import * as constant from "../../.../../../services/constant";
import Leadscomponent from '../component/Leadscomponent';
import Leadscomponentreject from '../component/Leadscomponentreject';
import DropLead from '../component/DropLead';
import EstimateDisapproved from '../component/EstimateDisapproved';
import Alluser from '../../admin/component/Alluser';
import EstimateGenerated from '../component/EstimateGenerated';
import BrandQuery from '../component/BrandQuery';
import showNotification from "../../../services/notificationService";
import Approved from '../Approved';
import Reject from '../Reject';
import Stage from '../component/Stage';
function Index() {
  const [page, setPage] = useState(constant.START);
  const [countLeadd, setcountLeadd] = useState('');
  const [stage, setstage] = useState("");
  useEffect(() => {
    lead();
    stagelead();
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
        showNotification("danger", err.message);
      });
  };
  const stagelead = () => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "user/cmtStages", headers)

      .then((resp) => {
        setstage(resp?.data);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  return (
    <>
      <div className='content-body'>
        <div className='container-fluid'>
          <Row className='mb-4 leads_row'>
            <Col sm={6} xl={3}>
              <div className='widget-stat card shutter-in-vertical'>
                <div className='card-body p-4 d-flex flex-column justify-content-center'>
                  <div className='media ai-icon d-flex justify-content-center flex-column'>
                    <span className='mr-3  text-danger mb-1'>
                      <Image
                        className=''
                        alt='img'
                        src={'assets/images/total_leads.png'}
                      />
                    </span>
                    <div className='media-body text-center'>
                      <h4 className='mb-2'>
                        {' '}
                        {countLeadd?.totalLead ? countLeadd?.totalLead : '0'}
                      </h4>
                      <h5 className='mb-0'> Total Leads</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={6} xl={3}>
              <div className='widget-stat card shutter-in-vertical'>
                <Link className='' to='/approvedLead'>
                  <div className='card-body p-4 d-flex flex-column justify-content-center'>
                    <div className='media ai-icon d-flex justify-content-center flex-column'>
                      <span className='mr-3  text-danger mb-1'>
                        <Image
                          className=''
                          alt='img'
                          src={'assets/images/approved_leads.png'}
                        />
                      </span>
                      <div className='media-body text-center'>
                        <h4 className='mb-2'>
                          {countLeadd?.approvedLead
                            ? countLeadd?.approvedLead
                            : '0'}
                        </h4>
                        <h5 className='mb-0'>Approved Leads</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Col>
            <Col sm={6} xl={3}>
              <div className='widget-stat card shutter-in-vertical'>
                <Link className='' to='/rejectedLead'>
                  <div className='card-body p-4 d-flex flex-column justify-content-center'>
                    <div className='media ai-icon d-flex justify-content-center flex-column'>
                      <span className='mr-3  text-danger mb-1'>
                        <Image
                          className=''
                          alt='img'
                          src={'assets/images/rejected _lead.png'}
                        />
                      </span>
                      <div className='media-body text-center'>
                        <h4 className='mb-2'>
                          {countLeadd?.rejectLead
                            ? countLeadd?.rejectLead
                            : '0'}
                        </h4>
                        <h5 className='mb-0'>Rejected Leads</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Col>
            <Col sm={6} xl={3}>
              <div className='widget-stat card shutter-in-vertical'>
                <Link className='' to='/addLead'>
                  <div className='card-body p-4 d-flex flex-column justify-content-center'>
                    <div className='media ai-icon d-flex justify-content-center flex-column'>
                      <span className='mr-3  text-danger mb-1'>
                        <Image
                          className=''
                          alt='img'
                          src={'assets/images/add_leads.png'}
                        />
                      </span>
                      <div className='media-body text-center'>
                        <h5 className='mb-0'>New Leads</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Col>
          </Row>
          <Stage/>
          <div className="tabsWrap">
          <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
            <Tab label='Personal Lead'>
             <BrandQuery/>
            </Tab>
            <Tab label='Agent Lead'>
              <Leadscomponent url='user/cmtfreshLead?skip=' />
            </Tab>
            <Tab label='Approved Leads'>
              <Approved />
            </Tab>
            <Tab label='Estimate generated'>
              <EstimateGenerated />
            </Tab>
            <Tab label='Rejected Leads'>
              <Reject />
            </Tab>
            <Tab label='Esimate Disapproved Leads'>
              <EstimateDisapproved />
            </Tab>
            <Tab label='Droped Leads'>
              <DropLead />
            </Tab>
            
          </Tabs>
          </div>
       
        </div>
      </div>
    </>
  );
}

export default Index;
