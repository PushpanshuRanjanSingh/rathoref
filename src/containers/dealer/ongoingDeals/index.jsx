import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { Image } from "react-bootstrap";
import base from "../../../globals/base";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import NewLead from "../component/Newleadindelear";
import ReactPaginate from "react-paginate";
import apiUrl from "../../../globals/config";
import L2stage from "../component/L2Stage";
import L4stage from "../component/L4Stage";
import L5stage from "../component/L5stage";
import ClosingDocuments from "../component/closingDocuments";
import Stage from "../../dealership/delearStage";
function Index(props) {
  const [download, setdownload] = useState({});
  const [page, setPage] = useState(1);
  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  useEffect(() => {
    ongoing(page);
  }, [page]);
  const ongoing = (page) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      // .get(apiUrl + "user/checkConfirm/2?skip=1&limit=8", headers)
      .get(apiUrl + "user/checkConfirmm?skip=" + page + "&limit=10", headers)
      .then((resp) => {
        setconfirmLead(resp?.data?.data[0].data);
        setdatacount(resp?.data?.data[0]?.count);
       
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateLead = (id) => {
    props.history.push({
      pathname: "/stageone",
      data: id,
    });
  };
  const viewOnGoingDeals = (phoneNo, otp, id) => {
    props.history.push({
      pathname: "/view",
      data: { phoneNo, otp },
    });
  };
  const popupdownload = (id) => {
    axios
      .get(apiUrl + "user/downloadDoc/" + id)
      .then((resp) => {
        setdownload(resp?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };
  return (
    <>
      {/* <Header /> */}
      <div className="content-body">
        <div className="container-fluid">
          <Stage/>
          <div className="tabsWrap">
            <Tabs onSelect={(index, label) => console.log(label + " selected")}>
              <Tab label="New Leads"><NewLead/></Tab>
              <Tab label="L2 Stage"><L2stage/></Tab>
              <Tab label="L4 Stage"><L4stage/></Tab>
              <Tab label="L5 Stage"><L5stage/></Tab>
              <Tab label="Closing Documents"><ClosingDocuments/></Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <div class="modal fade" id="myModal">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-body">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>

              <div class="profile-personal-info"></div>
              <table class="table borderless">
                <tbody>
                  <tr>
                    <th> Name</th>
                    <td colSpan="2">{download.firstName}</td>
                  </tr>
                  <tr>
                    <th> Contact Number</th>
                    <td colSpan="2">{download.phoneNo}</td>
                  </tr>
                  {/* {download?.panDoc ? (
                    <>
                      <tr>
                        <th>Pan Card Image</th>
                        <td>
                          {" "}
                          <Image
                            className="doc_image"
                            alt="img"
                            src={
                              download?.panDoc
                                ? apiUrl + download.panDoc
                                : "assets/images/pan-card.jpg"
                            }
                          />
                        </td>
                        <td class="download-icon">
                          <span class="ms-btn">
                            <i class="fa fa-download" aria-hidden="true"></i>
                          </span>
                        </td>
                      </tr>
                      <tr></tr>
                    </>
                  ) : (
                    ""
                  )}
                  {download?.aadharDoc ? (
                    <>
                      <tr>
                        <th>Aadhaar Card Image</th>
                        <td>
                          {" "}
                          <Image
                            className="doc_image"
                            alt="img"
                            src={
                              download?.aadharDoc
                                ? apiUrl + download.aadharDoc
                                : "assets/images/pan-card.jpg"
                            }
                          />
                        </td>
                     

                       <td class="download-icon">
                          <span class="ms-btn">
                            <a href="#" data-href="assets/images/pan-card.jpg" download>
                            <i class="fa fa-download" aria-hidden="true"></i></a>
                          </span>
                        </td> 
                      </tr>
                      <tr></tr>
                    </>
                  ) : (
                    ""
                  )} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Index;
