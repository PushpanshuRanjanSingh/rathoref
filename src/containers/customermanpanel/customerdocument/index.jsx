import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Index() {
  return (
    <>
      {/* <Header /> */}
      <div className="content-body">
        <div className="container-fluid">
          <Row className="mb-4">
            <Col lg={12}>
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
          </Row>
          <Row className="emi_row">
            <Col lg={12}>
              <div className="card widget-stat">
                <div class="card-header bg-custom-blue ">
                  <h4 class="card-title text-white">Upload Document</h4>
                </div>
                <div class="card-body">
                  <div class="basic-form">
                    <form>
                      <div class="row">
                        <div class="form-group col-md-6">
                          <label>Customer Mobile Number</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter customer mobile number"
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label>Otp</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter otp"
                          />
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Index;
