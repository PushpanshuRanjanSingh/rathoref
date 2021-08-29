import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Header from '../../header/header';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import Footer from '../../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import apiUrl from '../../../globals/config.js';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
function Index(props) {
  const [leadData, setleadData] = useState([]);
  const [datacountn, setdatacountn] = useState();
  const [datacountd, setdatacountd] = useState();
  const [datacountf, setdatacountf] = useState();
  const [datacountu, setdatacountu] = useState();
  const [datacounti, setdatacounti] = useState();
  const [delear, setdelear] = useState([]);
  const [insurance, setinsurance] = useState([]);
  const [user, setUser] = useState([]);
  const [financer, setfinancer] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    leadsListsnayak(1); //1
    leadsListsDelear(1); ///3
    leadsListsfinancer(1); //4
    leadsListsinsurance(1); //5
    leadsListsuser(1); //0
  }, [page]);
  const leadsListsuser = (page) => {
    let token = localStorage.getItem('myData');

    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + 'advertisement/getList?skip=' + page + '&limit=10&panel=10',
        headers
      )
      .then((resp) => {
        if (resp?.data.success) {
       
          setUser(resp?.data.data[0].data);
          //?skip=1&limit=200
          if (resp?.data.data[0].count) {
            var name = 'nayak';
            var value = resp?.data.data[0].count;
            setdatacountu(value ? value : 0);
          }

          // setdatacount(resp?.data.data[0].count);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const leadsListsnayak = (page) => {
    let token = localStorage.getItem('myData');

    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + 'advertisement/getList?skip=' + page + '&limit=10&panel=1',
        headers
      )
      .then((resp) => {
        if (resp?.data.success) {
       
          setleadData(resp?.data.data[0].data);
          //?skip=1&limit=200
          if (resp?.data.data[0].count) {
            var name = 'nayak';
            var value = resp?.data.data[0].count;
            setdatacountn(value ? value : 0);
          }

          // setdatacount(resp?.data.data[0].count);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const leadsListsDelear = (page) => {
    let token = localStorage.getItem('myData');

    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + 'advertisement/getList?skip=' + page + '&limit=10&panel=3',
        headers
      )
      .then((resp) => {
        if (resp?.data.success) {
         
          setdelear(resp?.data.data[0].data);
          if (resp?.data.data[0].count) {
            var name = 'delear';
            var value = resp?.data.data[0].count;
            setdatacountd(value ? value : 0);
          }
          //?skip=1&limit=200
          // setdatacount(resp?.data.data[0].count);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const leadsListsfinancer = (page) => {
    let token = localStorage.getItem('myData');

    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + 'advertisement/getList?skip=' + page + '&limit=10&panel=4',
        headers
      )
      .then((resp) => {
        if (resp?.data.success) {
         
          setfinancer(resp?.data.data[0].data);
          //?skip=1&limit=200
          if (resp?.data.data[0].count) {
            var name = 'financer';
            var value = resp?.data.data[0].count;
            setdatacountf(value ? value : 0);
          }
          // setdatacount(resp?.data.data[0].count);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const leadsListsinsurance = (page) => {
    let token = localStorage.getItem('myData');

    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + 'advertisement/getList?skip=' + page + '&limit=10&panel=5',
        headers
      )
      .then((resp) => {
        if (resp?.data.success) {
        
          setinsurance(resp?.data.data[0].data);
          //?skip=1&limit=200
          if (resp?.data.data[0].count) {
            var name = 'insurancer';
            var value = resp?.data.data[0].count;
            {
              value ? setdatacounti(value) : setdatacounti(0);
            }
            // setdatacounti(value?value:0);
          }
          // setdatacount(resp?.data.data[0].count);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const update = (data) => {
    props.history.push({
      pathname: '/customeradvertisement',
      data: data,
    });
  };
  const deleteted = (id) => {
   

    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .delete(apiUrl + 'advertisement/deleteData/' + id, headers) //http://localhost:3040/user/deleteRecord/60543c0fc166d7237d880b1f

      .then((resp) => {
        // leadsLists(page);
        setPage(page + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addbanner = (panel) => {
    
    props.history.push({
      pathname: '/customeradvertisement',
      panel,
    });
  };
 
  return (
    <>
      <div className='content-body'>
        <div className='container-fluid'>
          <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
            <Tab label='Naayak'>
              <Row className='emi_row mt-5'>
                <Col lg={12}>
                  <div className='card widget-stat'>
                    <div class='card-header bg-custom-blue '>
                      <h4 class='card-title text-white'>
                        Naayak Banners Lists
                      </h4>
                      <div class='two_btns_ps'>
                        {datacountn == undefined || datacountn < 3 ? (
                          <span
                            class='btn bg-light-cus ml-2'
                            // to='/customeradvertisement'
                            onClick={(e) => addbanner(1)}>
                            <i class='fa fa-plus' aria-hidden='true'></i>{' '}
                            <span>Add </span>
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div class='card-body'>
                      <div class='basic-form list-adds'>
                        <ul class='list-unstyled'>
                          {leadData.map((data, index) => (
                            <li class='media'>
                              <Image
                                className='w-75'
                                alt='img'
                                src={apiUrl + data.advertisementImage}
                              />
                              <div class='media-body'>
                                <div className='content-box-cus'>
                                  {' '}
                                  <p class='mt-0 mb-1'>
                                    {data.advertisementTitle}
                                  </p>
                                  {data.advertisementDescription}
                                </div>
                               
                                <span
                                  class='btn btn-dark  bg-dark-cus ml-auto'
                                  // to='/customeradvertisement'>
                                  onClick={(e) => update(data)}>
                                  <i
                                    class='fa fa-pencil-square-o '
                                    aria-hidden='true'></i>
                                  <span>Update</span>
                                </span>
                                <span
                                  class='btn btn-danger  bg-dark-cus'
                                  // to='/customeradvertisement'>
                                  onClick={(e) => deleteted(data._id)}>
                                  <i
                                    class='fa  fa-trash '
                                    aria-hidden='true'></i>
                                  <span>Delete</span>
                                </span>
                              </div>
                            </li>
                          ))}

                         
                        </ul>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab label='Dealer'>
              {' '}
              <Row className='emi_row mt-5'>
                <Col lg={12}>
                  <div className='card widget-stat'>
                    <div class='card-header bg-custom-blue '>
                      <h4 class='card-title text-white'>
                        {' '}
                        Dealer Banners Lists
                      </h4>
                      <div class='two_btns_ps'>
                        {datacountd == undefined || datacountd < 3 ? (
                          <span
                            class='btn bg-light-cus ml-2'
                            onClick={(e) => addbanner(3)}>
                            <i class='fa fa-plus' aria-hidden='true'></i>{' '}
                            <span>Add </span>
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div class='card-body'>
                      <div class='basic-form list-adds'>
                        <ul class='list-unstyled'>
                          {delear.map((data, index) => (
                            <li class='media'>
                              <Image
                                className='w-75'
                                alt='img'
                                src={apiUrl + data.advertisementImage}
                              />
                              <div class='media-body'>
                                <div className='content-box-cus'>
                                  {' '}
                                  <p class='mt-0 mb-1'>
                                    {data.advertisementTitle}
                                  </p>
                                  {data.advertisementDescription}
                                </div>
                                
                                <span
                                  class='btn btn-dark  bg-dark-cus ml-auto'
                                  // to='/customeradvertisement'>
                                  onClick={(e) => update(data)}>
                                  <i
                                    class='fa fa-pencil-square-o '
                                    aria-hidden='true'></i>
                                  <span>Update</span>
                                </span>
                                <span
                                  class='btn btn-danger  bg-dark-cus'
                                  // to='/customeradvertisement'>
                                  onClick={(e) => deleteted(data._id)}>
                                  <i
                                    class='fa  fa-trash '
                                    aria-hidden='true'></i>
                                  <span>Delete</span>
                                </span>
                              </div>
                            </li>
                          ))}

                         
                        </ul>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab label='financer'>
              {' '}
              <Row className='emi_row mt-5'>
                <Col lg={12}>
                  <div className='card widget-stat'>
                    <div class='card-header bg-custom-blue '>
                      <h4 class='card-title text-white'>
                        Financer Banners Lists
                      </h4>
                      <div class='two_btns_ps'>
                        {/* {datacountf} */}
                        {datacountf == undefined || datacountf < 3 ? (
                          <span
                            class='btn bg-light-cus ml-2'
                            // to='/customeradvertisement'
                            onClick={(e) => addbanner(4)}>
                            <i class='fa fa-plus' aria-hidden='true'></i>{' '}
                            <span>Add </span>
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div class='card-body'>
                      <div class='basic-form list-adds'>
                        <ul class='list-unstyled'>
                          {financer.map((data, index) => (
                            <li class='media'>
                              <Image
                                className='w-75'
                                alt='img'
                                src={apiUrl + data.advertisementImage}
                              />
                              <div class='media-body'>
                                <div className='content-box-cus'>
                                  {' '}
                                  <p class='mt-0 mb-1'>
                                    {data.advertisementTitle}
                                  </p>
                                  {data.advertisementDescription}
                                </div>
                                
                                <span
                                  class='btn btn-dark  bg-dark-cus ml-auto'
                                  // to='/customeradvertisement'>
                                  onClick={(e) => update(data)}>
                                  <i
                                    class='fa fa-pencil-square-o '
                                    aria-hidden='true'></i>
                                  <span>Update</span>
                                </span>
                                <span
                                  class='btn btn-danger  bg-dark-cus'
                                  // to='/customeradvertisement'>
                                  onClick={(e) => deleteted(data._id)}>
                                  <i
                                    class='fa  fa-trash '
                                    aria-hidden='true'></i>
                                  <span>Delete</span>
                                </span>
                              </div>
                            </li>
                          ))}

                          
                        </ul>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab label='Insurance'>
              {' '}
              <Row className='emi_row mt-5'>
                <Col lg={12}>
                  <div className='card widget-stat'>
                    <div class='card-header bg-custom-blue '>
                      <h4 class='card-title text-white'>
                        Insurance Banners Lists
                      </h4>
                      <div class='two_btns_ps'>
                        {datacounti == undefined || datacounti < 3 ? (
                          <span
                            class='btn bg-light-cus ml-2'
                            // to='/customeradvertisement'
                            onClick={(e) => addbanner(5)}>
                            <i class='fa fa-plus' aria-hidden='true'></i>{' '}
                            <span>Add </span>
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div class='card-body'>
                      <div class='basic-form list-adds'>
                        <ul class='list-unstyled'>
                          {insurance.map((data, index) => (
                            <li class='media'>
                              <Image
                                className='w-75'
                                alt='img'
                                src={apiUrl + data.advertisementImage}
                              />
                              <div class='media-body'>
                                <div className='content-box-cus'>
                                  {' '}
                                  <p class='mt-0 mb-1'>
                                    {data.advertisementTitle}
                                  </p>
                                  {data.advertisementDescription}
                                </div>

                                <span
                                  class='btn btn-dark  bg-dark-cus ml-auto'
                                  onClick={(e) => update(data)}>
                                  <i
                                    class='fa fa-pencil-square-o '
                                    aria-hidden='true'></i>
                                  <span>Update</span>
                                </span>
                                <span
                                  class='btn btn-danger  bg-dark-cus'
                                  // to='/customeradvertisement'>
                                  onClick={(e) => deleteted(data._id)}>
                                  <i
                                    class='fa  fa-trash '
                                    aria-hidden='true'></i>
                                  <span>Delete</span>
                                </span>
                              </div>
                            </li>
                          ))}

                          
                        </ul>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab label='User'>
              {' '}
              <Row className='emi_row mt-5'>
                <Col lg={12}>
                  <div className='card widget-stat'>
                    <div class='card-header bg-custom-blue '>
                      <h4 class='card-title text-white'>User Banners Lists</h4>
                      <div class='two_btns_ps'>
                        {datacountu == undefined || datacountu < 3 ? (
                          <span
                            class='btn bg-light-cus ml-2'
                            // to='/customeradvertisement'
                            onClick={(e) => addbanner(10)}>
                            <i class='fa fa-plus' aria-hidden='true'></i>{' '}
                            <span>Add </span>
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div class='card-body'>
                      <div class='basic-form list-adds'>
                        <ul class='list-unstyled'>
                          {user.map((data, index) => (
                            <li class='media'>
                              <Image
                                className='w-75'
                                alt='img'
                                src={apiUrl + data.advertisementImage}
                              />
                              <div class='media-body'>
                                <div className='content-box-cus'>
                                  {' '}
                                  <p class='mt-0 mb-1'>
                                    {data.advertisementTitle}
                                  </p>
                                  {data.advertisementDescription}
                                </div>
                               
                                <span
                                  class='btn btn-dark  bg-dark-cus ml-auto'
                                  // to='/customeradvertisement'>
                                  onClick={(e) => update(data)}>
                                  <i
                                    class='fa fa-pencil-square-o '
                                    aria-hidden='true'></i>
                                  <span>Update</span>
                                </span>
                                <span
                                  class='btn btn-danger  bg-dark-cus'
                                  // to='/customeradvertisement'>
                                  onClick={(e) => deleteted(data._id)}>
                                  <i
                                    class='fa  fa-trash '
                                    aria-hidden='true'></i>
                                  <span>Delete</span>
                                </span>
                              </div>
                            </li>
                          ))}

                         
                        </ul>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Index;
