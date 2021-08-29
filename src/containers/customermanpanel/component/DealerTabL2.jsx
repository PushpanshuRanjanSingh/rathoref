import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import apiUrl from "../../../globals/config";
import showNotification from "../../../services/notificationService";
import * as constant from "../../../services/constant";
var fileDownload = require("js-file-download");
export default function DealerTabL2(props) {
  let history = useHistory();
  const [page, setPage] = useState(1);
  const [datacount, setdatacount] = useState();
  const [data, setdata] = useState([]);
  useEffect(() => {
    getData();
  }, [page]);
  const getData = (page) => {
    let index = 0;
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "cmtDealer/getL2?skip=" + page + "&limit=10", headers)

      .then((resp) => {
        setdata(resp?.data?.data[index].data);
        setdatacount(resp?.data?.data[index].count);
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  const handleAction = (page) => {
    let token = localStorage.getItem("myData");
    let index = 0;
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "cmtDealer/Action", headers)

      .then((resp) => {
        setdata(resp?.data?.data[index].data);
        setdatacount(resp?.data?.data[index].count);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };

  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };
  function download(url, name, url2, name2) {
    var fileName = name + "." + url.split(".")[1];
    var fileName2 = name2 + "." + url.split(".")[1];
    axios
      .get(apiUrl + url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, fileName);
      });

    axios
      .get(apiUrl + url2, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, fileName2);
      });
  }
  const reject = (id) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .put(apiUrl + "cmtDealer/l2Object", { id }, headers)

      .then((resp) => {
        showNotification("danger", resp ? "Reject Lead Successful" : "");
        getData(page);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const approve = (id) => {
    history.push({
      pathname: "/insuranceSelect",
      data: id,
    });


  };

  const viewClient = (phoneNo, otp) => {
    history.push({
      pathname: "/viewdocumentl2",
      data: { phoneNo, otp },
      stage: constant.STAGE,
    });
  };
  return (
    <section className="stage_lead_sec mt-5">
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
                  placeholder=""
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
                        <span>Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((data, index) => (
                      <tr>
                        <td>
                          <strong>
                            {(page - 1) * constant.ONPAGE + index + 1}
                          </strong>
                        </td>
                        <td onClick={() => viewClient(data.phoneNo, data.otp)}>
                          {data.firstName}
                        </td>
                        <td>{data.phoneNo}</td>

                        <td>{data?.vehicle[0]?.vehicleDescription[0]?.vehicleName}</td>

                        <td>
                          <span onClick={e=>approve(data._id)} class="badge light badge-success mr-1">
                            Approved
                          </span>
                          
                          <span
                            onClick={(e) => reject(data._id)}
                            class="badge light badge-danger"
                          >
                            Object
                          </span>
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
                  Showing {constant.START} to {constant.ONPAGE} of {datacount}{" "}
                  entries
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
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
