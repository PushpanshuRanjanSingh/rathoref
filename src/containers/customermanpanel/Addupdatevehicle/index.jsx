import React, { useEffect, useState, useCallback } from 'react';

import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import { useForm } from 'react-hook-form';
import apiUrl from '../../../globals/config';

import axios from 'axios';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
// import DatePicker from 'react-date-picker';
function Index(props) {
  const [successMs, setsuccessMs] = useState('');
  const [successMsg, setsuccessMsg] = useState('');
  const [post, setpost] = useState([]);
  const [viewData, setViewData] = useState();
  const { register, errors, handleSubmit } = useForm();
  const [inputfilead, setinputfilead] = useState('');
  const [heading, setheading] = useState('Add Brand');
  const [inputfilepan, setinputfilepan] = useState('');
  const [inputfile, setinputfile] = useState('');
  const [inputfilepic, setinputfilepic] = useState('');
  const [districtData, setdistrictData] = useState([]);
  const [blockData, setblockData] = useState([]);
  const [id, setid] = useState('');
  const [formToggle, setformToggle] = useState(1);
  const [prevData, setprevData] = useState(props);
  const [data, setdata] = useState({});
  // const [pramsdata, setpramsdata] = useState(props.location.data);
  const [errorMsg, seterrorMsg] = useState('');
  const [SelectedDate, setSelectedDate] = useState(null);
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
  const onSubmit = (formsubmitdata) => {
   
    if (formToggle == 1) {
      setformToggle(2);
      setheading('add PPL');
    }

   
    try {
      if (formToggle == 2) {
        setformToggle(3);
        setheading('Add vehicle');
      } else if (formToggle == 3) {
        setformToggle(4);
        setheading('Add Varient');
      } else if (formToggle == 4) {
        setformToggle(5);
        setheading('Add Colour');
      } else if (formToggle == 5) {
        setformToggle(6);
        setheading(' Add Utility Vehicle');
      } else {
        return;
        delete state.docs;
        delete state.vehicle;
        delete state._id;

        const formData = new FormData();
        Object.keys(state).forEach((key) => {
          if (state[key]) {
            formData.append([key], state[key]);
          }
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
            setsuccessMs('Document updated successfully!');

            if (resp) {
              props.history.push('/leads');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
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

  const fileChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleSeconsRequest = (e) => {
    e.preventDefault();
    setformToggle(1);
    setheading('Personal Details');
  };
  const handleThirdRequest = (e) => {
    e.preventDefault();
    setformToggle(2);
    setheading('Vehicle Information');
  };
  const handleFourthRequest = (e) => {
    e.preventDefault();
    setformToggle(3);
    setheading('Address');
  };
  const handleFivethRequest = (e) => {
    e.preventDefault();
    setformToggle(4);
    setheading('buying detail');
  };
  const handlesixthRequest = (e) => {
    e.preventDefault();
    setformToggle(5);
    setheading('Exchange Vehicle');
  };
  const handlesevenRequest = (e) => {
    e.preventDefault();
    setformToggle(6);
    setheading('Document');
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

  return (
    <>
      {/* <Header /> */}
      <div className='content-body'>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
                        <Row>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Brand Name
                              </label>
                              <input
                                type='text'
                                ref={register}
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a  brand name..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Brand Logo
                              </label>

                              <div class='custom-file mb-3'>
                                <input
                                  type='file'
                                  class='custom-file-input'
                                  id='customFile'
                                  name='filename'
                                />
                                <label
                                  class='custom-file-label'
                                  for='customFile'>
                                  Choose file
                                </label>
                              </div>
                            </div>
                          </Col>

                          <Col sm={12} className='d-flex mt-3 mb-2'>
                            <button type='submit' class='btn btn-primary'>
                              Save
                            </button>
                          </Col>
                        </Row>
                      )}
                      {formToggle == 2 && (
                        <Row>
                          <Col sm={6}>
                            <div class='form-group'>
                              <label class='col-form-label' for='val-username'>
                                Select Brand
                              </label>
                              <select
                                ref={register}
                                class='form-control'
                                id='exampleFormControlSelect1'>
                                <option>Select Brand</option>
                                <option>SCV-Mini</option>
                              </select>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                PPL Name
                              </label>
                              <input
                                type='text'
                                ref={register}
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a PPL name..'
                              />
                            </div>
                          </Col>

                          <Col sm={12} className='d-flex mt-3 mb-2'>
                            <button type='submit' class='btn btn-primary'>
                              Save
                            </button>
                          </Col>
                        </Row>
                      )}
                      {formToggle == 3 && (
                        <Row>
                          <Col sm={6}>
                            <div class='form-group'>
                              <label class='col-form-label' for='val-username'>
                                Select PPL
                              </label>
                              <select
                                ref={register}
                                class='form-control'
                                id='exampleFormControlSelect1'>
                                <option>Select PPL</option>
                                <option>1</option>
                              </select>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Vehicle Name
                              </label>
                              <input
                                type='text'
                                ref={register}
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a vehicle name..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                PL Name
                              </label>
                              <input
                                type='text'
                                ref={register}
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a PL name..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Primary Image
                              </label>

                              <div class='custom-file mb-3'>
                                <input
                                  type='file'
                                  class='custom-file-input'
                                  id='customFile'
                                  name='filename'
                                />
                                <label
                                  class='custom-file-label'
                                  for='customFile'>
                                  Choose file
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Other Image
                              </label>

                              <div class='custom-file mb-3'>
                                <input
                                  type='file'
                                  class='custom-file-input'
                                  id='customFile'
                                  name='filename'
                                />
                                <label
                                  class='custom-file-label'
                                  for='customFile'>
                                  Choose file
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={6} className='d-flex align-items-center '>
                            <button
                              type='submit'
                              class='btn btn-primary btn-cus-add-img'>
                              Add Other Image
                            </button>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Add Icon
                              </label>

                              <div class='custom-file mb-3'>
                                <input
                                  type='file'
                                  class='custom-file-input'
                                  id='customFile'
                                  name='filename'
                                />
                                <label
                                  class='custom-file-label'
                                  for='customFile'>
                                  Choose file
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={12}>
                            <div class='form-group'>
                              <label for='exampleFormControlTextarea1'>
                                Add Description
                              </label>
                              <textarea
                                ref={register}
                                class='form-control'
                                id='exampleFormControlTextarea1'
                                rows='3'></textarea>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group'>
                              <label class='col-form-label' for='val-username'>
                                Select Div
                              </label>
                              <select
                                class='form-control'
                                ref={register}
                                id='exampleFormControlSelect1'>
                                <option>Select Div</option>
                                <option>Description</option>
                                <option>Table</option>
                              </select>
                            </div>
                          </Col>{' '}
                          <br className='' />
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Add Title
                              </label>
                              <input
                                type='text'
                                ref={register}
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a title name..'
                              />
                            </div>
                          </Col>
                          <Col sm={12}>
                            <div class='form-group'>
                              <label for='exampleFormControlTextarea1'>
                                Add Description
                              </label>
                              <textarea
                                class='form-control'
                                ref={register}
                                id='exampleFormControlTextarea1'
                                rows='3'></textarea>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Table right title
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                ref={register}
                                placeholder='Enter a title name..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Table left box
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                ref={register}
                                placeholder='Enter a title name..'
                              />
                            </div>
                          </Col>
                          <Col sm={12} className='d-flex mt-3 mb-2'>
                            {/* <Link className='' to='/vehicleInformation'> */}{' '}
                            <button type='submit' class='btn btn-primary'>
                              Save
                            </button>{' '}
                            {/* </Link> */}
                          </Col>
                        </Row>
                      )}
                      {formToggle == 4 && (
                        <Row>
                          <Col sm={6}>
                            <div class='form-group'>
                              <label class='col-form-label' for='val-username'>
                                Select Vehicle
                              </label>
                              <select
                                class='form-control'
                                ref={register}
                                id='exampleFormControlSelect1'>
                                <option>Select PPL</option>
                                <option>1</option>
                              </select>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group'>
                              <label class='col-form-label' for='val-username'>
                                Select Vehicle Type
                              </label>
                              <select
                                class='form-control'
                                ref={register}
                                id='exampleFormControlSelect1'>
                                <option>Select Vehicle Type</option>
                                <option>Petrol</option>
                                <option>Desel</option>
                                <option>CNG</option>
                              </select>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Variant Name
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                ref={register}
                                name='val-username'
                                placeholder='Enter a variant name..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Primary Image
                              </label>

                              <div class='custom-file mb-3'>
                                <input
                                  type='file'
                                  class='custom-file-input'
                                  id='customFile'
                                  name='filename'
                                />
                                <label
                                  class='custom-file-label'
                                  for='customFile'>
                                  Choose file
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Other Image
                              </label>

                              <div class='custom-file mb-3'>
                                <input
                                  type='file'
                                  class='custom-file-input'
                                  id='customFile'
                                  name='filename'
                                />
                                <label
                                  class='custom-file-label'
                                  for='customFile'>
                                  Choose file
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={6} className='d-flex align-items-center '>
                            <button
                              type='submit'
                              class='btn btn-primary btn-cus-add-img'>
                              Add Other Image
                            </button>
                          </Col>
                          <Col sm={12}>
                            <div class='form-group'>
                              <label for='exampleFormControlTextarea1'>
                                Add Description
                              </label>
                              <textarea
                                class='form-control'
                                ref={register}
                                id='exampleFormControlTextarea1'
                                rows='3'></textarea>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group'>
                              <label class='col-form-label' for='val-username'>
                                Select Div
                              </label>
                              <select
                                class='form-control'
                                ref={register}
                                id='exampleFormControlSelect1'>
                                <option>Select Div</option>
                                <option>Description</option>
                                <option>Table</option>
                              </select>
                            </div>
                          </Col>{' '}
                          <br className='' />
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Add Title
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                ref={register}
                                name='val-username'
                                placeholder='Enter a title name..'
                              />
                            </div>
                          </Col>
                          <Col sm={12}>
                            <div class='form-group'>
                              <label for='exampleFormControlTextarea1'>
                                Add Description
                              </label>
                              <textarea
                                class='form-control'
                                ref={register}
                                id='exampleFormControlTextarea1'
                                rows='3'></textarea>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Table right title
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                ref={register}
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a title name..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Table left title
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                ref={register}
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a title name..'
                              />
                            </div>
                          </Col>
                          <Col sm={12} className='d-flex mt-3 mb-2'>
                            <button type='submit' class='btn btn-primary'>
                              Save
                            </button>
                          </Col>
                        </Row>
                      )}
                      {formToggle == 5 && (
                        <Row>
                          <Col sm={6}>
                            <div class='form-group'>
                              <label class='col-form-label' for='val-username'>
                                Select Variant
                              </label>
                              <select
                                class='form-control'
                                ref={register}
                                id='exampleFormControlSelect1'>
                                <option>Select Variant</option>
                                <option>Petrol</option>
                                <option>Desel</option>
                                <option>CNG</option>
                              </select>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Colour Name
                              </label>
                              <input
                                type='text'
                                ref={register}
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a Colour Name..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Vehicle Name
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                ref={register}
                                name='val-username'
                                placeholder='Enter a vehicle name..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Colour Variant Images
                              </label>

                              <div class='custom-file mb-3'>
                                <input
                                  type='file'
                                  class='custom-file-input'
                                  id='customFile'
                                  name='filename'
                                />
                                <label
                                  class='custom-file-label'
                                  for='customFile'>
                                  Choose file
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Other Image
                              </label>

                              <div class='custom-file mb-3'>
                                <input
                                  type='file'
                                  class='custom-file-input'
                                  id='customFile'
                                  name='filename'
                                />
                                <label
                                  class='custom-file-label'
                                  for='customFile'>
                                  Choose file
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={6} className='d-flex align-items-center '>
                            <button
                              type='submit'
                              class='btn btn-primary btn-cus-add-img'>
                              Add Other Image
                            </button>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Add Video Link
                              </label>

                              <div class='custom-file mb-3'>
                                <input
                                  type='file'
                                  class='custom-file-input'
                                  id='customFile'
                                  name='filename'
                                />
                                <label
                                  class='custom-file-label'
                                  for='customFile'>
                                  Choose file
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={12}>
                            <div class='form-group'>
                              <label for='exampleFormControlTextarea1'>
                                Add Description
                              </label>
                              <textarea
                                class='form-control'
                                ref={register}
                                id='exampleFormControlTextarea1'
                                rows='3'></textarea>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group'>
                              <label class='col-form-label' for='val-username'>
                                Select Div
                              </label>
                              <select
                                class='form-control'
                                ref={register}
                                id='exampleFormControlSelect1'>
                                <option>Select Div</option>
                                <option>Description</option>
                                <option>Table</option>
                              </select>
                            </div>
                          </Col>{' '}
                          <br className='' />
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Add Title
                              </label>
                              <input
                                type='text'
                                ref={register}
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a title name..'
                              />
                            </div>
                          </Col>
                          <Col sm={12}>
                            <div class='form-group'>
                              <label for='exampleFormControlTextarea1'>
                                Add Description
                              </label>
                              <textarea
                                class='form-control'
                                ref={register}
                                id='exampleFormControlTextarea1'
                                rows='3'></textarea>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Table right title
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                ref={register}
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a title name..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Table left title
                              </label>
                              <input
                                type='text'
                                ref={register}
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a title name..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                SKU/VCM
                              </label>
                              <input
                                type='text'
                                ref={register}
                                class='form-control'
                                id='val-username'
                                name='val-username'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Ex-Showroom Price
                              </label>
                              <input
                                type='text'
                                ref={register}
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a ex-showroom price ..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Insurance Price
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                ref={register}
                                name='val-username'
                                placeholder='Enter a insurance price ..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Cashback
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                ref={register}
                                name='val-username'
                                placeholder='Enter a Cashback..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Agent earning S1
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                ref={register}
                                name='val-username'
                                placeholder='Enter a agent earning..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Agent earning S5
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                ref={register}
                                name='val-username'
                                placeholder='Enter a agent earning..'
                              />
                            </div>
                          </Col>
                          <Col sm={12} className='d-flex mt-3 mb-2'>
                            <button type='submit' class='btn btn-primary'>
                              Save
                            </button>
                          </Col>
                        </Row>
                      )}
                      {formToggle == 6 && (
                        <Row>
                          <Col sm={6}>
                            <div class='form-group'>
                              <label class='col-form-label' for='val-username'>
                                Select Variant
                              </label>
                              <select
                                class='form-control'
                                ref={register}
                                id='exampleFormControlSelect1'>
                                <option>Select Variant</option>
                                <option>Petrol</option>
                                <option>Desel</option>
                                <option>CNG</option>
                              </select>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Utility Name
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                ref={register}
                                name='val-username'
                                placeholder='Enter a Utility Name ..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Vehicle Name
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                ref={register}
                                placeholder='Enter a vehicle name..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Colour Variant Images
                              </label>

                              <div class='custom-file mb-3'>
                                <input
                                  type='file'
                                  class='custom-file-input'
                                  id='customFile'
                                  name='filename'
                                />
                                <label
                                  class='custom-file-label'
                                  for='customFile'>
                                  Choose file
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Other Image
                              </label>

                              <div class='custom-file mb-3'>
                                <input
                                  type='file'
                                  class='custom-file-input'
                                  id='customFile'
                                  name='filename'
                                />
                                <label
                                  class='custom-file-label'
                                  for='customFile'>
                                  Choose file
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={6} className='d-flex align-items-center '>
                            <button
                              type='submit'
                              class='btn btn-primary btn-cus-add-img'>
                              Add Other Image
                            </button>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Add Video Link
                              </label>

                              <div class='custom-file mb-3'>
                                <input
                                  type='file'
                                  class='custom-file-input'
                                  id='customFile'
                                  name='filename'
                                />
                                <label
                                  class='custom-file-label'
                                  for='customFile'>
                                  Choose file
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={12}>
                            <div class='form-group'>
                              <label for='exampleFormControlTextarea1'>
                                Add Description
                              </label>
                              <textarea
                                class='form-control'
                                ref={register}
                                id='exampleFormControlTextarea1'
                                rows='3'></textarea>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group'>
                              <label class='col-form-label' for='val-username'>
                                Select Div
                              </label>
                              <select
                                class='form-control'
                                ref={register}
                                id='exampleFormControlSelect1'>
                                <option>Select Div</option>
                                <option>Description</option>
                                <option>Table</option>
                              </select>
                            </div>
                          </Col>{' '}
                          <br className='' />
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Add Title
                              </label>
                              <input
                                type='text'
                                ref={register}
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a title name..'
                              />
                            </div>
                          </Col>
                          <Col sm={12}>
                            <div class='form-group'>
                              <label for='exampleFormControlTextarea1'>
                                Add Description
                              </label>
                              <textarea
                                class='form-control'
                                ref={register}
                                id='exampleFormControlTextarea1'
                                rows='3'></textarea>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Table right title
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                ref={register}
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a title name..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Table left title
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                ref={register}
                                id='val-username'
                                name='val-username'
                                placeholder='Enter a title name..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                SKU/VCM
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                ref={register}
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Ex-Showroom Price
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                ref={register}
                                placeholder='Enter a ex-showroom price ..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Insurance Price
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                ref={register}
                                placeholder='Enter a insurance price ..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Cashback
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                ref={register}
                                name='val-username'
                                placeholder='Enter a Cashback..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Agent earning S1
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                ref={register}
                                name='val-username'
                                placeholder='Enter a agent earning..'
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class='form-group '>
                              <label class='col-form-label' for='val-username'>
                                Agent earning S5
                              </label>
                              <input
                                type='text'
                                class='form-control'
                                id='val-username'
                                name='val-username'
                                ref={register}
                                placeholder='Enter a agent earning..'
                              />
                            </div>
                          </Col>
                          <Col sm={12} className='d-flex mt-3 mb-2'>
                            <button type='submit' class='btn btn-primary'>
                              Save
                            </button>
                          </Col>
                        </Row>
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
