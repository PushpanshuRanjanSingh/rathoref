import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import apiUrl from '../../globals/config';
function Vechiclecomponent(props) {
  let history = useHistory();
  const [page, setPage] = useState(1);
  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  useEffect(() => {
    ticket(page);
  }, [page]);
  const ticket = (page) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'help/getAllHelp?skip=' + page + '&limit=5', headers)

      .then((resp) => {
        setconfirmLead(resp?.data?.data[0].data); /// http://localhost:3040/user/totalCustomers (total
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
  const viewClient = (phoneNo, otp) => {
    history.push({
      pathname: '/view',
      data: { phoneNo, otp },
    });
  };
  return (
    <section className='stage_lead_sec'>
      <div className='row dataTables_wrapper'>
        <div class='col-lg-12 mt-0'>
          <div class='card'>
            <div class='card-body'>
              <div class='mr-auto '>
                <h4 class='text-black font-w600 fs-20 pl-3'>
                  List of Ticket Detail
                </h4>
              </div>
              {/* <div
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
            */}
              <div class='table-responsive'>
                <table class='table'>
                  <thead>
                    <tr className='table_th'>
                      <th class='width100'>
                        <span>Ticket.NO</span>
                      </th>
                      <th>
                        <span>Name</span>
                      </th>
                      <th>
                        <span>Contact Number</span>
                      </th>
                      <th>
                        <span>Email</span>
                      </th>
                      <th>
                        <span>Subject</span>
                      </th>
                      <th>
                        <span>Description</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmLead.map((data, index) => (
                      <tr>
                        <td>
                          <strong>{data?.ticketNo}</strong>
                        </td>
                        <td>{data.name}</td>
                        <td>{data.phoneNo}</td>
                        <td>{data.email}</td>
                        <td>{data.subject}</td>
                        <td>{data.description}</td>
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
                  {datacount > 5 ? (
                    <ReactPaginate
                      previousLabel={'←Previous'}
                      nextLabel={'Next→'}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={Math.ceil(datacount / 5)}
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

export default Vechiclecomponent;
