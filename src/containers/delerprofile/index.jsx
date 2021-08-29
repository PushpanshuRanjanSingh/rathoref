import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import Header from '../header/header';
import Footer from '../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import apiUrl from '../../globals/config';
import history from '../../history';

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
  const [viewData, setViewData] = useState();
  const { register, errors, handleSubmit } = useForm();
  const [successMsg, setsuccessMsg] = useState('');
  const [formToggle, setformToggle] = useState(parseInt(props.location.data));
  // const [formToggle, setformToggle] = useState(8);
  const [inputfilead, setinputfilead] = useState('');
  const [heading, setheading] = useState('Personal Details');
  const [inputfilepan, setinputfilepan] = useState('');
  const [inputfile, setinputfile] = useState('Choose File');
  const [inputfilepic, setinputfilepic] = useState('');
  const [districtData, setdistrictData] = useState([]);
  const [blockData, setblockData] = useState([]);
  const [oemName, setoemName] = useState("")
  const [state, setState] = React.useState({
    oemName: '',
    dealershipName: '',
    googleListingLink: '',
    website: '',
    firstName: '',
    lastName: '',
    fatherName: '',
    dateOfBirth: '',
    profilePic: '',
    email: '',
    phoneNo: '',
    contactNo: '',
    pincode: null,
    district: '',
    postOffice: '',
    block: '',
    cityVillage: '',
    address: '',
    landmark: '',
    aadharNo: '',
    aadharDoc: '',
    pan: '',
    panDoc: '',
    bankDetails: '',
    bankDoc: '',
    ifscCode: '',
    accountHolder: '',
    cancelledCheque: '',
  });

  useEffect(() => {
    setRole(localStorage.getItem('role'));
    if (formToggle === 2) {
      setheading('Contact Details');
    }
    if (formToggle === 3) {
      setheading('Address');
    }
    if (formToggle === 4) {
      setheading('Upload Documents');
    }
    if (formToggle === 5) {
      setheading('Bank Details');
    }
    if (formToggle === 6) {
      setheading('Company Details');
    }
    if (formToggle === 7) {
      setheading('Sub-Dealership');
    }
    if (formToggle === 8) {
      setheading('Add Sub-Dealership');
    }
    getProfile();
  }, []);
  const gitDistrict = () => {
    axios.get(apiUrl + 'user/getuniqueDistrict').then((res) => {
      setdistrictData(res.data.message);
      gitBlock(res.data.message[0]);
    });
  };
  const getbrand = (id) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "brand/getBrandId?id="+id, headers)
      .then((resp) => {
     
      })
      .catch((err) => {
        // setsuccessMsg("");
        console.log(err);
      });
  };
  const gitBlock = (value) => {
    axios
      .get(apiUrl + 'user/getDistrict?district=' + value)
      .then((res) => {
       
      })
      .catch((error) => {
        if (error) {
          // setblockData([]);
        }
        console.log('erro ----', error);
      });
  };
  const getProfile = (e) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'user/getProfile', headers)
      .then((resp) => {
        setState(resp.data.data[0]);
        setpost([{ Name: resp.data.data[0].postOffice }]);
       
        setblockData([resp.data.data[0].block]);
        setviewDatanumber(resp.data.data[0].phoneNo);
        setcontactDatanumber(resp.data.data[0].contactNo);
      })
      .catch((err) => {
        // setsuccessMsg("");
        console.log(err);
      });
  };
  
  const fileChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.files[0],
    });
  };

  const name = useRef(null);

  const onSubmit = (data) => {
    try {
      
      if (formToggle == 3) data.district = state?.district;
      // return
      data.profilePic = state?.profilePic;
      data.cancelledCheque = state?.cancelledCheque;
      data.aadharDoc = state?.aadharDoc;
      data.bankDoc = state?.bankDoc;
      data.panDoc = state?.panDoc;

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          formData.append([key], data[key]);
        }
      });
      let token = localStorage.getItem('myData');
      let headers = {
        headers: {
          'x-token': `Bearer ${token}`,
        },
      };
      axios
        .post(apiUrl + 'user/addProfile', formData, headers)
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

  const checkpincode = (e) => {
    let pincode = e.target.value;
    let checkReg = /(^[0-9][0-9][0-9][0-9][0-9][0-9]$)/g;
    if (checkReg.test(pincode)) {
      axios
        .get('https://api.postalpincode.in/pincode/' + pincode)
        .then((res) => {
          if (res?.data?.[0]?.PostOffice) {
            setpost(res.data[0].PostOffice);
            var data = res.data[0].PostOffice;
            var block = [];
            data.map((data, index) => {
              block.push(data.Block);
            });
            setblockData([...new Set(block)]);
            let obj = {
              district: res.data[0].PostOffice[0].District,
              pincode: pincode,
            };
            setState({
              ...state,
              ...obj,
            });
            gitBlock(res.data[0].PostOffice[0].District);
          }
        });
    } else {
      setpost([]);
    }
  };
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleChangedist = (evt) => {
    const value1 = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value1,
    });
    gitBlock(evt.target.value);
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
                      {formToggle == 1 && (
                        <div className='row'>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                OEM Name<span className='text-danger'>*</span>
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='oemName'
                                // defaultValue={state.firstName}
                                //  defaultValue={viewData?.firstName}
                                placeholder='Enter OEM Name..'
                                value={state.oemName}
                                onChange={handleChange}
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
                              <ErrorMessage
                                errors={errors}
                                name='oemName'
                                render={({ message }) => (
                                  <p className='error'>{message}</p>
                                )}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Dealership Name
                              </label>
                              <input
                                // type="number"
                                className='form-control'
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id='val-username'
                                name='dealershipName'
                                value={state.dealershipName}
                                onChange={handleChange}
                                placeholder='Enter Dealership Name..'
                                ref={register}
                                defaultValue={viewData?.dealershipName}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Google Listing Link
                              </label>
                              <input
                                // type="number"
                                className='form-control'
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id='val-username'
                                name='googleListingLink'
                                value={state.googleListingLink}
                                onChange={handleChange}
                                placeholder='Enter Google Listing Link..'
                                ref={register}
                                defaultValue={viewData?.googleListingLink}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Add Multiple contact numbers
                              </label>
                              <input
                                //  type="number"
                                className='form-control'
                                id='val-username'
                                name='contactNo'
                                // maxLength="10"

                                // value={state.phoneNo}
                                onChange={handleChange}
                                //   onKeyPress={(e) => restrictAlpha(e)}
                                placeholder='Enter contact number...'
                                ref={register}
                                defaultValue={contactDatanumber}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Website
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                name='website'
                                value={state.website}
                                onChange={handleChange}
                                placeholder='Enter website..'
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
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
                          </div>

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
                              Update
                            </button>
                          </div>
                          <p className='successMag'>{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 2 && (
                        <div className='row'>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Email<span className='text-danger'>*</span>
                              </label>
                              <input
                                type='email'
                                className='form-control'
                                id='val-username'
                                name='email'
                                value={state.email}
                                onChange={handleChange}
                                placeholder='Enter email..'
                                ref={register({
                                  required: 'This is required ',
                                  pattern: {
                                    value:
                                      /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/,
                                    message: 'Enter Valid Email id',
                                  },
                                })}
                                defaultValue={viewData?.email}
                              />
                              <ErrorMessage
                                errors={errors}
                                name='email'
                                render={({ message }) => (
                                  <p className='error'>{message}</p>
                                )}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Mobile Number
                              </label>
                              <input
                                //  type="number"
                                className='form-control'
                                id='val-username'
                                name='phoneNo'
                                maxLength='10'
                                disabled
                                // value={state.phoneNo}
                                onChange={handleChange}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder='Enter mobile number...'
                                ref={register}
                                defaultValue={viewDatanumber}
                              />
                            </div>
                          </div>
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
                              Update
                            </button>
                          </div>
                          <p className='successMag'>{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 3 && (
                        <div className='row'>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Pin Code
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                onKeyPress={(e) => restrictAlpha(e)}
                                name='pincode'
                                maxLength={6}
                                onKeyUp={(e) => checkpincode(e)}
                                defaultValue={state.pincode}
                                placeholder='Enter pin code..'
                                ref={register({
                                  pattern: {
                                    value: /^[0-9][0-9][0-9][0-9][0-9][0-9]$/,
                                    message: 'Enter Valid  Pin Code',
                                  },
                                })}
                              />
                              <ErrorMessage
                                errors={errors}
                                name='pincode'
                                render={({ message }) => (
                                  <p className='error'>{message}</p>
                                )}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                District
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                name='district'
                                value={state.district}
                                placeholder=''
                                disabled
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Post Office
                              </label>
                              <select
                                class='form-control'
                                id='exampleFormControlSelect1'
                                name='postOffice'
                                ref={register}
                                onChange={handleChange}>
                                {post.map((name, index) => (
                                  <option>{name?.Name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          {/* <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                               Block
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="val-username"
                                name="block"
                                value={state.block}
                                placeholder=""
                                disabled
                              />
                            </div>
                          </div> */}
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Block
                              </label>
                              <select
                                class='form-control'
                                id='exampleFormControlSelect1'
                                name='block'
                                ref={register}
                                defaultValue={state.block}
                                onChange={handleChange}
                                value={state.block}>
                                {blockData.length != 0 &&
                                  blockData.map((options, index) => (
                                    <option>{options}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                City/Village
                              </label>

                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                name='cityVillage'
                                value={state.cityVillage}
                                onChange={handleChange}
                                placeholder='Enter city-village name..'
                                ref={register}
                              />
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
                                type='text'
                                class='form-control'
                                id='val-username'
                                name='address'
                                value={state.address}
                                onChange={handleChange}
                                placeholder='Enter address name..'
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Landmark
                              </label>

                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                value={state.landmark}
                                onChange={handleChange}
                                name='landmark'
                                placeholder='Enter landmark name..'
                                ref={register}
                              />
                            </div>
                          </div>
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
                              Update
                            </button>
                          </div>
                          <p className='successMag'>{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 4 && (
                        <div className='row'>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Aadhaar Card Number
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='aadharNo'
                                // value={state.aadharNo}
                                defaultValue={
                                  state && state.docs && state.docs[0]
                                    ? state.docs[0].aadharNo
                                    : ''
                                }
                                onChange={handleChange}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder='Enter aadhar card number .'
                                ref={register}
                                // defaultValue={
                                //   viewData &&
                                //   viewData.docs[0] &&
                                //   viewData.docs[0].aadharNo
                                //     ? viewData.docs[0].aadharNo
                                //     : ""
                                // }
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Upload Aadhaar Card
                              </label>
                              <div class='custom-file'>
                                <input
                                  type='file'
                                  name='aadharDoc'
                                  class='custom-file-input form-control'
                                  ref={register}
                                  // onChange={
                                  //   //(e) =>
                                  //   fileChange
                                  //   // setinputfilead(e.target.files[0].name)
                                  // }
                                  onChange={fileChange}
                                />
                                <label class='custom-file-label'>
                                  {state.aadharDoc?.name
                                    ? state.aadharDoc?.name
                                    : 'Choose File'}
                                  {/* {state?.aadharDoc?.name} */}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                PAN
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='pan'
                                defaultValue={
                                  state && state.docs && state.docs[0]
                                    ? state.docs[0].pan
                                    : ''
                                }
                                onChange={handleChange}
                                placeholder='Enter pan name..'
                                ref={register}
                                // defaultValue={
                                //   viewData &&
                                //   viewData.docs[0] &&
                                //   viewData.docs[0].pan
                                //     ? viewData.docs[0].pan
                                //     : ""
                                // }
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                PAN (Upload)
                              </label>
                              <div class='custom-file'>
                                <input
                                  type='file'
                                  name='panDoc'
                                  class='custom-file-input form-control'
                                  ref={register}
                                  // onChange={//(e) =>
                                  //   fileChange
                                  //  // setinputfilepan(e.target.files[0].name)
                                  // }
                                  onChange={fileChange}
                                />
                                <label class='custom-file-label'>
                                  {state.panDoc?.name
                                    ? state.panDoc?.name
                                    : 'Choose File'}
                                </label>
                              </div>
                            </div>
                          </div>
                         

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
                              update
                            </button>
                          </div>
                          <p className='successMag'>{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 5 && (
                        <div className='row'>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Bank Name
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='bankName'
                                placeholder='Enter  bank Name..'
                                ref={register}
                                defaultValue={
                                  state && state.docs && state.docs[0]
                                    ? state.docs[0].bankName
                                    : ''
                                }
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Bank Passbook (Upload)
                              </label>

                              <div className='custom-file'>
                                <input
                                  type='file'
                                  className='custom-file-input form-control'
                                  name='bankDoc'
                                  ref={register}
                                  onChange={
                                    //(e) =>
                                    fileChange
                                    // setinputfile(e.target.files[0].name)
                                  }
                                />
                                <label className='custom-file-label'>
                                  {state.bankDoc?.name
                                    ? state.bankDoc?.name
                                    : 'Choose File'}
                                  {/* {inputfile} */}
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                A/C No.
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='acNo'
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder='Enter  A/C No...'
                                ref={register}
                                defaultValue={
                                  state && state.docs && state.docs[0]
                                    ? state.docs[0].acNo
                                    : ''
                                }
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Cancelled Cheque (Upload)
                              </label>

                              <div className='custom-file'>
                                <input
                                  type='file'
                                  className='custom-file-input form-control'
                                  name='cancelledCheque'
                                  ref={register}
                                  onChange={
                                    //(e) =>
                                    fileChange
                                    // setinputfile(e.target.files[0].name)
                                  }
                                />
                                <label className='custom-file-label'>
                                  {state.cancelledCheque?.name
                                    ? state.cancelledCheque?.name
                                    : 'Choose File'}
                                  {/* {inputfile} */}
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Account Holder
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='accountHolder'
                                placeholder='Enter account holder name...'
                                ref={register}
                                defaultValue={
                                  state && state.docs && state.docs[0]
                                    ? state.docs[0].accountHolder
                                    : ''
                                }
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                IFSC code
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='ifscCode'
                                placeholder='Enter IFSC code...'
                                ref={register}
                                defaultValue={
                                  state && state.docs && state.docs[0]
                                    ? state.docs[0].ifscCode
                                    : ''
                                }
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group custom-check-design'>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Do you have cheque book?
                              </label>
                              <div className='d-flex px-2 py-2'>
                                <div className='w-110 d-flex align-items-center mr-3'>
                                  <input
                                    type='radio'
                                    className='w-auto ml-2 input_cus_radio'
                                    id='chequeBookY'
                                    name='chequeBook'
                                    ref={register}
                                    value={true}
                                  />
                                  <label
                                    className='check-label'
                                    for='chequeBookY'>
                                    Yes{' '}
                                  </label>
                                </div>
                                <div className='w-110 d-flex align-items-center'>
                                  <input
                                    type='radio'
                                    className='w-auto ml-2 input_cus_radio'
                                    id='chequeBookN'
                                    name='chequeBook'
                                    ref={register}
                                    value={false}
                                  />
                                  <label
                                    className='check-label'
                                    for='chequeBookN'>
                                    No{' '}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                         

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
                              update
                            </button>
                          </div>
                          <p className='successMag'>{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 6 && (
                        <div className='row'>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Company Name
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='newcompanyName'
                                placeholder='Enter  bank Name..'
                                ref={register}
                                defaultValue={
                                  state && state.docs && state.docs[0]
                                    ? state.docs[0].newcompanyName
                                    : ''
                                }
                              />
                            </div>
                          </div>

                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                CIN
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='cin'
                                // onKeyPress={(e) => restrictAlpha(e)}
                                placeholder='Enter  CIN No...'
                                ref={register}
                                defaultValue={
                                  state && state.docs && state.docs[0]
                                    ? state.docs[0].cin
                                    : ''
                                }
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                GST
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='gst'
                                placeholder='Enter GST number...'
                                ref={register}
                                defaultValue={
                                  state && state.docs && state.docs[0]
                                    ? state.docs[0].gst
                                    : ''
                                }
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                PAN
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='pan'
                                placeholder='Enter PAN number...'
                                ref={register}
                                defaultValue={
                                  state && state.docs && state.docs[0]
                                    ? state.docs[0].pan
                                    : ''
                                }
                              />
                            </div>
                          </div>

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
                              update
                            </button>
                          </div>
                          <p className='successMag'>{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 7 && (
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
                                name='subDealershipName'
                                placeholder='Enter Sub-Dealership Name..'
                                value={state.subDealershipName}
                                onChange={handleChange}
                                ref={register({
                                 
                                })}
                              />
                              
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
                                name='Address'
                                value={state.subDealershipAddress}
                                onChange={handleChange}
                                placeholder='Enter Address ..'
                                ref={register}
                                defaultValue={viewData?.subDealershipAddress}
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
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id='val-username'
                                name='googleListingLink'
                                value={state.subDealershipContactNo}
                                onChange={handleChange}
                                placeholder='Enter Google Listing Link..'
                                ref={register}
                                defaultValue={viewData?.subDealershipContactNo}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Website
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                name='subemail'
                                value={state?.email}
                                onChange={handleChange}
                                placeholder='Enter website..'
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
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
                          </div>

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
                              type='button'
                              className='btn btn-primary tp-cus-btn'>
                              Add
                            </button>
                          </div>
                          <p className='successMag'>{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 8 && (
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
                                // value={state.subDealershipName}
                                // onChange={handleChange}
                                ref={register({
                                  
                                })}
                              />
                             
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
                                // value={state.subDealershipAddress}
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
                               
                                placeholder='Enter Contact Number'
                                ref={register}
                              
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
                               
                                placeholder='Enter Email..'
                                ref={register}
                              />
                            </div>
                          </div>
                         

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
                      )}
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
