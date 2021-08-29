import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import base from "../../globals/base";
import Header from "../header/header";
import Footer from "../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// export default class Dealer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return (

//     );
//   }
// }

function Onboarding() {
  const [earningShow, setearningShow] = React.useState(false);

  const earningShowfunction = () => {
    if (!earningShow) { setearningShow(true) }
    else { setearningShow(false) }
  } 
  return (
    <>
     {/* <Header /> */}
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
                    <Link className="" to="/">
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
                    <Link className="" to="/">
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
                    <Link className="" to="/">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </Link>
                  </div>
                </div>
              </OwlCarousel>
            </Col>
            <Col xl={3}>
              <Row className="mb-4 db_lft_grid">
                <Col xl={12} sm={6}>
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
                          <p className="mb-1">Client Details</p>
                          <h4 className="mb-0">65</h4>
                        </div>
                      </div>
                      <div className="d-flex mt-3">
                        <a href="#0" className="btn btn-primary btn-xxs shadow">
                          New lead
                        </a>
                        <a
                          href="#0"
                          className="btn btn-outline-danger btn-xxs ml-2"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xl={12} sm={6}>
                  <div className="widget-stat card shutter-in-vertical">
                    <div className="card-body p-4 d-flex flex-column justify-content-center">
                      <div className="media ai-icon">
                        <span class="mr-3 bgl-success text-success">
                          <Image
                            className="w-75"
                            alt="img"
                            src={"assets/images/earning.png"}
                          />
                        </span>
                        <div className="media-body">
                          <p className="mb-1">Earnings</p>
                          <h5 className="mb-0 fs-16">{earningShow ? "32805" : "*****"}</h5>
                        </div>
                      </div>
                      <div className="d-flex mt-3">
                      <a href="javascript:void(0)" onClick={earningShowfunction} className="btn btn-primary btn-xxs shadow">{earningShow ? "Hide Amount" : "Show Amount"}</a>
                        {/* <a href="#0" className="btn btn-primary btn-xxs shadow">
                          Show Amount
                        </a> */}
                        <a
                          href="#0"
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

          <section className="stage_lead_sec">
            <div className="row dataTables_wrapper">
              <div class="col-lg-12 mt-0">
                <div class="card">
                  <div class="card-body">
                    <div
                      id="example_filter"
                      class="dataTables_filter d-flex justify-content-end"
                    >
                      <input
                        type="search"
                        class="w-30 mr-3"
                        placeholder=""
                        aria-controls="example"
                      />{" "}
                      <a href="#0" class="btn btn-primary rounded d-block">
                        Search
                      </a>
                    </div>
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr className="table_th">
                            <th class="width100">
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
                              <span>Stage</span>
                            </th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <strong>01</strong>
                            </td>
                            <td>Mr. Bobby</td>
                            <td>1234567891</td>
                            <td>Tata Ace - Diesel-Black</td>

                            <td>CO</td>
                            <td>
                              <span class="badge light badge-success">
                                Update
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>01</strong>
                            </td>
                            <td>Mr. Bobby</td>
                            <td>1234567891</td>
                            <td>Tata Ace - Diesel-Black</td>

                            <td>CO</td>
                            <td>
                              <span class="badge light badge-success">
                                Update
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>01</strong>
                            </td>
                            <td>Mr. Bobby</td>
                            <td>1234567891</td>
                            <td>Tata Ace - Diesel-Black</td>

                            <td>CO</td>
                            <td>
                              <span class="badge light badge-success">
                                Update
                              </span>
                            </td>
                          </tr>
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
                        Showing 1 to 10 of 57 entries
                      </div>
                      <div
                        class="dataTables_paginate paging_simple_numbers"
                        id="example_paginate"
                      >
                        <a
                          class="paginate_button previous disabled"
                          aria-controls="example"
                          data-dt-idx="0"
                          tabindex="0"
                          id="example_previous"
                        >
                          Previous
                        </a>
                        <span>
                          <a
                            class="paginate_button current"
                            aria-controls="example"
                            data-dt-idx="1"
                            tabindex="0"
                          >
                            1
                          </a>
                          <a
                            class="paginate_button "
                            aria-controls="example"
                            data-dt-idx="2"
                            tabindex="0"
                          >
                            2
                          </a>
                          <a
                            class="paginate_button "
                            aria-controls="example"
                            data-dt-idx="3"
                            tabindex="0"
                          >
                            3
                          </a>
                          <a
                            class="paginate_button "
                            aria-controls="example"
                            data-dt-idx="4"
                            tabindex="0"
                          >
                            4
                          </a>
                          <a
                            class="paginate_button "
                            aria-controls="example"
                            data-dt-idx="5"
                            tabindex="0"
                          >
                            5
                          </a>
                          <a
                            class="paginate_button "
                            aria-controls="example"
                            data-dt-idx="6"
                            tabindex="0"
                          >
                            6
                          </a>
                        </span>
                        <a
                          class="paginate_button next"
                          aria-controls="example"
                          data-dt-idx="7"
                          tabindex="0"
                          id="example_next"
                        >
                          Next
                        </a>
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

export default Onboarding;
