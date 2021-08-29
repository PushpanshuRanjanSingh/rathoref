import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../../globals/config";
import * as constant from "../../../services/constant";
import Header from "../../header/header";
import showNotification from "../../../services/notificationService";
import { param } from "jquery";
var fileDownload = require("js-file-download");
function Index(props) {
  if (!props.location.data) {
    props.history.push({
      pathname: "/",
    });
  }

  const history = useHistory();

  const [post, setpost] = useState([]);
  const [pramsdata, setpramsdata] = useState(props.location.data);
  const [stage, setstage] = useState(props.location.stage);
  const [blockData, setblockData] = useState([]);
  const [state, setState] = React.useState("");
  const [role, setRole] = useState();
  useEffect(() => {
    getLeads();
    let role = localStorage.getItem("role");
    setRole(role);
  }, []);
  const getLeads = () => {
    axios
      .post(apiUrl + "user/verifyNo", props.location.data)
      .then((response) => {
        let data = response.data.data;
        data.commercialUse = response.data?.data?.vehicle?.commercialUse;
        data.vehicleToExchanghe =
          response.data?.data?.vehicle?.vehicleToExchanghe;
        data.chequeBook = response.data?.data?.docs?.chequeBook;
        setState(data);
        setblockData([data.block]);
        setpost([{ Name: data.postOffice }]);
      })
      .catch(function (error) {
        showNotification("danger", error.message);
      });
  };
  function download(url, name) {
    var fileName = name + "." + url.split(".")[1];

    axios
      .get(apiUrl + url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, fileName);
      });
  }
  // onClick={download}
  return (
    <>
      {/* <Header /> */}
      <div className="content-body">
        <div className="container-fluid">
          <div className="row justify-content-center h-100 align-items-center emi_row">
            <div className="col-md-12">
              <div className="card widget-stat">
                <div className="card-header bg-custom-blue ">
                  <h4 className="card-title text-white">
                    {stage && stage == constant.STAGE
                      ? "L2 Stage"
                      : stage == 3
                      ? "Closing Document"
                      : "L5 Stage"}
                  </h4>

                  <div className="two_btns_ps"></div>
                </div>
                {stage && stage == constant.STAGE ? (
                  <div className="card-body">
                    <div className="form-validation">
                      <div className="profile-personal-info">
                        <div className="row mb-2">
                          <div className="col-sm-3 col-5">
                            <h6 className="f-w-500">
                              Downpayment amount{" "}
                              <span className="pull-right">:</span>
                            </h6>
                          </div>
                          <div className="col-sm-9 col-7">
                            <span>
                              {state && state?.downpaymentAmountL2
                                ? state?.downpaymentAmountL2
                                : "N/A"}{" "}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-sm-3 col-5">
                            <h6 className="f-w-500">
                              Payment Mode <span className="pull-right">:</span>
                            </h6>
                          </div>
                          <div className="col-sm-9 col-7">
                            <span>
                              {state && state?.paymentModeL2
                                ? state?.paymentModeL2
                                : "N/A"}{" "}
                            </span>
                          </div>
                        </div>{" "}
                        <div className="row mb-2 align-items-center">
                          <div className="col-sm-3 col-5">
                            <h6 className="f-w-500">
                              Money reciept
                              <span className="pull-right">:</span>
                            </h6>
                          </div>
                          <div className="col-sm-9 col-7 d-flex align-items-center">
                            {/* <span>
                            {state && state.docs?.bankDoc
                              ? state.docs.bankDoc
                              : 'N/A'} */}
                            {/* <Image
                              className='doc_image'
                              alt='img'
                              src={
                                state && state.docs?.bankDoc
                                  ? apiUrl + state.docs.bankDoc
                                  : 'assets/images/17.jpg'
                              }
                            /> */}
                            {/* </span> */}
                            <span className="file-name-box">
                              {state && state?.moneyRecieptL2
                                ? state?.moneyRecieptL2
                                : "N/A"}
                            </span>
                            {state && state?.moneyRecieptL2 ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  download(state?.moneyRecieptL2, "document")
                                }
                                class="btn btn-dark  bg-dark-cus ml-auto"
                              >
                                <i
                                  class="fa fa-cloud-download pr-1"
                                  aria-hidden="true"
                                ></i>
                                <span>Download</span>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>{" "}
                        <div className="row mb-2 align-items-center">
                          <div className="col-sm-3 col-5">
                            <h6 className="f-w-500">
                              Tax Invoice
                              <span className="pull-right">:</span>
                            </h6>
                          </div>
                          <div className="col-sm-9 col-7 d-flex align-items-center">
                            {/* <span>
                            {state && state.docs?.bankDoc
                              ? state.docs.bankDoc
                              : 'N/A'} */}
                            {/* <Image
                              className='doc_image'
                              alt='img'
                              src={
                                state && state.docs?.bankDoc
                                  ? apiUrl + state.docs.bankDoc
                                  : 'assets/images/17.jpg'
                              }
                            /> */}
                            {/* </span> */}
                            <span className="file-name-box">
                              {state && state?.taxInvoiceL2
                                ? state?.taxInvoiceL2
                                : "N/A"}
                            </span>
                            {state && state?.taxInvoiceL2 ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  download(state.taxInvoiceL2, "taxInvoice")
                                }
                                class="btn btn-dark  bg-dark-cus ml-auto"
                              >
                                <i
                                  class="fa fa-cloud-download pr-1"
                                  aria-hidden="true"
                                ></i>
                                <span>Download</span>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary mr-2 tp-cus-btn"
                      onClick={() => history.goBack()}
                    >
                      Back
                    </button>
                  </div>
                ) : stage == 3 ? (
                  <div className="card-body">
                    <div className="form-validation">
                      <div className="profile-personal-info">
                        <div className="row mb-2 align-items-center">
                          <div className="col-sm-3 col-5">
                            <h6 className="f-w-500">
                            Permit reciept
                              <span className="pull-right">:</span>
                            </h6>
                          </div>
                          <div className="col-sm-9 col-7 d-flex align-items-center">
                            <span className="file-name-box">
                              {state && state?.permitRecieptL5
                                ? state?.permitRecieptL5
                                : "N/A"}
                            </span>
                            {state && state?.permitRecieptL5 ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  download(state?.permitRecieptL5, "document")
                                }
                                class="btn btn-dark  bg-dark-cus ml-auto"
                              >
                                <i
                                  class="fa fa-cloud-download pr-1"
                                  aria-hidden="true"
                                ></i>
                                <span>Download</span>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>{" "}
                        <div className="row mb-2 align-items-center">
                          <div className="col-sm-3 col-5">
                            <h6 className="f-w-500">
                            Permit copy
                              <span className="pull-right">:</span>
                            </h6>
                          </div>
                          <div className="col-sm-9 col-7 d-flex align-items-center">
                            <span className="file-name-box">
                              {state && state?.permitCopyL5
                                ? state?.permitCopyL5
                                : "N/A"}
                            </span>
                            {state && state?.permitCopyL5 ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  download(state.permitCopyL5, "permitCopy")
                                }
                                class="btn btn-dark  bg-dark-cus ml-auto"
                              >
                                <i
                                  class="fa fa-cloud-download pr-1"
                                  aria-hidden="true"
                                ></i>
                                <span>Download</span>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>{" "}
                        <div className="row mb-2 align-items-center">
                          <div className="col-sm-3 col-5">
                            <h6 className="f-w-500">
                            RC Copy
                              <span className="pull-right">:</span>
                            </h6>
                          </div>
                          <div className="col-sm-9 col-7 d-flex align-items-center">
                            <span className="file-name-box">
                              {state && state?.rcCopyL5
                                ? state?.rcCopyL5
                                : "N/A"}
                            </span>
                            {state && state?.rcCopyL5 ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  download(state.rcCopyL5, "rcCopy")
                                }
                                class="btn btn-dark  bg-dark-cus ml-auto"
                              >
                                <i
                                  class="fa fa-cloud-download pr-1"
                                  aria-hidden="true"
                                ></i>
                                <span>Download</span>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary mr-2 tp-cus-btn"
                      onClick={() => history.goBack()}
                    >
                      Back
                    </button>
                  </div>
                ) : (
                  <div className="card-body">
                    <div className="form-validation">
                      <div className="profile-personal-info">
                        <div className="row mb-2">
                          <div className="col-sm-3 col-5">
                            <h6 className="f-w-500">
                              Registration Number{" "}
                              <span className="pull-right">:</span>
                            </h6>
                          </div>
                          <div className="col-sm-9 col-7">
                            <span>
                              {state && state?.registrationNumberL5
                                ? state?.registrationNumberL5
                                : "N/A"}{" "}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-2 align-items-center">
                          <div className="col-sm-3 col-5">
                            <h6 className="f-w-500">
                              HSRP (Photo)
                              <span className="pull-right">:</span>
                            </h6>
                          </div>
                          <div className="col-sm-9 col-7 d-flex align-items-center">
                            <span className="file-name-box">
                              {state && state?.hsprPhotoL5
                                ? state?.hsprPhotoL5
                                : "N/A"}
                            </span>
                            {state && state?.hsprPhotoL5 ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  download(state?.hsprPhotoL5, "document")
                                }
                                class="btn btn-dark  bg-dark-cus ml-auto"
                              >
                                <i
                                  class="fa fa-cloud-download pr-1"
                                  aria-hidden="true"
                                ></i>
                                <span>Download</span>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>{" "}
                        <div className="row mb-2 align-items-center">
                          <div className="col-sm-3 col-5">
                            <h6 className="f-w-500">
                              Gate pass
                              <span className="pull-right">:</span>
                            </h6>
                          </div>
                          <div className="col-sm-9 col-7 d-flex align-items-center">
                            <span className="file-name-box">
                              {state && state?.gatePassL5
                                ? state?.gatePassL5
                                : "N/A"}
                            </span>
                            {state && state?.gatePassL5 ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  download(state.gatePassL5, "gatePass")
                                }
                                class="btn btn-dark  bg-dark-cus ml-auto"
                              >
                                <i
                                  class="fa fa-cloud-download pr-1"
                                  aria-hidden="true"
                                ></i>
                                <span>Download</span>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>{" "}
                        <div className="row mb-2 align-items-center">
                          <div className="col-sm-3 col-5">
                            <h6 className="f-w-500">
                              Delivery Proof
                              <span className="pull-right">:</span>
                            </h6>
                          </div>
                          <div className="col-sm-9 col-7 d-flex align-items-center">
                            <span className="file-name-box">
                              {state && state?.delieveryProofL5
                                ? state?.delieveryProofL5
                                : "N/A"}
                            </span>
                            {state && state?.delieveryProofL5 ? (
                              <button
                                type="button"
                                onClick={(e) =>
                                  download(state.delieveryProofL5, "taxInvoice")
                                }
                                class="btn btn-dark  bg-dark-cus ml-auto"
                              >
                                <i
                                  class="fa fa-cloud-download pr-1"
                                  aria-hidden="true"
                                ></i>
                                <span>Download</span>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary mr-2 tp-cus-btn"
                      onClick={() => history.goBack()}
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
