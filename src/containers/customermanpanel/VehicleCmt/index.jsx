import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import base from "../../../globals/base";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import * as constant from "../../.../../../services/constant";
import showNotification from "../../../services/notificationService";
import { Tabs, Tab } from "react-bootstrap-tabs";
import OwlCarousel from "react-owl-carousel";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "owl.carousel/dist/assets/owl.carousel.css";
import styled from "styled-components";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Topfivefreshlead from "../component/Topfivefreshlead";
import axios from "axios";
import ReactPaginate from "react-paginate";
import apiUrl from "../../../globals/config";
import Leadscomponent from "../component/Leadscomponent";
import Alluser from "../../admin/component/Alluser";
import Addlead from "../component/Addlead";
import Addppl from "../component/Addppl";
import Faq from "../component/Faq";
import Price from "../component/Price";
import Specification from "../component/Specification";
import Addutlityvehicle from "../component/Addutlityvehicle";
import Addvarient from "../component/Addvarient";
import Addvehicle from "../component/Addvehicle";
import Addcolour from "../component/Addcolour";

function Index(props) {
  const [page, setPage] = useState(constant.START);
  const [countLeadd, setcountLeadd] = useState("");
  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  const { register, errors, handleSubmit } = useForm();
  const [State, setState] = useState("");
  useEffect(() => {
    ongoing(page);
  }, [page]);
  let index = 0;
  const ongoing = (page) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + "vehicle/getVehicleList?skip=" + page + "&limit=100",
        headers
      )

      .then((resp) => {
        setconfirmLead(resp?.data?.data[index].data); //user/getallRoles?skip=1&limit=109
        setdatacount(resp?.data?.data[index].count);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };
  // const updateOne = (phoneNo, otp, id) => {
  //   history.push({
  //     pathname: '/UpdateData',
  //     data: { phoneNo, otp, id },
  //   });
  // };
  const deleteOne = (id) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .delete(apiUrl + "user/deleteRecord/" + id, headers)

      .then((resp) => {
        ongoing(page);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const updateVechile = (data) => {
    props.history.push({
      pathname: "/addupdatevehicle",
      data: data,
    });
  };
  const deletevechicle = (id) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .delete(apiUrl + "vehicle/deleteData/" + id, headers)

      .then((resp) => {
        ongoing(page);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const fileChange = (e) => {
    setState({
      ...State,
      [e.target.name]: e.target.files[index],
    });
  };
  const onSubmit = (data) => {
    if (data?.brandLogo) data.brandLogo = data?.brandLogo[index];
  };
  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <Tabs>
            <Tab label="Add Brand">
              <Addlead />
            </Tab>
            <Tab label="Add PPL">
              <Addppl />
            </Tab>
            <Tab label="Add Vehicle">
              <Addvehicle />
            </Tab>
            <Tab label="Add Variants">
              <Addvarient />
            </Tab>
            <Tab label="Add Colour">
              <Addcolour />
            </Tab>
            <Tab label="Add Utility Vehicle">
              <Addutlityvehicle />
            </Tab>
            <Tab label="Add FAQ">
              <Faq />
            </Tab>
            <Tab label="Add Specification">
              <Specification />
            </Tab>
            <Tab label="Add City Price in india">
              <Price />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Index;
