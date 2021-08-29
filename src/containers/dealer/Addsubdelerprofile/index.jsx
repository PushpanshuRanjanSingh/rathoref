import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Image } from 'react-bootstrap';
import base from '../../../globals/base';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import apiUrl from '../../../globals/config';
// import Header from '../../header/header';

function Index(props) {
  if (!props.location.data) {
    props.history.push({
      pathname: '/dealerviewProfile',
    });
  }
  const [role, setRole] = useState();
  const [post, setpost] = useState([]);
  const [viewDatanumber, setviewDatanumber] = useState();
  const [contactDatanumber, setcontactDatanumber] = useState();
  const [viewData, setViewData] = useState(props.location.data);
  const { register, errors, handleSubmit } = useForm();
  const [successMsg, setsuccessMsg] = useState('');
  // const [formToggle, setformToggle] = useState(parseInt(props.location.data));
  const [formToggle, setformToggle] = useState(1);
  const [inputfilead, setinputfilead] = useState('');
  const [heading, setheading] = useState('Personal Details');
  const [inputfilepan, setinputfilepan] = useState('');
  const [inputfile, setinputfile] = useState('Choose File');
  const [inputfilepic, setinputfilepic] = useState('');
  const [districtData, setdistrictData] = useState([]);
  const [blockData, setblockData] = useState([]);

  useEffect(() => {
    setRole(localStorage.getItem('role'));

    if (formToggle === 1) {
      setheading('Add Sub-Dealership');
    }
  }, []);

  // const fileChange = (e) => {
  //   setState({
  //     ...state,
  //     [e.target.name]: e.target.files[0],
  //   });
  // };

  const name = useRef(null);

  const onSubmit = (data) => {
    try {
      var obj = data;
      var subDealership = [];
      subDealership.push(obj);
      var id = viewData;

    

      let token = localStorage.getItem('myData');
      let headers = {
        headers: {
          'x-token': `Bearer ${token}`,
        },
      };
      axios
        .put(apiUrl + 'subDealer/update', { id, subDealership }, headers)
        .then((resp) => {
          if (resp) {
            
            if (resp) {
              props.history.push({
                pathname: '/dealerviewProfile',
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // }
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setViewData({
      ...viewData,
      [evt.target.name]: value,
    });
  };


  return (
    <>
      <div className='content-body'>
        <form autocomplete='off' onSubmit={handleSubmit(onSubmit)}>
          <div className='container-fluid'>
            <div className='row justify-content-center h-100 align-items-center emi_row'>
              <div className='col-md-12'>
                <div className='card widget-stat'>
                  <div className='card-header bg-custom-blue '>
                    <h4 className='card-title text-white'>{heading}</h4>
                  </div>
                  <div className='card-body'>
                    <div className='form-validation'>
                      <div className='row'>
                        <div className='col-lg-6'>
                          <div className='form-group '>
                            <label
                              className='col-form-label'
                              for='val-username'>
                              Sub-Dealership Name
                            </label>

                            <input
                              type='text'
                              className='form-control'
                              id='val-username'
                              name='subDealername'
                              placeholder='Enter Sub-Dealership Name..'
                              // value={viewData?.subDealername}
                              // onChange={handleChange}
                              ref={register({
                                // required: "This is required ",
                                // minLength: {
                                //   value: 4,
                                //   message: "minLenght is 4 ",
                                // },
                                // maxLength: {
                                //   value: 15,
                                //   message: "maxLenght is 15",
                                // },
                                // pattern: {
                                //   value: /^[a-zA-Z]+$/,
                                //   message: "Enter Valid  Name",
                                // },
                              })}
                            />
                            {/* <ErrorMessage
                                errors={errors}
                                name="oemName"
                                render={({ message }) => (
                                  <p className="error">{message}</p>
                                )}
                              /> */}
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group '>
                            <label
                              className='col-form-label'
                              for='val-username'>
                              Address
                            </label>
                            <input
                              // type="number"
                              className='form-control'
                              // onKeyPress={(e) => restrictAlpha(e)}
                              id='val-username'
                              name='subDealeraddress'
                              // value={viewData?.subDealeraddress}
                              // onChange={handleChange}
                              placeholder='Enter Address ..'
                              ref={register}
                              // defaultValue={viewData?.subDealershipAddress}
                            />
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group '>
                            <label
                              className='col-form-label'
                              for='val-username'>
                              Contact No
                            </label>
                            <input
                              // type="number"
                              className='form-control'
                              maxLength='10'
                              onKeyPress={(e) => restrictAlpha(e)}
                              id='val-username'
                              name='subDealercontactNo'
                              // value={viewData?.subDealercontactNo}
                              // onChange={handleChange}
                              placeholder='Enter Contact Number'
                              ref={register}
                              // defaultValue={viewData?.subDealershipContactNo}
                            />
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group '>
                            <label
                              className='col-form-label'
                              for='val-username'>
                              Email
                            </label>
                            <input
                              type='email'
                              class='form-control'
                              id='val-username'
                              name='subDealeremail'
                              // value={viewData?.subDealeremail}
                              // onChange={handleChange}
                              placeholder='Enter Email..'
                              ref={register}
                            />
                          </div>
                        </div>
                       
                        {/* <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Upload Profile Picture
                              </label>
                              <div class='custom-file'>
                                <input
                                  type='file'
                                  name='profilePic'
                                  class='custom-file-input form-control'
                                  // value={state.profilePic}
                                  // onChange={handleChange}
                                  ref={register}
                                  onChange={fileChange}
                                />
                                <label class='custom-file-label'>
                                  {state.profilePic?.name
                                    ? state.profilePic?.name
                                    : 'Choose File'}
                                </label>
                              </div>
                            </div>
                          </div> */}

                        <div className='col-lg-12 d-flex justify-content-end'>
                          <button
                            type='button'
                            className='btn btn-primary mr-2 tp-cus-btn'
                            onClick={() => {
                              props.history.push({
                                pathname: '/dealerviewProfile',
                              });
                            }}>
                            Back
                          </button>

                          <button
                            type='submit'
                            className='btn btn-primary tp-cus-btn'>
                            Add
                          </button>
                        </div>
                        <p className='successMag'>{successMsg}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Index;
