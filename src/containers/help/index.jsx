import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import Header from '../header/header';
import Footer from '../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import styled from 'styled-components';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import apiUrl from '../../globals/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import FreshdeskWidget from '@personare/react-freshdesk-widget';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Ticketcomponent from './TicketComponent';
var Freshdesk = require('freshdesk-api');
var freshdesk = new Freshdesk(
  'https://naayak.freshdesk.com/',
  'NTvjJVEZz5hfMBXFn7'
);

export default function Index(props) {
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
  const { register, handleSubmit, errors, reset } = useForm();
  const restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };
  const onSubmit = (data) => {
    freshdesk.createTicket(
      {
        name: data.name,
        email: data.email,
        subject: data.subject,
        description:
          'Customer Number' + data.phoneNo + ' ' + 'Messgae' + data.description,
        status: 2,
        priority: 1,
      },
      function (err, dataa) {
        if (dataa) {
          data.ticketNo = dataa.requester_id;
          needHelp(data);
        }

        // alert(
        //   err ||
        //     'Your request is submitted successfully. Your Request no is :' +
        //       dataa.requester_id
        // );
        console.log(err || dataa);
      }
    );
  };
  const needHelp = (data) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .post(apiUrl + 'help/getHelp', data, headers)
      .then((response) => {
        var data = response.data;
        if (data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 2500,
          });
          reset();
          ticket(page);
        } else {
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className='content-body'>
      <form autocomplete='off' onSubmit={handleSubmit(onSubmit)}>
        <div class='container-fluid'>
          <section className='contact-box'>
            <div class='row'>
              <div class='col-sm-12 col-md-6 col-lg-4 '>
                <div class='card border-0 shutter-in-vertical'>
                  <div class='card-body text-center'>
                    <a className='btn-achor btn-call' href='tel:+4733378901'>
                      <i class='fa fa-phone ' aria-hidden='true'></i>
                    </a>
                    <h5 class='text-uppercase mb-2'>Call us</h5>
                    <p>+1236567890</p>
                  </div>
                </div>
              </div>
              <div class='col-sm-12 col-md-6 col-lg-4 '>
                <div class='card border-0 shutter-in-vertical'>
                  <div class='card-body text-center'>
                    <Link
                      className='btn-achor btn-location bgl-success '
                      to='#'>
                      <i class='fa fa-map-marker ' aria-hidden='true'></i>
                    </Link>
                    <h5 class='text-uppercase mb-2'>Location</h5>
                    <address>
                      Suite 02, Level 12, Sahera Tropical Center{' '}
                    </address>
                  </div>
                </div>
              </div>

              <div class='col-sm-12 col-md-6 col-lg-4 '>
                <div class='card border-0 shutter-in-vertical'>
                  <div class='card-body text-center'>
                    <Link
                      className='btn-achor btn-email bgl-warning btn-call'
                      to='#'>
                      <i class='fa fa-globe' aria-hidden='true'></i>
                    </Link>
                    <h5 class='text-uppercase mb-2'>Email</h5>
                    <p>help@naayak.com</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='stage_lead_sec '>
            <div className='row dataTables_wrapper'>
              <div className='col-lg-12 mt-0'>
                <div className='card'>
                  <div className='card-body'>
                    <main class='flexbox-col'>
                      <div class='form-wrapper'>
                        <div class=' contact-form'>
                          <form method='post'>
                            <div class='row'>
                              <div class='col-md-6'>
                                <div class='form-group'>
                                  <input
                                    type='text'
                                    name='name'
                                    class='form-control'
                                    placeholder='Your Name *'
                                    // onChange={(text) => this.onChangetxt(text)}
                                    // value={this.state.name}
                                    ref={register({
                                      required: 'This is required ',
                                    })}
                                  />
                                  <ErrorMessage
                                    errors={errors}
                                    name='name'
                                    render={({ message }) => (
                                      <p className='error'>{message}</p>
                                    )}
                                  />
                                  {/* //<p className='error'>.state.nm}</p> */}
                                </div>
                                <div class='form-group'>
                                  <input
                                    type='text'
                                    name='email'
                                    class='form-control'
                                    placeholder='Your Email *'
                                    ref={register({
                                      required: 'This is required ',
                                      pattern: {
                                        value:
                                          /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/,
                                        message: 'Enter Valid Email id',
                                      },
                                    })}
                                    // onChange={(text) =>
                                    //   this.emailValidate(text)
                                    // }
                                    // value={this.state.email}
                                  />
                                  <ErrorMessage
                                    errors={errors}
                                    name='email'
                                    render={({ message }) => (
                                      <p className='error'>{message}</p>
                                    )}
                                  />
                                  {/* //<p className='error'>.state.emessage}</p> */}
                                </div>
                                <div class='form-group'>
                                  <input
                                    type='text'
                                    name='subject'
                                    class='form-control'
                                    placeholder='Subject *'
                                    // onChange={(text) => this.subject(text)}
                                    // value={this.state.subject}
                                    ref={register({
                                      required: 'This is required ',
                                    })}
                                  />
                                  <ErrorMessage
                                    errors={errors}
                                    name='subject'
                                    render={({ message }) => (
                                      <p className='error'>{message}</p>
                                    )}
                                  />
                                  {/* <p className='error'>
                                    {this.state.subjMessage}
                                  </p> */}
                                </div>
                                <div class='form-group'>
                                  <input
                                    type='text'
                                    name='phoneNo'
                                    class='form-control'
                                    placeholder='Your Phone Number *'
                                    onKeyPress={(e) => restrictAlpha(e)}
                                    maxLength='10'
                                    ref={register({
                                      required: 'This is required ',
                                      pattern: {
                                        value:
                                          /^[5-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/,
                                        message: 'Enter Valid Contact Number',
                                      },
                                    })}
                                    // onChange={(text) =>
                                    //   this.mobilevalidate(text)
                                    // }
                                    // value={this.state.phoneNo}
                                  />
                                  <ErrorMessage
                                    errors={errors}
                                    name='phoneNo'
                                    render={({ message }) => (
                                      <p className='error'>{message}</p>
                                    )}
                                  />
                                  {/* //<p className='error'>.state.message}</p> */}
                                </div>
                              </div>
                              <div class='col-md-6'>
                                <div class='form-group '>
                                  <textarea
                                    name='description'
                                    class='form-control textarea_box'
                                    placeholder='Your Message *'
                                    ref={register({
                                      required: 'This is required ',
                                    })}
                                    // onChange={(text) => this.onChangetxt1(text)}
                                    // value={this.state.des}
                                  ></textarea>
                                  <ErrorMessage
                                    errors={errors}
                                    name='description'
                                    render={({ message }) => (
                                      <p className='error'>{message}</p>
                                    )}
                                  />
                                  {/* //<p className='error'>.state.descriptionmsg}</p> */}
                                </div>
                              </div>
                              <div className='col-md-12'>
                                <div class='form-group mb-0'>
                                  <input
                                    type='submit'
                                    name='btnSubmit'
                                    class='btn btn-primary rounded d-block theme-btn'
                                    value='Send Message'
                                    // onClick={(e) => {
                                    //   this.onSubmit(e);
                                    // }}
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        {/* <p className='successMag'>{this.state.result}</p> */}
                      </div>
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </section>
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

          {/* <Ticketcomponent /> */}
        </div>
      </form>
    </div>
  );
}
