import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../globals/config';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import OwlCarousel from 'react-owl-carousel';
import * as constant from "../../.../../services/constant";
import showNotification from "../../.../../services/notificationService";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Swal from 'sweetalert2';
import Slidercompoent from './Slidercompoent';
function Index() {
  const [datacount, setdatacount] = useState();
  const [page, setpage] = useState(1);
  const [earningShow, setearningShow] = useState(false);
  const [leadData, setleadData] = useState([]);
  const earningShowfunction = () => {
    if (!earningShow) {
      setearningShow(true);
    } else {
      setearningShow(false);
    }
  };

  useEffect(() => {
    leadsListsall();
    allbanner();
  }, []);
  const allbanner = (page) => {
    let token = localStorage.getItem('myData');

    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + 'advertisement/getList?skip=' + 1 + '&limit=10&panel=1',
        headers
      )
      .then((resp) => {
        if (resp?.data.success) {
   
          setleadData(resp?.data?.data[0]?.data);
       
        }
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const leadsListsall = () => {
    let token = localStorage.getItem('myData');
   
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'user/countLead', headers)
      .then((resp) => {
    
        setdatacount(resp.data.data);
       
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };

  const fireSwal = () => {
    Swal.fire({
      icon: 'success',
      title: 'Currently Not Listed Please Click on 4 wheelers',
      showConfirmButton: false,
      timer: 2500,
    });
  };
 
  return (
    <div className='content-body'>
      <div className='container-fluid'>
        <Row className=''>
          <Slidercompoent />
          <Col xl={3}>
            <Row className='mb-4 db_lft_grid'>
              <Col sm={6} xl={12}>
                <div className='widget-stat card shutter-in-vertical theme-bg-pi'>
                  <div className='card-body p-4 d-flex flex-column justify-content-center'>
                    <div className='media ai-icon'>
                      <span className='mr-3 bgl-danger text-danger'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/leads.png'}
                        />
                      </span>
                      <div className='media-body'>
                        <h4 className='mb-1 fs-18'>Leads</h4>
                        <h5 className='mb-0 fs-16'>{datacount}</h5>
                      </div>
                    </div>
                    <div className='d-flex mt-3'>
                      <a href='/addLead' className='btn btn-primary btn-xxs shadow'>
                        New lead
                      </a>
                      <a
                        href='/leads'
                        className='btn btn-outline-danger btn-xxs ml-2'>
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={6} xl={12}>
                <div className='widget-stat card shutter-in-vertical'>
                  <div className='card-body p-4 d-flex flex-column justify-content-center'>
                    <div className='media ai-icon'>
                      <span className='mr-3 bgl-success text-success'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/earning.png'}
                        />
                      </span>
                      <div className='media-body'>
                        <h4 className='mb-1 fs-18'>Earnings</h4>
                        <h5 className='mb-0 fs-16'>
                          {earningShow ? '32805' : '*****'}
                        </h5>
                      </div>
                    </div>
                    <div className='d-flex mt-3'>
                      <a
                        href='javascript:void(0)'
                        onClick={earningShowfunction}
                        className='btn btn-primary btn-xxs shadow'>
                        {earningShow ? 'Hide Amount' : 'Show Amount'}
                      </a>
                      <a
                        href='/earnings'
                        className='btn btn-outline-danger btn-xxs ml-2'>
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <section className='vehicles_sec'>
          <Row className='mb-4'>
            <Col lg={12}>
              <div className='d-block pb-0 border-0'>
                <div className='mr-auto pr-3'>
                  <h4 className='text-black font-w600 fs-20'>Find Vehicles</h4>
                </div>
              </div>
            </Col>
            <Col sm={6} xl={3}>
             
              <div className='widget-stat card shutter-in-vertical'>
                <div onClick={fireSwal} className='card-body p-4'>
                  <div className='media ai-icon d-flex justify-content-center flex-column'>
                    <span className='mr-3 bgl-danger text-danger mb-2'>
                      <Image
                        className='w-75'
                        alt='img'
                        src={'assets/images/moterbikeandscooters.png'}
                      />
                    </span>
                    <div className='media-body text-center'>
                      <h4 className='mb-0 fs-18'>2 Wheelers</h4>
                      <h5 className='mb-1 px-0 fs-16'>
                        Motorcycles and Scooters
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
             
            </Col>
            <Col sm={6} xl={3}>
             
              <div className='widget-stat card shutter-in-vertical'>
                <div onClick={fireSwal} className='card-body p-4'>
                  <div className='media ai-icon d-flex justify-content-center flex-column'>
                    <span className='mr-3 bgl-success text-danger mb-2'>
                      <Image
                        className='w-75'
                        alt='img'
                        src={'assets/images/auto.png'}
                      />
                    </span>
                    <div className='media-body text-center'>
                      <h4 className='mb-0 fs-18'>3 Wheelers</h4>
                      <h5 className='mb-1 px-0 fs-16'>
                        Auto-Rickshaw, Pickup etc.
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            
            </Col>
            <Col sm={6} xl={3}>
              <Link className='' to='/vehicles'>
                <div className='widget-stat card shutter-in-vertical'>
                  <div className='card-body p-4'>
                    <div className='media ai-icon d-flex justify-content-center flex-column'>
                      <span className='mr-3 bgl-secondary text-danger mb-2'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/pickup.png'}
                        />
                      </span>
                      <div className='media-body text-center'>
                        <h4 className='mb-0 fs-18'>4 Wheelers</h4>
                        <h5 className='mb-1 px-0 fs-16'>Cars, Pickup, etc.</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
            <Col sm={6} xl={3}>
           
              <div className='widget-stat card shutter-in-vertical'>
                <div onClick={fireSwal} className='card-body p-4'>
                  <div className='media ai-icon d-flex justify-content-center flex-column'>
                    <span className='mr-3 bgl-warning text-danger mb-2'>
                      <Image
                        className='w-75'
                        alt='img'
                        src={'assets/images/truck-bus.png'}
                      />
                    </span>
                    <div className='media-body text-center'>
                      <h4 className='mb-0  fs-18'>6+ Wheelers</h4>
                      <h5 className='mb-1 px-0 fs-16'>
                        Trucks, Bus, Travel cars, Pickups, etc.
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
             
            </Col>
          </Row>
        </section>
       
      </div>
    </div>
  );
}

export default Index;
