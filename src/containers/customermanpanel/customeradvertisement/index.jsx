import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useForm } from 'react-hook-form';
import apiUrl from '../../../globals/config.js';
import axios from 'axios';
function Index(props) {
  
  if (props?.location?.panel || props?.location?.data) {
  } else {
  
    props.history.push('/customeraddslist');
  }

  const [state, setState] = React.useState({});
  const { register, handleSubmit } = useForm();
  const [panel, setpanel] = React.useState(props.location.panel);
  const [view, setview] = React.useState(props.location.data);
  const onSubmit = (data) => {
    if (props?.location?.data) {
     
      var newData = data;
      if (state?.advertisementImage) {
        newData.advertisementImage = state?.advertisementImage;
      } else {
        newData.advertisementImage = view?.advertisementImage;
      }


      // return;
      updateData(newData);
    } else {
      
      var newData = data;
      newData.advertisementImage = state?.advertisementImage;
    

      AddData(newData);
    }
  };
  const restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };
  const fileChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.files[0],
    });
  };
  function AddData(data) {
    const formData = new FormData();
    formData.append('advertisementTitle', data.advertisementTitle);
    formData.append('advertisementDescription', data.advertisementDescription);
    formData.append('advertisementImage', data.advertisementImage);
    formData.append('panel', panel);
    formData.append('anchor', data.anchor);
    // formData.append('maximumPriceRange', data.maximumPriceRange);anchor
    // Object.keys(data).forEach((key) => {
    //   if (data[key]) {, , ,
    //     formData.append([key], data[key]);
    //   }

    // });
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .post(apiUrl + 'advertisement/saveData', formData, headers)
      .then((resp) => {
        props.history.goBack();
      
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function updateData(data) {
    const formData = new FormData();
    formData.append('_id', view._id);
    formData.append('advertisementTitle', data.advertisementTitle);
    formData.append('advertisementDescription', data.advertisementDescription);
    formData.append('advertisementImage', data.advertisementImage);
    formData.append('anchor', data.anchor);
    // Object.keys(data).forEach((key) => {
    //   if (data[key]) {, , ,
    //     formData.append([key], data[key]);
    //   }
    // });
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .put(apiUrl + 'advertisement/updateData', formData, headers)
      .then((resp) => {
        props.history.goBack();
      
        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div className='content-body'>
        <form autocomplete='off' onSubmit={handleSubmit(onSubmit)}>
          <div className='container-fluid'>
            <Row className='emi_row'>
              <Col lg={12}>
                <div className='card widget-stat'>
                  <div class='card-header bg-custom-blue '>
                    <h4 class='card-title text-white'>
                      {view ? 'Update' : 'Add'} Advertisement
                    </h4>
                  </div>
                  <div class='card-body'>
                    <div class='basic-form'>
                      <form>
                        <div class='row'>
                          <div class='form-group col-md-6'>
                            <label>Title</label>
                            <input
                              type='text'
                              required
                              name='advertisementTitle'
                              class='form-control'
                              placeholder='Enter Title'
                              ref={register}
                              defaultValue={view?.advertisementTitle}
                            />
                          </div>
                          <div class='form-group col-md-6'>
                            <label>Upload Image</label>
                            <div class='input-group mb-3'>
                              <div class='custom-file'>
                                <input
                                  type='file'
                                  name='advertisementImage'
                                  onChange={fileChange}
                                  class='custom-file-input'
                                  id='inputGroupFile01'
                                />
                                <label
                                  class='custom-file-label'
                                  for='inputGroupFile01'>
                                  {state?.advertisementImage?.name
                                    ? state?.advertisementImage?.name
                                    : view?.advertisementImage
                                    ? view?.advertisementImage
                                    : 'Choose File'}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='col-md-12'>
                            <div class='form-group'>
                              <label>Anchor </label>
                              <input
                                type='text'
                                required
                                name='anchor'
                                class='form-control'
                                placeholder='Enter Anchor'
                                ref={register}
                                defaultValue={view?.anchor}
                              />
                            </div>
                          </div>

                          <div className='col-md-12'>
                            <div class='form-group'>
                              <label for='exampleFormControlTextarea1'>
                                Description
                              </label>
                              <textarea
                                class='form-control'
                                required
                                ref={register}
                                defaultValue={view?.advertisementDescription}
                                name='advertisementDescription'
                                id='exampleFormControlTextarea1'
                                rows='3'></textarea>
                            </div>
                          </div>
                        </div>

                        <button type='submit' class='btn btn-primary'>
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </form>
      </div>
    </>
  );
}

export default Index;
