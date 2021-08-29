import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import apiUrl from "../../../globals/config";
import showNotification from "../../../services/notificationService";
export default function Topfivefreshlead(props) {
  let history = useHistory();
  const [show, setshow] = useState(true);
  const [page, setPage] = useState(0);

  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  useEffect(() => {
    ongoing(page);
  }, [page]);
  const ongoing = (page) => {
   
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "home/getDetailsToContact?&offset=" + page)
      .then((resp) => {
       
        setconfirmLead(resp?.data?.data.getUserQuery); //user/getallRoles?skip=1&limit=109
        setdatacount(resp?.data?.data.countQueries);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1 - 1);
  };
  const approve = (phoneNo, otp, id) => {
    history.push({
      pathname: '/UpdateData',
      data: { phoneNo, otp, id },
      approved:id
    });
  };
  const reject = (id) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .post(apiUrl + 'user/cmtfreshLeadRejected', { id }, headers)

      .then((resp) => {
        showNotification("danger", resp?"Rejected Successful":"");
        ongoing(page);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  return (
    <section className="stage_lead_sec mt-5">
      <div className="row dataTables_wrapper">
        <div className="col-lg-12 mt-0">
          <div className="card">
            <div className="card-body">
             
              <div className="table-responsive">
                <table className="table table-responsive-md">
                  <thead>
                    <tr className="table_th">
                      <th className="width100">
                        <span>S.NO </span>
                      </th>

                      <th>
                        <span>Contact Number</span>
                      </th>
                      {/* <th>
                        <span>Name</span>
                      </th> */}
                      {/* <th>
                        <span>City</span>
                      </th> */}
                      <th>
                        <span>Brand</span>
                      </th>
                      <th>
                        <span> Model</span>
                      </th>
                      <th>
                        <span> Fuel Type</span>
                      </th>
                      {/* <th>
                        <span>Approve</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {confirmLead.map((data, index) => (
                      <tr>
                        <td>
                          <strong>{index + 1}</strong>
                        </td>

                        <td>{data.phoneNumber}</td>
                        {/* <td>{data.firstName}{data.lastName}</td> */}
                        {/* <td>{data.city}</td> */}

                        <td>{data.brand}</td>

                        <td>{data.model}</td>

                        <td>{data.fuel}</td>
                        <td>
                          {data.status || data.status == false ? (
                            <>
                              {data.status ? (
                                <span class='badge light badge-success mr-1'>
                                  Approved
                                </span>
                              ) : (
                                <span class='badge light badge-danger'>
                                  Rejected
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                             
                            </>
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
                  Showing 1 to 10 of {datacount} entries
                </div>
                <div
                  class="dataTables_paginate paging_simple_numbers"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
