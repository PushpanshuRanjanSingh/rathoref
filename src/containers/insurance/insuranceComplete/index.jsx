import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import * as constant from "../../../services/constant";
import showNotification from "../../../services/notificationService";
import apiUrl from "../../../globals/config";
import ReactPaginate from "react-paginate";
var fileDownload = require("js-file-download");
function Index(props) {
  const [earningShow, setearningShow] = React.useState(false);
  const [page, setPage] = useState(1);
  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  useEffect(() => {
    ongoing(page);
  }, [page]);
  let index =0
  const ongoing = (page) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + "user/completedcaseInsurance?skip=" + page + "&limit=10",
        headers
      )

      .then((resp) => {
        setconfirmLead(resp?.data?.data[index].data); 
        setdatacount(resp?.data?.data[index].count);
      })
      .catch((err) => {
        showNotification("danger", err.message);
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
  const Upload = (id) => {
    props.history.push({
      pathname: "/insuranceUpload",
      data: id,
    });
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
                            <th>
                              <span>Expiry Date</span>
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
                            
                              <td>
                               
                                {data?.expirtDate}
                                
                              </td>

                              <td class="download-icon">
                                {data && data?.taxInvoiceL2 ? (
                                
                                    <i
                                    onClick={(e) => download(data.taxInvoiceL2,"taxinvoice")}
                                      class="fa fa-download"
                                      aria-hidden="true"
                                    ></i>
                                ) : (
                                  ""
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
      {/* <Footer /> */}
    </>
  );
}

export default Index;
