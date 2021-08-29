import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import axios from "axios";
import base from "../../globals/base";
import Header from "../header/header";
import Footer from "../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import apiUrl from "../../globals/config";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function Index(props) {
  const [state, setState] = React.useState({
    district: "",
    block: "",
  });
  const [prevData, setprevData] = useState(props);
  const [post, setpost] = useState([]);
  const { register, errors, handleSubmit } = useForm();
  const [personaldata, setpersonaldata] = useState(props);
  const [districtData, setdistrictData] = useState([]);
  const [blockData, setblockData] = useState([]);

  useEffect(() => {
    if(prevData?.location?.state?.detail?.pincode){
      getPotOffice(prevData?.location?.state?.detail?.pincode);

    }
  
  
  }, []);
 const getPotOffice = (e)=> {
    
    axios
    .get("https://api.postalpincode.in/pincode/" + e)
    .then((res) => {
      if (res?.data?.[0]?.PostOffice) {
        setpost(res.data[0].PostOffice);
        let obj = {
          district: res.data[0].PostOffice[0].District,
          pincode: e,
        };
        setState({
          ...state,
          ...obj,
        });
        gitBlock(res.data[0].PostOffice[0].District);
      }
     
    });

  }
  const gitDistrict = () => {
    axios.get(apiUrl + "user/getuniqueDistrict").then((res) => {
      setdistrictData(res.data.message);
      gitBlock(res.data.message[0]);
    });
  };
  const gitBlock = (value) => {
 
    axios.get(apiUrl + "user/getDistrict?district=" + value).then((res) => {
      setblockData(res.data.message);
   
    });
  };

  const onSubmit = (data) => {
    var newdata = { ...data, ...personaldata.location.data };
   

    props.history.push({
      pathname: "/buyingDetails",
      data: newdata,
    });

  };
  const restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };
  const checkpincode = (e) => {
  
    if (e.target.value) {
      
      let pincode = e.target.value;
     
      axios
        .get("https://api.postalpincode.in/pincode/" + e.target.value)
        .then((res) => {
          if (res?.data?.[0]?.PostOffice) {
            setpost(res.data[0].PostOffice);
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
  const handleBackRequest = (e) => {
    e.preventDefault();
    props.history.push({
      pathname: "/vehicleInformation",
      state: { detail: personaldata.location.data },
    });
  };
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  const handleChangedist = (evt) => {

    const value1 = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value1,
    });
    gitBlock(evt.target.value);
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
                    <h4 className="card-title text-white">Address</h4>
                  </div>
                  <div className="card-body">
                    <div className="form-validation">
                      <Row>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label className="col-form-label" for="val-username">
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
                              defaultValue={
                                prevData.location.state?.detail?.pincode
                              }
                              placeholder="Enter pin code.."
                              ref={register({
                                pattern: {
                                  value: /^[0-9][0-9][0-9][0-9][0-9][0-9]$/,
                                  message: "Enter Valid  Pin Code",
                                },
                              })}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="pincode"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label className="col-form-label" for="val-username">
                            District
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="district"
                              value={state.district}
                             
                              placeholder="Enter District name.."
                              ref={register}
                            />
                          </div>
                        </Col>
                        
                        <Col sm={6}>
                        <div className="form-group ">
                            <label className="col-form-label" for="val-username">
                            Post Office
                            </label>
                            <select
                              className="form-control custom-control"
                              id="exampleFormControlSelect1"
                              name="postOffice"
                              ref={register}
                              // defaultValue={}
                            >
                              {post.map((name, index) => {
                               
                                if(prevData?.location?.state?.detail?.postOffice == name?.Name){
                                  return(
                                    <option selected>{name?.Name}</option>
                                  )

                                }
                                else{
                                  return(
                                    <option>{name?.Name}</option>
                                  )

                                }
                               })}
                            </select>
                          </div>
                          
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label className="col-form-label" for="val-username">
                              Block
                            </label>
                            <select
                              className="form-control custom-control"
                              id="exampleFormControlSelect1"
                              name="block"
                              ref={register}
                              defaultValue={state.block}
                              onChange={handleChange}
                            >
                              {blockData.length != 0 &&
                                blockData.map((options, index) => (
                                  <option>{options.block}</option>
                                ))}
                            </select>
                            
                          </div>
                        </Col>

                        <Col sm={6}>
                          <div className="form-group ">
                            <label className="col-form-label" for="val-username">
                              City/Village
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="cityVillage"
                              defaultValue={
                                prevData.location.state?.detail?.cityVillage
                              }
                              placeholder="Enter city-village name.."
                              ref={register}
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label className="col-form-label" for="val-username">
                              Address
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="address"
                              defaultValue={
                                prevData.location.state?.detail?.address
                              }
                              placeholder="Enter address.."
                              ref={register}
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="form-group ">
                            <label className="col-form-label" for="val-username">
                              Landmark
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              id="val-username"
                              name="landmark"
                              defaultValue={
                                prevData.location.state?.detail?.landmark
                              }
                              placeholder="Enter landmark name.."
                              ref={register}
                            />
                          </div>
                        </Col>
                        <Col sm={12} className="d-flex mt-4">
                          <button
                            type="button"
                            className="btn btn-primary mr-2"
                            onClick={(e) => {
                              handleBackRequest(e);
                            }}
                          >
                            Previous
                          </button>
                         
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
