import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../../globals/base';

import OwlCarousel from 'react-owl-carousel';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import { useForm } from 'react-hook-form';

import apiUrl from '../../../globals/config';

export default function Cmtcreate(props) {
  const { register, errors, handleSubmit } = useForm();
  const [view, setview] = useState('');
  const [msgs, setmsgs] = useState('');
  const [msge, setmsge] = useState('');
  const [show, setshow] = useState(true);
  const restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleChange = (evt) => {
    const value = evt.target.value;
    setview({
      ...view,
      [evt.target.name]: value,
    });
  };
  const submit = (e) => {
    
    var data = view;
    data.role = props.role;
    axios
      .post(apiUrl + 'user/register', data)
      .then(function (response) {
       

        if (response) {
          setshow(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const otpsubmit = (e) => {
    

    axios
      .post(apiUrl + 'user/otpVerification', view)
      .then(function (response) {
        

        if (response) {
          setmsgs('Account Created Sucessfully');
      
        }
      
      })
      .catch(function (error) {
        console.log(error);
        setmsge('Invalid Otp');
      });
  };
  return (
    <div>
      <div className='container-fluid px-0'>
        <section className='stage_lead_sec'>
          <div className='row dataTables_wrapper'>
            <div class='col-lg-12'>
              <div class='d-block pb-0 border-0'>
                <div class='mr-auto pr-3'>
                  <h4 class='text-black font-w600 fs-20'>
                    {props.name}
                  </h4>
                </div>
              </div>
            </div>
            {show ? (
              <>
                <div class='form-group col-md-6'>
                  <input
                    type='text'
                    class='form-control'
                    placeholder='Enter mobile number'
                    name='phoneNo'
                    maxLength='10'
                    onKeyPress={(e) => restrictAlpha(e)}
                    onChange={(e) => handleChange(e)}
                    
                  />
                </div>
                <div className='col-lg-12 d-flex '>
                  <button
                    type='button'
                    className='btn btn-primary mr-2 tp-cus-btn'
                    onClick={(e) => submit(e)}>
                    Submit
                  </button>
                </div>

               
                <p className='error'>{msge}</p>
                <p className='successMag'>{msgs}</p>
              </>
            ) : (
              <>
                <div class='form-group col-md-6'>
                  <label>Mobile Number</label>
                  <input
                    type='text'
                    class='form-control'
                    placeholder='Enter mobile number'
                    maxLength='10'
                    disabled
                    defaultValue={view?.phoneNo}
                  />
                </div>
                <div class='form-group col-md-6'>
                  <label>OTP</label>
                  <input
                    type='text'
                    class='form-control'
                    placeholder='Enter otp number'
                    name='otp'
                    maxLength='10'
                    onKeyPress={(e) => restrictAlpha(e)}
                    onChange={(e) => handleChange(e)}
                   
                  />
                </div>
                <div className='col-lg-12 d-flex justify-content-end'>
                  <button
                    type='button'
                    className='btn btn-primary mr-2 tp-cus-btn'
                    onClick={(e) => otpsubmit(e)}>
                    Submit
                  </button>
                </div>

                
                <p className='error'>{msge}</p>

                <p className='successMag'>{msgs}</p>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
