import { Link } from 'react-router-dom';

import React, { Component } from 'react';
import * as service from '../services/apiServices';
// import moduleName from 'jQuery'
import * as loadjs from 'loadjs';
import base from '../globals/base';
import apiBase from '../globals/config';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import StoreContext from '../context/store';
// import history from '../history';
import showNotification from '../services/notificationService';
import * as constant from '../services/constant';
import {
  getModelImageUrl,
  getCarImageUrl,
  getPriceInLakh,
} from '../globals/constant';
import { withRouter } from 'react-router';
import SerchField from './SerchField';
declare var $;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      showSecondForm: false,
      otp: '',
      page: 1,
      limit: 12,
      filter: '',
      vehicles: [],
      count: 0,
      budget: '',
      brand: [],
      model: [],
      color: [],
      fuel: [],
      search: '',
      howitwork: [],
      faq: [],
      testimonial: [],
      currentTab: 1,
      stickyForm: {
        phoneNumber: '',
        brand: 'Hyundai',
        model: 'i20',
        fuel: 'CNG',
        brandId: '',
      },
      submitted: false,
      brands: [],
      models: [],
      fuels: [],
      searchBrand: '',
      searchModel: '',
      searchFuel: '',
      minPrice: '',
      maxPrice: '',
      brandId: '',
      email: '',
      submittedNews: false,
      search: '',
      STEP_SEARCH: 1,
      STEP_BRAND: 2,
      STEP_MODEL: 3,
      STEP_FUEL: 4,
    };
  }

  static contextType = StoreContext;

  componentDidMount() {
    loadjs(['/assets/js/sticky.js']);
    loadjs(['/assets/js/common.js']);

    this.loadVehicleList(
      this.state.limit,
      this.state.page,
      this.state.filter,
      this.state.minPrice,
      this.state.maxPrice,
      this.state.brand,
      this.state.model,
      this.state.color,
      this.state.fuel,
      this.state.search
    );
    this.getHowItWorks();
    this.getTestimonials();
    this.getFaq();
    this.getAllCarBrands();
    this.loadsticky();
  }
  loadsticky() {
    $(function () {
      $('.left-sidebar').StickySidebar({
        // Settings
        additionalMarginTop: 40,
      });
    });
  }

  getFilterForCarsBasedOnBrandModelFuel(brand, model, fuelType) {
    // service
    //   .filterForCarsBasedOnBrandModelFuel(brand, model, fuelType)
    //   .then((resp) => {
    //     if (resp?.data?.success) {
    //       this.setState({
    //         models: resp.data.data,
    //       });
    //     }
    //   });
  }
  getAllCarBrands() {
    // service.getAllCarBrands().then((resp) => {
    //   if (resp?.data?.success) {
    //     this.setState({
    //       brands: resp.data.data,
    //     });
    //   }
    // });
  }
  getFaq() {
    // service.getFaq().then((resp) => {
    //   if (resp?.data?.success) {
    //     this.setState({
    //       faq: resp.data.data,
    //     });
    //   }
    // });
  }

  getTestimonials() {
    // service.getTestimonials().then((resp) => {
    //   if (resp?.data?.success) {
    //     this.setState({
    //       testimonial: resp.data.data,
    //     });
    //   }
    // });
  }

  getHowItWorks() {
    // service.howItWorks().then((resp) => {
    //   if (resp?.data?.success) {
    //     this.setState({
    //       howitwork: resp.data.data,
    //     });
    //   }
    // });
  }

  handleSticky = (v, id, e) => {
    // if (this.state.currentTab === this.state.STEP_BRAND) {
    //   this.setState((prev) => ({
    //     stickyForm: {
    //       ...prev.stickyForm,
    //       brand: v,
    //       brandId: id,
    //     },
    //     brandId: id,
    //   }));
    //   this.getFilterForCarsBasedOnBrandModelFuel(id, '', '');
    // }
    // if (this.state.currentTab === this.state.STEP_MODEL) {
    //   this.setState((prev) => ({
    //     stickyForm: {
    //       ...prev.stickyForm,
    //       model: v,
    //     },
    //   }));
    // }
    // if (this.state.currentTab === this.state.STEP_FUEL) {
    //   this.setState((prev) => ({
    //     stickyForm: {
    //       ...prev.stickyForm,
    //       fuel: v,
    //     },
    //   }));
    // }
    // this.setState((prev) => ({
    //   currentTab: prev.currentTab === 4 ? 1 : prev.currentTab + 1,
    // }));
  };

  handleStickyForm = () => {
    this.setState({
      submitted: true,
    });

    if (this.state.stickyForm.phoneNumber.length < 10) {
      return;
    }

    // service.saveDetailsToContact(this.state.stickyForm).then((resp) => {
    //   this.context.setFilter(this.state.stickyForm);
    //   this.props.history.push('/vehicle-listing');
    // });
  };

  handleStickyChange = (e) => {
    const { target } = e;

    this.setState((prev) => ({
      stickyForm: {
        ...prev.stickyForm,
        [target.name]: target.value,
      },
    }));
  };

  loadVehicleList(
    page,
    limit,
    filter,
    minPrice,
    max,
    brand,
    model,
    color,
    fuel,
    search
  ) {}

  handleChange = (e) => {
    const { target } = e;
    this.setState({
      [target.name]: target.value,
    });
  };

  handleNewsletter = (e) => {
    e.preventDefault();
    this.setState({
      submittedNews: true,
    });

    if (this.state.email === '') {
      showNotification('danger', 'Email is required');
      return;
    }
    let pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!pattern.test(this.state.email)) {
      showNotification('danger', 'Please enter valid email');
      return;
    }

    var obj = {
      email: this.state.email,
    };

    service
      .newsLetter(obj)
      .then((resp) => {
        if (resp?.data?.success) {
          showNotification('success', resp.data.message);
          this.setState({
            email: '',
            submittedNews: false,
          });
        }
      })
      .catch((err) => {
        showNotification('danger', constant.ERRORMSG);
      });
  };

  handleStickyBack = (e) => {
    this.setState((prev) => ({
      currentTab: prev.currentTab - 1,
    }));
  };

  handleClickLink = (fuel, e) => {
    localStorage.setItem('fuel', fuel);
  };

  render() {
    const options = {
      loop: true,
      center: true,
      items: 3,
      margin: 0,
      autoplay: true,
      dots: true,
      autoplayTimeout: 8500,
      smartSpeed: 450,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        1170: {
          items: 3,
        },
      },
    };

    return (
      <>
        {/* Slider */}
        <section className='slider-section banner-sec home-banner'>
          <div
            id='carousel'
            className='carousel slide banner-slider'
            data-ride='carousel'>
            {/* <ol className='carousel-indicators'>
              <li data-target='#carousel' data-slide-to={0} className='active'>
                Online Booking
              </li>
              <li data-target='#carousel' data-slide-to={1}>
                Sell Car
              </li>
              <li data-target='#carousel' data-slide-to={2}>
                Naayak Tvc
              </li>
            </ol>
            */}
            <div className='carousel-inner' role='listbox'>
              <div
                className='carousel-item active banner-carousel-box banner-one'
                style={{ backgroundImage: 'url("assets/images/insure3.jpg")' }}>
                <div className='carousel-caption'>
                  <div className='container nayk-container'>
                    <div className='row'>
                      <div className='col-xl-7'>
                        <div className='text-wrap'>
                          <div className='img-wrap'>
                            <img
                              src='assets/images/car-slider-one.png'
                              alt='img'
                            />
                          </div>

                          {/*
                          <h4>Connect Company to distributer</h4>

                          <h3>And Vice Versa</h3>
                          <Link to='/about' className='banner-btn-cus'>
                            About us
                          </Link>
                        */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              href='#carousel'
              className='carousel-control-prev'
              role='button'
              data-slide='prev'>
              <span className='carousel-control-prev-icon' aria-hidden='true' />
              <span className='sr-only' />
            </a>
            <a
              href='#carousel'
              className='carousel-control-next'
              role='button'
              data-slide='next'>
              <span className='carousel-control-next-icon' aria-hidden='true' />
              <span className='sr-only' />
            </a>
          </div>
        </section>
        {/* End of Slider */}
        <SerchField />
      </>
    );
  }
}

export default withRouter(HomePage);
export const Rating = ({ count }) => {
  const [star, setStar] = React.useState([]);

  React.useEffect(() => {
    let existing = star;
    for (let i = 1; i <= 5; i++) {
      existing.push(i);
    }
    setStar(existing);
  }, []);

  return (
    <>
      {star.map((item) => (
        <i className='fa fa-star' />
      ))}
    </>
  );
};
