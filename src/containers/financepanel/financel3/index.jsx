import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import showNotification from "../../../services/notificationService";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import apiUrl from '../../../globals/config';
import axios from 'axios';
function Index(props) {
  if (!props.location.data) {
    props.history.push({
      pathname: '/',
    });
  }
  const [hide, sethide] = React.useState(false);
  const [rejectshow, setrejectshow] = React.useState(false);
  const [userid, setuserid] = React.useState(props.location.data);
  const [ammount, setammount] = React.useState('');
  const approved = (userid) => {
   
    const formData = new FormData();
    const date = new Date();
    formData.append('userid', userid);
    formData.append('financeApproval', true);
    Object.keys(ammount).forEach((key) => {
      formData.append([key], ammount[key]);
     
    });
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .post(apiUrl + 'user/updateLead', formData, headers)
      .then((resp) => {
        props.history.push({
          pathname: '/freshclients',
        });
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const reject = (userid) => {
    const formData = new FormData();

    formData.append('userid', userid);
    formData.append('financeApproval', false);
    Object.keys(ammount).forEach((key) => {
      formData.append([key], ammount[key]); 
    });

    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .post(apiUrl + 'user/updateLead', formData, headers)
      .then((resp) => {
        props.history.push({
          pathname: '/freshclients',
        });
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const handleChange = (evt) => {
    const value1 = evt.target.value;

    setammount({
      ...ammount,
      [evt.target.name]: value1,
    });
  };
  const restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <>
      <div className='content-body'>
        <div className='container-fluid'>
          <div class='row emi_row '>
            <div class='col-lg-12'>
              <div class='card widget-stat'>
                <div class='card-header bg-custom-blue '>
                  <h4 class='card-title text-white'>
                    {rejectshow ? 'Reject Client' : 'Approve Client'}{' '}
                  </h4>
                </div>
                <div class='card-body'>
                  {!hide && !rejectshow ? (
                    <div class='form-validation'>
                      <Row>
                        <Col sm={12} className='d-flex mt-3'>
                          <button
                            type='button'
                            onClick={() => sethide(true)}
                            class='btn mr-2 btn-primary'>
                            Approve
                          </button>
                          <button
                            type='button'
                            onClick={() => setrejectshow(true)}
                            class='btn mr-2 btn-primary'>
                            Reject
                          </button>
                        
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    ''
                  )}

                  {hide ? (
                    <div class='form-validation'>
                      <Row>
                        <Col sm={6}>
                          <div class='form-group '>
                            <label class='col-form-label' for='val-username'>
                              Loan Amount
                            </label>
                            <input
                              type='text'
                              class='form-control'
                              id='val-username'
                              name='approvedAmount'
                              placeholder='Enter Approved Ammount'
                              value={ammount.approvedAmount}
                              maxLength='10'
                              onKeyPress={(e) => restrictAlpha(e)}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>

                        <Col sm={6}>
                          <div class='form-group '>
                            <label class='col-form-label' for='val-username'>
                              Net Disbursal Amount
                            </label>
                            <input
                              type='text'
                              class='form-control'
                              id='val-username'
                              name='netDisbursalAmount'
                              placeholder='Enter Approved Ammount'
                              value={ammount.netDisbursalAmount}
                              maxLength='10'
                              onKeyPress={(e) => restrictAlpha(e)}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div class='form-group '>
                            <label class='col-form-label' for='val-username'>
                              Loan-to-value (in percent)
                            </label>
                            <input
                              type='text'
                              class='form-control'
                              id='val-username'
                              name='loanToValue'
                              placeholder='Enter Loan-to-value (in percent)'
                              value={ammount.loanToValue}
                              maxLength='10'
                              onKeyPress={(e) => restrictAlpha(e)}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div class='form-group '>
                            <label class='col-form-label' for='val-username'>
                              Reference Number
                            </label>
                            <input
                              type='text'
                              class='form-control'
                              id='val-username'
                              name='referenceNumber'
                              placeholder='Enter Approved Ammount'
                              value={ammount.referenceNumber}
                              maxLength='10'
                              onKeyPress={(e) => restrictAlpha(e)}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>

                        <Col sm={12} className='d-flex mt-3'>
                          <Link className='mr-2'>
                            {' '}
                            <button
                              type='button
                                '
                              onClick={() => approved(userid)}
                              class='btn btn-primary'>
                              Save
                            </button>
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    ''
                  )}

                  {rejectshow ? (
                    <div class='form-validation'>
                      <Row>
                        <Col sm={6}>
                          <div class='form-group '>
                            <label class='col-form-label' for='val-username'>
                              Reject (reason)
                            </label>
                            <input
                              type='text'
                              class='form-control'
                              id='val-username'
                              name='rejectReason'
                              placeholder='Enter Reject Reason'
                              value={ammount.rejectReason}
                             
                              onChange={handleChange}
                            />
                          </div>
                        </Col>

                        <Col sm={12} className='d-flex mt-3'>
                          <Link className='mr-2'>
                            {' '}
                            <button
                              type='button
                                '
                              onClick={() => reject(userid)}
                              class='btn btn-primary'>
                              Save
                            </button>
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    ''
                  )}
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
