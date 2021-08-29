import React, { Component } from 'react'

export default class Account extends Component {
    render() {
        return (
            <div className="page-wrapper">
  <section className="areas-of-interest-list profile-setting section-padding form-page">
    <div className="container">
      <div className="media areas-of-interest ">
        <div className="areas-sidebar">
          <div className="sidebar-wrap popup-side-manu">
            <div className="sidebar-header">
              <button className="close-side-menu d-xl-none"><i className="fal fa-times" /></button>
            </div>
            <div className="sidebar-info text-center">
              <div className="img-wrap">
                <img src="./assets/images/about/team-01.jpg" alt />
                <span className="status online" />
              </div>
              <div className="text-wrap">
                <h4>Monica Geller</h4>
                <p><a href>New Central Panda, NY</a></p>
              </div>
            </div>
            <div className="sidebar-menu-wrapper">
              <ul className="sidebar-menu">
                <li><a href="account-settings.html">Account</a></li>
                <li><a href="profile-settings.html">Profile</a></li>
                <li> <a href="user-vehicle-listing.html" className>Vehicles</a></li>
                <li><a className>My Notifications</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="media-body interest-body pl-0 pl-lg-4 form-wrapper">
          <div className="d-lg-none side-navigation-activation">
            <button className="profile-toggle"><i className="fal fa-bars" /></button>
          </div>
          <div className="profile-info form-fieldset">
            <h4>Account Settings</h4>
            <div className="img-buttons d-flex">
              <div className="image-upload">
                <div className="img-wrap">
                  <img src="./assets/images/about/team-01.jpg" alt />
                </div>
                <div className="image-actions">
                  <div className="image-edit">
                    <label htmlFor="profileImg" data-toggle="tooltip" title data-original-title="Upload Image"><i className="far fa-camera" /></label>
                    <input type="file" name id="profileImg" />
                  </div>
                  <button className="delete-image" data-toggle="tooltip" title data-original-title="Delete Image">
                    <i className="far fa-trash" />
                  </button>
                </div>
              </div>
            </div>
            <div className="form-wrapper-inner">
              <div className="profile-info form-fieldset">
                <h4>Personal info</h4>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Name" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Email" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Telephone" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Address" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea className="form-control" placeholder="Something about you..." rows={3} defaultValue={""} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-info form-fieldset">
                <h4>Change Password</h4>
                <div className="form-wrapper-inner">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input type="password" className="form-control" placeholder="New Password" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="button-wrap">
            <button className="src-btn auto-width">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

        )
    }
}
