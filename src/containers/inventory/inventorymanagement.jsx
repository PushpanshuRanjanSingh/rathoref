import React from 'react';
import {Row, Col , Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import Header from '../header/header';
import Footer from '../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default class Inventorymanagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>


    <header>
       <div className="nav-header">
          <Link  className="brand-logo" to="/dealership">
          <Image className="logo-abbr" alt="img" src={"assets/images/logo.png"} />
          </Link>
          <div className="nav-control">
             <div className="hamburger">
                <span className="line"></span><span className="line"></span><span className="line"></span>
             </div>
          </div>
       </div>
       <div className="header">
          <div className="header-content">
             <nav className="navbar navbar-expand">
                <div className="collapse navbar-collapse justify-content-between">
                   <div className="header-left">
                      <div className="dashboard_bar">
                         Dashboard
                      </div>
                   </div>
                   <ul className="navbar-nav header-right">
                      <li className="nav-item">
                         <div className="input-group search-area d-xl-inline-flex d-none">
                            <div className="input-group-append">
                               <span className="input-group-text"><a href="#0"><i className="fa fa-search"></i></a></span>
                            </div>
                            <input type="text" className="form-control" placeholder="Search here..."/>
                         </div>
                      </li>
                      <li className="nav-item dropdown notification_dropdown">
                         <a className="nav-link  ai-icon" href="#0" role="button" data-toggle="dropdown">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M22.75 15.8385V13.0463C22.7471 10.8855 21.9385 8.80353 20.4821 7.20735C19.0258 5.61116 17.0264 4.61555 14.875 4.41516V2.625C14.875 2.39294 14.7828 2.17038 14.6187 2.00628C14.4546 1.84219 14.2321 1.75 14 1.75C13.7679 1.75 13.5454 1.84219 13.3813 2.00628C13.2172 2.17038 13.125 2.39294 13.125 2.625V4.41534C10.9736 4.61572 8.97429 5.61131 7.51794 7.20746C6.06159 8.80361 5.25291 10.8855 5.25 13.0463V15.8383C4.26257 16.0412 3.37529 16.5784 2.73774 17.3593C2.10019 18.1401 1.75134 19.1169 1.75 20.125C1.75076 20.821 2.02757 21.4882 2.51969 21.9803C3.01181 22.4724 3.67904 22.7492 4.375 22.75H9.71346C9.91521 23.738 10.452 24.6259 11.2331 25.2636C12.0142 25.9013 12.9916 26.2497 14 26.2497C15.0084 26.2497 15.9858 25.9013 16.7669 25.2636C17.548 24.6259 18.0848 23.738 18.2865 22.75H23.625C24.321 22.7492 24.9882 22.4724 25.4803 21.9803C25.9724 21.4882 26.2492 20.821 26.25 20.125C26.2486 19.117 25.8998 18.1402 25.2622 17.3594C24.6247 16.5786 23.7374 16.0414 22.75 15.8385ZM7 13.0463C7.00232 11.2113 7.73226 9.45223 9.02974 8.15474C10.3272 6.85726 12.0863 6.12732 13.9212 6.125H14.0788C15.9137 6.12732 17.6728 6.85726 18.9703 8.15474C20.2677 9.45223 20.9977 11.2113 21 13.0463V15.75H7V13.0463ZM14 24.5C13.4589 24.4983 12.9316 24.3292 12.4905 24.0159C12.0493 23.7026 11.716 23.2604 11.5363 22.75H16.4637C16.284 23.2604 15.9507 23.7026 15.5095 24.0159C15.0684 24.3292 14.5411 24.4983 14 24.5ZM23.625 21H4.375C4.14298 20.9999 3.9205 20.9076 3.75644 20.7436C3.59237 20.5795 3.50014 20.357 3.5 20.125C3.50076 19.429 3.77757 18.7618 4.26969 18.2697C4.76181 17.7776 5.42904 17.5008 6.125 17.5H21.875C22.571 17.5008 23.2382 17.7776 23.7303 18.2697C24.2224 18.7618 24.4992 19.429 24.5 20.125C24.4999 20.357 24.4076 20.5795 24.2436 20.7436C24.0795 20.9076 23.857 20.9999 23.625 21Z" fill="#0B2A97"/>
                            </svg>
                            <div className="pulse-css"></div>
                         </a>
                         <div className="dropdown-menu rounded dropdown-menu-right">
                            <div id="DZ_W_Notification1" className="widget-media dz-scroll p-3 height380">
                               <ul className="timeline">
                                  <li>
                                     <div className="timeline-panel">
                                        <div className="media mr-2">
                                           <img alt="image" width="50" src="images/avatar/1.jpg"/>
                                        </div>
                                        <div className="media-body">
                                           <h6 className="mb-1">Dr sultads Send you Photo</h6>
                                           <small className="d-block">29 July 2020 - 02:26 PM</small>
                                        </div>
                                     </div>
                                  </li>
                                  <li>
                                     <div className="timeline-panel">
                                        <div className="media mr-2 media-info">
                                           KG
                                        </div>
                                        <div className="media-body">
                                           <h6 className="mb-1">Resport created successfully</h6>
                                           <small className="d-block">29 July 2020 - 02:26 PM</small>
                                        </div>
                                     </div>
                                  </li>
                                  <li>
                                     <div className="timeline-panel">
                                        <div className="media mr-2 media-success">
                                           <i className="fa fa-home"></i>
                                        </div>
                                        <div className="media-body">
                                           <h6 className="mb-1">Reminder : Treatment Time!</h6>
                                           <small className="d-block">29 July 2020 - 02:26 PM</small>
                                        </div>
                                     </div>
                                  </li>
                                  <li>
                                     <div className="timeline-panel">
                                        <div className="media mr-2">
                                           <img alt="image" width="50" src="images/avatar/1.jpg"/>
                                        </div>
                                        <div className="media-body">
                                           <h6 className="mb-1">Dr sultads Send you Photo</h6>
                                           <small className="d-block">29 July 2020 - 02:26 PM</small>
                                        </div>
                                     </div>
                                  </li>
                                  <li>
                                     <div className="timeline-panel">
                                        <div className="media mr-2 media-danger">
                                           KG
                                        </div>
                                        <div className="media-body">
                                           <h6 className="mb-1">Resport created successfully</h6>
                                           <small className="d-block">29 July 2020 - 02:26 PM</small>
                                        </div>
                                     </div>
                                  </li>
                                  <li>
                                     <div className="timeline-panel">
                                        <div className="media mr-2 media-primary">
                                           <i className="fa fa-home"></i>
                                        </div>
                                        <div className="media-body">
                                           <h6 className="mb-1">Reminder : Treatment Time!</h6>
                                           <small className="d-block">29 July 2020 - 02:26 PM</small>
                                        </div>
                                     </div>
                                  </li>
                               </ul>
                            </div>
                            <a className="all-notification" href="#0">See all notifications <i className="ti-arrow-right"></i></a>
                         </div>
                      </li>
                      <li className="nav-item dropdown header-profile">
                         <a className="nav-link" href="#0" role="button" data-toggle="dropdown">
                            <Image alt="img" src={"assets/images/17.jpg"} />
                            <div className="header-info">
                               <span className="text-black"><strong>Peter Parkur</strong></span>
                               <p className="fs-12 mb-0">Super Admin</p>
                            </div>
                         </a>
                         <div className="dropdown-menu dropdown-menu-right">
                            <a href="app-profile.html" className="dropdown-item ai-icon">
                               <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="12" cy="7" r="4"></circle>
                               </svg>
                               <span className="ml-2">Profile </span>
                            </a>
                            <a href="email-inbox.html" className="dropdown-item ai-icon">
                               <svg id="icon-inbox" xmlns="http://www.w3.org/2000/svg" className="text-success" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                  <polyline points="22,6 12,13 2,6"></polyline>
                               </svg>
                               <span className="ml-2">Inbox </span>
                            </a>
                            <a href="page-login.html" className="dropdown-item ai-icon">
                               <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                  <polyline points="16 17 21 12 16 7"></polyline>
                                  <line x1="21" y1="12" x2="9" y2="12"></line>
                               </svg>
                               <span className="ml-2">Logout </span>
                            </a>
                         </div>
                      </li>
                   </ul>
                </div>
             </nav>
          </div>
       </div>
       <div className="deznav">
          <div className="deznav-scroll">
             <ul className="metismenu" id="menu">
                <li>
                   <Link className="ai-icon active" aria-expanded="false" to="/dealership">
                   <i className="fa fa-dashboard"></i>
                   <span className="nav-text">Dashboard</span>
                   </Link>
                </li>
                <li><a className="ai-icon" href="#0" aria-expanded="false">
                   <i className="fa fa-file"></i>
                   <span className="nav-text">Inventory</span>
                   </a>
                </li>
                <li>
                   <Link className="ai-icon"  aria-expanded="false" to="/">
                   <i className="fa fa-file"></i>
                   <span className="nav-text">Ongoing Deals</span>
                   </Link>
                </li>
                <li>
                   <Link className="ai-icon" aria-expanded="false" to="/earnings">
                   <i className="fa fa-file"></i>
                   <span className="nav-text">Completed deals</span>
                   </Link>
                </li>
                <li>
                   <Link className="ai-icon" to="/emiCalculator" aria-expanded="false">
                   <i className="fa fa-calculator"></i>
                   <span className="nav-text">EMI Calculator</span>
                   </Link>
                </li>
                <li>
                   <Link href="#0" className="ai-icon" aria-expanded="false" to="/uploadDocument">
                   <i className="fa fa-file"></i>
                   <span className="nav-text">Upload Documents</span>
                   </Link>
                </li>
                <li><a className="ai-icon" href="#0" aria-expanded="false">
                   <i className="fa fa-bell"></i>
                   <span className="nav-text">Notification</span>
                   </a>
                </li>
                <li><a className="ai-icon" href="#0" aria-expanded="false">
                   <i className="fa fa-question-circle"></i>
                   <span className="nav-text">Help</span>
                   </a>
                </li>
             </ul>
             <Link to="/">
             <div className="add-menu-sidebar">
                <div className="user_main_icon_box d-flex justify-content-center align-items-center">
                   <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-white " width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                   </svg>
                </div>
                <div className="">
                   <h5 className="text-white	font-w500 mb-0">Jhon Deo</h5>
                   <p className=" mb-0"> Account</p>
                </div>
             </div>
             </Link>
          </div>
       </div>
    </header>
    <div className="content-body">
       <div className="container-fluid">

          <section className="stage_lead_sec">
             <Row className="mb-4">
                <Col lg={12} className="mb-2">
                <div className="d-block pb-0 border-0">
                   <div className="mr-auto pr-3">
                      <h4 className="text-black font-w600 fs-20">Inventory</h4>
                   </div>
                </div>
                </Col>
             </Row>
             <div className="row dataTables_wrapper">
                <div class="col-lg-12 mt-0">
                   <div class="card">
                      <div class="card-body">
                         <div class="table-responsive">
                            <table class="table table-responsive-md">
                               <thead>
                                 <tr>
                                   <th class="width80">S.NO</th>
                                   <th>PPL</th>
                                   <th>PL</th>
                                   <th>Variant</th>
                                   <th>Colour</th>
                                   <th>Stocks</th>
                                   <th>Ex-Showroom Price</th>
                                   <th>Cash Discount</th>
                                   <th>RTO Charges</th>
                                   <th>Commission</th>

                                 </tr>
                               </thead>
                               <tbody>
                                 <tr>
                                   <td><strong>01</strong></td>
                                   <td>SCV-Mini</td>
                                   <td>Ace Gold</td>
                                   <td>Diesel</td>
                                   <td>White</td>
                                   <td>3</td>
                                   <td>₹5,67,684</td>
                                   <td>₹5000</td>
                                   <td>₹9,283</td>
                                   <td>₹7,373</td>

                                 </tr>
                                  <tr>
                                     <td><strong>02</strong></td>
                                     <td>SCV-Mini</td>
                                     <td>Ace Gold</td>
                                     <td>Diesel</td>
                                     <td>White</td>
                                     <td>3</td>
                                     <td>₹5,67,684</td>
                                     <td>₹5000</td>
                                     <td>₹9,283</td>
                                     <td>₹7,373</td>
                                  </tr>
                                  <tr>
                                     <td><strong>03</strong></td>
                                     <td>SCV-Mini</td>
                                     <td>Ace Gold</td>
                                     <td>Diesel</td>
                                     <td>White</td>
                                     <td>3</td>
                                     <td>₹5,67,684</td>
                                     <td>₹5000</td>
                                     <td>₹9,283</td>
                                     <td>₹7,373</td>
                                  </tr>
                               </tbody>
                            </table>
                         </div>
                         <div class="d-flex justify-content-between mt-3">
                            <div class="dataTables_info pl-3" id="example_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                            <div class="dataTables_paginate paging_simple_numbers" id="example_paginate"><a class="paginate_button previous disabled" aria-controls="example" data-dt-idx="0" tabindex="0" id="example_previous">Previous</a><span><a class="paginate_button current" aria-controls="example" data-dt-idx="1" tabindex="0">1</a><a class="paginate_button " aria-controls="example" data-dt-idx="2" tabindex="0">2</a><a class="paginate_button " aria-controls="example" data-dt-idx="3" tabindex="0">3</a><a class="paginate_button " aria-controls="example" data-dt-idx="4" tabindex="0">4</a><a class="paginate_button " aria-controls="example" data-dt-idx="5" tabindex="0">5</a><a class="paginate_button " aria-controls="example" data-dt-idx="6" tabindex="0">6</a></span><a class="paginate_button next" aria-controls="example" data-dt-idx="7" tabindex="0" id="example_next">Next</a></div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </section>
       </div>
    </div>
    <Footer/>


      </>

    );
  }
}
