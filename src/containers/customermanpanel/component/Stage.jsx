import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import apiUrl from '../../../globals/config';
import showNotification from "../../../services/notificationService";
import * as constant from "../../.../../../services/constant";
export default function Stage() {
    const [page, setPage] = useState(constant.START);
    const [countLeadd, setcountLeadd] = useState('');
    const [stage, setstage] = useState("");
    useEffect(() => {
        stagelead();
      
    }, []);
   
    const stagelead = () => {
      let token = localStorage.getItem("myData");
      let headers = {
        headers: {
          "x-token": `Bearer ${token}`,
        },
      };
      axios
        .get(apiUrl + "user/cmtStages", headers)
  
        .then((resp) => {
          setstage(resp?.data);
        })
        .catch((err) => {
          showNotification("danger", err.message);
        });
    };
    return (
        <section class='ttm-row ttm-bg ttm-bgimage-yes bg-img3 process-section clearfix mb-3'>
            <Row className='mb-4'>
              <Col lg={12} className='mb-2'>
                <div className='d-block pb-0 border-0'>
                  <div className='mr-auto pr-3'>
                    <h4 className='text-black font-w600 fs-20'>
                      Stages of a lead
                    </h4>
                  </div>
                </div>
              </Col>
            </Row>
            <div class='container-fluid mt-1 pt-0'>
              <div class='row mb-5'>
                <div class='col-lg-12'>
                  <div class='row ttm-processbox-wrapper ttm-processbox-wrapper2 justify-content-center'>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div class='ttm-processbox'>
                        <div class='ttm-box-image'>
                          <div class='process-num'>
                            <span class='number'>C1</span>
                          </div>
                        </div>
                        <div class='featured-content'>
                          <div class='featured-title'>
                            <h6 className='mb-1'>Confirmed Lead </h6>
                            <p>{stage?.confirmLead?stage?.confirmLead:"0"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div class='ttm-processbox mt-20 res-991-mb-50'>
                        <div class='ttm-box-image'>
                          <div class='process-num'>
                            <span class='number'>C2</span>
                          </div>
                        </div>
                        <div class='featured-content'>
                          <div class='featured-title'>
                            <h6 className='mb-1'>Quotation Generated </h6>
                            <p>{stage?.quotationPdf?stage?.quotationPdf:"0"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div class='ttm-processbox'>
                        <div class='ttm-box-image'>
                          <div class='process-num'>
                            <span class='number'>C3</span>
                          </div>
                        </div>
                        <div class='featured-content'>
                          <div class='featured-title'>
                            <h6 className='mb-1'>Under Finance</h6>
                            <p>{stage?.underFinance?stage?.underFinance:"0"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2 mb-3 mb-lg-0'>
                      <div class='ttm-processbox'>
                        <div class='ttm-box-image'>
                          <div class='process-num'>
                            <span class='number'>C4</span>
                          </div>
                        </div>
                        <div class='featured-content'>
                          <div class='featured-title'>
                            <h6 className='mb-1'>Down Payment </h6>
                            <p>{stage?.downPayment?stage?.downPayment:"0"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 col-lg-2'>
                      <div class='ttm-processbox'>
                        <div class='ttm-box-image'>
                          <div class='process-num'>
                            <span class='number'>C5</span>
                          </div>
                        </div>
                        <div class='featured-content'>
                          <div class='featured-title'>
                            <h6 className='mb-1'>Vehicle Delivered</h6>
                            <p>{stage?.vehicleDelievered?stage?.vehicleDelievered:"0"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
         
    )
}
