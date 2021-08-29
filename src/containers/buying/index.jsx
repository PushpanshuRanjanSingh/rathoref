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
import { ErrorMessage } from "@hookform/error-message";

function Index(props) {
  const { register, errors, handleSubmit } = useForm();
  const [inputfile, setinputfile] = useState("Choose File");
  const [personaldata, setpersonaldata] = useState(props);

  const onSubmit = (data) => {
  

    if (data?.photoUpload) {
     
      data.photoUpload = data.photoUpload;
    }

    var newdata = { ...data, ...personaldata.location.data };
  

    props.history.push({
      pathname: "/Documents",
      data: newdata,
    });
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
                    <h4 className="card-title text-white">
                      Exchange Vehicles Details
                    </h4>
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
                              Company
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="exchangeCompany"
                              placeholder="Enter company.."
                              ref={register}
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label
                              className="col-form-label"
                              for="val-username"
                            >
                              Year of registration
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="val-username"
                              name="yearOfRegistration"
                              placeholder="Enter year of registration.."
                              ref={register}
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label
                              className="col-form-label"
                              for="val-username"
                            >
                              Model
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="model"
                              placeholder="Enter Model.."
                              ref={register}
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label
                              className="col-form-label"
                              for="val-username"
                            >
                              Registration No.
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              onKeyPress={(e) => restrictAlpha(e)}
                              name="registrationNumber"
                              placeholder="Enter registration No..."
                              ref={register}
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label
                              className="col-form-label"
                              for="val-username"
                            >
                              Photo (Upload)
                            </label>

                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input form-control"
                                ref={register}
                                name="photoUpload"
                                onChange={(e) =>
                                  setinputfile(e.target.files[0].name)
                                }
                              />
                              <label className="custom-file-label">
                                {inputfile}
                              </label>
                            </div>
                          </div>
                        </Col>

                        <Col sm={12} className="d-flex mt-4">
                          <Link className="mr-2" to="/newleads">
                            {" "}
                            <button type="submit" className="btn btn-primary">
                            Previous
                            </button>
                          </Link>{" "}
                         
                          <button type="submit" className="btn btn-primary">
                            Next
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
    </>
  );
}

export default Index;
