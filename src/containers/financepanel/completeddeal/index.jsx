import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Header from '../../header/header';
// import Header from '../../header/header';
import axios from 'axios';
import apiUrl from '../../../globals/config';
import Footer from '../../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ReactPaginate from 'react-paginate';
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
      .get(
        apiUrl + 'user/financeCompletedCase?skip=' + page + '&limit=10',
        headers
      ) // user/confirmStage?skip=1&limit=3
      .then((resp) => {
        setconfirmLead(resp?.data?.data[0].data);
        setdatacount(resp?.data?.data[0]?.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewClient = (phoneNo, otp) => {
    props.history.push({
      pathname: '/viewcompletedlead',
      data: { phoneNo, otp },
    });
  };
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };
  return (
    <>
      {/* <Header /> */}
      <div className='content-body'>
        <div className='container-fluid'>
          <section className='ttm-row ttm-bg ttm-bgimage-yes bg-img3 process-section clearfix mb-3'>
            <Row className='mb-4'>
              <Col lg={12} className='mb-2'>
                <div className='d-block pb-0 border-0'>
                  <div className='mr-auto pr-3'>
                    <h4 className='text-black font-w600 fs-20'>
                      Stages of a Finance
                    </h4>
                  </div>
                </div>
              </Col>
            </Row>
            <div className='container-fluid mt-1 pt-0 '>
              <div className='row mb-5'>
                <div className='col-lg-12'>
                  <div className='row ttm-processbox-wrapper ttm-processbox-wrapper2 justify-content-center'>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div className='ttm-processbox res-991-mb-50'>
                        <div className='ttm-box-image'>
                          <div className='process-num'>
                            <span className='number'>F1</span>
                          </div>
                        </div>
                        <div className='featured-content'>
                          <div className='featured-title'>
                            <h6 className='mb-1'>Client to review </h6>
                            <p>95</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div className='ttm-processbox'>
                        <div className='ttm-box-image'>
                          <div className='process-num'>
                            <span className='number'>F2</span>
                          </div>
                        </div>
                        <div className='featured-content'>
                          <div className='featured-title'>
                            <h6 className='mb-1'>Review Client</h6>
                            <p>75</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div className='ttm-processbox'>
                        <div className='ttm-box-image'>
                          <div className='process-num'>
                            <span className='number'>F3</span>
                          </div>
                        </div>
                        <div className='featured-content'>
                          <div className='featured-title'>
                            <h6 className='mb-1'>Do Ready Clients </h6>
                            <p>65</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2'>
                      <div className='ttm-processbox'>
                        <div className='ttm-box-image'>
                          <div className='process-num'>
                            <span className='number'>F4</span>
                          </div>
                        </div>
                        <div className='featured-content'>
                          <div className='featured-title'>
                            <h6 className='mb-1'>Completed Deals </h6>
                            <p>225+</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='stage_lead_sec'>
            <div className='emi_row row dataTables_wrapper'>
              <div className='col-lg-12 mt-0'>
                <div className='card widget-stat'>
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
                      <table className='table'>
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
                            </th> */}
                            <th>
                              <span>DO Number</span>
                            </th>
                            <th>Download</th>
                          </tr>
                        </thead>
                        <tbody>
                          {confirmLead.map((data, index) => (
                            <tr>
                              <td>
                                <strong>{index + 1}</strong>
                              </td>
                              <td
                                onClick={() =>
                                  viewClient(data.phoneNo, data.otp)
                                }>
                                {data.firstName}
                              </td>
                              <td>{data.phoneNo}</td>
                              <td>{data?.vehicle[0]?.vehicleDescription[0]?.vehicleName}</td>
                              <td>F4</td>

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
                    <div className='d-flex justify-content-between mt-3'>
                      <div
                        className='dataTables_info pl-3'
                        id='example_info'
                        role='status'
                        aria-live='polite'>
                        Showing 1 to 10 of {confirmLead.length} entries
                      </div>
                      <div
                        className='dataTables_paginate paging_simple_numbers'
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
                        {/* <a
                          className="paginate_button previous disabled"
                          aria-controls="example"
                          data-dt-idx="0"
                          tabindex="0"
                          id="example_previous"
                        >
                          Previous
                        </a>
                        <span>
                          <a
                            className="paginate_button current"
                            aria-controls="example"
                            data-dt-idx="1"
                            tabindex="0"
                          >
                            1
                        </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="2"
                            tabindex="0"
                          >
                            2
                          </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="3"
                            tabindex="0"
                          >
                            3
                          </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="4"
                            tabindex="0"
                          >
                            4
                          </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="5"
                            tabindex="0"
                          >
                            5
                          </a>
                          <a
                            className="paginate_button "
                            aria-controls="example"
                            data-dt-idx="6"
                            tabindex="0"
                          >
                            6
                          </a>
                        </span>
                        <a
                          className="paginate_button next"
                          aria-controls="example"
                          data-dt-idx="7"
                          tabindex="0"
                          id="example_next"
                        >
                          Next
                        </a>
                       */}
                      </div>
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
