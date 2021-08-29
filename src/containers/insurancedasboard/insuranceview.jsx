import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import base from "../../globals/base";
import Header from "../header/header";
import Footer from "../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import * as constant from "../.../../../services/constant";
import axios from "axios";
import showNotification from "../../services/notificationService";
import apiUrl from "../../globals/config";
import ReactPaginate from "react-paginate";
import ModelDownload from "../modelDownload";
import Slidercompoent from './Slidercompoent';
var fileDownload = require("js-file-download");
function Insuranceview(props) {
  const [earningShow, setearningShow] = React.useState(false);
  // const [download, setdownload] = useState({});
  const [page, setPage] = useState(1);
  const [datacount, setdatacount] = useState();
  const [leadData, setleadData] = useState([]);
  const [confirmLead, setconfirmLead] = useState([]);
  const [hidebannerr, sethidebannerr] = useState(false);
  useEffect(() => {
    ongoing(1);
    allbanner();
  }, []);
  let index =0
  const ongoing = (page) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "user/l4stage?skip=" + page + "&limit=5",headers)
      .then((resp) => {
        setconfirmLead(resp?.data?.data[index].data); //
        setdatacount(resp?.data?.data[index].count);
      })
      .catch((err) => {
        // showNotification("danger", err.message);
      });
  };
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };
  const earningShowfunction = () => {
    if (!earningShow) {
      setearningShow(true);
    } else {
      setearningShow(false);
    }
  };
  const viewClient = (phoneNo, otp) => {
    props.history.push({
      pathname: "/view",
      data: { phoneNo, otp },
    });
  };
  const allbanner = (page) => {
    let token = localStorage.getItem("myData");

    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + "advertisement/getList?skip=" + 1 + "&limit=10&panel=3",
        headers
      )
      .then((resp) => {
        if (resp?.data.success) {
         
          setleadData(resp?.data.data[0].data);
        
        }
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  
  const hideBanner = () => {
    sethidebannerr(true);
  };
  function download(url, name) {
    var fileName = name + "." + url.split(".")[1];
   
 
     axios
      .get(apiUrl + url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, fileName);
      });
  }
  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <Row className="mb-4">
            <Slidercompoent/>
            <Col xl={3}>
              <Row className="mb-4 db_lft_grid">
                <Col sm={6} xl={12}>
                  <div className="widget-stat card shutter-in-vertical">
                    <div className="card-body p-4 d-flex flex-column justify-content-center">
                      <div className="media ai-icon">
                        <span class="mr-3 bgl-danger text-danger">
                          <Image
                            className="w-75"
                            alt="img"
                            src={"assets/images/leads.png"}
                          />
                        </span>
                        <div className="media-body">
                          <p className="mb-1">New Cases</p>
                          <h4 className="mb-0">
                            {datacount ? datacount : "0"}
                          </h4>
                        </div>
                      </div>
                      <div className="d-flex mt-3 ">
                       
                        <a
                          href="/Clientdetails"
                          className="btn btn-outline-danger btn-xxs ml-2"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
                
              </Row>
            </Col>
          </Row>

          <section className="stage_lead_sec">
            <div className="row dataTables_wrapper">
              <div class="col-lg-12 mt-0">
                <div class="card">
                  <div class="card-body">
                    <div
                      id="example_filter"
                      class="dataTables_filter d-flex justify-content-end"
                    >
                      <input
                        type="search"
                        class="w-30 mr-3"
                        placeholder=""
                        aria-controls="example"
                      />{" "}
                      <a href="#0" class="btn btn-primary rounded d-block">
                        Search
                      </a>
                    </div>
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr className="table_th">
                            <th class="width100">
                              <span>S.NO</span>
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
                           
                            <th>Download</th>
                          </tr>
                        </thead>
                        <tbody>
                          
                          {confirmLead.map((data, index) => (
                            <tr>
                              <td>
                                <strong>{(page - 1) * constant.ONPAGE + index + 1}</strong>
                              </td>
                              <td
                                onClick={() =>
                                  viewClient(data.phoneNo, data.otp)
                                }
                              >
                                {data.firstName}
                              </td>
                              <td>{data.phoneNo}</td>
                              <td>{data?.vehicle[0]?.vehicleDescription[0]?.vehicleName}</td>
                             
                              <td class="download-icon">
                                {data?.taxInvoiceL2 ? (
                                  <span className="ms-btn">
                                    <i
                                      class="fa fa-download"
                                      aria-hidden="true"
                                      onClick={(e) =>
                                        download(data?.taxInvoiceL2,'taxinvoice')
                                      }
                                    ></i>
                                  </span>
                                ) : (
                                  <span className="ms-btn">
                                    <i
                                      class="fa fa-download"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div class="d-flex justify-content-between mt-3">
                      <div
                        class="dataTables_info pl-3"
                        id="example_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing {constant.START} to {constant.ONPAGE} of {datacount} entries
                      </div>
                      <div
                        class="dataTables_paginate paging_simple_numbers"
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
      <ModelDownload download={download} />
    </>
  );
}

export default Insuranceview;
