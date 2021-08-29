import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import showNotification from "../../../services/notificationService";
import { ErrorMessage } from "@hookform/error-message";
import ReactPaginate from "react-paginate";
import apiUrl from "../../../globals/config";
import { Tabs, Tab } from "react-bootstrap-tabs";
import Editor from "../component/Editor";
import Swal from "sweetalert2";
function Addlead() {
  const { register, reset, handleSubmit } = useForm();
  const [State, setState] = useState("");
  const [varientd, setvarientd] = useState([]);
  const [vehicle, setvehicle] = useState([]);
  const [getData, setData] = useState([]);
  const [datacount, setdatacount] = useState();
  const [page, setPage] = useState(1);
  useEffect(() => {
    varient();
    getvechicle();
    brandAddedHandle(page);
  }, []);
  const varient = () => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "variant/getVariantList?skip=1&limit=2000", headers) //findbyRole/0?skip=1&limit=90

      .then((resp) => {
        setvarientd(resp?.data?.data[0].data); //
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const getvechicle = () => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "addVehicle/getVehicleData?skip=1&limit=2000", headers) //findbyRole/0?skip=1&limit=90

      .then((resp) => {
        setvehicle(resp?.data?.data[0].data); //
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const fileChange = (e) => {
    setState({
      ...State,
      [e.target.name]: e.target.files[0],
    });
  };
  const onSubmit = (data) => {
    if (data?.colorVariantImages)
      data.colorVariantImages = data?.colorVariantImages[0];
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append([key], data[key]);
      }
    });
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .post(apiUrl + "utility/addUtilityVehicle", formData, headers)
      .then((resp) => {
        Swal.fire({
          icon: "success",
          title: "Your Data has been saved",
          showConfirmButton: false,
          timer: 2500,
        });
        reset();
        brandAddedHandle(page);
        setState("");
      });
  };
  const brandAddedHandle = (page) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl +
          "utility/getUtilityVehicleListWithOtherDetails?skip=" +
          page +
          "&limit=10",
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
      .delete(apiUrl + "utility/deleteUtilityVehicle/" + id, headers)

      .then((resp) => {
        Swal.fire({
          icon: "success",
          title: "Your Data has been saved",
          showConfirmButton: false,
          timer: 2500,
        });
        brandAddedHandle(1);
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
                <h4 class="card-title text-white">Add Utility Vehicle</h4>
              </div>
              <div class="card-body">
                <div class="form-validation">
                  <Row>
                    <Col sm={6}>
                      <div class="form-group">
                        <label class="col-form-label" for="val-username">
                          Select Variant
                        </label>
                        <select
                          class="form-control"
                          ref={register}
                          required
                          name="selectVariant"
                          id="exampleFormControlSelect1"
                        >
                          {varientd.length != 0 &&
                            varientd.map((options, index) => (
                              <option value={options._id}>
                                {options.variantName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Utility Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="val-username"
                          required
                          ref={register}
                          name="utilityName"
                          placeholder="Enter a Utility Name .."
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group">
                        <label class="col-form-label" for="val-username">
                          Select Vehicle
                        </label>
                        <select
                          class="form-control"
                          ref={register}
                          required
                          name="vehicleName"
                          id="exampleFormControlSelect1"
                        >
                          {vehicle.length != 0 &&
                            vehicle.map((options, index) => (
                              <option value={options._id}>
                                {options.vehicleName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Colour Variant Images
                        </label>

                        <div class="custom-file mb-3">
                          <input
                            type="file"
                            ref={register}
                            required
                            class="custom-file-input"
                            id="customFile"
                            name="colorVariantImages"
                            onChange={fileChange}
                          />
                          <label class="custom-file-label" for="customFile">
                            {State?.colorVariantImages?.name
                              ? State?.colorVariantImages?.name
                              : "Choose File"}
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Other Image
                        </label>

                        <div class="custom-file mb-3">
                          <input
                            type="file"
                            class="custom-file-input"
                            id="customFile"
                            required
                            onChange={fileChange}
                            name="otherImage"
                            multiple
                          />
                          <label class="custom-file-label" for="customFile">
                            {State?.otherImage?.name
                              ? State?.otherImage?.name + "..."
                              : "Choose File"}
                          </label>
                        </div>
                      </div>
                    </Col>
                    {/* <Col sm={6} className='d-flex align-items-center '>
                      <button
                        type='submit'
                        class='btn btn-primary btn-cus-add-img'>
                        Add Other Image
                      </button>
                    </Col>
                     */}
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Add Video Link
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="val-username"
                          ref={register}
                          required
                          name="addVideoLink"
                          placeholder="Enter Video Link.."
                        />
                      </div>
                    </Col>
                    <Col sm={12}>
                      {/* <Editor /> */}
                      <Editor onEditorStateChange={(e) => {}} />
                      
                    </Col>
                   
                    <br className="" />
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Add Title
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="val-username"
                          ref={register}
                          required
                          name="addTitle"
                          placeholder="Enter a title name.."
                        />
                      </div>
                    </Col>
                    
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          SKU/VCM
                        </label>
                        <input
                          type="text"
                          ref={register}
                          required
                          class="form-control"
                          id="val-username"
                          name="skuVcm"
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Ex-Showroom Price
                        </label>
                        <input
                          type="text"
                          ref={register}
                          class="form-control"
                          id="val-username"
                          required
                          name="exShowroomPrice"
                          placeholder="Enter a ex-showroom price .."
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Insurance Price
                        </label>
                        <input
                          type="text"
                          ref={register}
                          class="form-control"
                          required
                          id="val-username"
                          name="insurancePrice"
                          placeholder="Enter a insurance price .."
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Cashback
                        </label>
                        <input
                          type="text"
                          ref={register}
                          required
                          class="form-control"
                          id="val-username"
                          name="cashBack"
                          placeholder="Enter a Cashback.."
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Agent earning S1
                        </label>
                        <input
                          type="text"
                          ref={register}
                          required
                          class="form-control"
                          id="val-username"
                          name="agentEarningS1"
                          placeholder="Enter a agent earning.."
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Agent earning S5
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="val-username"
                          ref={register}
                          required
                          name="agentEarningS5"
                          name="val-username"
                          placeholder="Enter a agent earning.."
                        />
                      </div>
                    </Col>
                    <Col sm={12} className="d-flex mt-3 mb-2">
                      {/* <Link className='' to='/vehicleInformation'> */}{" "}
                      <button type="submit" class="btn btn-primary">
                        Save
                      </button>{" "}
                      {/* </Link> */}
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
                          <span>PPL</span>
                        </th>
                        <th>
                          <span>Vehicle Name</span>
                        </th>
                        <th>
                          <span>PL Name</span>
                        </th>
                        <th>
                          <span>Wheel</span>
                        </th>
                        <th>
                          <span>Max. Price</span>
                        </th>
                        <th>
                          <span>Min. Price</span>
                        </th>
                        <th>
                          <span>Action</span>
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
                          <td></td>
                          <td>
                            <td>{data.variantName}</td>
                          </td>
                          <td>
                            <td>{data.brandName}</td>
                          </td>
                          <td>
                            <td>{data.brandName}</td>
                          </td>
                          <td>
                            <td>{data.brandName}</td>
                          </td>
                          <td>
                            <td>{data.brandName}</td>
                          </td>
                          <td>
                            <td>{data.brandName}</td>
                          </td>
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
