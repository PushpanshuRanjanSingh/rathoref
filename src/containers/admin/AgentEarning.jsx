import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import showNotification from "../../.../../services/notificationService";
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import * as constant from "../.../../../services/constant";
import Header from '../header/header';
import Footer from '../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import apiUrl from '../../globals/config';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Cmtcreate from './component/Cmtcreate';
import { useHistory } from "react-router-dom";
import Insurancecreate from './component/Insurancecreate';
import Financecreate from './component/financecreate';
import Naayak from './component/Naayak';
import Financer from './component/Financer';
import Insurance from './component/Insurance';
// import UserBanner from './component/UserBanner';
import Delear from './component/Delear';
import DealerTab from '../customermanpanel/component/DealerTabProfoma';
import DealerTabProfoma from '../customermanpanel/component/DealerTabProfoma';
import DealerTabDo from '../customermanpanel/component/DealerTabDo';
import DealerTabL2 from '../customermanpanel/component/DealerTabL2';
import DealerTabInsurance from '../customermanpanel/component/DealerTabInsurance';
import DealerTabTaxToken from '../customermanpanel/component/DealerTabTaxToken';
import DealerTabL5 from '../customermanpanel/component/DealerTabL5';
import DealerTabLClosingDocuments from '../customermanpanel/component/DealerTabClosingDocuments';
import EstimatePDF from '../customermanpanel/component/estimatePDF';
import Stage from '../customermanpanel/component/Stage';
var fileDownload = require('js-file-download');
function DealerSection(props) {
  const [page, setPage] = useState(1);
  const [datacount, setdatacount] = useState();
  const [data, setdata] = useState([]);
  let history = useHistory();
  useEffect(() => {
    getData(page);
  }, [page]);
  const getData = (page) => {
   
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "earnings/getRequestedData?page=" + page + "&pageSize=10", headers)

      .then((resp) => {
     
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };
  const updateOne = (phoneNo, otp, id) => {
    history.push({
      pathname: '/UpdateData',
      data: { phoneNo, otp, id },
    });
  };
 
  function download(url, name) {
    var fileName = name + '.' + url.split('.')[1];

    axios
      .get(apiUrl + url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, fileName);
      });
  }
  
  const reject = (id) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .put(apiUrl + 'cmtDealer/proformaObject', { id }, headers)

      .then((resp) => {
        showNotification("success", resp?"Reject Lead Successful":"");
        getData(page);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const approve = (id) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .put(apiUrl + 'cmtDealer/proformaApproved', { id }, headers)

      .then((resp) => {
        showNotification("success", resp?"Approve Lead Successful":"");
        getData(page);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };

  return (
    <>
        {/* <Header /> */}
        <div className='content-body'>
        <div className='container-fluid'>
         
         
           <section className="stage_lead_sec mt-5">
      <div className="row dataTables_wrapper">
        <div className="col-lg-12 mt-0">
          <div className="card">
            <div className="card-body">
             
              <div className="table-responsive">
                <table className="table table-responsive-md">
                  <thead>
                    <tr className="table_th">
                      <th className="width100">
                        <span>S.NO </span>
                      </th>
                      <th>
                        <span>Naayak's Full Name</span>
                      </th>
                      <th>
                        <span>Bank Name</span>
                      </th>
                      <th>
                        <span>A/C No</span>
                      </th>
                      <th>
                        <span>IFSC Code</span>
                      </th>
                      <th>
                        <span>Contact No</span>
                      </th>
                      <th>
                        <span>Ammount</span>
                      </th>
                      <th>
                        <span>Action</span>
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody>
                   
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-between mt-3">
                <div
                  class="dataTables_info pl-3"
                  id="example_info"
                  role="status"
                  aria-live="polite"
                >
                  Showing {constant.START} to {constant.ONPAGE} of  {datacount} entries
                </div>
                <div
                  class="dataTables_paginate paging_simple_numbers"
                  id="example_paginate">
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
 
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
  
 
}

export default DealerSection;
