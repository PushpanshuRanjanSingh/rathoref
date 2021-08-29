import React, { useEffect, useState } from "react";
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
import ReactPaginate from "react-paginate";
import apiUrl from "../../../globals/config";
import Stage from "../component/Stage";
function Index(props) {
  const [page, setPage] = useState(constant.START);
  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  useEffect(() => {
    ongoing(page);
  }, [page]);
  let index = 0;
  const ongoing = (page) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "user/l2stageNew?skip=" + page + "&limit=10",headers)

      .then((resp) => {
        setconfirmLead(resp?.data?.data[index]?.data); //
        setdatacount(resp?.data?.data[index]?.count);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + constant.START);
  };
  // const viewAmmount = (Amount) => {
  //   props.history.push({
  //     pathname: "/ammount",
  //     data: Amount,
  //   });
  // };

  const update = (id) => {
    props.history.push({
      pathname: "/financel2",
      data: id,
    });
  };
  const viewammount = (phoneNo, otp, id) => {
    props.history.push({
      pathname: "/view",
      data: { phoneNo, otp },
    });
  };
  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <Stage />
          <section className="stage_lead_sec">
            <div className="emi_row row dataTables_wrapper">
              <div className="col-lg-12 mt-0">
                <div className="card widget-stat">
                  <div class="card-header bg-custom-blue ">
                    <h4 class="card-title text-white">Do Ready Clients</h4>
                  </div>
                  <div className="card-body">
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
                            <th>Download</th>
                          </tr>
                        </thead>
                        <tbody>
                          {confirmLead.map((data, index) => (
                            <tr>
                              <td>
                                <strong>
                                  {(page - constant.START) * constant.ONPAGE + index + constant.START}
                                </strong>
                              </td>
                              <td
                                onClick={() =>
                                  viewammount(data.phoneNo, data.otp, data._id)
                                }
                              >
                                {data.firstName}
                              </td>
                              <td>{data.phoneNo}</td>
                              <td>{data?.vehicle[0]?.vehicleDescription[0]?.vehicleName}</td>
                              <td>F3</td>
                              <td>
                                <span
                                  className="badge light badge-success"
                                  onClick={() => update(data._id)}
                                >
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
                          ))}
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
                        Showing {(page -constant.START) *constant.ONPAGE+constant.START} to {((page-constant.START) +constant.START) *constant.ONPAGE} of{" "}
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
    </>
  );
}

export default Index;
