/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";
import { Link } from 'react-router-dom';
import OtpInput from 'react-otp-input';
export default class Otp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: ''
    };
  }

    handleChange = otp => this.setState({ otp });

  render() {
    return (
    <section id="main" className="clearfix user-page">
      <div className="container">
        <div className="row text-center">
          <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="user-account">
              <h2>OTP Verification</h2>
              <p>Enter the 4-digit OTP sent on your 91xxx78789. <a href="#0" data-toggle="modal" data-target="#exampleModal">(Change)</a></p>
              <div id="dialog">
                  <OtpInput
                  className="digit-group"
          value={this.state.otp}
          onChange={this.handleChange}
          numInputs={4}
        />
                  <a href="#0" className="btn btn-block">Verify</a>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title font-weight-bold text-theme" id="exampleModalLabel">Change Your  <span className="text-danger"> Mobile Number</span></h4>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
          <div className="row text-center">
            <div className="col-md-12">
              <div className="user-account">
                <form action="#">
                  <div className="form-group">
                    <input type="number" className="form-control" placeholder="Enter Mobile Number" required/>
                  </div>
                  <Link to="/otp" className="btn btn-block">Submit</Link>
                </form>
              </div>
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
