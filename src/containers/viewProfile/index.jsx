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
  const [oemName, setoemName] = useState("")
  const [role, setRole] = useState();
  useEffect(() => {
    getProfile();
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
      })
      .catch((err) => {
        // setsuccessMsg("");
        console.log(err);
      });
  };
  const getProfile = () => {
    let token = localStorage.getItem('myData');
    let role = localStorage.getItem('role');
    setRole(role);
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'user/getProfile', headers)
      .then((resp) => {
        setViewData(resp.data.data[0]);
       
      })
      .catch((err) => {
        // setsuccessMsg("");
        console.log(err);
      });
  };
  const download = (data) => {
    const url = 'http://localhost:3000/logo192.png';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'image/jpg',
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `FileName.jpg`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link >
        link.parentNode.removeChild(link);
      });
  };
  return (
    <>
      {/* <Header /> */}
      <div className='content-body'>
        <div className='container-fluid'>
          {role == 4 ? (
            <>
              <div className='row justify-content-center h-100 align-items-center emi_row'>
                <div className='col-md-12'>
                  <div className='card widget-stat'>
                    <div className='card-header bg-custom-blue '>
                      <h4 className='card-title text-white'>
                        financer Details
                      </h4>

                      <div className='two_btns_ps'>
                        {/* <Link to="/"> */}
                        <button
                          type='button'
                          onClick={() => {
                            props.history.push({
                              pathname: '/profile',
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
                                Financer Name{' '}
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.firstName
                                  ? viewData.firstName
                                  : 'N/A'}{' '}
                                {viewData && viewData.lastName
                                  ? ' ' + viewData.lastName
                                  : ''}
                              </span>
                            </div>
                          </div>
                          <div className='row mb-2'>
                            <div className='col-sm-3 col-5'>
                              <h6 className='f-w-500'>
                                company Name{' '}
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.companyName
                                  ? viewData.companyName
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
                          <div className='row mb-2'>
                            <div className='col-sm-3 col-5'>
                              <h6 className='f-w-500'>
                                Website <span className='pull-right'>:</span>
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
                                Financer Code{' '}
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.financerCode
                                  ? viewData.financerCode
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
                      <h4 className='card-title text-white'>
                        financer Point of Contact
                      </h4>

                      <div className='two_btns_ps'>
                        {/* <Link to="/"> */}
                        <button
                          type='button'
                          onClick={() => {
                            props.history.push({
                              pathname: '/profile',
                              data: 9,
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
                                Name <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.fpcName
                                  ? viewData.fpcName
                                  : 'N/A'}
                              </span>
                            </div>
                          </div>
                          <div className='row mb-2'>
                            <div className='col-sm-3 col-5'>
                              <h6 className='f-w-500'>
                                Designation{' '}
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.fpcDesignation
                                  ? viewData.fpcDesignation
                                  : 'N/A'}
                              </span>
                            </div>
                          </div>
                          <div className='row mb-2'>
                            <div className='col-sm-3 col-5'>
                              <h6 className='f-w-500'>
                                Contact No.{' '}
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.fpcNumber
                                  ? viewData.fpcNumber
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
                                {viewData && viewData.fpcEmail
                                  ? viewData.fpcEmail
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
            </>
          ) : role == 5 ? (
            <>
              <div className='row justify-content-center h-100 align-items-center emi_row'>
                <div className='col-md-12'>
                  <div className='card widget-stat'>
                    <div className='card-header bg-custom-blue '>
                      <h4 className='card-title text-white'>
                        Insurance Details
                      </h4>

                      <div className='two_btns_ps'>
                        {/* <Link to="/"> */}
                        <button
                          type='button'
                          onClick={() => {
                            props.history.push({
                              pathname: '/profile',
                              data: 7,
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
                                Insurance Name{' '}
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.firstName
                                  ? viewData.firstName
                                  : 'N/A'}{' '}
                                {viewData && viewData.lastName
                                  ? ' ' + viewData.lastName
                                  : ''}
                              </span>
                            </div>
                          </div>
                          <div className='row mb-2'>
                            <div className='col-sm-3 col-5'>
                              <h6 className='f-w-500'>
                                company Name{' '}
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.companyName
                                  ? viewData.companyName
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
                          <div className='row mb-2'>
                            <div className='col-sm-3 col-5'>
                              <h6 className='f-w-500'>
                                Website <span className='pull-right'>:</span>
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
                                Insurance Code{' '}
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.insuranceCode
                                  ? viewData.insuranceCode
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
                      <h4 className='card-title text-white'>
                        Insurance Point of Contact
                      </h4>

                      <div className='two_btns_ps'>
                        {/* <Link to="/"> */}
                        <button
                          type='button'
                          onClick={() => {
                            props.history.push({
                              pathname: '/profile',
                              data: 8,
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
                                Name <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.ipcName
                                  ? viewData.ipcName
                                  : 'N/A'}
                              </span>
                            </div>
                          </div>
                          <div className='row mb-2'>
                            <div className='col-sm-3 col-5'>
                              <h6 className='f-w-500'>
                                Designation{' '}
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.ipcDesignation
                                  ? viewData.ipcDesignation
                                  : 'N/A'}
                              </span>
                            </div>
                          </div>
                          <div className='row mb-2'>
                            <div className='col-sm-3 col-5'>
                              <h6 className='f-w-500'>
                                Contact No.{' '}
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.ipcNumber
                                  ? viewData.ipcNumber
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
                                {viewData && viewData.ipcEmail
                                  ? viewData.ipcEmail
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
            </>
          ) : (
            <>
              <div className='row justify-content-center h-100 align-items-center emi_row'>
                <div className='col-md-12'>
                  <div className='card widget-stat'>
                    <div className='card-header bg-custom-blue '>
                      <h4 className='card-title text-white'>
                        Personal Details
                      </h4>

                      <div className='two_btns_ps'>
                        {/* <Link to="/"> */}
                        <button
                          type='button'
                          onClick={() => {
                            props.history.push({
                              pathname: '/profile',
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
                                Full Name <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.firstName
                                  ? viewData.firstName
                                  : 'N/A'}{' '}
                                {viewData && viewData.lastName
                                  ? ' ' + viewData.lastName
                                  : ''}
                              </span>
                            </div>
                          </div>
                          <div className='row mb-2'>
                            <div className='col-sm-3 col-5'>
                              <h6 className='f-w-500'>
                                Father Name{' '}
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.fatherName
                                  ? viewData.fatherName
                                  : 'N/A'}
                              </span>
                            </div>
                          </div>
                          <div className='row mb-2'>
                            <div className='col-sm-3 col-5'>
                              <h6 className='f-w-500'>
                                Date of Birth{' '}
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7'>
                              <span>
                                {viewData && viewData.dateOfBirth
                                  ? viewData.dateOfBirth
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
                        {/* <Link to="/profile"> */}
                        <button
                          type='button'
                          onClick={() => {
                            props.history.push({
                              pathname: '/profile',
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
                                Mobile Number{' '}
                                <span className='pull-right'>:</span>
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
                        {/* <Link to="/profile"> */}
                        <button
                          type='button'
                          onClick={() => {
                            props.history.push({
                              pathname: '/profile',
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
                                City/Village{' '}
                                <span className='pull-right'>:</span>
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
                      <h4 className='card-title text-white'>Documents</h4>

                      <div className='two_btns_ps'>
                        {/* <Link to="/profile"> */}
                        <button
                          type='button'
                          onClick={() => {
                            props.history.push({
                              pathname: '/profile',
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
                            <div className='col-sm-9 col-7 d-flex align-items-center'>
                              <Image
                                className='doc_image'
                                alt='img'
                                src={
                                  viewData && viewData?.docs[0]?.aadharDoc
                                    ? apiUrl + viewData.docs[0].aadharDoc
                                    : 'assets/images/pan-card.jpg'
                                }
                              />
                              <button
                                type='button'
                                // onClick={() =>
                                //   download('http://localhost:3000/logo192.png')
                                // }
                                class='btn btn-dark  ml-auto  bg-dark-cus'>
                                <i
                                  class='fa fa-cloud-download pr-1'
                                  aria-hidden='true'></i>
                                <span>Download</span>
                              </button>
                            </div>
                          </div>
                          <div className='row mb-2'>
                            <div className='col-sm-3 col-5'>
                              <h6 className='f-w-500'>
                                PAN Card Image{' '}
                                <span className='pull-right'>:</span>
                              </h6>
                            </div>
                            <div className='col-sm-9 col-7 d-flex align-items-center'>
                              <Image
                                className='doc_image'
                                alt='img'
                                src={
                                  viewData && viewData?.docs[0]?.panDoc
                                    ? apiUrl + viewData.docs[0].panDoc
                                    : 'assets/images/pan-card.jpg'
                                }
                              />
                              <button
                                type='button'
                                class='btn btn-dark  bg-dark-cus ml-auto'>
                                <i
                                  class='fa fa-cloud-download pr-1'
                                  aria-hidden='true'></i>
                                <span>Download</span>
                              </button>
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
                      <h4 className='card-title text-white'>Bank Details</h4>

                      <div className='two_btns_ps'>
                        {/* <Link to="/profile"> */}
                        <button
                          type='button'
                          onClick={() => {
                            props.history.push({
                              pathname: '/profile',
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
                                Account Holder{' '}
                                <span className='pull-right'>:</span>
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
                            <div className='col-sm-9 col-7 d-flex align-items-center'>
                              <Image
                                className='doc_image'
                                alt='img'
                                src={
                                  viewData && viewData?.docs[0]?.bankDoc
                                    ? apiUrl + viewData.docs[0].bankDoc
                                    : 'assets/images/pan-card.jpg'
                                }
                              />
                              <button
                                type='button'
                                class='btn btn-dark  bg-dark-cus ml-auto'>
                                <i
                                  class='fa fa-cloud-download pr-1'
                                  aria-hidden='true'></i>
                                <span>Download</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewProfile;
