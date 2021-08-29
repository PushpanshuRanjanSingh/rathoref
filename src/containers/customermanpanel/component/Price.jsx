import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import showNotification from "../../../services/notificationService";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ReactPaginate from "react-paginate";
import apiUrl from "../../../globals/config";
import { Tabs, Tab } from "react-bootstrap-tabs";
import Editor from "../component/Editor";
import Swal from "sweetalert2";
import * as service from "../../../services/apiServices";

function Addlead() {
  const { register, reset, handleSubmit } = useForm();
  const [State, setState] = useState("");
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [getData, setData] = useState([]);
  const [datacount, setdatacount] = useState();
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState("");

  const [formdata, setFormdata] = useState({
    city: "",
    minimumPriceRange: "",
    maximumPriceRange: "",
    plName: "",
  });
  const [id, setId] = useState("");

  const [varientd, setvarientd] = useState([]);
  const [vehicle, setvehicle] = useState([]);

  useEffect(() => {
    varient();
    getvechicle();
  }, []);
  let index = 0;
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
        setvarientd(resp?.data?.data[index].data); //
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
        setvehicle(resp?.data?.data[index].data); //
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
    setSubmitted(true);

    if (
      formdata.plName === "" &&
      formdata.city === "" &&
      formdata.minimumPriceRange === "" &&
      formdata.maximumPriceRange === ""
    ) {
      return false;
    }
    if (edit === true) {
      editForm(data);
      return false;
    }

    service
      .addExShowroomPriceForSpecificCar(data.plName, data)
      .then((resp) => {
        if (resp.data.success) {
          Swal.fire({
            icon: "success",
            title: "Your Data has been saved",
            showConfirmButton: false,
            timer: 2500,
          });
          getListLoad();
        } else {
          showNotification("danger", resp.data.message);
        }
      })
      .catch((err) => {
        showNotification("danger", "This city is already added");
      });
  };
  const getList = (id) => {
    service.getOnRoadPriceForSpecificCar(id).then((resp) => {
      if (resp.data.success) {
        setList(resp.data.data);
      }
    });
  };

  const getListLoad = () => {
    getList(id);
    setFormdata({
      city: "",
      minimumPriceRange: "",
      maximumPriceRange: "",
    });
    setEdit(false);
    setSubmitted(false);
  };
  const handleChangeId = (e) => {
    const { name, value } = e.target;

    if (value === "Select Vehicle") {
      setFormdata({
        city: "",
        minimumPriceRange: "",
        maximumPriceRange: "",
      });

      setList([]);
      setId("");
      return false;
    }
    setId(value);

    getList(value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "plName") {
      handleChangeId(e);
    }

    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const editForm = (data) => {
    service
      .updateExShowroomPriceForSpecificCar(editId, data)
      .then((resp) => {
        if (resp.data.success) {
          Swal.fire({
            icon: "success",
            title: "Your Data has been saved",
            showConfirmButton: false,
            timer: 2500,
          });
          getListLoad();
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  const handleEdit = (item, e) => {
    e.preventDefault();

    setEdit(true);
    setEditId(item._id);
    setFormdata({
      city: item.city,
      minimumPriceRange: item.minimumPriceRange,
      maximumPriceRange: item.maximumPriceRange,
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = (id, e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          service.deleteExShowroomPriceForSpecificCar(id).then((resp) => {
            if (resp.data.success) {
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
              getListLoad();
            }
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    setFormdata({
      city: "",
      minimumPriceRange: "",
      maximumPriceRange: "",
    });
    setEdit(false);
    window.scrollTo(0, 0);
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
        apiUrl + "variant/getVariantListWithBrands?skip=" + page + "&limit=10",
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

  const deleteOne = (id) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .delete(apiUrl + "variant/deleteVariant/" + id, headers)

      .then((resp) => {
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
    <>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="container-fluid px-0">
          <div class="row emi_row ">
            <div class="col-lg-12">
              <div class="card widget-stat">
                <div class="card-header bg-custom-blue ">
                  <h4 class="card-title text-white">Add City Price in india</h4>
                </div>
                <div class="card-body">
                  <div class="form-validation">
                    <Row>
                      <Col sm={6}>
                        <div class="form-group">
                          <label class="col-form-label" for="val-username">
                            Select Vehicle
                          </label>
                          <select
                            class="form-control"
                            ref={register}
                            name="plName"
                            id="exampleFormControlSelect1"
                            onChange={handleChange}
                          >
                            <option>Select Vehicle</option>
                            {vehicle.length != index &&
                              vehicle.map((options, index) => (
                                <option value={options._id}>
                                  {options.plName}
                                </option>
                              ))}
                          </select>
                          {submitted && formdata.plName === "" && (
                            <span className="text-danger">
                              This is required
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div class="form-group ">
                          <label class="col-form-label" for="val-username">
                            City
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="val-username"
                            ref={register}
                            name="city"
                            placeholder="Enter City"
                            value={formdata.city}
                            onChange={handleChange}
                          />
                          {submitted && formdata.city === "" && (
                            <span className="text-danger">
                              This is required
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col sm={6}>
                        {" "}
                        <div class="form-group">
                          <label for="exampleFormControlTextarea1">
                            Minimum Price Range
                          </label>
                          <input
                            class="form-control"
                            ref={register}
                            name="minimumPriceRange"
                            id="exampleFormControlTextarea1"
                            placeholder="Minimum Price Range"
                            value={formdata.minimumPriceRange}
                            onChange={handleChange}
                          />
                          {submitted && formdata.minimumPriceRange === "" && (
                            <span className="text-danger">
                              This is required
                            </span>
                          )}
                        </div>{" "}
                      </Col>
                      <Col sm={6}>
                        {" "}
                        <div class="form-group">
                          <label for="exampleFormControlTextarea1">
                            Maximum Price Range
                          </label>
                          <input
                            class="form-control"
                            ref={register}
                            name="maximumPriceRange"
                            id="exampleFormControlTextarea1"
                            placeholder="Maximum Price Range"
                            value={formdata.maximumPriceRange}
                            onChange={handleChange}
                          />
                          {submitted && formdata.maximumPriceRange === "" && (
                            <span className="text-danger">
                              This is required
                            </span>
                          )}
                        </div>{" "}
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
          </div>
        </div>
      </form>
      <Row>
        <Col sm={12}>
          <button class="btn btn-primary" onClick={handleAdd}>
            Add New
          </button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th> City </th>
                <th> Minimum Price Range</th>
                <th> Maximum Price Range</th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item._id}>
                  <td>{item.city}</td>
                  <td>{item.minimumPriceRange}</td>
                  <td>{item.maximumPriceRange}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={handleEdit.bind(this, item)}
                    >
                      <i className="fa fa-edit"></i>
                    </button>{" "}
                    <button
                      className="btn btn-primary"
                      onClick={handleDelete.bind(this, item._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>

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
                      <span>Vehicle Name</span>
                    </th>
                    <th>
                      <span>City Name</span>
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
                      <td>
                        {data.brands.map((data, index) => (
                          <td>{data.brandName}</td>
                        ))}
                      </td>
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
                       
                        <span
                          class="badge light badge-danger"
                          onClick={() => deleteOne(data._id)}
                        >
                          Delete
                        </span>
                      </td>
                      
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
    </>
  );
}

export default Addlead;
