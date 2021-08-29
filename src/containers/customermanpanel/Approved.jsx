import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import Header from '../header/header';
import Footer from '../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import showNotification from "../../services/notificationService";
import axios from 'axios';
import * as constant from "../../services/constant";
import ReactPaginate from 'react-paginate';
import apiUrl from '../../globals/config';
import { useHistory } from 'react-router-dom';
function Agent(props) {
  const history = useHistory();
  const [page, setPage] = useState(constant.START);
  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  useEffect(() => {
    ongoing(page);
  }, [page]);
  let index =0
  const ongoing = (page) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'user/totalapprovedCmt?skip=' + page + '&limit=10', headers) 

      .then((resp) => {
        setconfirmLead(resp?.data?.data[index].data); 
        setdatacount(resp?.data?.data[index].count);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + constant.START);
  };
  const deleteOne = (id) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .delete(apiUrl + 'user/deleteRecord/' + id, headers) 

      .then((resp) => {
        ongoing(page);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };

  const updateOne = (phoneNo, otp, id) => {
    history.push({
      pathname: '/UpdateData',
      data: { phoneNo, otp, id },
    });
  };
  const generatePDF = ( id) => {
    history.push({
      pathname: '/generatePDF',
      data: id,
    });
  };

  const viewClient = (phoneNo, otp) => {
    history.push({
      pathname: '/view',
      data: { phoneNo, otp },
    });
  };
  const dropLead = (id) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .put(apiUrl + 'user/dropLead', { id }, headers)
      .then((resp) => {
        
        showNotification("danger", resp?"Droped Lead Successful":"");
        ongoing(page);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  return (
    <>
      
      <section className='stage_lead_sec'>
        <div className='row dataTables_wrapper'>
          <div class='col-lg-12'>
            <div class='d-block pb-0 border-0'>
              <div class='mr-auto pr-3'>
               
              </div>
            </div>
          </div>
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
                  />
                  <a href='#0' class='btn btn-primary rounded d-block'>
                    Search
                  </a>
                </div>
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
                          <span>Created On</span>
                        </th>
                        <th>Action</th>
                        <th>Drop Lead</th>
                      </tr>
                    </thead>
                    <tbody>
                      {confirmLead.map((data, index) => (
                        <tr>
                          <td>
                            <strong>{(page - constant.START) * constant.ONPAGE + index + constant.START}</strong>
                          </td>
                          <td
                            onClick={() => viewClient(data.phoneNo, data.otp)}>
                            {data.firstName}
                          </td>
                          <td>{data.phoneNo}</td>
                          <td>{data?.vehicle[0]?.vehicleDescription[0]?.vehicleName}</td>
                          <td>{data?.createdAt.split('T')[index]}</td>

                          <td>
                            <span
                              class='badge light badge-success mr-1'
                              onClick={() =>
                                updateOne(data.phoneNo, data.otp, data._id)
                              }>
                              Update
                            </span>
                            <span
                              class='badge light badge-primary'
                              onClick={() =>
                                generatePDF( data)
                              }>
                              Generate Estimate
                            </span>
                          </td>
                          <td class='download-icon'>
                           
                            <i
                              class='fa fa-download'
                              onClick={(e) => dropLead(data._id)}
                              aria-hidden='true'></i>
                         
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
    </>
  );
}

export default Agent;
