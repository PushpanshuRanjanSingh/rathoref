import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import base from "../../globals/base";
import Header from "../header/header";
import Footer from "../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import apiUrl from "../../globals/config";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import moment from 'moment';
function Index(props) {
  const [post, setpost] = useState([]);
  const [viewData, setViewData] = useState();
  const { register, errors, handleSubmit } = useForm();
  const [successMsg, setsuccessMsg] = useState("");
  const [inputfilead, setinputfilead] = useState("Choose File");
  const [heading, setheading] = useState("Personal Details");
  const [inputfilepan, setinputfilepan] = useState("Choose File");
  const [inputfile, setinputfile] = useState("Choose File");
  const [inputfilepic, setinputfilepic] = useState("");
  const [districtData, setdistrictData] = useState([]);
  const [blockData, setblockData] = useState([]);
  const [SelectedDate, setSelectedDate] = useState(null);
  const [formToggle, setformToggle] = useState(1);
  const [prevData, setprevData] = useState(props);
  const [data, setdata] = useState({});
  const [pramsdata, setpramsdata] = useState(props.location.data);
  const [errorMsg, seterrorMsg] = useState("");
  const [successMs, setsuccessMs] = useState("");
  const [radio, setradio] = useState();
  const [exchange, setexchange] = useState(false)
  const [saveupdate, setsaveupdate] = useState({});
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    dateOfBirth: "",
    commercialUse: "",
    email: "",
    phoneNo: "",
    pincode: "",
    district: "",
    postOffice: "",
    block: "",
    cityVillage: "",
    address: "",
    landmark: "",
    aadharNo: "",
    aadharDoc: "",
    pan: "",
    panDoc: "",
    bankDetails: "",
    bankDoc: "",
  });
  // if (!pramsdata) {
  //   props.history.push({
  //     pathname: "/uploadDocument",
  //   });
  // }

  useEffect(() => {
    getLeads();
  }, []);
  const getLeads = () => {
    // const pramsdata = {
    //   phoneNo: 7898484609,
    //   otp: 3424,
    // };
    axios
      .post(apiUrl + "user/verifyNo", pramsdata)
      .then((response) => {
        if(data?.vehicleToExchanghe == "no"){
          setexchange(true)
         }
        setState(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onSubmit = (formsubmitdata) => {
    try {
      formsubmitdata.dateOfBirth = SelectedDate
      ? moment(SelectedDate).format("l")
      : "";
      if (formToggle == 1) {
       
        setformToggle(2);
        setheading("Vehicle Information");
      } else if (formToggle == 2) {
        setformToggle(3);
        setheading("Address");
      } else if (formToggle == 3) {
        setformToggle(4);
        setheading("Buying Details");
      } else if (formToggle == 4) {
        if(exchange==false){
          setformToggle(5);
          setheading('Exchange Vehicle');
        }else{
          setformToggle(6);
        setheading('Document');
        }
      } else if (formToggle == 5) {
        setformToggle(6);
        setheading("Document");
      } else if (formToggle == 6) {

        formsubmitdata.phoneNo = state?.phoneNo;
        formsubmitdata.aadharDoc = formsubmitdata?.aadharDoc[0];
        // formsubmitdata.bankDoc = formsubmitdata?.bankDoc[0];
        formsubmitdata.panDoc = formsubmitdata?.panDoc[0];
        setsaveupdate(formsubmitdata);
        setformToggle(7);
        setheading("Bank Details");
      } else {
        saveupdate.bankDoc = state.bankDoc;
        const formData = new FormData();
        Object.keys(saveupdate).forEach((key) => {
          if (saveupdate[key]) {
            formData.append([key], saveupdate[key]);
          }
        });

        axios
          .post(apiUrl + "user/updateDoc", formData)
          .then((resp) => {
            setsuccessMs("Document updated successfully!");
            // if (resp) {
            //   props.history.push("/viewProfile");
            // }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {}
  };
  const restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  const handleExchange=(e)=>{
    if(e?.target?.value=="no"){
      setexchange(true)
    }
  }
  const fileChange = (e) => {

    setState({
      ...state,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleSeconsRequest = (e) => {
    e.preventDefault();
    setformToggle(1);
    setheading("Personal Details");
  };
  const handleThirdRequest = (e) => {
    e.preventDefault();
    setformToggle(2);
    setheading("Vehicle Information");
  };
  const handleFourthRequest = (e) => {
    e.preventDefault();
    setformToggle(3);
    setheading("Address");
  };
  const handleFivethRequest = (e) => {
    e.preventDefault();
    setformToggle(4);
    setheading("buying detail");
  };
  const handlesixthRequest = (e) => {
    e.preventDefault();
    setformToggle(5);
    setheading("Exchange Vehicle");
  };
  const handlesevenRequest = (e) => {
    e.preventDefault();
    setformToggle(6);
    setheading("Document");
  };
  return (
    <>
      <div className="content-body">
        <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="container-fluid">
            <div className="row justify-content-center h-100 align-items-center emi_row">
              <div className="col-md-12">
                <div className="card widget-stat">
                  <div className="card-header bg-custom-blue ">
                    <h4 className="card-title text-white">{heading}</h4>
                  </div>
                  <div className="card-body">
                    <div className="form-validation">
                      {formToggle == 1 && (
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                First Name<span className="text-danger">*</span>
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="firstName"
                                disabled
                                value={state?.firstName}
                                // defaultValue={"ffffff"}
                                defaultValue={viewData?.name}
                                placeholder="Enter name.."
                                onChange={handleChange}
                                ref={register({
                                  //  required: "This is required ",
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
                                name="name"
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
                                for="val-username"
                              >
                                Last Name
                              </label>
                              <input
                                // type="number"
                                className="form-control"
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id="val-username"
                                name="lastName"
                                disabled
                                value={state?.lastName}
                                onChange={handleChange}
                                placeholder="Enter last name.."
                                ref={register}
                                defaultValue={viewData?.lastname}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Father's Name
                              </label>
                              <input
                                // type="number"
                                className="form-control"
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id="val-username"
                                name="fathername"
                                disabled
                                value={state?.fatherName}
                                onChange={handleChange}
                                placeholder="Enter father name.."
                                ref={register}
                                defaultValue={viewData?.fathername}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="val-username"
                                name="email"
                                disabled
                                value={state?.email}
                                onChange={handleChange}
                                placeholder="Enter email.."
                                ref={register({
                                  pattern: {
                                    value: /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/,
                                    message: "Enter Valid Email id",
                                  },
                                })}
                                defaultValue={viewData?.email}
                              />
                              <ErrorMessage
                                errors={errors}
                                name="email"
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
                                for="val-username"
                              >
                                Mobile Number
                              </label>
                              <input
                                //  type="number"
                                className="form-control"
                                id="val-username"
                                name="phoneNo"
                                disabled
                                maxLength="10"
                                value={state?.phoneNo}
                                onChange={handleChange}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder="Enter mobile number..."
                                ref={register}
                                defaultValue={viewData?.phone}
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

                          <div className="col-lg-12 d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">
                              Next
                            </button>
                          </div>
                          <p className="successMag">{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 2 && (
                        <div className="row">
                          <div className="col-lg-6">
                            <div class="form-group ">
                              <label class="col-form-label" for="val-username">
                                Wheels
                              </label>
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                ref={register}
                                name="wheels"
                                disabled
                                value={state?.vehicle?.wheels}
                              >
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="6">+6</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            {" "}
                            <div class="form-group ">
                              <label class="col-form-label" for="val-username">
                                Brand
                              </label>
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                ref={register}
                                name="brand"
                                disabled
                                value={state?.vehicle?.brand}
                              >
                                <option>{state?.vehicle?.brand}</option>
                                <option>Hero</option>
                                <option>Tvs</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div class="form-group ">
                              <label class="col-form-label" for="val-username">
                                Type
                              </label>
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                ref={register}
                                name="type"
                                disabled
                                value={state?.vehicle?.type}
                              >
                                <option>{state?.vehicle?.type}</option>
                                <option>Loading</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div class="form-group ">
                              <label class="col-form-label" for="val-username">
                                Vehicle Name
                              </label>

                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                ref={register}
                                name="vehicleName"
                                disabled
                                value={state?.vehicle?.vehicleName}
                              >
                                <option>{state?.vehicle?.vehicleName}</option>
                                <option>vehicleName 2</option>
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
                            <div class="form-group ">
                              <label class="col-form-label" for="val-username">
                                Variants
                              </label>
                              {/* <input
                              type="text"
                              class="form-control"
                              id="val-username"
                              name="variants"
                              placeholder="Enter variants.."
                              ref={register}
                            /> */}
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                ref={register}
                                name="variants"
                                disabled
                                value={state?.vehicle?.variants}
                              >
                                <option>{state?.vehicle?.variants}</option>
                                <option>variants 2</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div class="form-group ">
                              <label class="col-form-label" for="val-username">
                                No. of Units
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="val-username"
                                name="noOfUnits"
                                disabled
                                value={state?.vehicle?.noOfUnits}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder="Enter no. of units.."
                                ref={register}
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
                            <div class="form-group ">
                              <label class="col-form-label" for="val-username">
                                Commercial Use
                              </label>
                              <div class="d-flex px-2">
                                <div class="w-110 d-flex align-items-center mr-3">
                                  Yes{" "}
                                  <input
                                    type="radio"
                                    className="w-auto ml-2 input_cus_radio"
                                    id="val-username"
                                    name="commercialUse"
                                    disabled
                                    checked={
                                      state?.vehicle?.commercialUse == "yes" ? true : ""
                                    }
                                   
                                    ref={register}
                                  />
                                </div>
                                <div class="w-110 d-flex align-items-center">
                                  No{" "}
                                  <input
                                    type="radio"
                                    disabled
                                    className="w-auto ml-2 input_cus_radio"
                                    id="val-username"
                                    name="commercialUse"
                                    checked={
                                      state?.vehicle?.commercialUse == "no" ? true : ""
                                    }
                                   
                                    value="no"
                                    ref={register}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            {" "}
                            <div class="form-group ">
                              <label class="col-form-label" for="val-username">
                                Any Vehicle to Exchange
                              </label>
                              <div class="d-flex px-2">
                                <div class="w-110 d-flex align-items-center mr-3">
                                  Yes{" "}
                                  <input
                                    type="radio"
                                    className="w-auto ml-2 input_cus_radio"
                                    id="val-username"
                                    value="yes"
                                    disabled
                                    name="vehicleToExchanghe"
                                    // defaultValue={prevData.location.state?.detail?.vehicleToExchanghe}
                                    ref={register}
                                  />
                                </div>
                                <div class="w-110 d-flex align-items-center">
                                  No{" "}
                                  <input
                                    type="radio"
                                    // onClick={() => setshowVehicles(false)}
                                    className="w-auto ml-2 input_cus_radio"
                                    id="val-username"
                                    value="no"
                                    disabled
                                    name="vehicleToExchanghe"
                                    // defaultValue={prevData.location.state?.detail?.vehicleToExchanghe}
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
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Pin Code
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="val-username"
                                onKeyPress={(e) => restrictAlpha(e)}
                                name="pincode"
                                maxLength={6}
                                disabled
                                defaultValue={state.pincode}
                                placeholder="Enter a pin code.."
                                ref={register({
                                  pattern: {
                                    value: /^[0-9][0-9][0-9][0-9][0-9][0-9]$/,
                                    message: "Enter Valid  Pin Code",
                                  },
                                })}
                              />
                              {/* <input
                                type="text"
                                class="form-control"
                                id="val-username"
                                value={state.pincode}
                                onChange={handleChange}
                                onKeyPress={(e) => restrictAlpha(e)}
                                name="pincode"
                                placeholder="Enter pin code.."
                                ref={register({
                                  pattern: {
                                    value: /^[0-9][0-9][0-9][0-9][0-9][0-9]$/,
                                    message: "Enter Valid  Pin Code",
                                  },
                                })}
                              /> */}
                              <ErrorMessage
                                errors={errors}
                                name="pincode"
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
                                for="val-username"
                              >
                                District
                              </label>
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                name="district"
                                disabled
                                value={state.district}
                                ref={register}
                                // onChange={handleChangedist}
                              >
                                <option>{state.district}</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Post Office
                              </label>
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                name="postOffice"
                                ref={register}
                                disabled
                                value={state.postOffice}
                              >
                                <option>{state.postOffice}</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Block
                              </label>

                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                name="block"
                                ref={register}
                                defaultValue={state.block}
                                // onChange={handleChange}
                                disabled
                                value={state.block}
                              >
                                <option>{state.block}</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                City/Village
                              </label>

                              <input
                                type="text"
                                class="form-control"
                                id="val-username"
                                name="cityVillage"
                                disabled
                                value={state.cityVillage}
                                onChange={handleChange}
                                placeholder="Enter city-village name.."
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Address
                              </label>

                              <input
                                type="text"
                                class="form-control"
                                id="val-username"
                                name="address"
                                disabled
                                value={state.address}
                                onChange={handleChange}
                                placeholder="Enter address name.."
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Landmark
                              </label>

                              <input
                                type="text"
                                class="form-control"
                                id="val-username"
                                disabled
                                value={state.landmark}
                                onChange={handleChange}
                                name="landmark"
                                placeholder="Enter landmark name.."
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn btn-primary mr-2"
                              onClick={(e) => {
                                handleThirdRequest(e);
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
                      {formToggle == 4 && (
                        <div className="row">
                          <Col sm={6}>
                            <div class="form-group ">
                              <label class="col-form-label" for="val-username">
                                Finance Schemes
                              </label>

                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                ref={register}
                                disabled
                                value={state?.vehicle?.financeSchemes}
                                name="financeSchemes"
                              >
                                 <option value="Cash">Cash</option>
                                <option value="Bank Finance">Bank Finance</option>
                                <option value="Normal Finance">Normal Finance</option>
                                <option value=" Low Interest Finance"> Low Interest Finance</option>
                              </select>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class="form-group ">
                              <label class="col-form-label" for="val-username">
                                Buying Timeline
                              </label>
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                name="buyingTimeline"
                                disabled
                                value={state?.vehicle?.buyingTimeline}
                                ref={register}
                              >
                                 <option value='5 Days'>5 Days</option>
                                <option value='10 Days'>10 Days</option>
                                <option value='15 Days'>15 Days</option>

                                <option value='1 Month'>1 Month</option>
                                <option value='2 Month'>2 months</option>
                                <option value='3 Month'>3 months</option>
                              </select>
                            </div>
                          </Col>

                          <div className="col-lg-12 d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn btn-primary mr-2"
                              onClick={(e) => {
                                handleFourthRequest(e);
                              }}
                            >
                              Previous
                            </button>

                            <button type="submit" className="btn btn-primary">
                              next
                            </button>
                          </div>
                          <p className="successMag">{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 5 && (
                        <div className="row">
                          <Col sm={6}>
                            <div class="form-group ">
                              <label class="col-form-label" for="val-username">
                                Company
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="val-username"
                                name="exchangeCompany"
                                disabled
                                value={state?.vehicle?.exchangeCompany}
                                placeholder="Enter company.."
                                ref={register}
                              />
                            </div>
                          </Col>
                          
                          <Col sm={6}>
                            <div class="form-group ">
                              <label class="col-form-label" for="val-username">
                                Model
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="val-username"
                                name="model"
                                disabled
                                value={state?.vehicle?.model}
                                placeholder="Enter Model.."
                                ref={register}
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class="form-group ">
                              <label class="col-form-label" for="val-username">
                                Registration No.
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="val-username"
                                onKeyPress={(e) => restrictAlpha(e)}
                                name="registrationNumber"
                                disabled
                                value={state?.vehicle?.registrationNumber}
                                placeholder="Enter registration No..."
                                ref={register}
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div class="form-group ">
                              <label class="col-form-label" for="val-username">
                                Photo (Upload)
                              </label>

                              <div class="custom-file">
                                <input
                                  type="text"
                                  class="custom-file-input form-control"
                                  ref={register}
                                  name="photoUpload" //
                                  value={
                                    state?.vehicle?.photoUpload
                                      ? state?.vehicle?.photoUpload
                                          .split("/")[1]
                                          .split("-")[1]
                                      : "img"
                                  }
                                  // value="img"
                                />
                                <label class="custom-file-label">
                                  {state?.vehicle?.photoUpload
                                    ? state?.vehicle?.photoUpload
                                        .split("/")[1]
                                        .split("-")[1]
                                    : "Choose file"}
                                </label>
                              </div>
                            </div>
                          </Col>

                          <div className="col-lg-12 d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn btn-primary mr-2"
                              onClick={(e) => {
                                handleFivethRequest(e);
                              }}
                            >
                              Previous
                            </button>

                            <button type="submit" className="btn btn-primary">
                              next
                            </button>
                          </div>
                          <p className="successMag">{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 6 && (
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Aadhaar Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="aadharNo"
                                disabled
                                defaultValue={state?.docs?.aadharNo}
                                // value={state.aadharNo}
                                onChange={handleChange}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder="Enter aadhar No.."
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Upload Aadhaar Card
                              </label>
                              <div class="custom-file">
                                <input
                                  type="file"
                                  name="aadharDoc"
                                  class="custom-file-input form-control"
                                  ref={register}
                                  // value= {(state?.docs?.aadharDoc)?state?.docs?.aadharDoc.split('/')[1].split("-")[1]:"Choose file"}
                                  // onChange={fileChange}
                                  onChange={(e) =>
                                    setinputfilead(e.target.files[0].name)
                                  }
                                />
                                <label class="custom-file-label">
                                  {inputfilead}
                                  {/* {(state?.docs?.aadharDoc)?state?.docs?.aadharDoc.split('/')[1].split("-")[1]:"Choose file"} */}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                PAN
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="pan"
                                disabled
                                onChange={handleChange}
                                placeholder="Enter pan name.."
                                ref={register}
                                defaultValue={state?.docs?.pan}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                PAN (Upload)
                              </label>
                              <div class="custom-file">
                                <input
                                  type="file"
                                  name="panDoc"
                                  class="custom-file-input form-control"
                                  ref={register}
                                  onChange={(e) =>
                                    setinputfilepan(e.target.files[0].name)
                                  }
                                  // onChange={fileChange}
                                />
                                <label class="custom-file-label">
                                  {inputfilepan}
                                  {/* {(state?.docs?.panDoc)?state?.docs?.panDoc.split('/')[1].split("-")[1]:"Choose file"} */}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12 d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn btn-primary mr-2"
                              onClick={(e) => {
                                exchange==true?handleFivethRequest(e):
                                 handlesixthRequest(e); 
                              }}
                            >
                              Previous
                            </button>

                            <button type="submit" className="btn btn-primary">
                              Next
                            </button>
                          </div>
                          {/* <p className="successMag">{successMs}</p> */}
                        </div>
                      )}
                      {formToggle == 7 && (
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Bank Name
                              </label>
                              <input
                                type="text"
                                disabled
                                className="form-control"
                                id="val-username"
                                name="bankName"
                                defaultValue={state?.docs?.bankName}
                                // value={state.aadharNo}
                                onChange={handleChange}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder="Enter aadhar No.."
                                ref={register}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Bank Passbook (Upload)
                              </label>
                              <div class="custom-file">
                                <input
                                  type="file"
                                  name="bankDoc"
                                  class="custom-file-input form-control"
                                  ref={register}
                                  // value= {(state?.docs?.aadharDoc)?state?.docs?.aadharDoc.split('/')[1].split("-")[1]:"Choose file"}
                                  onChange={fileChange}
                                  // onChange={(e) =>
                                  //   setinputfilead(e.target.files[0].name)
                                  // }
                                />
                                <label class="custom-file-label">
                                  {state.bankDoc?.name
                                    ? state.bankDoc?.name
                                    : "Choose File"}
                                  {/* {inputfile} */}
                                  {/* {(state?.docs?.aadharDoc)?state?.docs?.aadharDoc.split('/')[1].split("-")[1]:"Choose file"} */}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                A/C No.
                              </label>
                              <input
                                type="text"
                                disabled
                                className="form-control"
                                id="val-username"
                                name="acNo"
                                onChange={handleChange}
                                placeholder="Enter pan name.."
                                ref={register}
                                defaultValue={state?.docs?.acNo}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Account Holder
                              </label>
                              <input
                                type="text"
                                disabled
                                className="form-control"
                                id="val-username"
                                name="accountHolder"
                                onChange={handleChange}
                                placeholder="Enter pan name.."
                                ref={register}
                                defaultValue={state?.docs?.accountHolder}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                IFSC code
                              </label>
                              <input
                                type="text"
                                disabled
                                className="form-control"
                                id="val-username"
                                name="ifscCode"
                                onChange={handleChange}
                                placeholder="Enter pan name.."
                                ref={register}
                                defaultValue={state?.docs?.ifscCode}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group custom-check-design">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Do you have cheque book?
                              </label>
                              <div className="d-flex px-2 py-2">
                                <div className="w-110 d-flex align-items-center mr-3">
                                  <input
                                    type="radio"
                                    disabled
                                    className="w-auto ml-2 input_cus_radio"
                                    id="chequeBookY"
                                    name="chequeBook"
                                    ref={register}
                                    value={true}
                                    checked={
                                      state?.docs?.chequeBook == "yes" ? true : ""
                                    }
                                  />
                                  <label
                                    className="check-label"
                                    for="chequeBookY"
                                  >
                                    Yes{" "}
                                  </label>
                                </div>
                                <div className="w-110 d-flex align-items-center">
                                  <input
                                    type="radio"
                                    disabled
                                    className="w-auto ml-2 input_cus_radio"
                                    id="chequeBookN"
                                    name="chequeBook"
                                    ref={register}
                                    value={false}
                                    checked={
                                      state?.docs?.chequeBook == "no" ? true : ""
                                    }
                                  />
                                  <label
                                    className="check-label"
                                    for="chequeBookNgit"
                                  >
                                    No{" "}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12 d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn btn-primary mr-2"
                              onClick={(e) => {
                                handlesevenRequest(e);
                              }}
                            >
                              Previous
                            </button>

                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </div>
                          <p className="successMag">{successMs}</p>
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
