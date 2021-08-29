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
import Leadscomponent from '../component/Leadscomponent';
import Leadscomponentreject from '../component/Leadscomponentreject';
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
         
          <Row className='mb-4 leads_row'>
            <Col sm={6} xl={3}>
              <div className='widget-stat card shutter-in-vertical'>
                {/* <Link className='' to='/'> */}
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
                {/* </Link> */}
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
          <section class='ttm-row ttm-bg ttm-bgimage-yes bg-img3 process-section clearfix mb-3'>
            <Row className='mb-4'>
              <Col lg={12} className='mb-2'>
                <div className='d-block pb-0 border-0'>
                  <div className='mr-auto pr-3'>
                    <h4 className='text-black font-w600 fs-20'>
                      Stages of a lead
                    </h4>
                  </div>
                </div>
              </Col>
            </Row>
            <div class='container-fluid mt-1 pt-0'>
              <div class='row mb-5'>
                <div class='col-lg-12'>
                  <div class='row ttm-processbox-wrapper ttm-processbox-wrapper2 justify-content-center'>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div class='ttm-processbox'>
                        <div class='ttm-box-image'>
                          <div class='process-num'>
                            <span class='number'>C1</span>
                          </div>
                        </div>
                        <div class='featured-content'>
                          <div class='featured-title'>
                            <h6 className='mb-1'>Confirmed Lead </h6>
                            <p>120</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div class='ttm-processbox res-991-mb-50'>
                        <div class='ttm-box-image'>
                          <div class='process-num'>
                            <span class='number'>C2</span>
                          </div>
                        </div>
                        <div class='featured-content'>
                          <div class='featured-title'>
                            <h6 className='mb-1'>Quotation Generated </h6>
                            <p>10</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div class='ttm-processbox'>
                        <div class='ttm-box-image'>
                          <div class='process-num'>
                            <span class='number'>C3</span>
                          </div>
                        </div>
                        <div class='featured-content'>
                          <div class='featured-title'>
                            <h6 className='mb-1'>Under Finance</h6>
                            <p>105</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div class='ttm-processbox'>
                        <div class='ttm-box-image'>
                          <div class='process-num'>
                            <span class='number'>C4</span>
                          </div>
                        </div>
                        <div class='featured-content'>
                          <div class='featured-title'>
                            <h6 className='mb-1'>Down Payment </h6>
                            <p>75</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2'>
                      <div class='ttm-processbox'>
                        <div class='ttm-box-image'>
                          <div class='process-num'>
                            <span class='number'>C5</span>
                          </div>
                        </div>
                        <div class='featured-content'>
                          <div class='featured-title'>
                            <h6 className='mb-1'>Vehicle Delivered</h6>
                            <p>255+</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
            <Tab label='New Leads'>
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
     
    </>
  );
}

export default Index;
