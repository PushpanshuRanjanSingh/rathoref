import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import showNotification from '../../../services/notificationService';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
import * as constant from '../../../services/constant';
import ReactPaginate from 'react-paginate';
import Stage from '../component/Stage';
import apiUrl from '../../../globals/config';
var fileDownload = require('js-file-download');
function Index(props) {
  const [page, setPage] = useState(1);
  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  const [disable, setdisable] = useState('');
  const [user, setuser] = useState({});

  useEffect(() => {
    ongoing(page);
    stage();
  }, [page]);
  let index = 0;
  const stage = () => {
    // let token = localStorage.getItem("myData");
    // let headers = {
    //   headers: {
    //     "x-token": `Bearer ${token}`,
    //   },
    // };
    // axios
    //   .get(apiUrl + "user/financerClientCount", headers)
    //   .then((resp) => {
    //     setuser(resp.data);
    //   })
    //   .catch((err) => {
    //     showNotification("danger", err.message);
    //   });
  };
  const ongoing = (page) => {
    // let token = localStorage.getItem("myData");
    // let headers = {
    //   headers: {
    //     "x-token": `Bearer ${token}`,
    //   },
    // };
    axios
      .get(apiUrl + 'user/getalldistributer')
      .then((resp) => {
        var data = resp?.data?.data;
        console.log(`resp?.data`, resp?.data?.data);
        setconfirmLead(resp?.data?.data);
        setdatacount(data.length);
      })
      .catch((err) => {
        showNotification('danger', err.message);
      });
  };
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };
  const approved = (userid) => {
    const formData = new FormData();

    formData.append('userid', userid);
    formData.append('financeApproval', true);

    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .post(apiUrl + 'user/updateLead', formData, headers)
      .then((resp) => {
        ongoing(page);
      })
      .catch((err) => {
        showNotification('danger', err.message);
      });
  };
  const reject = (userid) => {
    const formData = new FormData();

    formData.append('userid', userid);
    formData.append('financeApproval', false);

    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .post(apiUrl + 'user/updateLead', formData, headers)
      .then((resp) => {
        ongoing(page);
      })
      .catch((err) => {
        showNotification('danger', err.message);
      });
  };
  const update = (id) => {
    props.history.push({
      pathname: '/financel3',
      data: id,
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
      .delete(apiUrl + 'user/deleteRecordcompany/' + id, headers)

      .then((resp) => {
        ongoing(page);
      })
      .catch((err) => {
        showNotification('danger', err.message);
      });
  };
  console.log(`confirmLead`, confirmLead);
  return (
    <>
      <div className='content-body'>
        <div className='container-fluid'>
          {/* <Stage /> */}
          <section className='stage_lead_sec my-5 py-5'>
            <div className='emi_row row dataTables_wrapper'>
              <div className='col-lg-12 mt-0'>
                <div className='card widget-stat'>
                  <div class='card-header bg-custom-blue '>
                    <h4 class='card-title text-white'>All Distributer</h4>
                  </div>
                  <div className='card-body'>
                    <div
                      id='example_filter'
                      class='dataTables_filter d-flex justify-content-end'>
                      <input
                        type='search'
                        class='w-30 mr-3'
                        placeholder='search Distributer'
                        aria-controls='example'
                      />{' '}
                      <a href='#0' class='btn btn-primary rounded d-block'>
                        Search
                      </a>
                    </div>
                    <div className='table-responsive'>
                      <table className='table'>
                        <thead>
                          <tr className='table_th'>
                            <th className='width100'>
                              <span>S.NO </span>
                            </th>
                            <th>
                              <span>Distributer Logo</span>
                            </th>
                            <th>
                              <span>Distributer Name</span>
                            </th>
                            <th>
                              <span>Full Name</span>
                            </th>
                            <th>
                              <span>Contact Number</span>
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
                                <strong>
                                  {(page - constant.START) * constant.ONPAGE +
                                    index +
                                    constant.START}
                                </strong>
                              </td>
                              <td>
                                <img
                                  alt='image'
                                  width='50'
                                  src={
                                    data?.profileImg
                                      ? apiUrl + data?.profileImg
                                      : 'images/avatar/1.jpg'
                                  }
                                />
                              </td>
                              <td>{data?.companyName}</td>
                              <td>
                                {data?.firstName + ' ' + data?.lastName
                                  ? data?.lastName
                                  : ''}
                              </td>
                              <td>{data?.phoneNo}</td>

                              <td>
                                {' '}
                                <span
                                  class='badge light badge-danger'
                                  onClick={() => deleteOne(data._id)}>
                                  Delete
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className='d-flex justify-content-between mt-3'>
                      <div
                        className='dataTables_info pl-3'
                        id='example_info'
                        role='status'
                        aria-live='polite'>
                        Showing {constant.START} to {constant.ONPAGE} of{' '}
                        {datacount} entries
                      </div>
                      <div
                        className='dataTables_paginate paging_simple_numbers'
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
        </div>
      </div>
    </>
  );
}

export default Index;
