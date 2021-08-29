import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import base from "../../globals/base";
import Header from "../header/header";
import Footer from "../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Line } from "react-chartjs-2";


function Reprot() {
  const [state, setState] = React.useState(
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
    {/* <Header/> */}
     <div className="content-body">
       <div className="container-fluid">
         <section className="stage_lead_sec">
           <div className="row dataTables_wrapper">
             <div class="col-lg-12">
               <div class="d-block pb-0 border-0">
                 <div class="mr-auto pr-3">
                   <h4 class="text-black font-w600 fs-20">Reports</h4>
                 </div>
               </div>
             </div>
             <div class="col-lg-12 mt-0">
               <div class="card">
                 <div class="card-body">
                   <div
                     id="example_filter"
                     class="dataTables_filter d-flex justify-content-end"
                   >
                     <input
                       type="search"
                       class="w-30 mr-3"
                       placeholder=""
                       aria-controls="example"
                     />{" "}
                     <a href="#0" class="btn btn-primary rounded d-block">
                       Search
                     </a>
                   </div>
                   <div class="table-responsive">
                     <table class="table">
                       <thead>
                         <tr className="table_th">
                           <th class="width100">
                             <span>S.NO</span>
                           </th>
                           <th>
                             <span>Full Name</span>
                           </th>
                           <th>
                             <span>Contact Number</span>
                           </th>
                           <th>
                             <span>Prospected Vehicle</span>
                           </th>
                           <th>
                             <span>Stage</span>
                           </th>
                           <th>Action</th>
                         </tr>
                       </thead>
                       <tbody>
                         <tr>
                           <td>
                             <strong>01</strong>
                           </td>
                           <td>Mr. Bobby</td>
                           <td>1234567891</td>
                           <td>Tata Ace - Diesel-Black</td>

                           <td>CO</td>
                           <td>
                             <span class="badge light badge-success mr-1">
                               Update
                             </span>
                             <span class="badge light badge-danger">
                               Delete
                             </span>
                           </td>
                         </tr>
                         <tr>
                           <td>
                             <strong>01</strong>
                           </td>
                           <td>Mr. Bobby</td>
                           <td>1234567891</td>
                           <td>Tata Ace - Diesel-Black</td>

                           <td>CO</td>
                           <td>
                             <span class="badge light badge-success mr-1">
                               Update
                             </span>
                             <span class="badge light badge-danger">
                               Delete
                             </span>
                           </td>
                         </tr>
                         <tr>
                           <td>
                             <strong>01</strong>
                           </td>
                           <td>Mr. Bobby</td>
                           <td>1234567891</td>
                           <td>Tata Ace - Diesel-Black</td>

                           <td>CO</td>
                           <td>
                             <span class="badge light badge-success mr-1">
                               Update
                             </span>
                             <span class="badge light badge-danger">
                               Delete
                             </span>
                           </td>
                         </tr>
                       </tbody>
                     </table>
                   </div>
                   <div class="d-flex justify-content-between mt-3">
                     <div
                       class="dataTables_info pl-3"
                       id="example_info"
                       role="status"
                       aria-live="polite"
                     >
                       Showing 1 to 10 of 57 entries
                     </div>
                     <div
                       class="dataTables_paginate paging_simple_numbers"
                       id="example_paginate"
                     >
                       <a
                         class="paginate_button previous disabled"
                         aria-controls="example"
                         data-dt-idx="0"
                         tabindex="0"
                         id="example_previous"
                       >
                         Previous
                       </a>
                       <span>
                         <a
                           class="paginate_button current"
                           aria-controls="example"
                           data-dt-idx="1"
                           tabindex="0"
                         >
                           1
                         </a>
                         <a
                           class="paginate_button "
                           aria-controls="example"
                           data-dt-idx="2"
                           tabindex="0"
                         >
                           2
                         </a>
                         <a
                           class="paginate_button "
                           aria-controls="example"
                           data-dt-idx="3"
                           tabindex="0"
                         >
                           3
                         </a>
                         <a
                           class="paginate_button "
                           aria-controls="example"
                           data-dt-idx="4"
                           tabindex="0"
                         >
                           4
                         </a>
                         <a
                           class="paginate_button "
                           aria-controls="example"
                           data-dt-idx="5"
                           tabindex="0"
                         >
                           5
                         </a>
                         <a
                           class="paginate_button "
                           aria-controls="example"
                           data-dt-idx="6"
                           tabindex="0"
                         >
                           6
                         </a>
                       </span>
                       <a
                         class="paginate_button next"
                         aria-controls="example"
                         data-dt-idx="7"
                         tabindex="0"
                         id="example_next"
                       >
                         Next
                       </a>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </section>
       </div>
     </div>
   </>

  )
}

export default Reprot

