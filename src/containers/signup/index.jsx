import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import base from "../../globals/base";
import Header from "../header/header";
import Footer from "../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";
import { ErrorMessage } from "@hookform/error-message";
import Otpsend from "./otpsend";
import OtpVerification from "./otpVerification";
const axios = require("axios").default;
function Index() {
  const [status, setstatus] = useState(false);
  const [hide, sethide] = useState(true);
  const [share, setShare] = useState();



  function otpFunction(e) {
  }

  return (
    <>
      {share ? (
        <OtpVerification share={share} />
      ) : (
        <Otpsend setShare={setShare} />
      )}
    </>
  );
}

export default Index;
