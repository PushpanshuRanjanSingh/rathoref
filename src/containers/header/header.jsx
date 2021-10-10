/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

import React, { useState, useEffect } from 'react';
import history from '../../history';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import showNotification from '../.../../../services/notificationService';
import apiUrl from '../../globals/config';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
const IMG = base + 'assets/images/customer.png';
function Header(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [showSide, setShowSide] = useState(false);
  const [viewData, setViewData] = useState();
  const [oemname, setoemname] = useState('');
  const [cmt, setcmt] = useState();
  const [role, setRole] = useState();
  useEffect(() => {
    getProfile();
    setRole(localStorage.getItem('role'));
    getCmt();
  }, []);
  const getbrand = (id) => {
    // let token = localStorage.getItem('myData');
    // let headers = {
    //   headers: {
    //     'x-token': `Bearer ${token}`,
    //   },
    // };
    // axios
    //   .get(apiUrl + 'brand/getBrandId?id=' + id, headers)
    //   .then((resp) => {
    //     setoemname(resp?.data?.data?.brandName);
    //   })
    //   .catch((err) => {
    //     // setsuccessMsg("");
    //     console.log(err);
    //   });
  };
  const getProfile = () => {
    // let token = localStorage.getItem('myData');
    // let role = localStorage.getItem('role');
    // setRole(role);
    // let headers = {
    //   headers: {
    //     'x-token': `Bearer ${token}`,
    //   },
    // };
    // axios
    //   .get(apiUrl + 'user/getProfile', headers)
    //   .then((resp) => {
    //     setViewData(resp.data.data[0]);
    //     if (resp && resp?.data && resp?.data?.data[0]?.oemName) {
    //       getbrand(resp?.data?.data[0]?.oemName);
    //     }
    //   })
    //   .catch((err) => {
    //     showNotification('danger', err.message);
    //   });
  };

  const getCmt = () => {
    // setRole(localStorage.getItem("role"));
    // let token = localStorage.getItem('myData');
    // let role = localStorage.getItem('role');
    // let headers = {
    //   headers: {
    //     'x-token': `Bearer ${token}`,
    //   },
    // };
    // axios
    //   .get(apiUrl + 'helpLine/getHelpLineListByRole?role=' + role, headers)
    //   .then((resp) => {
    //     setcmt(resp.data.data);
    //   })
    //   .catch((err) => {
    //     showNotification('danger', err.message);
    //   });
  };
  const history = useHistory();

  const showSetStatusPopup = () => {
    showPopup ? setShowPopup(false) : setShowPopup(true);
  };

  const sideBarShow = () => {
    showSide ? setShowSide(false) : setShowSide(true);
  };
  const _logout = () => {
    localStorage.removeItem('myData');
    localStorage.removeItem('role');
    // history.push("/signup");
    showNotification('success', 'Logout Successfull');
    history.push('/');

    // window.location.href = '/';
  };

  return (
    <header>
      <div className='nav-header'>
        <Link className='brand-logo' to='/'>
          <Image
            className='logo-abbr'
            alt='img'
            src={'assets/images/logo.png'}
          />
          {/* DistributerHub */}
        </Link>
        <div className='nav-control '>
          <div
            className={!showSide ? 'hamburger' : 'hamburger is-active'}
            onClick={sideBarShow}>
            <span className='line'></span>
            <span className='line'></span>
            <span className='line'></span>
          </div>
        </div>
      </div>

      <div className='header'>
        <div className='header-content'>
          <nav className='navbar navbar-expand'>
            <div className='collapse navbar-collapse justify-content-between'>
              <div className='header-left cus-header-left'>
                <div className='dashboard_bar'>
                  {role == 1
                    ? "Naayak's Dashboard"
                    : role == 3
                    ? viewData?.dealershipName
                    : role == 4
                    ? 'Admin Dashboard'
                    : role == 5
                    ? 'Insurance Dashboard'
                    : role == 2
                    ? 'Admin Dashboard'
                    : role == 0
                    ? ' Dashboard'
                    : 'Dashboard'}
                </div>
                <div className='left-sub-tile'>
                  {' '}
                  <span>{role == 3 && viewData?.oemName ? oemname : ''}</span>
                </div>
              </div>
              <ul className='navbar-nav header-right'>
                <li className='nav-item'>
                  <div className='input-group search-area d-xl-inline-flex d-none'>
                    <div className='input-group-append'>
                      <span className='input-group-text'>
                        <a href='#0'>
                          <i className='fa fa-search'></i>
                        </a>
                      </span>
                    </div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Search here...'
                    />
                  </div>
                </li>
                {role == 2 ? (
                  ''
                ) : (
                  <>
                    <li className='nav-item dropdown notification_dropdown'>
                      <a
                        className='nav-link  ai-icon'
                        href='#0'
                        role='button'
                        data-toggle='dropdown'>
                        <svg
                          width='28'
                          height='28'
                          viewBox='0 0 28 28'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M22.75 15.8385V13.0463C22.7471 10.8855 21.9385 8.80353 20.4821 7.20735C19.0258 5.61116 17.0264 4.61555 14.875 4.41516V2.625C14.875 2.39294 14.7828 2.17038 14.6187 2.00628C14.4546 1.84219 14.2321 1.75 14 1.75C13.7679 1.75 13.5454 1.84219 13.3813 2.00628C13.2172 2.17038 13.125 2.39294 13.125 2.625V4.41534C10.9736 4.61572 8.97429 5.61131 7.51794 7.20746C6.06159 8.80361 5.25291 10.8855 5.25 13.0463V15.8383C4.26257 16.0412 3.37529 16.5784 2.73774 17.3593C2.10019 18.1401 1.75134 19.1169 1.75 20.125C1.75076 20.821 2.02757 21.4882 2.51969 21.9803C3.01181 22.4724 3.67904 22.7492 4.375 22.75H9.71346C9.91521 23.738 10.452 24.6259 11.2331 25.2636C12.0142 25.9013 12.9916 26.2497 14 26.2497C15.0084 26.2497 15.9858 25.9013 16.7669 25.2636C17.548 24.6259 18.0848 23.738 18.2865 22.75H23.625C24.321 22.7492 24.9882 22.4724 25.4803 21.9803C25.9724 21.4882 26.2492 20.821 26.25 20.125C26.2486 19.117 25.8998 18.1402 25.2622 17.3594C24.6247 16.5786 23.7374 16.0414 22.75 15.8385ZM7 13.0463C7.00232 11.2113 7.73226 9.45223 9.02974 8.15474C10.3272 6.85726 12.0863 6.12732 13.9212 6.125H14.0788C15.9137 6.12732 17.6728 6.85726 18.9703 8.15474C20.2677 9.45223 20.9977 11.2113 21 13.0463V15.75H7V13.0463ZM14 24.5C13.4589 24.4983 12.9316 24.3292 12.4905 24.0159C12.0493 23.7026 11.716 23.2604 11.5363 22.75H16.4637C16.284 23.2604 15.9507 23.7026 15.5095 24.0159C15.0684 24.3292 14.5411 24.4983 14 24.5ZM23.625 21H4.375C4.14298 20.9999 3.9205 20.9076 3.75644 20.7436C3.59237 20.5795 3.50014 20.357 3.5 20.125C3.50076 19.429 3.77757 18.7618 4.26969 18.2697C4.76181 17.7776 5.42904 17.5008 6.125 17.5H21.875C22.571 17.5008 23.2382 17.7776 23.7303 18.2697C24.2224 18.7618 24.4992 19.429 24.5 20.125C24.4999 20.357 24.4076 20.5795 24.2436 20.7436C24.0795 20.9076 23.857 20.9999 23.625 21Z'
                            fill='#0B2A97'
                          />
                        </svg>
                        <div className='pulse-css'></div>
                      </a>
                      <div className='dropdown-menu rounded dropdown-menu-right'>
                        <div
                          id='DZ_W_Notification1'
                          className='widget-media dz-scroll p-3 height380'>
                          <ul className='timeline'>
                            <li>
                              <div className='timeline-panel'>
                                <div className='media mr-2'>
                                  <img
                                    alt='image'
                                    width='50'
                                    src='images/avatar/1.jpg'
                                  />
                                </div>
                                <div className='media-body'>
                                  <h6 className='mb-1'>
                                    Dr sultads Send you Photo
                                  </h6>
                                  <small className='d-block'>
                                    29 July 2020 - 02:26 PM
                                  </small>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className='timeline-panel'>
                                <div className='media mr-2 media-info'>KG</div>
                                <div className='media-body'>
                                  <h6 className='mb-1'>
                                    Resport created successfully
                                  </h6>
                                  <small className='d-block'>
                                    29 July 2020 - 02:26 PM
                                  </small>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className='timeline-panel'>
                                <div className='media mr-2 media-success'>
                                  <i className='fa fa-home'></i>
                                </div>
                                <div className='media-body'>
                                  <h6 className='mb-1'>
                                    Reminder : Treatment Time!
                                  </h6>
                                  <small className='d-block'>
                                    29 July 2020 - 02:26 PM
                                  </small>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className='timeline-panel'>
                                <div className='media mr-2'>
                                  <img
                                    alt='image'
                                    width='50'
                                    src='images/avatar/1.jpg'
                                  />
                                </div>
                                <div className='media-body'>
                                  <h6 className='mb-1'>
                                    Dr sultads Send you Photo
                                  </h6>
                                  <small className='d-block'>
                                    29 July 2020 - 02:26 PM
                                  </small>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className='timeline-panel'>
                                <div className='media mr-2 media-danger'>
                                  KG
                                </div>
                                <div className='media-body'>
                                  <h6 className='mb-1'>
                                    Resport created successfully
                                  </h6>
                                  <small className='d-block'>
                                    29 July 2020 - 02:26 PM
                                  </small>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className='timeline-panel'>
                                <div className='media mr-2 media-primary'>
                                  <i className='fa fa-home'></i>
                                </div>
                                <div className='media-body'>
                                  <h6 className='mb-1'>
                                    Reminder : Treatment Time!
                                  </h6>
                                  <small className='d-block'>
                                    29 July 2020 - 02:26 PM
                                  </small>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <a className='all-notification' href='#0'>
                          See all notifications{' '}
                          <i className='ti-arrow-right'></i>
                        </a>
                      </div>
                    </li>
                  </>
                )}
                <li
                  className='nav-item dropdown header-profile'
                  onClick={() => showSetStatusPopup()}>
                  <a className='nav-link' href='#0' role='button'>
                    <Image
                      alt='img'
                      src={
                        viewData && viewData?.docs[0]?.profilePic
                          ? apiUrl + viewData.docs[0].profilePic
                          : 'assets/images/17.jpg'
                      }
                    />
                    <div className='header-info'>
                      <span className='text-black'>
                        <strong>
                          {/* {viewData && viewData.firstName
                            ? viewData.firstName
                            : "Agent"}{" "}
                          {viewData && viewData.lastName
                            ? " " + viewData.lastName
                            : ""} */}
                          {viewData &&
                          viewData.firstName &&
                          role != 3 &&
                          role != 4 &&
                          role != 5
                            ? viewData.firstName
                            : viewData?.role == 1
                            ? 'Naayak'
                            : viewData?.role == 2
                            ? 'Admin'
                            : viewData?.role == 6
                            ? 'Customer Specialist'
                            : viewData?.role == 7
                            ? 'Onboarding Team'
                            : viewData?.role == 0
                            ? 'User'
                            : ''}
                          {viewData &&
                          viewData.lastName &&
                          role != 3 &&
                          role == 4 &&
                          role == 5
                            ? ' ' + viewData.lastName
                            : ''}
                          {viewData && viewData.npcName && role == 3
                            ? ' ' + viewData.npcName.substring(0, 10)
                            : ''}
                          {viewData && viewData.fpcName && role == 4
                            ? ' ' + viewData.fpcName.substring(0, 10)
                            : ''}
                          {viewData && viewData.ipcName && role == 5
                            ? ' ' + viewData.ipcName.substring(0, 10)
                            : ''}
                        </strong>
                      </span>
                      <p className='fs-12 mb-0'>
                        {viewData?.role == 1
                          ? 'Naayak'
                          : viewData?.role == 2
                          ? 'Admin'
                          : viewData?.role == 3
                          ? 'Dealership'
                          : viewData?.role == 4
                          ? 'Finance'
                          : viewData?.role == 5
                          ? 'Insurance'
                          : viewData?.role == 6
                          ? 'Customer Specialist'
                          : viewData?.role == 7
                          ? 'Onboarding Team'
                          : 'User'}
                      </p>
                    </div>
                  </a>

                  <div
                    className={
                      showPopup
                        ? 'dropdown-menu dropdown-menu-right show'
                        : 'dropdown-menu dropdown-menu-right'
                    }>
                    {role == 3 ? (
                      <Link
                        to='/dealerviewProfile'
                        className='dropdown-item ai-icon'>
                        <svg
                          id='icon-user1'
                          xmlns='http://www.w3.org/2000/svg'
                          className='text-primary'
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'>
                          <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                          <circle cx='12' cy='7' r='4'></circle>
                        </svg>
                        <span className='ml-2'>Profile </span>
                      </Link>
                    ) : role == 0 ? (
                      ''
                    ) : (
                      <Link to='/viewProfile' className='dropdown-item ai-icon'>
                        <svg
                          id='icon-user1'
                          xmlns='http://www.w3.org/2000/svg'
                          className='text-primary'
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'>
                          <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                          <circle cx='12' cy='7' r='4'></circle>
                        </svg>
                        <span className='ml-2'>Profile </span>
                      </Link>
                    )}

                    <a
                      href='javascript:void(0)'
                      className='dropdown-item ai-icon'>
                      <svg
                        id='icon-logout'
                        xmlns='http://www.w3.org/2000/svg'
                        className='text-danger'
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
                        <polyline points='16 17 21 12 16 7'></polyline>
                        <line x1='21' y1='12' x2='9' y2='12'></line>
                      </svg>
                      <span
                        className='ml-2'
                        onClick={() => {
                          _logout();
                        }}>
                        Logout{' '}
                      </span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className={!showSide ? 'deznav' : 'deznav menu-toggle-show'}>
        <div className='deznav-scroll'>
          <ul className='metismenu' id='menu'>
            <li>
              {role == 0 ? (
                ''
              ) : (
                <Link
                  className='ai-icon '
                  aria-expanded='false'
                  to='/dashboard'>
                  <i className='fa fa-dashboard'></i>
                  <span className='nav-text'>Dashboard</span>
                </Link>
              )}
            </li>
            {/* insurance  */}
            {role == 5 ? (
              <>
                <li>
                  <Link
                    className='ai-icon'
                    to='/Clientdetails'
                    aria-expanded='false'>
                    <i class='fa fa-file-text' aria-hidden='true'></i>
                    <span className='nav-text'>New Cases </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    to='/insuranceComplete'
                    aria-expanded='false'>
                    <i class='fa fa-file-text' aria-hidden='true'></i>
                    <span className='nav-text'>Completed Cases </span>
                  </Link>
                </li>

                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/notifications'>
                    <i className='fa fa-bell'></i>
                    <span className='nav-text'>Notification</span>
                  </Link>
                </li>
              </>
            ) : (
              ''
            )}
            {role == 0 ? (
              <>
                <li>
                  {' '}
                  <Link className='ai-icon active' aria-expanded='false' to='/'>
                    <i className='fa fa-dashboard'></i>
                    <span className='nav-text'>Dashboard</span>
                  </Link>
                </li>{' '}
                <Link to='/' className='customer-dash-user'>
                  <div className='add-menu-sidebar'>
                    <div className='user_main_icon_box d-flex justify-content-center align-items-center'>
                      <Image
                        alt='img'
                        src={
                          cmt && cmt?.profilePic
                            ? apiUrl + cmt?.profilePic
                            : 'assets/images/17.jpg'
                        }
                      />
                    </div>
                    <div className='ml-2'>
                      <h5 className='text-white	font-w500 mb-0'>
                        Company ...
                        {/* {viewData && viewData.lastName ? ' ' + viewData.lastName : ''} */}
                      </h5>
                      <h5 className='text-white	font-w500 mb-0'></h5>
                      <p className=' mb-0'>Dashboard</p>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              ''
            )}
            {/* finance side bar handle */}
            {role == 4 ? (
              <>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/freshclients'>
                    <i class='fa fa-building'></i>
                    <span className='nav-text'>Company</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/reviewedclients'>
                    <i class='fa fa-check-square' aria-hidden='true'></i>
                    <span className='nav-text'>Distributer</span>
                  </Link>
                </li>
                <li>
                  <Link className='ai-icon' aria-expanded='false' to='/help'>
                    <i className='fa fa-question-circle'></i>
                    <span className='nav-text'>Contact Form</span>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/rejectedcases'>
                    <i class='fa fa-user-times' aria-hidden='true'></i>
                    <span className='nav-text'>Rejected Cases</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/doreadyclients'>
                    <i class='fa fa-handshake-o' aria-hidden='true'></i>
                    <span className='nav-text'>Do Ready</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    to='/Completeddeal'
                    aria-expanded='false'>
                    <i className='fa fa-calculator'></i>
                    <span className='nav-text'>Completed Cases</span>
                  </Link>
                </li>
              */}
              </>
            ) : (
              ''
            )}
            {/* dealer side bar handle  */}
            {role == 3 ? (
              <>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/inventoryMain'>
                    <i class='fa fa-building'></i>
                    <span className='nav-text'>Inventory</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/ongoingDeals'>
                    <i class='fa fa-gift' aria-hidden='true'></i>
                    <span className='nav-text'>New Deals</span>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    className="ai-icon"
                    aria-expanded="false"
                    to="/pendingDeals"
                  >
                    <i class="fa fa-hourglass-start" aria-hidden="true"></i>
                    <span className="nav-text">In-process Deals</span>
                  </Link>
                </li> */}
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/completedDeals'>
                    <i class='fa fa-handshake-o' aria-hidden='true'></i>
                    <span className='nav-text'>Completed deals</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href='#0'
                    className='ai-icon'
                    aria-expanded='false'
                    to='/uploadDocument'>
                    <i className='fa fa-file'></i>
                    <span className='nav-text'>Upload Documents</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/notifications'>
                    <i className='fa fa-bell'></i>
                    <span className='nav-text'>Notification</span>
                  </Link>
                </li>
                <li>
                  <Link className='ai-icon' aria-expanded='false' to='/help'>
                    <i className='fa fa-question-circle'></i>
                    <span className='nav-text'>Help</span>
                  </Link>
                </li>
              </>
            ) : (
              ''
            )}
            {role == 7 ? (
              <>
                <li>
                  <Link
                    className='ai-icon'
                    to='/onboardinguser'
                    aria-expanded='false'>
                    <i class='fa fa-user' aria-hidden='true'></i>
                    <span className='nav-text'>User </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    to='/onboardinglisting'
                    aria-expanded='false'>
                    <i class='fa fa-list-alt' aria-hidden='true'></i>
                    <span className='nav-text'>Listing </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    to='/onboardingreport'
                    aria-expanded='false'>
                    <i class='fa fa-file-text' aria-hidden='true'></i>
                    <span className='nav-text'>Reports </span>
                  </Link>
                </li>

                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/notifications'>
                    <i className='fa fa-bell'></i>
                    <span className='nav-text'>Notification</span>
                  </Link>
                </li>
                <li>
                  <Link className='ai-icon' aria-expanded='false' to='/help'>
                    <i className='fa fa-question-circle'></i>
                    <span className='nav-text'>Help</span>
                  </Link>
                </li>
              </>
            ) : (
              ''
            )}

            {role == 1 ? (
              <>
                <li>
                  <Link
                    className='ai-icon'
                    to='/vehicles'
                    aria-expanded='false'>
                    <i className='fa fa-car'></i>
                    <span className='nav-text'>Vehicles</span>
                  </Link>
                </li>
                <li>
                  {' '}
                  <Link className='ai-icon' aria-expanded='false' to='/leads'>
                    <i className='fa fa-user'></i>
                    <span className='nav-text'>Leads</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/earnings'>
                    <i className='fa fa-money'></i>
                    <span className='nav-text'>Earnings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    to='/emiCalculator'
                    aria-expanded='false'>
                    <i className='fa fa-calculator'></i>
                    <span className='nav-text'>EMI Calculator</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href='#0'
                    className='ai-icon'
                    aria-expanded='false'
                    to='/uploadDocument'>
                    <i className='fa fa-file'></i>
                    <span className='nav-text'>Upload Documents</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/notifications'>
                    <i className='fa fa-bell'></i>
                    <span className='nav-text'>Notification</span>
                  </Link>
                </li>
                <li>
                  <Link className='ai-icon' aria-expanded='false' to='/help'>
                    <i className='fa fa-question-circle'></i>
                    <span className='nav-text'>Help</span>
                  </Link>
                </li>
              </>
            ) : (
              ''
            )}
            {role == 6 ? (
              <>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/customermanagementlead'>
                    <i class='fa fa-user'></i>
                    <span className='nav-text'>Leads</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/cmtfinance'>
                    <i class='fa fa-user'></i>
                    <span className='nav-text'>Financer</span>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/customermanagementlead'>
                    <i class='fa fa-user'></i>
                    <span className='nav-text'>Leads</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/approvedLead'>
                    <i class='fa fa-check-square-o' aria-hidden='true'></i>
                    <span className='nav-text'>Approved Leads</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/rejectedLead'>
                    <i class='fa fa-user-times' aria-hidden='true'></i>
                    <span className='nav-text'>Rejected Leads</span>
                  </Link>
                </li> */}

                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/dealerSection'>
                    <i class='fa fa-user'></i>
                    <span className='nav-text'>Dealer</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/agentEarning'>
                    <i class='fa fa-user'></i>
                    <span className='nav-text'>Agent Earning</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/adminusers'>
                    <i class='fa fa-user'></i>
                    <span className='nav-text'>On-Boarding</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/customermanagementdocument'>
                    <i class='fa fa-file' aria-hidden='true'></i>
                    <span className='nav-text'>Document</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/customeraddslist'>
                    <i class='fa fa-bullhorn' aria-hidden='true'></i>
                    <span className='nav-text'>Banners</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/helpline'>
                    <i class='fa fa-bullhorn' aria-hidden='true'></i>
                    <span className='nav-text'>Help Line</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/vehicleCmt'>
                    <i className='fa fa-car'></i>
                    <span className='nav-text'>Vehicles</span>
                  </Link>
                </li>

                {/* <li>
                  <Link
                    className="ai-icon"
                    aria-expanded="false"
                    to="/customermanagementquotation"
                  >
                    <i class="fa fa-file-text" aria-hidden="true"></i>
                    <span className="nav-text">Quotation </span>
                  </Link>
                </li> */}

                {/* <li>
                  <Link
                    href="#0"
                    className="ai-icon"
                    aria-expanded="false"
                    to="/customermanagementreport"
                  >
                    <i className="fa fa-file"></i>
                    <span className="nav-text">Reports</span>
                  </Link>
                </li> */}

                {/* <li>
                  <Link
                    className="ai-icon"
                    aria-expanded="false"
                    to="/customermanagementinsurance"
                  >
                    <i className="fa fa-file-text"></i>
                    <span className="nav-text">Insurance Documents</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    className="ai-icon"
                    aria-expanded="false"
                    to="/customermanagementreview"
                  >
                    <i className="fa fa-file"></i>
                    <span className="nav-text">Delivery Review</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link className="ai-icon" aria-expanded="false" to="/help">
                    <i className="fa fa-question-circle"></i>
                    <span className="nav-text">Help</span>
                  </Link>
                </li> */}
              </>
            ) : (
              ''
            )}
            {role == 2 ? (
              <>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/admincustomers'>
                    <i class='fa fa-user' aria-hidden='true'></i>
                    <span className='nav-text'>Users </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/adminagents'>
                    <i class='fa fa-users' aria-hidden='true'></i>
                    <span className='nav-text'>Naayak </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/admindealer'>
                    <i class='fa fa-users' aria-hidden='true'></i>
                    <span className='nav-text'>Dealer </span>
                  </Link>
                </li>

                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/adminusers'>
                    <i class='fa fa-user' aria-hidden='true'></i>
                    <span className='nav-text'>Team </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/adminreports'>
                    <i class='fa fa-file-text' aria-hidden='true'></i>
                    <span className='nav-text'>Reports </span>
                  </Link>
                </li>

                <li>
                  <Link
                    className='ai-icon'
                    aria-expanded='false'
                    to='/notifications'>
                    <i className='fa fa-bell'></i>
                    <span className='nav-text'>Notification</span>
                  </Link>
                </li>
                <li>
                  <a className='ai-icon' href='#0' aria-expanded='false'>
                    <i className='fa fa-question-circle'></i>
                    <span className='nav-text'>Help</span>
                  </a>
                </li>
              </>
            ) : (
              ''
            )}
          </ul>
          {role == 0 || role == 6 ? (
            ''
          ) : (
            <Link to='/'>
              <div className='add-menu-sidebar'>
                <div className='user_main_icon_box d-flex justify-content-center align-items-center'>
                  <Image
                    alt='img'
                    src={
                      cmt && cmt?.profilePic
                        ? apiUrl + cmt?.profilePic
                        : 'assets/images/17.jpg'
                    }
                  />
                </div>
                <div className='ml-2'>
                  <h5 className='text-white	font-w500 mb-0'>
                    {cmt && cmt.name ? cmt.name.substring(0, 10) : 'CMT'}....
                    {/* {viewData && viewData.lastName ? ' ' + viewData.lastName : ''} */}
                  </h5>
                  <h5 className='text-white	font-w500 mb-0'>
                    {cmt && cmt.phoneNo ? cmt.phoneNo : 'Nan'}
                  </h5>
                  <p className=' mb-0'>Account</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
