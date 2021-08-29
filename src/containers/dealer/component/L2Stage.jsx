import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import base from "../../../globals/base";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import showNotification from "../../../services/notificationService";
import axios from "axios";
import * as constant from "../../../services/constant";
import ReactPaginate from "react-paginate";
import apiUrl from "../../../globals/config";
import { useHistory } from "react-router-dom";
function L2stage(props) {
  const history = useHistory();
  const [download, setdownload] = useState({});
  const [page, setPage] = useState(constant.START);
  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  const [vehicle, setvehicle] = useState('')
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
      .get(apiUrl + "user/getL2StageUsersOnDealerPanel?skip=" + page + "&limit=10", headers)

      .then((resp) => {
        // allvechicle(resp?.data?.data[index]?.data[0]?.vehicle[0]?.vehicleID)
        setconfirmLead(resp?.data?.data[index].data);
        setdatacount(resp?.data?.data[index].count);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + constant.START);
  };
  const deleteOne = (id) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .delete(apiUrl + "user/deleteRecord/" + id, headers)

      .then((resp) => {
        ongoing(page);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };

  const updateOne = (phoneNo, otp, id) => {
    history.push({
      pathname: "/UpdateData",
      data: { phoneNo, otp, id },
    });
  };
  const generatePDF = (id) => {
    history.push({
      pathname: "/generatePDF",
      data: id,
    });
  };

  const viewClient = (phoneNo, otp) => {
    history.push({
      pathname: "/view",
      data: { phoneNo, otp },
    });
  };
  const dropLead = (id) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .put(apiUrl + "user/dropLead", { id }, headers)
      .then((resp) => {
        showNotification("success", resp ? "Droped Lead Successful" : "");
        ongoing(page);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const updateLead = (id) => {
    history.push({
      pathname: "/stagetwo",
      data: id,
    });
  };
  const viewOnGoingDeals = (phoneNo, otp, id) => {
    history.push({
      pathname: "/view",
      data: { phoneNo, otp },
    });
  };
  const popupdownload = (id) => {
    axios
      .get(apiUrl + "user/downloadDoc/" + id)
      .then((resp) => {
        setdownload(resp?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <section className="stage_lead_sec">
        <div className="row dataTables_wrapper">
          <div class="col-lg-12 mt-0">
            <div class="card">
              <div class="card-body">
              
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr className="table_th">
                        <th class="width100">
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
                          <span>Approved Date</span>
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
                            <strong>{(page - 1) * 10 + index + 1}</strong>
                          </td>
                          <td
                            onClick={() =>
                              viewOnGoingDeals(data.phoneNo, data.otp, data._id)
                            }
                          >
                            {data.firstName}
                            {data?.lastNmame ? " " + "****" : ""}
                          </td>
                          <td>{data?.phoneNo}</td>
                          <td>{data?.vehicle[0]?.vehicleDescription[0]?.vehicleName}</td>

                          <td>
                            {data.confirm == 1
                              ? "L1"
                              : data.confirm == 2
                              ? "L2"
                              : data.confirm == 3
                              ? "L3"
                              : data.confirm == 4
                              ? "L4"
                              : data.confirm == 5
                              ? "L5"
                              : "L0"}
                          </td>
                          <td>
                            {data?.approvedDate
                              ? data.approvedDate.split("T")[0]
                              : ""}
                          </td>
                          <td className="d-flex">
                            {/* <span
                      class="badge light badge-warning mr-2"
                      onClick={() =>
                        viewOnGoingDeals(
                          data.phoneNo,
                          data.otp,
                          data._id
                        )
                      }
                    >
                      View
                    </span> */}
                            <span
                              class="badge light badge-success"
                              onClick={() => updateLead(data._id)}
                            >
                              Update
                            </span>
                          </td>
                          <td class="download-icon">
                            <span
                              className="ms-btn"
                              // data-toggle="modal"
                              // data-target="#myModal"
                            >
                              <i
                                class="fa fa-download"
                                aria-hidden="true"
                                onClick={() => popupdownload(data._id)}
                              ></i>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="d-md-flex justify-content-between mt-3">
                  <div
                    className="dataTables_info pl-3"
                    id="example_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing 1 to 10 of {datacount} entries
                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="example_paginate"
                  >
                    {datacount > 10 ? (
                      <ReactPaginate
                        previousLabel={"←Previous"}
                        nextLabel={"Next→"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(datacount / 10)}
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
                    {/* <a
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
              className="paginate_button next"
              aria-controls="example"
              data-dt-idx="7"
              tabIndex="0"
              id="example_next"
            >
              Next
            </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default L2stage;
