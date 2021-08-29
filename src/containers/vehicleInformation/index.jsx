import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";

function Index(props) {
  if(!props?.location?.data?.userid){ 
    props.history.push({ 
      pathname: "/newleads",
  
    });
   }
  const [prevData, setprevData] = useState(props);
  const { register, errors, handleSubmit } = useForm();
  const [inputfile, setinputfile] = useState("Choose File");
  const [saveData, setSaveData] = useState("");

  const [personaldata, setpersonaldata] = useState(props);

  const onSubmit = (data) => {
    var newdata = { ...data, ...personaldata.location.data };

    const formData = new FormData();
    Object.keys(newdata).forEach((key) => {
      if (newdata[key]) {
        formData.append([key], newdata[key]);
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
      })
      .catch((err) => {
        console.log(err);
      });

    setSaveData(newdata);
    // props.history.push({
    //   pathname: "/address",
    //   data: newdata,
    // });
  };
  const restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleBackRequest = (e) => {
    e.preventDefault();
    props.history.push({
      pathname: "/newleads",
      state: { detail: personaldata.location.data }, // personaldata.location.data
    });
  };
  return (
    <>
     {/* <Header /> */}
      <div className="content-body">
        <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="container-fluid">
            <div class="row emi_row ">
              <div class="col-lg-12">
                <div class="card widget-stat">
                  <div class="card-header bg-custom-blue ">
                    <h4 class="card-title text-white">Vehicle Information</h4>
                  </div>
                  <div class="card-body">
                    <div class="form-validation">
                      <Row>
                        <Col sm={6}>
                          <div class="form-group ">
                            <label class="col-form-label" for="val-username">
                              Wheels
                            </label>
                            <select
                              class="form-control"
                              id="exampleFormControlSelect1"
                              ref={register}
                              name="wheels"
                              defaultValue={
                                prevData.location.state?.detail?.wheels
                              }
                            >
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="6">+6</option>
                            </select>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div class="form-group ">
                            <label class="col-form-label" for="val-username">
                              Brand
                            </label>
                            <select
                              class="form-control"
                              id="exampleFormControlSelect1"
                              ref={register}
                              name="brand"
                              defaultValue={
                                prevData.location.state?.detail?.brand
                              }
                            >
                              <option>TaTA</option>
                              <option>Hero</option>
                              <option>Tvs</option>
                            </select>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div class="form-group ">
                            <label class="col-form-label" for="val-username">
                              Type
                            </label>
                            <select
                              class="form-control"
                              id="exampleFormControlSelect1"
                              ref={register}
                              name="type"
                              defaultValue={
                                prevData.location.state?.detail?.type
                              }
                            >
                              <option>Passenger</option>
                              <option>Loading</option>
                            </select>
                          </div>
                        </Col>

                        <Col sm={6}>
                          <div class="form-group ">
                            <label class="col-form-label" for="val-username">
                              Vehicle Name
                            </label>
                            {/* <input
                              type="text"
                              class="form-control"
                              id="val-username"
                              name="vehicleName"
                              placeholder="Enter vehicle name.."
                              ref={register({
                                pattern: {
                                  value: /^[a-zA-Z]+$/,
                                  message: "Enter Valid vehicle Name",
                                },
                              })}
                            /> */}

                            <select
                              class="form-control"
                              id="exampleFormControlSelect1"
                              ref={register}
                              name="vehicleName"
                              defaultValue={
                                prevData.location.state?.detail?.vehicleName
                              }
                            >
                              <option>vehicleName 1</option>
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
                        </Col>
                        <Col sm={6}>
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
                              defaultValue={
                                prevData.location.state?.detail?.variants
                              }
                            >
                              <option>variants 1</option>
                              <option>variants 2</option>
                            </select>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div class="form-group ">
                            <label class="col-form-label" for="val-username">
                              No. of Units
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="val-username"
                              name="noOfUnits"
                              defaultValue={
                                prevData.location.state?.detail?.noOfUnits
                              }
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
                        </Col>
                        <Col sm={6}>
                          <div class="form-group custom-check-design">
                            <label class="col-form-label">Commercial Use</label>
                            <div class="d-flex px-2">
                              <div class="w-110 d-flex align-items-center mr-3">
                                <input
                                  type="radio"
                                  className="w-auto ml-2 input_cus_radio"
                                  id="commercialUseY"
                                  name="commercialUse"
                                  // defaultValue={prevData.location.state?.detail?.commercialUse}
                                  value="yes"
                                  ref={register}
                                />
                                <label
                                  className="check-label"
                                  for="commercialUseY"
                                >
                                  Yes{" "}
                                </label>
                              </div>
                              <div class="w-110 d-flex align-items-center">
                                <input
                                  type="radio"
                                  className="w-auto ml-2 input_cus_radio"
                                  id="commercialUseN"
                                  name="commercialUse"
                                  // defaultValue={prevData.location.state?.detail?.commercialUse}
                                  value="no"
                                  ref={register}
                                />
                                <label
                                  className="check-label"
                                  for="commercialUseN"
                                >
                                  No{" "}
                                </label>
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col sm={6}>
                          <div class="form-group custom-check-design">
                            <label class="col-form-label" for="val-username">
                              Any Vehicle to Exchange
                            </label>
                            <div class="d-flex px-2">
                              <div class="w-110 d-flex align-items-center mr-3">
                                <input
                                  type="radio"
                                  className="w-auto ml-2 input_cus_radio"
                                  // onClick={() => setshowVehicles(true)}
                                  id="vehicleToExchangheY"
                                  value="yes"
                                  name="vehicleToExchanghe"
                                  // defaultValue={prevData.location.state?.detail?.vehicleToExchanghe}
                                  ref={register}
                                />
                                <label
                                  className="check-label"
                                  for="vehicleToExchangheY"
                                >
                                  Yes{" "}
                                </label>
                              </div>
                              <div class="w-110 d-flex align-items-center">
                                <input
                                  type="radio"
                                  // onClick={() => setshowVehicles(false)}
                                  className="w-auto ml-2 input_cus_radio"
                                  id="vehicleToExchangheN"
                                  value="no"
                                  name="vehicleToExchanghe"
                                  // defaultValue={prevData.location.state?.detail?.vehicleToExchanghe}
                                  ref={register}
                                />
                                <label
                                  className="check-label"
                                  for="vehicleToExchangheN"
                                >
                                  No{" "}
                                </label>
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col sm={12} className="d-flex mt-4">
                          {/* <Link className="mr-2" to={{pathname:"/newleads",data:personaldata}}>
                            {" "}
                            <button type="submit" class="btn btn-primary">
                              Previous
                            </button>
                          </Link>{" "} */}
                          {/* <Link className="" to="/address">
                          {" "} */}
                          <button
                            type="button"
                            className="btn btn-primary mr-2"
                            onClick={(e) => {
                              handleBackRequest(e);
                            }}
                          >
                            Previous
                          </button>
                          <button type="submit" class="btn btn-primary">
                            Next
                          </button>
                          {/* </Link> */}
                        </Col>
                      </Row>
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

