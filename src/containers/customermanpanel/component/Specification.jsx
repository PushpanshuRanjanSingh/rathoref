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
function Addlead() {
  const { register, reset, handleSubmit } = useForm();
  const [State, setState] = useState("");
  const [varientd, setvarientd] = useState([]);
  const [vehicle, setvehicle] = useState([]);
  const [getData, setData] = useState([]);
  const [datacount, setdatacount] = useState();
  const [page, setPage] = useState(1);
  const [item, setItem] = useState([
    {
      title: "",
      description: "",
    },
  ]);
  const [id, setId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [fuel, setFuel] = useState([
    {
      fType: "",
      transmission: "",
      ARAImileage: "",
      cityMileage: "",
      highwayMileage: "",
    },
  ]);

  const [feature, setFeature] = useState({
    powerSteering: false,
    powerWindowsFront: false,
    antiLockBrakingSystem: false,
    airConditioner: false,
    driverAirbag: false,
    passengerAirbag: false,
    automaticClimateControl: false,
    fogLightsFront: false,
    alloyWheels: false,
  });
  useEffect(() => {
    varient();
    getvechicle();
    brandAddedHandle(page);
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

  const handleChange = (e) => {
    const { target } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFeature((prevState) => ({
      ...prevState,
      [target.name]: value,
    }));
  };
  const onSubmit = (data) => {
    data.specification = item;
    for (let key in feature) {
      data[key] = feature[key];
    }
    if (isEdit === true) {
      editForm(data);
      return;
    }
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .post(
        apiUrl + "vehicalDetails/addSpecificationVehicle/" + data?.plName,
        data,
        headers
      )
      .then((resp) => {
        Swal.fire({
          icon: "success",
          title: "Your Data has been saved",
          showConfirmButton: false,
          timer: 2500,
        });
        reset();
       
      });
  };
  const editForm = (data) => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .put(
        apiUrl + "vehicalDetails/updateSpecificationDetails/" + data?.plName,
        data,
        headers
      )
      .then((resp) => {
        Swal.fire({
          icon: "success",
          title: "Your Data has been saved",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  const getForm = (id) => {
    if (id == "") {
      setItem([
        {
          title: "",
          description: "",
        },
      ]);
      setFeature({
        powerSteering: false,
        powerWindowsFront: false,
        antiLockBrakingSystem: false,
        airConditioner: false,
        driverAirbag: false,
        passengerAirbag: false,
        automaticClimateControl: false,
        fogLightsFront: false,
        alloyWheels: false,
      });
      return;
    }
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "vehicalDetails/getSpecificationVehicle/" + id, headers)
      .then((resp) => {
        if (resp.data.data.length > 0) {
          if (resp.data.data[0].specification) {
            var arr = [];
            resp.data.data[0].specification.map((item) => {
              arr.push({
                title: item.title,
                description: item.description,
              });
            });
            setItem(arr);
          }
          setFeature({
            powerSteering: resp.data.data[0].powerSteering
              ? resp.data.data[0].powerSteering
              : false,
            powerWindowsFront: resp.data.data[0].powerWindowsFront
              ? resp.data.data[0].powerWindowsFront
              : false,
            antiLockBrakingSystem: resp.data.data[0].antiLockBrakingSystem
              ? resp.data.data[0].antiLockBrakingSystem
              : false,
            airConditioner: resp.data.data[0].airConditioner
              ? resp.data.data[0].airConditioner
              : false,
            driverAirbag: resp.data.data[0].driverAirbag
              ? resp.data.data[0].driverAirbag
              : false,
            passengerAirbag: resp.data.data[0].passengerAirbag
              ? resp.data.data[0].passengerAirbag
              : false,
            automaticClimateControl: resp.data.data[0].automaticClimateControl
              ? resp.data.data[0].automaticClimateControl
              : false,
            fogLightsFront: resp.data.data[0].fogLightsFront
              ? resp.data.data[0].fogLightsFront
              : false,
            alloyWheels: resp.data.data[0].alloyWheels
              ? resp.data.data[0].alloyWheels
              : false,
          });

         
          setIsEdit(true);
        } else {
          setIsEdit(false);
        }
        
      });
  };

  const deleteRow = (i, e) => {
    e.preventDefault();
    
    let arr = [];
    item.map((data) => {
      arr.push(data);
    });
  
    arr.splice(i, 1);
    setItem(arr);
  };

  const addRow = (e) => {
    e.preventDefault();
    let arr = [];
    item.map((data) => {
      arr.push(data);
    });
    arr.push({
      title: "",
      description: "",
    });
    setItem(arr);
  };

  const changeRow = (i, e) => {
   
    const { target } = e;

    let arr = [];
    item.map((data) => {
      arr.push(data);
    });
    arr[i][target.name] = target.value;
    setItem(arr);
  };

  const trackFunction = (index, element) => {
    return element ? element.hash : null;
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
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid px-0">
        <div class="row emi_row ">
          <div class="col-lg-12">
            <div class="card widget-stat">
              <div class="card-header bg-custom-blue ">
                <h4 class="card-title text-white">Add Specification</h4>
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
                          required
                          name="plName"
                          id="exampleFormControlSelect1"
                          onChange={(e) => {
                            // setId(e.target.value)
                            getForm(e.target.value);
                          }}
                        >
                          <option value="">Select Vehicle</option>
                          {vehicle.length != index &&
                            vehicle.map((options, index) => (
                              <option value={options._id}>
                                {options.plName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <div className="form-group ">
                        <label className="col-form-label" for="val-username">
                          Key Features
                        </label>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="powerSteering"
                          id="exampleCheck1"
                          checked={feature.powerSteering}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" for="exampleCheck1">
                          Power Steering
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="antiLockBrakingSystem"
                          id="exampleCheck2"
                          checked={feature.antiLockBrakingSystem}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" for="exampleCheck2">
                          Anti Lock Braking System
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="driverAirbag"
                          id="exampleCheck3"
                          checked={feature.driverAirbag}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" for="exampleCheck3">
                          Driver Airbag
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="automaticClimateControl"
                          id="exampleCheck4"
                          checked={feature.automaticClimateControl}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" for="exampleCheck4">
                          Automatic Climate Control
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="alloyWheels"
                          id="exampleCheck5"
                          checked={feature.alloyWheels}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" for="exampleCheck5">
                          Alloy Wheels
                        </label>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="powerWindowsFront"
                          id="exampleCheck6"
                          checked={feature.powerWindowsFront}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" for="exampleCheck6">
                          Power Windows Front
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="airConditioner"
                          id="exampleCheck7"
                          checked={feature.airConditioner}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" for="exampleCheck7">
                          Air Conditioner
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="passengerAirbag"
                          id="exampleCheck8"
                          checked={feature.passengerAirbag}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" for="exampleCheck8">
                          Passenger Airbag
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="fogLightsFront"
                          id="exampleCheck9"
                          checked={feature.fogLightsFront}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" for="exampleCheck9">
                          Fog Lights - Front
                        </label>
                      </div>
                    </Col>
                    <br />
                    <br />
                    <Col sm={12}>
                      <div className="form-group ">
                        <label className="col-form-label" for="val-username">
                          Key Specs
                        </label>
                      </div>
                    </Col>
                    <button className="btn btn-primary" onClick={addRow}>
                      {" "}
                      Add row
                    </button>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Value</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.map((o, i) => {
                          return (
                            <tr key={"item-" + i}>
                              <td>
                                <input
                                  type="text"
                                  name="title"
                                  className="form-control"
                                  value={o.title}
                                  onChange={changeRow.bind(this, i)}
                                  tracyBy={trackFunction}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="description"
                                  className="form-control"
                                  value={o.description}
                                  onChange={changeRow.bind(this, i)}
                                />
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={deleteRow.bind(this, i)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

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
        </div>
      </div>
    </form>
  );
}

export default Addlead;
