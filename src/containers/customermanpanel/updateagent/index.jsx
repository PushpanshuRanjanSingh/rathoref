import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import base from "../../../globals/base";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import apiUrl from "../../../globals/config";
import axios from "axios";
import moment from "moment";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import showNotification from "../../../services/notificationService";
function Index(props) {
  const [successMs, setsuccessMs] = useState("");
  const [successMsg, setsuccessMsg] = useState("");
  const [post, setpost] = useState([]);
  const [viewData, setViewData] = useState();
  const { register, errors, handleSubmit } = useForm();
  const [inputfilead, setinputfilead] = useState("");
  const [heading, setheading] = useState("Personal Details");
  const [inputfilepan, setinputfilepan] = useState("");
  const [inputfile, setinputfile] = useState("");
  const [inputfilepic, setinputfilepic] = useState("");
  const [districtData, setdistrictData] = useState([]);
  const [blockData, setblockData] = useState([]);
  const [id, setid] = useState("");
  const [formToggle, setformToggle] = useState(1);
  const [prevData, setprevData] = useState(props);
  const [data, setdata] = useState({});
  const [Selectedyear, setSelectedyear] = useState(null);
  const [errorMsg, seterrorMsg] = useState("");
  const [SelectedDate, setSelectedDate] = useState(null);
  const [state, setState] = React.useState();
  const onSubmit = (formsubmitdata) => {
    formsubmitdata.dateOfBirth = SelectedDate
      ? moment(SelectedDate).format("l")
      : "";
    formsubmitdata.yearOfRegistration = Selectedyear
      ? moment(Selectedyear).format("l")
      : "";
    if (formToggle == 1) {
      if (state.phoneNo && state.firstName) {
        let token = localStorage.getItem("myData");
        let headers = {
          headers: {
            "x-token": `Bearer ${token}`,
          },
        };
        axios
          .post(
            apiUrl + "user/getPhone",
            {
              phoneNo: state.phoneNo,
            },
            headers
          )
          .then(function (response) {
            seterrorMsg(response.data.message);
          })
          .catch(function (error) {
            if (formToggle == 1) {
              setformToggle(3);
              setheading("Address");
            }
          });
      }
    } else if (formToggle == 7) {
      var formsubmitdata = state;

      const formData = new FormData();
      Object.keys(formsubmitdata).forEach((key) => {
        if (formsubmitdata[key]) {
          formData.append([key], formsubmitdata[key]);
        }
      });
      let token = localStorage.getItem("myData");
      let headers = {
        headers: {
          "x-token": `Bearer ${token}`,
        },
      };
      axios
        .post(apiUrl + "user/saveAgentProfile", formData, headers)
        .then((resp) => {
          props.history.goBack();
        })
        .catch((err) => {
          showNotification("danger", err.message);
        });
    }
    try {
      if (formToggle == 3) {
        setformToggle(6);
        setheading("Document");
      } else if (formToggle == 4) {
        setformToggle(7);
        setheading("Bank Details");
      } else if (formToggle == 5) {
        setformToggle(6);
        setheading("Document");
      } else if (formToggle == 6) {
        setformToggle(7);
        setheading("Bank Details");
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
        let token = localStorage.getItem("myData");
        let headers = {
          headers: {
            "x-token": `Bearer ${token}`,
          },
        };
        axios
          .post(apiUrl + "user/updateLead", formData, headers)
          .then((resp) => {
            setsuccessMs("Document updated successfully!");

            if (resp) {
              props.history.push("/leads");
            }
          })
          .catch((err) => {
            showNotification("danger", err.message);
          });
      }
    } catch (error) {
      showNotification("danger", error.message);
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
    setheading("Personal Details");
  };
  const handleThirdRequest = (e) => {
    e.preventDefault();
    setformToggle(1);
    setheading("Personal Details");
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
    setformToggle(3);
    setheading("Address");
  };
  const handlesevenRequest = (e) => {
    e.preventDefault();
    setformToggle(6);
    setheading("Document");
  };
  const gitBlock = (value) => {
    axios.get(apiUrl + "user/getDistrict?district=" + value).then((res) => {
      setblockData(res.data.message);
    });
  };
  const checkpincode = (e) => {
    var pincode = e.target.value;
    let checkReg = /(^[0-9][0-9][0-9][0-9][0-9][0-9]$)/g;
    if (checkReg.test(pincode)) {
      axios
        .get("https://api.postalpincode.in/pincode/" + pincode)
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
      <div className="content-body">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
                          <div className="col-sm-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                First Name<span className="text-danger">*</span>
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="firstName"
                                value={state?.firstName}
                                onChange={handleChange}
                                placeholder="Enter first name.."
                                ref={register({
                                  required: "This is required ",
                                })}
                              />
                              <ErrorMessage
                                errors={errors}
                                name="firstName"
                                render={({ message }) => (
                                  <p className="error">{message}</p>
                                )}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Last Name
                              </label>
                              <input
                                // type="number"
                                className="form-control"
                                id="val-username"
                                name="lastName"
                                value={state?.lastName}
                                onChange={handleChange}
                                placeholder="Enter last name.."
                                ref={register}
                              />
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="val-username"
                                name="email"
                                value={state?.email}
                                onChange={handleChange}
                                placeholder="Enter email.."
                                ref={register({
                                  // required: "This is required ",
                                  pattern: {
                                    value:
                                      /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/,
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
                          <div className="col-sm-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Mobile Number{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                //  type="number"
                                className="form-control"
                                id="val-username"
                                name="phoneNo"
                                onChange={() => seterrorMsg("")}
                                maxLength="10"
                                // value={state?.phoneNo}
                                onChange={handleChange}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder="Enter mobile number..."
                                // ref={register}
                                ref={register({
                                  required: "This is required ",

                                  pattern: {
                                    value:
                                      /^[5-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/,
                                    message: "Enter Valid Contact Number",
                                  },
                                })}
                              />
                              <ErrorMessage
                                errors={errors}
                                name="phoneNo"
                                render={({ message }) => (
                                  <p className="error">{message}</p>
                                )}
                              />
                              <p className="error">{errorMsg}</p>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Father's Name
                              </label>
                              <input
                                // type="number"
                                className="form-control"
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id="val-username"
                                name="fatherName"
                                value={state?.fatherName}
                                onChange={handleChange}
                                placeholder="Enter father name.."
                                ref={register}
                                defaultValue={viewData?.fatherName}
                              />
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Date of Birth
                              </label>
                              <DatePicker
                                placeholderText="Select Date of Birth"
                                // onSelect={this.handleDateSelect.bind(this)}
                                selected={SelectedDate}
                                className="form-control"
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                maxDate={moment().subtract(18, "years")._d}
                                // minDate={moment().subtract(1, 'years')._d}
                                // isClearable
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                              />
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Upload Profile Picture
                              </label>
                              <div class="custom-file">
                                <input
                                  type="file"
                                  name="profilePic"
                                  class="custom-file-input form-control"
                                  // value={state?.profilePic}
                                  // onChange={handleChange}
                                  ref={register}
                                  onChange={fileChange}
                                />
                                <label class="custom-file-label">
                                  {state?.profilePic?.name
                                    ? state?.profilePic?.name
                                    : "Choose File"}
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12 d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">
                              save
                            </button>
                            {/* <button type='button' className='btn btn-primary'>
                              Next
                            </button> */}
                          </div>
                          <p className="successMag">{successMsg}</p>
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
                                defaultValue={"4"}
                                onChange={handleChange}
                                value={state?.wheels || state?.vehicle?.wheels}
                                // defaultValue={viewData?.wheels}
                              >
                                {/* <option selected='true' disabled='disabled'>
                                  Choose Wheels
                                </option> */}
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="6">+6</option>
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
                                onChange={handleChange}
                                value={state?.brand}
                              >
                                <option selected="true" disabled="disabled">
                                  Choose Brand
                                </option>
                                {/* <option>{state?.vehicle?.brand}</option> */}
                                <option>Hero</option>
                                <option>Tvs</option>
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
                                onChange={handleChange}
                                value={state?.type}
                              >
                                <option selected="true" disabled="disabled">
                                  Choose Type
                                </option>
                                {/* <option>{state?.vehicle?.type}</option> */}
                                <option>Loading </option>
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
                                name="vehicleName"
                                onChange={handleChange}
                                value={state?.vehicleName}
                              >
                                <option selected="true" disabled="disabled">
                                  Choose Vehicle Name
                                </option>
                                {/* <option>{state?.vehicle?.vehicleName}</option> */}
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
                                onChange={handleChange}
                                value={state?.variants}
                              >
                                <option selected="true" disabled="disabled">
                                  Choose variants
                                </option>
                                <option>variants 1</option>
                                <option>variants 2</option>
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
                                value={
                                  state?.noOfUnits || state?.vehicle?.noOfUnits
                                } //state?.vehicle?.noOfUnits
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder="Enter no. of units.."
                                onChange={handleChange}
                                ref={register()}
                                defaultValue="1"
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
                                    onChange={handleChange}
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
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Pin Code
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                onKeyPress={(e) => restrictAlpha(e)}
                                name="pincode"
                                maxLength={6}
                                onKeyUp={(e) => checkpincode(e)}
                                defaultValue={state?.pincode}
                                placeholder="Enter pin code.."
                                ref={register()}
                              />

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
                                htmlFor="val-username"
                              >
                                District
                              </label>
                              <select
                                className="form-control"
                                id="exampleFormControlSelect1"
                                name="district"
                                value={state?.district}
                                ref={register}
                              >
                                <option>{state?.district}</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Post Office
                              </label>
                              <select
                                className="form-control"
                                id="exampleFormControlSelect1"
                                name="postOffice"
                                onChange={handleChange}
                                ref={register}
                              >
                                <option selected="true" disabled="disabled">
                                  Choose Post Office
                                </option>
                                {post.map((name, index) => (
                                  <option>{name?.Name}</option>
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
                                Block
                              </label>

                              <select
                                className="form-control"
                                id="exampleFormControlSelect1"
                                name="block"
                                onChange={handleChange}
                                ref={register}
                              >
                                <option selected="true" disabled="disabled">
                                  Choose Block
                                </option>
                                {blockData.length != 0 &&
                                  blockData.map((options, index) => (
                                    <option>{options.block}</option>
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
                                City/Village
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="cityVillage"
                                value={state?.cityVillage}
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
                                htmlFor="val-username"
                              >
                                Address
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="address"
                                value={state?.address}
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
                                htmlFor="val-username"
                              >
                                Landmark
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                value={state?.landmark}
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
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Buying Schemes
                              </label>

                              <select
                                className="form-control"
                                id="exampleFormControlSelect1"
                                ref={register}
                                onChange={handleChange}
                                value={state?.financeSchemes}
                                name="financeSchemes"
                              >
                                <option selected="true" disabled="disabled">
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
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Buying Timeline
                              </label>
                              <select
                                className="form-control"
                                id="exampleFormControlSelect1"
                                name="buyingTimeline"
                                onChange={handleChange}
                                value={state?.buyingTimeline}
                                ref={register}
                              >
                                <option selected="true" disabled="disabled">
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
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Manufacturer
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="exchangeCompany"
                                value={state?.exchangeCompany}
                                onChange={handleChange}
                                placeholder="Enter company.."
                                ref={register}
                              />
                            </div>
                          </Col>
                          <div className="col-sm-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Year of registration
                              </label>
                              <DatePicker
                                placeholderText="Select Year of registration"
                                // onSelect={this.handleDateSelect.bind(this)}
                                selected={Selectedyear}
                                className="form-control"
                                onChange={(date) => setSelectedyear(date)}
                                showYearPicker
                                dateFormat="yyyy"
                                // dateFormat="dd/MM/yyyy"
                                // peekNextMonth
                                // showMonthDropdown
                                // showYearDropdown
                                // dropdownMode="select"
                              />
                            </div>
                          </div>
                          <Col sm={6}>
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Model
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="model"
                                value={state?.model || state?.vehicle?.model}
                                onChange={handleChange}
                                placeholder="Enter Model.."
                                ref={register}
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Registration No.
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                // onKeyPress={(e) => restrictAlpha(e)}
                                name="registrationNumber"
                                value={
                                  state?.registrationNumber ||
                                  state?.vehicle?.registrationNumber
                                }
                                onChange={handleChange}
                                placeholder="Enter registration No..."
                                ref={register}
                              />
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Vehicle Image
                              </label>

                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input form-control"
                                  ref={register}
                                  name="photoUpload" //
                                  onChange={fileChange}
                                />
                                <label className="custom-file-label">
                                  {state?.photoUpload?.name
                                    ? state?.photoUpload?.name
                                    : state?.vehicle?.photoUpload
                                    ? state?.vehicle?.photoUpload
                                    : "Choose File"}
                                </label>
                              </div>
                            </div>
                          </Col>

                          <Col sm={6}>
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                RC
                              </label>

                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input form-control"
                                  ref={register}
                                  name="exchangeVehicleRC" //
                                  onChange={fileChange}
                                />
                                <label className="custom-file-label">
                                  {state?.exchangeVehicleRC?.name
                                    ? state?.exchangeVehicleRC?.name
                                    : state?.vehicle?.exchangeVehicleRC
                                    ? state?.vehicle?.exchangeVehicleRC
                                    : "Choose File"}
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                DL
                              </label>

                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input form-control"
                                  ref={register}
                                  name="exchangeVehicleDL" //
                                  onChange={fileChange}
                                />
                                <label className="custom-file-label">
                                  {state?.exchangeVehicleDL?.name
                                    ? state?.exchangeVehicleDL?.name
                                    : state?.vehicle?.exchangeVehicleDL
                                    ? state?.vehicle?.exchangeVehicleDL
                                    : "Choose File"}
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Permit
                              </label>

                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input form-control"
                                  ref={register}
                                  name="exchangeVehiclePermit" //
                                  onChange={fileChange}
                                />
                                <label className="custom-file-label">
                                  {state?.exchangeVehiclePermit?.name
                                    ? state?.exchangeVehiclePermit?.name
                                    : state?.vehicle?.exchangeVehiclePermit
                                    ? state?.vehicle?.exchangeVehiclePermit
                                    : "Choose File"}
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
                                htmlFor="val-username"
                              >
                                Aadhaar Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="aadharNo"
                                value={state?.aadharNo || state?.docs?.aadharNo}
                                onChange={handleChange}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder="Enter aadhar No.."
                                ref={register}
                                maxLength="12"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Upload Aadhaar Card
                              </label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  name="aadharDoc"
                                  className="custom-file-input form-control"
                                  ref={register}
                                  onChange={fileChange}
                                />
                                <label className="custom-file-label">
                                  {/* {state?.aadharDoc?.name || "Choose File"} */}
                                  {state?.aadharDoc?.name
                                    ? state?.aadharDoc?.name
                                    : state?.docs?.aadharDoc
                                    ? state?.docs?.aadharDoc
                                    : "Choose File"}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                PAN
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="pan"
                                maxLength="10"
                                onChange={handleChange}
                                placeholder="Enter pan name.."
                                ref={register}
                                value={state?.pan || state?.docs?.pan}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                PAN (Upload)
                              </label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  name="panDoc"
                                  className="custom-file-input form-control"
                                  ref={register}
                                  onChange={fileChange}
                                />
                                <label className="custom-file-label">
                                  {/* {state?.panDoc?.name || "Choose File"} */}
                                  {state?.panDoc?.name
                                    ? state?.panDoc?.name
                                    : state?.docs?.panDoc
                                    ? state?.docs?.panDoc
                                    : "Choose File"}
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12 d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn btn-primary mr-2"
                              onClick={(e) => {
                                handlesixthRequest(e);
                              }}
                            >
                              Previous
                            </button>

                            <button type="submit" className="btn btn-primary">
                              Next
                            </button>
                          </div>
                          <p className="successMag">{successMs}</p>
                        </div>
                      )}
                      {formToggle == 7 && (
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Bank Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="bankName"
                                onChange={handleChange}
                                placeholder="Enter  bank Name.."
                                ref={register}
                                value={state?.bankName || state?.docs?.bankName}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Bank Passbook (Upload)
                              </label>

                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input form-control"
                                  name="bankDoc"
                                  ref={register}
                                  onChange={fileChange}
                                />
                                <label className="custom-file-label">
                                  {/* {state?.bankDoc?.name
                                    ? state?.bankDoc?.name
                                    : "Choose File"} */}
                                  {state?.bankDoc?.name
                                    ? state?.bankDoc?.name
                                    : state?.docs?.bankDoc
                                    ? state?.docs?.bankDoc
                                    : "Choose File"}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Account No.
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="acNo"
                                onChange={handleChange}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder="Enter  A/C No..."
                                ref={register}
                                value={state?.acNo || state?.docs?.acNo}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Account Holder
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="accountHolder"
                                onChange={handleChange}
                                placeholder="Enter account holder name..."
                                ref={register}
                                value={
                                  state?.accountHolder ||
                                  state?.docs?.accountHolder
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                IFSC code
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="ifscCode"
                                onChange={handleChange}
                                placeholder="Enter IFSC code..."
                                ref={register}
                                value={state?.ifscCode || state?.docs?.ifscCode}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group custom-check-design">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Do you have cheque book?
                              </label>
                              <div className="d-flex px-2 py-2">
                                <div className="w-110 d-flex align-items-center mr-3">
                                  <input
                                    type="radio"
                                    className="w-auto ml-2 input_cus_radio"
                                    id="chequeBookY"
                                    name="chequeBook"
                                    ref={register}
                                    value="yes"
                                    onChange={handleChange}
                                    checked={
                                      state?.chequeBook == "yes" ? true : ""
                                    }
                                  />
                                  <label
                                    className="check-label"
                                    htmlFor="chequeBookY"
                                  >
                                    Yes{" "}
                                  </label>
                                </div>
                                <div className="w-110 d-flex align-items-center">
                                  <input
                                    type="radio"
                                    className="w-auto ml-2 input_cus_radio"
                                    id="chequeBookN"
                                    name="chequeBook"
                                    ref={register}
                                    onChange={handleChange}
                                    value="no"
                                    checked={
                                      state?.chequeBook == "no" ? true : ""
                                    }
                                  />
                                  <label
                                    className="check-label"
                                    htmlFor="chequeBookN"
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
                              update
                            </button>
                          </div>
                          <p className="successMag">{successMsg}</p>
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
