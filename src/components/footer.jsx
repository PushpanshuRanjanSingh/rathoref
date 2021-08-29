import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
  render() {
    return (
      <footer id='footer-main' className='footers footer-home'>
        <div className='x_footer_bottom_main_wrapper float_left'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
                <div className='x_footer_bottom_box_wrapper float_left'>
                  <h3>About Us</h3>
                  <p>
                    Consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                  <span>
                    <a href='#'>
                      Read More &nbsp;
                      <i className='fa fa-angle-double-right' />
                    </a>
                  </span>
                  <ul>
                    <li>
                      <a href='#'>
                        <i className='fab fa-facebook-f' />
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <i className='fab fa-twitter' />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
                <div className='x_footer_bottom_box_wrapper_second float_left'>
                  <h3>Information</h3>
                  <ul>
                    <li>
                      <Link to='/about'>
                        <i className='fa fa-long-arrow-right' /> &nbsp; About
                      </Link>
                    </li>
                    <li>
                      <Link to='/services'>
                        <i className='fa fa-long-arrow-right' /> &nbsp; Service
                      </Link>
                    </li>
                    <li>
                      <Link to='terms-condition'>
                        <i className='fa fa-long-arrow-right' /> &nbsp; Terms
                        and Conditions
                      </Link>
                    </li>

                    <li>
                      <Link to='/privacy-policy'>
                        <i className='fa fa-long-arrow-right' /> &nbsp; Privacy
                        &amp; Cookies Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
                <div className='x_footer_bottom_box_wrapper_second float_left'>
                  <h3>Customer Support</h3>
                  <ul>
                    <li>
                      <Link to='/faq'>
                        <i className='fa fa-long-arrow-right' /> &nbsp; FAQ
                      </Link>
                    </li>

                    <li>
                      <Link to='/how-it-works'>
                        <i className='fa fa-long-arrow-right' /> &nbsp; How it
                        works ?
                      </Link>
                    </li>
                    <li>
                      <Link to='/contact-us'>
                        <i className='fa fa-long-arrow-right' /> &nbsp; Contact
                        Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
                <div className='x_footer_bottom_box_wrapper_third float_left'>
                  <h3>Have Questions?</h3>
                  <div className='x_footer_bottom_icon_section float_left'>
                    <div className='x_footer_bottom_icon'>
                      {' '}
                      <i className='fas fa-phone-alt' />
                    </div>
                    <div className='x_footer_bottom_icon_cont'>
                      <h4>Toll Free caling in world</h4>
                      <p>808 - 111 - 9999</p>
                    </div>
                  </div>
                  <div className='x_footer_bottom_icon_section x_footer_bottom_icon_section2 float_left'>
                    <div className='x_footer_bottom_icon x_footer_bottom_icon2'>
                      {' '}
                      <i className='fas fa-envelope' />
                    </div>
                    <div className='x_footer_bottom_icon_cont'>
                      <h4>Email Us</h4>
                      <p>
                        <a href='#'>listing@example.com</a>
                      </p>
                    </div>
                  </div>
                  <div className='x_footer_bottom_icon_section x_footer_bottom_icon_section2 float_left'>
                    <div className='x_footer_bottom_icon x_footer_bottom_icon3'>
                      {' '}
                      <i className='fa fa-map-marker' />
                    </div>
                    <div className='x_footer_bottom_icon_cont x_footer_bottom_icon_cont2'>
                      <h4>
                        <a href='#'>View On Map</a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='footer-2'>
          <div className='container'>
            <div className='footer-widget'>
              <p className='text-center  mb-0'>
                {' '}
                2016-2021{' '}
                {/* <a className="text-primary" href="/#0">
                  Naayak
                </a>{" "}
                | All Rights Reserved. Powered By{" "}
                <a
                  className="text-primary"
                  target="_blank"
                  href="https://www.toxsl.com"
                >
                  
                </a> */}
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
