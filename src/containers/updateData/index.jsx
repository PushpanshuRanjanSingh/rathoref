import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import Header from '../header/header';
import Footer from '../footer/footer';
import showNotification from '../../services/notificationService';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import apiUrl from '../../globals/config';
import axios from 'axios';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import DatePicker from 'react-datepicker';
import _ from 'underscore';
import 'react-datepicker/dist/react-datepicker.css';
function Index(props) {
  // if (!props.location?.data) {
  //   props.history.push({
  //     pathname: "/",
  //   });
  // }
  const { id } = useParams();
  const [Selectedyear, setSelectedyear] = useState(null);
  const [SelectedDate, setSelectedDate] = useState(null);
  const [successMs, setsuccessMs] = useState('');
  const [successMsg, setsuccessMsg] = useState('');
  const [post, setpost] = useState([]);
  const [viewData, setViewData] = useState();
  const { register, errors, handleSubmit } = useForm();
  const [inputfilead, setinputfilead] = useState('');
  const [heading, setheading] = useState('Personal Details');
  const [inputfilepan, setinputfilepan] = useState('');
  const [inputfile, setinputfile] = useState('');
  const [inputfilepic, setinputfilepic] = useState('');
  const [districtData, setdistrictData] = useState([]);
  const [blockData, setblockData] = useState([]);
  const [brand, setbrand] = useState([]);
  const [Type, setType] = useState([]);
  const [iscomplete, setiscomplete] = useState(false);
  const [Vechicle, setVechicle] = useState([]);
  const [formToggle, setformToggle] = useState(props.location.data);
  const [prevData, setprevData] = useState(props);
  const [data, setdata] = useState({});
  const [pramsdata, setpramsdata] = useState(props.location.data);
  const [approve, setapprove] = useState(props.location.approved);
  const [errorMsg, seterrorMsg] = useState('');
  const [exchange, setexchange] = useState(false);
  const [Varient, setVarient] = useState([]);
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
    brand: '',
    type: '',
    variants: '',
  });

  useEffect(() => {
    getLeads();

    // if (formToggle == 2) {

    // }
  }, []);

  const getLeads = () => {
    axios
      .get(apiUrl + 'user/getcompanyById/' + id)
      .then((resp) => {
        var data = resp?.data?.data;
        setState(resp?.data?.data);
      })
      .catch((err) => {
        showNotification('danger', err.message);
      });
  };

  const onSubmit = (formsubmitdata) => {
    // console.log(`formsubmitdata`, formsubmitdata);
    const formData = new FormData();
    Object.keys(formsubmitdata).forEach((key) => {
      if (formsubmitdata[key]) {
        formData.append([key], formsubmitdata[key]);
        console.log([key], formsubmitdata[key]);
      }
    });

    axios
      .post(apiUrl + 'user/updatecompany/' + id, formData)
      .then((resp) => {
        console.log(`resp`, resp);
      })
      .catch((err) => {
        showNotification('danger', err.message);
      });
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

  const fileChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.files[0],
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
            var data = res.data[0].PostOffice;
            var block = [];
            data.map((data, index) => {
              block.push(data.Block);
            });
            // setblockData([...new Set(block)]);
            let obj = {
              district: res.data[0].PostOffice[0].District,
              pincode: pincode,
            };
            setState({
              ...state,
              ...obj,
            });
            // gitBlock(res.data[0].PostOffice[0].District);
          }
        });
    } else {
      setpost([]);
    }
  };
  const back = () => {
    props.history.goBack();
  };

  if (state)
    return (
      <>
        <div className='content-body'>
          <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <div className='container-fluid'>
              <div className='row justify-content-center h-100 align-items-center emi_row'>
                <div className='col-md-12'>
                  <div className='card widget-stat'>
                    <div className='card-header bg-custom-blue'>
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
                                  htmlFor='val-username'>
                                  First Name
                                  <span className='text-danger'>*</span>
                                </label>

                                <input
                                  type='text'
                                  className='form-control'
                                  id='val-username'
                                  name='firstName'
                                  value={state?.firstName}
                                  onChange={handleChange}
                                  required
                                  placeholder='Enter name..'
                                  ref={register({
                                    required: 'This is required ',
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
                            <div className='col-lg-6'>
                              <div className='form-group '>
                                <label
                                  className='col-form-label'
                                  htmlFor='val-username'>
                                  Last Name
                                </label>
                                <input
                                  required
                                  className='form-control'
                                  id='val-username'
                                  name='lastName'
                                  value={state?.lastName}
                                  onChange={handleChange}
                                  placeholder='Enter last name..'
                                  ref={register}
                                />
                              </div>
                            </div>
                            <div className='col-lg-6'>
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
                                  required
                                  value={state?.email}
                                  onChange={handleChange}
                                  placeholder='Enter email..'
                                  ref={register({
                                    // required: "This is required ",
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
                                  htmlFor='val-username'>
                                  Mobile Number
                                </label>
                                <input
                                  className='form-control'
                                  id='val-username'
                                  disabled
                                  maxLength='10'
                                  value={state?.phoneNo}
                                  onChange={handleChange}
                                  onKeyPress={(e) => restrictAlpha(e)}
                                  placeholder='Enter mobile number...'
                                  defaultValue={viewData?.phone}
                                />
                              </div>
                            </div>

                            <div className='col-lg-12'>
                              <div className='contect_form1'>
                                <textarea
                                  rows='4'
                                  placeholder='Message *'
                                  name='aboutCompany'
                                  defaultValue={state?.aboutCompany}
                                  ref={register}
                                  maxLength='500'></textarea>
                              </div>
                            </div>
                            <div className='col-lg-12 d-flex justify-content-end'>
                              <button
                                type='button'
                                onClick={back}
                                className='btn btn-primary mr-2'>
                                Back
                              </button>
                              <button type='submit' className='btn btn-primary'>
                                Save
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
                                  htmlFor='val-username'>
                                  Company Name
                                </label>
                                <input
                                  required
                                  className='form-control'
                                  id='val-username'
                                  name='companyName'
                                  value={state?.companyName}
                                  onChange={handleChange}
                                  placeholder='Enter  Company Name..'
                                  ref={register}
                                />
                              </div>
                            </div>
                            <div className='col-lg-6'>
                              <div className='form-group '>
                                <label
                                  className='col-form-label'
                                  htmlFor='val-username'>
                                  Contact person
                                </label>
                                <input
                                  required
                                  className='form-control'
                                  id='val-username'
                                  name='contactPerson'
                                  value={state?.contactPerson}
                                  onChange={handleChange}
                                  placeholder='Enter  Contact person..'
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
                                  required
                                  className='form-control'
                                  id='val-username'
                                  name='contactNumber'
                                  value={state?.contactNumber}
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
                                  required
                                  className='form-control'
                                  id='val-username'
                                  name='alternativeNumber'
                                  value={state?.alternativeNumber}
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
                                  required
                                  className='form-control'
                                  id='val-username'
                                  name='alternativeEmail'
                                  value={state?.alternativeEmail}
                                  onChange={handleChange}
                                  placeholder='Enter  Alternative email..'
                                  ref={register}
                                />
                              </div>
                            </div>
                            <div className='col-lg-6'>
                              <div className='form-group '>
                                <label
                                  className='col-form-label'
                                  htmlFor='val-username'>
                                  Establishment Year
                                </label>
                                <input
                                  required
                                  className='form-control'
                                  id='val-username'
                                  name='lastName'
                                  value={state?.lastName}
                                  onChange={handleChange}
                                  placeholder='Enter last name..'
                                  ref={register}
                                />
                              </div>
                            </div>
                            <div className='col-lg-6'>
                              <div className='form-group '>
                                <label
                                  className='col-form-label'
                                  htmlFor='val-username'>
                                  Gst No
                                </label>
                                <input
                                  required
                                  className='form-control'
                                  id='val-username'
                                  name='gstNo'
                                  value={state?.gstNo}
                                  onChange={handleChange}
                                  placeholder='Enter Gst No..'
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
                                  required
                                  className='form-control'
                                  id='val-username'
                                  name='turnoverOfTheCompany'
                                  value={state?.turnoverOfTheCompany}
                                  onChange={handleChange}
                                  placeholder='Enter Turnover of the company..'
                                  ref={register}
                                />
                              </div>
                            </div>
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
                                  defaultValue={state?.pincode}
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
                                  name='Country'
                                  onChange={handleChange}
                                  value={state?.Country}
                                  ref={register}>
                                  <option value='India'>{'India'}</option>
                                </select>
                              </div>
                            </div>
                            <div className='col-lg-6'>
                              <div className='form-group '>
                                <label
                                  className='col-form-label'
                                  htmlFor='val-username'>
                                  State
                                </label>

                                <input
                                  type='text'
                                  className='form-control'
                                  id='val-username'
                                  name='state'
                                  value={state?.state}
                                  onChange={handleChange}
                                  placeholder='Enter State name..'
                                  ref={register}
                                />
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
                                  value={state?.cityVillage}
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
                                  value={state?.address}
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
                                onClick={back}>
                                Back
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
      </>
    );
}

export default Index;
