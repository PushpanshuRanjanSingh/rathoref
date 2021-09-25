import React, { useEffect, useState } from 'react';

import { Redirect } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import Header from '../header/header';
import Footer from '../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useForm } from 'react-hook-form';
// import { Router } from "react-router";
import apiUrl from '../../globals/config';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
const axios = require('axios').default;

function OtpVerification(props) {
  const history = useHistory();

  const [status, setstatus] = useState(false);
  const [otp, setOtp] = useState(0);

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data.phoneNo = props.share;
    data.otp = otp;
    setstatus(true);
    axios
      .post(apiUrl + 'user/otpVerification', data)
      .then(function (response) {
        if (response?.data.token) {
          localStorage.setItem('myData', response.data.token);
          localStorage.setItem('role', response.data.role);
          history.push('/');
          // if(response.data.role == 3){
          //   history.push('/dealership');

          // }
          // else{
          //   history.push('/');
          // }
        }
        setstatus(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleChange = (otp) => {
    let otpp = otp;
    let checkReg = /(^[0-9][0-9][0-9][0-9]$)/g;
    if (checkReg.test(otpp)) {
    }
    setOtp(otp);
  };
  return (
    <div
      className='h-100'
      style={{
        backgroundImage: 'url(' + '/assets/images/bg_signin.png' + ')',
      }}>
      <form
        autocomplete='off'
        onSubmit={handleSubmit(onSubmit)}
        style={{ height: '100%' }}>
        <div className='container h-100'>
          <div className='row emi_row justify-content-center h-100 align-items-center'>
            <div className='col-md-12 my-5'>
              <div className='card widget-stat signup_card'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>Verify OTP</h4>
                </div>

                <div className='card-body'>
                  <div className='form-validation'>
                    <Row>
                      <Col sm={12} className='mb-3'>
                        <div className='form-group otp_form'>
                          <label
                            className='col-form-label'
                            for='val-username'></label>
                          {/* <input
                                  // type="number"
                                 // type="numeric"
                                //  pattern="[0-9]*"
                                  className="form-control"
                                  id="val-username"
                                  name="otp"
                                  maxLength="4"
                                  onKeyPress={(e) => restrictAlpha(e)}
                                  placeholder="Enter a otp.."
                                  ref={register({
                                    required: "This is required ",
                                    pattern: {
                                      value: /^[0-9][0-9][0-9][0-9]$/,
                                      message: "Otp should be 4 digits",
                                    },
                                  })}
                                /> */}
                          <OtpInput
                            value={otp}
                            onChange={handleChange}
                            numInputs={4}
                            separator={<span>-</span>}
                            inputStyle={{
                              width: '3rem',
                              height: '3rem',
                              margin: '20px 1rem',
                              fontSize: '1rem',
                              borderRadius: 4,
                              border: '2px solid rgba(0,0,0,0.3)',
                            }}
                          />
                          <ErrorMessage
                            errors={errors}
                            name='otp'
                            render={({ message }) => (
                              <p className='error'>{message}</p>
                            )}
                          />
                        </div>
                      </Col>
                      <Col sm={12} className='d-flex justify-content-end'>
                        <button
                          //  onClick={()=>alert('hello')}
                          className='btn'>
                          {!status ? 'Sign up' : 'verifying..'}
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OtpVerification;
