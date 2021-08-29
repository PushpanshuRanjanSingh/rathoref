import React, {  useState } from "react";
import { Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import base from "../../globals/base";
import Header from "../header/header";
import Footer from "../footer/footer";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import { useForm } from "react-hook-form";

function Index(props) {

  const { register, errors, handleSubmit } = useForm();
  const [personaldata, setpersonaldata] = useState(props);
  const onSubmit = (data) => {

    var newdata = { ...data, ...personaldata.location.data };
  


if(newdata.vehicleToExchanghe){

  if(newdata.vehicleToExchanghe=="yes"){
    props.history.push({
      pathname: "/buying",
      data: newdata,
    });
  }
  else{
    props.history.push({
      pathname: "/Documents",
      data: newdata,
    });
  }

}
else{

  props.history.push({
    pathname: "/Documents",
    data: newdata,
  });

}



  };
  const handleBackRequest = (e) =>{
    e.preventDefault();
    props.history.push({
      pathname: "/address",
      state: { detail: personaldata.location.data}
    });
  }
  return (
    <>
      {/* <Header /> */}

      <div className="content-body">
      <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="container-fluid">


          <div class="row emi_row ">
            <div class="col-lg-12">
              <div class="card widget-stat">
                <div class="card-header bg-custom-blue ">
                  <h4 class="card-title text-white">Buying Details</h4>
                </div>
                <div class="card-body">
                  <div class="form-validation">
                    <Row>
                      <Col sm={6}>
                        <div class="form-group ">
                          <label class="col-form-label" for="val-username">
                            Finance Schemes
                          </label>

                          <select
                            class="form-control"
                            id="exampleFormControlSelect1"
                            ref={register}
                            name='financeSchemes'
                          >
                            <option>Cash</option>
                            <option>Bank Finance</option>
                            <option>Normal Finance</option>
                            <option>Low Interest Finance</option>
                          </select>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div class="form-group ">
                          <label class="col-form-label" for="val-username">
                            Buying Timeline
                          </label>
                          <select
                            class="form-control"
                            id="exampleFormControlSelect1"
                            name='buyingTimeline'
                            ref={register}
                          >
                            <option>5 Days</option>
                            <option>10 Days</option>
                            <option>15 Days</option>

                            <option>1 Month</option>
                            <option>2 months</option>
                            <option>3 months</option>
                          </select>
                        </div>
                      </Col>
                      <Col sm={12} className="d-flex mt-4">
                      <button
                            type="button"
                            className="btn btn-primary mr-2"
                            onClick={(e) => {
                              handleBackRequest(e);
                            }}
                          >
                            Previous
                          </button>
                        
                       
                          <button type="submit" class="btn btn-primary">
                            Next
                          </button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>

    </>
  );
}

export default Index;
