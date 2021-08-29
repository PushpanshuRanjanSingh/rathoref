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
function Index(props) {
  if (!props.location.data) {
    props.history.push({
      pathname: '/ongoingDeals',
    });
  }
  const [viewData, setViewData] = useState(props.location.data);
  const [state, setState] = React.useState('');

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
    

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append([key], data[key]);
      }
    });
    formData.append('confirm', 2);

    axios
      .post(apiUrl + 'user/updateStage', formData, headers)
      .then((resp) => {
        props.history.push({
          pathname: '/ongoingDeals',
        });
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
          <div class='row emi_row '>
            <div class='col-lg-12'>
              <div class='card widget-stat'>
                <div class='card-header bg-custom-blue '>
                  <h4 class='card-title text-white'>L1 Stage Document</h4>
                </div>
                <div class='card-body'>
                  <div class='form-validation'>
                    <Row>
                      <Col sm={6}>
                        <div class='form-group '>
                          <label class='col-form-label' for='val-username'>
                            Proforma Invoice (pdf/img)
                          </label>

                          <div class='custom-file'>
                            {/* <input
                              type="file"
                              class="custom-file-input form-control"
                            />
                            <label class="custom-file-label">Choose file</label> */}
                            <input
                              type='file'
                              required
                              name='proformaInvoiceL1'
                              class='custom-file-input form-control'
                              onChange={fileChange}
                            />
                            <label class='custom-file-label'>
                              {state?.proformaInvoiceL1?.name
                                ? state.proformaInvoiceL1?.name
                                : 'Choose File'}
                            </label>
                            {/* <label class="custom-file-label">Choose file</label> */}
                          </div>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div class='form-group '>
                          <label class='col-form-label' for='val-username'>
                            Chassis Number
                          </label>
                          <input
                            type='text'
                            required
                            class='form-control'
                            id='val-username'
                            name='chassisNumberL1'
                            onChange={handleChange}
                            placeholder='Enter a chassis number..'
                          />
                        </div>
                      </Col>

                      <Col sm={12} className='d-flex mt-3'>
                        <Link className='mr-2' to='/ongoingDeals'>
                          {' '}
                          <button type='submit' class='btn btn-primary'>
                          Previous
                          </button>
                        </Link>
                        {/* <Link className='' to='/#0'> */}
                          {' '}
                          <button
                            type='submit'
                            onClick={(e) => {
                              onSubmit(e);
                            }}
                            class='btn btn-primary'>
                            Save
                          </button>
                        {/* </Link> */}
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Index;
