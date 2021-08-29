import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import showNotification from "../../../services/notificationService";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ReactPaginate from "react-paginate";
import apiUrl from "../../../globals/config";
import { Tabs, Tab } from "react-bootstrap-tabs";
function Addlead() {
  const { register, reset, handleSubmit } = useForm();
  const [bandName, setbandName] = useState([]);
  const [State, setState] = useState("");
  const [getData, setData] = useState([]);
  const [datacount, setdatacount] = useState();
  const [page, setPage] = useState(1);
  useEffect(() => {
    getBrand();
    brandPPLHandle(page);
  }, []);
  let index = 0;
  const getBrand = () => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "brand/getBrandList?skip=1&limit=2000", headers)

      .then((resp) => {
        setbandName(resp?.data?.data[index].data);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const fileChange = (e) => {
    setState({
      ...State,
      [e.target.name]: e.target.files[index],
    });
  };
  const onSubmit = (data) => {
    // const formData = new FormData();
    // Object.keys(data).forEach((key) => {
    //   if (data[key]) {
    //     formData.append([key], data[key]);
    //   }
    // });
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios.post(apiUrl + "ppl/addPpl", data, headers).then((resp) => {
      Swal.fire({
        icon: "success",
        title: "Your Data has been saved",
        showConfirmButton: false,
        timer: 2500,
      });
      brandPPLHandle(page);
      reset();
      setState("");
    });
  };

  const brandPPLHandle = (page) => {
  
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + "ppl/getPplListWithBrands?skip=" + page + "&limit=10",
        headers
      )
      .then((response) => {
        
        let data = response?.data?.data[0].data;
        setData(data);
        setdatacount(response?.data?.data[0].count);
      })
      .catch(function (error) {
        showNotification("danger", error.message);
      });
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...State,
      [evt.target.name]: value,
    });
  };
  const deleteOne = (id) => {
   
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .delete(apiUrl + "ppl/deletePpl/" + id, headers)

      .then((resp) => {
  
        Swal.fire({
          icon: "success",
          title: "Your Data has been saved",
          showConfirmButton: false,
          timer: 2500,
        });
        brandPPLHandle(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid px-0">
        <div class="row emi_row ">
          <div class="col-lg-12">
            <div class="card widget-stat">
              <div class="card-header bg-custom-blue ">
                <h4 class="card-title text-white">Add PPL</h4>
              </div>
              <div class="card-body">
                <div class="form-validation">
                  <Row>
                    <Col sm={6}>
                      <div class="form-group">
                        <label class="col-form-label" for="val-username">
                          Select Brand
                        </label>
                        <select
                          class="form-control"
                          onChange={handleChange}
                          ref={register}
                          required
                          name="brandId"
                          id="exampleFormControlSelect1"
                        >
                          {bandName.length != index &&
                            bandName.map((options, index) => (
                              <option value={options._id}>
                                {options.brandName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </Col>

                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          PPL Name
                        </label>
                        <input
                          type="text"
                          ref={register}
                          class="form-control"
                          id="val-username"
                          ref={register}
                          required
                          name="pplName"
                          placeholder="Enter a PPL name.."
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Type
                        </label>
                        <input
                          type="text"
                          ref={register}
                          class="form-control"
                          id="val-username"
                          ref={register}
                          required
                          name="type"
                          placeholder="Enter Vehicle Type"
                        />
                      </div>
                    </Col>
                    <Col sm={12} className="d-flex mt-3 mb-2">
                      <button type="submit" class="btn btn-primary">
                        Save
                      </button>
                    </Col>
                  </Row>
                </div>
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
                          <span>Brand Name</span>
                        </th>
                        <th>
                          <span>Type</span>
                        </th>
                        <th>
                          <span>PPL Name</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getData.map((data, index) => (
                        <tr>
                          <td>
                            {" "}
                            <strong>{(page - 1) * 10 + index + 1}</strong>
                          </td>
                          <td>
                            {data.brands.map((data, index) => (
                              <td>{data.brandName}</td>
                            ))}
                          </td>
                          <td>{data.type}</td>
                          <td>{data.pplName}</td>

                          <td>
                            {/* <span class="badge light badge-success mr-1">
                                Edit
                              </span> */}
                            <span
                              class="badge light badge-danger"
                              onClick={() => deleteOne(data._id)}
                            >
                              Delete
                            </span>
                          </td>
                          {/* <td class="download-icon">
                        <a href="#0">
                          <i
                            class="fa fa-download"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </td> */}
                        </tr>
                      ))}{" "}
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
                    Showing 1 to 10 {datacount} of entries
                  </div>
                  <div
                    class="dataTables_paginate paging_simple_numbers"
                    id="example_paginate"
                  >
                    {datacount > 10 ? (
                      <ReactPaginate
                        previousLabel={"←Previous"}
                        nextLabel={"Next→"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(datacount / 10)}
                        initialPage={0}
                        marginPagesDisplayed={5}
                        onPageChange={(data) => handlePageClick(data)}
                        containerClassName={"pagination m-0"}
                        subContainerClassName={"pages pagination"}
                        pageClassName="page-item"
                        activeClassName={"active"}
                        activeLinkClassName={"page-link"}
                        pageLinkClassName={"page-link"}
                        nextClassName={"page-link arrow text-danger"}
                        previousLinkClassName={"page-link arrow"}
                        disableInitialCallback={true}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Addlead;
