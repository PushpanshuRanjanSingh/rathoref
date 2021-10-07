import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import StoreContext from '../context/store';
import Swal from 'sweetalert2';
import {
  LoginApi,
  verifyOtpApi,
  getVehicleList,
} from '../services/apiServices';
import base from '../globals/base';
import * as loadjs from 'loadjs';
// import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import history from '../history';
import TextField from '@material-ui/core/TextField';
import * as session from '../utils/session';
import showNotification from '../services/notificationService';
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      showSecondForm: false,
      password: '',
      submitted: false,
      page: 1,
      limit: 12,
      filter: '',
      vehicles: [],
      count: 0,
      showReg: false,
    };
  }

  static contextType = StoreContext;

  // const history = useHistory();

  componentDidMount() {
    this.changePage();
  }

  changePage = (e) => {
    this.context.setPathName();
  };

  Login = () => {
    LoginApi({ phoneNo: this.state.phoneNumber }).then((resp) => {
      // if(resp.success){
      //
      // }
    });
  };

  verifyOtp = () => {
    verifyOtpApi({
      phoneNo: this.state.phoneNumber,
      password: this.state.password,
    }).then((resp) => {
      if (resp?.data.token) {
        showNotification('success', 'Login  Successfully');
        localStorage.setItem('myData', resp.data.token);
        localStorage.setItem('role', resp?.data?.role ?? 0);
        this.props.history.push('/');
        window.location.reload();
      } else {
        showNotification('danger', 'Invalid Crendiantial ');
        console.log(`resp`, resp);
      }

      // this.props.history.push("/account");
    });
  };

  handleClose = (e) => {
    this.setState({
      phoneNumber: '',
      showSecondForm: false,
      password: '',
    });
  };

  handleLoginClick = (e) => {
    this.setState({
      submitted: false,
    });
  };
  handleLogout = (e) => {
    localStorage.removeItem('myData');
    localStorage.removeItem('role');
    window.location.href = '/';
  };
  registershow = (e) => {
    Swal.fire({
      title: 'Select Form Type',
      icon: 'info',
      html:
        "<a href='/company' class='btn btn-primary ' > Company </a>" +
        "<a href='/Distributer' class='btn btn-primary ml-3' > Distributer </a>",
      showCloseButton: true,
      showConfirmButton: false,
      showClass: {
        popup: 'animate__animated animate__backInRight',
      },
      hideClass: {
        popup: 'animate__animated animate__backOutRight',
      },
    });
  };

  render() {
    return (
      <>
        <header
          id='header'
          className={
            this.context.store.pathName === '/'
              ? `banner-header`
              : 'inner-page-header'
          }>
          <div className='container nayk-container'>
            <nav
              id='main-menu'
              className='navbar navbar-expand-lg navbar-light py-3 px-0'>
              <span onClick={this.changePage}>
                <a href='/' className='navbar-brand'>
                  {/* <img
                  src={
                    this.context.store.pathName === "/home"
                      ? `/assets/images/logo-2.png`
                      : "/assets/images/logo.png"
                  }
                  className="img-fluid"
                /> */}
                  Distributorshub
                </a>
              </span>
              <button
                className='navbar-toggler collapsed'
                type='button'
                data-toggle='collapse'
                data-target='#naayakNav'
                aria-controls='naayakNav'
                aria-expanded='false'
                aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon' />
              </button>
              <div className='collapse navbar-collapse' id='naayakNav'>
                <ul className='menu navbar-nav mx-auto'>
                  <span onClick={this.changePage}>
                    <a href='/' className='navbar-brand d-lg-none mx-auto'>
                      {/* <img
                        src={
                          this.context.store.pathName === '/home'
                            ? `/assets/images/logo-2.png`
                            : '/assets/images/logo.png'
                        }
                        className='img-fluid'
                      /> */}
                      Distributorshub
                    </a>
                  </span>
                  <li className='nav-item' onClick={this.changePage}>
                    <NavLink
                      // className='nav-link'
                      className={
                        this.context.store.pathName === '/'
                          ? ` nav-link `
                          : 'nav-link'
                      }
                      to='/'>
                      Home{' '}
                    </NavLink>
                  </li>
                  <li className='nav-item' onClick={this.changePage}>
                    <NavLink className='nav-link' to='/about'>
                      About Us
                    </NavLink>
                  </li>

                  <li className='nav-item' onClick={this.changePage}>
                    <NavLink className='nav-link' to='/contact-us'>
                      Contact Us{' '}
                    </NavLink>
                  </li>
                </ul>
                <ul className='menu navbar-nav mt-4 mt-lg-0'>
                  <li>
                    {session.getToken() == null ? (
                      <div className='login-button'>
                        <a
                          href='javascript:;'
                          className='btn btn-primary ml-3 login-btn-cus'
                          onClick={this.handleLoginClick}>
                          Login
                        </a>
                      </div>
                    ) : (
                      <div className='login-button'>
                        <a
                          href='javascript:;'
                          className='btn btn-primary ml-3 login-btn-cus'
                          onClick={this.handleLogout}>
                          Logout
                        </a>
                      </div>
                    )}
                  </li>
                  <li>
                    {session.getToken() == null ? (
                      <div className='login-button call-btn'>
                        <a
                          className='btn btn-primary ml-3'
                          onClick={this.registershow}>
                          Register
                        </a>
                      </div>
                    ) : (
                      <div className='login-button call-btn'>
                        <Link
                          to='/dashboard'
                          className='btn btn-primary ml-3'
                          //onClick={this.registershow}
                        >
                          Dashboard
                        </Link>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <div className='main-rgt-login'>
          <div className='fade-cus-shadow' />

          <div className='right-login'>
            {!this.state.showSecondForm ? (
              <div className='first-form'>
                <div className='HNQ0q'>
                  <div className='hbSUw' onClick={this.handleClose}>
                    <img
                      loading='lazy'
                      src='/assets/images/back_btn.svg'
                      alt='Back Click'
                      className='back_click'
                    />
                  </div>
                  <div className='_3jz7d'>
                    <div>
                      <div className='_2rEYc'>Login</div>
                      <div className='_2a6a2'>
                        Enter your phone number And Password to continue
                      </div>
                    </div>
                  </div>
                </div>
                <div className='_2wctI'>
                  <form autoComplete='off'>
                    <div className='form'>
                      <input
                        type='number'
                        name='phoneNumber'
                        required
                        value={this.state.phoneNumber}
                        onChange={(e) => {
                          if (e.target.value > 10) {
                            e.target.value = e.target.value.slice(0, 10);
                          }
                          this.setState({ phoneNumber: e.target.value });
                        }}
                      />

                      <label htmlFor='text' className='label-name'>
                        <span className='content-name'>Phone number</span>
                      </label>
                    </div>
                    <div className='text-danger'>
                      {this.state.submitted && this.state.phoneNumber == '' && (
                        <span className='text-danger'>This is required</span>
                      )}
                      {this.state.submitted &&
                        this.state.phoneNumber !== '' &&
                        this.state.phoneNumber.length < 10 && (
                          <span className='text-danger'>
                            Number not less than 10 digit
                          </span>
                        )}
                    </div>
                    <div className='form'>
                      <input
                        type='password'
                        name='password'
                        maxLength={15}
                        required
                        value={this.state.password}
                        onChange={(e) => {
                          this.setState({ password: e.target.value });
                        }}
                      />
                      <label htmlFor='text' className='label-name'>
                        <span className='content-name'>Password</span>
                      </label>
                      {/* <span
                        className='_1rdnC'
                        onClick={() => {
                          this.Login();
                          this.setState({ password: '' });
                        }}>
                        Resend OTP
                      </span> */}
                    </div>

                    <div className='_2rFCg '>
                      <div
                        className='_3JbP7 _266cD _1O9SZ _2En4u next1'
                        onClick={() => {
                          this.setState({ submitted: true });
                          if (this.state.phoneNumber.length < 10) {
                            return;
                          }

                          this.setState({ submitted: false });
                          this.setState({ showSecondForm: false });
                          this.verifyOtp();
                          // this.Login();
                        }}>
                        <div className='_1XPkN'>
                          <div />
                          <div>CONTINUE</div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              //  second form
              <div className='second-form'>
                <div className='HNQ0q'>
                  <div className='pre1' onClick={this.handleClose} st>
                    <img
                      loading='lazy'
                      src='/assets/images/back_btn.svg'
                      alt='Back Click'
                    />
                  </div>
                  <div className='_3jz7d'>
                    <div>
                      <div className='_2rEYc'>Verification</div>
                      <div className='_2a6a2'>
                        OTP sent to {this.state.phoneNumber}
                      </div>
                    </div>
                    <div className='_1oWAK'>
                      <img
                        src='/assets/images/logo.png'
                        className='img-fluid'
                      />
                    </div>
                  </div>
                </div>
                <div className='_2wctI'>
                  <form>
                    <div className='form'>
                      <input
                        type='text'
                        name='text'
                        required
                        value={this.state.phoneNumber}
                        readOnly
                      />
                      {/* <TextField className="form-control" id="standard-basic" label="Phone number" value={this.state.phoneNumber}/> */}
                      {/* <label htmlFor="text" className="label-name">
                    <span className="content-name">Phone number</span>
                  </label> */}
                      <span
                        className='_1rdnC'
                        onClick={() => {
                          this.setState({ showSecondForm: false });
                        }}>
                        Edit
                      </span>
                    </div>
                    <div className='text-danger'>
                      {this.state.submitted && this.state.phoneNumber == '' && (
                        <span className='text-danger'>This is required</span>
                      )}
                      {this.state.submitted &&
                        this.state.phoneNumber !== '' &&
                        this.state.phoneNumber.length < 10 && (
                          <span className='text-danger'>
                            Number not less than 10 digit
                          </span>
                        )}
                    </div>
                    <div className='form'>
                      <input
                        type='text'
                        name='password'
                        maxLength={4}
                        required
                        value={this.state.password}
                        onChange={(e) => {
                          this.setState({ password: e.target.value });
                        }}
                      />
                      <label htmlFor='text' className='label-name'>
                        <span className='content-name'>One Time Password</span>
                      </label>
                      <span
                        className='_1rdnC'
                        onClick={() => {
                          this.Login();
                          this.setState({ password: '' });
                        }}>
                        Resend OTP
                      </span>
                    </div>
                    <div className='text-danger'>
                      {this.state.submitted && this.state.password == '' && (
                        <span className='text-danger'>This is required</span>
                      )}
                      {this.state.submitted &&
                        this.state.password !== '' &&
                        this.state.password.length < 4 && (
                          <span className='text-danger'>
                            Number not less than 4 digit
                          </span>
                        )}
                    </div>
                    <div className='_2rFCg '>
                      <div
                        className='_3JbP7 _266cD _1O9SZ _2En4u con-cus-btn'
                        onClick={() => {
                          this.setState({
                            submitted: true,
                          });
                          if (
                            this.state.phoneNumber.length < 10 ||
                            this.state.password.length < 4
                          ) {
                            return;
                          }
                          this.verifyOtp();
                        }}>
                        <div className='_1XPkN'>
                          <div />
                          <div>CONTINUE</div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* ...............................register ............................................................. */}
      </>
    );
  }
}
