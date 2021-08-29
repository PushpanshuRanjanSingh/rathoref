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
  const [msg, setmsg] = useState("");
  const [heading, setheading] = useState("Basic Details");
  const [vehicle, setvehicle] = useState("");
  const [inputfile, setinputfile] = useState("");
  const [inputfilepic, setinputfilepic] = useState("");
  const [districtData, setdistrictData] = useState([]);
  const [blockData, setblockData] = useState([]);
  const [id, setid] = useState("");
  const [formToggle, setformToggle] = useState(1);
  const [prevData, setprevData] = useState(props);
  const [data, setdata] = useState({});
  const [arrMulti, setarrMulti] = useState([]);
  const [tvs, settvs] = useState(false);
  const [suziki, setsuziki] = useState(false);
  const [status, setstatus] = useState(false);
  const [yamaha, setyamaha] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [SelectedDate, setSelectedDate] = useState(null);
  const [state, setState] = React.useState();
  const [Selectedyear, setSelectedyear] = useState(null);
  const [bandName, setbandName] = useState([]);
  useEffect(() => {
    getBrand();
  }, []);
  const addvechicletype = (dealerVehicleType) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    // const id = viewData?._id;
    const data = {
      _id: id,
      dealerVehicleType,
    };
    axios
      .post(apiUrl + "User/dealerVehicleAdd", data, headers)
      .then((resp) => {
        setmsg("Vehicle Type update successfully!");
        props.history.goBack();
        // setTimeout(() => {
        //   setmsg('');
        // }, 2000);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  let index = 0;
  const getBrand = () => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "brand/getBrandList?skip=1&limit=2000", headers)

      .then((resp) => {
        setbandName(resp?.data?.data[index].data);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const onSubmit = (formsubmitdata) => {
    formsubmitdata.dateOfBirth = SelectedDate
      ? moment(SelectedDate).format("l")
      : "";
    formsubmitdata.yearOfRegistration = Selectedyear
      ? moment(Selectedyear).format("l")
      : "";
    if (formToggle == 1) {
     
      if(state?.oemName){
     
        if (state?.phoneNo) {
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
      }else{
        showNotification("danger", "Select Oem Name");
      }
     
    } else if (formToggle == 8) {
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
        .post(apiUrl + "user/saveDealerProfile", formData, headers)
        .then((resp) => {
          if (formToggle == 8) {
            setid(resp?.data?.data?._id);

            setformToggle(9);
            setheading("Sub-Dealership Details");
          }
        })
        .catch((err) => {
          showNotification("danger", err.message);
        });
    } else if (formToggle == 9) {
      try {
        var obj = formsubmitdata;
        var subDealership = [];
        subDealership.push(obj);
        // var id = viewData;

        let token = localStorage.getItem("myData");
        let headers = {
          headers: {
            "x-token": `Bearer ${token}`,
          },
        };
        axios
          .put(apiUrl + "subDealer/update", { id, subDealership }, headers)
          .then((resp) => {
            if (resp) {
              if (resp) {
                if (formToggle == 9) {
                  setformToggle(10);
                  setheading("Vehicle Type");
                }
              }
            }
          })
          .catch((err) => {
            showNotification("danger", err.message);
          });

        // }
      } catch (err) {
        showNotification("danger", err.message);
      }
    } else if (formToggle == 10) {
      addvechicletype(arrMulti);
    }
    try {
      if (formToggle == 3) {
        setformToggle(4);
        setheading("Company Details");
      } else if (formToggle == 4) {
        setformToggle(6);
        setheading("Document");
      } else if (formToggle == 5) {
        setformToggle(6);
        setheading("Document");
      } else if (formToggle == 6) {
        setformToggle(7);
        setheading("Bank Details");
      } else if (formToggle == 7) {
        setformToggle(8);
        setheading("Naayak Point of Contact");
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
    setheading("Basic Details");
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
    setformToggle(3);
    setheading("Address");
  };
  const handlesixthRequest = (e) => {
    e.preventDefault();
    setformToggle(4);
    setheading("Company Details");
  };
  const handlesevenRequest = (e) => {
    e.preventDefault();
    setformToggle(6);
    setheading("Document");
  };
  const handleeightRequest = (e) => {
    e.preventDefault();
    setformToggle(7);
    setheading("Bank Account Detail");
  };
  const handlenineRequest = (e) => {
    e.preventDefault();
    setformToggle(8);
    setheading("Naayak Point of Contact");
  };
  const handleten = (e) => {
    e.preventDefault();
    setformToggle(9);
    setheading("Sub-Delearship Detail");
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
  const updatevtype = (evt) => {
    const { name, value } = evt.target;
    if (arrMulti.includes(value)) {
      arrMulti.splice(arrMulti.indexOf(value), 1);
    } else {
      arrMulti.push(value);
    }
    arrMulti.includes("maruti") ? setstatus(true) : setstatus(false);
    arrMulti.includes("tvs") ? settvs(true) : settvs(false);
    arrMulti.includes("yamaha") ? setyamaha(true) : setyamaha(false);
    arrMulti.includes("suziki") ? setsuziki(true) : setsuziki(false);
    const dealerVehicleType = arrMulti;

    return;
    // const formData = new FormData();
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    const id = viewData?._id;
    const data = {
      _id: id,
      dealerVehicleType,
    };

    axios
      .post(apiUrl + "User/dealerVehicleAdd", data, headers)
      .then((resp) => {
        setmsg("Vehicle Type update successfully!");

        setTimeout(() => {
          setmsg("");
        }, 2000);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
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
                          <Col sm={6}>
                            <div class="form-group">
                              <label class="col-form-label" for="val-username">
                                Select OEM Name
                              </label>
                              <select
                                class="form-control"
                                onChange={handleChange}
                                ref={register}
                                required
                                name="oemName"
                                id="exampleFormControlSelect1"
                              >
                                <option selected="true" disabled="disabled">
                                  Choose OEM Name
                                </option>
                                {bandName.length != index &&
                                  bandName.map((options, index) => (
                                    <option value={options._id}>
                                      {options.brandName}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </Col>

                          {/* <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                OEM Name<span className="text-danger">*</span>
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="oemName"
                                // defaultValue={state.firstName}
                                //  defaultValue={viewData?.firstName}
                                placeholder="Enter OEM Name.."
                                value={state?.oemName}
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
                                name="oemName"
                                render={({ message }) => (
                                  <p className="error">{message}</p>
                                )}
                              />
                            </div>
                          </div>
                           */}
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Dealership Name
                              </label>
                              <input
                                // type="number"
                                className="form-control"
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id="val-username"
                                name="dealershipName"
                                required
                                value={state?.dealershipName}
                                onChange={handleChange}
                                placeholder="Enter Dealership Name.."
                                ref={register}
                                //defaultValue={viewData?.dealershipName}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Google Listing Link
                              </label>
                              <input
                                // type="number"
                                className="form-control"
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id="val-username"
                                name="googleListingLink"
                                value={state?.googleListingLink}
                                onChange={handleChange}
                                placeholder="Enter Google Listing Link.."
                                ref={register}
                                //defaultValue={viewData?.googleListingLink}
                              />
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Website
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="val-username"
                                name="website"
                                value={state?.website}
                                onChange={handleChange}
                                placeholder="Enter website.."
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
                                onChange={(e) => seterrorMsg("")}
                                maxLength="10"
                                value={state?.phoneNo}
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

                          <div className="col-lg-12 d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">
                              next
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
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Company Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="newcompanyName"
                                value={state?.newcompanyName}
                                onChange={handleChange}
                                placeholder="Enter  bank Name.."
                                ref={register}
                                defaultValue={
                                  state && state?.docs && state?.docs[0]
                                    ? state?.docs[0].newcompanyName
                                    : ""
                                }
                              />
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                CIN
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="cin"
                                value={state?.cin}
                                onChange={handleChange}
                                // onKeyPress={(e) => restrictAlpha(e)}
                                placeholder="Enter  CIN No..."
                                ref={register}
                                defaultValue={
                                  state && state?.docs && state?.docs[0]
                                    ? state?.docs[0].cin
                                    : ""
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                GST
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="gst"
                                value={state?.gst}
                                onChange={handleChange}
                                placeholder="Enter GST number..."
                                ref={register}
                                defaultValue={
                                  state && state?.docs && state?.docs[0]
                                    ? state?.docs[0].gst
                                    : ""
                                }
                              />
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
                                value={state?.pan}
                                onChange={handleChange}
                                placeholder="Enter PAN number..."
                                ref={register}
                                defaultValue={
                                  state && state?.docs && state?.docs[0]
                                    ? state?.docs[0].pan
                                    : ""
                                }
                              />
                            </div>
                          </div>

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
                              Next
                            </button>
                          </div>
                          <p className="successMag">{successMsg}</p>
                        </div>
                      )}
                      {formToggle == 8 && (
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Name
                              </label>
                              <input
                                // type="number"
                                className="form-control"
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id="val-username"
                                name="npcName"
                                value={state?.npcName}
                                onChange={handleChange}
                                placeholder="Enter Name.."
                                ref={register}
                                defaultValue={viewData?.npcName}
                              />
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Designation
                              </label>
                              <input
                                // type="number"
                                className="form-control"
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id="val-username"
                                name="npcDesignation"
                                value={state?.npcDesignation}
                                onChange={handleChange}
                                placeholder="Enter Designation.."
                                ref={register}
                                defaultValue={viewData?.npcDesignation}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Number
                              </label>
                              <input
                                // type="number"
                                className="form-control"
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id="val-username"
                                name="npcContactNo"
                                value={state?.npcContactNo}
                                maxLength="10"
                                onChange={handleChange}
                                placeholder="Enter Number.."
                                onKeyPress={(e) => restrictAlpha(e)}
                                ref={register}
                                defaultValue={viewData?.npcContactNo}
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
                                // type="number"
                                className="form-control"
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id="val-username"
                                name="npcEmail"
                                value={state?.npcEmail}
                                onChange={handleChange}
                                placeholder="Enter Designation.."
                                ref={register({
                                  // required: 'This is required ',
                                  pattern: {
                                    value:
                                      /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/,
                                    message: "Enter Valid Email id",
                                  },
                                })}
                                defaultValue={viewData?.npcEmail}
                              />
                              <ErrorMessage
                                errors={errors}
                                name="npcEmail"
                                render={({ message }) => (
                                  <p className="error">{message}</p>
                                )}
                              />
                            </div>
                          </div>

                          <div className="col-lg-12 d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn btn-primary mr-2"
                              onClick={(e) => {
                                handlenineRequest(e);
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
                      {formToggle == 9 && (
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Sub-Dealership Name
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="subDealername"
                                placeholder="Enter Sub-Dealership Name.."
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
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Address
                              </label>
                              <input
                                // type="number"
                                className="form-control"
                                // onKeyPress={(e) => restrictAlpha(e)}
                                id="val-username"
                                name="subDealeraddress"
                                // value={viewData?.subDealeraddress}
                                // onChange={handleChange}
                                placeholder="Enter Address .."
                                ref={register}
                                // defaultValue={viewData?.subDealershipAddress}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                for="val-username"
                              >
                                Contact No
                              </label>
                              <input
                                // type="number"
                                className="form-control"
                                maxLength="10"
                                onKeyPress={(e) => restrictAlpha(e)}
                                id="val-username"
                                name="subDealercontactNo"
                                // value={viewData?.subDealercontactNo}
                                // onChange={handleChange}
                                placeholder="Enter Contact Number"
                                ref={register}
                                // defaultValue={viewData?.subDealershipContactNo}
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
                                class="form-control"
                                id="val-username"
                                name="subDealeremail"
                                // value={viewData?.subDealeremail}
                                // onChange={handleChange}
                                placeholder="Enter Email.."
                                ref={register}
                              />
                            </div>
                          </div>

                          <div className="col-lg-12 d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn btn-primary mr-2"
                              onClick={(e) => {
                                handleeightRequest(e);
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
                      {formToggle == 10 && (
                        <div className="row">
                          <div className="col-md-12">
                            <div className="card-body">
                              <div className="form-group custom-check-design">
                                <div className="d-flex flex-wrap py-2">
                                  <div className="w-110 d-flex align-items-center mr-4">
                                    <input
                                      type="checkbox"
                                      className="w-auto ml-2 input_cus_radio"
                                      id="commercialUse2"
                                      name="dvtyp"
                                      value="maruti"
                                      onChange={updatevtype}
                                      checked={status}
                                    />
                                    <label
                                      className="check-label"
                                      for="commercialUse2"
                                    >
                                      maruti{" "}
                                    </label>
                                  </div>
                                  <div className="w-110 d-flex align-items-center mr-4">
                                    <input
                                      type="checkbox"
                                      className="w-auto ml-2 input_cus_radio"
                                      id="commercialUse1"
                                      name="dvtypee"
                                      value="suziki"
                                      onChange={updatevtype}
                                      checked={suziki}
                                    />
                                    <label
                                      className="check-label"
                                      for="commercialUse1"
                                    >
                                      suziki{" "}
                                    </label>
                                  </div>
                                  <div className="w-110 d-flex align-items-center mr-4">
                                    <input
                                      type="checkbox"
                                      className="w-auto ml-2 input_cus_radio"
                                      id="commercialUse3"
                                      name="dvtpe"
                                      onChange={updatevtype}
                                      value="yamaha"
                                      checked={yamaha}
                                    />
                                    <label
                                      className="check-label"
                                      for="commercialUse3"
                                    >
                                      yamaha{" "}
                                    </label>
                                  </div>
                                  <div className="w-110 d-flex align-items-center mr-4">
                                    <input
                                      type="checkbox"
                                      className="w-auto ml-2 input_cus_radio"
                                      id="commercialUse4"
                                      name="dtype"
                                      onChange={updatevtype}
                                      value="tvs"
                                      checked={tvs}
                                    />
                                    <label
                                      className="check-label"
                                      for="commercialUse4"
                                    >
                                      tvs{" "}
                                    </label>
                                  </div>
                                </div>
                                <p className="successMag">{msg}</p>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12 d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn btn-primary mr-2"
                              onClick={(e) => {
                                handleten(e);
                              }}
                            >
                              Previous
                            </button>

                            <button type="submit" className="btn btn-primary">
                              Save
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
