import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../../../globals/config';
import Header from '../../header/header';
import { param } from 'jquery';

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
  const [statee, setStatee] = React.useState('');
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
        getLeadss(data.createdByDealer); // createdByDealer
       
        setState(data);
        setblockData([data.block]);
        setpost([{ Name: data.postOffice }]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getLeadss = (data) => {
    const userId = data;
    axios
      .post(apiUrl + 'user/verifyNo', { userId })
      .then((response) => {
        let data = response.data.data;
        data.commercialUse = response.data?.data?.vehicle?.commercialUse;
        data.vehicleToExchanghe =
          response.data?.data?.vehicle?.vehicleToExchanghe;
        data.chequeBook = response.data?.data?.docs?.chequeBook;
        // createdByDealer
       
        setStatee(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      {/* <Header /> */}
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
                            {state && state?.vehicle?.wheels
                              ? state?.vehicle?.wheels
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
                            {state && state?.vehicle?.brand
                              ? state?.vehicle?.brand
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
                            {state && state?.vehicle?.type
                              ? state?.vehicle?.type
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
                            {state && state?.vehicle?.vehicleName
                              ? state?.vehicle?.vehicleName
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
                            {state && state?.vehicle?.variants
                              ? state?.vehicle?.variants
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
                              ? state?.vehicle?.noOfUnits
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
              {role == 5 ? (
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

              {role == 4 || role == 5 ? (
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
                                    : 'assets/images/bg_signin_old.png'
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
                  <h4 className='card-title text-white'>Document</h4>

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
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Upload Aadhaar Card{' '}
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            <Image
                              className='doc_image'
                              alt='img'
                              src={
                                state && state.docs?.aadharDoc
                                  ? apiUrl + state.docs.aadharDoc
                                  : 'assets/images/bg_signin_old.png'
                              }
                            />
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            PAN <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state.docs?.pan ? state.docs.pan : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            PAN (Uploaded)<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            <Image
                              className='doc_image'
                              alt='img'
                              src={
                                state && state.docs?.panDoc
                                  ? apiUrl + state.docs.panDoc
                                  : 'assets/images/17.jpg'
                              }
                            />
                          </span>
                        </div>
                      </div>{' '}
                    </div>
                  </div>
                </div>
              </div>

              <div className='card widget-stat'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>Bank Details</h4>

                  <div className='two_btns_ps'></div>
                </div>

                <div className='card-body'>
                  <div className='form-validation'>
                    <div className='profile-personal-info'>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Bank Name <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state.docs?.bankName
                              ? state.docs.bankName
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Bank Passbook (Uploaded)
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            <Image
                              className='doc_image'
                              alt='img'
                              src={
                                state && state.docs?.bankDoc
                                  ? apiUrl + state.docs.bankDoc
                                  : 'assets/images/17.jpg'
                              }
                            />
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            A/C No. <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state.docs?.acNo
                              ? state.docs.acNo
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Account Holder<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state.docs?.accountHolder
                              ? state.docs.accountHolder
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            IFSC code<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state.docs?.ifscCode
                              ? state.docs.ifscCode
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Do you have cheque book?
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {state && state.docs?.chequeBook
                              ? state.docs.chequeBook
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>{' '}
                    </div>
                  </div>
                </div>
              </div>
              {/* deler detail  */}
              <div className='card widget-stat'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>Delear Details</h4>
                  {/* <h4 className="card-title text-white">Personal Details</h4> */}
                </div>

                <div className='card-body'>
                  <div className='form-validation'>
                    <div className='profile-personal-info'>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Dealership Name{' '}
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {statee && statee?.dealershipName
                              ? statee?.dealershipName
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            OEM Name <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {statee && statee.oemName ? statee.oemName : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Company Name
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {statee && statee?.companyName
                              ? statee?.companyName
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Contact Numbers
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {statee && statee.phoneNo ? statee.phoneNo : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Email<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {statee && statee.email ? statee.email : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card widget-stat'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>
                    Dealear Bank Account Details
                  </h4>
                </div>

                <div className='card-body'>
                  <div className='form-validation'>
                    <div className='profile-personal-info'>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            A/C No. <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {statee && statee.docs[0] && statee.docs[0].acNo
                              ? statee.docs[0].acNo
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Account Holder <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {statee &&
                            statee.docs[0] &&
                            statee.docs[0].accountHolder
                              ? statee.docs[0].accountHolder
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Bank Name <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {statee && statee.docs[0] && statee.docs[0].bankName
                              ? statee.docs[0].bankName
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            IFSC Code <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {statee && statee.docs[0] && statee.docs[0].ifscCode
                              ? statee.docs[0].ifscCode
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      {/* <div className="row mb-2">
                        <div className="col-sm-3 col-5">
                          <h6 className="f-w-500">
                            PAN Card Number <span className="pull-right">:</span>
                          </h6>
                        </div>
                        <div className="col-sm-9 col-7">
                          <span>
                            {statee &&
                              statee.docs[0] &&
                              statee.docs[0].pan
                              ? statee.docs[0].pan
                              : "N/A"}
                          </span>
                        </div>
                      </div> */}
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Bank Passbook Image{' '}
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <Image
                            className='doc_image'
                            alt='img'
                            src={
                              statee && statee?.docs[0]?.bankDoc
                                ? apiUrl + statee.docs[0].bankDoc
                                : 'assets/images/pan-card.jpg'
                            }
                          />
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Cancelled Cheque{' '}
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <Image
                            className='doc_image'
                            alt='img'
                            src={
                              statee && statee?.docs[0]?.cancelledCheque
                                ? apiUrl + statee.docs[0].cancelledCheque
                                : 'assets/images/pan-card.jpg'
                            }
                          />
                        </div>
                      </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewProfile;
