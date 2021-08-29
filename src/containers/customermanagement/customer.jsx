import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import base from "../../globals/base";
import Header from "../header/header";
import Footer from "../footer/footer";
import axios from 'axios';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Topfivefreshlead from "../customermanpanel/component/Topfivefreshlead";
import BrandQuery from "../customermanpanel/component/BrandQuery";
import showNotification from "../../services/notificationService";
import apiUrl from '../../globals/config';
import * as constant from "../../services/constant";
function Customer(props) {
  const [page, setPage] = useState(constant.START);
  const [countLeadd, setcountLeadd] = useState('');
  const [stage, setstage] = useState("");
  useEffect(() => {
    lead();
    // stagelead();
  }, [page]);
  const lead = () => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'user/totalLeadCountCMT', headers)

      .then((resp) => {
        setcountLeadd(resp?.data);
       
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <Row className="mb-4">
            <Col xl={9} className=" mb-3 mb-xl-0">
              <OwlCarousel
                className="owl-theme cus_owl_theme"
                items={1}
                margin={8}
                loop
                margin={10}
                nav
              >
                <div className="item item_box">
                  <div className="inner_slider_box">
                    <Row className="justify-content-center align-items-center m-auto mb-4">
                      <Col sm={7}>
                        <div className="col_inner_box">
                          <h2>Heading Text</h2>
                          <p className="pr-sm-5">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s{" "}
                          </p>
                          <Button
                            variant="light"
                            className="font-weight-bold btn-txt"
                          >
                            Explore Now
                          </Button>
                        </div>
                      </Col>
                      <Col sm={5}>
                        <div className="inner_img_slider">
                          <Image
                            className="w-75"
                            alt="img"
                            src={"assets/images/img_1_nayak.png"}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="cross_icon">
                    <Link to="/">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </Link>
                  </div>
                </div>
                <div className="item item_box">
                  <div className="inner_slider_box">
                    <Row className="justify-content-center align-items-center m-auto">
                      <Col sm={7}>
                        <div className="col_inner_box">
                          <h2>Heading Text</h2>
                          <p className="pr-sm-5">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s{" "}
                          </p>
                          <Button
                            variant="light"
                            className="font-weight-bold btn-txt"
                          >
                            Explore Now
                          </Button>
                        </div>
                      </Col>
                      <Col sm={5}>
                        <div className="inner_img_slider">
                          <Image
                            className="w-75"
                            alt="img"
                            src={"assets/images/img_3_nayak.png"}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="cross_icon">
                    <Link to="/">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </Link>
                  </div>
                </div>
                <div className="item item_box">
                  <div className="inner_slider_box">
                    <Row className="justify-content-center align-items-center m-auto">
                      <Col sm={7}>
                        <div className="col_inner_box">
                          <h2>Heading Text</h2>
                          <p className="pr-sm-5">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s{" "}
                          </p>
                          <Button
                            variant="light"
                            className="font-weight-bold btn-txt"
                          >
                            Explore Now
                          </Button>
                        </div>
                      </Col>
                      <Col sm={5}>
                        <div className="inner_img_slider">
                          <Image
                            className="w-75"
                            alt="img"
                            src={"assets/images/img_2_nayak.png"}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="cross_icon">
                    <Link to="/">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </Link>
                  </div>
                </div>
              </OwlCarousel>
            </Col>
            <Col xl={3}>
              <Row className="mb-4 db_lft_grid">
                <Col sm={6} xl={12}>
                  <div className="widget-stat card shutter-in-vertical">
                    <div className="card-body p-4 d-flex flex-column justify-content-center">
                      <div className="media ai-icon">
                        <span class="mr-3 bgl-danger text-danger">
                          <Image
                            className="w-75"
                            alt="img"
                            src={"assets/images/leads.png"}
                          />
                        </span>
                        <div className="media-body">
                          <p className="mb-1">New Leads</p>
                          <h4 className="mb-0">{countLeadd?.totalLead ? countLeadd?.totalLead : '0'}</h4>
                        </div>
                      </div>
                      <div className="d-flex mt-3">
                        
                        <a
                          href="/customermanagementlead"
                          className="btn btn-outline-danger btn-xxs ml-2"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
              
              </Row>
            </Col>
          </Row>
          <BrandQuery />
        </div>
      </div>
    </>
  );
}
export default Customer;
