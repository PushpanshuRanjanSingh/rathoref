import React, { useState, useEffect } from 'react';
// import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import * as constant from "../../../services/constant";
import ReactPaginate from 'react-paginate';
import apiUrl from '../../../globals/config';
import showNotification from "../../../services/notificationService";
export default function Naayak(props) {
  let history = useHistory();
  const [page, setPage] = useState(1);
  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  const [count, setcount] = useState({});
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
      .get(apiUrl + 'user/findbyRole/1?skip=' + page + '&limit=10', headers)

      .then((resp) => {
       
        setconfirmLead(resp.data?.data[0]?.data);
        setdatacount(resp.data?.data[0]?.count);
      })
      .catch((err) => {
        showNotification("danger", err.message);
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
        Alluser(page);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  return (
    <section className='stage_lead_sec mt-5'>
      <Row className='mb-4 leads_row'>
        <Col sm={6} xl={3}>
          <div className='widget-stat card shutter-in-vertical'>
            <div className='card-body p-4 d-flex flex-column justify-content-center'>
              <div className='media ai-icon d-flex justify-content-center flex-column'>
                <span className='mr-3  text-danger mb-1'>
                  <Image
                    className=''
                    alt='img'
                    src={'assets/images/total_agent.png'}
                  />
                </span>
                <div className='media-body text-center'>
                  <h4 className='mb-2'>{datacount ? datacount : '0'}</h4>
                  <h5 className='mb-0'> Total Naayak</h5>
                </div>
              </div>
            </div>
          </div>
        </Col>
       
        <Col sm={6} xl={3}>
          <div className='widget-stat card shutter-in-vertical'>
            <Link className='' to='/addagent'>
              <div className='card-body p-4 d-flex flex-column justify-content-center'>
                <div className='media ai-icon d-flex justify-content-center flex-column'>
                  <span className='mr-3  text-danger mb-1'>
                    <Image
                      className=''
                      alt='img'
                      src={'assets/images/add_leads.png'}
                    />
                  </span>
                  <div className='media-body text-center'>
                    <h5 className='mb-0'>Add New Naayak</h5>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </Col>
      </Row>
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
                        <span>Email Id</span>
                      </th>

                      <th>
                        <span>Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmLead.map((data, index) => (
                      <tr>
                        <td>
                          <strong>{(page - 1) * constant.ONPAGE + index + 1}</strong>
                        </td>
                        <td onClick={() => viewClient(data.phoneNo, data.otp)}>
                          {data.firstName}
                        </td>
                        <td>{data.phoneNo}</td>
                        <td>{data.email}</td>

                        <td>
                          
                          <span
                            className='badge light badge-success mr-1'
                            onClick={() =>
                              updateOne(data.phoneNo, data.otp, data._id)
                            }>
                            Update
                          </span>
                          <span
                            className='badge light badge-danger'
                            onClick={() => deleteOne(data._id)}>
                            Delete
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
                  Showing {constant.START} to {constant.ONPAGE} of {datacount} entries
                </div>
                <div
                  class='dataTables_paginate paging_simple_numbers'
                  id='example_paginate'>
                  {datacount > constant.ONPAGE ? (
                    <ReactPaginate
                      previousLabel={'←Previous'}
                      nextLabel={'Next→'}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={Math.ceil(datacount / constant.ONPAGE)}
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
