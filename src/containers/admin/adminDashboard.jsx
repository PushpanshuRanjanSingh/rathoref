import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import Header from '../header/header';
import Footer from '../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import showNotification from "../../services/notificationService";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Line } from 'react-chartjs-2';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import apiUrl from '../../globals/config';
import Vechiclecomponent from './Vechiclecomponent';

function AdminDashboard(props) {

  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };
  const [page, setPage] = useState(1);
  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  const [user, setuser] = useState({});
  const [state, setstate] = useState({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Interest',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  });
  useEffect(() => {
    ongoing(page);
    topsellingvehicle(page);
  }, [page]);
  const ongoing = () => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios  
      .get(apiUrl + 'user/findRole', headers)
 
      .then((resp) => {
        setuser(resp.data);
      })
      .catch((err) => {
        showNotification('danger', err.message)
      });
  };
  const topsellingvehicle = (page) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'inventory/countVehicle?skip=' + page + '&limit=5', headers)

      .then((resp) => {
        setconfirmLead(resp?.data?.data[0].data); //
        setdatacount(resp?.data?.data[0]?.count[0]?.count);
        
      })
      .catch((err) => {
        showNotification('danger', err.message)
      });
  };
  const viewClient = (phoneNo, otp) => {
    props.history.push({
      pathname: '/view',
      data: { phoneNo, otp },
    });
  };
  const updateOne = (phoneNo, otp, id) => {
    props.history.push({
      pathname: '/UpdateData',
      data: { phoneNo, otp, id },
    });
  };
  const download = () => {
    const url = 'http://localhost:3000/logo192.png';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'image/jpg',
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `FileName.jpg`);

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      });
  };
  const updateInventory = (id) => {
    props.history.push({
      pathname: '/inventoryEdit',
      data: { id },
    });
  };
  const deleteInventory = (id) => {
    let url = apiUrl + 'inventory/deleteInventory/' + id;
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .delete(url, headers)
      .then((res) => {
        topsellingvehicle(page);
      })
      .catch((err) => showNotification('danger', err.message));
  };
  return (
    <>
      {/* <Header/> */}
      <div className='content-body'>
        <div className='container-fluid'>
          <section class='ttm-row ttm-bg ttm-bgimage-yes bg-img3 process-section clearfix mb-3 admin-dash-box'>
            <Row className='mb-4 db_lft_grid'>
              <Col sm={6} xl={3}>
                <div className='widget-stat card shutter-in-vertical'>
                  <div className='card-body p-4 d-flex flex-column justify-content-center'>
                    <div className='media ai-icon'>
                      <span class='mr-3 bgl-yellow text-success'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/ContentManagement.png'}
                        />
                      </span>
                      <div className='media-body'>
                        <p onClick={download} className='mb-1'>
                          Users
                        </p>
                        <h4 className='mb-0'>
                          {user?.user ? user?.user : '0'}
                        </h4>
                      </div>
                    </div>
                    <div className='d-flex mt-3'>
                      <a
                        href='#0'
                        className='btn btn-outline-danger btn-xxs ml-2'>
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </Col>

              <Col sm={6} xl={3}>
                <div className='widget-stat card shutter-in-vertical'>
                  <div className='card-body p-4 d-flex flex-column justify-content-center'>
                    <div className='media ai-icon'>
                      <span class='mr-3 bgl-danger text-danger'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/TotalCustomersRegistered.png'}
                        />
                      </span>
                      <div className='media-body'>
                        <p className='mb-1'>Customers</p>
                        <h4 className='mb-0'>{user?.customer}</h4>
                      </div>
                    </div>
                    <div className='d-flex mt-3'>
                      {/* <a href='#0' className='btn btn-primary btn-xxs shadow'>
                        New Customer
                      </a> */}
                      <a
                        href='#0'
                        className='btn btn-outline-danger btn-xxs ml-2'>
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={6} xl={3}>
                <div className='widget-stat card shutter-in-vertical'>
                  <div className='card-body p-4 d-flex flex-column justify-content-center'>
                    <div className='media ai-icon'>
                      <span class='mr-3 bgl-blue text-success'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/agentsregistered.png'}
                        />
                      </span>
                      <div className='media-body'>
                        <p className='mb-1'>Naayaks</p>
                        <h4 className='mb-0'>
                          {user?.agent ? user?.agent : '0'}
                        </h4>
                      </div>
                    </div>
                    <div className='d-flex mt-3'>
                     
                      <a
                        href='#0'
                        className='btn btn-outline-danger btn-xxs ml-2'>
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={6} xl={3}>
                <div className='widget-stat card shutter-in-vertical'>
                  <div className='card-body p-4 d-flex flex-column justify-content-center'>
                    <div className='media ai-icon'>
                      <span class='mr-3 bgl-pink text-success'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/dealership.png'}
                        />
                      </span>
                      <div className='media-body'>
                        <p className='mb-1'>Dealerships</p>
                        <h4 className='mb-0'>
                          {user?.dealer ? user?.dealer : '0'}
                        </h4>
                      </div>
                    </div>
                    <div className='d-flex mt-3'>
                      
                      <a
                        href='#0'
                        className='btn btn-outline-danger btn-xxs ml-2'>
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </Col>

              <Col sm={6} xl={3}>
                <div className='widget-stat card shutter-in-vertical'>
                  <div className='card-body p-4 d-flex flex-column justify-content-center'>
                    <div className='media ai-icon'>
                      <span class='mr-3 bgl-danger text-danger'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/financial_user.png'}
                        />
                      </span>
                      <div className='media-body'>
                        <p className='mb-1'>Financed</p>
                        <h4 className='mb-0'>
                          {user?.finance ? user?.finance : '0'}
                        </h4>
                      </div>
                    </div>
                    <div className='d-flex mt-3'>
                    
                      <a
                        href='#0'
                        className='btn btn-outline-danger btn-xxs ml-2'>
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={6} xl={3}>
                <div className='widget-stat card shutter-in-vertical'>
                  <div className='card-body p-4 d-flex flex-column justify-content-center'>
                    <div className='media ai-icon'>
                      <span class='mr-3 bgl-success text-success'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/Totalinsurance.png'}
                        />
                      </span>
                      <div className='media-body'>
                        <p className='mb-1'>Insured</p>
                        <h4 className='mb-0'>
                          {user?.insurance ? user?.insurance : '0'}
                        </h4>
                      </div>
                    </div>
                    <div className='d-flex mt-3'>
                      
                      <a
                        href='#0'
                        className='btn btn-outline-danger btn-xxs ml-2'>
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={6} xl={3}>
                <div className='widget-stat card shutter-in-vertical'>
                  <div className='card-body p-4 d-flex flex-column justify-content-center'>
                    <div className='media ai-icon'>
                      <span class='mr-3 bgl-blue text-success'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/TotalRevenue.png'}
                        />
                      </span>
                      <div className='media-body'>
                        <p className='mb-1'>Inventory</p>
                        <h4 className='mb-0'>
                          {user?.inventory ? user?.inventory : '0'}
                        </h4>
                      </div>
                    </div>
                    <div className='d-flex mt-3'>
                    
                      <a
                        href='#0'
                        className='btn btn-outline-danger btn-xxs ml-2'>
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </Col>

              <Col sm={6} xl={3}>
                <div className='widget-stat card shutter-in-vertical'>
                  <div className='card-body p-4 d-flex flex-column justify-content-center'>
                    <div className='media ai-icon'>
                      <span class='mr-3 bgl-blue text-success'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/TotalRevenue.png'}
                        />
                      </span>
                      <div className='media-body'>
                        <p className='mb-1'>Sales Value</p>
                        <h4 className='mb-0'>0</h4>
                      </div>
                    </div>
                    <div className='d-flex mt-3'>
                      
                      <a
                        href='#0'
                        className='btn btn-outline-danger btn-xxs ml-2'>
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </Col>

              <Col sm={6} xl={3}>
                <div className='widget-stat card shutter-in-vertical'>
                  <div className='card-body p-4 d-flex flex-column justify-content-center'>
                    <div className='media ai-icon'>
                      <span class='mr-3 bgl-blue text-success'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/TotalRevenue.png'}
                        />
                      </span>
                      <div className='media-body'>
                        <p className='mb-1'>Revenue</p>

                        <h4 className='mb-0'>0</h4>
                      </div>
                    </div>

                    <div className='d-flex mt-3'>
                     
                      <a
                        href='#0'
                        className='btn btn-outline-danger btn-xxs ml-2'>
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </section>
          <Vechiclecomponent />
          <section className='stage_lead_sec'>
            <div className='row dataTables_wrapper'>
              <div class='col-lg-12 mt-0'>
                <div class='card'>
                  <div class='card-body'>
                    <div class='mr-auto '>
                      <h4 class='text-black font-w600 fs-20 pl-3'>
                        Top selling vehicle
                      </h4>
                    </div>
                   
                    <div class='table-responsive'>
                      <table class='table'>
                        <thead>
                          <tr className='table_th'>
                            <th class='width100'>
                              <span>S.NO</span>
                            </th>
                            <th>
                              <span>SKU/VCM</span>
                            </th>
                            <th>
                              <span>PPL</span>
                            </th>
                            <th>
                              <span>PL</span>
                            </th>
                            <th>
                              <span>Variant</span>
                            </th>
                            <th>
                              <span>Colour</span>
                            </th>
                            <th>
                              <span>Stocks</span>
                            </th>
                            <th>
                              <span>Ex-Showroom Price</span>
                            </th>
                            <th>
                              <span>Cash Discount</span>
                            </th>
                            <th>
                              <span>Additional Discount</span>
                            </th>
                            <th>
                              <span>RTO Charges</span>
                            </th>
                            <th>
                              <span>Commission</span>
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
                                <strong>{(page - 1) * 5 + index + 1}</strong>
                              </td>
                              <td>{data.SKUVCM}</td>
                              <td>{data.ppl}</td>
                              <td>{data.pl}</td>
                              <td>{data.variant}</td>
                              <td>{data.colour}</td>
                              <td>{data.stocks}</td>
                              <td>{data.exShowroomPrice}</td>
                              <td>{data.cashDiscount}</td>
                              <td>{data.additionalDiscount}</td>
                              <td>{data.rtoCharges}</td>
                              <td>{data.commission}</td>
                              <td className='d-flex'>
                                <span
                                  class='badge light badge-success mr-2'
                                  onClick={() => updateInventory(data._id)}>
                                  Edit
                                </span>
                                <span
                                  class='badge light badge-danger'
                                  onClick={() => deleteInventory(data._id)}>
                                  Delete
                                </span>{' '}
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
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
