import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import apiUrl from '../../../globals/config';
export default function Topfivefreshlead(props) {
  let history = useHistory();
  const [show, setshow] = useState(true);
  const [page, setPage] = useState(1);

  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  useEffect(() => {
    ongoing(page);
  }, [page]);
  const ongoing = (page) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'user/cmtfinanceApproved?skip=' + page + '&limit=10')

      .then((resp) => {
        setconfirmLead(resp?.data?.data[0].data); //user/getallRoles?skip=1&limit=109
        setdatacount(resp?.data?.data[0].count);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };
  const updateOne = (phoneNo, otp, id) => {
    history.push({
      pathname: '/UpdateData',
      data: { phoneNo, otp, id },
    });
  };
  const deleteOne = (id) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .delete(apiUrl + 'user/deleteRecord/' + id, headers) //http://localhost:3040/user/deleteRecord/60543c0fc166d7237d880b1f

      .then((resp) => {
        ongoing(page);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewClient = (phoneNo, otp) => {
    history.push({
      pathname: '/view',
      data: { phoneNo, otp },
    });
  };
  const approve = (id) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .post(apiUrl + 'user/cmtfreshLeadApproved', { id }, headers)

      .then((resp) => {
        ongoing(page);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendtodeler = (id) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .put(apiUrl + 'user/sendToDealer', { id }, headers)

      .then((resp) => {
        ongoing(page);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className='stage_lead_sec mt-5'>
      <div className='row dataTables_wrapper'>
        <div className='col-lg-12 mt-0'>
          <div className='card'>
            <div className='card-body'>
              <div
                id='example_filter'
                class='dataTables_filter d-flex justify-content-end'>
                <input
                  type='search'
                  class='w-30 mr-3'
                  placeholder=''
                  aria-controls='example'
                />{' '}
                <a href='#0' class='btn btn-primary rounded d-block'>
                  Search
                </a>
              </div>
              <div className='table-responsive'>
                <table className='table table-responsive-md'>
                  <thead>
                    <tr className='table_th'>
                      <th className='width100'>
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

                      {/* <th>
                        <span>Stage</span>
                      </th>*/}
                      <th>
                        <span>Loan Ammount</span>
                      </th>
                      <th>
                        <span>Action</span>
                      </th>
                      {/* <th>Download</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {confirmLead.map((data, index) => (
                      <tr>
                        <td>
                          <strong>{(page - 1) * 10 + index + 1}</strong>
                        </td>
                        <td onClick={() => viewClient(data.phoneNo, data.otp)}>
                          {data.firstName}
                        </td>
                        <td>{data.phoneNo}</td>

                        <td>{data?.vehicle[0]?.vehicleDescription[0]?.vehicleName}</td>
                        <td>{data.approvedAmount}</td>
                        <td>
                          <span
                            onClick={() => sendtodeler(data._id)}
                            class='badge light badge-success mr-1'>
                            Send to Dealer
                          </span>
                        </td>
                        


                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div class='d-flex justify-content-between mt-3'>
                <div
                  class='dataTables_info pl-3'
                  id='example_info'
                  role='status'
                  aria-live='polite'>
                  Showing 1 to 10 of {datacount} entries
                </div>
                <div
                  class='dataTables_paginate paging_simple_numbers'
                  id='example_paginate'>
                  {datacount > 10 ? (
                    <ReactPaginate
                      previousLabel={'←Previous'}
                      nextLabel={'Next→'}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={Math.ceil(datacount / 10)}
                      initialPage={0}
                      marginPagesDisplayed={5}
                      onPageChange={(data) => handlePageClick(data)}
                      containerClassName={'pagination m-0'}
                      subContainerClassName={'pages pagination'}
                      pageClassName='page-item'
                      activeClassName={'active'}
                      activeLinkClassName={'page-link'}
                      pageLinkClassName={'page-link'}
                      nextClassName={'page-link arrow text-danger'}
                      previousLinkClassName={'page-link arrow'}
                      disableInitialCallback={true}
                    />
                  ) : (
                    ''
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
