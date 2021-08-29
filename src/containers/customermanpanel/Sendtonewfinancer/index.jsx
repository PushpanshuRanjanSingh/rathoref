import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
import apiUrl from '../../../globals/config';

import showNotification from "../../../services/notificationService";
import * as constant from "../../../services/constant";
function Index(props) {
  const [viewData, setViewData] = useState(props.location.data);
  const [state, setState] = React.useState('');
  const [financer, setfinancer] = useState([]);
  useEffect(() => {
    financerall(1);
  }, []);
  if (!props.location.data) {
    props.history.push({
      pathname: '/',
    });
  }
  const financerall = (page) => {
    var id = viewData;

    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .put(apiUrl + 'user/findFinancer', { id }, headers)

      .then((resp) => {
     
        setfinancer(resp?.data?.data);
       
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const fileChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  const onSubmit = (e) => {
  
    e.preventDefault();
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };

    const data = state;
    data.id = viewData;
    
   

    axios
      .put(apiUrl + 'user/sendToOtherFinancer', data, headers)
      .then((resp) => {
      
        props.history.push({
          pathname: '/cmtfinance',
        });
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  return (
    <>
      {/* <Header /> */}
      <div className='content-body'>
        <div className='container-fluid'>
          <div class='row emi_row '>
            <div class='col-lg-12'>
              <div class='card widget-stat'>
                <div class='card-header bg-custom-blue '>
                  <h4 class='card-title text-white'>
                    Send To Another Financer
                  </h4>
                </div>
                <div class='card-body'>
                  <div class='form-validation'>
                    <Row>
                      <Col sm={6}>
                        <div class='form-group'>
                          <label class='col-form-label' for='val-username'>
                            Select Financer
                          </label>
                          <select
                            class='form-control'
                            // ref={register}
                            onChange={handleChange}
                            name='financerId'
                            id='exampleFormControlSelect1'>
                            <option selected='true' disabled='disabled'>
                              Choose other Financer
                            </option>
                            {financer.length != 0 &&
                              financer.map((options, index) => (
                                <option value={options._id}>
                                  {options?.firstName}
                                </option>
                              ))}
                          </select>
                        </div>
                      </Col>

                      <Col sm={12} className='d-flex mt-3'>
                        <Link className='mr-2' to='/ongoingDeals'>
                          {' '}
                          <button type='submit' class='btn btn-primary'>
                          Previous
                          </button>
                        </Link>
                        <button
                          type='submit'
                          onClick={(e) => {
                            onSubmit(e);
                          }}
                          class='btn btn-primary'>
                          Save
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
