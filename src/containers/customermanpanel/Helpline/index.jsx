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
     
      .get(apiUrl + 'helpLine/getHelpLineListByRole?role=0',headers )
      .then((resp) => {
        if(resp?.data?.data){
          setdatacountu(1)

          setUser([resp?.data.data]);
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
      .get(apiUrl + 'helpLine/getHelpLineListByRole?role=1',headers )
      .then((resp) => {
     
        if(resp?.data?.data){
          setdatacountn(1)

          setleadData([resp?.data.data]);
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
     
      .get(apiUrl + 'helpLine/getHelpLineListByRole?role=3',headers )
      .then((resp) => {
        if(resp?.data?.data){
          setdatacountd(1)

          setdelear([resp?.data?.data]);
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
     
      .get(apiUrl + 'helpLine/getHelpLineListByRole?role=4',headers )
      .then((resp) => {
        if(resp?.data?.data){
          setdatacountf(1)

          setfinancer([resp?.data.data]);
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
     
      .get(apiUrl + 'helpLine/getHelpLineListByRole?role=5',headers )
      .then((resp) => {
        if(resp?.data?.data){
          setdatacounti(1)

          setinsurance([resp?.data.data]);
        }
     
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const update = (data) => {
    props.history.push({
      pathname: '/helplinecontactform',
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
      .delete(apiUrl + 'helpLine/deleteData?id='+id, headers) //http://localhost:3040/user/deleteRecord/60543c0fc166d7237d880b1f

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
      pathname: '/helplinecontactform',
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
                        Naayak Help
                      </h4>
                      <div class='two_btns_ps'>
                        {datacountn == undefined || datacountn < 1 ? (
                          <span
                            class='btn bg-light-cus ml-2'
                            // to='/helplinecontactform'
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
                                src={apiUrl + data.profilePic}
                              />
                              <div class='media-body'>
                                <div className='content-box-cus'>
                                  {' '}
                                  <p class='mt-0 mb-1'>
                                    {data.name}
                                  </p>
                                  {data.phoneNumber}
                                </div>
                              
                                <span
                                  class='btn btn-dark  bg-dark-cus ml-auto'
                                  // to='/helplinecontactform'>
                                  onClick={(e) => update(data)}>
                                  <i
                                    class='fa fa-pencil-square-o '
                                    aria-hidden='true'></i>
                                  <span>Update</span>
                                </span>
                                <span
                                  class='btn btn-danger  bg-dark-cus'
                                  // to='/helplinecontactform'>
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
                        Dealer Help
                      </h4>
                      <div class='two_btns_ps'>
                        {datacountd == undefined || datacountd < 1 ? (
                          <span
                            class='btn bg-light-cus ml-2'
                            // to='/helplinecontactform'
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
                                src={apiUrl + data?.profilePic}
                              />
                              <div class='media-body'>
                                <div className='content-box-cus'>
                                  {' '}
                                  <p class='mt-0 mb-1'>
                                    {data?.name}
                                  </p>
                                  {data?.phoneNumber}
                                </div>
                                {/* <Link
                              class='btn btn-dark  bg-dark-cus ml-auto'
                              to='/helplinecontactform'>
                              <i
                                class='fa fa-pencil-square-o '
                                aria-hidden='true'></i>
                              <span>Update</span>
                            </Link> */}
                                <span
                                  class='btn btn-dark  bg-dark-cus ml-auto'
                                  // to='/helplinecontactform'>
                                  onClick={(e) => update(data)}>
                                  <i
                                    class='fa fa-pencil-square-o '
                                    aria-hidden='true'></i>
                                  <span>Update</span>
                                </span>
                                <span
                                  class='btn btn-danger  bg-dark-cus'
                                  // to='/helplinecontactform'>
                                  onClick={(e) => deleteted(data._id)}>
                                  <i
                                    class='fa  fa-trash '
                                    aria-hidden='true'></i>
                                  <span>Delete</span>
                                </span>
                              </div>
                            </li>
                          ))}

                          {/* <li class='media'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/img_1_nayak.png'}
                        />
                        <div class='media-body'>
                          <div className='content-box-cus'>
                            {' '}
                            <p class='mt-0 mb-1'>List-based media object</p>
                            Cras sit amet nibh libero, in gravida nulla. Nulla
                            vel metus scelerisque ante sollicitudin. Cras purus
                            odio, vestibulum in vulputate at, tempus viverra
                            turpis. Fusce condimentum nunc ac nisi vulputate
                            fringilla. Donec lacinia congue felis in faucibus.
                          </div>
                          <Link
                            class='btn btn-dark  bg-dark-cus ml-auto'
                            to='/helplinecontactform'>
                            <i
                              class='fa fa-pencil-square-o '
                              aria-hidden='true'></i>
                            <span>Update</span>
                          </Link>
                        </div>
                      </li>
                      <li class='media'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/img_1_nayak.png'}
                        />
                        <div class='media-body'>
                          <div className='content-box-cus'>
                            {' '}
                            <p class='mt-0 mb-1'>List-based media object</p>
                            Cras sit amet nibh libero, in gravida nulla. Nulla
                            vel metus scelerisque ante sollicitudin. Cras purus
                            odio, vestibulum in vulputate at, tempus viverra
                            turpis. Fusce condimentum nunc ac nisi vulputate
                            fringilla. Donec lacinia congue felis in faucibus.
                          </div>
                          <Link
                            class='btn btn-dark  bg-dark-cus ml-auto'
                            to='/helplinecontactform'>
                            <i
                              class='fa fa-pencil-square-o '
                              aria-hidden='true'></i>
                            <span>Update</span>
                          </Link>
                        </div>
                      </li>
                     */}
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
                        Financer Help
                      </h4>
                      <div class='two_btns_ps'>
                        {/* {datacountf} */}
                        {datacountf == undefined || datacountf < 1 ? (
                          <span
                            class='btn bg-light-cus ml-2'
                            // to='/helplinecontactform'
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
                                src={apiUrl + data.profilePic}
                              />
                              <div class='media-body'>
                                <div className='content-box-cus'>
                                  {' '}
                                  <p class='mt-0 mb-1'>
                                    {data.name}
                                  </p>
                                  {data.phoneNumber}
                                </div>
                                {/* <Link
                              class='btn btn-dark  bg-dark-cus ml-auto'
                              to='/helplinecontactform'>
                              <i
                                class='fa fa-pencil-square-o '
                                aria-hidden='true'></i>
                              <span>Update</span>
                            </Link> */}
                                <span
                                  class='btn btn-dark  bg-dark-cus ml-auto'
                                  // to='/helplinecontactform'>
                                  onClick={(e) => update(data)}>
                                  <i
                                    class='fa fa-pencil-square-o '
                                    aria-hidden='true'></i>
                                  <span>Update</span>
                                </span>
                                <span
                                  class='btn btn-danger  bg-dark-cus'
                                  // to='/helplinecontactform'>
                                  onClick={(e) => deleteted(data._id)}>
                                  <i
                                    class='fa  fa-trash '
                                    aria-hidden='true'></i>
                                  <span>Delete</span>
                                </span>
                              </div>
                            </li>
                          ))}

                          {/* <li class='media'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/img_1_nayak.png'}
                        />
                        <div class='media-body'>
                          <div className='content-box-cus'>
                            {' '}
                            <p class='mt-0 mb-1'>List-based media object</p>
                            Cras sit amet nibh libero, in gravida nulla. Nulla
                            vel metus scelerisque ante sollicitudin. Cras purus
                            odio, vestibulum in vulputate at, tempus viverra
                            turpis. Fusce condimentum nunc ac nisi vulputate
                            fringilla. Donec lacinia congue felis in faucibus.
                          </div>
                          <Link
                            class='btn btn-dark  bg-dark-cus ml-auto'
                            to='/helplinecontactform'>
                            <i
                              class='fa fa-pencil-square-o '
                              aria-hidden='true'></i>
                            <span>Update</span>
                          </Link>
                        </div>
                      </li>
                      <li class='media'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/img_1_nayak.png'}
                        />
                        <div class='media-body'>
                          <div className='content-box-cus'>
                            {' '}
                            <p class='mt-0 mb-1'>List-based media object</p>
                            Cras sit amet nibh libero, in gravida nulla. Nulla
                            vel metus scelerisque ante sollicitudin. Cras purus
                            odio, vestibulum in vulputate at, tempus viverra
                            turpis. Fusce condimentum nunc ac nisi vulputate
                            fringilla. Donec lacinia congue felis in faucibus.
                          </div>
                          <Link
                            class='btn btn-dark  bg-dark-cus ml-auto'
                            to='/helplinecontactform'>
                            <i
                              class='fa fa-pencil-square-o '
                              aria-hidden='true'></i>
                            <span>Update</span>
                          </Link>
                        </div>
                      </li>
                     */}
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
                        Insurance Help
                      </h4>
                      <div class='two_btns_ps'>
                        {datacounti == undefined || datacounti < 1 ? (
                          <span
                            class='btn bg-light-cus ml-2'
                            // to='/helplinecontactform'
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
                                src={apiUrl + data.profilePic}
                              />
                              <div class='media-body'>
                                <div className='content-box-cus'>
                                  {' '}
                                  <p class='mt-0 mb-1'>
                                    {data.name}
                                  </p>
                                  {data.phoneNumber}
                                </div>
                                {/* <Link
                              class='btn btn-dark  bg-dark-cus ml-auto'
                              to='/helplinecontactform'>
                              <i
                                class='fa fa-pencil-square-o '
                                aria-hidden='true'></i>
                              <span>Update</span>
                            </Link> */}
                                <span
                                  class='btn btn-dark  bg-dark-cus ml-auto'
                                  // to='/helplinecontactform'>
                                  onClick={(e) => update(data)}>
                                  <i
                                    class='fa fa-pencil-square-o '
                                    aria-hidden='true'></i>
                                  <span>Update</span>
                                </span>
                                <span
                                  class='btn btn-danger  bg-dark-cus'
                                  // to='/helplinecontactform'>
                                  onClick={(e) => deleteted(data._id)}>
                                  <i
                                    class='fa  fa-trash '
                                    aria-hidden='true'></i>
                                  <span>Delete</span>
                                </span>
                              </div>
                            </li>
                          ))}

                          {/* <li class='media'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/img_1_nayak.png'}
                        />
                        <div class='media-body'>
                          <div className='content-box-cus'>
                            {' '}
                            <p class='mt-0 mb-1'>List-based media object</p>
                            Cras sit amet nibh libero, in gravida nulla. Nulla
                            vel metus scelerisque ante sollicitudin. Cras purus
                            odio, vestibulum in vulputate at, tempus viverra
                            turpis. Fusce condimentum nunc ac nisi vulputate
                            fringilla. Donec lacinia congue felis in faucibus.
                          </div>
                          <Link
                            class='btn btn-dark  bg-dark-cus ml-auto'
                            to='/helplinecontactform'>
                            <i
                              class='fa fa-pencil-square-o '
                              aria-hidden='true'></i>
                            <span>Update</span>
                          </Link>
                        </div>
                      </li>
                      <li class='media'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/img_1_nayak.png'}
                        />
                        <div class='media-body'>
                          <div className='content-box-cus'>
                            {' '}
                            <p class='mt-0 mb-1'>List-based media object</p>
                            Cras sit amet nibh libero, in gravida nulla. Nulla
                            vel metus scelerisque ante sollicitudin. Cras purus
                            odio, vestibulum in vulputate at, tempus viverra
                            turpis. Fusce condimentum nunc ac nisi vulputate
                            fringilla. Donec lacinia congue felis in faucibus.
                          </div>
                          <Link
                            class='btn btn-dark  bg-dark-cus ml-auto'
                            to='/helplinecontactform'>
                            <i
                              class='fa fa-pencil-square-o '
                              aria-hidden='true'></i>
                            <span>Update</span>
                          </Link>
                        </div>
                      </li>
                     */}
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
                      <h4 class='card-title text-white'>User Help</h4>
                      <div class='two_btns_ps'>
                        {datacountu == undefined || datacountu < 1 ? (
                          <span
                            class='btn bg-light-cus ml-2'
                            // to='/helplinecontactform'
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
                                src={apiUrl + data.profilePic}
                              />
                              <div class='media-body'>
                                <div className='content-box-cus'>
                                  {' '}
                                  <p class='mt-0 mb-1'>
                                    {data.name}
                                  </p>
                                  {data.phoneNumber}
                                </div>
                                {/* <Link
                              class='btn btn-dark  bg-dark-cus ml-auto'
                              to='/helplinecontactform'>
                              <i
                                class='fa fa-pencil-square-o '
                                aria-hidden='true'></i>
                              <span>Update</span>
                            </Link> */}
                                <span
                                  class='btn btn-dark  bg-dark-cus ml-auto'
                                  // to='/helplinecontactform'>
                                  onClick={(e) => update(data)}>
                                  <i
                                    class='fa fa-pencil-square-o '
                                    aria-hidden='true'></i>
                                  <span>Update</span>
                                </span>
                                <span
                                  class='btn btn-danger  bg-dark-cus'
                                  // to='/helplinecontactform'>
                                  onClick={(e) => deleteted(data._id)}>
                                  <i
                                    class='fa  fa-trash '
                                    aria-hidden='true'></i>
                                  <span>Delete</span>
                                </span>
                              </div>
                            </li>
                          ))}

                          {/* <li class='media'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/img_1_nayak.png'}
                        />
                        <div class='media-body'>
                          <div className='content-box-cus'>
                            {' '}
                            <p class='mt-0 mb-1'>List-based media object</p>
                            Cras sit amet nibh libero, in gravida nulla. Nulla
                            vel metus scelerisque ante sollicitudin. Cras purus
                            odio, vestibulum in vulputate at, tempus viverra
                            turpis. Fusce condimentum nunc ac nisi vulputate
                            fringilla. Donec lacinia congue felis in faucibus.
                          </div>
                          <Link
                            class='btn btn-dark  bg-dark-cus ml-auto'
                            to='/helplinecontactform'>
                            <i
                              class='fa fa-pencil-square-o '
                              aria-hidden='true'></i>
                            <span>Update</span>
                          </Link>
                        </div>
                      </li>
                      <li class='media'>
                        <Image
                          className='w-75'
                          alt='img'
                          src={'assets/images/img_1_nayak.png'}
                        />
                        <div class='media-body'>
                          <div className='content-box-cus'>
                            {' '}
                            <p class='mt-0 mb-1'>List-based media object</p>
                            Cras sit amet nibh libero, in gravida nulla. Nulla
                            vel metus scelerisque ante sollicitudin. Cras purus
                            odio, vestibulum in vulputate at, tempus viverra
                            turpis. Fusce condimentum nunc ac nisi vulputate
                            fringilla. Donec lacinia congue felis in faucibus.
                          </div>
                          <Link
                            class='btn btn-dark  bg-dark-cus ml-auto'
                            to='/helplinecontactform'>
                            <i
                              class='fa fa-pencil-square-o '
                              aria-hidden='true'></i>
                            <span>Update</span>
                          </Link>
                        </div>
                      </li>
                     */}
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
