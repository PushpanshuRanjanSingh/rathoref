import React from "react";
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

function Index(props) {
  if (!props.location.data) {
    props.history.push({
      pathname: "/ongoingDeals",
    });
  }
  
  const [state, setState] = React.useState("");
  // const [id, setid] = React.useState("6062aeb9f3677a12ac4c86b7");
  const [id, setid] = React.useState(props.location.data);
  const fileChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.files[0],
    });
  };

  const saveData = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };

    const data = state;
    data.id = id;
   

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append([key], data[key]);
      }
    });
    // formData.append("confirm", 4);

    axios
      .post(apiUrl + "user/updateStage", formData, headers)
      .then((resp) => {
        props.history.push({
          pathname: "/ongoingDeals",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {/* <Header /> */}
      <div className="content-body">
        <div className="container-fluid">
          <div class="row emi_row ">
            <div class="col-lg-12">
              <div class="card widget-stat">
                <div class="card-header bg-custom-blue ">
                  <h4 class="card-title text-white">Final Stage Document</h4>
                </div>
                <div class="card-body">
                  <div class="form-validation">
                    <Row>
                      <Col sm={6}>
                        <div class="form-group ">
                          <label class="col-form-label" for="val-username">
                            Permit Reciept (pdf/img)
                          </label>

                          <div class="custom-file">
                            <input
                              type="file"
                              name="permitRecieptL5"
                              onChange={fileChange}
                              class="custom-file-input form-control"
                            />
                            <label class="custom-file-label">
                              {" "}
                              {state?.permitRecieptL5?.name
                                ? state.permitRecieptL5?.name
                                : "Choose File"}
                            </label>
                          </div>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div class="form-group ">
                          <label class="col-form-label" for="val-username">
                            Permit Copy (pdf/img)
                          </label>

                          <div class="custom-file">
                            <input
                              type="file"
                              required
                              name="permitCopyL5"
                              onChange={fileChange}
                              class="custom-file-input form-control"
                            />
                            <label class="custom-file-label">
                              {" "}
                              {state?.permitCopyL5?.name
                                ? state.permitCopyL5?.name
                                : "Choose File"}
                            </label>
                          </div>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div class="form-group ">
                          <label class="col-form-label" for="val-username">
                            RC Copy
                          </label>

                          <div class="custom-file">
                            <input
                              type="file"
                              name="rcCopyL5"
                              onChange={fileChange}
                              class="custom-file-input form-control"
                            />
                            <label class="custom-file-label">
                              {" "}
                              {state?.rcCopyL5?.name
                                ? state.rcCopyL5?.name
                                : "Choose File"}
                            </label>
                          </div>
                        </div>
                      </Col>

                      <Col sm={12} className="d-flex mt-3">
                        <Link to="" className="mr-2">
                          {" "}
                          <button type="button" class="btn btn-primary">
                            Previous
                          </button>
                        </Link>
                        {/* <Link className=""> */}{" "}
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={(e) => saveData(e)}
                        >
                          Save
                        </button>
                        {/* </Link> */}
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Index;
