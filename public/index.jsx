
import React from "react";
import { Link } from "react-router-dom";
import Navbarmain from "../navbar";
import TopBar from "../topbar";
import CenterBar from "../centerBar";
import RightBar from "../rightBar";
import Footer from "../footer";
import {
  div,
  Row,
  Col,
  Image,
  Card,
  Button,
  ListGroup,
  Dropdown,
} from "react-bootstrap";



function Index() {
  return (
    <div className="top_tracks">
      <Navbarmain />
      <div className="header-joint upload-hd-image new-bar">
        <div
          className=" w-100 banner-upload banner_loved_track"
          style={{
            backgroundImage: " url(" + "assets/images/312440343836414.png)",
          }}
        >
          <div className="row">
            <div className="col-sm-6 offset-sm-3">
              <div className="profile-text">
                <div className="p--pics">
                  <div className=" field-choose-file">
                    <input name="User[profile_file]" value="" type="hidden" />
                    <input
                      id="choose-file"
                      className="choose-file"
                      name="User[profile_file]"
                      type="file"
                    />
                    <label htmlFor="choose-file" className="upload-file">
                      <Image
                        className="file-icons w-50"
                        src="/sacral-track/assets/images/new_photo_img.png"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white py-1 bottom-play-bar visible">
          <div className="row">
            <div className="offset-xl-3 col-xl-6 p-md-0">
              <ul className="range-slider-bg range-menus mb-0 px-3">
                <li className="cutom-menu-box mr-2">
                  <a href="#0">
                    <Image
                      className="w-20px"
                      src="/sacral-track/assets/images/view_100_top.png"
                    />
                  </a>
                </li>
                <li className=" mr-4">My</li>
                <li className="mr-4 active">
                  <a href="#">
                    {" "}
                    <Button variant="light"> Bought</Button>
                  </a>
                </li>
                <li className="sort-drop ml-auto">
                  <Dropdown className="dd-box">
                    <Dropdown.Toggle
                      className="drop-down__button"
                      variant=""
                      id="dropDown"
                    >
                      Approved{" "}
                      <span className="ml-md-2 listen-drop">
                        {" "}
                        <Image
                          className="w-14"
                          src="/sacral-track/assets/images/Vector_40_green.png"
                        />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="active">
                        Waiting approval
                      </Dropdown.Item>
                      <Dropdown.Item>Rejected</Dropdown.Item>
                      <Dropdown.Item>View all</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="allbody-main">
        <div className="second-section">
          <div className="container-fluid">
            <Row>
              <Col xl={3} className="set-width">
                <div className="bg-white left-outer  lv_left_box   upload-hd-top new-bar pt-3">
                  <Card.Body>
                    <Row className="py-3">
                      <Col sm={12}>
                        <div className="profile-text">
                          <div className="p--pic">
                            <div className=" field-choose-file">
                              <input
                                name="User[profile_file]"
                                value=""
                                type="hidden"
                              />
                              <input
                                id="choose-file"
                                className="choose-file"
                                name="User[profile_file]"
                                type="file"
                              />
                              <label className="upload-file">
                                <Image
                                  className="file-icons"
                                  src="/sacral-track/assets/images/Ava_f.png"
                                />
                              </label>
                            </div>
                          </div>
                          <h5 className="mb-0">Artist name</h5>
                        </div>
                      </Col>
                    </Row>
                    <Row className="py-3">
                      <Col sm={12}>
                        <div className="artist-section">
                          <ul className="mb-0">
                            <li>
                              <Image src="/sacral-track/assets/images/Friends_b.png" />
                              <span className="ml-3">
                                <a href="#0">Friends</a>
                              </span>
                            </li>
                            <li>
                              <Image src="/sacral-track/assets/images/Mail_f.png" />
                              <span className="ml-3">
                                <a href="#0">Message</a>
                              </span>
                            </li>
                            <li>
                              <Image src="/sacral-track/assets/images/Frame_f.png" />
                              <span className="ml-3">
                                <a href="#0">Tracks</a>
                              </span>
                            </li>
                            <li>
                              <Image src="/sacral-track/assets/images/Photo_f.png" />
                              <span className="ml-3">
                                <a href="#0">Photo</a>
                              </span>
                            </li>
                            <li className="active">
                              <Image src="/sacral-track/assets/images/Card_f.png" />
                              <span className="ml-3">
                                <a href="#0">Money</a>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                    <div className="py-2">
                      <div className="lgrg-btns">
                        <Link
                          className="btn btn-light f-med btn-block br-50"
                          to="/lovedtrackAllactive"
                        >
                          Upload track to store
                        </Link>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="card-footer-new text-center">
                    <h5>
                      <a className="text-white" href="#0">
                        <i
                          class="fa fa-ellipsis-h text-white"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </h5>
                  </Card.Footer>
                </div>
              </Col>
              <Col xl={6} className="main_cards_content_box">
                <div className="track-list-inner pt-3 store_view_page">
                  <Row>
                    <Col sm={6} className="">
                      <div className="artist-track mb-3">
                        <Row>
                          <Col sm={12}>
                            <div className="sound-track">
                              <div className="d-flex w-100">
                                <div className="w-14">
                                  <div className="more-dropdown left-more bg-dark"></div>

                                  <div className="track-cart-icon  right-center text-center">
                                    <a href="#0">
                                      <img src="/sacral-track/assets/images/Wave_f.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart left-more-bottom bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-12"
                                        src="/sacral-track/assets/images/Message_chat.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="w-95">
                                  <div className="track-top position-relative bg-dark px-2 py-1">
                                    <div className="bg-dark artist-name w-100">
                                      <p className="m-0">
                                        <a href="#0">Artist</a>
                                      </p>
                                      <p className="m-0">
                                        <a href="#0" className="mr-1">
                                          Name of track{" "}
                                        </a>{" "}
                                        <a href="#" className="color-yellow">
                                          | Remix by Artist
                                        </a>{" "}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="tacking-waves position-relative d-flex">
                                    <div className="track-wave tw-center-img w-100 bg-dark-cus">
                                      <img
                                        src="/sacral-track/assets/images/genres-icon.png"
                                        class="w-30"
                                      />
                                      <div class="overlay-new">
                                        <span class="icon">
                                          <img
                                            src="/sacral-track/assets/images/Vector-new.png"
                                            class=""
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="track-bottom d-flex position-absolute">
                                      <div className="bg-dark-1 artist-name-sm w-100 pl-5">
                                        <p className="ml-2 m-0">
                                          <a className="text-white" href="#0">
                                            Amaizing track, my frie..
                                          </a>{" "}
                                          <a
                                            href="#"
                                            className="pl-1 text-green"
                                          >
                                            | by Great artist
                                          </a>{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-8">
                                  <div className="more-dropdown bg-dark">
                                    <a href="#0">
                                      <Image src="/sacral-track/assets/images/Loved_bw.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-dark text-center">
                                    <a href="#0">
                                      <p className="text-light font-size-11">
                                        $ 5.16
                                      </p>
                                    </a>
                                  </div>
                                  <div className="track-cart-icon  text-center bg-cc-626">
                                    <a href="#0">
                                      <img
                                        src="/sacral-track/assets/images/track-images/cart.png"
                                        class="w-20"
                                      />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-20"
                                        src="/sacral-track/assets/images/3.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col sm={6} className="">
                      <div className="artist-track mb-3">
                        <Row>
                          <Col sm={12}>
                            <div className="sound-track">
                              <div className="d-flex w-100">
                                <div className="w-14">
                                  <div className="more-dropdown left-more bg-dark"></div>

                                  <div className="track-cart-icon  right-center text-center">
                                    <a href="#0">
                                      <img src="/sacral-track/assets/images/Wave_f.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart left-more-bottom bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-12"
                                        src="/sacral-track/assets/images/Message_chat.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="w-95">
                                  <div className="track-top position-relative bg-dark px-2 py-1">
                                    <div className="bg-dark artist-name w-100">
                                      <p className="m-0">
                                        <a href="#0">Artist</a>
                                      </p>
                                      <p className="m-0">
                                        <a href="#0" className="mr-1">
                                          Name of track{" "}
                                        </a>{" "}
                                        <a href="#" className="color-yellow">
                                          | Remix by Artist
                                        </a>{" "}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="tacking-waves position-relative d-flex">
                                    <div className="track-wave tw-center-img w-100 bg-dark-cus">
                                      <img
                                        src="/sacral-track/assets/images/genres-icon.png"
                                        class="w-30"
                                      />
                                      <div class="overlay-new">
                                        <span class="icon">
                                          <img
                                            src="/sacral-track/assets/images/Vector-new.png"
                                            class=""
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="track-bottom d-flex position-absolute">
                                      <div className="bg-dark-1 artist-name-sm w-100 pl-5">
                                        <p className="ml-2 m-0">
                                          <a className="text-white" href="#0">
                                            Amaizing track, my frie..
                                          </a>{" "}
                                          <a
                                            href="#"
                                            className="pl-1 text-green"
                                          >
                                            | by Great artist
                                          </a>{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-8">
                                  <div className="more-dropdown bg-dark">
                                    <a href="#0">
                                      <Image src="/sacral-track/assets/images/Loved_bw.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-dark text-center">
                                    <a href="#0">
                                      <p className="text-light font-size-11">
                                        $ 5.16
                                      </p>
                                    </a>
                                  </div>
                                  <div className="track-cart-icon  text-center bg-cc-626">
                                    <a href="#0">
                                      <img
                                        src="/sacral-track/assets/images/track-images/cart.png"
                                        class="w-20"
                                      />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-20"
                                        src="/sacral-track/assets/images/3.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6} className="">
                      <div className="artist-track mb-3">
                        <Row>
                          <Col sm={12}>
                            <div className="sound-track">
                              <div className="d-flex w-100">
                                <div className="w-14">
                                  <div className="more-dropdown left-more bg-dark"></div>

                                  <div className="track-cart-icon  right-center text-center">
                                    <a href="#0">
                                      <img src="/sacral-track/assets/images/Wave_f.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart left-more-bottom bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-12"
                                        src="/sacral-track/assets/images/Message_chat.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="w-95">
                                  <div className="track-top position-relative bg-dark px-2 py-1">
                                    <div className="bg-dark artist-name w-100">
                                      <p className="m-0">
                                        <a href="#0">Artist</a>
                                      </p>
                                      <p className="m-0">
                                        <a href="#0" className="mr-1">
                                          Name of track{" "}
                                        </a>{" "}
                                        <a href="#" className="color-yellow">
                                          | Remix by Artist
                                        </a>{" "}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="tacking-waves position-relative d-flex">
                                    <div className="track-wave tw-center-img w-100 bg-dark-cus">
                                      <img
                                        src="/sacral-track/assets/images/genres-icon.png"
                                        class="w-30"
                                      />
                                      <div class="overlay-new">
                                        <span class="icon">
                                          <img
                                            src="/sacral-track/assets/images/Vector-new.png"
                                            class=""
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="track-bottom d-flex position-absolute">
                                      <div className="bg-dark-1 artist-name-sm w-100 pl-5">
                                        <p className="ml-2 m-0">
                                          <a className="text-white" href="#0">
                                            Amaizing track, my frie..
                                          </a>{" "}
                                          <a
                                            href="#"
                                            className="pl-1 text-green"
                                          >
                                            | by Great artist
                                          </a>{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-8">
                                  <div className="more-dropdown bg-dark">
                                    <a href="#0">
                                      <Image src="/sacral-track/assets/images/Loved_bw.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-dark text-center">
                                    <a href="#0">
                                      <p className="text-light font-size-11">
                                        $ 5.16
                                      </p>
                                    </a>
                                  </div>
                                  <div className="track-cart-icon  text-center bg-cc-626">
                                    <a href="#0">
                                      <img
                                        src="/sacral-track/assets/images/track-images/cart.png"
                                        class="w-20"
                                      />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-20"
                                        src="/sacral-track/assets/images/3.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col sm={6} className="">
                      <div className="artist-track mb-3">
                        <Row>
                          <Col sm={12}>
                            <div className="sound-track">
                              <div className="d-flex w-100">
                                <div className="w-14">
                                  <div className="more-dropdown left-more bg-dark"></div>

                                  <div className="track-cart-icon  right-center text-center">
                                    <a href="#0">
                                      <img src="/sacral-track/assets/images/Wave_f.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart left-more-bottom bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-12"
                                        src="/sacral-track/assets/images/Message_chat.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="w-95">
                                  <div className="track-top position-relative bg-dark px-2 py-1">
                                    <div className="bg-dark artist-name w-100">
                                      <p className="m-0">
                                        <a href="#0">Artist</a>
                                      </p>
                                      <p className="m-0">
                                        <a href="#0" className="mr-1">
                                          Name of track{" "}
                                        </a>{" "}
                                        <a href="#" className="color-yellow">
                                          | Remix by Artist
                                        </a>{" "}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="tacking-waves position-relative d-flex">
                                    <div className="track-wave tw-center-img w-100 bg-dark-cus">
                                      <img
                                        src="/sacral-track/assets/images/genres-icon.png"
                                        class="w-30"
                                      />
                                      <div class="overlay-new">
                                        <span class="icon">
                                          <img
                                            src="/sacral-track/assets/images/Vector-new.png"
                                            class=""
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="track-bottom d-flex position-absolute">
                                      <div className="bg-dark-1 artist-name-sm w-100 pl-5">
                                        <p className="ml-2 m-0">
                                          <a className="text-white" href="#0">
                                            Amaizing track, my frie..
                                          </a>{" "}
                                          <a
                                            href="#"
                                            className="pl-1 text-green"
                                          >
                                            | by Great artist
                                          </a>{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-8">
                                  <div className="more-dropdown bg-dark">
                                    <a href="#0">
                                      <Image src="/sacral-track/assets/images/Loved_bw.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-dark text-center">
                                    <a href="#0">
                                      <p className="text-light font-size-11">
                                        $ 5.16
                                      </p>
                                    </a>
                                  </div>
                                  <div className="track-cart-icon  text-center bg-cc-626">
                                    <a href="#0">
                                      <img
                                        src="/sacral-track/assets/images/track-images/cart.png"
                                        class="w-20"
                                      />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-20"
                                        src="/sacral-track/assets/images/3.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6} className="">
                      <div className="artist-track mb-3">
                        <Row>
                          <Col sm={12}>
                            <div className="sound-track">
                              <div className="d-flex w-100">
                                <div className="w-14">
                                  <div className="more-dropdown left-more bg-dark"></div>

                                  <div className="track-cart-icon  right-center text-center">
                                    <a href="#0">
                                      <img src="/sacral-track/assets/images/Wave_f.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart left-more-bottom bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-12"
                                        src="/sacral-track/assets/images/Message_chat.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="w-95">
                                  <div className="track-top position-relative bg-dark px-2 py-1">
                                    <div className="bg-dark artist-name w-100">
                                      <p className="m-0">
                                        <a href="#0">Artist</a>
                                      </p>
                                      <p className="m-0">
                                        <a href="#0" className="mr-1">
                                          Name of track{" "}
                                        </a>{" "}
                                        <a href="#" className="color-yellow">
                                          | Remix by Artist
                                        </a>{" "}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="tacking-waves position-relative d-flex">
                                    <div className="track-wave tw-center-img w-100 bg-dark-cus">
                                      <img
                                        src="/sacral-track/assets/images/genres-icon.png"
                                        class="w-30"
                                      />
                                      <div class="overlay-new">
                                        <span class="icon">
                                          <img
                                            src="/sacral-track/assets/images/Vector-new.png"
                                            class=""
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="track-bottom d-flex position-absolute">
                                      <div className="bg-dark-1 artist-name-sm w-100 pl-5">
                                        <p className="ml-2 m-0">
                                          <a className="text-white" href="#0">
                                            Amaizing track, my frie..
                                          </a>{" "}
                                          <a
                                            href="#"
                                            className="pl-1 text-green"
                                          >
                                            | by Great artist
                                          </a>{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-8">
                                  <div className="more-dropdown bg-dark">
                                    <a href="#0">
                                      <Image src="/sacral-track/assets/images/Loved_bw.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-dark text-center">
                                    <a href="#0">
                                      <p className="text-light font-size-11">
                                        $ 5.16
                                      </p>
                                    </a>
                                  </div>
                                  <div className="track-cart-icon  text-center bg-cc-626">
                                    <a href="#0">
                                      <img
                                        src="/sacral-track/assets/images/track-images/cart.png"
                                        class="w-20"
                                      />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-20"
                                        src="/sacral-track/assets/images/3.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col sm={6} className="">
                      <div className="artist-track mb-3">
                        <Row>
                          <Col sm={12}>
                            <div className="sound-track">
                              <div className="d-flex w-100">
                                <div className="w-14">
                                  <div className="more-dropdown left-more bg-dark"></div>

                                  <div className="track-cart-icon  right-center text-center">
                                    <a href="#0">
                                      <img src="/sacral-track/assets/images/Wave_f.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart left-more-bottom bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-12"
                                        src="/sacral-track/assets/images/Message_chat.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="w-95">
                                  <div className="track-top position-relative bg-dark px-2 py-1">
                                    <div className="bg-dark artist-name w-100">
                                      <p className="m-0">
                                        <a href="#0">Artist</a>
                                      </p>
                                      <p className="m-0">
                                        <a href="#0" className="mr-1">
                                          Name of track{" "}
                                        </a>{" "}
                                        <a href="#" className="color-yellow">
                                          | Remix by Artist
                                        </a>{" "}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="tacking-waves position-relative d-flex">
                                    <div className="track-wave tw-center-img w-100 bg-dark-cus">
                                      <img
                                        src="/sacral-track/assets/images/genres-icon.png"
                                        class="w-30"
                                      />
                                      <div class="overlay-new">
                                        <span class="icon">
                                          <img
                                            src="/sacral-track/assets/images/Vector-new.png"
                                            class=""
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="track-bottom d-flex position-absolute">
                                      <div className="bg-dark-1 artist-name-sm w-100 pl-5">
                                        <p className="ml-2 m-0">
                                          <a className="text-white" href="#0">
                                            Amaizing track, my frie..
                                          </a>{" "}
                                          <a
                                            href="#"
                                            className="pl-1 text-green"
                                          >
                                            | by Great artist
                                          </a>{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-8">
                                  <div className="more-dropdown bg-dark">
                                    <a href="#0">
                                      <Image src="/sacral-track/assets/images/Loved_bw.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-dark text-center">
                                    <a href="#0">
                                      <p className="text-light font-size-11">
                                        $ 5.16
                                      </p>
                                    </a>
                                  </div>
                                  <div className="track-cart-icon  text-center bg-cc-626">
                                    <a href="#0">
                                      <img
                                        src="/sacral-track/assets/images/track-images/cart.png"
                                        class="w-20"
                                      />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-20"
                                        src="/sacral-track/assets/images/3.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6} className="">
                      <div className="artist-track mb-3">
                        <Row>
                          <Col sm={12}>
                            <div className="sound-track">
                              <div className="d-flex w-100">
                                <div className="w-14">
                                  <div className="more-dropdown left-more bg-dark"></div>

                                  <div className="track-cart-icon  right-center text-center">
                                    <a href="#0">
                                      <img src="/sacral-track/assets/images/Wave_f.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart left-more-bottom bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-12"
                                        src="/sacral-track/assets/images/Message_chat.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="w-95">
                                  <div className="track-top position-relative bg-dark px-2 py-1">
                                    <div className="bg-dark artist-name w-100">
                                      <p className="m-0">
                                        <a href="#0">Artist</a>
                                      </p>
                                      <p className="m-0">
                                        <a href="#0" className="mr-1">
                                          Name of track{" "}
                                        </a>{" "}
                                        <a href="#" className="color-yellow">
                                          | Remix by Artist
                                        </a>{" "}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="tacking-waves position-relative d-flex">
                                    <div className="track-wave tw-center-img w-100 bg-dark-cus">
                                      <img
                                        src="/sacral-track/assets/images/genres-icon.png"
                                        class="w-30"
                                      />
                                      <div class="overlay-new">
                                        <span class="icon">
                                          <img
                                            src="/sacral-track/assets/images/Vector-new.png"
                                            class=""
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="track-bottom d-flex position-absolute">
                                      <div className="bg-dark-1 artist-name-sm w-100 pl-5">
                                        <p className="ml-2 m-0">
                                          <a className="text-white" href="#0">
                                            Amaizing track, my frie..
                                          </a>{" "}
                                          <a
                                            href="#"
                                            className="pl-1 text-green"
                                          >
                                            | by Great artist
                                          </a>{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-8">
                                  <div className="more-dropdown bg-dark">
                                    <a href="#0">
                                      <Image src="/sacral-track/assets/images/Loved_bw.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-dark text-center">
                                    <a href="#0">
                                      <p className="text-light font-size-11">
                                        $ 5.16
                                      </p>
                                    </a>
                                  </div>
                                  <div className="track-cart-icon  text-center bg-cc-626">
                                    <a href="#0">
                                      <img
                                        src="/sacral-track/assets/images/track-images/cart.png"
                                        class="w-20"
                                      />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-20"
                                        src="/sacral-track/assets/images/3.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col sm={6} className="">
                      <div className="artist-track mb-3">
                        <Row>
                          <Col sm={12}>
                            <div className="sound-track">
                              <div className="d-flex w-100">
                                <div className="w-14">
                                  <div className="more-dropdown left-more bg-dark"></div>

                                  <div className="track-cart-icon  right-center text-center">
                                    <a href="#0">
                                      <img src="/sacral-track/assets/images/Wave_f.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart left-more-bottom bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-12"
                                        src="/sacral-track/assets/images/Message_chat.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="w-95">
                                  <div className="track-top position-relative bg-dark px-2 py-1">
                                    <div className="bg-dark artist-name w-100">
                                      <p className="m-0">
                                        <a href="#0">Artist</a>
                                      </p>
                                      <p className="m-0">
                                        <a href="#0" className="mr-1">
                                          Name of track{" "}
                                        </a>{" "}
                                        <a href="#" className="color-yellow">
                                          | Remix by Artist
                                        </a>{" "}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="tacking-waves position-relative d-flex">
                                    <div className="track-wave tw-center-img w-100 bg-dark-cus">
                                      <img
                                        src="/sacral-track/assets/images/genres-icon.png"
                                        class="w-30"
                                      />
                                      <div class="overlay-new">
                                        <span class="icon">
                                          <img
                                            src="/sacral-track/assets/images/Vector-new.png"
                                            class=""
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="track-bottom d-flex position-absolute">
                                      <div className="bg-dark-1 artist-name-sm w-100 pl-5">
                                        <p className="ml-2 m-0">
                                          <a className="text-white" href="#0">
                                            Amaizing track, my frie..
                                          </a>{" "}
                                          <a
                                            href="#"
                                            className="pl-1 text-green"
                                          >
                                            | by Great artist
                                          </a>{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-8">
                                  <div className="more-dropdown bg-dark">
                                    <a href="#0">
                                      <Image src="/sacral-track/assets/images/Loved_bw.png" />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-dark text-center">
                                    <a href="#0">
                                      <p className="text-light font-size-11">
                                        $ 5.16
                                      </p>
                                    </a>
                                  </div>
                                  <div className="track-cart-icon  text-center bg-cc-626">
                                    <a href="#0">
                                      <img
                                        src="/sacral-track/assets/images/track-images/cart.png"
                                        class="w-20"
                                      />
                                    </a>
                                  </div>
                                  <div className="track-cart bg-primary">
                                    <a href="#0">
                                      <Image
                                        className="w-20"
                                        src="/sacral-track/assets/images/3.png"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col xl={3} className="set-width">
                <div className="top-tracks right-outer   upload-hd-top new-bar pt-3">
                  <Card.Header className="card-header-new text-center">
                    <h5>Loved tracks</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="top-tracks-list mb-3 px-3">
                      <Row className="align-items-center flex-nowrap">
                        <Col xl={2} md={3} className="p-0">
                          <div className="count-inner">
                            <a className="position-relative" href="#0">
                              <Image src="/sacral-track/assets/images/Playr3.png" />
                              <div className="position-absolute count-num">
                                <h6>1</h6>
                              </div>
                              <div className="overlay-new">
                                <span className="icon">
                                  <Image src="/sacral-track/assets/images/Vector-new.png" />
                                </span>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col xl={8} md={6}>
                          <div className="artist-new">
                            <h4>
                              <a href="#0">Artist</a>
                            </h4>
                            <p class="text-left font-12">Thank You</p>
                            <p class="text-right font-12 font-weight-bold">
                              $5.18
                            </p>
                            <p class="text-left text-secondary">
                              <Image src="/sacral-track/assets/images/Vector1395.png" />{" "}
                              <span>1001101</span>{" "}
                            </p>
                          </div>
                        </Col>
                        <Col xl={2} md={3} className="p-0">
                          <div class="cart_box_new">
                            <div className="track-cart-1 bg-lgt-blue text-center">
                              <div className="table_center">
                                <div className="drop-down-new">
                                  <div
                                    id="dropDown-new"
                                    className="drop-down-new__button"
                                  >
                                    <i
                                      className="fa fa-ellipsis-h text-white"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div className="drop-down-new__menu-box">
                                    <ul className="drop-down-new__menu">
                                      <li className="drop-down-new__item active">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Cart-new.png"
                                          />
                                          Add to cart
                                        </a>{" "}
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Show-same-tracks.png"
                                          />
                                          Same tracks
                                        </a>
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/To-playlist.png"
                                          />
                                          Add to playlist
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="track-cart-1 bg-green text-center">
                              <a href="#0">
                                <Image
                                  className="w-20"
                                  src="/sacral-track/assets/images/track-images/cart.png"
                                />
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="top-tracks-list mb-3 px-3">
                      <Row className="align-items-center flex-nowrap">
                        <Col xl={2} md={3} className="p-0">
                          <div className="count-inner">
                            <a className="position-relative" href="#0">
                              <Image src="/sacral-track/assets/images/Playr3.png" />
                              <div className="position-absolute count-num">
                                <h6>2</h6>
                              </div>
                              <div className="overlay-new">
                                <span className="icon">
                                  <Image src="/sacral-track/assets/images/Vector-new.png" />
                                </span>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col xl={8} md={6}>
                          <div className="artist-new">
                            <h4>
                              <a href="#0">Artist</a>
                            </h4>
                            <p class="text-left font-12">Thank You</p>
                            <p class="text-right font-12 font-weight-bold">
                              $5.8
                            </p>
                            <p class="text-left text-secondary">
                              <Image src="/sacral-track/assets/images/Vector1395.png" />{" "}
                              <span>1001101</span>{" "}
                            </p>
                          </div>
                        </Col>
                        <Col xl={2} md={3} className="p-0">
                          <div class="cart_box_new">
                            <div className="track-cart-1 bg-lgt-blue text-center">
                              <div className="table_center">
                                <div className="drop-down-new">
                                  <div
                                    id="dropDown-new"
                                    className="drop-down-new__button"
                                  >
                                    <i
                                      className="fa fa-ellipsis-h text-white"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div className="drop-down-new__menu-box">
                                    <ul className="drop-down-new__menu">
                                      <li className="drop-down-new__item active">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Cart-new.png"
                                          />
                                          Add to cart
                                        </a>{" "}
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Show-same-tracks.png"
                                          />
                                          Same tracks
                                        </a>
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/To-playlist.png"
                                          />
                                          Add to playlist
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="track-cart-1 bg-green text-center">
                              <a href="#0">
                                <Image
                                  className="w-20"
                                  src="/sacral-track/assets/images/track-images/cart.png"
                                />
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="top-tracks-list mb-3 px-3">
                      <Row className="align-items-center flex-nowrap">
                        <Col xl={2} md={3} className="p-0">
                          <div className="count-inner">
                            <a className="position-relative" href="#0">
                              <Image src="/sacral-track/assets/images/Playr3.png" />
                              <div className="position-absolute count-num">
                                <h6>3</h6>
                              </div>
                              <div className="overlay-new">
                                <span className="icon">
                                  <Image src="/sacral-track/assets/images/Vector-new.png" />
                                </span>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col xl={8} md={6}>
                          <div className="artist-new">
                            <h4>
                              <a href="#0">Artist</a>
                            </h4>
                            <p class="text-left font-12">Thank You</p>
                            <p class="text-right font-12 font-weight-bold">
                              $5.8
                            </p>
                            <p class="text-left text-secondary">
                              <Image src="/sacral-track/assets/images/Vector1395.png" />{" "}
                              <span>1001101</span>{" "}
                            </p>
                          </div>
                        </Col>
                        <Col xl={2} md={3} className="p-0">
                          <div class="cart_box_new">
                            <div className="track-cart-1 bg-lgt-blue text-center">
                              <div className="table_center">
                                <div className="drop-down-new">
                                  <div
                                    id="dropDown-new"
                                    className="drop-down-new__button"
                                  >
                                    <i
                                      className="fa fa-ellipsis-h text-white"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div className="drop-down-new__menu-box">
                                    <ul className="drop-down-new__menu">
                                      <li className="drop-down-new__item active">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Cart-new.png"
                                          />
                                          Add to cart
                                        </a>{" "}
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Show-same-tracks.png"
                                          />
                                          Same tracks
                                        </a>
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/To-playlist.png"
                                          />
                                          Add to playlist
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="track-cart-1 bg-yellow text-center">
                              <a href="#0">
                                <Image
                                  className="w-20"
                                  src="/sacral-track/assets/images/track-images/cart.png"
                                />
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="top-tracks-list mb-3 px-3">
                      <Row className="align-items-center flex-nowrap">
                        <Col xl={2} md={3} className="p-0">
                          <div className="count-inner">
                            <a className="position-relative" href="#0">
                              <Image src="/sacral-track/assets/images/Playr3.png" />
                              <div className="position-absolute count-num">
                                <h6>4</h6>
                              </div>
                              <div className="overlay-new">
                                <span className="icon">
                                  <Image src="/sacral-track/assets/images/Vector-new.png" />
                                </span>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col xl={8} md={6}>
                          <div className="artist-new">
                            <h4>
                              <a href="#0">Artist</a>
                            </h4>
                            <p class="text-left font-12">Thank You</p>
                            <p class="text-right font-12 font-weight-bold">
                              $5.8
                            </p>
                            <p class="text-left text-secondary">
                              <Image src="/sacral-track/assets/images/Vector1395.png" />{" "}
                              <span>1001101</span>{" "}
                            </p>
                          </div>
                        </Col>
                        <Col xl={2} md={3} className="p-0">
                          <div class="cart_box_new">
                            <div className="track-cart-1 bg-lgt-blue text-center">
                              <div className="table_center">
                                <div className="drop-down-new">
                                  <div
                                    id="dropDown-new"
                                    className="drop-down-new__button"
                                  >
                                    <i
                                      className="fa fa-ellipsis-h text-white"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div className="drop-down-new__menu-box">
                                    <ul className="drop-down-new__menu">
                                      <li className="drop-down-new__item active">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Cart-new.png"
                                          />
                                          Add to cart
                                        </a>{" "}
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Show-same-tracks.png"
                                          />
                                          Same tracks
                                        </a>
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/To-playlist.png"
                                          />
                                          Add to playlist
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="track-cart-1 bg-626 text-center">
                              <a href="#0">
                                <Image
                                  className="w-20"
                                  src="/sacral-track/assets/images/Downloading.png"
                                />
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="top-tracks-list mb-3 px-3">
                      <Row className="align-items-center flex-nowrap">
                        <Col xl={2} md={3} className="p-0">
                          <div className="count-inner">
                            <a className="position-relative" href="#0">
                              <Image src="/sacral-track/assets/images/Playr3.png" />
                              <div className="position-absolute count-num">
                                <h6>5</h6>
                              </div>
                              <div className="overlay-new">
                                <span className="icon">
                                  <Image src="/sacral-track/assets/images/Vector-new.png" />
                                </span>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col xl={8} md={6}>
                          <div className="artist-new">
                            <h4>
                              <a href="#0">Artist</a>
                            </h4>
                            <p class="text-left font-12">Thank You</p>
                            <p class="text-right font-12 font-weight-bold">
                              $5.8
                            </p>
                            <p class="text-left text-secondary">
                              <Image src="/sacral-track/assets/images/Vector1395.png" />{" "}
                              <span>1001101</span>{" "}
                            </p>
                          </div>
                        </Col>
                        <Col xl={2} md={3} className="p-0">
                          <div class="cart_box_new">
                            <div className="track-cart-1 bg-lgt-blue text-center">
                              <div className="table_center">
                                <div className="drop-down-new">
                                  <div
                                    id="dropDown-new"
                                    className="drop-down-new__button"
                                  >
                                    <i
                                      className="fa fa-ellipsis-h text-white"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div className="drop-down-new__menu-box">
                                    <ul className="drop-down-new__menu">
                                      <li className="drop-down-new__item active">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Cart-new.png"
                                          />
                                          Add to cart
                                        </a>{" "}
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Show-same-tracks.png"
                                          />
                                          Same tracks
                                        </a>
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/To-playlist.png"
                                          />
                                          Add to playlist
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="track-cart-1 bg-626 text-center">
                              <a href="#0">
                                <Image src="/sacral-track/assets/images/Vector 3.1.png" />
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="top-tracks-list mb-3 px-3">
                      <Row className="align-items-center flex-nowrap">
                        <Col xl={2} md={3} className="p-0">
                          <div className="count-inner">
                            <a className="position-relative" href="#0">
                              <Image src="/sacral-track/assets/images/Playr3.png" />
                              <div className="position-absolute count-num">
                                <h6>6</h6>
                              </div>
                              <div className="overlay-new">
                                <span className="icon">
                                  <Image src="/sacral-track/assets/images/Vector-new.png" />
                                </span>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col xl={8} md={6}>
                          <div className="artist-new">
                            <h4>
                              <a href="#0">Artist</a>
                            </h4>
                            <p class="text-left font-12">Thank You</p>
                            <p class="text-right font-12 font-weight-bold">
                              $5.8
                            </p>
                            <p class="text-left text-secondary">
                              <Image src="/sacral-track/assets/images/Vector1395.png" />{" "}
                              <span>1001101</span>{" "}
                            </p>
                          </div>
                        </Col>
                        <Col xl={2} md={3} className="p-0">
                          <div class="cart_box_new">
                            <div className="track-cart-1 bg-lgt-blue text-center">
                              <div className="table_center">
                                <div className="drop-down-new">
                                  <div
                                    id="dropDown-new"
                                    className="drop-down-new__button"
                                  >
                                    <i
                                      className="fa fa-ellipsis-h text-white"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div className="drop-down-new__menu-box">
                                    <ul className="drop-down-new__menu">
                                      <li className="drop-down-new__item active">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Cart-new.png"
                                          />
                                          Add to cart
                                        </a>{" "}
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Show-same-tracks.png"
                                          />
                                          Same tracks
                                        </a>
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/To-playlist.png"
                                          />
                                          Add to playlist
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="track-cart-1 bg-626 text-center">
                              <a href="#0">
                                <Image src="/sacral-track/assets/images/Vector 3.1.png" />
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="top-tracks-list mb-3 px-3">
                      <Row className="align-items-center flex-nowrap">
                        <Col xl={2} md={3} className="p-0">
                          <div className="count-inner">
                            <a className="position-relative" href="#0">
                              <Image src="/sacral-track/assets/images/Playr3.png" />
                              <div className="position-absolute count-num">
                                <h6>7</h6>
                              </div>
                              <div className="overlay-new">
                                <span className="icon">
                                  <Image src="/sacral-track/assets/images/Vector-new.png" />
                                </span>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col xl={8} md={6}>
                          <div className="artist-new">
                            <h4>
                              <a href="#0">Artist</a>
                            </h4>
                            <p class="text-left font-12">Thank You</p>
                            <p class="text-right font-12 font-weight-bold">
                              $5.8
                            </p>
                            <p class="text-left text-secondary">
                              <Image src="/sacral-track/assets/images/Vector1395.png" />{" "}
                              <span>1001101</span>{" "}
                            </p>
                          </div>
                        </Col>
                        <Col xl={2} md={3} className="p-0">
                          <div class="cart_box_new">
                            <div className="track-cart-1 bg-lgt-blue text-center">
                              <div className="table_center">
                                <div className="drop-down-new">
                                  <div
                                    id="dropDown-new"
                                    className="drop-down-new__button"
                                  >
                                    <i
                                      className="fa fa-ellipsis-h text-white"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div className="drop-down-new__menu-box">
                                    <ul className="drop-down-new__menu">
                                      <li className="drop-down-new__item active">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Cart-new.png"
                                          />
                                          Add to cart
                                        </a>{" "}
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Show-same-tracks.png"
                                          />
                                          Same tracks
                                        </a>
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/To-playlist.png"
                                          />
                                          Add to playlist
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="track-cart-1 bg-626 text-center">
                              <a href="#0">
                                <Image src="/sacral-track/assets/images/Vector 3.1.png" />
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="top-tracks-list mb-3 px-3">
                      <Row className="align-items-center flex-nowrap">
                        <Col xl={2} md={3} className="p-0">
                          <div className="count-inner">
                            <a className="position-relative" href="#0">
                              <Image src="/sacral-track/assets/images/Playr3.png" />
                              <div className="position-absolute count-num">
                                <h6>8</h6>
                              </div>
                              <div className="overlay-new">
                                <span className="icon">
                                  <Image src="/sacral-track/assets/images/Vector-new.png" />
                                </span>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col xl={8} md={6}>
                          <div className="artist-new">
                            <h4>
                              <a href="#0">Artist</a>
                            </h4>
                            <p class="text-left font-12">Thank You</p>
                            <p class="text-right font-12 font-weight-bold">
                              $5.8
                            </p>
                            <p class="text-left text-secondary">
                              <Image src="/sacral-track/assets/images/Vector1395.png" />{" "}
                              <span>1001101</span>{" "}
                            </p>
                          </div>
                        </Col>
                        <Col xl={2} md={3} className="p-0">
                          <div class="cart_box_new">
                            <div className="track-cart-1 bg-lgt-blue text-center">
                              <div className="table_center">
                                <div className="drop-down-new">
                                  <div
                                    id="dropDown-new"
                                    className="drop-down-new__button"
                                  >
                                    <i
                                      className="fa fa-ellipsis-h text-white"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div className="drop-down-new__menu-box">
                                    <ul className="drop-down-new__menu">
                                      <li className="drop-down-new__item active">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Cart-new.png"
                                          />
                                          Add to cart
                                        </a>{" "}
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Show-same-tracks.png"
                                          />
                                          Same tracks
                                        </a>
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/To-playlist.png"
                                          />
                                          Add to playlist
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="track-cart-1 bg-626 text-center">
                              <a href="#0">
                                <Image src="/sacral-track/assets/images/Vector 3.1.png" />
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="top-tracks-list mb-3 px-3">
                      <Row className="align-items-center flex-nowrap">
                        <Col xl={2} md={3} className="p-0">
                          <div className="count-inner">
                            <a className="position-relative" href="#0">
                              <Image src="/sacral-track/assets/images/Playr3.png" />
                              <div className="position-absolute count-num">
                                <h6>9</h6>
                              </div>
                              <div className="overlay-new">
                                <span className="icon">
                                  <Image src="/sacral-track/assets/images/Vector-new.png" />
                                </span>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col xl={8} md={6}>
                          <div className="artist-new">
                            <h4>
                              <a href="#0">Artist</a>
                            </h4>
                            <p class="text-left font-12">Thank You</p>
                            <p class="text-right font-12 font-weight-bold">
                              $5.8
                            </p>
                            <p class="text-left text-secondary">
                              <Image src="/sacral-track/assets/images/Vector1395.png" />{" "}
                              <span>1001101</span>{" "}
                            </p>
                          </div>
                        </Col>
                        <Col xl={2} md={3} className="p-0">
                          <div class="cart_box_new">
                            <div className="track-cart-1 bg-lgt-blue text-center">
                              <div className="table_center">
                                <div className="drop-down-new">
                                  <div
                                    id="dropDown-new"
                                    className="drop-down-new__button"
                                  >
                                    <i
                                      className="fa fa-ellipsis-h text-white"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div className="drop-down-new__menu-box">
                                    <ul className="drop-down-new__menu">
                                      <li className="drop-down-new__item active">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Cart-new.png"
                                          />
                                          Add to cart
                                        </a>{" "}
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Show-same-tracks.png"
                                          />
                                          Same tracks
                                        </a>
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/To-playlist.png"
                                          />
                                          Add to playlist
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="track-cart-1 bg-626 text-center">
                              <a href="#0">
                                <Image src="/sacral-track/assets/images/Vector 3.1.png" />
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="top-tracks-list mb-3 px-3">
                      <Row className="align-items-center flex-nowrap">
                        <Col xl={2} md={3} className="p-0">
                          <div className="count-inner">
                            <a className="position-relative" href="#0">
                              <Image src="/sacral-track/assets/images/Playr3.png" />
                              <div className="position-absolute count-num">
                                <h6>10</h6>
                              </div>
                              <div className="overlay-new">
                                <span className="icon">
                                  <Image
                                    className="w-14 mr-2"
                                    src="/sacral-track/assets/images/Cart-new.png"
                                  />
                                  <Image src="/sacral-track/assets/images/Vector-new.png" />
                                </span>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col xl={8} md={6}>
                          <div className="artist-new">
                            <h4>
                              <a href="#0">Artist</a>
                            </h4>
                            <p class="text-left font-12">Thank You</p>
                            <p class="text-right font-12 font-weight-bold">
                              $5.8
                            </p>
                            <p class="text-left text-secondary">
                              <Image src="/sacral-track/assets/images/Vector1395.png" />{" "}
                              <span>1001101</span>{" "}
                            </p>
                          </div>
                        </Col>
                        <Col xl={2} md={3} className="p-0">
                          <div class="cart_box_new">
                            <div className="track-cart-1 bg-lgt-blue text-center">
                              <div className="table_center">
                                <div className="drop-down-new">
                                  <div
                                    id="dropDown-new"
                                    className="drop-down-new__button"
                                  >
                                    <i
                                      className="fa fa-ellipsis-h text-white"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div className="drop-down-new__menu-box">
                                    <ul className="drop-down-new__menu">
                                      <li className="drop-down-new__item active">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Cart-new.png"
                                          />
                                          Add to cart
                                        </a>{" "}
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Show-same-tracks.png"
                                          />
                                          Same tracks
                                        </a>
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/To-playlist.png"
                                          />
                                          Add to playlist
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="track-cart-1 bg-626 text-center">
                              <a href="#0">
                                <Image src="/sacral-track/assets/images/Vector 3.1.png" />
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="top-tracks-list mb-3 px-3">
                      <Row className="align-items-center flex-nowrap">
                        <Col xl={2} md={3} className="p-0">
                          <div className="count-inner">
                            <a className="position-relative" href="#0">
                              <Image src="/sacral-track/assets/images/Playr3.png" />
                              <div className="position-absolute count-num">
                                <h6>11</h6>
                              </div>
                              <div className="overlay-new">
                                <span className="icon">
                                  <Image src="/sacral-track/assets/images/Vector-new.png" />
                                </span>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col xl={8} md={6}>
                          <div className="artist-new">
                            <h4>
                              <a href="#0">Artist</a>
                            </h4>
                            <p class="text-left font-12">Thank You</p>
                            <p class="text-right font-12 font-weight-bold">
                              $5.8
                            </p>
                            <p class="text-left text-secondary">
                              <Image src="/sacral-track/assets/images/Vector1395.png" />{" "}
                              <span>1001101</span>{" "}
                            </p>
                          </div>
                        </Col>
                        <Col xl={2} md={3} className="p-0">
                          <div class="cart_box_new">
                            <div className="track-cart-1 bg-lgt-blue text-center">
                              <div className="table_center">
                                <div className="drop-down-new">
                                  <div
                                    id="dropDown-new"
                                    className="drop-down-new__button"
                                  >
                                    <i
                                      className="fa fa-ellipsis-h text-white"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div className="drop-down-new__menu-box">
                                    <ul className="drop-down-new__menu">
                                      <li className="drop-down-new__item active">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Cart-new.png"
                                          />
                                          Add to cart
                                        </a>{" "}
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Show-same-tracks.png"
                                          />
                                          Same tracks
                                        </a>
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/To-playlist.png"
                                          />
                                          Add to playlist
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="track-cart-1 bg-626 text-center">
                              <a href="#0">
                                <Image src="/sacral-track/assets/images/Vector 3.1.png" />
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="top-tracks-list mb-3 px-3">
                      <Row className="align-items-center flex-nowrap">
                        <Col xl={2} md={3} className="p-0">
                          <div className="count-inner">
                            <a className="position-relative" href="#0">
                              <Image src="/sacral-track/assets/images/Playr3.png" />
                              <div className="position-absolute count-num">
                                <h6>12</h6>
                              </div>
                              <div className="overlay-new">
                                <span className="icon">
                                  <Image src="/sacral-track/assets/images/Vector-new.png" />
                                </span>
                              </div>
                            </a>
                          </div>
                        </Col>
                        <Col xl={8} md={6}>
                          <div className="artist-new">
                            <h4>
                              <a href="#0">Artist</a>
                            </h4>
                            <p class="text-left font-12">Thank You</p>
                            <p class="text-right font-12 font-weight-bold">
                              $5.8
                            </p>
                            <p class="text-left text-secondary">
                              <Image src="/sacral-track/assets/images/Vector1395.png" />{" "}
                              <span>1001101</span>{" "}
                            </p>
                          </div>
                        </Col>
                        <Col xl={2} md={3} className="p-0">
                          <div class="cart_box_new">
                            <div className="track-cart-1 bg-lgt-blue text-center">
                              <div className="table_center">
                                <div className="drop-down-new">
                                  <div
                                    id="dropDown-new"
                                    className="drop-down-new__button"
                                  >
                                    <i
                                      className="fa fa-ellipsis-h text-white"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div className="drop-down-new__menu-box">
                                    <ul className="drop-down-new__menu">
                                      <li className="drop-down-new__item active">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Cart-new.png"
                                          />
                                          Add to cart
                                        </a>{" "}
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/Show-same-tracks.png"
                                          />
                                          Same tracks
                                        </a>
                                      </li>
                                      <li className="drop-down-new__item">
                                        <a href="#">
                                          <Image
                                            className="w-14 mr-2"
                                            src="/sacral-track/assets/images/To-playlist.png"
                                          />
                                          Add to playlist
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="track-cart-1 bg-626 text-center">
                              <a href="#0">
                                <Image src="/sacral-track/assets/images/Vector 3.1.png" />
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                  <Card.Footer className="card-footer-new text-center">
                    <h5>
                      <a className="text-white" href="#0">
                        View all
                      </a>
                    </h5>
                  </Card.Footer>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Index;
