import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import base from "../../globals/base";
import Header from "../header/header";
import Footer from "../footer/footer";
import showNotification from "../../services/notificationService";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import apiUrl from "../../globals/config";
import axios from "axios";
import moment from "moment";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import DatePicker from "react-datepicker";
import _ from "underscore";
import "react-datepicker/dist/react-datepicker.css";
function Index(props) {
  if (!props.location?.data) {
    props.history.push({
      pathname: "/",
    });
  }
  const [Selectedyear, setSelectedyear] = useState(null);
  const [SelectedDate, setSelectedDate] = useState(null);
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
  const [brand, setbrand] = useState([]);
  const [Type, setType] = useState([]);
  const [iscomplete, setiscomplete] = useState(false);
  const [Vechicle, setVechicle] = useState([]);
  const [formToggle, setformToggle] = useState(1);
  const [prevData, setprevData] = useState(props);
  const [data, setdata] = useState({});
  const [pramsdata, setpramsdata] = useState(props.location.data);
  const [approve, setapprove] = useState(props.location.approved);
  const [errorMsg, seterrorMsg] = useState("");
  const [exchange, setexchange] = useState(false)
  const [Varient, setVarient] = useState([]);
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    dateOfBirth: "",
    noOfUnits: "",
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
    financeSchemes: "",
    buyingTimeline: "",
    exchangeCompany: "",
    commercialUse: "",
    brand: "",
    type: "",
    variants:""
  });

  useEffect(() => {
    getLeads();
    if (formToggle == 2) getBrandList();
    // if (formToggle == 2) {
      
    // }

  }, [formToggle]);
  const allvechicle =(id)=>{
   
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + "addVehicle/getInformation?skip=1&limit=2000&id=" + id,
        headers
      )
      .then((resp) => {
    
        setVechicle(resp?.data?.data);
        // setcolor(resp?.data?.data);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const alltype =(id)=>{
   
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + "ppl/getPplId?id=" + id,
        headers
      )
      .then((resp) => {
       
        setType([ resp?.data?.data]);
        // setcolor(resp?.data?.data);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const allvarient =(id)=>{
   
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + "variant/getVariantId?id=" + id,
        headers
      )
      .then((resp) => {
    
        setVarient([ resp?.data?.data]);
        // setcolor(resp?.data?.data);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const getLeads = () => {
    axios
      .post(apiUrl + "user/verifyNo", pramsdata)
      .then((response) => {
        let data = response?.data?.data;
        data.commercialUse = response?.data?.data?.vehicles[0]?.commercialUse;
        data.vehicleToExchanghe =
          response?.data?.data?.vehicles[0]?.vehicleToExchanghe;
        data.chequeBook = response?.data?.data?.docs[0]?.chequeBook;
        data.type = "";
        data.brand = "";
        data.variants="";
      if(formToggle == 2 ||formToggle == 1){
//data.vehicles[0]._id   data.vehicles[0].brand[0]._id
        if(data?.vehicles[0]?.vehicleID)setVechicle(data?.vehicles[0]?.vehicleID)
        //allvechicle(data?.vehicles)
        if(data?.vehicles[0]?.type)setType(data?.vehicles[0]?.type)
        //alltype(data?.vehicle?.type)
        if(data?.vehicles[0]?.variants)setVarient(data?.vehicles[0]?.variants)
        // allvarient(data?.vehicle?.variants)
      }
       if(data?.vehicleToExchanghe == "no"){
        setexchange(true)
       }
        setState(data); // state?.vehicleToExchanghe == "no"
        if(data?.dateOfBirth)
          setSelectedDate(new Date(data?.dateOfBirth));

        setblockData([data.block]);
        setpost([{ Name: data.postOffice }]);
      })
      .catch(function (error) {
        showNotification("danger", error.message);
      });
  };
  const approved = (id) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .post(apiUrl + 'user/cmtfreshLeadApproved', { id }, headers)
      .then((resp) => {
        showNotification("success", resp ? "Lead Updated" : "");
          back();
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const onSubmit = (formsubmitdata) => {
    if (formToggle == 1) {
      formsubmitdata.dateOfBirth = SelectedDate
        ? moment(SelectedDate).format("l")
        : "";
    }
    if (formToggle == 5) {
      formsubmitdata.yearOfRegistration = Selectedyear
        ? moment(Selectedyear).format("l")
        : "";
      formsubmitdata.photoUpload = state?.photoUpload;
    }
    if (formToggle == 6) {
      formsubmitdata.panDoc = state?.panDoc;
      formsubmitdata.aadharDoc = state?.aadharDoc;
    }
    if (formToggle == 7) {
      formsubmitdata.bankDoc = state?.bankDoc;
      formsubmitdata.isComplete = 7
    }
    

    if (formToggle == 1 && _.compact(formsubmitdata).length == 5)
      formsubmitdata.isComplete = 1;
    if (formToggle == 2 && _.compact(formsubmitdata).length == 8)
      formsubmitdata.isComplete = 2;
    if (formToggle == 3 && _.compact(formsubmitdata).length == 7)
      formsubmitdata.isComplete = 3;
    if (formToggle == 4 && _.compact(formsubmitdata).length == 2)
      formsubmitdata.isComplete = 4;
    if (formToggle == 5 && _.compact(formsubmitdata).length == 5)
      formsubmitdata.isComplete = 5;
    if (formToggle == 6 && _.compact(formsubmitdata).length == 4)
      formsubmitdata.isComplete = 6;
    if (formToggle == 7 && _.compact(formsubmitdata).length == 6)
      formsubmitdata.isComplete = 7;

    formsubmitdata.userid = state?._id;
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
      .post(apiUrl + "user/updatesStaffData", formData, headers)
      .then((resp) => {
        if (resp && formToggle == 7) {
          if(approve){
            approved(approve)
          
          }
          else{
            showNotification("success", resp ? "Lead Updated" : "");
            back();
          }
         
        }
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });

    try {
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
          .post(apiUrl + "user/updatesStaffData", formData, headers)
          .then((resp) => {
            setsuccessMs("Document updated successfully!");

            if (resp) {
              back();
              // props.history.goBack();
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
  const gitBlock = (value) => {
    axios
      .get(apiUrl + "user/getDistrict?district=" + value)
      .then((res) => {
        // setblockData(res.data.message);
      })
      .catch((error) => {
        if (error) {
          //  setblockData([]);
        }
        showNotification("danger", error.message);
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
  const back = () => {
    props.history.goBack();
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
  const handleVarient = (e) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + "variant/getVehicleId?skip=1&limit=" + e.target.value,
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
  if(state)
  return (
    <>
      <div className="content-body">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="container-fluid">
            <div className="row justify-content-center h-100 align-items-center emi_row">
              <div className="col-md-12">
                <div className="card widget-stat">
                  <div className="card-header bg-custom-blue">
                    <h4 onClick={back} className="card-title text-white">
                      {heading}
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="form-validation">
                      {formToggle == 1 && (
                        <div className="row">
                          <div className="col-lg-6">
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
                                required
                                placeholder="Enter name.."
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
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Last Name
                              </label>
                              <input
                                required
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
                          <div className="col-lg-6">
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
                                required
                                value={state.fatherName}
                                onChange={handleChange}
                                placeholder="Enter father name.."
                                ref={register}
                                defaultValue={viewData?.fatherName}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
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
                                required
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
                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
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
                                required
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
                                required
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
                                required
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
                                value={state?.brand || state?.vehicles[0]?.brand[0]?._id}
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
                                required
                                onChange={(e) => {
                                  handleChange(e);
                                  handleType(e);
                                }}
                                // || state?.vehicle?.type
                                value={state?.type || state?.vehicles[0]?.type[0]?._id}
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
                                required
                                name="vehicleID"
                                onChange={(e) => {
                                  handleChange(e);
                                  handleVehicle(e);
                                }}
                                value={
                                  state?.vehicleID ||
                                  state?.vehicles[0]?.vehicleID[0]?._id
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
                                required
                                // onChange={handleChange} Varient
                                onChange={(e) => {
                                  handleChange(e);
                                  // handleVarient(e);
                                }}
                                // || state?.vehicle?.variants
                                value={
                                  state?.variants || state?.vehicles[0]?.vehicleID[0]?._id
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
                                required
                                defaultValue={state?.vehicles[0]?.noOfUnits} //state?.vehicle?.noOfUnits
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
                                    required
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
                                    required
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
                                    required
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
                                    required
                                    name="vehicleToExchanghe"
                                    onChange={e=>{handleChange(e);
                                      handleExchange(e)}}
                                    checked={
                                      state?.vehicleToExchanghe == "no"? true
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
                                required
                                className="form-control"
                                id="val-username"
                                onKeyPress={(e) => restrictAlpha(e)}
                                name="pincode"
                                maxLength={6}
                                onKeyUp={(e) => checkpincode(e)}
                                defaultValue={state.pincode}
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
                                required
                                value={state.district}
                                ref={register}
                              >
                                <option>{state.district}</option>
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
                              required
                                className="form-control"
                                id="exampleFormControlSelect1"
                                name="postOffice"
                                ref={register}
                              >
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
                                required
                                ref={register}
                                defaultValue={state.block}
                              >
                                {blockData.length != 0 &&
                                  blockData.map((options, index) => (
                                    <option>{options}</option>
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
                                required
                                name="cityVillage"
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
                                htmlFor="val-username"
                              >
                                Address
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="address"
                                required
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
                                htmlFor="val-username"
                              >
                                Landmark
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                required
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
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Finance Schemes
                              </label>

                              <select
                                className="form-control"
                                id="exampleFormControlSelect1"
                                ref={register}
                                required
                                onChange={handleChange}
                                value={
                                  state?.financeSchemes ||
                                  state?.vehicles[0]?.financeSchemes
                                }
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
                                required
                                onChange={handleChange}
                                value={
                                  state?.buyingTimeline ||
                                  state?.vehicles[0]?.buyingTimeline
                                }
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
                            <div className="form-group ">
                              <label
                                className="col-form-label"
                                htmlFor="val-username"
                              >
                                Company
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                required
                                name="exchangeCompany"
                               
                                defaultValue={state?.vehicle?.exchangeCompany}
                              
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
                                required
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
                                required
                                defaultValue={state?.vehicle?.model}
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
                                required
                                onKeyPress={(e) => restrictAlpha(e)}
                                name="registrationNumber"
                                defaultValue={
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
                                Photo (Upload)
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
                                required
                                defaultValue={state?.docs[0]?.aadharNo}
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
                                    : state?.docs[0]?.aadharDoc
                                    ? state?.docs[0]?.aadharDoc
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
                                required
                                name="pan"
                                onChange={handleChange}
                                placeholder="Enter pan name.."
                                ref={register}
                                defaultValue={state?.docs[0]?.pan}
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
                                    : state?.docs[0]?.panDoc
                                    ? state?.docs[0]?.panDoc
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
                                required
                                onChange={handleChange}
                                placeholder="Enter  bank Name.."
                                ref={register}
                                defaultValue={state?.docs[0]?.bankName}
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
                                 
                                  {state?.bankDoc?.name
                                    ? state?.bankDoc?.name
                                    : state?.docs[0]?.bankDoc
                                    ? state?.docs[0]?.bankDoc
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
                                A/C No.
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="val-username"
                                name="acNo"
                                required
                                onChange={handleChange}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder="Enter  A/C No..."
                                ref={register}
                                defaultValue={state?.docs[0]?.acNo}
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
                                required
                                onChange={handleChange}
                                placeholder="Enter account holder name..."
                                ref={register}
                                defaultValue={state?.docs[0]?.accountHolder}
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
                                required
                                onChange={handleChange}
                                placeholder="Enter IFSC code..."
                                ref={register}
                                defaultValue={state?.docs[0]?.ifscCode}
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
                                    required
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
                                    required
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
    </>
  );
}

export default Index;
