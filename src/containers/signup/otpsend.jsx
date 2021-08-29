import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import base from "../../globals/base";
import Header from "../header/header";
import Footer from "../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";
import { ErrorMessage } from "@hookform/error-message";
import apiUrl from "../../globals/config"

const axios = require("axios").default;
function Otpsend(props) {
  // const [status, setstatus] = useState(false);
  const [hide, sethide] = useState(true);
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {

    props.setShare(data.phoneNo)
    axios
      .post(apiUrl + "user/register", data)
      .then(function (response) {
        // if (response?.data.token) {
        // localStorage.setItem('myData', response.data.token);
        // history.push('/');
        // }
        // setstatus(false);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  const restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  return (
    <div className="h-100" style={{
      backgroundImage: "url("
        + "/assets/images/bg_signin.png" + ")"
    }}>

      <form autocomplete="off" onSubmit={handleSubmit(onSubmit)} style={{ "height": "100%" }}>
        <div className="container-fluid h-100">
          <div className="row emi_row  row justify-content-center h-100 align-items-center">
            <div className="col-lg-12 my-5">
              <div className="card widget-stat signup_card">
                <div className="card-header bg-custom-blue ">
                  <h4 className="card-title text-white">
                    Signup your account
                  </h4>
                </div>

                <div className="card-body">
                  <div className="form-validation">
                    <Row>
                      <Col sm={12}>
                        <div className="form-group ">
                          <label className="col-form-label pt-0" for="val-username">
                            Mobile Number{" "}
                          </label>
                          <input name="phoneNo" className="form-control" maxLength="10" placeholder=" Enter a mobile number"
                            onKeyPress={(e) => restrictAlpha(e)}
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
                          <ErrorMessage errors={errors} name="phoneNo" render={({ message }) =>
                            <p className="error">{message}</p>}
                          />
                        </div>
                      </Col>
                      <Col sm={12} className="d-flex justify-content-end my-3">
                        <button className="btn btn-secondary" value="otp" // onSubmit={(e)=> otpFunction(e)}
                        >
                          Send Otp
                        </button>
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

  );
}

export default Otpsend;