import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default class Dealer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
       {/* <Header/> */}
        <div className="content-body">
          <div className="container-fluid">


            <section className="stage_lead_sec">

              <div className="row dataTables_wrapper">
                <div class="col-lg-12 mt-0">
                  <div class="card">

                    <div class="card-body">
                      <div id="example_filter" class="dataTables_filter d-flex justify-content-end"><input type="search" class="w-30 mr-3" placeholder="" aria-controls="example" /> <a href="#0" class="btn btn-primary rounded d-block">Search</a></div>
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr className="table_th">
                              <th class="width100"><span>S.NO</span></th>
                              <th><span>Vehicle Title/ Name</span></th>
                              <th><span>Vehicle Image</span></th>
                              <th><span>Stage</span></th>
                              <th>Action</th>

                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><strong>01</strong></td>
                              <td>Tata Ace - Diesel-Black</td>
                              <td>  <Image className="table_car_img" alt="img" src={"assets/images/car.png"} /></td>
                              <td>CO</td>


                              <td><span class="badge light badge-success">Update</span></td>

                            </tr>
                            <tr>
                              <td><strong>02</strong></td>
                              <td>Tata Ace - Diesel-Black</td>
                              <td>  <Image className="table_car_img" alt="img" src={"assets/images/car.png"} /></td>
                              <td>CO</td>


                              <td><span class="badge light badge-success">Update</span></td>

                            </tr>
                            <tr>
                              <td><strong>03</strong></td>
                              <td>Tata Ace - Diesel-Black</td>
                              <td>  <Image className="table_car_img" alt="img" src={"assets/images/car.png"} /></td>
                              <td>CO</td>


                              <td><span class="badge light badge-success">Update</span></td>

                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="d-flex justify-content-between mt-3">
                        <div class="dataTables_info pl-3" id="example_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                        <div class="dataTables_paginate paging_simple_numbers" id="example_paginate"><a class="paginate_button previous disabled" aria-controls="example" data-dt-idx="0" tabindex="0" id="example_previous">Previous</a><span><a class="paginate_button current" aria-controls="example" data-dt-idx="1" tabindex="0">1</a><a class="paginate_button " aria-controls="example" data-dt-idx="2" tabindex="0">2</a><a class="paginate_button " aria-controls="example" data-dt-idx="3" tabindex="0">3</a><a class="paginate_button " aria-controls="example" data-dt-idx="4" tabindex="0">4</a><a class="paginate_button " aria-controls="example" data-dt-idx="5" tabindex="0">5</a><a class="paginate_button " aria-controls="example" data-dt-idx="6" tabindex="0">6</a></span><a class="paginate_button next" aria-controls="example" data-dt-idx="7" tabindex="0" id="example_next">Next</a></div>

                      </div>
                    </div>


                  </div>
                </div>

              </div>

            </section>
          </div>
        </div>
        {/* <Footer /> */}
      </>

    );
  }
}
