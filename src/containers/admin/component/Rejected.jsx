import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import apiUrl from '../../../globals/config';
function Alluser(props) {
  let history = useHistory();
  const [page, setPage] = useState(1);
  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  const [user, setuser] = useState({});
  useEffect(() => {
    Alluser(page);
  }, [page]);

  const Alluser = (page) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'user/rejectedUser?skip=' + page + '&limit=10', headers)

      .then((resp) => {
        setconfirmLead(resp.data?.data[0]?.data);
        setdatacount(resp.data?.data[0]?.count);
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
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };
  const updateOne = (phoneNo, otp, id) => {
    history.push({
      pathname: '/UpdateData',
      data: { phoneNo, otp, id },
    });
  };
  return (
    <div className='container-fluid px-0'>
      <section className='stage_lead_sec'>
        <div className='row dataTables_wrapper'>
          <div class='col-lg-12'>
            <div class='d-block pb-0 border-0'>
              <div class='mr-auto pr-3'>
                <h4 class='text-black font-w600 fs-20'>Rejected User</h4>
              </div>
            </div>
          </div>
          <div class='col-lg-12 mt-0'>
            <div class='card'>
              <div class='card-body'>
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
                <div class='table-responsive'>
                  <table class='table'>
                    <thead>
                      <tr className='table_th'>
                        <th class='width100'>
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
                          <span>Created On</span>
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {confirmLead.map((data, index) => (
                        <tr>
                          <td>
                            <strong>{(page - 1) * 10 + index + 1}</strong>
                          </td>
                          <td
                            onClick={() => viewClient(data.phoneNo, data.otp)}>
                            {data.firstName}
                          </td>
                          <td>{data.phoneNo}</td>
                          <td>Tata Ace - Diesel-Black</td>
                          <td>{data?.createdAt.split('T')[0]}</td>

                          <td>
                            <span
                              class='badge light badge-success mr-1'
                              onClick={() =>
                                updateOne(data.phoneNo, data.otp, data._id)
                              }>
                              Update
                            </span>
                            <span class='badge light badge-danger'>Delete</span>
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
    </div>
  );
}

export default Alluser;
