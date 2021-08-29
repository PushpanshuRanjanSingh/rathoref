/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
import React from "react";

export default class Forgotpassword extends React.Component {
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
                <h2>Reset Password</h2>
                <p>Please fill out your email. A link to reset password will be sent there.</p>
                <form action="#">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter Mobile Number/Email" />
                  </div>
                  <a href="#0" className="btn btn-block">Submit</a>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
