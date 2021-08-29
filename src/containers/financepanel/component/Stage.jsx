import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import apiUrl from "../../../globals/config";
import showNotification from "../../../services/notificationService";
function Stage() {
    const [user, setuser] = useState({});
    useEffect(() => {
       
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
          .get(apiUrl + 'user/financerClientCount', headers)
     
          .then((resp) => {
            setuser(resp.data);
          
          })
          .catch((err) => {
            showNotification("danger", err.message);
          });
      };
    return (
        <section className="ttm-row ttm-bg ttm-bgimage-yes bg-img3 process-section clearfix mb-3">
        <Row className="mb-4">
          <Col lg={12} className="mb-2">
            <div className="d-block pb-0 border-0">
              <div className="mr-auto pr-3">
                <h4 className="text-black font-w600 fs-20">
                  Stages of a Finance
                </h4>
              </div>
            </div>
          </Col>
        </Row>
        <div className="container-fluid mt-1 pt-0 ">
          <div className="row mb-5">
            <div className="col-lg-12">
              <div className="row ttm-processbox-wrapper ttm-processbox-wrapper2 justify-content-center">
                <div className="col-md-2 col-lg-2 mb-3 mb-lg-0">
                  <div className="ttm-processbox mt-50 res-991-mb-50">
                    <div className="ttm-box-image">
                      <div className="process-num">
                        <span className="number">F1</span>
                      </div>
                    </div>
                    <div className="featured-content">
                      <div className="featured-title">
                        <h6 className="mb-1">Client to review </h6>
                        <p>{user && user?.newCases ?user?.newCases:"0"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-lg-2 mb-3 mb-lg-0">
                  <div className="ttm-processbox">
                    <div className="ttm-box-image">
                      <div className="process-num">
                        <span className="number">F2</span>
                      </div>
                    </div>
                    <div className="featured-content">
                      <div className="featured-title">
                        <h6 className="mb-1">Review Client</h6>
                        <p>{user && user?.reviewedClient ?user?.reviewedClient:"0"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-lg-2 mb-3 mb-lg-0">
                  <div className="ttm-processbox">
                    <div className="ttm-box-image">
                      <div className="process-num">
                        <span className="number">F3</span>
                      </div>
                    </div>
                    <div className="featured-content">
                      <div className="featured-title">
                        <h6 className="mb-1">Do Ready Clients </h6>
                        <p>{user && user?.doreadyCases ?user?.doreadyCases:"0"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-lg-2">
                  <div className="ttm-processbox">
                    <div className="ttm-box-image">
                      <div className="process-num">
                        <span className="number">F4</span>
                      </div>
                    </div>
                    <div className="featured-content">
                      <div className="featured-title">
                        <h6 className="mb-1">Completed Deals </h6>
                        <p>{user && user?.doreadyCases ?user?.doreadyCases:"0"}</p>
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

export default Stage
