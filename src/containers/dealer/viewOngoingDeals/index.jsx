import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../../../globals/config';
import Header from '../../header/header';
import * as constant from "../../../services/constant";
import showNotification from "../../../services/notificationService";
import { param } from 'jquery';
var fileDownload = require('js-file-download');
function ViewProfile(props) {
  if (!props.location.data) {
    props.history.push({
      pathname: '/',
    });
  }

  const history = useHistory();
  
  const [post, setpost] = useState([]);
  const [pramsdata, setpramsdata] = useState(props.location.data);
  const [blockData, setblockData] = useState([]);
  const [state, setState] = React.useState('');
  const [role, setRole] = useState();
  useEffect(() => {
    getLeads();
    let role = localStorage.getItem('role');
    setRole(role);
  }, []);
  const getLeads = () => {
    axios
      .post(apiUrl + 'user/verifyNo', props.location.data)
      .then((response) => {
        let data = response.data.data;
        data.commercialUse = response.data?.data?.vehicle?.commercialUse;
        data.vehicleToExchanghe =
          response.data?.data?.vehicle?.vehicleToExchanghe;
        data.chequeBook = response.data?.data?.docs?.chequeBook;
        setState(data);
        setblockData([data.block]);
        setpost([{ Name: data.postOffice }]);
      })
      .catch(function (error) {
        showNotification("danger", error.message);
      });
  };
  function download(url, name) {
    var fileName = name + '.' + url.split('.')[1];

    axios
      .get(apiUrl + url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, fileName);
      });
  }
  if(state&&state?.vehicles[0]){

  
  }
  return (
    <>
   
      <div className='content-body'>
        <div className='container-fluid'>
          <div className='row justify-content-center h-100 align-items-center emi_row'>
            <div className='col-md-12'>
              <div className='card widget-stat'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>Personal Details</h4>

                  <div className='two_btns_ps'></div>
                </div>

                <div className='card-body'>
                  <div className='form-validation'>
                    <div className='profile-personal-info'>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            First Namee <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state.firstName ? state.firstName : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Last Name <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state.lastName ? state.lastName : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Father's Name <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state.fatherName
                              ? state.fatherName
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Email<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state.email ? state.email : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Mobile Number <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state.phoneNo ? state.phoneNo : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Date of Birth <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state.dateOfBirth
                              ? state.dateOfBirth
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                    </div>
                  </div>
                </div>
              </div>

              <div className='card widget-stat'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>Vehicle Information</h4>

                  <div className='two_btns_ps'></div>
                </div>

                <div className='card-body'>
                  <div className='form-validation'>
                    <div className='profile-personal-info'>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Wheels <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state &&state?.vehicles[0]
                              ? state?.vehicles[0]?.wheels
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Brand<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state?.vehicles[0]
                              ? state?.vehicles[0]?.brand[0]?.brandName
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Type <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state?.vehicles[0]
                              ? state?.vehicles[0]?.type[0]?.type
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Vehicle Name<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state?.vehicles[0]
                              ?state?.vehicles[0]?.vehicleID[0]?.vehicleName
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Variants<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state?.vehicles[0]
                              ? state?.vehicles[0]?.variants[0]?.variantName
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            No. of Units<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state?.vehicle?.noOfUnits
                              ? state?.vehicles[0]?.noOfUnits
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                    </div>
                  </div>
                </div>
              </div>

              <div className='card widget-stat'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>Address</h4>

                  <div className='two_btns_ps'></div>
                </div>

                <div className='card-body'>
                  <div className='form-validation'>
                    <div className='profile-personal-info'>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Pin Code <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state?.pincode ? state?.pincode : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            District<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state?.district ? state.district : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Post Office <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state?.postOffice
                              ? state.postOffice
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Block<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state?.block ? state.block : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            City/Village<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state?.cityVillage
                              ? state.cityVillage
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Address<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state?.address ? state.address : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Landmark<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state.landmark ? state.landmark : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                    </div>
                  </div>
                </div>
              </div>
              {role == constant.INSURANCE ? (
                ''
              ) : (
                <>
                  <div className='card widget-stat'>
                    <div className='card-header bg-custom-blue '>
                      <h4 className='card-title text-white'>Buying Details</h4>

                      <div className='two_btns_ps'></div>
                    </div>

                    <div className='card-body'>
                      <div className='form-validation'>
                        <div className='profile-personal-info'>
                          <div className='row mb-2'>
                            <div className='col-sm-3 col-5'>
                              <h6 className='f-w-500'>
                                Finance Schemes
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {state && state?.vehicle?.financeSchemes
                                  ? state.vehicle.financeSchemes
                                  : 'N/A'}{' '}
                              </span>
                            </div>
                          </div>
                          <div className='row mb-2'>
                            <div className='col-sm-3 col-5'>
                              <h6 className='f-w-500'>
                                Buying Timeline
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {state && state?.vehicle?.buyingTimeline
                                  ? state.vehicle.buyingTimeline
                                  : 'N/A'}{' '}
                              </span>
                            </div>
                          </div>{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {role == constant.FINANCER || role == constant.INSURANCE ? (
                ''
              ) : (
                <div className='card widget-stat'>
                  <div className='card-header bg-custom-blue '>
                    <h4 className='card-title text-white'>Exchange Vehicle</h4>

                    <div className='two_btns_ps'></div>
                  </div>

                  <div className='card-body'>
                    <div className='form-validation'>
                      <div className='profile-personal-info'>
                        <div className='row mb-2'>
                          <div className='col-sm-3 col-5'>
                            <h6 className='f-w-500'>
                              Company <span className='pull-right'>:</span>
                            </h6>
                          </div>
                          <div className='col-sm-9 col-7'>
                            <span>
                              {state && state?.vehicle?.exchangeCompany
                                ? state.vehicle.exchangeCompany
                                : 'N/A'}{' '}
                            </span>
                          </div>
                        </div>
                        <div className='row mb-2'>
                          <div className='col-sm-3 col-5'>
                            <h6 className='f-w-500'>
                              Year of registration
                              <span className='pull-right'>:</span>
                            </h6>
                          </div>
                          <div className='col-sm-9 col-7'>
                            <span>
                              {state && state?.vehicle?.yearOfRegistration
                                ? state.vehicle.yearOfRegistration
                                : 'N/A'}{' '}
                            </span>
                          </div>
                        </div>{' '}
                        <div className='row mb-2'>
                          <div className='col-sm-3 col-5'>
                            <h6 className='f-w-500'>
                              Model <span className='pull-right'>:</span>
                            </h6>
                          </div>
                          <div className='col-sm-9 col-7'>
                            <span>
                              {state && state?.vehicle?.model
                                ? state.vehicle.model
                                : 'N/A'}{' '}
                            </span>
                          </div>
                        </div>{' '}
                        <div className='row mb-2'>
                          <div className='col-sm-3 col-5'>
                            <h6 className='f-w-500'>
                              Registration No.
                              <span className='pull-right'>:</span>
                            </h6>
                          </div>
                          <div className='col-sm-9 col-7'>
                            <span>
                              {state && state?.vehicle?.registrationNumber
                                ? state.vehicle.registrationNumber
                                : 'N/A'}{' '}
                            </span>
                          </div>
                        </div>{' '}
                        <div className='row mb-2'>
                          <div className='col-sm-3 col-5'>
                            <h6 className='f-w-500'>
                              Photo (Uploaded)
                              <span className='pull-right'>:</span>
                            </h6>
                          </div>
                          <div className='col-sm-9 col-7'>
                            <span>
                              <Image
                                className='doc_image'
                                alt='img'
                                src={
                                  state && state?.vehicle?.photoUpload
                                    ? apiUrl + state.vehicle.photoUpload
                                    : 'N/A'
                                }
                              />
                            </span>
                          </div>
                        </div>{' '}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className='card widget-stat'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>Customer Document</h4>

                  <div className='two_btns_ps'></div>
                </div>

                <div className='card-body'>
                  <div className='form-validation'>
                    <div className='profile-personal-info'>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Aadhaar Number <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state?.docs?.aadharNo
                              ? state.docs.aadharNo
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2 align-items-center'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Upload Aadhaar Card{' '}
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7  d-flex align-items-center'>
                         
                          <span className='file-name-box'>
                            {state && state.docs?.aadharDoc
                              ? state.docs.aadharDoc
                              : 'N/A'}
                          </span>
                          {state && state.docs?.aadharDoc ? (
                            <button
                              type='button'
                              onClick={(e) => download(state.docs.aadharDoc)}
                              class='btn btn-dark  bg-dark-cus ml-auto'>
                              <i
                                class='fa fa-cloud-download pr-1'
                                aria-hidden='true'></i>
                              <span>Download</span>
                            </button>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            PAN <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7 '>
                          <span>
                            {state && state.docs?.pan ? state.docs.pan : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2 align-items-center'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            PAN (Uploaded)<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7 d-flex align-items-center'>
                          
                          <span className='file-name-box'>
                            {state && state.docs?.panDoc
                              ? state.docs.panDoc
                              : 'N/A'}
                          </span>
                          {state && state.docs?.panDoc ? (
                            <button
                              type='button'
                              onClick={(e) => download(state.docs.panDoc)}
                              class='btn btn-dark  bg-dark-cus ml-auto'>
                              <i
                                class='fa fa-cloud-download pr-1'
                                aria-hidden='true'></i>
                              <span>Download</span>
                            </button>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>{' '}
                    </div>
                  </div>
                </div>
              </div>
               <div className="card widget-stat">
                <div className="card-header bg-custom-blue ">
                  <h4 className="card-title text-white">Bank Details</h4>
                   <div className="two_btns_ps"></div>
                </div>
                <div className="card-body">
                  <div className="form-validation">
                    <div className="profile-personal-info">
                      <div className="row mb-2">
                        <div className="col-sm-3 col-5">
                          <h6 className="f-w-500">
                            Bank Name <span className="pull-right">:</span>
                          </h6>
                        </div>
                        <div className="col-sm-9 col-7">
                          <span>
                            {state && state.docs?.bankName
                              ? state.docs.bankName
                              : "N/A"}{" "}
                          </span>
                        </div>
                      </div>
                      <div className="row mb-2 align-items-center">
                        <div className="col-sm-3 col-5">
                          <h6 className="f-w-500">
                            Bank Passbook (Uploaded)
                            <span className="pull-right">:</span>
                          </h6>
                        </div>
                        <div className="col-sm-9 col-7 d-flex align-items-center">
                         <span className="file-name-box">
                            {state && state.docs?.bankDoc
                              ? state.docs.bankDoc
                              : "N/A"}
                          </span>
                          {state && state.docs?.bankDoc ? (
                            <button
                              type="button"
                              onClick={(e) => download(state.docs.bankDoc)}
                              class="btn btn-dark  bg-dark-cus ml-auto"
                            >
                              <i
                                class="fa fa-cloud-download pr-1"
                                aria-hidden="true"
                              ></i>
                              <span>Download</span>
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>{" "}
                      <div className="row mb-2">
                        <div className="col-sm-3 col-5">
                          <h6 className="f-w-500">
                            A/C No. <span className="pull-right">:</span>
                          </h6>
                        </div>
                        <div className="col-sm-9 col-7">
                          <span>
                            {state && state.docs?.acNo
                              ? state.docs.acNo
                              : "N/A"}{" "}
                          </span>
                        </div>
                      </div>{" "}
                      <div className="row mb-2">
                        <div className="col-sm-3 col-5">
                          <h6 className="f-w-500">
                            Account Holder<span className="pull-right">:</span>
                          </h6>
                        </div>
                        <div className="col-sm-9 col-7">
                          <span>
                            {state && state.docs?.accountHolder
                              ? state.docs.accountHolder
                              : "N/A"}{" "}
                          </span>
                        </div>
                      </div>{" "}
                      <div className="row mb-2">
                        <div className="col-sm-3 col-5">
                          <h6 className="f-w-500">
                            IFSC code<span className="pull-right">:</span>
                          </h6>
                        </div>
                        <div className="col-sm-9 col-7">
                          <span>
                            {state && state.docs?.ifscCode
                              ? state.docs.ifscCode
                              : "N/A"}{" "}
                          </span>
                        </div>
                      </div>{" "}
                      <div className="row mb-2">
                        <div className="col-sm-3 col-5">
                          <h6 className="f-w-500">
                            Do you have cheque book?
                            <span className="pull-right">:</span>
                          </h6>
                        </div>
                        <div className="col-sm-9 col-7">
                          <span>
                            {state && state.docs?.chequeBook
                              ? state.docs.chequeBook
                              : "N/A"}{" "}
                          </span>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
            
              {role == constant.INSURANCE ? (
                <>
                  <div className='card widget-stat'>
                    <div className='card-header bg-custom-blue '>
                      <h4 className='card-title text-white'>Vehicle Document</h4>

                      <div className='two_btns_ps'></div>
                    </div>

                    <div className='card-body'>
                      <div className='form-validation'>
                        <div className='profile-personal-info'>
                         <div className="row mb-2 align-items-center">
                        <div className="col-sm-3 col-5">
                          <h6 className="f-w-500">
                          Tax Invoice{" "}
                            <span className="pull-right">:</span>
                          </h6>
                        </div>
                        <div className="col-sm-9 col-7  d-flex align-items-center">
                       
                          <span className="file-name-box">
                            {state && state?.taxInvoiceL2
                              ? apiUrl + state.taxInvoiceL2
                              : "N/A"}
                          </span>
                          {state && state?.taxInvoiceL2 ? (
                            <button
                              type="button"
                              onClick={(e) => download(state.taxInvoiceL2,"taxinvoice")}
                              class="btn btn-dark  bg-dark-cus ml-auto"
                            >
                              <i
                                class="fa fa-cloud-download pr-1"
                                aria-hidden="true"
                              ></i>
                              <span>Download</span>
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>{" "}
                    
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-12 d-flex '>
                      <button
                        type='button'
                        className='btn btn-primary mr-2 tp-cus-btn'
                        onClick={() => history.goBack()}>
                        Back
                      </button>
                    </div>
                  </div>
                </>
              ) : <div className='col-lg-12 d-flex '>
              <button
                type='button'
                className='btn btn-primary mr-2 tp-cus-btn'
                onClick={() => history.goBack()}>
                Back
              </button>
            </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewProfile;
