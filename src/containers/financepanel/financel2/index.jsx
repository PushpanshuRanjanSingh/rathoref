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
  const [inputfile, setinputfile] = React.useState("Choose File");
  const [userid, setuserid] = React.useState(props.location.data);
  function funsetinputfile(e) {
    setinputfile(e.target.files[0])
  
  }
  function saveData(){
    
    const formData = new FormData();

    formData.append("userid", userid);
    formData.append("financeDo", inputfile);
    formData.append("confirm", 3);
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .post(apiUrl + "user/updateLead", formData, headers)
      .then((resp) => {
        props.history.push({
          pathname: "/doreadyclients",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
    {/* <Header /> */}
      <div className="content-body">
        <div className="container-fluid">
          <div class="row emi_row ">
            <div class="col-lg-12">
              <div class="card widget-stat">
                <div class="card-header bg-custom-blue ">
                  <h4 class="card-title text-white">Finance</h4>
                </div>
                <div class="card-body">
                  <div class="form-validation">
                    <Row>
                      <Col sm={6}>
                        <div class="form-group ">
                          <label class="col-form-label" for="val-username">
                            Finance DO
                          </label>

                          <div class="custom-file">
                            <input
                              type="file"
                              name="financeDo"
                              onChange={(e) =>
                                funsetinputfile(e)
                              }
                              class="custom-file-input form-control"
                            />
                            <label class="custom-file-label">
                              {inputfile?.name||inputfile}
                            </label>
                          </div>
                        </div>
                      </Col>

                      <Col sm={12} className="d-flex mt-3">
                        <Link className="mr-2">
                          {" "}
                          <button
                            type="button"
                            // onClick={back}
                            class="btn btn-primary"
                          >
                            Previous
                          </button>
                        </Link>
                        <Link className="">
                          {" "}
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={() => saveData()}
                          >
                            Save
                          </button>
                        </Link>
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
