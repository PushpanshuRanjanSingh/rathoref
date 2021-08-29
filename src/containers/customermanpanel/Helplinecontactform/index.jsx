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
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
function Index(props) {
  
  if (props?.location?.panel || props?.location?.data) {
  } else {
    props.history.goBack();
   
  }
 
  const [state, setState] = React.useState({});
  const { register, errors, handleSubmit } = useForm();
  const [panel, setpanel] = React.useState(props.location.panel);
  const [view, setview] = React.useState(props.location.data);
  const onSubmit = (data) => {
    if (props?.location?.data) {
      
      var newData = data;
      if (state?.profilePic) {
        newData.profilePic = state?.profilePic;
      } else {
        newData.profilePic = view?.profilePic;
      }

     
      // return;
      updateData(newData);
    } else {
     
      var newData = data;
      newData.profilePic = state?.profilePic;
     

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
    formData.append('name', data.name);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('profilePic', data.profilePic);
    formData.append('panel', panel);
    
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .post(apiUrl + 'helpLine/saveHelpLine', formData, headers)
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
    formData.append('name', data.name);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('profilePic', data.profilePic);
   
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
                      {view ? 'Update' : 'Add'} Help Line
                    </h4>
                  </div>
                  <div class='card-body'>
                    <div class='basic-form'>
                      <form>
                        <div class='row'>
                          <div class='form-group col-md-6'>
                            <label>Name</label>
                            <input
                              type='text'
                              required
                              name='name'
                              class='form-control'
                              placeholder='Enter Name..'
                              ref={register}
                              defaultValue={view?.name}
                            />
                          </div>
                          <div class='form-group col-md-6'>
                            <label>Upload Image</label>
                            <div class='input-group mb-3'>
                              <div class='custom-file'>
                                <input
                                  type='file'
                                  name='profilePic'
                                  onChange={fileChange}
                                  class='custom-file-input'
                                  id='inputGroupFile01'
                                />
                                <label
                                  class='custom-file-label'
                                  for='inputGroupFile01'>
                                  {state?.profilePic?.name
                                    ? state?.profilePic?.name
                                    : view?.profilePic
                                    ? view?.profilePic
                                    : 'Choose File'}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div class='form-group'>
                              <label> Contact No</label>
                              <input
                                className='form-control'
                                id='val-username'
                                name='phoneNumber'
                                // onChange={() => seterrorMsg('')}
                                maxLength='10'
                                // value={state?.phoneNo}
                                defaultValue={view?.phoneNumber}
                                onKeyPress={(e) => restrictAlpha(e)}
                                placeholder='Enter mobile number...'
                                // ref={register}
                                ref={register({
                                  required: 'This is required ',

                                  pattern: {
                                    value:
                                      /^[5-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/,
                                    message: 'Enter Valid Contact Number',
                                  },
                                })}
                              />
                               <ErrorMessage
                                errors={errors}
                                name='phoneNumber'
                                render={({ message }) => (
                                  <p className='error'>{message}</p>
                                )}
                              />
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
