import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Header from '../header/header';
import Footer from '../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default class Dealer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        {/* <Header /> */}
        <div className="content-body">
          <div className="container-fluid">


            <section className="stage_lead_sec">

              <div className="row dataTables_wrapper">
                <Col xl={12}>
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <h4 className="card-title">Notifications</h4>

                    </div>
                    <div className="card-body">
                      <div className="widget-media ">

                        <ul className="timeline">
                          <li>
                            <div class="timeline-panel">
                              <div class="media mr-2">
                                <Image src="assets/images/17.jpg" alt="img" />
                              </div>
                              <div class="media-body">
                                <h6 class="mb-1">Lorem Ipsum is simply dummy text</h6>
                                <p className="mb-0">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                
                              </div>
                              <div class="time">
                              <small class="d-block">29 July 2020 - 02:26 PM</small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="timeline-panel">
                              <div class="media mr-2">
                                <Image src="assets/images/17.jpg" alt="img" />
                              </div>
                              <div class="media-body">
                                <h6 class="mb-1">Lorem Ipsum is simply dummy text</h6>
                                <p className="mb-0">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                
                              </div>
                              <div class="time">
                              <small class="d-block">29 July 2020 - 02:26 PM</small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="timeline-panel">
                              <div class="media mr-2">
                                <Image src="assets/images/17.jpg" alt="img" />
                              </div>
                              <div class="media-body">
                                <h6 class="mb-1">Lorem Ipsum is simply dummy text</h6>
                                <p className="mb-0">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                
                              </div>
                              <div class="time">
                              <small class="d-block">29 July 2020 - 02:26 PM</small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="timeline-panel">
                              <div class="media mr-2">
                                <Image src="assets/images/17.jpg" alt="img" />
                              </div>
                              <div class="media-body">
                                <h6 class="mb-1">Lorem Ipsum is simply dummy text</h6>
                                <p className="mb-0">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                
                              </div>
                              <div class="time">
                              <small class="d-block">29 July 2020 - 02:26 PM</small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="timeline-panel">
                              <div class="media mr-2">
                                <Image src="assets/images/17.jpg" alt="img" />
                              </div>
                              <div class="media-body">
                                <h6 class="mb-1">Lorem Ipsum is simply dummy text</h6>
                                <p className="mb-0">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                
                              </div>
                              <div class="time">
                              <small class="d-block">29 July 2020 - 02:26 PM</small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="timeline-panel">
                              <div class="media mr-2">
                                <Image src="assets/images/17.jpg" alt="img" />
                              </div>
                              <div class="media-body">
                                <h6 class="mb-1">Lorem Ipsum is simply dummy text</h6>
                                <p className="mb-0">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                
                              </div>
                              <div class="time">
                              <small class="d-block">29 July 2020 - 02:26 PM</small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="timeline-panel">
                              <div class="media mr-2">
                                <Image src="assets/images/17.jpg" alt="img" />
                              </div>
                              <div class="media-body">
                                <h6 class="mb-1">Lorem Ipsum is simply dummy text</h6>
                                <p className="mb-0">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                
                              </div>
                              <div class="time">
                              <small class="d-block">29 July 2020 - 02:26 PM</small>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="d-md-flex justify-content-between mt-3">
                      <div
                        className="dataTables_info pl-3"
                        id="example_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing 1 to 10 of 57 entries
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example_paginate"
                      >
                        <a
                          className="paginate_button previous disabled"
                          aria-controls="example"
                          data-dt-idx="0"
                          tabIndex="0"
                          id="example_previous"
                        >
                          Previous
                        </a>
                        <span>
                          <a
                            className="paginate_button current"
                            aria-controls="example"
                            data-dt-idx="1"
                            tabIndex="0"
                          >
                            1
                          </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="2"
                            tabIndex="0"
                          >
                            2
                          </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="3"
                            tabIndex="0"
                          >
                            3
                          </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="4"
                            tabIndex="0"
                          >
                            4
                          </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="5"
                            tabIndex="0"
                          >
                            5
                          </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="6"
                            tabIndex="0"
                          >
                            6
                          </a>
                        </span>
                        <a
                          className="paginate_button next mr-0"
                          aria-controls="example"
                          data-dt-idx="7"
                          tabIndex="0"
                          id="example_next"
                        >
                          Next
                        </a>
                      </div>
                    </div>
                    </div>
                  </div>
                </Col>
              </div>
            </section>
          </div>
        </div>
        {/* <Footer /> */}
      </>
    );
  }
}
