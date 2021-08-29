import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import base from "../../globals/base";
import Header from "../header/header";
import Footer from "../footer/footer";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import showNotification from "../../.../../services/notificationService";

import * as constant from "../.../../../services/constant";
import Swal from "sweetalert2";
import apiUrl from "../../globals/config";
import ReactPaginate from "react-paginate";
function Index(props) {
  const [search, setsearch] = useState("");
  const [download, setdownload] = useState({});
  const [leadData, setleadData] = useState([]);
  const [datacount, setdatacount] = useState();
  const [page, setPage] = useState(constant.START);
  const [filter, setfilter] = useState(constant.filter);
  const [stage, setstage] = useState("");
  const [earning, setearning] = useState("");
  const [available, setavailable] = useState(false);

  useEffect(() => {
    leadsLists(page, filter);
    stagelead();
    earningget();
  }, [page]);
  let index = 0;
  const earningget = () => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "earnings/getAgentEarning", headers)

      .then((resp) => {
        
        setearning(resp?.data?.data); //availableBalance
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const stagelead = () => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "user/agentStages", headers)

      .then((resp) => {
        setstage(resp?.data);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const viewLeads = (phoneNo, otp, id) => {
    props.history.push({
      pathname: "/viewLead",
      data: { phoneNo, otp },
    });
  };
  const leadsLists = (page, filter) => {
    let token = localStorage.getItem("myData");

    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + "user/getLead?skip=" + page + "&limit=10&filter=" + filter,
        headers
      )
      .then((resp) => {
        if (resp?.data.success) {
          setleadData(resp?.data.data[index].data);
          setdatacount(resp?.data.data[index].count);
        }
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };

  const handlePageClick = (data) => {
    leadsLists(parseInt(data.selected) + constant.START,filter);
  };
  const updateLead = (phoneNo, otp, id) => {
    props.history.push({
      pathname: "/UpdateData",
      data: { phoneNo, otp, id },
    });
  };

  const popupdownload = (id) => {
    axios
      .get(apiUrl + "user/downloadDoc/" + id)
      .then((resp) => {
        setdownload(resp?.data?.data);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const serchFun = () => {
    let token = localStorage.getItem("myData");
    let checkReg = /(^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$)/g;
    if (checkReg.test(search)) {
      var phoneNo = search;
      let headers = {
        headers: {
          "x-token": `Bearer ${token}`,
        },
      };
      axios
        .post(apiUrl + "user/searchByKey", { phoneNo }, headers)
        .then((resp) => {
          setleadData(resp?.data?.data);
        })
        .catch((err) => {
          showNotification("danger", err.message);
        });
    } else {
      var firstName = search;
      let headers = {
        headers: {
          "x-token": `Bearer ${token}`,
        },
      };
      axios
        .post(apiUrl + "user/searchByKey", { firstName }, headers)
        .then((resp) => {
          setleadData(resp?.data?.data);
        })
        .catch((err) => {
          showNotification("danger", err.message);
        });
    }
  };
  const handleSearch = (e) => {
    setsearch(e.target.value);
  };
  const clearSearch = (e) => {
    setsearch("");
    leadsLists(page);
  };
  const handleChange = (e) => {
    leadsLists(page, e.target.value);
  };
  const callSwal = (amount) => {
    if ((amount) => 100) {
      if (stage?.userStatus) {
        let token = localStorage.getItem("myData");
        let headers = {
          headers: {
            "x-token": `Bearer ${token}`,
          },
        };
        var earningdata={
          "inprogressBalance":earning?.inprogressBalance+earning?.availableBalance,
          "earningBalance":earning?.earningBalance
        }
        axios
          .post(apiUrl + "earnings/inprogressRequest",earningdata, headers)

          .then((resp) => {
            
            earningget();
            // setearning(resp?.data?.data); //availableBalance
            Swal.fire({
              icon: "success",
              title: `Your ₹ ${amount}rupee will be transferred to your bank Shortly`,
              showConfirmButton: false,
              timer: 2500,
            });
          })
          .catch((err) => {
            showNotification("danger", err.message);
          });
        
      } else {
        showNotification("danger", "Profile In Complete");
      }
    } else {
      showNotification("danger", "Minimum ₹ 100 rupee required ");
    }
  };
  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <div className=" d-flex justify-content-end dataTables_wrapper"></div>
          <Row className="mb-4 leads_row">
            <Col sm={6} xl={3}>
              <div className="widget-stat card shutter-in-vertical">
                {/* <Link className='' to='/'> */}
                <div className="card-body p-4">
                  <div className="media ai-icon d-flex justify-content-center flex-column">
                    <span className="mr-3  text-danger mb-1">
                      <Image
                        className=""
                        alt="img"
                        src={"assets/images/earning.png"}
                      />
                    </span>
                    <div className="media-body text-center">
                      <h5 className="mb-2">
                        {" "}
                        &#8377;
                        {earning && earning?.earningBalance
                          ? earning.earningBalance
                          : "0"}
                      </h5>
                      <h5 className="mb-0"> Total Earning</h5>
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </div>
            </Col>
            <Col sm={6} xl={3}>
              <div className="widget-stat card shutter-in-vertical">
                {/* <Link className='' to='/'> */}
                <div className="card-body p-4">
                  <div className="media ai-icon d-flex justify-content-center flex-column">
                    <span className="mr-3  text-danger mb-1">
                      <Image
                        className=""
                        alt="img"
                        src={"assets/images/transfertobank.png"}
                      />
                    </span>
                    <div className="media-body text-center">
                      <h5 className="mb-2">
                        &#8377;
                        {earning && earning?.transferredBalance
                          ? earning.transferredBalance
                          : "0"}
                      </h5>
                      <h5 className="mb-0">Transfermed to bank</h5>
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </div>
            </Col>
            <Col sm={6} xl={3}>
              <div className="widget-stat card shutter-in-vertical">
                {/* <Link className='' to='/'> */}
                <div className="card-body p-4">
                  <div className="media ai-icon d-flex justify-content-center flex-column">
                    <span className="mr-3  text-danger mb-1">
                      <Image
                        className=""
                        alt="img"
                        src={"assets/images/transfertobank.png"}
                      />
                    </span>
                    <div className="media-body text-center">
                      <h5 className="mb-2">
                        &#8377;
                        {earning && earning?.inprogressBalance
                          ? earning.inprogressBalance
                          : "0"}
                      </h5>
                      <h5 className="mb-0">In-Process</h5>
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </div>
            </Col>

            <Col sm={6} xl={3}>
              <div className="widget-stat card shutter-in-vertical">
                {/* <Link className='' to='/'> */}
                <div className="card-body p-4">
                  <div className="media ai-icon d-flex justify-content-center flex-column">
                    <span className="mr-3  text-danger mb-1">
                      <Image
                        className=""
                        alt="img"
                        src={"assets/images/available.png"}
                      />
                    </span>
                    <div className="media-body text-center">
                      <h5 className="mb-2">
                        &#8377;
                        {earning && earning?.availableBalance
                          ? earning.availableBalance
                          : "0"}
                      </h5>
                      <h5 className="mb-2">Available</h5>
                      <a
                        href="javascript:void(0)"
                        onClick={(e) => callSwal(earning.availableBalance)}
                        className="btn btn-outline-danger btn-xxs ml-2 d-block"
                      >
                        Transfer to bank
                      </a>
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </div>
            </Col>
          </Row>
          <section className="ttm-row ttm-bg ttm-bgimage-yes bg-img3 process-section clearfix mb-3">
            <Row className="mb-4">
              <Col lg={12} className="mb-2">
                <div className="d-block pb-0 border-0">
                  <div className="mr-auto pr-3">
                    <h4 className="text-black font-w600 fs-20">
                      Stages of a lead
                    </h4>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="container-fluid mt-1 pt-0 ">
              <div className="row mb-5">
                <div className="col-lg-12">
                  <div className="row ttm-processbox-wrapper ttm-processbox-wrapper2 justify-content-center">
                    <div className="col-md-2 col-lg-2 mb-3 mb-lg-0">
                      <div className="ttm-processbox">
                        <div className="ttm-box-image">
                          <div className="process-num">
                            <span className="number">s0</span>
                          </div>
                        </div>
                        <div className="featured-content">
                          <div className="featured-title">
                            <h6 className="mb-1">Confirmed Lead </h6>
                            <h5 className="mb-2">
                              {stage?.confirmLead ? stage?.confirmLead : "0"}
                            </h5>
                          </div>
                        </div>
                      </div>

                      <Link className="step_btn_cus1" to="/">
                        {" "}
                        You get paid here{" "}
                      </Link>
                    </div>
                    <div className="col-md-2 col-lg-2 mb-3 mb-lg-0">
                      <div className="ttm-processbox res-991-mb-50">
                        <div className="ttm-box-image">
                          <div className="process-num">
                            <span className="number">S1</span>
                          </div>
                        </div>
                        <div className="featured-content">
                          <div className="featured-title">
                            <h6 className="mb-1">Quotation Generated </h6>
                            <p>
                              {stage?.quotationPdf ? stage?.quotationPdf : "0"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2 mb-3 mb-lg-0">
                      <div className="ttm-processbox">
                        <div className="ttm-box-image">
                          <div className="process-num">
                            <span className="number">S2</span>
                          </div>
                        </div>
                        <div className="featured-content">
                          <div className="featured-title">
                            <h6 className="mb-1">Under Finance</h6>
                            <p>
                              {stage?.underFinance ? stage?.underFinance : "0"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2 mb-3 mb-lg-0">
                      <div className="ttm-processbox">
                        <div className="ttm-box-image">
                          <div className="process-num">
                            <span className="number">S3</span>
                          </div>
                        </div>
                        <div className="featured-content">
                          <div className="featured-title">
                            <h6 className="mb-1">Down Payment </h6>
                            <p>
                              {stage?.downPayment ? stage?.downPayment : "0"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      <div className="ttm-processbox">
                        <div className="ttm-box-image">
                          <div className="process-num">
                            <span className="number">S4</span>
                          </div>
                        </div>
                        <div className="featured-content">
                          <div className="featured-title">
                            <h6 className="mb-1">Vehicle Delivered</h6>
                            <p>
                              {stage?.vehicleDelievered
                                ? stage?.vehicleDelievered
                                : "0"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Link className="step_btn_cus1" to="/">
                        {" "}
                        You get paid here{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="stage_lead_sec mt-5">
            <div className="row dataTables_wrapper">
              <div className="col-lg-12 mt-0">
                <div className="card">
                  <div className="card-body">
                    <div
                      id="example_filter"
                      class="dataTables_filter d-flex justify-content-end"
                    >
                      <div className="input-main-box">
                        <input
                          type="text"
                          class="w-30 mr-3"
                          placeholder="Enter Name/Contact no."
                          name="search"
                          value={search}
                          aria-controls="example"
                          onChange={(e) => handleSearch(e)}
                        />
                        <i
                          class="fa fa-times cus-cros-icon"
                          onClick={clearSearch}
                          aria-hidden="true"
                        ></i>
                      </div>{" "}
                      <a
                        href="javascript:void(0)"
                        onClick={serchFun}
                        class="btn btn-primary rounded d-block"
                      >
                        Search
                      </a>
                    </div>
                    <div className="table-responsive">
                      <table className="table">
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
                          </tr>
                        </thead>
                        <tbody>
                          {leadData.map((data, index) => {
                            if (index == constant.INDEX) {
                              var num = leadData.length;
                            } else {
                              var num = leadData.length - index;
                            }
                            return (
                              <tr>
                                <td>
                                  <strong>{num}</strong>
                                </td>
                                <td
                                  className="link-txt"
                                  onClick={() =>
                                    viewLeads(data.phoneNo, data.otp, data._id)
                                  }
                                >
                                  <u>{data.firstName}</u>
                                </td>
                                <td>{data.phoneNo}</td>
                                <td>Tata Ace - Diesel-Black</td>

                                <td>CO</td>
                                <td
                                  onClick={() =>
                                    updateLead(data.phoneNo, data.otp, data._id)
                                  }
                                >
                                  <span class="badge light badge-success">
                                    Update
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
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
                        Showing {constant.START} to {constant.ONPAGE} of{" "}
                        {datacount} entries
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example_paginate"
                      >
                        {datacount > constant.ONPAGE ? (
                          <ReactPaginate
                            previousLabel={"←Previous"}
                            nextLabel={"Next→"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={Math.ceil(datacount / constant.ONPAGE)}
                            initialPage={0}
                            marginPagesDisplayed={5}
                            onPageChange={(data) => handlePageClick(data)}
                            containerClassName={"pagination m-0"}
                            subContainerClassName={"pages pagination"}
                            pageClassName="page-item"
                            activeClassName={"active"}
                            activeLinkClassName={"page-link"}
                            pageLinkClassName={"page-link"}
                            nextClassName={"page-link arrow text-danger"}
                            previousLinkClassName={"page-link arrow"}
                            disableInitialCallback={true}
                          />
                        ) : (
                          ""
                        )}
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
