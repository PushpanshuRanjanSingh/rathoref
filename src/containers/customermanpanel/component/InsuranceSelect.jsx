import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import showNotification from "../../../services/notificationService";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
import apiUrl from '../../../globals/config';
function Index(props) {
  const [viewData, setViewData] = useState(props.location.data);
  const [state, setState] = React.useState('');
  const [Insurancer, setInsurancer] = useState([]);
  useEffect(() => {
    Insurancerall();
  }, []);
  if (!props.location.data) {
    props.history.push({
      pathname: '/',
    });
  }
  const Insurancerall = () => {
    var id = viewData;
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "user/findbyRole/5?skip=1&limit=100", headers)

      .then((resp) => {
        setInsurancer(resp?.data?.data[0].data);
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
      .put(apiUrl + 'user/updateInsuranceId', data, headers)
      .then((resp) => {
        showNotification("success", resp?"Estimate Accepted Successfully":"");
        props.history.push({
          pathname: '/dealerSection',
        });
      })
      .catch((err) => {
        showNotification("danger", err.message);
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
                  <h4 class='card-title text-white'>Estimate Accepted</h4>
                </div>
                <div class='card-body'>
                  <div class='form-validation'>
                    <Row>
                      <Col sm={6}>
                        <div class='form-group'>
                          <label class='col-form-label' for='val-username'>
                            Select Insurancer
                          </label>
                          <select
                            class='form-control'
                            // ref={register}
                            onChange={handleChange}
                            name='insuranceId'
                            id='exampleFormControlSelect1'>
                            <option selected='true' disabled='disabled'>
                              Choose Insurancer
                            </option>
                            {Insurancer.length != 0 &&
                              Insurancer.map((options, index) => (
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
                        {/* <Link className='' to='/#0'> */}{' '}
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
