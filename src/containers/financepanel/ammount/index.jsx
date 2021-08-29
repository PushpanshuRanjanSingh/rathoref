import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import apiUrl from "../../../globals/config";
import axios from "axios";
function Index(props) {
  if(!props.location.data){
    props.history.push({
      pathname: "/",
    });
  }
  const [ammount, setammount] = React.useState(props.location.data);
  // const [ammount, setammount] = React.useState(123);
  return (
    <>
       {/* <Header /> */}
        <div className="content-body">
          <div className="container-fluid">
            <div class="row emi_row ">
              <div class="col-lg-12">
                <div class="card widget-stat">
                  <div class="card-header bg-custom-blue ">
                    <h4 class="card-title text-white">Approved Amount</h4>
                  </div>
                  <div class="card-body">
                    <div class="form-validation">
                      <Row>
                        <Col sm={6}>
                          <div class="form-group ">
                            <label class="col-form-label" for="val-username">
                              Amount
                            </label>
                            <input
                              type="text"
                              disabled
                              class="form-control"
                              id="val-username"
                              name="chassisNumberL1"
                              value={`₹ ${ammount}`}
                            />
                          </div>
                        </Col>

                        <Col sm={12} className="d-flex mt-3">
                          <Link to="/reviewedclients" className="mr-2">
                            {" "}
                            <button
                              type="submit"
                              // onClick={back}
                              class="btn btn-primary"
                            >
                              Previous
                            </button>
                          </Link>
                          {/* <Link className="">
                          {" "}
                          <button
                            type="submit"
                            class="btn btn-primary"
                            // onClick={() => this.saveData()}
                          >
                            Save
                          </button>
                        </Link> */}
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
