import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import axios from 'axios';
import apiUrl from '../../globals/config';
import Header from '../header/header';

function ViewProfile(props) {
  const [viewData, setViewData] = useState();
  const [viewDataa, setViewDataa] = useState([]);
  const [arrMulti, setarrMulti] = useState([]);
  const [msg, setmsg] = useState('');
  const [oemName, setoemName] = useState("")
  const [vechile, setvechile] = useState([]);
  const [id, setid] = useState('');
  useEffect(() => {
    getProfile();
    subdelear();
  }, []);
  const getbrand = (id) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "brand/getBrandId?id="+id, headers)
      .then((resp) => {
        setoemName(resp?.data?.data?.brandName)
     
      })
      .catch((err) => {
        // setsuccessMsg("");
        console.log(err);
      });
  };
  const getProfile = () => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'user/getProfile', headers)
      .then((resp) => {
        setViewData(resp.data.data[0]);
        getbrand(resp.data.data[0].oemName)
        setarrMulti(resp.data.data[0].vehicle[0].dealerVehicleType);
      })
      .catch((err) => {
        // setsuccessMsg("");
        console.log(err);
      });
  };
  const subdelear = () => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'subDealer/checksubDealer', headers)
      .then((resp) => {
        setid(resp?.data?.data[0]?._id);
       
        setViewDataa(resp?.data?.data[0]?.subDealership);
      })
      .catch((err) => {
        // setsuccessMsg("");
        console.log(err);
      });
  };

  const updatevtype = (evt) => {
    const { name, value } = evt.target;
    if (arrMulti.includes(value)) {
      arrMulti.splice(arrMulti.indexOf(value), 1);
    } else {
      arrMulti.push(value);
    }
    const dealerVehicleType = arrMulti;

    // const formData = new FormData();
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    const id = viewData?._id;
    const data = {
      _id: id,
      dealerVehicleType,
    };
    // formData.append(dealerVehicleType, dealerVehicleType);
    // formData.append("id", id);

    axios
      .post(apiUrl + 'User/dealerVehicleAdd', data, headers)
      .then((resp) => {
        setmsg('Vehicle Type update successfully!');

        setTimeout(() => {
          setmsg('');
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
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
                  <h4 className='card-title text-white'>Basic Details</h4>
                  {/* <h4 className="card-title text-white">Personal Details</h4> */}

                  <div className='two_btns_ps'>
                    {/* <Link to="/"> */}
                    <button
                      type='button'
                      onClick={() => {
                        props.history.push({
                          pathname: '/delerProfile',
                          data: 1,
                        });
                      }}
                      className='btn btn-light ml-2'>
                      <i
                        className='fa fa-pencil-square-o pr-1'
                        aria-hidden='true'></i>
                      <span>Update</span>
                    </button>
                    
                    {/* </Link> */}
                  </div>
                </div>

                <div className='card-body'>
                  <div className='form-validation'>
                    <div className='profile-personal-info'>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            OEM Name <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {oemName 
                              ? oemName
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Dealership Name{' '}
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.dealershipName
                              ? viewData.dealershipName
                              : 'N/A'}{' '}
                          </span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Google Listing Link
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.googleListingLink
                              ? viewData.googleListingLink
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
                            {viewData && viewData.contactNo
                              ? viewData.contactNo
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Website<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.website
                              ? viewData.website
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Profile Picture{' '}
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <Image
                            className='doc_image'
                            alt='img'
                            src={
                              viewData && viewData?.docs[0]?.profilePic
                                ? apiUrl + viewData.docs[0].profilePic
                                : 'assets/images/17.jpg'
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row justify-content-center h-100 align-items-center emi_row'>
            <div className='col-md-12'>
              <div className='card widget-stat'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>Contact Details</h4>

                  <div className='two_btns_ps'>
                    {/* <Link to="/delerProfile"> */}
                    <button
                      type='button'
                      onClick={() => {
                        props.history.push({
                          pathname: '/delerProfile',
                          data: 2,
                        });
                      }}
                      className='btn btn-light ml-2'>
                      <i
                        className='fa fa-pencil-square-o pr-1'
                        aria-hidden='true'></i>
                      <span>Update</span>
                    </button>
                    {/* </Link> */}
                  </div>
                </div>

                <div className='card-body'>
                  <div className='form-validation'>
                    <div className='profile-personal-info'>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Email <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.email
                              ? viewData.email
                              : 'N/A'}
                          </span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Mobile Number <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.phoneNo
                              ? viewData.phoneNo
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row justify-content-center h-100 align-items-center emi_row'>
            <div className='col-md-12'>
              <div className='card widget-stat'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>Address</h4>

                  <div className='two_btns_ps'>
                    {/* <Link to="/delerProfile"> */}
                    <button
                      type='button'
                      onClick={() => {
                        props.history.push({
                          pathname: '/delerProfile',
                          data: 3,
                        });
                      }}
                      className='btn btn-light ml-2'>
                      <i
                        className='fa fa-pencil-square-o pr-1'
                        aria-hidden='true'></i>
                      <span>Update</span>
                    </button>
                    {/* </Link> */}
                  </div>
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
                            {viewData && viewData.pincode
                              ? viewData.pincode
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            District <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.district
                              ? viewData.district
                              : 'N/A'}
                          </span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Post Office<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.postOffice
                              ? viewData.postOffice
                              : 'N/A'}
                          </span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Block<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.block
                              ? viewData.block
                              : 'N/A'}
                          </span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Address<span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.address
                              ? viewData.address
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            City/Village <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.cityVillage
                              ? viewData.cityVillage
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Landmark <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.landmark
                              ? viewData.landmark
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row justify-content-center h-100 align-items-center emi_row'>
            <div className='col-md-12'>
              <div className='card widget-stat'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>Company Details</h4>

                  <div className='two_btns_ps'>
                    {/* <Link to="/delerProfile"> */}
                    <button
                      type='button'
                      onClick={() => {
                        props.history.push({
                          pathname: '/delerProfile',
                          data: 6,
                        });
                      }}
                      className='btn btn-light ml-2'>
                      <i
                        className='fa fa-pencil-square-o pr-1'
                        aria-hidden='true'></i>
                      <span>Update</span>
                    </button>
                    {/* </Link> */}
                  </div>
                </div>

                <div className='card-body'>
                  <div className='form-validation'>
                    <div className='profile-personal-info'>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Company Name <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData &&
                            viewData.docs[0] &&
                            viewData.docs[0].newcompanyName
                              ? viewData.docs[0].newcompanyName
                              : 'N/A'}
                          </span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            CIN
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData &&
                            viewData.docs[0] &&
                            viewData.docs[0].cin
                              ? viewData.docs[0].cin
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            GST
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData &&
                            viewData.docs[0] &&
                            viewData.docs[0].gst
                              ? viewData.docs[0].gst
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            PAN
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData &&
                            viewData.docs[0] &&
                            viewData.docs[0].pan
                              ? viewData.docs[0].pan
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row justify-content-center h-100 align-items-center emi_row'>
            <div className='col-md-12'>
              <div className='card widget-stat'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>Documents</h4>

                  <div className='two_btns_ps'>
                    {/* <Link to="/delerProfile"> */}
                    <button
                      type='button'
                      onClick={() => {
                        props.history.push({
                          pathname: '/delerProfile',
                          data: 4,
                        });
                      }}
                      className='btn btn-light ml-2'>
                      <i
                        className='fa fa-pencil-square-o pr-1'
                        aria-hidden='true'></i>
                      <span>Update</span>
                    </button>
                    {/* </Link> */}
                  </div>
                </div>

                <div className='card-body'>
                  <div className='form-validation'>
                    <div className='profile-personal-info'>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Aadhaar Card Number{' '}
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData &&
                            viewData.docs[0] &&
                            viewData.docs[0].aadharNo
                              ? viewData.docs[0].aadharNo
                              : 'N/A'}
                          </span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            PAN Card Number{' '}
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData &&
                            viewData.docs[0] &&
                            viewData.docs[0].pan
                              ? viewData.docs[0].pan
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Aadhaar Card Image{' '}
                            <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <Image
                            className='doc_image'
                            alt='img'
                            src={
                              viewData && viewData?.docs[0]?.aadharDoc
                                ? apiUrl + viewData.docs[0].aadharDoc
                                : 'assets/images/pan-card.jpg'
                            }
                          />
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            PAN Card Image <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <Image
                            className='doc_image'
                            alt='img'
                            src={
                              viewData && viewData?.docs[0]?.panDoc
                                ? apiUrl + viewData.docs[0].panDoc
                                : 'assets/images/pan-card.jpg'
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row justify-content-center h-100 align-items-center emi_row'>
            <div className='col-md-12'>
              <div className='card widget-stat'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>
                    Bank Account Details
                  </h4>

                  <div className='two_btns_ps'>
                    {/* <Link to="/delerProfile"> */}
                    <button
                      type='button'
                      onClick={() => {
                        props.history.push({
                          pathname: '/delerProfile',
                          data: 5,
                        });
                      }}
                      className='btn btn-light ml-2'>
                      <i
                        className='fa fa-pencil-square-o pr-1'
                        aria-hidden='true'></i>
                      <span>Update</span>
                    </button>
                    {/* </Link> */}
                  </div>
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
                            {viewData &&
                            viewData.docs[0] &&
                            viewData.docs[0].acNo
                              ? viewData.docs[0].acNo
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
                            {viewData &&
                            viewData.docs[0] &&
                            viewData.docs[0].accountHolder
                              ? viewData.docs[0].accountHolder
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
                            {viewData &&
                            viewData.docs[0] &&
                            viewData.docs[0].bankName
                              ? viewData.docs[0].bankName
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
                            {viewData &&
                            viewData.docs[0] &&
                            viewData.docs[0].ifscCode
                              ? viewData.docs[0].ifscCode
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
                            {viewData &&
                              viewData.docs[0] &&
                              viewData.docs[0].pan
                              ? viewData.docs[0].pan
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
                              viewData && viewData?.docs[0]?.bankDoc
                                ? apiUrl + viewData.docs[0].bankDoc
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
                              viewData && viewData?.docs[0]?.cancelledCheque
                                ? apiUrl + viewData.docs[0].cancelledCheque
                                : 'assets/images/pan-card.jpg'
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {viewDataa.map((data, index) => (
            <div className='row justify-content-center h-100 align-items-center emi_row'>
              <div className='col-md-12'>
                <div className='card widget-stat'>
                  <div className='card-header bg-custom-blue '>
                    <h4 className='card-title text-white'>
                      Sub-Dealership Details
                    </h4>

                    <div className='two_btns_ps'>
                      {/* <Link to="/delerProfile"> */}
                      {index == 0 ? (
                        <>
                          <button
                            type='button'
                            onClick={() => {
                              props.history.push({
                                pathname: '/Addsubdelerprofile',
                                data: id,
                              });
                            }}
                            className='btn btn-light ml-2'>
                            <i
                              className='fa fa-pencil-square-o pr-1'
                              aria-hidden='true'></i>
                            <span>Add</span>
                          </button>
                          <button
                            type='button'
                            onClick={() => {
                              props.history.push({
                                pathname: '/subdelerprofile',
                                data: data,
                              });
                            }}
                            className='btn btn-light ml-2'>
                            <i
                              className='fa fa-pencil-square-o pr-1'
                              aria-hidden='true'></i>
                            <span>Update</span>
                          </button>
                        </>
                      ) : (
                        <>
                          {' '}
                          <button
                            type='button'
                            onClick={() => {
                              props.history.push({
                                pathname: '/subdelerprofile',
                                data: data,
                              });
                            }}
                            className='btn btn-light ml-2'>
                            <i
                              className='fa fa-pencil-square-o pr-1'
                              aria-hidden='true'></i>
                            <span>Update</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className='card-body'>
                    <div className='form-validation'>
                      <div className='profile-personal-info'>
                        <div className='row mb-2'>
                          <div className='col-sm-3 col-5'>
                            <h6 className='f-w-500'>
                              Sub-Dealership Name{' '}
                              <span className='pull-right'>:</span>
                            </h6>
                          </div>
                          <div className='col-sm-9 col-7'>
                            <span>{data.subDealername}</span>
                          </div>
                        </div>
                        <div className='row mb-2'>
                          <div className='col-sm-3 col-5'>
                            <h6 className='f-w-500'>
                              Address <span className='pull-right'>:</span>
                            </h6>
                          </div>
                          <div className='col-sm-9 col-7'>
                            <span>{data.subDealeraddress}</span>
                          </div>
                        </div>
                        <div className='row mb-2'>
                          <div className='col-sm-3 col-5'>
                            <h6 className='f-w-500'>
                              Contact No. <span className='pull-right'>:</span>
                            </h6>
                          </div>
                          <div className='col-sm-9 col-7'>
                            <span>{data.subDealercontactNo}</span>
                          </div>
                        </div>
                        <div className='row mb-2'>
                          <div className='col-sm-3 col-5'>
                            <h6 className='f-w-500'>
                              Email <span className='pull-right'>:</span>
                            </h6>
                          </div>
                          <div className='col-sm-9 col-7'>
                            <span>{data.subDealeremail}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className='row justify-content-center h-100 align-items-center emi_row'>
            <div className='col-md-12'>
              <div className='card widget-stat'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>
                    Naayak Point of Contact
                  </h4>

                  <div className='two_btns_ps'></div>
                </div>

                <div className='card-body'>
                  <div className='form-validation'>
                    <div className='profile-personal-info'>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Name <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.npcName
                              ? viewData.npcName
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Designation <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.npcDesignation
                              ? viewData.npcDesignation
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Contact No. <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.npcContactNo
                              ? viewData.npcContactNo
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-3 col-5'>
                          <h6 className='f-w-500'>
                            Email <span className='pull-right'>:</span>
                          </h6>
                        </div>
                        <div className='col-sm-9 col-7'>
                          <span>
                            {viewData && viewData.Email
                              ? viewData.Email
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row justify-content-center h-100 align-items-center emi_row'>
            <div className='col-md-12'>
              <div className='card widget-stat'>
                <div className='card-header bg-custom-blue '>
                  <h4 className='card-title text-white'>Vehicle’s Type</h4>
                </div>
                <div className='card-body'>
                  <div className='form-group custom-check-design'>
                    <div className='d-flex flex-wrap py-2'>
                      <div className='w-110 d-flex align-items-center mr-4'>
                        <input
                          type='checkbox'
                          className='w-auto ml-2 input_cus_radio'
                          id='commercialUse1'
                          name='dvtypee'
                          value='suziki'
                          onChange={updatevtype}
                          checked={arrMulti.includes('suziki')}
                        />
                        <label className='check-label' for='commercialUse1'>
                          suziki{' '}
                        </label>
                      </div>
                      <div className='w-110 d-flex align-items-center mr-4'>
                        <input
                          type='checkbox'
                          className='w-auto ml-2 input_cus_radio'
                          id='commercialUse2'
                          name='dvtyp'
                          value='maruti'
                          onChange={updatevtype}
                          checked={arrMulti.includes('maruti')}
                        />
                        <label className='check-label' for='commercialUse2'>
                          maruti{' '}
                        </label>
                      </div>
                      <div className='w-110 d-flex align-items-center mr-4'>
                        <input
                          type='checkbox'
                          className='w-auto ml-2 input_cus_radio'
                          id='commercialUse3'
                          name='dvtpe'
                          onChange={updatevtype}
                          value='yamaha'
                          checked={arrMulti.includes('yamaha')}
                        />
                        <label className='check-label' for='commercialUse3'>
                          yamaha{' '}
                        </label>
                      </div>
                      <div className='w-110 d-flex align-items-center mr-4'>
                        <input
                          type='checkbox'
                          className='w-auto ml-2 input_cus_radio'
                          id='commercialUse4'
                          name='dtype'
                          onChange={updatevtype}
                          value='tvs'
                          checked={arrMulti.includes('tvs')}
                        />
                        <label className='check-label' for='commercialUse4'>
                          tvs{' '}
                        </label>
                      </div>
                    </div>
                    <p className='successMag'>{msg}</p>
                  </div>
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
