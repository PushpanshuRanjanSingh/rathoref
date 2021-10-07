import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import Header from '../header/header';
import Footer from '../footer/footer';
import showNotification from '../../services/notificationService';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import * as constant from '../../services/constant';
import axios from 'axios';
import apiUrl from '../../globals/config';
import Slidercompoent from './Slidercompoent';
function Finance() {
  const [leadData, setleadData] = React.useState([]);
  const [user, setuser] = useState({});
  const [page, setpage] = useState(constant.START);
  useEffect(() => {
    ongoing(page);
  }, []);

  const ongoing = () => {
    // let token = localStorage.getItem("myData");
    // let headers = {
    //   headers: {
    //     "x-token": `Bearer ${token}`,
    //   },
    // };
    // axios
    //   .get(apiUrl + "user/financerClientCount", headers)
    //   .then((resp) => {
    //     setuser(resp.data);
    //   })
    //   .catch((err) => {
    //     showNotification("danger", err.message);
    //   });
  };

  return (
    <>
      <div className='content-body'>
        <div className='container-fluid'>
          {/* <Slidercompoent /> */}
          <Row className='my-4 leads_row'>
            <Col lg={4}>
              <div className='widget-stat card shutter-in-vertical'>
                <Link to='/freshclients'>
                  <div className='card-body p-4'>
                    <div className='media ai-icon d-flex justify-content-center flex-column'>
                      <span class='text-danger mb-1'>
                        <Image
                          className=''
                          alt='img'
                          src={'assets/images/client_review.png'}
                        />
                      </span>
                      <div className='media-body text-center'>
                        <h4 className='mb-2'>{user ? user?.newCases : '0'}</h4>
                        <h5 className='mb-0'>Total Company </h5>
                        <div class='d-flex justify-content-center mt-3'>
                          <a href='#0' class='btn btn-primary btn-xxs shadow'>
                            Details
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Col>

            <Col lg={4}>
              <div className='widget-stat card shutter-in-vertical'>
                <Link to='/reviewedclients'>
                  <div className='card-body p-4'>
                    <div className='media ai-icon d-flex justify-content-center flex-column'>
                      <span class='text-danger mb-1'>
                        <Image
                          className=''
                          alt='img'
                          src={'assets/images/reviewed_clients.png'}
                        />
                      </span>
                      <div className='media-body text-center'>
                        <h4 className='mb-2'>
                          {user ? user?.rejectedCases : '0'}
                        </h4>
                        <h5 className='mb-0'>Total Distributer</h5>
                        <div class='d-flex justify-content-center mt-3'>
                          <a href='#0' class='btn btn-primary btn-xxs shadow'>
                            Details
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Col>
            <Col lg={4}>
              <div className='widget-stat card shutter-in-vertical'>
                <Link className='' to='/help'>
                  <div className='card-body p-4'>
                    <div className='media ai-icon d-flex justify-content-center flex-column'>
                      <span class='text-danger mb-1'>
                        <Image
                          className=''
                          alt='img'
                          src={'assets/images/doready_clients.png'}
                        />
                      </span>
                      <div className='media-body text-center'>
                        <h4 className='mb-2'>
                          {user ? user?.doreadyCases : '0'}
                        </h4>
                        <h5 className='mb-0'>Total Contact Form</h5>
                        <div class='d-flex justify-content-center mt-3'>
                          <a href='#0' class='btn btn-primary btn-xxs shadow'>
                            Details
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Finance;
