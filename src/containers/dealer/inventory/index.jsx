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
// import apiUrl from "../../globals/config";
import apiUrl from '../../../globals/config';
import ReactPaginate from 'react-paginate';

function Index(props) {
  const [page, setPage] = useState(1);
  const [datacount, setdatacount] = useState();
  const [inventoryData, setinventoryData] = useState([]);

  useEffect(() => {
    inventoryLists(page);
  }, [page]);
  const inventoryLists = (data) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + 'Inventory/getAllInventory?skip=' + data + '&limit=10',
        headers
      ) // //Inventory/getAllInventory
      .then((resp) => {
       
        setinventoryData(resp?.data?.message[0]?.data);
        setdatacount(resp?.data?.message[0]?.count);
      })
      .catch((err) => {
        console.log(err);
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
       
        inventoryLists(page);
      })
      .catch((err) => console.log(`err........`, err));
  };
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };

  return (
    <>
      {/* <Header /> */}
      <div className='content-body'>
        <div className='container-fluid'>
          <section className='stage_lead_sec'>
            <div className='emi_row row dataTables_wrapper'>
              <div class='col-lg-12 mt-0'>
                <div class='card widget-stat'>
                  <div class='card-header bg-custom-blue '>
                    <h4 class='card-title text-white'>Inventory</h4>
                    <Link to='/inventoryEdit'>
                      <button type='button' class='btn btn-light ml-2'>
                        <i class='fa fa-plus pr-1' aria-hidden='true'></i>
                        <span>Add</span>
                      </button>
                    </Link>
                  </div>
                  <div class='card-body'>
                    <div class='table-responsive'>
                      <table class='table '>
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
                          {inventoryData &&
                            inventoryData.map((data, index) => {
                              if (index == 0) {
                                var num = index + 1;
                              } else {
                                var num = index;
                              }
                              return (
                                <tr>
                                  <td>
                                    <strong>
                                      {(page - 1) * 10 + index + 1}
                                    </strong>
                                  </td>
                                  <td>{data?.colour[0]?.skuVcm}</td>
                                  <td>{data?.ppl[0]?.pplName}</td>
                                  <td>{data?.pl[0]?.plName}</td>
                                  <td>{data?.variant[0]?.variantName}</td>
                                  <td>{data?.colour[0]?.colorName}</td>
                                  <td>{data?.stocks}</td>
                                  <td>{data?.exShowroomPrice}</td>
                                  <td>{data?.cashDiscount}</td>
                                  <td>{data?.additionalDiscount}</td>
                                  <td>{data?.rtoCharges}</td>
                                  <td>{data?.commission}</td>
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
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                    <div className='d-md-flex justify-content-between mt-3'>
                      <div
                        className='dataTables_info pl-3'
                        id='example_info'
                        role='status'
                        aria-live='polite'>
                        {datacount
                          ? `Showing 1 to 10 of ${datacount} entries`
                          : ''}
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
