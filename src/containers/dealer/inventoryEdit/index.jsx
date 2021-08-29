import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import base from "../../../globals/base";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import OwlCarousel from "react-owl-carousel";
import showNotification from "../../../services/notificationService";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import apiUrl from "../../../globals/config";
function Index(props) {
  const [skuvcm, setskuvcm] = useState([]);
  const [varientd, setvarientd] = useState([]);
  const [ppl, setppl] = useState([]);
  const [color, setcolor] = useState([]);
  const [pl, setplName] = useState([]);
  const [state, setstate] = useState("")
  const [messagee, setmessagee] = useState("")
  useEffect(() => {
    skuvcmm();
    
    // ppll();

    // getvechicle();  user/getOemNameDetails // color/getSkuvcmDataById?id=60ca096fc8c7113274f122dd
  }, []);
  const skuvcmm = () => {
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + "user/getOemNameDetails?skip=1&limit=2000", headers)

      .then((resp) => {
      
        setskuvcm(resp?.data?.data);
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const getSkuvcmDataById = (e) => {
   
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + "color/getSkuvcmDataById?id=" + e.target.value,
        headers
      )
      .then((resp) => {
       
        setppl(resp?.data?.data[0]?.vehicleDescription[0]?.ppl)
       
        setplName(resp?.data?.data[0]?.vehicleDescription)
        setvarientd(resp?.data?.data[0]?.selectVariant)
        setcolor(resp?.data?.data);//data[0].selectVariant
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const getSkuvcmDataByIdnew = (e) => {
   
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    axios
      .get(
        apiUrl + "color/getSkuvcmDataById?id=" + e,
        headers
      )
      .then((resp) => {
        
        setppl(resp?.data?.data[0]?.vehicleDescription[0]?.ppl)
     
        setplName(resp?.data?.data[0]?.vehicleDescription)
        setvarientd(resp?.data?.data[0]?.selectVariant)
        setcolor(resp?.data?.data);//data[0].selectVariant
      })
      .catch((err) => {
        showNotification("danger", err.message);
      });
  };
  const { register, errors, handleSubmit } = useForm();
  const [pramsdata, setpramsdata] = useState(props.location.data);
  const [defaultdata, setdefaultdata] = useState();
  useEffect(() => {
    if (pramsdata) {
      const id = pramsdata.id;
      let token = localStorage.getItem("myData");
      let headers = {
        headers: {
          "x-token": `Bearer ${token}`,
        },
      };
      axios
        .get(apiUrl + "inventory/getInventory/" + id, headers)
        .then((resp) => {
         
          // if(resp?.data?.message && resp?.data?.message?.SKUVCM){
            
          // }
          getSkuvcmDataByIdnew(resp?.data?.message?.SKUVCM);
        
          setdefaultdata(resp?.data?.message);
        })
        .catch((err) => {
          showNotification("danger", err.message);
        });
    }
  }, []);
  const onSubmit = (data) => {
    if(data.SKUVCM=="Choose SKU/VCM"){
      setmessagee('This is required');

    }else{
    
   
    let newData = {};
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        newData = Object.assign(newData, { [key]: data[key] });
      }
    });
    let token = localStorage.getItem("myData");
    let headers = {
      headers: {
        "x-token": `Bearer ${token}`,
      },
    };
    if (Object.keys(newData).length) {
      if (pramsdata) {
        // Inventory/updateInventory?_id=6076b52910cbc55e70b979f4
        axios
          .post(
            apiUrl + "Inventory/updateInventory?_id=" + pramsdata.id,
            newData,
            headers
          )
          .then((resp) => {
            if (resp) {
              
              if (resp) {
                props.history.push({
                  pathname: "/inventoryMain",
                });
              }
            }
          })
          .catch((err) => {
            showNotification("danger", err.message);
          });
      } else {
        axios
          .post(apiUrl + "Inventory/addInventory", newData, headers)
          .then((resp) => {
            if (resp) {
             
              if (resp) {
                props.history.push({
                  pathname: "/inventoryMain",
                });
              }
            }
          })
          .catch((err) => {
            showNotification("danger", err.message);
          });
      }
    }
  }
  };
  const restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };
 
  return (
    <>
      {/* <Header /> */}
      <div className="content-body">
        <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="container-fluid">
            <section className="stage_lead_sec">
              <Row className="mb-4">
                <Col lg={12} className="mb-2">
                  <div className="d-block pb-0 border-0">
                    <div className="mr-auto pr-3">
                      <h4 className="text-black font-w600 fs-20">
                        {pramsdata ? "Edit Inventory" : "Add Inventory"}
                      </h4>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="row dataTables_wrapper">
                <div class="col-lg-12 mt-0">
                  <div class="card">
                    <div class="card-body">
                      <div class="row">
                        {/* <div class="col-lg-6 mb-2">
                        <div class="form-group">
                          <label class="text-label">S.NO</label>
                          <input
                            type="text"
                            class="form-control"
                            //placeholder="1"
                            disabled
                          />
                        </div>
                      </div> */}
                        <div class="col-lg-6 mb-2">
                          {/* <div class='form-group'>
                            <label class='text-label'>SKU/VCM</label>
                            <input
                              type='text'
                              name='SKUVCM'
                              class='form-control'
                              //placeholder="SCV-Mini"
                              maxLength='8'
                              defaultValue={defaultdata?.SKUVCM}
                              ref={register({
                                required: 'This is required ',
                              })}
                            />
                            <ErrorMessage
                              errors={errors}
                              name='SKUVCM'
                              render={({ message }) => (
                                <p className='error'>{message}</p>
                              )}
                            />
                          </div> */}
                          <div class="form-group">
                            <label class="col-form-label" for="val-username">
                              SKU/VCM
                            </label>
                            <select
                              class="form-control"
                              ref={register}
                              name="SKUVCM"

                              onChange={e=>{getSkuvcmDataById(e);setstate(e.target.value);setmessagee("")}}
                              id="exampleFormControlSelect1"
                              value={state||defaultdata?.SKUVCM}
                              ref={register({
                                // required: "This is required ",
                              })}
                            ><option selected="true" disabled="disabled">
                            Choose SKU/VCM
                          </option>
                              {skuvcm.length != 0 &&
                                skuvcm.map((options, index) => (
                                  <option value={options?._id}>
                                    {options?.skuVcm}
                                  </option>
                                ))}
                            </select>
                            <p className="error">{messagee}</p>
                            {/* <ErrorMessage
                              errors={errors}
                              name="SKUVCM"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            /> */}
                          </div>
                        </div>

                        <div class="col-lg-6 mb-2">
                          <div class="form-group">
                            <label class="col-form-label" for="val-username">
                              PPL
                            </label>
                            <select
                              class="form-control"
                              ref={register}
                              name="ppl"
                              // onChange={handleppl}
                              id="exampleFormControlSelect1"
                              ref={register({
                                // required: "This is required ",
                              })}
                            >
                              
                              {ppl.length != 0 &&
                                ppl.map((options, index) => (
                                  <option value={options._id}>
                                    {options?.pplName}
                                  </option>
                                ))}
                            </select>
                            {/* <ErrorMessage
                              errors={errors}
                              name="ppl"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            /> */}
                          </div>

                          {/* <div class="form-group">
                            <label class="text-label">PPL</label>
                            <input
                              type="text"
                              name="ppl"
                              class="form-control"
                              //placeholder="SCV-Mini"
                              maxLength="8"
                              defaultValue={defaultdata?.ppl}
                              ref={register({
                                required: "This is required ",
                              })}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="ppl"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div> */}
                        </div>
                        <div class="col-lg-6 mb-2">
                          <div class="form-group">
                            <label class="col-form-label" for="val-username">
                              PL
                            </label>
                            <select
                              class="form-control"
                              ref={register}
                              name="pl"
                              // onChange={handlepl}
                              id="exampleFormControlSelect1"
                              ref={register({
                                // required: "This is required ",
                              })}
                            >
                              {/* <option selected="true" disabled="disabled">
                                Choose Pl
                              </option> */}
                              {pl.length != 0 &&
                                pl.map((options, index) => (
                                  <option value={options._id}>
                                    {options?.plName}
                                  </option>
                                ))}
                            </select>
                          </div>
                          {/* <div class="form-group">
                            <label class="text-label">PL</label>
                            <input
                              type="text"
                              name="pl"
                              maxLength="8"
                              class="form-control"
                              //placeholder="Ace Gold"
                              defaultValue={defaultdata?.pl}
                              ref={register({
                                required: "This is required ",
                              })}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="pl"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div> */}
                        </div>
                        <div class="col-lg-6 mb-2">
                          <div class="form-group">
                            <label class="col-form-label" for="val-username">
                              Variant
                            </label>
                            <select
                              class="form-control"
                              ref={register}
                              name="variant"
                              // onChange={handlevarient}
                              id="exampleFormControlSelect1"
                              ref={register({
                                // required: "This is required ",
                              })}
                            >
                              {/* <option selected="true" disabled="disabled">
                                Choose variant
                              </option> */}
                              {varientd.length != 0 &&
                                varientd.map((options, index) => (
                                  <option value={options._id}>
                                    {options?.variantName}
                                  </option>
                                ))}
                            </select>
                          </div>
                          {/* <div class="form-group">
                            <label class="text-label">Variant</label>
                            <input
                              type="text"
                              name="variant"
                              maxLength="8"
                              class="form-control"
                              //placeholder="Diesel"
                              defaultValue={defaultdata?.variant}
                              ref={register({
                                required: "This is required ",
                              })}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="variant"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div> */}
                        </div>
                        <div class="col-lg-6 mb-2">
                          <div class="form-group">
                            <label class="col-form-label" for="val-username">
                              Colour
                            </label>
                            <select
                              class="form-control"
                              ref={register}
                              name="colour"
                              // onChange={handlevarient}
                              id="exampleFormControlSelect1"
                              ref={register({
                                // required: "This is required ",
                              })}
                            >
                              {/* <option selected="true" disabled="disabled">
                                Choose Colour
                              </option> */}
                              {color.length != 0 &&
                                color.map((options, index) => (
                                  <option value={options._id}>
                                    {options?.colorName}
                                  </option>
                                ))}
                            </select>
                          </div>
                          {/* <div class="form-group">
                            <label class="text-label">Colour</label>
                            <input
                              type="text"
                              name="colour"
                              maxLength="10"
                              class="form-control"
                              //placeholder="White"
                              defaultValue={defaultdata?.colour}
                              ref={register({
                                required: "This is required ",
                              })}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="colour"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div>
                        */}
                        </div>
                        <div class="col-lg-6 mb-2">
                          <div class="form-group">
                            <label class="text-label">Stocks</label>
                            <input
                              type="text"
                              name="stocks"
                              maxLength="20"
                              class="form-control"
                              //placeholder="3"
                              ref={register({
                                required: "This is required ",
                              })}
                              defaultValue={defaultdata?.stocks}
                              onKeyPress={(e) => restrictAlpha(e)}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="stocks"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 mb-2">
                          <div class="form-group">
                            <label class="text-label">Ex-Showroom Price</label>
                            <input
                              type="text"
                              name="exShowroomPrice"
                              class="form-control"
                              maxLength="20"
                              //placeholder="5,67,684"
                              ref={register({
                                required: "This is required ",
                              })}
                              defaultValue={defaultdata?.exShowroomPrice}
                              onKeyPress={(e) => restrictAlpha(e)}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="exShowroomPrice"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 mb-2">
                          <div class="form-group">
                            <label class="text-label">Cash Discount</label>
                            <input
                              type="text"
                              name="cashDiscount"
                              class="form-control"
                              maxLength="20"
                              //placeholder="5000"
                              ref={register({
                                required: "This is required ",
                              })}
                              defaultValue={defaultdata?.cashDiscount}
                              onKeyPress={(e) => restrictAlpha(e)}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="cashDiscount"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 mb-2">
                          <div class="form-group">
                            <label class="text-label">
                              Additional Discount
                            </label>
                            <input
                              type="text"
                              name="additionalDiscount"
                              defaultValue={defaultdata?.additionalDiscount}
                              class="form-control"
                              //placeholder="20"
                              maxLength="20"
                              ref={register({
                                required: "This is required ",
                              })}
                              onKeyPress={(e) => restrictAlpha(e)}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="additionalDiscount"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 mb-2">
                          <div class="form-group">
                            <label class="text-label">RTO Charges</label>
                            <input
                              type="text"
                              maxLength="20"
                              name="rtoCharges"
                              class="form-control"
                              defaultValue={defaultdata?.rtoCharges}
                              //placeholder="9,283"
                              ref={register({
                                required: "This is required ",
                              })}
                              onKeyPress={(e) => restrictAlpha(e)}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="rtoCharges"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 mb-2">
                          <div class="form-group">
                            <label class="text-label">Commission</label>
                            <input
                              type="text"
                              name="commission"
                              class="form-control"
                              maxLength="20"
                              defaultValue={defaultdata?.commission}
                              //placeholder="7,373"
                              ref={register({
                                required: "This is required ",
                              })}
                              onKeyPress={(e) => restrictAlpha(e)}
                            />
                            <ErrorMessage
                              errors={errors}
                              name="commission"
                              render={({ message }) => (
                                <p className="error">{message}</p>
                              )}
                            />
                          </div>
                        </div>

                        <div class="col-lg-12 mt-3">
                          <button
                            class="btn btn-primary sw-btn-next"
                            type="submit"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Index;
