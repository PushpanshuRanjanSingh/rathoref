import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import apiUrl from "../../../globals/config";

import ReactToPrint from "react-to-print";
import showNotification from "../../../services/notificationService";
import * as constant from "../../../services/constant";
import moment from "moment";
export default function EstimatePDF(props) {
  const componentRef = useRef();
  const [viewData, setViewData] = useState(props?.location?.data);
  const [state, setState] = React.useState("");
  const [financer, setfinancer] = useState([]);
  const [inventorydata, setinventorydata] = useState("");
  const [loading, setloading] = useState(false);
  const [id, setid] = useState("");
  const [estimatee, setestimatee] = useState("");
  useEffect(() => {
    financerall();
  }, []);
  let index = 0;
  if (!props.location.data) {
    props.history.push({
      pathname: "/",
    });
  }

  const handleChange = (e) => {

    let pl = viewData?.vehicle[index]?.vehicleID;

    let varient = viewData?.vehicle[index]?.variants;
    let id = e.target.value;
    setid(id);

    // var id = viewData;
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl +
          "inventory/getVehicleInformation?skip=1&limit=200&pl=" +
          pl +
          "&variant=" +
          varient +
          "&id=" +
          id,
        headers
      )
      .then((resp) => {
        if(resp?.data?.data[index]){
          setinventorydata(resp?.data?.data[index]);
          setloading(true);
        }
        else{
          showNotification("danger", "Vehicle Not added in delear Inventory");
        }
        
       
        // if(resp)
       
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const financerall = () => {
    var id = viewData;
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "user/findbyRole/3?skip=1&limit=100", headers)

      .then((resp) => {
        setfinancer(resp?.data?.data[index].data);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const fileChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.files[index],
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (estimatee && id) {
      let token = localStorage.getItem("myData");

      let headers = {
        headers: {
          "x-token": `Bearer ${token}`,
        },
      };
      const formData = new FormData();

      formData.append("estimatePdf", estimatee);
      formData.append("dealerId", id);
      formData.append("id", viewData._id);
      axios
        .put(apiUrl + "user/updateEstimate", formData, headers)
        .then((resp) => {
          props.history.push({
            pathname: "/customermanagementlead",
          });
        })
        .catch((err) => {
          showNotification("danger", constant.ERRORMSG);
        });
    } else {
      showNotification("danger", "Field Are Required");
    }
  };
  return (
    <>
      <div className="content-body" style={{ display: "none" }}>
        <div ref={componentRef} style={{ padding: "30px;" }}>
          <table
            style={{
              width: 700,
              fontFamily: "Arial",
              borderCollapse: "collapse",
              margin: "40px auto",
            }}
            cellSpacing={0}
            cellPadding={0}
            border={0}
          >
            <tbody>
              <tr>
                <td>
                  <table
                    style={{ width: "100%", padding: 0, border: "none" }}
                    cellSpacing={0}
                    cellPadding={0}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            fontWeight: "bold",
                            fontFamily: '"Cambria"',
                            fontSize: 20,
                          }}
                        >
                          {" "}
                          Naayak
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontFamily: "Arial",
                            fontSize: 15,
                          }}
                        >
                          {" "}
                          OEM :{" "}
                          <img
                            src="../../../assets/images/vehicel_logo.jpg"
                            style={{ width: 170 }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table
                    style={{
                      width: "100%",
                      padding: 0,
                      borderTop: "2px solid #000",
                      borderBottom: "2px solid #000",
                    }}
                    cellSpacing={0}
                    cellPadding={0}
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                              margin: "0 0 25px 0",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <table
                                    style={{
                                      width: "100%",
                                      padding: 0,
                                      border: "none",
                                    }}
                                    cellSpacing={0}
                                    cellPadding={0}
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: "10pt",
                                          }}
                                        >
                                          CONFLUX ENTERPRISES PRIVATE LIMITED
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            fontFamily: '"Calibri"',
                                            fontSize: 15,
                                          }}
                                        >
                                          {" "}
                                          CIN : U51909DL2005PTC243405
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td
                                  style={{
                                    fontFamily: '"Calibri"',
                                    fontSize: 15,
                                    textAlign: "right",
                                  }}
                                >
                                  GSTIN : 10AABCL0977F1ZX
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ paddingRight: 50 }}>
                                  <table
                                    style={{
                                      width: "100%",
                                      padding: 0,
                                      border: "none",
                                    }}
                                    cellSpacing={0}
                                    cellPadding={0}
                                  >
                                    <tbody>
                                      <tr>
                                        <td style={{ fontSize: 15 }}>
                                          {" "}
                                          Name :
                                        </td>
                                        <td
                                          style={{
                                            fontWeight: "bold",
                                            fontStyle: "italic",
                                            fontSize: 15,
                                            borderBottom: "1px solid #000000",
                                            padding: "2px 0",
                                          }}
                                        >
                                          {viewData?.firstName}{" "}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            verticalAlign: "top",
                                            fontSize: 15,
                                          }}
                                        >
                                          Address :
                                        </td>
                                        <td>
                                          <table
                                            style={{
                                              width: "100%",
                                              padding: 0,
                                              border: "none",
                                            }}
                                            cellSpacing={0}
                                            cellPadding={0}
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style={{
                                                    borderBottom:
                                                      "1px solid #000000",
                                                    fontStyle: "italic",
                                                    fontSize: 15,
                                                    padding: "2px 0",
                                                  }}
                                                >
                                                  {viewData?.address}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  style={{
                                                    borderBottom:
                                                      "1px solid #000000",
                                                    fontStyle: "italic",
                                                    fontSize: 15,
                                                    padding: "2px 0",
                                                  }}
                                                >
                                                  District :{viewData?.district}{" "}
                                                  {viewData?.pincode}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  style={{
                                                    fontStyle: "italic",
                                                    fontSize: 15,
                                                    padding: "2px 0",
                                                  }}
                                                >
                                                  Landmark: {viewData?.landmark}{" "}
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ fontSize: 15 }}>
                                          {" "}
                                          Mobile :
                                        </td>
                                        <td
                                          style={{
                                            borderBottom: "1px solid #000000",
                                            fontStyle: "italic",
                                            fontSize: 15,
                                            padding: "2px 0",
                                          }}
                                        >
                                          {viewData?.phoneNo}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan={2}
                                          style={{
                                            height: 22,
                                            background: "#7F7F7F",
                                          }}
                                        />
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <table
                                    style={{
                                      padding: 0,
                                      border: "none",
                                      marginLeft: "auto",
                                      width: "auto",
                                      marginBottom: 10,
                                    }}
                                    cellSpacing={0}
                                    cellPadding={0}
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            fontFamily: '"Calibri"',
                                            fontSize: 15,
                                            paddingRight: 10,
                                          }}
                                        >
                                          Sr. No. :{" "}
                                        </td>
                                        <td
                                          style={{
                                            fontWeight: "bold",
                                            fontFamily: '"Calibri"',
                                            fontSize: 15,
                                            textAlign: "center",
                                          }}
                                        >
                                          N01/2021-22{" "}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            fontFamily: '"Calibri"',
                                            fontSize: 15,
                                          }}
                                        >
                                          Date
                                        </td>
                                        <td
                                          style={{
                                            fontStyle: "italic",
                                            fontSize: 15,
                                            textAlign: "center",
                                            borderBottom:
                                              "1px solid #000000 !important",
                                            width: 110,
                                          }}
                                        >
                                          {moment().format("ll")}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ height: 23 }}> </td>
                                        <td
                                          style={{
                                            height: 23,
                                            borderBottom: "1px solid #000",
                                          }}
                                        ></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    style={{
                                      padding: 0,
                                      border: "none",
                                      width: "100%",
                                      margin: "0 0 20px 0",
                                    }}
                                    cellSpacing={0}
                                    cellPadding={0}
                                  >
                                    <tbody>
                                      <tr>
                                        <td style={{ fontSize: 15 }}>
                                          {" "}
                                          Issuing Branch :{" "}
                                        </td>
                                        <td
                                          style={{
                                            borderBottom: "1px solid #000000",
                                            fontStyle: "italic",
                                            fontSize: 15,
                                          }}
                                        >
                                          H.O. Ex. Patna
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan={2}
                                          style={{ fontSize: 15 }}
                                        >
                                          {" "}
                                          Under H/P, Lease or Hypothecation with{" "}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan={2}
                                          style={{
                                            height: 25,
                                            borderBottom: "1px solid #000000",
                                          }}
                                        ></td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan={2}
                                          style={{
                                            height: 25,
                                            borderBottom: "1px solid #000000",
                                          }}
                                        ></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table
                    style={{
                      width: "100%",
                      padding: 0,
                      border: "none",
                      marginTop: 5,
                    }}
                    cellSpacing={0}
                    cellPadding={0}
                  >
                    <tbody>
                      <tr>
                        <td> </td>
                        <td style={{ textAlign: "center", width: 80 }}>
                          {" "}
                          Nos.{" "}
                        </td>
                        <td> </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 140 }}>
                                  Model
                                </td>
                                <td
                                  style={{
                                    fontWeight: "bold",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    borderBottom: "1px solid #000000",
                                    padding: "3px 0",
                                  }}
                                >
                                  Winger Deluxe AC
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontStyle: "italic",
                            fontSize: 15,
                          }}
                        >
                          X 1{" "}
                        </td>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 80 }}>
                                  Price Rs. :{" "}
                                </td>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000000",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    textAlign: "right",
                                    fontWeight: "bold",
                                    padding: "3px 0",
                                  }}
                                >
                                  {inventorydata?.exShowroomPrice}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 140 }}>
                                  TCS{" "}
                                </td>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000000",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    padding: "3px 0px",
                                  }}
                                ></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td> </td>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 30 }}>Rs.</td>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000000",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    textAlign: "right",
                                    padding: "3px 0",
                                  }}
                                >
                                  {inventorydata?.exShowroomPrice &&
                                  inventorydata?.exShowroomPrice >= 1000000
                                    ? inventorydata?.exShowroomPrice / 100
                                    : ""}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 140 }}>
                                  Insurance
                                </td>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000000",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    padding: "3px 0",
                                  }}
                                >
                                  1 Year{" "}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td> </td>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 30 }}>Rs.</td>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000000",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    textAlign: "right",
                                    padding: "3px 0",
                                  }}
                                >
                                  0
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 140 }}>
                                  Temp. Registration
                                </td>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000000",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    padding: "3px 0px",
                                  }}
                                ></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td> </td>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 30 }}>Rs.</td>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000000",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    textAlign: "right",
                                    padding: "3px 0",
                                  }}
                                >
                                  0
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 140 }}>
                                  Registration
                                </td>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000000",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    padding: "3px 0px",
                                  }}
                                ></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td> </td>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 30 }}>Rs.</td>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000000",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    textAlign: "right",
                                    padding: "3px 0",
                                  }}
                                >
                                  {inventorydata?.rtoCharges}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 140 }}>
                                  Finance Charges{" "}
                                </td>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000000",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    padding: "3px 0px",
                                  }}
                                ></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td> </td>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 30 }}>Rs.</td>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000000",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    textAlign: "right",
                                    padding: "3px 0",
                                  }}
                                >
                                  0
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 140 }}>
                                  Dealer Discount{" "}
                                </td>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000000",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    padding: "3px 0px",
                                  }}
                                ></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td> </td>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 30 }}>Rs.</td>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000000",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    textAlign: "right",
                                    color: "#0000FF",
                                    padding: "3px 0",
                                  }}
                                >
                                  -{" "}
                                  {inventorydata?.additionalDiscount &&
                                  inventorydata?.cashDiscount
                                    ? inventorydata?.additionalDiscount +
                                      inventorydata?.cashDiscount
                                    : ""}{" "}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 140 }}>
                                  Cashback
                                </td>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000000",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    padding: "3px 0px",
                                  }}
                                >
                                  
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td> </td>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              padding: 0,
                              border: "none",
                            }}
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr>
                                <td style={{ fontSize: 15, width: 30 }}>Rs.</td>
                                <td style={{ height: 23 }} />
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table
                    style={{
                      width: "auto",
                      marginLeft: "auto",
                      border: "none",
                      borderCollapse: "collapse",
                      marginBottom: 20,
                    }}
                    cellSpacing={0}
                    cellPadding={0}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            paddingRight: 15,
                          }}
                        >
                          Total
                        </td>
                        <td
                          style={{
                            border: "1px solid #000000",
                            height: 23,
                            width: 198,
                            fontSize: 21,
                            textAlign: "right",
                            padding: "5px 5px",
                            fontStyle: "italic",
                            fontWeight: "bold",
                          }}
                        >
                          {inventorydata?.exShowroomPrice +
                            inventorydata?.exShowroomPrice &&
                          inventorydata?.exShowroomPrice >= 1000000
                            ? inventorydata?.exShowroomPrice / 100
                            : "" +
                                inventorydata?.rtoCharges -
                                inventorydata?.additionalDiscount &&
                              inventorydata?.cashDiscount
                            ? inventorydata?.additionalDiscount +
                              inventorydata?.cashDiscount
                            : ""}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table
                    style={{
                      width: "100%",
                      padding: 0,
                      border: "1px solid #000",
                    }}
                    cellSpacing={0}
                    cellPadding={0}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            fontSize: 21,
                            fontStyle: "italic",
                            fontWeight: "bold",
                            padding: "5px 0 5px 5px",
                            width: 170,
                          }}
                        >
                          Rs.{" "}
                        </td>
                        <td
                          style={{
                            padding: "5px 0 5px 5px",
                            fontStyle: "italic",
                            fontSize: 15,
                          }}
                        >
                          Fifteen Lakhs Five Thousand Eight Hundred Two Only{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    borderBottom: "1px solid #000",
                    paddingBottom: 100,
                    paddingTop: 5,
                  }}
                >
                  <table
                    style={{ width: "100%", padding: 0, border: "none" }}
                    cellSpacing={0}
                    cellPadding={0}
                  >
                    <tbody>
                      <tr>
                        <td style={{ fontSize: 13, lineHeight: "1.4" }}>
                          Price is inclusive of GST Only
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: 13, lineHeight: "1.4" }}>
                          This is an estimate quotation of the vehicle. The
                          actual will be updated after the financer's approval{" "}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: 13, lineHeight: "1.4" }}>
                          or if you don't want to get it financed then it will
                          be sent to you without finance charges and others.{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table
                    style={{ width: "100%", padding: 0, border: "none" }}
                    cellSpacing={0}
                    cellPadding={0}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            width: 90,
                            paddingBottom: 3,
                            paddingTop: 3,
                          }}
                        >
                          Regd Office{" "}
                        </td>
                        <td style={{ padding: "0 10px", fontSize: 12 }}>:</td>
                        <td
                          style={{
                            fontSize: 12,
                            paddingBottom: 3,
                            paddingTop: 3,
                          }}
                        >
                          B-4/20, Safdarjung Enclave, New Delhi - 110029
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            width: 90,
                            verticalAlign: "top",
                            paddingBottom: 3,
                            paddingTop: 3,
                          }}
                        >
                          Sales Office
                        </td>
                        <td
                          style={{
                            padding: "3px 10px",
                            verticalAlign: "top",
                            fontSize: 12,
                          }}
                        >
                          :
                        </td>
                        <td
                          style={{
                            fontSize: 12,
                            paddingBottom: 3,
                            paddingTop: 3,
                          }}
                        >
                          Plot No. - 290 &amp; 291, Mauj-Mustafapur,
                          P.O-Kansari, Patna-Gaya Highway, Thana-Gaurichak,
                          Patna - 804451
                          <br /> Contact Nos. - 9117003300, 9117922222,
                          9117122222; Email : laxmibarter.sales@gmail.com{" "}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            width: 80,
                            verticalAlign: "top",
                            paddingBottom: 3,
                            paddingTop: 3,
                          }}
                        >
                          Workshop
                        </td>
                        <td
                          style={{
                            padding: "3px 10px",
                            verticalAlign: "top",
                            fontSize: 12,
                          }}
                        >
                          :
                        </td>
                        <td
                          style={{
                            fontSize: 12,
                            paddingBottom: 3,
                            paddingTop: 3,
                          }}
                        >
                          Plot No. - 290 &amp; 291, Mauj-Mustafapur,
                          P.O-Kansari, Patna-Gaya Highway, Thana-Gaurichak,
                          Patna - 804451 <br /> Contact Nos. - 9117003311,
                          6202532340, 6202532341; Email :
                          laxmibarter.service@gmail.com{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-body">
        <div className="container-fluid">
          <div class="row emi_row ">
            <div class="col-lg-12">
              <div class="card widget-stat">
                <div class="card-header bg-custom-blue ">
                  <h4 class="card-title text-white">Generate Estimation</h4>
                </div>
                <div class="card-body">
                  <div class="form-validation">
                    <Row>
                      <Col sm={6}>
                        <div class="form-group">
                          <label class="col-form-label" for="val-username">
                            Select Dealer
                          </label>
                          <select
                            class="form-control"
                            onChange={handleChange}
                            name="financerId"
                            required
                            id="exampleFormControlSelect1"
                          >
                            <option selected="true" disabled="disabled">
                              Choose Dealer
                            </option>
                            {financer.length != index &&
                              financer.map((options, index) => (
                                <option value={options._id}>
                                  {options?.dealershipName}
                                </option>
                              ))}
                          </select>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div class="form-group ">
                          <label class="col-form-label" for="val-username">
                            Upload Estimate
                          </label>

                          <div class="custom-file">
                            <input
                              type="file"
                              required
                              name="estimate"
                              class="custom-file-input form-control"
                              onChange={(e) => setestimatee(e.target.files[index])}
                            />
                            <label class="custom-file-label">
                              {estimatee?.name
                                ? estimatee?.name
                                : "Choose File"}
                            </label>
                          </div>
                        </div>
                      </Col>

                      <Col sm={12} className="d-flex mt-3">
                        {loading ? (
                          <ReactToPrint
                            trigger={() => (
                              <button type="button" class="btn btn-primary ">
                                <i class="fa fa-print" aria-hidden="true"></i>{" "}
                                Generate PDF
                              </button>
                            )}
                            content={() => componentRef.current}
                          />
                        ) : (
                          <button type="button" class="btn btn-primary ">
                            <i class="fa fa-print" aria-hidden="true"></i>{" "}
                            Generate PDF
                          </button>
                        )}

                        <button
                          type="submit"
                          onClick={(e) => {
                            onSubmit(e);
                          }}
                          class="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
