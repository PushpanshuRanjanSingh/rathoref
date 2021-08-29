import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import styled from 'styled-components';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import InsuranceDoc from '../component/InsuranceDoc';

function index() {
  return (
    <>
      {/* <Header /> */}
      <div className='content-body'>
        <div className='container-fluid'>
          <section class='ttm-row ttm-bg ttm-bgimage-yes bg-img3 process-section clearfix'>
            <Row className=''>
              <Col lg={12} className='mb-2'>
                <div className='d-block pb-0 border-0'>
                  <div className='mr-auto pr-3'>
                    <h4 className='text-black font-w600 fs-20'>
                      Insurance Document
                    </h4>
                  </div>
                </div>
              </Col>
            </Row>
          </section>
          <InsuranceDoc />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default index;
