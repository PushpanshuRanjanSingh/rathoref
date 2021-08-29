import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";

import Header from "../header/header";
import Footer from "../footer/footer";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import { useForm } from "react-hook-form";
import apiUrl from "../../globals/config";
function Index(props) {
  const { register, handleSubmit } = useForm();
  const [personaldata, setpersonaldata] = useState(props);
  const [loading, setloading] = useState(false);
  const [inputfilead, setinputfilead] = useState("Choose File");
  const [successMsg, setsuccessMsg] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [inputfilepan, setinputfilepan] = useState("Choose File");
  const [inputfile, setinputfile] = useState("Choose File");

  if(!personaldata.location?.data?.phoneNo){
    props.history.push({
      pathname: "/newleads",
  
    });
   }

  const onSubmit = (data) => {
   
     if(!personaldata.location?.data?.phoneNo){
      props.history.push({
        pathname: "/newleads",
    
      });
     }
   
      var newdata = { ...data, ...personaldata.location.data };
     
    
      const formData = new FormData();
      Object.keys(newdata).forEach((key) => {
        if(newdata[key]){
          if(key==='aadharDoc' || key==='panDoc' || key==='bankDoc' || key==='photoUpload'){
            if(newdata[key][0]){
              formData.append([key], newdata[key][0]);
            }
        }else{
          formData.append([key], newdata[key]);
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
      .post(apiUrl+"user/addLead", formData, headers)
      .then((resp) => {
       
        if (resp?.data.success) {
          setloading(false);
          setsuccessMsg("Lead added successfully.");
          seterrorMsg("");
        
         props.history.push("/leads");
        }
        
      })
      .catch((err) => {
         seterrorMsg("Something Went wrong..");
         setsuccessMsg("");
        console.log(err);
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
                    <h4 className="card-title text-white">Bank Details</h4>
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
                              Bank Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="bankDetails"
                              placeholder="Enter  bank Name.."
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
                              Bank Passbook (Upload)
                            </label>

                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input form-control"
                                name="bankDoc"
                                ref={register}
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
                        <Col sm={6}>
                          <div className="form-group ">
                            <label
                              className="col-form-label"
                              for="val-username"
                            >
                              A/C No.
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="bankDetails"
                              onKeyPress={(e) => restrictAlpha(e)}
                              placeholder="Enter  A/C No..."
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
                              Account Holder
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="bankDetails"
                              placeholder="Enter account holder name..."
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
                              IFSC code
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="bankDetails"
                              placeholder="Enter IFSC code..."
                              ref={register}
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
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
                                  className="w-auto ml-2 input_cus_radio"
                                  id="chequeBookY"
                                  name="chequeBook"
                                  ref={register}
                                  // value={true}
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
                                  className="w-auto ml-2 input_cus_radio"
                                  id="chequeBookN"
                                  name="chequeBook"
                                  ref={register}
                                  // value={false}
                                />
                                <label
                                  className="check-label"
                                  for="chequeBookN"
                                >
                                  No{" "}
                                </label>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col sm={12} className="d-flex mt-4">
                          <Link className="mr-2" to="/Documents">
                            {" "}
                            <button type="submit" className="btn btn-primary">
                            Previous
                            </button>
                          </Link>
                          {/* <Link className="" to="/buying">
                          {" "} */}

                          <button type="submit" className="btn btn-primary">
                            Save
                          </button>
                          {/* </Link> */}
                        </Col>
                      </Row>
                      <p className="successMag">{successMsg}</p>
                      <p className="error">{errorMsg}</p>
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
