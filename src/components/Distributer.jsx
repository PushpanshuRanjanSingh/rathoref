import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../globals/base';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import showNotification from '../services/notificationService.js';
import { Stepper } from 'react-form-stepper';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import apiUrl from '../globals/config.js';
import axios from 'axios';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useHistory } from 'react-router-dom';
function Index(props) {
  let history = useHistory();
  const [successMs, setsuccessMs] = useState('');
  const [successMsg, setsuccessMsg] = useState('');
  const [post, setpost] = useState([]);
  const [brand, setbrand] = useState([]);
  const [Type, setType] = useState([]);
  const [viewData, setViewData] = useState();
  const { register, errors, handleSubmit } = useForm();
  const [inputfilead, setinputfilead] = useState('');
  const [heading, setheading] = useState('Personal Details');
  const [inputfilepan, setinputfilepan] = useState('');
  const [inputfile, setinputfile] = useState('');
  const [inputfilepic, setinputfilepic] = useState('');
  const [districtData, setdistrictData] = useState([]);
  const [blockData, setblockData] = useState([]);
  const [id, setid] = useState('');
  const [Vechicle, setVechicle] = useState([]);
  const [formToggle, setformToggle] = useState(1);
  const [vehicle, setvehicle] = useState(props?.location?.data);
  const [prevData, setprevData] = useState(props);
  const [data, setdata] = useState({});
  const [Selectedyear, setSelectedyear] = useState(null);
  const [errorMsg, seterrorMsg] = useState('');
  const [SelectedDate, setSelectedDate] = useState(null);
  const [Varient, setVarient] = useState([]);
  const [exchange, setexchange] = useState(false);
  const [step, setstep] = useState(0);
  const [statehandle, setstatehandle] = useState({});
  const [cityhandle, setcityhandle] = useState([]); //
  const [category, setcategory] = useState({});
  const [subCategory, setsubCategory] = useState([]);
  const [state, setState] = React.useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    dateOfBirth: '',
    noOfUnits: '',
    email: '',
    phoneNo: '',
    pincode: '',
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
    financeSchemes: '',
    buyingTimeline: '',
    exchangeCompany: '',
    commercialUse: '',
    exchangeVehicleRC: '',
    exchangeVehicleDL: '',
    exchangeVehiclePermit: '',
  });
  useEffect(() => {
    stateee();
    categoryy();
  }, []);
  function stateee() {
    axios
      .get(
        'https://raw.githubusercontent.com/bhanuc/indian-list/master/state-city.json'
      )
      .then((resp) => setstatehandle(resp?.data))
      .catch((err) => console.log(err));
  }
  function categoryy() {
    axios
      .get('http://localhost:3000/categories.json')
      .then((resp) => setcategory(resp?.data))
      .catch((err) => console.log(err));
  }
  const onSubmit = (formsubmitdata) => {
    console.log(`formsubmitdata`, formsubmitdata);
    if (formToggle == 1) {
      console.log(`state.phoneNo`, state.phoneNo);
      axios
        .post('http://localhost:3040/user/register', {
          phoneNo: formsubmitdata.phoneNo,
          firstName: formsubmitdata.firstName,
          password: formsubmitdata.password,
          companyName: formsubmitdata.companyName,
          role: 0, //type
          type: 'distributer',
        })
        .then(function (respon) {
          console.log(`respon`, respon);
        })
        .catch(function (error) {
          console.log(`error`, error);
        });
    } else if (formToggle == 6) {
      console.log(
        `state,`,
        state?.profileImg,
        state?.phoneNo,
        state?.state,
        state?.city
      );
      console.log(`alldata`, state);
      const formData = new FormData();
      formData.append('phoneNo', state?.phoneNo);
      formData.append('profileImg', state?.profileImg);
      formData.append('city', state?.city);
      formData.append('state', state?.state);
      formData.append('category', state?.category);
      formData.append('subCategory', state?.subCategory);
      // formData.append('brandName', state?.brandName);
      axios
        .post('http://localhost:3040/user/updateuserprofile', formData)
        .then(function (respon) {
          console.log(`respon`, respon);
        })
        .catch(function (error) {
          console.log(`error`, error);
        });
      showNotification('success', 'Distributer Added Successfully');
      history.push({
        pathname: '/',
      });
    }
    try {
      if (formToggle == 1) {
        setstep(1);
        setformToggle(2);
        setheading('firm Details');
      } else if (formToggle == 2) {
        setstep(2);
        setformToggle(3);
        setheading('Categories Details');
      } else if (formToggle == 3) {
        setformToggle(4);
        setstep(3);
        setheading('Brand  Name');
      } else if (formToggle == 4) {
        setformToggle(5);
        setstep(4);
        setheading('Intreset');
      } else if (formToggle == 5) {
        setformToggle(6);
        setstep(5);
        setheading('Upload logo/Video');
      }
      //   else if (formToggle == 5) {
      //     setformToggle(6);
      //     setstep(5);
      //     setheading('Upload logo/Video');
      //   }
    } catch (err) {
      showNotification('danger', err.message);
    }
  };

  const restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleStatefunforcity = (data) => {
    setcityhandle(statehandle[data]);
  };
  const fileChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleSeconsRequest = (e) => {
    e.preventDefault();
    setformToggle(1);
    setstep(0);
    setheading('Personal Details');
  };
  const handleThirdRequest = (e) => {
    e.preventDefault();
    setformToggle(2);
    setstep(1);
    setheading('Vehicle Information');
  };
  const handleFourthRequest = (e) => {
    e.preventDefault();
    setstep(2);
    setformToggle(3);
    setheading('Address');
  };
  const handleFivethRequest = (e) => {
    e.preventDefault();
    setstep(3);
    setformToggle(4);
    setheading('buying detail');
  };
  const handlesixthRequest = (e) => {
    e.preventDefault();
    setformToggle(5);
    setheading('Exchange Vehicle');
  };
  const gitBlock = (value) => {
    axios.get(apiUrl + 'user/getDistrict?district=' + value).then((res) => {
      setblockData(res.data.message);
    });
  };
  const checkpincode = (e) => {
    var pincode = e.target.value;
    let checkReg = /(^[0-9][0-9][0-9][0-9][0-9][0-9]$)/g;
    if (checkReg.test(pincode)) {
      axios
        .get('https://api.postalpincode.in/pincode/' + pincode)
        .then((res) => {
          if (res?.data?.[0]?.PostOffice) {
            setpost(res.data[0].PostOffice);
            gitBlock(res.data[0].PostOffice[0].District);
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
  const updatesubcategory = (e) => {
    setsubCategory(category[e]);
    // console.log(`subCategory`, category[e]);
  };
  return (
    <>
      {/* <Header /> */}
      <div className=''>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <div className='container-fluid'>
            <div className='row justify-content-center h-100 align-items-center emi_row'>
              <div className='col-md-12'>
                <div className='card widget-stat'>
                  <Stepper
                    steps={[
                      { label: 'Personal Detail' },
                      { label: 'firm Details' },
                      { label: 'Categories Details' },
                      { label: 'Brand  Name' },
                      { label: 'Interest Details' },
                      { label: 'Upload logo/Video' },
                    ]}
                    activeStep={step}
                  />
                  <div className='card-header bg-custom-blue '>
                    <h4 className='card-title text-white'>{heading}</h4>
                  </div>
                  <div className='card-body'>
                    <div className='form-validation'>
                      {formToggle == 1 && (
                        <div className='row'>
                          <div className='col-sm-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                First Name<span className='text-danger'>*</span>
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='firstName'
                                value={state?.firstName}
                                onChange={handleChange}
                                placeholder='Enter first name..'
                                // required
                                ref={register({
                                  //   required: 'This is required ',
                                })}
                              />
                              <ErrorMessage
                                errors={errors}
                                name='firstName'
                                render={({ message }) => (
                                  <p className='error'>{message}</p>
                                )}
                              />
                            </div>
                          </div>
                          <div className='col-sm-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Last Name
                              </label>
                              <input
                                // type="number"
                                className='form-control'
                                id='val-username'
                                name='lastName'
                                // required
                                value={state?.lastName}
                                onChange={handleChange}
                                placeholder='Enter last name..'
                                ref={register}
                              />
                            </div>
                          </div>
                          <Col sm={6}>
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
                                name='companyName'
                                onChange={handleChange}
                                placeholder='Enter company number..'
                                ref={register({
                                  // pattern: {
                                  //   value: /^[a-zA-Z]+$/,
                                  //   message: "Enter Valid company Name",
                                  // },
                                })}
                              />
                              <ErrorMessage
                                errors={errors}
                                name='companyName'
                                render={({ message }) => (
                                  <p className='error'>{message}</p>
                                )}
                              />
                            </div>
                          </Col>

                          <div className='col-sm-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Email
                              </label>
                              <input
                                type='email'
                                className='form-control'
                                id='val-username'
                                name='email'
                                value={state?.email}
                                onChange={handleChange}
                                placeholder='Enter email..'
                                ref={register({
                                  // required: "This is required ",
                                  // pattern: {
                                  //   value:
                                  //     /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/,
                                  //   message: 'Enter Valid Email id',
                                  // },
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
                          <div className='col-sm-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Mobile Number{' '}
                                <span className='text-danger'>*</span>
                              </label>
                              <input
                                //  type="number"
                                className='form-control'
                                id='val-username'
                                name='phoneNo'
                                onChange={() => seterrorMsg('')}
                                maxLength='10'
                                // required
                                value={state?.phoneNo}
                                onChange={handleChange}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder='Enter mobile number...'
                                // ref={register}
                                ref={register({
                                  //   required: 'This is required ',
                                  //   pattern: {
                                  //     value:
                                  //       /^[5-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/,
                                  //     message: 'Enter Valid Contact Number',
                                  //   },
                                })}
                              />
                              <ErrorMessage
                                errors={errors}
                                name='phoneNo'
                                render={({ message }) => (
                                  <p className='error'>{message}</p>
                                )}
                              />
                              <p className='error'>{errorMsg}</p>
                            </div>
                          </div>
                          <div className='col-sm-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Password
                              </label>
                              <input
                                type='password'
                                className='form-control'
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id='val-username'
                                name='password'
                                value={state.password}
                                onChange={handleChange}
                                placeholder='Enter Password ..'
                                ref={register}
                                defaultValue={viewData?.fatherName}
                              />
                            </div>
                          </div>

                          <div className='col-lg-12 d-flex justify-content-end'>
                            <button type='submit' className='btn btn-primary'>
                              Next
                            </button>
                            {/* <button type='button' className='btn btn-primary'>
                              Next
                            </button> */}
                          </div>
                          <p className='successMag'>{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 2 && (
                        <div className='row'>
                          <Col sm={6}>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                for='val-username'>
                                Distributer Firm Name
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='companyName'
                                placeholder='Enter company number..'
                                ref={register({
                                  // pattern: {
                                  //   value: /^[a-zA-Z]+$/,
                                  //   message: "Enter Valid company Name",
                                  // },
                                })}
                              />
                              <ErrorMessage
                                errors={errors}
                                name='companyName'
                                render={({ message }) => (
                                  <p className='error'>{message}</p>
                                )}
                              />
                            </div>
                          </Col>

                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Contact person
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='contactPerson'
                                value={state?.contactPerson}
                                onChange={handleChange}
                                placeholder='Enter Contact person..'
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Contact number
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='contactNumber'
                                value={state.contactNumber}
                                onChange={handleChange}
                                placeholder='Enter Contact number..'
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Alternative number
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='alternativeNumber'
                                value={state.alternativeNumber}
                                onChange={handleChange}
                                placeholder='Enter Alternative number..'
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Alternative email
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='alternativeEmail'
                                value={state.alternativeEmail}
                                onChange={handleChange}
                                placeholder='Enter Alternative email..'
                                ref={register}
                              />
                            </div>
                          </div>

                          <div className='col-sm-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Establishment Year
                              </label>
                              <DatePicker
                                placeholderText='Establishment Year '
                                // onSelect={this.handleDateSelect.bind(this)}
                                selected={Selectedyear}
                                className='form-control'
                                onChange={(date) => setSelectedyear(date)}
                                showYearPicker
                                dateFormat='yyyy'
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                GST No
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='gstNo'
                                value={state.gstNo}
                                onChange={handleChange}
                                placeholder='Enter GST No ..'
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Turnover of the company
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='turnoverOfTheCompany'
                                value={state.turnoverOfTheCompany}
                                onChange={handleChange}
                                placeholder='Enter Turnover of the company ..'
                                ref={register}
                              />
                            </div>
                          </div>

                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Number of Brand
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='turnoverOfTheCompany'
                                value={state.turnoverOfTheCompany}
                                onChange={handleChange}
                                placeholder='Enter  Number of Brand'
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Distributor Cover Area
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='turnoverOfTheCompany'
                                value={state.turnoverOfTheCompany}
                                onChange={handleChange}
                                placeholder='Enter Distributor Cover Area'
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Number of Employee
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='turnoverOfTheCompany'
                                value={state.turnoverOfTheCompany}
                                onChange={handleChange}
                                placeholder='Enter Number of Employee'
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Godown Space
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='turnoverOfTheCompany'
                                value={state.turnoverOfTheCompany}
                                onChange={handleChange}
                                placeholder='Enter Godown Space'
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Website
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='turnoverOfTheCompany'
                                value={state.turnoverOfTheCompany}
                                onChange={handleChange}
                                placeholder='Enter Website'
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                About US
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='turnoverOfTheCompany'
                                value={state.turnoverOfTheCompany}
                                onChange={handleChange}
                                placeholder='About US'
                                ref={register}
                              />
                            </div>
                          </div>

                          {/* address  */}
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Pin Code
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                onKeyPress={(e) => restrictAlpha(e)}
                                name='pincode'
                                maxLength={6}
                                onKeyUp={(e) => checkpincode(e)}
                                defaultValue={state.pincode}
                                placeholder='Enter pin code..'
                                ref={register()}
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
                                htmlFor='val-username'>
                                Country
                              </label>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='district'
                                value={state.district}
                                ref={register}>
                                <option>{'India'}</option>
                              </select>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                City
                              </label>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='postOffice'
                                ref={register}>
                                <option selected='true' disabled='disabled'>
                                  Choose City
                                </option>
                                {post.map((name, index) => (
                                  <option>{name?.Name}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                City/Village
                              </label>

                              <input
                                type='text'
                                className='form-control'
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
                                htmlFor='val-username'>
                                Address
                              </label>

                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='address'
                                value={state.address}
                                onChange={handleChange}
                                placeholder='Enter address name..'
                                ref={register}
                              />
                            </div>
                          </div>

                          <div className='col-lg-12 d-flex justify-content-end'>
                            <button
                              type='button'
                              className='btn btn-primary mr-2'
                              onClick={(e) => {
                                handleSeconsRequest(e);
                              }}>
                              Previous
                            </button>
                            <button type='submit' className='btn btn-primary'>
                              Next
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
                                htmlFor='val-username'>
                                Select Category
                              </label>
                              <div className='py-4 px-4'>
                                {Object.keys(category).map((data) => (
                                  <div className='w-110 my-3 d-flex align-items-center mr-3'>
                                    <input
                                      type='radio'
                                      className='w-auto  mr-3 input_cus_radio'
                                      id='val-username'
                                      name='category'
                                      onChange={(e) => {
                                        handleChange(e);
                                        // console.log(e.target.value);
                                        updatesubcategory(e.target.value);
                                      }}
                                      value={data}
                                      ref={register}
                                    />
                                    {data}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className='col-lg-12 d-flex justify-content-end'>
                            <button
                              type='button'
                              className='btn btn-primary mr-2'
                              onClick={(e) => {
                                vehicle
                                  ? handleSeconsRequest(e)
                                  : handleThirdRequest(e);
                              }}>
                              Previous
                            </button>
                            <button type='submit' className='btn btn-primary'>
                              Next
                            </button>
                          </div>
                        </div>
                      )}
                      {formToggle == 4 && (
                        <div className='row'>
                          <div className='row w-100 bb'>
                            <div className='col-4 bb'>Sub Category</div>
                            <div className='col-4 bb'>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='subCategory'
                                value={state?.subCategory}
                                onChange={handleChange}
                                ref={register}>
                                {/* {subCategory.map((data) => {
                                  <option value={data}>{data}</option>;
                                })} */}
                                {subCategory.map((data) => (
                                  <option value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                            <div className='col-4 bb'>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='firstName1'
                                value={state?.firstName1}
                                onChange={handleChange}
                                placeholder='Add more Brand'
                                // required
                                ref={register({
                                  //   required: 'This is required ',
                                })}
                              />
                            </div>
                          </div>
                          <div className='row w-100 bb'>
                            <div className='col-4 bb'>Sub Category</div>
                            <div className='col-4 bb'>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='subCategory2   '
                                value={state?.subCategory2}
                                ref={register}>
                                {subCategory.map((data) => (
                                  <option value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                            <div className='col-4 bb'>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='firstName2'
                                value={state?.firstName2}
                                onChange={handleChange}
                                placeholder='Add more Brand'
                                // required
                                ref={register({
                                  //   required: 'This is required ',
                                })}
                              />
                            </div>
                          </div>
                          <div className='row w-100 bb'>
                            <div className='col-4 bb'>Sub Category</div>
                            <div className='col-4 bb'>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='subCategory3'
                                value={state?.subCategory3}
                                ref={register}>
                                {subCategory.map((data) => (
                                  <option value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                            <div className='col-4 bb'>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='firstName3'
                                value={state?.firstName3}
                                onChange={handleChange}
                                placeholder='Add more Brand'
                                // required
                                ref={register({
                                  //   required: 'This is required ',
                                })}
                              />
                            </div>
                          </div>
                          <div className='row w-100 bb'>
                            <div className='col-4 bb'>Sub Category</div>
                            <div className='col-4 bb'>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='subCategory4'
                                value={state?.subCategory4}
                                ref={register}>
                                {subCategory.map((data) => (
                                  <option value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                            <div className='col-4 bb'>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='firstName4'
                                value={state?.firstName4}
                                onChange={handleChange}
                                placeholder='Add more Brand'
                                // required
                                ref={register({
                                  //   required: 'This is required ',
                                })}
                              />
                            </div>
                          </div>
                          <h5 class='mt-5 mb-2'>
                            Select preferred location for distribution-ship
                            appointment
                          </h5>
                          <div className='row w-100 bb'>
                            <div className='col-4 bb'>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='state'
                                required
                                value={state?.state}
                                onChange={(e) => {
                                  handleChange(e);
                                  handleStatefunforcity(e.target.value);
                                }}
                                ref={register}>
                                {Object.keys(statehandle).map((data) => (
                                  <option value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                            <div className='col-4 bb'>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='city'
                                required
                                value={state?.city}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                ref={register}>
                                {cityhandle.map((data) => (
                                  <option value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                            <div className='col-4 bb'>
                              <button type='button' className='btn btn-primary'>
                                Add
                              </button>
                            </div>
                          </div>

                          <div className='col-lg-12 d-flex justify-content-end'>
                            <button
                              type='button'
                              className='btn btn-primary mr-2'
                              onClick={(e) => {
                                handleFourthRequest(e);
                              }}>
                              Previous
                            </button>

                            <button type='submit' className='btn btn-primary'>
                              next
                            </button>
                          </div>
                          <p className='successMag'>{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 5 && (
                        <div className='row'>
                          <div className='row w-100 bb'>
                            <div className='col-4 bb'>Sub Category</div>
                            <div className='col-4 bb'>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='subCategory'
                                value={state?.subCategory11111}
                                onChange={handleChange}
                                ref={register}>
                                {/* {subCategory.map((data) => {
                                  <option value={data}>{data}</option>;
                                })} */}
                                <option value=''>Select Sub Category</option>
                                {subCategory.map((data) => (
                                  <option value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                            <div className='col-4 bb'>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='brandName'
                                value={state?.brandName11}
                                onChange={handleChange}
                                placeholder='Add more Brand'
                                // required
                                ref={register({
                                  //   required: 'This is required ',
                                })}
                              />
                            </div>
                          </div>
                          <div className='row w-100 bb'>
                            <div className='col-4 bb'>Sub Category</div>
                            <div className='col-4 bb'>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='subCategory2   '
                                value={state?.subCategory21}
                                ref={register}>
                                {subCategory.map((data) => (
                                  <option value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                            <div className='col-4 bb'>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='firstName2'
                                value={state?.firstName2}
                                onChange={handleChange}
                                placeholder='Add more Brand'
                                // required
                                ref={register({
                                  //   required: 'This is required ',
                                })}
                              />
                            </div>
                          </div>
                          <div className='row w-100 bb'>
                            <div className='col-4 bb'>Sub Category</div>
                            <div className='col-4 bb'>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='subCategory3'
                                value={state?.subCategory3}
                                ref={register}>
                                {subCategory.map((data) => (
                                  <option value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                            <div className='col-4 bb'>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='firstName3'
                                value={state?.firstName3}
                                onChange={handleChange}
                                placeholder='Add more Brand'
                                // required
                                ref={register({
                                  //   required: 'This is required ',
                                })}
                              />
                            </div>
                          </div>
                          <div className='row w-100 bb'>
                            <div className='col-4 bb'>Sub Category</div>
                            <div className='col-4 bb'>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='subCategory4'
                                value={state?.subCategory4}
                                ref={register}>
                                {subCategory.map((data) => (
                                  <option value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                            <div className='col-4 bb'>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='firstName4'
                                value={state?.firstName4}
                                onChange={handleChange}
                                placeholder='Add more Brand'
                                // required
                                ref={register({
                                  //   required: 'This is required ',
                                })}
                              />
                            </div>
                          </div>
                          {/* <h5 class='mt-5 mb-2'>
                            Select preferred location for distribution-ship
                            appointment
                          </h5>
                          <div className='row w-100 bb'>
                            <div className='col-4 bb'>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='state'
                                required
                                value={state?.state}
                                onChange={(e) => {
                                  handleChange(e);
                                  handleStatefunforcity(e.target.value);
                                }}
                                ref={register}>
                                <option value=''>Select State </option>
                                {Object.keys(statehandle).map((data) => (
                                  <option value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                            <div className='col-4 bb'>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='city'
                                required
                                value={state?.city}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                ref={register}>
                                <option value=''>Select City </option>
                                {cityhandle.map((data) => (
                                  <option value={data}>{data}</option>
                                ))}
                              </select>
                            </div>
                            <div className='col-4 bb'>
                              <button type='button' className='btn btn-primary'>
                                Add
                              </button>
                            </div>
                          </div> */}

                          <div className='col-lg-12 d-flex justify-content-end'>
                            <button
                              type='button'
                              className='btn btn-primary mr-2'
                              onClick={(e) => {
                                handleFivethRequest(e);
                              }}>
                              Previous
                            </button>

                            <button type='submit' className='btn btn-primary'>
                              next
                            </button>
                          </div>
                          <p className='successMag'>{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 6 && (
                        <div className='row'>
                          <div class='form-row mt-4'>
                            <div class='col-12 col-sm-4'>
                              <label for='file'>Upload Logo/Vedio</label>
                            </div>
                            <div class='col-12 col-sm-8 mt-4 mt-sm-0'>
                              <input
                                class='multisteps-form__input form-control'
                                type='file'
                                name='profileImg'
                                onChange={fileChange}
                                placeholder='image'
                                ref={register({
                                  //   required: 'This is required ',
                                })}
                              />
                            </div>
                          </div>

                          <div className='col-lg-12 d-flex justify-content-end'>
                            <button
                              type='button'
                              className='btn btn-primary mr-2'
                              onClick={(e) => {
                                handlesixthRequest(e);
                              }}>
                              Previous
                            </button>

                            <button type='submit' className='btn btn-primary'>
                              Save
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
      {/* <Footer /> */}
    </>
  );
}

export default Index;
