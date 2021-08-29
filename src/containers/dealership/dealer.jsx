import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import Header from '../header/header';
import Footer from '../footer/footer';
import axios from 'axios';
import apiUrl from '../../globals/config';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Stage from './delearStage';

function Dealer(props) {
  const [confirmLead, setconfirmLead] = useState([]);
  const [leadData, setleadData] = useState([]);
  const [hidebannerr, sethidebannerr] = useState(false);
  const [vehicle, setvehicle] = useState('')
  const [user, setuser] = useState({});
  useEffect(() => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'user/checkConfirm/1?skip=1&limit=3', headers) //checkConfirm?skip=1&limit=3 user/checkConfirm
      .then((resp) => {
        allvechicle(resp?.data?.data[0]?.data[0]?.vehicle[0]?.vehicleID)
        setconfirmLead(resp?.data?.data[0].data);
      })
      .catch((err) => {
        console.log(err);
      });
    allbanner();
    stage()
  }, []);
  const stage = () => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios  
      .get(apiUrl + 'user/stagesInDealer', headers)
 
      .then((resp) => {
        setuser(resp.data);
      
      })
      .catch((err) => {
        console.log(`err`, err)
        // showNotification("danger", err.message);
      });
  };
  const allvechicle = async (id) => {
  
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
  
    let resp = await axios.get(
      apiUrl + "addVehicle/getInformation?skip=1&limit=200&id=" + id,
      headers
    );
    if (resp) {
      setvehicle( resp?.data?.data[0]?.vehicleName)
    }
   
  };
  const allbanner = (page) => {
    let token = localStorage.getItem('myData');

    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + 'advertisement/getList?skip=' + 1 + '&limit=10&panel=3',
        headers
      )
      .then((resp) => {
        if (resp?.data.success) {
         
          setleadData(resp?.data.data[0].data);
          //?skip=1&limit=200
          // setdatacount(resp?.data.data[0].count);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const updateLead = (phoneNo, otp, id) => {
  //   props.history.push({
  //     pathname: "/updateLeadData",
  //     data: { phoneNo, otp, id },
  //   });
  // };
  const updateLead = (phoneNo, otp, id) => {
    props.history.push({
      pathname: '/stageone',
      data: { phoneNo, otp, id },
    });
  };

  const viewOnGoingDeals = (phoneNo, otp, id) => {
    props.history.push({
      pathname: '/view',
      data: { phoneNo, otp },
    });
  };

  return (
    <>
      <div className='content-body'>
        <div className='container-fluid'>
          <Row className='mb-4'>
            {!hidebannerr ? (
              <>
                <Col xl={9} className=' mb-3 mb-xl-0'>
                  <OwlCarousel
                    className='owl-theme cus_owl_theme'
                    items={1}
                    margin={8}
                    loop
                    margin={10}
                    nav>
                    {leadData.map((data, index) => (
                      <div className='item item_box'>
                        <div className='inner_slider_box'>
                          <Row className='justify-content-between align-items-center m-auto mb-4 w-100'>
                            <Col sm={7}>
                              <div className='col_inner_box'>
                                <h2>{data.advertisementTitle}</h2>
                                <p className='pr-sm-5'>
                                  {data.advertisementDescription}
                                </p>
                                <a href={data?.anchor}>
                                  <Button
                                    variant='light'
                                    className='font-weight-bold btn-txt'>
                                    Explore Now
                                  </Button>
                                </a>
                              </div>
                            </Col>
                            <Col sm={5} className='mt-3 mt-lg-0'>
                              <div className='inner_img_slider'>
                                <Image
                                  className='w-75'
                                  alt='img'
                                  src={apiUrl + data.advertisementImage}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className='cross_icon'>
                          <Link className='' to='/'>
                            <i className='fa fa-times' aria-hidden='true'></i>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </OwlCarousel>
                </Col>
                <Col xl={3}>
                  <Row className='mb-4 db_lft_grid'>
                    <Col sm={6} md={4} xl={12}>
                      <div className='widget-stat card shutter-in-vertical'>
                        <div className='card-body px-4 py-2 d-flex flex-column justify-content-center'>
                          <div className='media ai-icon'>
                            <span class='mr-3 bgl-new text-danger'>
                              <Image
                                className='w-75'
                                alt='img'
                                src={'assets/images/ContentManagement.png'}
                              />
                            </span>
                            <div className='media-body'>
                              <p className='mb-1'>New Deals</p>
                              
                              <h4>{user && user?.newDeals ?user?.newDeals:"0"}</h4>
                            </div>
                          </div>
                          <div className='d-flex mt-2'>
                            {/* <a href="#0" className="btn btn-primary btn-xxs shadow">
                          New lead
                        </a> */}
                            <a
                              href='/ongoingDeals'
                              className='btn btn-outline-danger btn-xxs ml-2'>
                              Details
                            </a>
                          </div>
                        </div>
                      </div>
                    </Col>
                    {/* <Col sm={6} md={4} xl={12}>
                      <div className='widget-stat card shutter-in-vertical'>
                        <div className='card-body px-4 py-2 d-flex flex-column justify-content-center'>
                          <div className='media ai-icon'>
                            <span class='mr-3 bgl-danger text-danger'>
                              <Image
                                className='w-75'
                                alt='img'
                                src={'assets/images/in-processdeals.png'}
                              />
                            </span>
                            <div className='media-body'>
                              <p className='mb-1'>In-Process Deals</p>
                              <h4 className='mb-0'>54</h4>
                            </div>
                          </div>
                          <div className='d-flex mt-2'>
                            {/* <a href="#0" className="btn btn-primary btn-xxs shadow">
                          New lead
                        </a> 
                            <a
                              href='#0'
                              className='btn btn-outline-danger btn-xxs ml-2'>
                              Details
                            </a>
                          </div>
                        </div>
                      </div>
                    </Col>
                   */}
                    <Col sm={6} md={4} xl={12}>
                      <div className='widget-stat card shutter-in-vertical'>
                        <div className='card-body px-4 py-2 d-flex flex-column justify-content-center'>
                          <div className='media ai-icon'>
                            <span class='mr-3 bgl-success text-success'>
                              <Image
                                className='w-75'
                                alt='img'
                                src={'assets/images/completed-deals.png'}
                              />
                            </span>
                            <div className='media-body'>
                              <p className='mb-1'>Completed Deals</p>
                              <h4>{user && user?.vehicleDelieveredL5Stage ?user?.vehicleDelieveredL5Stage:"0"}</h4>
                            </div>
                          </div>
                          <div className='d-flex mt-2'>
                            <a
                              href='/completedDeals'
                              className='btn btn-outline-danger btn-xxs ml-2'>
                              Details
                            </a>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
               
                </Col>
              </>
            ) : (
              <>
                {/* design issue here */}
                <Col xl={12}>
                  <Row className='mb-4 db_lft_grid'>
                    <Col md={6} xl={4}>
                      <div className='widget-stat card shutter-in-vertical'>
                        <div className='card-body px-4 py-2 d-flex flex-column justify-content-center'>
                          <div className='media ai-icon'>
                            <span class='mr-3 bgl-new text-danger'>
                              <Image
                                className='w-75'
                                alt='img'
                                src={'assets/images/ContentManagement.png'}
                              />
                            </span>
                            <div className='media-body'>
                              <p className='mb-1'>New Deals</p>
                              <h4 className='mb-0'>54</h4>
                            </div>
                          </div>
                          <div className='d-flex mt-2'>
                            {/* <a href="#0" className="btn btn-primary btn-xxs shadow">
                          New lead
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
                    <Col md={6} xl={4}>
                      <div className='widget-stat card shutter-in-vertical'>
                        <div className='card-body px-4 py-2 d-flex flex-column justify-content-center'>
                          <div className='media ai-icon'>
                            <span class='mr-3 bgl-danger text-danger'>
                              <Image
                                className='w-75'
                                alt='img'
                                src={'assets/images/in-processdeals.png'}
                              />
                            </span>
                            <div className='media-body'>
                              <p className='mb-1'>In-Process Deals</p>
                              <h4 className='mb-0'>54</h4>
                            </div>
                          </div>
                          <div className='d-flex mt-2'>
                            {/* <a href="#0" className="btn btn-primary btn-xxs shadow">
                          New lead
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
                    <Col md={6} xl={4}>
                      <div className='widget-stat card shutter-in-vertical'>
                        <div className='card-body px-4 py-2 d-flex flex-column justify-content-center'>
                          <div className='media ai-icon'>
                            <span class='mr-3 bgl-success text-success'>
                              <Image
                                className='w-75'
                                alt='img'
                                src={'assets/images/completed-deals.png'}
                              />
                            </span>
                            <div className='media-body'>
                              <p className='mb-1'>Completed Deals</p>
                              <h4 className='mb-0'>22</h4>
                            </div>
                          </div>
                          <div className='d-flex mt-2'>
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
                </Col>
              </>
            )}
          </Row>
         <Stage/>
          <section className='stage_lead_sec'>
            <div className='row dataTables_wrapper'>
              <div class='col-lg-12 mt-0'>
                <div class='card'>
                  <div class='card-body'>
                    {/* <div
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
                    </div> */}
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
                              <span>Stage</span>
                            </th>
                            <th>Action</th>
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
                                  viewOnGoingDeals(
                                    data.phoneNo,
                                    data.otp,
                                    data._id
                                  )
                                }>
                                {data.firstName}
                              </td>
                              <td>{data.phoneNo}</td>
                              <td>{vehicle?vehicle:""}</td>

                              <td>L1</td>
                              <td className='d-flex'>
                                {/* <span class="badge light badge-warning mr-2" onClick={()=> viewOnGoingDeals(data.phoneNo, data.otp, data._id)}>View</span> */}
                                <span
                                  class='badge light badge-success'
                                  onClick={() =>
                                    updateLead(data.phoneNo, data.otp, data._id)
                                  }>
                                  Update
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div class='d-flex justify-content-between mt-2'>
                      <div
                        class='dataTables_info pl-3'
                        id='example_info'
                        role='status'
                        aria-live='polite'>
                        Showing 1 to 3 of {confirmLead.length} entries
                      </div>
                      {/* <div
                        class="dataTables_paginate paging_simple_numbers"
                        id="example_paginate"
                      >
                        <a
                          class="paginate_button previous disabled"
                          aria-controls="example"
                          data-dt-idx="0"
                          tabindex="0"
                          id="example_previous"
                        >
                          Previous
                        </a>
                        <span>
                          <a
                            class="paginate_button current"
                            aria-controls="example"
                            data-dt-idx="1"
                            tabindex="0"
                          >
                            1
                          </a>
                          <a
                            class="paginate_button "
                            aria-controls="example"
                            data-dt-idx="2"
                            tabindex="0"
                          >
                            2
                          </a>
                          <a
                            class="paginate_button "
                            aria-controls="example"
                            data-dt-idx="3"
                            tabindex="0"
                          >
                            3
                          </a>
                          <a
                            class="paginate_button "
                            aria-controls="example"
                            data-dt-idx="4"
                            tabindex="0"
                          >
                            4
                          </a>
                          <a
                            class="paginate_button "
                            aria-controls="example"
                            data-dt-idx="5"
                            tabindex="0"
                          >
                            5
                          </a>
                          <a
                            class="paginate_button "
                            aria-controls="example"
                            data-dt-idx="6"
                            tabindex="0"
                          >
                            6
                          </a>
                        </span>
                        <a
                          class="paginate_button next"
                          aria-controls="example"
                          data-dt-idx="7"
                          tabindex="0"
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
    </>
  );
}

export default Dealer;
