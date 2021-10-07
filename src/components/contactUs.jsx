import React, { Component } from 'react';
import * as service from '../services/apiServices';
import showNotification from '../services/notificationService';
import * as constant from '../services/constant';
var Freshdesk = require('freshdesk-api');
var freshdesk = new Freshdesk(
  'https://naayak.freshdesk.com/',
  'NTvjJVEZz5hfMBXFn7'
);

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
      },
      submitted: false,
      detail: {},
      map: '',
      emailError: false,
    };
  }

  componentDidMount() {
    this.getContactUsData();
  }

  getContactUsData() {
    service.getContactUsData().then((resp) => {
      if (resp?.data?.success) {
        this.setState({
          detail: resp.data.data[0],
        });
      }
    });
  }

  handleChange = (e) => {
    const { target } = e;
    this.setState((prev) => ({
      formdata: {
        ...prev.formdata,
        [target.name]: target.value,
      },
    }));
  };

  handleForm = (e) => {
    e.preventDefault();

    this.setState({
      submitted: true,
    });

    if (
      this.state.formdata.firstName === '' ||
      this.state.formdata.lastName === '' ||
      this.state.formdata.email === '' ||
      this.state.formdata.subject === '' ||
      this.state.formdata.message === ''
    ) {
      return false;
    }
    let pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!pattern.test(this.state.formdata.email)) {
      this.setState({
        emailError: true,
      });
      return;
    } else {
      this.setState({
        emailError: false,
      });
    }

    var obj = {
      firstName: this.state.formdata.firstName,
      lastName: this.state.formdata.lastName,
      email: this.state.formdata.email,
      subject: this.state.formdata.subject,
      message: this.state.formdata.message,
    };
    this.sendData(obj);
    // freshdesk.createTicket(
    //     {
    //       name: this.state.formdata.firstName +' '+this.state.formdata.lastName,
    //       email: this.state.formdata.email,
    //       subject: this.state.formdata.subject,
    //       description:this.state.formdata.message,
    //       status: 2,
    //       priority: 1,
    //     },
    //      (err, dataa) =>{
    //       if (dataa) {
    //         obj.ticketNo = dataa.requester_id
    //         this.sendData(obj);
    //       }
    //       if(err){
    //         showNotification('danger', constant.ERRORMSG)
    //       }
    //     }
    // );
  };

  sendData = (detail) => {
    service
      .postMessageContactUs(detail)
      .then((resp) => {
        if (resp?.data?.success) {
          showNotification('success', resp.data.message);

          this.setState({
            formdata: {
              firstName: '',
              lastName: '',
              email: '',
              subject: '',
              message: '',
            },
          });
          this.setState({
            submitted: false,
            emailError: false,
          });
        }
      })
      .catch((err) => {
        showNotification('danger', constant.ERRORMSG);
      });
  };

  render() {
    return (
      <>
        <div className='page-wrapper'>
          <div className='x_contact_title_main_wrapper float_left padding_tb_100'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='x_offer_car_heading_wrapper x_offer_car_heading_wrapper_contact float_left'>
                    <h4>get in touch</h4>
                    <h3>Contact Info</h3>
                    <p>{this.state.detail?.t1}</p>
                  </div>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 full_width mt-3'>
                  <div className='x_contact_title_icon_cont_main_box'>
                    <div className='x_contact_title_icon'>
                      {' '}
                      <i className='fas fa-map-marker-alt'></i>
                    </div>
                    <div className='x_contact_title_icon_cont'>
                      <h3>
                        <a href='#'>address</a>
                      </h3>
                      <p>{this.state.detail?.address}</p>
                    </div>
                  </div>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 full_width mt-3'>
                  <div className='x_contact_title_icon_cont_main_box'>
                    <div className='x_contact_title_icon'>
                      {' '}
                      <i className='fa fa-phone'></i>
                    </div>
                    <div className='x_contact_title_icon_cont'>
                      <h3>
                        <a href='#'>phone Number</a>
                      </h3>
                      <p>{this.state.detail?.phoneNumber}</p>
                    </div>
                  </div>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 full_width mt-3'>
                  <div className='x_contact_title_icon_cont_main_box'>
                    <div className='x_contact_title_icon'>
                      <i className='fa fa-envelope'></i>
                    </div>
                    <div className='x_contact_title_icon_cont'>
                      <h3>
                        <a href='#'>Email Address</a>
                      </h3>
                      <p>
                        <a href='#'>{this.state.detail?.emailAddress}</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='map_main_wrapper'>
            {/* 30.9003405,75.8216539 */}

            <iframe
              src='https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319'
              width='100%'
              height='200'
              frameborder='0'></iframe>
          </div>
          <div className='x_contact_title_main_wrapper float_left padding_tb_100'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='x_offer_car_heading_wrapper x_offer_car_heading_wrapper_contact float_left'>
                    <h4>get in touch</h4>
                    <h3>Leave A Message</h3>
                    <p>{this.state.detail?.d1}</p>
                  </div>
                </div>
                <div className='col-xl-5 offset-xl-1 col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <div className='contect_form1'>
                    <input
                      type='text'
                      placeholder='First Name *'
                      value={this.state.formdata.firstName}
                      name='firstName'
                      onChange={this.handleChange}
                      maxLength='100'
                    />
                    {this.state.submitted &&
                      this.state.formdata.firstName === '' && (
                        <span className='text-danger'> This is required</span>
                      )}
                  </div>
                </div>
                <div className='col-xl-5 col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <div className='contect_form1'>
                    <input
                      type='text'
                      placeholder='Last Name *'
                      value={this.state.formdata.lastName}
                      name='lastName'
                      onChange={this.handleChange}
                      maxLength='100'
                    />
                    {this.state.submitted &&
                      this.state.formdata.lastName === '' && (
                        <span className='text-danger'> This is required</span>
                      )}
                  </div>
                </div>
                <div className='col-xl-5 offset-xl-1 col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <div className='contect_form1'>
                    <input
                      type='email'
                      placeholder='Email *'
                      value={this.state.formdata.email}
                      name='email'
                      onChange={this.handleChange}
                      maxLength='100'
                    />
                    {this.state.submitted &&
                      this.state.formdata.email === '' && (
                        <span className='text-danger'> This is required</span>
                      )}
                    {this.state.submitted && this.state.emailError && (
                      <span className='text-danger'>
                        {' '}
                        Please enter valid email
                      </span>
                    )}
                  </div>
                </div>
                <div className='col-xl-5 col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                  <div className='contect_form1'>
                    <input
                      type='text'
                      placeholder='Subject *'
                      value={this.state.formdata.subject}
                      name='subject'
                      onChange={this.handleChange}
                      maxLength='100'
                    />
                    {this.state.submitted &&
                      this.state.formdata.subject === '' && (
                        <span className='text-danger'> This is required</span>
                      )}
                  </div>
                </div>
                <div className='col-xl-10 offset-xl-1 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                  <div className='contect_form1'>
                    <textarea
                      rows='4'
                      placeholder='Message *'
                      name='message'
                      value={this.state.formdata.message}
                      onChange={this.handleChange}
                      maxLength='100'></textarea>
                    {this.state.submitted &&
                      this.state.formdata.message === '' && (
                        <span className='text-danger'> This is required</span>
                      )}
                  </div>
                </div>
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                  <div className='contect_btn contect_btn_contact'>
                    <ul>
                      <li>
                        <a href='#' onClick={this.handleForm}>
                          Submit <i className='fa fa-arrow-right'></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
