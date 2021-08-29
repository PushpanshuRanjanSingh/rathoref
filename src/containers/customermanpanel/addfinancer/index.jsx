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
  const [heading, setheading] = useState("Financer Details");
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
  const [errorMsg, seterrorMsg] = useState("");
  const [SelectedDate, setSelectedDate] = useState(null);
  const [state, setState] = React.useState();
  const onSubmit = (formsubmitdata) => {
   
    if (formToggle == 1) {
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
              setformToggle(2);
              setheading("financer Point of Contact");
            }
          });
      }
    } else {
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
        .post(apiUrl + "user/saveFinancerProfile", formData, headers)
        .then((resp) => {
          props.history.goBack();
         })
        .catch((err) => {
          showNotification("danger", err.message);
        });
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
    setheading("Financer Details");
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
                       <div className='row'>
                       <div className='col-lg-6'>
                         <div className='form-group '>
                           <label
                             className='col-form-label'
                             for='val-username'>
                             First Name<span className='text-danger'>*</span>
                           </label>

                           <input
                             type='text'
                             className='form-control'
                             id='val-username'
                             name='firstName'
                             // defaultValue={state?.firstName}
                             //  defaultValue={viewData?.firstName}
                             placeholder='Enter name..'
                             value={state?.firstName}
                             onChange={handleChange}
                             ref={register({
                               required: 'This is required ',
                               
                             })}
                           />
                           <ErrorMessage
                             errors={errors}
                             name='firstName'
                             render={({ message }) => (
                               <p className='error'>{message}</p>
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
                         
                       <div className='col-lg-6'>
                         <div className='form-group '>
                           <label
                             className='col-form-label'
                             for='val-username'>
                             Company Name
                           </label>
                           <input
                             type='text'
                             className='form-control'
                             id='val-username'
                             name='companyName'
                             placeholder='Enter  Company Name..'
                             ref={register}
                             value={state?.companyName}
                             onChange={handleChange}
                             defaultValue={
                               state && state?.docs && state?.docs[0]
                                 ? state?.docs[0].companyName
                                 : ''
                             }
                           />
                         </div>
                       </div>
                       <div className='col-lg-6'>
                         <div className='form-group '>
                           <label
                             className='col-form-label'
                             for='val-username'>
                             CIN
                           </label>
                           <input
                             type='text'
                             className='form-control'
                             id='val-username'
                             name='cin'
                             value={state?.cin}
                             onChange={handleChange}
                             // onKeyPress={(e) => restrictAlpha(e)}
                             placeholder='Enter  CIN No...'
                             ref={register}
                             defaultValue={
                               state && state?.docs && state?.docs[0]
                                 ? state?.docs[0].cin
                                 : ''
                             }
                           />
                         </div>
                       </div>
                       <div className='col-lg-6'>
                         <div className='form-group '>
                           <label
                             className='col-form-label'
                             for='val-username'>
                             GST
                           </label>
                           <input
                             type='text'
                             className='form-control'
                             id='val-username'
                             name='gst'
                             value={state?.gst}
                             onChange={handleChange}
                             placeholder='Enter GST number...'
                             ref={register}
                             defaultValue={
                               state && state?.docs && state?.docs[0]
                                 ? state?.docs[0].gst
                                 : ''
                             }
                           />
                         </div>
                       </div>
                       <div className='col-lg-6'>
                         <div className='form-group '>
                           <label
                             className='col-form-label'
                             for='val-username'>
                             PAN
                           </label>
                           <input
                             type='text'
                             className='form-control'
                             id='val-username'
                             onChange={handleChange}
                             value={state?.pan}
                             name='pan'
                             placeholder='Enter PAN number...'
                             ref={register}
                             defaultValue={
                               state && state?.docs && state?.docs[0]
                                 ? state?.docs[0].pan
                                 : ''
                             }
                           />
                         </div>
                       </div>
                       <div className='col-lg-6'>
                         <div className='form-group '>
                           <label
                             className='col-form-label'
                             for='val-username'>
                             Website
                           </label>
                           <input
                             type='text'
                             class='form-control'
                             id='val-username'
                             
                             name='website'
                             value={state?.website}
                             onChange={handleChange}
                             placeholder='Enter website..'
                             ref={register}
                           />
                         </div>
                       </div>
                       <div className='col-lg-6'>
                         <div className='form-group '>
                           <label
                             className='col-form-label'
                             for='val-username'>
                             Financer Code
                           </label>
                           <input
                             type='text'
                             class='form-control'
                             id='val-username'
                             name='financerCode'
                             value={state?.financerCode}
                             onChange={handleChange}
                             placeholder='Enter Financer Code..'
                             ref={register}
                           />
                         </div>
                       </div>

                       <div className='col-lg-6'>
                         <div className='form-group '>
                           <label
                             className='col-form-label'
                             for='val-username'>
                             Upload Profile Picture
                           </label>
                           <div class='custom-file'>
                             <input
                               type='file'
                               name='profilePic'
                               class='custom-file-input form-control'
                               // value={state?.profilePic}
                               // onChange={handleChange}
                               ref={register}
                               onChange={fileChange}
                             />
                             <label class='custom-file-label'>
                               {state?.profilePic?.name
                                 ? state?.profilePic?.name
                                 : 'Choose File'}
                             </label>
                           </div>
                         </div>
                       </div>

                       <div className='col-lg-12 d-flex justify-content-end'>
                         <button
                           type='submit'
                           className='btn btn-primary tp-cus-btn'>
                           Next
                         </button>
                       </div>
                       <p className='successMag'>{successMsg}</p>
                     </div>
                  
                    )}
                      {formToggle == 2 && (
                        <div className='row'>
                        <div className='col-lg-6'>
                          <div className='form-group '>
                            <label
                              className='col-form-label'
                              for='val-username'>
                              Name
                            </label>

                            <input
                              type='text'
                              className='form-control'
                              id='val-username'
                              name='fpcName'
                              // defaultValue={state?.firstName}
                              //  defaultValue={viewData?.firstName}
                              placeholder='Enter name..'
                              value={state?.fpcName}
                              onChange={handleChange}
                              ref={register({
                                
                              })}
                            />
                            <ErrorMessage
                              errors={errors}
                              name='fpcName'
                              render={({ message }) => (
                                <p className='error'>{message}</p>
                              )}
                            />
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group '>
                            <label
                              className='col-form-label'
                              for='val-username'>
                              Designation
                            </label>
                            <input
                              // type="number"
                              className='form-control'
                              // onKeyPress={(e) => restrictAlpha(e)}
                              id='val-username'
                              name='fpcDesignation'
                              value={state?.fpcDesignation}
                              onChange={handleChange}
                              placeholder='Enter Designation..'
                              ref={register}
                              defaultValue={viewData?.fpcDesignation}
                            />
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group '>
                            <label
                              className='col-form-label'
                              for='val-username'>
                              Mobile Number
                            </label>
                            <input
                              //  type="number"
                              className='form-control'
                              id='val-username'
                              name='fpcNumber'
                              maxLength='10'
                              value={state?.fpcNumber}
                              onChange={handleChange}
                              onKeyPress={(e) => restrictAlpha(e)}
                              placeholder='Enter mobile number...'
                              ref={register}
                              // defaultValue={viewDatanumber}
                            />
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group '>
                            <label
                              className='col-form-label'
                              for='val-username'>
                              Email<span className='text-danger'>*</span>
                            </label>
                            <input
                              type='email'
                              className='form-control'
                              id='val-username'
                              name='fpcEmail'
                              value={state?.fpcEmail}
                              onChange={handleChange}
                              placeholder='Enter email..'
                              ref={register({
                                // required: 'This is required ',
                                pattern: {
                                  value:
                                    /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/,
                                  message: 'Enter Valid Email id',
                                },
                              })}
                              defaultValue={viewData?.fpcEmail}
                            />
                            <ErrorMessage
                              errors={errors}
                              name='fpcEmail'
                              render={({ message }) => (
                                <p className='error'>{message}</p>
                              )}
                            />
                          </div>
                        </div>

                        <div className='col-lg-12 d-flex justify-content-end'>
                          <button
                            type='button'
                            className='btn btn-primary mr-2 tp-cus-btn'
                            onClick={handleSeconsRequest}>
                            Previous
                          </button>

                          <button
                            type='submit'
                            className='btn btn-primary tp-cus-btn'>
                            Save
                          </button>
                        </div>
                        <p className='successMag'>{successMsg}</p>
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
