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
import axios from "axios";
import moment from "moment";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function Index(props) {
  const { register, errors, handleSubmit } = useForm(); //   http://192.168.3.214/

  const [errorMsg, seterrorMsg] = useState("");
  const [prevData, setprevData] = useState(props);

  const onSubmit = (data) => {

    if (data.phoneNo && data.firstName) {
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
            phoneNo: data.phoneNo,
          },
          headers
        )
        .then(function (response) {
          seterrorMsg(response.data.message);
        })
        .catch(function (error) {
          seterrorMsg("");
          addlead();
        });
    }
    const addlead = () => {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          if (
            key === "aadharDoc" ||
            key === "panDoc" ||
            key === "bankDoc" ||
            key === "photoUpload"
          ) {
            if (data[key][0]) {
              formData.append([key], data[key][0]);
            }
          } else {
            formData.append([key], data[key]);
          }
        }
      });
      let token = localStorage.getItem("myData");

      let headers = {
        headers: {
          "x-token": `Bearer ${token}`,
        },
      };
      axios
        .post(apiUrl + "user/addLead", formData, headers)
        .then((resp) => {
          data.userid=resp?.data?.data?.saveDetails?.userid;
          if (resp?.data.success) {
            props.history.push({
              pathname: "/vehicleInformation",
              data: data,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  const restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <>
     {/* <Header /> */}

      <div className="content-body">
        <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="container-fluid">
            <div className="row emi_row ">
              <div className="col-lg-12">
                <div className="card widget-stat">
                  <div className="card-header bg-custom-blue ">
                    <h4 className="card-title text-white">Personal Details</h4>
                  </div>
                  <div className="card-body">
                    <div className="form-validation">
                      <Row>
                        <Col sm={6}>
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
                              defaultValue={
                                prevData.location.state?.detail?.firstName
                              }
                              placeholder="Enter first name.."
                              ref={register({
                                required: "This is required ",

                                // pattern: {
                                //   value: /^[a-zA-Z]+$/,
                                //   message: "Enter Valid First Name",
                                // },
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
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label
                              className="col-form-label"
                              for="val-username"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="lastName"
                              placeholder="Enter last name.."
                              defaultValue={
                                prevData.location.state?.detail?.lastName
                              }
                              ref={register({
                                pattern: {
                                  value: /^[a-zA-Z]+$/,
                                  message: "Enter Valid Last Name",
                                },
                              })}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="lastName"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div>
                        </Col>

                        <Col sm={6}>
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
                              placeholder="Enter email.."
                              defaultValue={
                                prevData.location.state?.detail?.email
                              }
                              ref={register({
                                // required: "This is required ",
                                pattern: {
                                  value: /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/,
                                  message: "Enter Valid Email id",
                                },
                              })}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="email"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label
                              className="col-form-label"
                              for="val-username"
                            >
                              Mobile Number
                              <span className="text-danger">*</span>
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="phoneNo"
                              maxLength="10"
                              onKeyPress={(e) => restrictAlpha(e)}
                              defaultValue={
                                prevData.location.state?.detail?.phoneNo
                              }
                              placeholder="Enter mobile number.."
                              onChange={() => seterrorMsg("")}
                              ref={register({
                                required: "This is required ",
                                minLength: {
                                  value: 10,
                                  message: "Number not less than 10 digit",
                                },
                                pattern: {
                                  value: /^[5-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/,
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
                        </Col>

                        <Col sm={6}>
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
                              name="companyName"
                              placeholder="Enter company number.."
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
                              name="companyName"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label
                              className="col-form-label"
                              for="val-username"
                            >
                              Father’s Name
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="fatherName"
                              placeholder="Enter father’s name.."
                              defaultValue={
                                prevData.location.state?.detail?.fatherName
                              }
                              ref={register({
                                // pattern: {
                                //   value: /^[a-zA-Z]+$/,
                                //   message: "Enter Valid father Name",
                                // },
                              })}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="fatherName"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label
                              className="col-form-label"
                              for="val-username"
                            >
                              Date of Birth
                            </label>

                            <input
                              type="date"
                              className="form-control"
                              id="val-username"
                              name="dateOfBirth"
                              defaultValue={
                                prevData.location.state?.detail?.dateOfBirth
                              }
                              max={moment(
                                moment(new Date())
                                  .subtract(18, "years")
                                  .calendar()
                              ).format("YYYY-MM-DD")}
                              placeholder="Enter date of birth.."
                              ref={register({
                                // required: "This is required ",
                                pattern: {
                                  value: /^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))$/,
                                  message: "Enter Valid date of birth..",
                                },
                              })}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="dateOfBirth"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div>
                        </Col>
                        <Col sm={12} className="d-flex mt-4">
                          <button type="submit" className="btn btn-primary">
                            Next
                          </button>{" "}
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
