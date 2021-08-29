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
import apiUrl from "../../globals/config";
import axios from "axios";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { phoneNo: "", message: "", isOtp: false, otp: "" };
  }
  onSubmit = () => {
    if (this.state.phoneNo == "") {
      this.setState({ message: "Phone number is required." });
    } else {
      const data = {
        phoneNo: this.state.phoneNo,
      };
      axios
        .post(apiUrl + "user/findNo", data)
        .then((response) => {
          var data = response.data;
          if (data.success) {
            this.setState({ isOtp: !this.state.isOtp });
          } else {
            this.setState({ message: data.message });
          }
        })
        .catch(function (error) {
          console.log(error);
          // this.setState({ message: "Phone number does not exist." });
        });
    }
  };
  onVerify = () => {
    if (this.state.phoneNo == "") {
      this.setState({ message: "Phone number is required." });
    } else {
      const params = {
        phoneNo: this.state.phoneNo,
        otp: this.state.otp,
      };
      axios
        .post(apiUrl + "user/verifyNo", params)
        .then((response) => {
          var data = response.data;
          if (data.success) {
            this.props.history.push({
              pathname: "/UpdateLead",
              data: params,
            });
          } else {
            this.setState({ message: data.message });
            // this.setState({ message: "Phone number does not exist." });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  mobilevalidate(e) {
    var filter =
      /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    if (filter.test(e.target.value)) {
      this.setState({ message: "", phoneNo: e.target.value });
    } else {
      this.setState({
        message: "Phone number is invalid.",
        phoneNo: e.target.value,
      });
    }
  }
  restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };
  render() {
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
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s{" "}
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
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s{" "}
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
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s{" "}
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
                              maxLength="10"
                              onKeyPress={(e) => this.restrictAlpha(e)}
                              onChange={(text) => this.mobilevalidate(text)}
                            />
                            <p className="error">{this.state.message}</p>
                          </div>
                          {this.state.isOtp && (
                            <div class="form-group col-md-6">
                              <label>Otp</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Enter otp"
                                maxLength="4"
                                onKeyPress={(e) => this.restrictAlpha(e)}
                                onChange={(text) =>
                                  this.setState({ otp: text.target.value })
                                }
                              />
                            </div>
                          )}
                        </div>
                        {!this.state.isOtp ? (
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={(e) => {
                              this.onSubmit(e);
                            }}
                          >
                            Submit
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={(e) => {
                              this.onVerify(e);
                            }}
                          >
                            Verify Otp
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            {/* <Row>
              <Col lg={12}>
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">Upload Document</h4>
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
                              maxLength="10"
                              onKeyPress={(e) => this.restrictAlpha(e)}
                              onChange={(text) => this.mobilevalidate(text)}
                            />
                            <p className="error">{this.state.message}</p>
                          </div>
                          {this.state.isOtp && (
                            <div class="form-group col-md-6">
                              <label>Otp</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Enter otp"
                                maxLength="4"
                                onKeyPress={(e) => this.restrictAlpha(e)}
                                onChange={(text) =>
                                  this.setState({ otp: text.target.value })
                                }
                              />
                            </div>
                          )}
                        </div>
                        {!this.state.isOtp ? (
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={(e) => {
                              this.onSubmit(e);
                            }}
                          >
                            Submit
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={(e) => {
                              this.onVerify(e);
                            }}
                          >
                            Verify Otp
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          */}
          </div>
        </div>
        {/* <Footer /> */}
      </>
    );
  }
}
