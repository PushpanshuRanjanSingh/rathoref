import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../../globals/base';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
// import apiUrl from "../../globals/config";
import apiUrl from '../../../globals/config';
function Index(props) {
  const [download, setdownload] = useState({});
  const [confirmLead, setconfirmLead] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'user/checkConfirmm?skip=1&limit=10', headers)
      .then((resp) => {
        setconfirmLead(resp?.data?.data[0].data);
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateLead = (data) => {
    props.history.push({
      pathname: '/PendingForm',
      data: data,
    });
  };
  const popupdownload = (id) => {
    axios
      .get(apiUrl + 'user/downloadDoc/' + id)
      .then((resp) => {
        setdownload(resp?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewOnGoingDeals = (phoneNo, otp, id) => {
    props.history.push({
      pathname: '/view',
      data: { phoneNo, otp },
    });
  };
  return (
    <>
      {/* <Header /> */}
      <div className='content-body'>
        <div className='container-fluid'>
          <section className='ttm-row ttm-bg ttm-bgimage-yes bg-img3 process-section clearfix mb-3'>
            <Row className='mb-4'>
              <Col lg={12} className='mb-2'>
                <div className='d-block pb-0 border-0'>
                  <div className='mr-auto pr-3'>
                    <h4 className='text-black font-w600 fs-20'>
                      Stages of a lead
                    </h4>
                  </div>
                </div>
              </Col>
            </Row>
            <div className='container-fluid mt-1 pt-0 '>
              <div className='row mb-5'>
                <div className='col-lg-12'>
                  <div className='row ttm-processbox-wrapper ttm-processbox-wrapper2 justify-content-center'>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div className='ttm-processbox'>
                        <div className='ttm-box-image'>
                          <div className='process-num'>
                            <span className='number'>L1</span>
                          </div>
                        </div>
                        <div className='featured-content'>
                          <div className='featured-title'>
                            <h6 className='mb-1'>Get delivery Order </h6>
                            <p>100</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div className='ttm-processbox res-991-mb-50'>
                        <div className='ttm-box-image'>
                          <div className='process-num'>
                            <span className='number'>L2</span>
                          </div>
                        </div>
                        <div className='featured-content'>
                          <div className='featured-title'>
                            <h6 className='mb-1'>Down Payment</h6>
                            <p>95</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div className='ttm-processbox'>
                        <div className='ttm-box-image'>
                          <div className='process-num'>
                            <span className='number'>L3</span>
                          </div>
                        </div>
                        <div className='featured-content'>
                          <div className='featured-title'>
                            <h6 className='mb-1'>Insurance</h6>
                            <p>75</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div className='ttm-processbox'>
                        <div className='ttm-box-image'>
                          <div className='process-num'>
                            <span className='number'>L4</span>
                          </div>
                        </div>
                        <div className='featured-content'>
                          <div className='featured-title'>
                            <h6 className='mb-1'>RTO/Permit </h6>
                            <p>65</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2'>
                      <div className='ttm-processbox'>
                        <div className='ttm-box-image'>
                          <div className='process-num'>
                            <span className='number'>L5</span>
                          </div>
                        </div>
                        <div className='featured-content'>
                          <div className='featured-title'>
                            <h6 className='mb-1'>Vehicle Delivered</h6>
                            <p>225+</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='stage_lead_sec'>
            <div className='row dataTables_wrapper'>
              <div class='col-lg-12 mt-0'>
                <div class='card'>
                  <div class='card-body'>
                    {/* <div id="example_filter" class="dataTables_filter d-flex justify-content-end"><input type="search" class="w-30 mr-3" placeholder="" aria-controls="example" /> <a href="#0" class="btn btn-primary rounded d-block">Search</a></div> */}
                    <div class='table-responsive'>
                      <table class='table'>
                        <thead>
                          <tr className='table_th'>
                            <th class='width100'>
                              <span>S.NO </span>
                            </th>
                            <th>
                              <span>Full Name</span>
                            </th>
                            <th>
                              <span>Contact Number</span>
                            </th>
                            <th>
                              <span>Prospected Vehicle</span>
                            </th>
                            <th>
                              <span>Stage</span>
                            </th>
                            <th>
                              <span>Action</span>
                            </th>
                            <th>Download</th>
                          </tr>
                        </thead>
                        <tbody>
                          {confirmLead.map((data, index) => (
                            <tr>
                              <td>
                                <strong>{index + 1}</strong>
                              </td>
                              <td
                                onClick={() =>
                                  viewOnGoingDeals(
                                    data.phoneNo,
                                    data.otp,
                                    data._id
                                  )
                                }>
                                {data.firstName}
                              </td>
                              <td>{data.phoneNo}</td>
                              <td>Tata Ace - Diesel-Black</td>
                              <td>L3</td>
                              <td>
                                <span
                                  class='badge light badge-success'
                                  onClick={() => updateLead(data._id)}>
                                  Update
                                </span>
                              </td>
                              <td class='download-icon'>
                                <span
                                  className='ms-btn'
                                  data-toggle='modal'
                                  data-target='#myModal'>
                                  <i
                                    class='fa fa-download'
                                    aria-hidden='true'
                                    onClick={() => popupdownload()}></i>
                                </span>
                              </td>
                              {/* <td class="download-icon"><a href="#0"><i class="fa fa-download" onClick={() => popupdownload(data._id)} aria-hidden="true"></i></a></td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className='d-md-flex justify-content-between mt-3'>
                      <div
                        className='dataTables_info pl-3'
                        id='example_info'
                        role='status'
                        aria-live='polite'>
                        Showing 1 to 10 of {confirmLead.length} entries
                      </div>
                      {/* <div className="dataTables_paginate paging_simple_numbers" id="example_paginate"><a className="paginate_button previous disabled" aria-controls="example" data-dt-idx="0" tabIndex="0" id="example_previous">Previous</a><span><a className="paginate_button current" aria-controls="example" data-dt-idx="1" tabIndex="0">1</a><a className="paginate_button " aria-controls="example" data-dt-idx="2" tabIndex="0">2</a><a className="paginate_button " aria-controls="example" data-dt-idx="3" tabIndex="0">3</a><a className="paginate_button " aria-controls="example" data-dt-idx="4" tabIndex="0">4</a><a className="paginate_button " aria-controls="example" data-dt-idx="5" tabIndex="0">5</a><a className="paginate_button " aria-controls="example" data-dt-idx="6" tabIndex="0">6</a></span><a className="paginate_button next" aria-controls="example" data-dt-idx="7" tabIndex="0" id="example_next">Next</a></div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div class='modal fade' id='myModal'>
        <div class='modal-dialog modal-dialog-centered modal-lg'>
          <div class='modal-content'>
            <div class='modal-body'>
              <button type='button' className='close' data-dismiss='modal'>
                &times;
              </button>

              <div class='profile-personal-info'></div>
              <table class='table borderless'>
                <tbody>
                  <tr>
                    <th> Name</th>
                    <td colSpan='2'>{download.firstName}</td>
                  </tr>
                  <tr>
                    <th> Contact Number</th>
                    <td colSpan='2'>{download.phoneNo}</td>
                  </tr>
                  {/* {download?.panDoc ? (
                    <>
                      <tr>
                        <th>Pan Card Image</th>
                        <td>
                          {" "}
                          <Image
                            className="doc_image"
                            alt="img"
                            src={
                              download?.panDoc
                                ? apiUrl + download.panDoc
                                : "assets/images/pan-card.jpg"
                            }
                          />
                        </td>
                        <td class="download-icon">
                          <span class="ms-btn">
                            <i class="fa fa-download" aria-hidden="true"></i>
                          </span>
                        </td>
                      </tr>
                      <tr></tr>
                    </>
                  ) : (
                    ""
                  )}
                  {download?.aadharDoc ? (
                    <>
                      <tr>
                        <th>Aadhaar Card Image</th>
                        <td>
                          {" "}
                          <Image
                            className="doc_image"
                            alt="img"
                            src={
                              download?.aadharDoc
                                ? apiUrl + download.aadharDoc
                                : "assets/images/pan-card.jpg"
                            }
                          />
                        </td>
                     

                       <td class="download-icon">
                          <span class="ms-btn">
                            <a href="#" data-href="assets/images/pan-card.jpg" download>
                            <i class="fa fa-download" aria-hidden="true"></i></a>
                          </span>
                        </td> 
                      </tr>
                      <tr></tr>
                    </>
                  ) : (
                    ""
                  )} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Index;
