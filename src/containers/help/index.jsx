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
import showNotification from '../../services/notificationService';

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
      .get(apiUrl + 'home/getList', headers)

      .then((resp) => {
        console.log(`resp`, resp);
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
  const deleteOne = (id) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .delete(apiUrl + 'home/deleteData/' + id, headers)

      .then((resp) => {
        showNotification('danger', 'Delete Sucess');
        ticket(page);
      })
      .catch((err) => {
        showNotification('danger', err.message);
      });
  };
  return (
    <div className='content-body'>
      <div class='container-fluid'>
        <section className='stage_lead_sec'>
          <div className='row dataTables_wrapper'>
            <div class='col-lg-12 mt-0'>
              <div class='card'>
                <div class='card-body'>
                  <div class='mr-auto '>
                    <h4 class='text-black font-w600 fs-20 pl-3'>
                      List of Contact Detail
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
                            <span>NO</span>
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
                              <strong>{index + 1}</strong>
                            </td>
                            <td>{data?.firstName}</td>
                            <td>{data?.lastName}</td>
                            {/* <td>{data?.phoneNo}</td> */}
                            <td>{data?.email}</td>
                            <td>{data?.subject}</td>
                            <td>{data?.message}</td>
                            <td>
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
    </div>
  );
}
