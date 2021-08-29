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
import Swal from "sweetalert2";
// import Editor from '../component/Editor';
// import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import Editor from "../component/Editor";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function Addlead() {
  const { register, reset, handleSubmit } = useForm();
  const [State, setState] = useState("");
  const [otherImage, setotherImage] = useState("");
  const [getppl, setgetppl] = useState([]);
  const [imagename, setimagename] = useState("");
  const [getData, setData] = useState([]);
  const [datacount, setdatacount] = useState();
  const [page, setPage] = useState(1);
  const [description, setDescription] = useState("");
  useEffect(() => {
    getppll();
    brandAddedHandle(page);
  }, []);
  let index = 0;
  const getppll = () => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "ppl/getPplList?skip=1&limit=200", headers)

      .then((resp) => {
        setgetppl(resp?.data?.data[index].data); //
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
    if (data?.primaryImage) data.primaryImage = data?.primaryImage[index];
    if (data?.addIcon) data.addIcon = data?.addIcon[index];

    // if (description)
    //   data.description = JSON.stringify(
    //     convertToRaw(description.getCurrentContent())
    //   );
    if (description) data.description = description;

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        if (key != "otherImage") {
          formData.append([key], data[key]);
        }
      }
    });

    for (let i = index; i < otherImage.length; i++) {
      formData.append("otherImage", otherImage[i]);
    }

    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .post(apiUrl + "addVehicle/addVehicleData", formData, headers)
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
      })
      .catch(function (error) {
        showNotification("danger", error.message);
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
        apiUrl + "addVehicle/getVehicleData?skip=" + page + "&limit=10",
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
      .delete(apiUrl + "addVehicle/deleteVehicleData/" + id, headers)

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
                <h4 class="card-title text-white">Add Vehicle</h4>
              </div>
              <div class="card-body">
                <div class="form-validation">
                  <Row>
                    <Col sm={6}>
                      <div class="form-group">
                        <label class="col-form-label" for="val-username">
                          Select PPL
                        </label>
                        <select
                          class="form-control"
                          ref={register}
                          required
                          name="selectPplId"
                          id="exampleFormControlSelect1"
                        >
                          {getppl.length != index &&
                            getppl.map((options, index) => (
                              <option value={options._id}>
                                {options.pplName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Vehicle Name
                        </label>
                        <input
                          type="text"
                          ref={register}
                          class="form-control"
                          id="val-username"
                          required
                          name="vehicleName"
                          placeholder="Enter a vehicle name.."
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          PL Name
                        </label>
                        <input
                          type="text"
                          ref={register}
                          class="form-control"
                          id="val-username"
                          required
                          name="plName"
                          placeholder="Enter a PL name.."
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Wheel
                        </label>
                        <input
                          type="text"
                          ref={register}
                          class="form-control"
                          id="val-username"
                          required
                          name="wheel"
                          placeholder="Enter wheel"
                        />
                      </div>
                    </Col>

                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Maximum Price
                        </label>
                        <input
                          type="number"
                          ref={register}
                          class="form-control"
                          required
                          id="val-username"
                          name="maximumPriceRange"
                          placeholder="Enter  Maximum Price..."
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Minimum Price
                        </label>
                        <input
                          type="number"
                          ref={register}
                          class="form-control"
                          required
                          id="val-username"
                          name="minimumPriceRange"
                          placeholder="Minimum Price"
                        />
                      </div>
                    </Col>

                  

                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Primary Image
                        </label>

                        <div class="custom-file mb-3">
                          <input
                            type="file"
                            class="custom-file-input"
                            id="customFile"
                            ref={register}
                            required
                            onChange={fileChange}
                            name="primaryImage"
                          />
                          <label class="custom-file-label" for="customFile">
                            {State?.primaryImage?.name
                              ? State?.primaryImage?.name
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
                            required
                            class="custom-file-input"
                            id="customFile"
                            onChange={(e) => {
                              setotherImage(e.target.files);

                              let data = "";
                              Object.keys(e.target.files).forEach((key) => {
                                if (data == "") {
                                  data = data + e.target.files[key].name;
                                } else {
                                  data = data + "," + e.target.files[key].name;
                                }
                                setimagename(data);
                              });
                            }}
                            name="otherImage"
                            multiple
                          />
                          <label class="custom-file-label" for="customFile">
                            {imagename ? imagename : "Choose File"}
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Add Icon
                        </label>

                        <div class="custom-file mb-3">
                          <input
                            type="file"
                            ref={register}
                            class="custom-file-input"
                            id="customFile"
                            required
                            name="addIcon"
                            onChange={fileChange}
                          />
                          <label class="custom-file-label" for="customFile">
                            {State?.addIcon?.name
                              ? State?.addIcon?.name
                              : "Choose File"}
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="form-group ">
                        <label class="col-form-label" for="val-username">
                          Add Title
                        </label>
                        <input
                          type="text"
                          ref={register}
                          class="form-control"
                          required
                          id="val"
                          name="addTitle"
                          placeholder="Enter a title name.."
                        />
                      </div>
                    </Col>

                    <Col sm={12}>
                      <div class="form-group ">
                        {/* <label class="col-form-label" for="val-username">
                        Key Features 
                        </label> */}
                      </div>
                    </Col>
                    <br className="" />
                    <Col sm={12}>
                      
                      <Editor
                        onEditorStateChange={setDescription}
                        
                      />
                    </Col>

                    <br className="" />

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
                            {/* {data.brands.map((data, index) => (
                              <td>{data.brandName}</td>
                            ))} */}
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
                            <td>Rs.{data.maximumPriceRange}</td>
                          </td>
                          <td>
                            <td>Rs.{data.minimumPriceRange}</td>
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
