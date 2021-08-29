import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";

import Header from "../header/header";
import Footer from "../footer/footer";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import { useForm } from "react-hook-form";
import apiUrl from "../../globals/config"
function Index(props) {
  const { register, handleSubmit } = useForm();
  const [personaldata, setpersonaldata] = useState(props);
  const [loading, setloading] = useState(false);
  const [inputfilead, setinputfilead] = useState("Choose File");
  const [successMsg, setsuccessMsg] = useState("");
  const [errorMsg, seterrorMsg] = useState("");


  const [inputfilepan, setinputfilepan] = useState("Choose File");
  const [inputfile, setinputfile] = useState("Choose File");


  const onSubmit = (data) => {
    var newdata = { ...data, ...personaldata.location.data };
   
    props.history.push({
      pathname: "/bankDetails",
      data: newdata,
    });

   
  };
  const restrictAlpha =(e)=>{
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  return (
    <>
    

        <div className="content-body">
        <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="container-fluid">


            <div className="row emi_row ">
              <div className="col-lg-12">
                <div className="card widget-stat">
                  <div className="card-header bg-custom-blue ">
                    <h4 className="card-title text-white">Upload Documents</h4>
                  </div>
                  <div className="card-body">
                    <div className="form-validation">
                      <Row>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label className="col-form-label" for="val-username">
                              Aadhaar card Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="aadharNo"
                              placeholder="Enter Aadhaar Number"
                              onKeyPress={(e) => restrictAlpha(e)}
                             
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label className="col-form-label" for="val-username">
                              Upload Aadhaar Card
                            </label>

                            <div className="custom-file">
                              <input
                                type="file"
                                name="aadharDoc"
                                className="custom-file-input form-control"
                                ref={register}
                                onChange={(e) =>
                                  setinputfilead(e.target.files[0].name)
                                }
                              />
                              <label className="custom-file-label">
                                {inputfilead}
                              </label>
                            </div>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label className="col-form-label" for="val-username">
                              PAN
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="pan"
                              placeholder="Enter pan name.."
                              ref={register}
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label className="col-form-label" for="val-username">
                              PAN (Upload)
                            </label>

                            <div className="custom-file">
                              <input
                                type="file"
                                name="panDoc"
                                className="custom-file-input form-control"
                                ref={register}
                                onChange={(e) =>
                                  setinputfilepan(e.target.files[0].name)
                                }
                              />
                              <label className="custom-file-label">
                                {inputfilepan}
                              </label>
                            </div>
                          </div>
                        </Col>



                        <Col sm={12} className="d-flex mt-4">
                          <Link className="mr-2" to="/buying">
                            {" "}
                            <button type="submit" className="btn btn-primary">
                            Previous
                            </button>
                          </Link>
                           {/* <Link className="" to="/bankDetails"> */}
                          {" "} 

                          <button type="submit" className="btn btn-primary">
                            Next
                          </button>
                           {/* </Link>  */}
                        </Col>
                      </Row>
                      <p className="successMag" >{successMsg}</p>
                      <p className="error" >{errorMsg}</p>
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
