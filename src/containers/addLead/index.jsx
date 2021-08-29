import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import showNotification from "../../services/notificationService";

import Header from '../header/header';
import Footer from '../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import apiUrl from '../../globals/config';
import axios from 'axios';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
// import DatePicker from 'react-date-picker';
function Index(props) {
  
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
  const [vehicle, setvehicle] = useState(props.location.data);
  const [prevData, setprevData] = useState(props);
  const [data, setdata] = useState({});
  const [Selectedyear, setSelectedyear] = useState(null)
  const [errorMsg, seterrorMsg] = useState('');
  const [SelectedDate, setSelectedDate] = useState(null);
  const [Varient, setVarient] = useState([]);
  const [exchange, setexchange] = useState(false)
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
   
    if (formToggle == 2) getBrandList();
  }, [formToggle]);
  const onSubmit = (formsubmitdata) => {
    formsubmitdata.dateOfBirth = SelectedDate
    ? moment(SelectedDate).format("l")
    : "";
    formsubmitdata.yearOfRegistration = Selectedyear
    ? moment(Selectedyear).format("l")
    : "";
    if (formToggle == 1) {
      if (formsubmitdata.phoneNo && formsubmitdata.firstName) {
        let token = localStorage.getItem('myData');
        let headers = {
          headers: {
            'x-token': `Bearer ${token}`,
          },
        };
        axios
          .post(
            apiUrl + 'user/getPhone',
            {
              phoneNo: formsubmitdata.phoneNo,
            },
            headers
          )
          .then(function (response) {
            seterrorMsg(response.data.message);
          })
          .catch(function (error) {
            if(vehicle){var newData={...formsubmitdata ,...vehicle};addlead(newData);}
            else {
              addlead(formsubmitdata)
            }
          });
      }
    } else {
      if (!id) {
        props.history.goBack();

        // props.history.push('/leads');
      }
      function addleadupdate() {
        formsubmitdata.userid = id;

        formsubmitdata.exchangeVehicleRC = state?.exchangeVehicleRC;
        formsubmitdata.exchangeVehicleDL = state?.exchangeVehicleDL;
        formsubmitdata.exchangeVehiclePermit = state?.exchangeVehiclePermit;

        formsubmitdata.aadharDoc = state?.aadharDoc;
        formsubmitdata.photoUpload = state?.photoUpload;
        formsubmitdata.bankDoc = state?.bankDoc;
        formsubmitdata.panDoc = state?.panDoc;
        const formData = new FormData();
        Object.keys(formsubmitdata).forEach((key) => {
          if (formsubmitdata[key]) {
            formData.append([key], formsubmitdata[key]);
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
            // setsuccessMs("Document updated successfully!");
            if (resp && formToggle == 7) {
              showNotification("success", "Lead Added Successfully");
              props.history.goBack();
            }
           
          })
          .catch((err) => {
            showNotification("danger", err.message);
          });
      }
      addleadupdate();
    }
    const addlead = (data) => {
      
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          if (
            key === 'aadharDoc' ||
            key === 'panDoc' ||
            key === 'bankDoc' ||
            key === 'photoUpload'
          ) {
            if (data[key][0]) {
              formData.append([key], data[key][0]);
            }
          } else {
            formData.append([key], data[key]);
          }
        }
      });
      let token = localStorage.getItem('myData');

      let headers = {
        headers: {
          'x-token': `Bearer ${token}`,
        },
      };
      axios
        .post(apiUrl + 'user/addLead', formData, headers)
        .then((resp) => {
     
          data.userid = resp?.data?.data?.saveDetails?.userid;
        
          if (resp?.data.success) {
            if(vehicle &&formToggle == 1){
              setformToggle(3);
              setheading('Address');
             }
             else if  (formToggle == 1) {
              setformToggle(2);
              setheading('Vehicle Information');
            };
            setid(resp.data.data.saveDetails.userid);
          }
        })
        .catch((err) => {
          showNotification('danger', err.message)
      
        });
    };
    try {
      if (formToggle == 2) {
        setformToggle(3);
        setheading('Address');
      } else if (formToggle == 3) {
        setformToggle(4);
        setheading('Buying Details');
      } else if (formToggle == 4  ) {
        if(exchange==false){
          setformToggle(5);
          setheading('Exchange Vehicle');
        }else{
          setformToggle(6);
        setheading('Document');
        }
        
      } else if (formToggle == 5) {
        setformToggle(6);
        setheading('Document');
      } else if (formToggle == 6) {
        setformToggle(7);
        setheading('Bank Details');
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
            showNotification('danger', err.message)
          });
      }
    } catch (err) {
      showNotification('danger', err.message)
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
  const getBrandList = () => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "brand/getBrandList?skip=1&limit=2000", headers)
      .then((response) => {
        let data = response?.data?.data[0].data;

        setbrand(data);
      })
      .catch(function (error) {
        showNotification("danger", error.message);
      });
  };
  const brandHandle = (e) => {
    //  e.target.value
    if (e.target.value) {
      let token = localStorage.getItem("myData");
      let headers = {
        headers: {
          "x-token": `Bearer ${token}`,
        },
      };
      axios
        .get(
          apiUrl + "ppl/getBrandId?skip=1&limit=200&id=" + e.target.value,
          headers
        )
        .then((response) => {
          let data = response?.data?.data[0].data;

          setType(data);
        })
        .catch(function (error) {
          showNotification("danger", error.message);
        });
    } else {
      showNotification("danger", "Select value");
    }
  };
  const handleType = (e) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + "addVehicle/getPplId?skip=1&limit=200&id=" + e.target.value,
        headers
      )
      .then((response) => {
        let data = response?.data?.data[0].data;

        setVechicle(data);
      })
      .catch(function (error) {
        showNotification("danger", error.message);
      });
  };
  const handleVehicle = (e) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + "variant/getVehicleId?skip=1&limit=2000&id=" + e.target.value,
        headers
      )
      .then((response) => {
        let data = response?.data?.data[0].data;

        setVarient(data);
      })
      .catch(function (error) {
        showNotification("danger", error.message);
      });
  };
  const handleExchange=(e)=>{
    if(e?.target?.value=="no"){
      setexchange(true)
    }
  }
  
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
                                value={state?.lastName}
                                onChange={handleChange}
                                placeholder='Enter last name..'
                                ref={register}
                              />
                            </div>
                          </div>

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
                                // value={state?.phoneNo}
                                // onChange={handleChange}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder='Enter mobile number...'
                                // ref={register}
                                ref={register({
                                  required: 'This is required ',

                                  pattern: {
                                    value:
                                      /^[5-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/,
                                    message: 'Enter Valid Contact Number',
                                  },
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
                                Father's Name
                              </label>
                              <input
                                // type="number"
                                className='form-control'
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id='val-username'
                                name='fatherName'
                                value={state.fatherName}
                                onChange={handleChange}
                                placeholder='Enter father name..'
                                ref={register}
                                defaultValue={viewData?.fatherName}
                              />
                            </div>
                          </div>

                          <div className='col-sm-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Date of Birth
                              </label>
                              <DatePicker
                                placeholderText='Select Date of Birth'
                                // onSelect={this.handleDateSelect.bind(this)}
                                selected={SelectedDate}
                                className='form-control'
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat='dd/MM/yyyy'
                                maxDate={moment().subtract(18, 'years')._d}
                                // minDate={moment().subtract(1, 'years')._d}
                                // isClearable
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
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
                                placeholder='Enter company number..'
                                defaultValue={
                                  prevData.location.state?.detail?.companyName
                                }
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
                          <div className='col-lg-12 d-flex justify-content-end'>
                            <button type='submit' className='btn btn-primary'>
                              save
                            </button>
                            {/* <button type='button' className='btn btn-primary'>
                              Next
                            </button> */}
                          </div>
                          <p className='successMag'>{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 2 && (
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Wheels
                              </label>
                              <select
                                className="form-control"
                                id="exampleFormControlSelect1"
                                ref={register}
                                name="wheels"
                                
                                onChange={handleChange}
                                value={state?.wheels || state?.vehicle?.wheels}
                                defaultValue={viewData?.wheels}
                              >
                                <option value="4">4</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            {" "}
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Brand
                              </label>
                              <select
                                className="form-control"
                                id="exampleFormControlSelect1"
                                ref={register}
                                name="brand"
                                
                                onChange={(e) => {
                                  setState({
                                    ...state,
                                    brand:e.target.value,
                                    type:""
                                  })
                                  // handleChange(e);
                                  if(e.target.value !== ""){
                                    brandHandle(e);

                                  }
                                }}
                                // || state?.vehicle?.brand
                                value={state?.brand }
                              >
                                <option selected="true" value="">
                                  Choose Brand
                                </option>
                                {brand.map((name, index) => (
                                  <option value={name?._id}>
                                    {name?.brandName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Type
                              </label>
                              <select
                                className="form-control"
                                id="exampleFormControlSelect1"
                                ref={register}
                                name="type"
                                
                                onChange={(e) => {
                                  handleChange(e);
                                  handleType(e);
                                }}
                                // || state?.vehicle?.type
                                value={state?.type }
                              >
                                <option selected="true" value="">
                                  Choose Type
                                </option>
                                {Type.map((name, index) => (
                                  <option value={name?._id}>
                                    {name?.type}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Vehicle Name
                              </label>

                              <select
                                className="form-control"
                                id="exampleFormControlSelect1"
                                ref={register}
                                
                                name="vehicleID"
                                onChange={(e) => {
                                  handleChange(e);
                                  handleVehicle(e);
                                }}
                                value={
                                  state?.vehicleID ||
                                  state?.vehicle?.vehicleID
                                }
                              >
                                <option selected="true" disabled="disabled">
                                  Choose Vechicle Name
                                </option>
                                {Vechicle.map((name, index) => (
                                  <option value={name?._id}>
                                    {name?.vehicleName}
                                  </option>
                                ))}
                              </select>
                              <ErrorMessage
                                errors={errors}
                                name="vehicleName"
                                render={({ message }) => (
                                  <p className="error">{message}</p>
                                )}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Variants
                              </label>
                              <select
                                className="form-control"
                                id="exampleFormControlSelect1"
                                ref={register}
                                name="variants"
                                
                                // onChange={handleChange} Varient
                                onChange={(e) => {
                                  handleChange(e);
                                  // handleVarient(e);
                                }}
                                // || state?.vehicle?.variants
                                value={
                                  state?.variants
                                }
                              >
                                <option selected="true" disabled="disabled">
                                  Choose Varients Name
                                </option>
                               
                                {Varient.map((name, index) => (
                                  <option value={name?._id}>
                                    {name?.variantName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                No. of Units
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="noOfUnits"
                                
                                defaultValue={state?.vehicle?.noOfUnits||1} //state?.vehicle?.noOfUnits
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder="Enter no. of units.."
                                onChange={handleChange}
                                ref={register()}
                              />

                              <ErrorMessage
                                errors={errors}
                                name="noOfUnits"
                                render={({ message }) => (
                                  <p className="error">{message}</p>
                                )}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Commercial Use
                              </label>
                              <div className="d-flex px-2">
                                <div className="w-110 d-flex align-items-center mr-3">
                                  Yes{" "}
                                  <input
                                    type="radio"
                                    className="w-auto ml-2 input_cus_radio"
                                    id="val-username"
                                    
                                    name="commercialUse"
                                    onChange={handleChange}
                                    value="yes"
                                    checked={
                                      state?.commercialUse == "yes" ? true : ""
                                    }
                                    ref={register}
                                  />
                                </div>
                                <div className="w-110 d-flex align-items-center">
                                  No{" "}
                                  <input
                                    type="radio"
                                    className="w-auto ml-2 input_cus_radio"
                                    id="val-username"
                                    name="commercialUse"
                                    
                                    value="no"
                                    checked={
                                      state?.commercialUse == "no" ? true : ""
                                    }
                                    onChange={handleChange}
                                    ref={register}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            {" "}
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Any Vehicle to Exchange
                              </label>
                              <div className="d-flex px-2">
                                <div className="w-110 d-flex align-items-center mr-3">
                                  Yes{" "}
                                  <input
                                    type="radio"
                                    className="w-auto ml-2 input_cus_radio"
                                    id="val-username"
                                    value="yes"
                                    
                                    name="vehicleToExchanghe"
                                    onChange={handleChange}
                                    checked={
                                      state?.vehicleToExchanghe == "yes"
                                        ? true
                                        : ""
                                    }
                                    ref={register}
                                  />
                                </div>
                                <div className="w-110 d-flex align-items-center">
                                  No{" "}
                                  <input
                                    type="radio"
                                    className="w-auto ml-2 input_cus_radio"
                                    id="val-username"
                                    value="no"
                                    
                                    name="vehicleToExchanghe"
                                    onChange={e=>{handleChange(e);
                                    handleExchange(e)
                                    }}
                                    checked={
                                      state?.vehicleToExchanghe == "no"
                                        ? true
                                        : ""
                                    }
                                    ref={register}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12 d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn btn-primary mr-2"
                              onClick={(e) => {
                                handleSeconsRequest(e);
                              }}
                            >
                              Previous
                            </button>

                            <button type="submit" className="btn btn-primary">
                              Next
                            </button>
                          </div>
                          <p className="successMag">{successMsg}</p>
                        </div>
                      )}
                    
                      {formToggle == 3 && (
                        <div className='row'>
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
                                District
                              </label>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='district'
                                value={state.district}
                                ref={register}>
                                <option>{state.district}</option>
                              </select>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Post Office
                              </label>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='postOffice'
                                ref={register}>
                                <option selected='true' disabled='disabled'>
                                  Choose Post Office
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
                                Block
                              </label>

                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='block'
                                ref={register}>
                                <option selected='true' disabled='disabled'>
                                  Choose Block
                                </option>
                                {blockData.length != 0 &&
                                  blockData.map((options, index) => (
                                    <option>{options.block}</option>
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
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Landmark
                              </label>

                              <input
                                type='text'
                                className='form-control'
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
                              className='btn btn-primary mr-2'
                              onClick={(e) => {
                               vehicle? handleSeconsRequest(e): handleThirdRequest(e);
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
                      {formToggle == 4 && (
                        <div className='row'>
                          <Col sm={6}>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Buying Schemes
                              </label>

                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                ref={register}
                                onChange={handleChange}
                                value={state?.financeSchemes}
                                name='financeSchemes'>
                                <option selected='true' disabled='disabled'>
                                  Choose finance Schemes
                                </option>
                                <option>Cash</option>
                                <option>Bank Finance</option>
                                <option>Normal Finance</option>
                                <option>Low Interest Finance</option>
                              </select>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Buying Timeline
                              </label>
                              <select
                                className='form-control'
                                id='exampleFormControlSelect1'
                                name='buyingTimeline'
                                onChange={handleChange}
                                value={state?.buyingTimeline}
                                ref={register}>
                                <option selected='true' disabled='disabled'>
                                  Choose Buying Timeline
                                </option>
                                <option>5 Days</option>
                                <option>10 Days</option>
                                <option>15 Days</option>

                                <option>1 Month</option>
                                <option>2 months</option>
                                <option>3 months</option>
                              </select>
                            </div>
                          </Col>

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
                          <Col sm={6}>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Manufacturer
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='exchangeCompany'
                                value={state?.exchangeCompany}
                                onChange={handleChange}
                                placeholder='Enter company..'
                                ref={register}
                              />
                            </div>
                          </Col>
                          <div className='col-sm-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                               Year of registration
                              </label>
                              <DatePicker
                                placeholderText='Select Year of registration'
                                // onSelect={this.handleDateSelect.bind(this)}
                                selected={Selectedyear}
                                className='form-control'
                                onChange={(date) => setSelectedyear(date)}
                                showYearPicker
                                dateFormat="yyyy"
                                
                              />
                            </div>
                          </div>

                          <Col sm={6}>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Model
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='model'
                                value={state?.model || state?.vehicle?.model}
                                onChange={handleChange}
                                placeholder='Enter Model..'
                                ref={register}
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Registration No.
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                // onKeyPress={(e) => restrictAlpha(e)}
                                name='registrationNumber'
                                value={
                                  state?.registrationNumber ||
                                  state?.vehicle?.registrationNumber
                                }
                                onChange={handleChange}
                                placeholder='Enter registration No...'
                                ref={register}
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Vehicle Image
                              </label>

                              <div className='custom-file'>
                                <input
                                  type='file'
                                  className='custom-file-input form-control'
                                  ref={register}
                                  name='photoUpload' //
                                  onChange={fileChange}
                                />
                                <label className='custom-file-label'>
                                  {state?.photoUpload?.name
                                    ? state?.photoUpload?.name
                                    : state?.vehicle?.photoUpload
                                    ? state?.vehicle?.photoUpload
                                    : 'Choose File'}
                                </label>
                              </div>
                            </div>
                          </Col>

                          <Col sm={6}>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                RC
                              </label>

                              <div className='custom-file'>
                                <input
                                  type='file'
                                  className='custom-file-input form-control'
                                  ref={register}
                                  name='exchangeVehicleRC' //
                                  onChange={fileChange}
                                />
                                <label className='custom-file-label'>
                                  {state?.exchangeVehicleRC?.name
                                    ? state?.exchangeVehicleRC?.name
                                    : state?.vehicle?.exchangeVehicleRC
                                    ? state?.vehicle?.exchangeVehicleRC
                                    : 'Choose File'}
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                DL
                              </label>

                              <div className='custom-file'>
                                <input
                                  type='file'
                                  className='custom-file-input form-control'
                                  ref={register}
                                  name='exchangeVehicleDL' //
                                  onChange={fileChange}
                                />
                                <label className='custom-file-label'>
                                  {state?.exchangeVehicleDL?.name
                                    ? state?.exchangeVehicleDL?.name
                                    : state?.vehicle?.exchangeVehicleDL
                                    ? state?.vehicle?.exchangeVehicleDL
                                    : 'Choose File'}
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Permit
                              </label>

                              <div className='custom-file'>
                                <input
                                  type='file'
                                  className='custom-file-input form-control'
                                  ref={register}
                                  name='exchangeVehiclePermit' //
                                  onChange={fileChange}
                                />
                                <label className='custom-file-label'>
                                  {state?.exchangeVehiclePermit?.name
                                    ? state?.exchangeVehiclePermit?.name
                                    : state?.vehicle?.exchangeVehiclePermit
                                    ? state?.vehicle?.exchangeVehiclePermit
                                    : 'Choose File'}
                                </label>
                              </div>
                            </div>
                          </Col>

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
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Aadhaar Number
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='aadharNo'
                                value={state.aadharNo || state?.docs?.aadharNo}
                                onChange={handleChange}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder='Enter aadhar No..'
                                ref={register}
                                maxLength='12'
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Upload Aadhaar Card
                              </label>
                              <div className='custom-file'>
                                <input
                                  type='file'
                                  name='aadharDoc'
                                  className='custom-file-input form-control'
                                  ref={register}
                                  onChange={fileChange}
                                />
                                <label className='custom-file-label'>
                                  {/* {state?.aadharDoc?.name || "Choose File"} */}
                                  {state?.aadharDoc?.name
                                    ? state?.aadharDoc?.name
                                    : state?.docs?.aadharDoc
                                    ? state?.docs?.aadharDoc
                                    : 'Choose File'}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                PAN
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='pan'
                                maxLength='10'
                                onChange={handleChange}
                                placeholder='Enter pan name..'
                                ref={register}
                                value={state.pan || state?.docs?.pan}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                PAN (Upload)
                              </label>
                              <div className='custom-file'>
                                <input
                                  type='file'
                                  name='panDoc'
                                  className='custom-file-input form-control'
                                  ref={register}
                                  onChange={fileChange}
                                />
                                <label className='custom-file-label'>
                                  {/* {state?.panDoc?.name || "Choose File"} */}
                                  {state?.panDoc?.name
                                    ? state?.panDoc?.name
                                    : state?.docs?.panDoc
                                    ? state?.docs?.panDoc
                                    : 'Choose File'}
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className='col-lg-12 d-flex justify-content-end'>
                            <button
                              type='button'
                              className='btn btn-primary mr-2'
                              onClick={(e) => {
                                exchange==true?handleFivethRequest(e):
                                 handlesixthRequest(e); 
                              }}>
                              Previous
                            </button>

                            <button type='submit' className='btn btn-primary'>
                              Next
                            </button>
                          </div>
                          <p className='successMag'>{successMs}</p>
                        </div>
                      )}
                      {formToggle == 7 && (
                        <div className='row'>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Bank Name
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='bankName'
                                onChange={handleChange}
                                placeholder='Enter  bank Name..'
                                ref={register}
                                value={state.bankName || state?.docs?.bankName}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Bank Passbook (Upload)
                              </label>

                              <div className='custom-file'>
                                <input
                                  type='file'
                                  className='custom-file-input form-control'
                                  name='bankDoc'
                                  ref={register}
                                  onChange={fileChange}
                                />
                                <label className='custom-file-label'>
                                  {/* {state.bankDoc?.name
                                    ? state.bankDoc?.name
                                    : "Choose File"} */}
                                  {state?.bankDoc?.name
                                    ? state?.bankDoc?.name
                                    : state?.docs?.bankDoc
                                    ? state?.docs?.bankDoc
                                    : 'Choose File'}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Account No.
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='acNo'
                                onChange={handleChange}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder='Enter  A/C No...'
                                ref={register}
                                value={state.acNo || state?.docs?.acNo}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                Account Holder
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='accountHolder'
                                onChange={handleChange}
                                placeholder='Enter account holder name...'
                                ref={register}
                                value={
                                  state.accountHolder ||
                                  state?.docs?.accountHolder
                                }
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group '>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
                                IFSC code
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='val-username'
                                name='ifscCode'
                                onChange={handleChange}
                                placeholder='Enter IFSC code...'
                                ref={register}
                                value={state.ifscCode || state?.docs?.ifscCode}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='form-group custom-check-design'>
                              <label
                                className='col-form-label'
                                htmlFor='val-username'>
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
                                    value='yes'
                                    onChange={handleChange}
                                    checked={
                                      state?.chequeBook == 'yes' ? true : ''
                                    }
                                  />
                                  <label
                                    className='check-label'
                                    htmlFor='chequeBookY'>
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
                                    onChange={handleChange}
                                    value='no'
                                    checked={
                                      state?.chequeBook == 'no' ? true : ''
                                    }
                                  />
                                  <label
                                    className='check-label'
                                    htmlFor='chequeBookN'>
                                    No{' '}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-lg-12 d-flex justify-content-end'>
                            <button
                              type='button'
                              className='btn btn-primary mr-2'
                              onClick={(e) => {
                                handlesevenRequest(e);
                              }}>
                              Previous
                            </button>

                            <button type='submit' className='btn btn-primary'>
                              update
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
