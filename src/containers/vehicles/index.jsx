import React, { useState, useEffect, useRef } from "react";

import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import * as constant from "../../.../../services/constant";
import showNotification from "../.../../../services/notificationService";
import base from "../../globals/base";
import Header from "../header/header";
import Footer from "../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import apiUrl from "../../globals/config";
import axios from "axios";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import ModelDownload from "../modelDownload";
function Index(props) {
  if (localStorage.getItem("role") == constant.DELAR) {
    props.history.push({
      pathname: "/",
    });
  }
  const [search, setsearch] = useState("");
  const [download, setdownload] = useState({});
  const [leadData, setleadData] = useState([]);
  const [datacount, setdatacount] = useState();
  const [vehicle, setvehicle] = useState([]);
  const [page, setPage] = useState(constant.START);

  useEffect(() => {
    vechiclelist(page);
  }, [page]);
var index=0
  const vechiclelist = (page) => {
    let token = localStorage.getItem("myData");

    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    var data = {
      brand: [],
      model: [],
      fuel: [],
      color: [],
    };
    axios
      .post(apiUrl + "color/getAllFilters?limit=10&skip=" + page, data)
      .then((resp) => {
        if (resp?.data.success) {
        
          setvehicle(resp?.data?.data[index]?.data);
          let data = resp?.data?.data[index]?.data;
          setdatacount(data.length);
        }
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };

  const handlePageClick = (data) => {
    vechiclelist(parseInt(data.selected) + 1);
  };
  const updateLead = (phoneNo, otp, id) => {
    props.history.push({
      pathname: "/UpdateData",
      data: { phoneNo, otp, id },
    });
  };

  const popupdownload = (id) => {
    axios
      .get(apiUrl + "user/downloadDoc/" + id)
      .then((resp) => {
        setdownload(resp?.data?.data);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const serchFun = () => {
    let token = localStorage.getItem("myData");
    var phoneNo = search;
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .post(apiUrl + "user/searchByKey", { phoneNo }, headers)
      .then((resp) => {
        setleadData(resp?.data?.data);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const handleSearch = (e) => {
    setsearch(e.target.value);
  };

  const getPriceInLakh = (price) => {
    return price ? price / 100000 : "";
  };
const vechicleBook =(brand,ppl,vehicle,varient)=>{

  props.history.push({
    pathname: "/addLead",
    data: {brand,ppl,vehicle,varient },
  });
}

  return (
    <>
      <div className="content-body">
        <div className="container-fluid pb-4">
          <div class="row">
            {vehicle.map((data, index) => (
              <div class="col-xl-3  col-md-6 col-sm-6 col-12">
                <div class="x_car_offer_main_boxes_wrapper float_left">
                  <div class="x_car_offer_img float_left">
                    <Image
                      className="img-fluid"
                      alt="img"
                      src={apiUrl + data?.vehicleDescription[index]?.primaryImage}
                    />
                  </div>
                  <div class="gsc_col-xs-12 holder truncate">
                    {/* <Link title="Maruti Swift" to="/"> */}

                    {data?.vehicleDescription[index]?.vehicleName}
                    {/* </Link> */}
                    <div class="price">
                      <span class="icon-cd_R">Rs</span>{" "}
                      {getPriceInLakh(
                        data?.vehicleDescription[index]?.minimumPriceRange
                      )}{" "}
                      -{" "}
                      {getPriceInLakh(
                        data?.vehicleDescription[index]?.maximumPriceRange
                      )}{" "}
                      Lakh
                      <sup>*</sup>
                    </div>
                    <div class="BtnFull buttonHolder buttonHolder virtualNumberBtn">
                      <div class=" btn-dcb btn-col-cus" onClick={e=>vechicleBook(data?.vehicleDescription[index]?.ppl[index]?.brandId,data?.vehicleDescription[index]?.ppl[index]?._id,data?.vehicleDescription[index]?._id,data?.variants[index]?._id)}>Book now</div>
                      <a target="_blank" href={data?.addVideoLink}>
                        {" "}
                        <div class="primaryButton btn-dcb">Check Video</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
         </div>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <div
            className="dataTables_info pl-3"
            id="example_info"
            role="status"
            aria-live="polite"
          >
            Showing {constant.START} to {constant.ONPAGE} of {datacount} entries
          </div>
          <div
            className="dataTables_paginate paging_simple_numbers"
            id="example_paginate"
          >
            {datacount > constant.ONPAGE ? (
              <ReactPaginate
                previousLabel={"←Previous"}
                nextLabel={"Next→"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(datacount / constant.ONPAGE)}
                initialPage={0}
                marginPagesDisplayed={5}
                onPageChange={(data) => handlePageClick(data)}
                containerClassName={"pagination m-0"}
                subContainerClassName={"pages pagination"}
                pageClassName="page-item"
                activeClassName={"active"}
                activeLinkClassName={"page-link"}
                pageLinkClassName={"page-link"}
                nextClassName={"page-link arrow text-danger"}
                previousLinkClassName={"page-link arrow"}
                disableInitialCallback={true}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <ModelDownload download={download} />
    </>
  );
}

export default Index;
