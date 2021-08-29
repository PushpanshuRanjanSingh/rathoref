import React from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  InputGroup,
  Octicon,
  FormControl,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { Image } from "react-bootstrap";
import base from "../../../globals/base";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { PieChart } from "react-minimal-pie-chart";
import { Line } from "react-chartjs-2";


function Index() {
  const [state, setstate] = React.useState(
    {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Interest",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: [65, 59, 80, 81, 56],
        },
      ],
    }
  )
  return (
    <>
      {/* <Header /> */}
      <div className="content-body">
        <div className="container-fluid">
          <Row className="mb-0"></Row>
          <Row className="mb-0">
            <Col lg={12} className="mb-2">
              <div className="two_btns_ps">
                <button type="button" className="btn btn-primary">
                  <i class="fa fa-print" aria-hidden="true"></i> Print
                </button>
                <button type="button" className="btn btn-success ml-2">
                  <i class="fa fa-share-alt" aria-hidden="true"></i> Share
                </button>
              </div>
              <Tabs
                onSelect={(index, label) => console.log(label + " selected")}
              >
                <Tab label="2 Wheelers">
                  <div className="container-fluid px-0">
                    <Row className="mb-4 emi_row">
                      <Col lg={4}>
                        <div className="widget-stat card">
                          <div className="card-body p-4">
                            <div className="media ai-icon">
                              <Form>
                                <div class="mb-2">
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                  >
                                    <Form.Label column sm="12">
                                      Loan Amount:
                                    </Form.Label>
                                    <Col sm="12">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>₹</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          id="inlineFormInputGroupUsername"
                                          placeholder="25868"
                                        />
                                      </InputGroup>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group controlId="formBasicRange">
                                    <Form.Control type="range" />
                                  </Form.Group>
                                </div>

                                <div class="mb-2">
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                  >
                                    <Form.Label column sm="12">
                                      Interest Rate :
                                    </Form.Label>
                                    <Col sm="12">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          id="inlineFormInputGroupUsername"
                                          placeholder="25868"
                                        />
                                      </InputGroup>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group controlId="formBasicRange">
                                    <Form.Control type="range" />
                                  </Form.Group>
                                </div>
                                <div class="mb-2">
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                  >
                                    <Form.Label column sm="12">
                                      Loan Tenure :
                                    </Form.Label>
                                    <Col sm="12">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>Yr</InputGroup.Text>
                                          <InputGroup.Text className="mo_input">
                                            Mo
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          id="inlineFormInputGroupUsername"
                                          placeholder="12"
                                        />
                                      </InputGroup>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group controlId="formBasicRange">
                                    <Form.Control type="range" />
                                  </Form.Group>
                                </div>
                              </Form>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="widget-stat card">
                          <Card.Header className="bg-custom-blue text-white">
                            Your EMI Details
                          </Card.Header>
                          <div className="card-body p-0">
                            <div className="media ai-icon border_bottom_cus p-cus">
                              <div className="emi-details-box text-left">
                                <p>Loan EMI</p>
                                <h3 className="color_9d font-weight-bold">
                                  ₹5247
                                </h3>
                              </div>
                            </div>
                            <div className="media ai-icon border_bottom_cus p-cus">
                              <div className="emi-details-box text-left">
                                <p>Total Interest Payable</p>
                                <h3 className="color_9d font-weight-bold">
                                  ₹5247
                                </h3>
                              </div>
                            </div>
                            <div className="media ai-icon  p-cus">
                              <div className="emi-details-box text-left">
                                <p>Total Payment (Principal + Interest)</p>
                                <h3 className="color_9d font-weight-bold">
                                  ₹5247
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="widget-stat card">
                          <Link className="" to="/">
                            <div className="card-body p-4">
                              <div className="media ai-icon d-flex justify-content-center flex-column">
                                <PieChart
                                  data={[
                                    {
                                      title: "One",
                                      value: 10,
                                      color: "#E38627",
                                    },
                                    {
                                      title: "Two",
                                      value: 15,
                                      color: "#C13C37",
                                    },
                                    {
                                      title: "Three",
                                      value: 20,
                                      color: "#6A2135",
                                    },
                                  ]}
                                />
                              </div>
                            </div>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab>
                <Tab label="3 Wheelers">
                  <div className="container-fluid px-0">
                    <Row className="mb-4 emi_row">
                      <Col lg={4}>
                        <div className="widget-stat card">
                          <div className="card-body p-4">
                            <div className="media ai-icon">
                              <Form>
                                <div class="mb-2">
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                  >
                                    <Form.Label column sm="12">
                                      Loan Amount:
                                    </Form.Label>
                                    <Col sm="12">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>₹</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          id="inlineFormInputGroupUsername"
                                          placeholder="25868"
                                        />
                                      </InputGroup>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group controlId="formBasicRange">
                                    <Form.Control type="range" />
                                  </Form.Group>
                                </div>

                                <div class="mb-2">
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                  >
                                    <Form.Label column sm="12">
                                      Interest Rate :
                                    </Form.Label>
                                    <Col sm="12">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          id="inlineFormInputGroupUsername"
                                          placeholder="25868"
                                        />
                                      </InputGroup>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group controlId="formBasicRange">
                                    <Form.Control type="range" />
                                  </Form.Group>
                                </div>
                                <div class="mb-2">
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                  >
                                    <Form.Label column sm="12">
                                      Loan Tenure :
                                    </Form.Label>
                                    <Col sm="12">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>Yr</InputGroup.Text>
                                          <InputGroup.Text className="mo_input">
                                            Mo
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          id="inlineFormInputGroupUsername"
                                          placeholder="12"
                                        />
                                      </InputGroup>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group controlId="formBasicRange">
                                    <Form.Control type="range" />
                                  </Form.Group>
                                </div>
                              </Form>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="widget-stat card">
                          <Card.Header className="bg-custom-blue text-white">
                            Your EMI Details
                          </Card.Header>
                          <div className="card-body p-0">
                            <div className="media ai-icon border_bottom_cus p-cus">
                              <div className="emi-details-box text-left">
                                <p>Loan EMI</p>
                                <h3 className="color_9d font-weight-bold">
                                  ₹5247
                                </h3>
                              </div>
                            </div>
                            <div className="media ai-icon border_bottom_cus p-cus">
                              <div className="emi-details-box text-left">
                                <p>Total Interest Payable</p>
                                <h3 className="color_9d font-weight-bold">
                                  ₹5247
                                </h3>
                              </div>
                            </div>
                            <div className="media ai-icon  p-cus">
                              <div className="emi-details-box text-left">
                                <p>Total Payment (Principal + Interest)</p>
                                <h3 className="color_9d font-weight-bold">
                                  ₹5247
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="widget-stat card">
                          <Link className="" to="/">
                            <div className="card-body p-4">
                              <div className="media ai-icon d-flex justify-content-center flex-column">
                                <PieChart
                                  data={[
                                    {
                                      title: "One",
                                      value: 10,
                                      color: "#E38627",
                                    },
                                    {
                                      title: "Two",
                                      value: 15,
                                      color: "#C13C37",
                                    },
                                    {
                                      title: "Three",
                                      value: 20,
                                      color: "#6A2135",
                                    },
                                  ]}
                                />
                              </div>
                            </div>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab>
                <Tab label="4 Wheelers">
                  <div className="container-fluid px-0">
                    <Row className="mb-4 emi_row">
                      <Col lg={4}>
                        <div className="widget-stat card">
                          <div className="card-body p-4">
                            <div className="media ai-icon">
                              <Form>
                                <div class="mb-2">
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                  >
                                    <Form.Label column sm="12">
                                      Loan Amount:
                                    </Form.Label>
                                    <Col sm="12">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>₹</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          id="inlineFormInputGroupUsername"
                                          placeholder="25868"
                                        />
                                      </InputGroup>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group controlId="formBasicRange">
                                    <Form.Control type="range" />
                                  </Form.Group>
                                </div>

                                <div class="mb-2">
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                  >
                                    <Form.Label column sm="12">
                                      Interest Rate :
                                    </Form.Label>
                                    <Col sm="12">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          id="inlineFormInputGroupUsername"
                                          placeholder="25868"
                                        />
                                      </InputGroup>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group controlId="formBasicRange">
                                    <Form.Control type="range" />
                                  </Form.Group>
                                </div>
                                <div class="mb-2">
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                  >
                                    <Form.Label column sm="12">
                                      Loan Tenure :
                                    </Form.Label>
                                    <Col sm="12">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>Yr</InputGroup.Text>
                                          <InputGroup.Text className="mo_input">
                                            Mo
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          id="inlineFormInputGroupUsername"
                                          placeholder="12"
                                        />
                                      </InputGroup>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group controlId="formBasicRange">
                                    <Form.Control type="range" />
                                  </Form.Group>
                                </div>
                              </Form>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="widget-stat card">
                          <Card.Header className="bg-custom-blue text-white">
                            Your EMI Details
                          </Card.Header>
                          <div className="card-body p-0">
                            <div className="media ai-icon border_bottom_cus p-cus">
                              <div className="emi-details-box text-left">
                                <p>Loan EMI</p>
                                <h3 className="color_9d font-weight-bold">
                                  ₹5247
                                </h3>
                              </div>
                            </div>
                            <div className="media ai-icon border_bottom_cus p-cus">
                              <div className="emi-details-box text-left">
                                <p>Total Interest Payable</p>
                                <h3 className="color_9d font-weight-bold">
                                  ₹5247
                                </h3>
                              </div>
                            </div>
                            <div className="media ai-icon  p-cus">
                              <div className="emi-details-box text-left">
                                <p>Total Payment (Principal + Interest)</p>
                                <h3 className="color_9d font-weight-bold">
                                  ₹5247
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="widget-stat card">
                          <Link className="" to="/">
                            <div className="card-body p-4">
                              <div className="media ai-icon d-flex justify-content-center flex-column">
                                <PieChart
                                  data={[
                                    {
                                      title: "One",
                                      value: 10,
                                      color: "#E38627",
                                    },
                                    {
                                      title: "Two",
                                      value: 15,
                                      color: "#C13C37",
                                    },
                                    {
                                      title: "Three",
                                      value: 20,
                                      color: "#6A2135",
                                    },
                                  ]}
                                />
                              </div>
                            </div>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab>
                <Tab label="6+ Wheelers">
                  <div className="container-fluid px-0">
                    <Row className="mb-4 emi_row">
                      <Col lg={4}>
                        <div className="widget-stat card">
                          <div className="card-body p-4">
                            <div className="media ai-icon">
                              <Form>
                                <div class="mb-2">
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                  >
                                    <Form.Label column sm="12">
                                      Loan Amount:
                                    </Form.Label>
                                    <Col sm="12">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>₹</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          id="inlineFormInputGroupUsername"
                                          placeholder="25868"
                                        />
                                      </InputGroup>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group controlId="formBasicRange">
                                    <Form.Control type="range" />
                                  </Form.Group>
                                </div>

                                <div class="mb-2">
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                  >
                                    <Form.Label column sm="12">
                                      Interest Rate :
                                    </Form.Label>
                                    <Col sm="12">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          id="inlineFormInputGroupUsername"
                                          placeholder="25868"
                                        />
                                      </InputGroup>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group controlId="formBasicRange">
                                    <Form.Control type="range" />
                                  </Form.Group>
                                </div>
                                <div class="mb-2">
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextPassword"
                                  >
                                    <Form.Label column sm="12">
                                      Loan Tenure :
                                    </Form.Label>
                                    <Col sm="12">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>Yr</InputGroup.Text>
                                          <InputGroup.Text className="mo_input">
                                            Mo
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                          id="inlineFormInputGroupUsername"
                                          placeholder="12"
                                        />
                                      </InputGroup>
                                    </Col>
                                  </Form.Group>

                                  <Form.Group controlId="formBasicRange">
                                    <Form.Control type="range" />
                                  </Form.Group>
                                </div>
                              </Form>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="widget-stat card">
                          <Card.Header className="bg-custom-blue text-white">
                            Your EMI Details
                          </Card.Header>
                          <div className="card-body p-0">
                            <div className="media ai-icon border_bottom_cus p-cus">
                              <div className="emi-details-box text-left">
                                <p>Loan EMI</p>
                                <h3 className="color_9d font-weight-bold">
                                  ₹5247
                                </h3>
                              </div>
                            </div>
                            <div className="media ai-icon border_bottom_cus p-cus">
                              <div className="emi-details-box text-left">
                                <p>Total Interest Payable</p>
                                <h3 className="color_9d font-weight-bold">
                                  ₹5247
                                </h3>
                              </div>
                            </div>
                            <div className="media ai-icon  p-cus">
                              <div className="emi-details-box text-left">
                                <p>Total Payment (Principal + Interest)</p>
                                <h3 className="color_9d font-weight-bold">
                                  ₹5247
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="widget-stat card">
                          <Link className="" to="/">
                            <div className="card-body p-4">
                              <div className="media ai-icon d-flex justify-content-center flex-column">
                                <PieChart
                                  data={[
                                    {
                                      title: "One",
                                      value: 10,
                                      color: "#E38627",
                                    },
                                    {
                                      title: "Two",
                                      value: 15,
                                      color: "#C13C37",
                                    },
                                    {
                                      title: "Three",
                                      value: 20,
                                      color: "#6A2135",
                                    },
                                  ]}
                                />
                              </div>
                            </div>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab>
              </Tabs>
            </Col>
          </Row>

          <Row className="emi_row ">
            <Col lg={12}>
              <div className="widget-stat card">
                <div className="card-body p-4">
                  <Row className="formgroup mb-5">
                    <Col sm={6} className="emi_cal_txt">
                      Schedule showing EMI payments starting from
                    </Col>

                    <Col sm={6}>
                      <div class="form-group mb-0 w-260">
                        <div class="input-group date" id="datetimepicker1">
                          <input type="date" class="form-control" />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col sm={12}>
                      <div>
                        <Line
                          data={state}
                          options={{
                            title: {
                              display: true,
                              text: "Emi payment loan graph",
                              fontSize: 20,
                            },
                            legend: {
                              display: true,
                              position: "right",
                            },
                          }}
                        />
                      </div>
                    </Col>
                  </Row>

                  <div class="table-responsive">
                    <table class="table table-responsive-md table_cus_52">
                      <thead>
                        <tr className="table_th">
                          <th class="width100">
                            <span>Year</span>
                          </th>
                          <th>
                            <span>Principal (A)</span>
                          </th>
                          <th>
                            <span>Interest (B)</span>
                          </th>
                          <th>
                            <span>Total Payment (A + B)</span>
                          </th>
                          <th>
                            <span>Balance</span>
                          </th>
                          <th>
                            <span>Loan Paid To Date</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            data-toggle="collapse"
                            data-target="#demo"
                            className="collapsed icon_show d-flex align-items-center"
                            aria-expanded="false"
                          >
                            <i class=" mr-2 fa fa-plus"></i>
                            <i class="fa fa-minus mr-2"></i>
                            2021
                          </td>
                          <td>₹ 44,333</td>
                          <td>₹ 3,05,100</td>
                          <td>₹ 3,49,433</td>
                          <td>₹ 49,55,667</td>
                          <td>
                            <span class="badge light badge-success">0.89%</span>
                          </td>
                        </tr>

                        <tr id="demo" class="collapse">
                          <td colspan="6" className="cus_td">
                            <div classname="">
                              <div class="table-responsive">
                                <table class="table table-responsive-md table_cus_52">
                                  <thead className="vs-hi">
                                    <tr>
                                      <th class="width80">Year</th>
                                      <th>Principal (A)</th>
                                      <th>Interest (B)</th>
                                      <th>Total Payment (A + B)</th>
                                      <th>Balance</th>
                                      <th>Loan Paid To Date</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="width80">Mar</td>
                                      <td>₹ 44,333</td>
                                      <td>₹ 3,05,100</td>
                                      <td>₹ 3,49,433</td>
                                      <td>₹ 49,55,667</td>
                                      <td>
                                        <span class="badge light badge-success">
                                          0.89%
                                        </span>
                                      </td>
                                    </tr>

                                    <tr>
                                      <div classname=""></div>
                                    </tr>
                                    <tr>
                                      <td>Apr</td>
                                      <td>₹ 44,333</td>
                                      <td>₹ 3,05,100</td>
                                      <td>₹ 3,49,433</td>
                                      <td>₹ 49,55,667</td>
                                      <td>
                                        <span class="badge light badge-success">
                                          0.89%
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>May</td>
                                      <td>₹ 44,333</td>
                                      <td>₹ 3,05,100</td>
                                      <td>₹ 3,49,433</td>
                                      <td>₹ 49,55,667</td>
                                      <td>
                                        <span class="badge light badge-success">
                                          0.89%
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Jun</td>
                                      <td>₹ 44,333</td>
                                      <td>₹ 3,05,100</td>
                                      <td>₹ 3,49,433</td>
                                      <td>₹ 49,55,667</td>
                                      <td>
                                        <span class="badge light badge-success">
                                          0.89%
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Index;
