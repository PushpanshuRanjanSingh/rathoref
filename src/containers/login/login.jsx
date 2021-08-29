/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import { Link } from 'react-router-dom'
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
    <section id="main" className="clearfix user-page">
      <div className="container">
        <div className="row text-center">
          <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="user-account">
              <h2>Login on Storenama</h2>
              <p>Please provide your Mobile Number or Email to Login on Storenama</p>
              <form action="#">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Enter Mobile Number/Email" required/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" placeholder="Enter Password" />
                </div>
                <div className="form-group">
                  <div className="remember-checkbox d-flex align-items-center justify-content-between">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="remember" />
                      <label className="custom-control-label" for="remember">Remember Me</label>
                    </div>
                    <Link className="font-13" to="/forgotpassword">Forgot Password? </Link>
                  </div>
                </div>
                <Link to="/otp" className="btn btn-block">Login</Link>
              </form>
              <div className="form-choice">
                <p className="text-center my-3">or sign in with</p>
                <div className="row">
                  <div className="col-sm-6">
                    <a href="#" className="btn btn-login btn-f"><i className="fa fa-facebook mr-2"></i>Facebook</a>
                  </div>
                  <div className="col-sm-6">
                    <a href="#" className="btn btn-login btn-g"><i className="fa fa-google-plus mr-2"></i>Google</a>
                  </div>
                </div>
                <div className="d-flex align-items-center text-center justify-content-center mt-4">
                  <span className="text-muted mr-1">Don't have an account?</span>
                  <Link to="/signup">Sign Up </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
  }
}
