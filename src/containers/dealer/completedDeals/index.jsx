import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../../globals/base';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
import apiUrl from '../../../globals/config';
import Stage from '../../dealership/delearStage';
function Index(props) {
  const [confirmLead, setconfirmLead] = useState([]);
  const [datacount, setdatacount] = useState();
  const [page, setPage] = useState(1);
  useEffect(() => {
    confirmStage(page);
  }, [page]);
  const confirmStage = (page) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'user/confirmStage?skip=' + page + '&limit=5', headers) // user/confirmStage?skip=1&limit=3
      .then((resp) => {
     
        setconfirmLead(resp?.data?.data[0].data);
        setdatacount(resp?.data?.data[0]?.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };
  const viewOnGoingDeals = (phoneNo, otp, id) => {
    props.history.push({
      pathname: '/view',
      data: { phoneNo, otp },
    });
  };
  return (
    <>
      {/* <Header /> */}
      <div className='content-body'>
        <div className='container-fluid'>
          <Stage/>
          <section className='stage_lead_sec'>
            <div className='row dataTables_wrapper'>
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
                            {/* <th><span>Action</span></th> */}
                            <th>Download</th>
                          </tr>
                        </thead>
                        <tbody>
                          {confirmLead.map((data, index) => (
                            <tr
                              onClick={() =>
                                viewOnGoingDeals(
                                  data.phoneNo,
                                  data.otp,
                                  data._id
                                )
                              }>
                              <td>
                                <strong>{index + 1}</strong>
                              </td>
                              <td>{data.firstName}</td>
                              <td>{data.phoneNo}</td>
                              <td>{data?.vehicle[0]?.vehicleDescription[0]?.vehicleName}</td>
                              {/* <td>
                                <span
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
                                </span>
                              </td> */}
                              {/* <td>L5</td> */}
                              {/* <td>
                                <span className="badge light badge-success">
                                  Update
                                </span>
                              </td> */}
                              <td class='download-icon'>
                                <a href='#0'>
                                  <i
                                    class='fa fa-download'
                                    aria-hidden='true'></i>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className='d-md-flex justify-content-between mt-3'>
                      <div
                        className='dataTables_info pl-3'
                        id='example_info'
                        role='status'
                        aria-live='polite'>
                        Showing 1 to 10 of 5 entries
                      </div>
                      {/* <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example_paginate"
                      >
                        <a
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
                        </a>
                      </div>
                    */}
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
