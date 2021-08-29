import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import styled from "styled-components";
import "owl.carousel/dist/assets/owl.theme.default.css";


function Index() {
  return (
    <>
   {/* <Header /> */}
      <div className="content-body">
        <div className="container-fluid">
          <section class="ttm-row ttm-bg ttm-bgimage-yes bg-img3 process-section clearfix">
            <Row className="">
              <Col lg={12} className="mb-2">
                <div className="d-block pb-0 border-0">
                  <div className="mr-auto pr-3">
                    <h4 className="text-black font-w600 fs-20">
                      Delivery View
                    </h4>
                  </div>
                </div>
              </Col>
            </Row>
          </section>
          <section className="stage_lead_sec mt-1">
            <div className="row dataTables_wrapper">
              <div className="col-lg-12 mt-0">
                <div className="card">
                  <div className="card-body">
                    <div
                      id="example_filter"
                      class="dataTables_filter d-flex justify-content-end"
                    >
                      <input
                        type="search"
                        class="w-30 mr-3"
                        aria-controls="example"
                      />{" "}
                      <a href="#0" class="btn btn-primary rounded d-block">
                        Search
                      </a>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-responsive-md">
                        <thead>
                          <tr className="table_th">
                            <th className="width100">
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
                          <tr>
                            <td>
                              <strong>01</strong>
                            </td>
                            <td>Mr. Bobby</td>
                            <td>1234567891</td>
                            <td>Tata Ace - Diesel-Black</td>
                            <td>CO</td>
                            <td>
                              <span className="badge light badge-success">
                                Update
                              </span>
                            </td>
                            <td class="download-icon">
                              <a href="#0">
                                <i
                                  class="fa fa-download"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>02</strong>
                            </td>
                            <td>Mr. Bobby</td>
                            <td>1234567891</td>
                            <td>Tata Ace - Diesel-Black</td>
                            <td>CO</td>
                            <td>
                              <span className="badge light badge-success">
                                Update
                              </span>
                            </td>
                            <td class="download-icon">
                              <a href="#0">
                                <i
                                  class="fa fa-download"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>03</strong>
                            </td>
                            <td>Mr. Bobby</td>
                            <td>1234567891</td>
                            <td>Tata Ace - Diesel-Black</td>
                            <td>CO</td>
                            <td>
                              <span className="badge light badge-success">
                                Update
                              </span>
                            </td>
                            <td class="download-icon">
                              <a href="#0">
                                <i
                                  class="fa fa-download"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
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
                          tabindex="0"
                          id="example_previous"
                        >
                          Previous
                        </a>
                        <span>
                          <a
                            className="paginate_button current"
                            aria-controls="example"
                            data-dt-idx="1"
                            tabindex="0"
                          >
                            1
                          </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="2"
                            tabindex="0"
                          >
                            2
                          </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="3"
                            tabindex="0"
                          >
                            3
                          </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="4"
                            tabindex="0"
                          >
                            4
                          </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="5"
                            tabindex="0"
                          >
                            5
                          </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="6"
                            tabindex="0"
                          >
                            6
                          </a>
                        </span>
                        <a
                          className="paginate_button next"
                          aria-controls="example"
                          data-dt-idx="7"
                          tabindex="0"
                          id="example_next"
                        >
                          Next
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Index;
