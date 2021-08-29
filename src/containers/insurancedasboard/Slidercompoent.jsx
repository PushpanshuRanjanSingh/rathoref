import React, { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../../globals/config";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import base from "../../globals/base";
import showNotification from "../../services/notificationService";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
function Slidercompoent() {
  const [leadData, setleadData] = useState([]);
  useEffect(() => {
    allbanner();
  }, []);
  const allbanner = (page) => {
    let token = localStorage.getItem("myData");

    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "advertisement/getList?skip=1&limit=10&panel=4", headers)
      .then((resp) => {
        if (resp?.data.success) {
          setleadData(resp?.data?.data[0]?.data);
        }
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };

  return (
    <Col xl={9} className=" mb-3 mb-xl-0">
      <OwlCarousel
        className="owl-theme cus_owl_theme"
        items={1}
        margin={8}
        loop
        margin={10}
        nav
      >
        {leadData.map((data, index) => (
          <div className="item item_box">
            <div className="inner_slider_box">
              <Row className="justify-content-between w-100 align-items-center m-auto mb-4">
                <Col sm={7}>
                  <div className="col_inner_box">
                    <h2>{data.advertisementTitle}</h2>
                    <p className="pr-sm-5">{data.advertisementDescription}</p>
                    <a href={data?.anchor}>
                      <Button
                        variant="light"
                        className="font-weight-bold btn-txt"
                      >
                        Explore Now
                      </Button>
                    </a>
                  </div>
                </Col>
                <Col sm={5} className="mt-3 mt-lg-0">
                  <div className="inner_img_slider">
                    <Image
                      className="w-75"
                      alt="img"
                      src={apiUrl + data.advertisementImage}
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="cross_icon">
              <Link className="" to="/">
                <i className="fa fa-times" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        ))}{" "}
      </OwlCarousel>
    </Col>
  );
}

export default Slidercompoent;
