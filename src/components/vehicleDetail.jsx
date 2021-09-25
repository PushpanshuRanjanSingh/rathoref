import React, { useState } from 'react';
import StoreContext from '../context/store';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import base from '../globals/base';
import apiBase from '../globals/config';
import * as loadjs from 'loadjs';
import { withRouter } from 'react-router';
import * as service from '../services/apiServices';
import showNotification from '../services/notificationService';
import * as constant from '../services/constant';
import Rating from 'react-rating';
import Moment from 'react-moment';
import { getCarImageUrl, getPriceInLakh } from '../globals/constant';
import { Link } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
// import { convertFromRaw,convertToRaw } from 'draft-js'
// import { stateToHTML } from 'draft-js-export-html';
// import draftToHtml from "draftjs-to-html";
// import convert from "htmr";
declare var $;

const options = {
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 1,
    },
    768: {
      items: 2,
    },
    992: {
      items: 3,
    },
  },
};

const VehicleDetail = (props) => {
  // var user = JSON.parse(localStorage.getItem('user'));
  if (!props.location.data) {
    props.history.push({
      pathname: '/',
    });
  }
  const [state, setState] = React.useState(props?.location?.data ?? '');
  const [type, settype] = React.useState(props?.location?.type ?? '');
  console.log(`state`, state);
  const [faq, setfaq] = useState([
    {
      question: `${type} Name`,
      answer: state?.companyName,
    },
    {
      question: 'Contact Personal',
      answer: state?.contactPerson,
    },
    {
      question: 'Contact No',
      answer: state?.contactNumber,
    },
    {
      question: 'Alternate no.',
      answer: state?.alternativeNumber,
    },
    {
      question: 'Address',
      answer: state?.address,
    },
    {
      question: 'City',
      answer: state?.city,
    },
    {
      question: 'State',
      answer: state?.state,
    },
    {
      question: 'Pincode',
      answer: state?.pincode,
    },
    {
      question: 'County',
      answer: 'India',
    },
    {
      question: 'GST No.',
      answer: state?.gstNo,
    },
    {
      question: 'Turnover of the Company',
      answer: state?.turnoverOfTheCompany,
    },
    {
      question: 'Establishment Yea',
      answer: state?.establishmentYear,
    },
    {
      question: 'Mail ID ',
      answer: state?.email,
    },
    {
      question: 'Website',
      answer: 'Towntask.in',
    },
  ]);

  return (
    <>
      <div className='btc_tittle_main_wrapper'>
        <div className='btc_tittle_img_overlay'></div>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 full_width'>
              <div className='btc_tittle_left_heading'>
                <h1>{type}Detail</h1>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 full_width'>
              <div className='btc_tittle_right_heading'>
                <div className='btc_tittle_right_cont_wrapper'>
                  <ul>
                    <li>
                      <Link to='/home'>Home</Link>{' '}
                      <i className='fa fa-angle-right'></i>
                    </li>
                    <li>
                      <Link>{type} Listing</Link>{' '}
                      <i className='fa fa-angle-right'></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='page-wrapper'>
        <div className='page-details-top-section'>
          <div className='container nayk-container'>
            <div className='row align-items-center'>
              <div className='col-lg-5'>
                {[state?.profileImg].length > 0 && (
                  <OwlCarousel
                    className='vehicle-details-top-slider owl-carousel owl-theme custom-slider'
                    loop
                    margin={10}
                    items={1}
                    nav
                    dots={false}>
                    {state?.profileImg &&
                      [state?.profileImg].map((item, i) => (
                        <div key={i} className='item'>
                          <div className='img-wrap'>
                            <img src={getCarImageUrl(item)} alt />
                          </div>
                        </div>
                      ))}
                  </OwlCarousel>
                )}
              </div>

              <div className='col-lg-7'>
                <div className='top-text-wrap'>
                  <h1>{state?.companyName}</h1>
                  <div className='pricing-part d-sm-flex align-items-center'>
                    <h4>Brand</h4>
                  </div>
                  <div className='rating-wrap d-flex'>
                    <div className='rating-list'>
                      <Rating
                        // onChange={this.handleRating}
                        initialRating={3}
                        emptySymbol={
                          <i className='fal fa-star rating_color'></i>
                        }
                        fullSymbol={
                          <i className='fas fa-star rating_color'></i>
                        }
                        readonly
                      />
                    </div>
                    <div className='rating-text'>
                      {/* <span>{this.state.count} reviews</span>
                      <a href='#rating_div'>Rate This Car</a> */}
                    </div>
                  </div>

                  <div className='button-wrap'>
                    <button
                      className='src-btn'
                      data-toggle='modal'
                      data-target='#offerModal'

                      // onClick={this.openModal}
                    >
                      <Link className='text-white' to='#contactNow'>
                        {' '}
                        Contact Now
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='page-details-main-section'>
          <div className='container nayk-container'>
            <div className='row'>
              <div className='col-lg-12'>
                {state?.otherImage?.length > 0 && (
                  <div className='offers-section main-column-card'>
                    <div className='section-heading mb-3'>
                      <h3>Product's Image</h3>
                    </div>

                    <OwlCarousel
                      className='similar-cars owl-carousel owl-theme custom-slider'
                      margin={10}
                      items={3}
                      nav
                      dots={false}
                      {...options}>
                      {state?.otherImage &&
                        state?.otherImage.map((item, id) => (
                          <div key={id} className='item'>
                            <div className='x_car_offer_main_boxes_wrapper float_left'>
                              <div className='x_car_offer_img float_left'>
                                <img src={getCarImageUrl(item)} alt={item} />
                              </div>
                              {/* <div className='gsc_col-xs-12 holder truncate'>
                              <a
                                title={`${item?.selectPplId?.brandId?.brandName} ${item.vehicleName}`}
                                // className="title "
                                href={`/vehicle-detail/${item._id}/${item.selectPplId.pplName}/${item.vehicleName}`}>
                                {item.selectPplId.brandId.brandName}{' '}
                                {item.vehicleName}
                              </a>
                              {item.minimumPriceRange !== undefined && (
                                <div className='price'>
                                  <span className='icon-cd_R'>Rs</span>
                                  {getPriceInLakh(item?.minimumPriceRange)} -
                                  {getPriceInLakh(item?.maximumPriceRange)} Lakh
                                  <sup>*</sup>
                                </div>
                              )}
                            </div> */}
                            </div>
                          </div>
                        ))}
                    </OwlCarousel>
                  </div>
                )}
                {state?.aboutCompany && (
                  <section className='key-spec main-column-card'>
                    <div className='section-heading mb-3'>
                      <h3>{'About Company'}</h3>
                    </div>
                    <p>{state?.aboutCompany}</p>
                  </section>
                )}

                <section className='key-spec main-column-card'>
                  <div className='section-heading mb-3'>
                    <h3>{' Product Category Details'}</h3>
                  </div>
                  {/* <p>{state.category.toString()}</p> */}
                  <div className='row'>
                    <div className='col-sm-4 '>
                      <h5>Category </h5>
                      <p>{state?.category && state?.category.toString()}</p>
                    </div>
                    <div className='col-sm-4'>
                      <h5>Sub Category </h5>
                      {state?.subCategory &&
                        state?.subCategory.map((data) => {
                          return <p>{data?.name}</p>;
                        })}
                    </div>
                    <div className='col-sm-4'>
                      <h5>Brand Name </h5>
                      {state?.subCategory &&
                        state?.subCategory.map((data) => {
                          return <p>{data?.brandName}</p>;
                        })}
                    </div>
                  </div>
                </section>

                <section className='key-spec main-column-card'>
                  <div className='section-heading mb-3'>
                    <h3>
                      {' '}
                      Distribution-ship For Preferred Category &amp; Location
                    </h3>
                  </div>
                  {/* <p>{state.category.toString()}</p> */}
                  <div className='row py-2'>
                    <div className='col-sm-4 '>
                      <h5>Category </h5>
                      <p>{state?.category && state?.category.toString()}</p>
                    </div>
                    <div className='col-sm-4'>
                      <h5>Sub Category </h5>
                      {state?.intreset &&
                        state?.intreset.map((data) => {
                          return <p>{data?.name}</p>;
                        })}
                    </div>
                    <div className='col-sm-4'>
                      <h5>Brand Name </h5>
                      {state?.intreset &&
                        state?.intreset.map((data) => {
                          return <p>{data?.brandName}</p>;
                        })}
                    </div>
                  </div>
                  <hr />

                  {/* <p>{state.category.toString()}</p> */}
                  <div className='row py-3'>
                    <div className='col-sm-4 '>
                      <h5>State </h5>
                      {state?.preferred && state?.preferred[0]?.state}
                    </div>
                    <div className='col-sm-8'>
                      <h5>City </h5>
                      <p>
                        {state &&
                          state?.preferred &&
                          state?.preferred[0]?.city &&
                          state?.preferred[0]?.city.toString()}
                      </p>
                    </div>
                  </div>
                </section>

                {faq.length > 0 && (
                  <section className='faq-section main-column-card'>
                    <div className='section-heading mb-3'>
                      <h3>Company Contact Details</h3>
                    </div>
                    <div className='faq-wrap' id='contactNow'>
                      <div className='accordion' id='faq'>
                        {faq &&
                          faq.map((item, i) => (
                            <div key={item._id} className='card'>
                              <div className='card-header' id={`faqhead${i}`}>
                                <a
                                  href='#'
                                  className='btn btn-header-link'
                                  data-toggle='collapse'
                                  data-target={`#faq${i}`}
                                  aria-expanded='true'
                                  aria-controls={`faq${i}`}>
                                  {item.question}
                                </a>
                              </div>
                              <div
                                id={`faq${i}`}
                                className='collapse'
                                aria-labelledby={`faqhead${i}`}
                                data-parent='#faq'>
                                <div className='card-body'>{item.answer}</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </section>
                )}
                <section
                  className='ratings-section main-column-card'
                  id='rating_div'>
                  <div className='section-heading mb-3'>
                    <h3>{state?.companyName} User Reviews </h3>
                  </div>
                  <div className='rating-sumary'>
                    <div className='row'>
                      <div className='col-md-5 mb-3 mb-md-0'>
                        <div className='media rating-star-text align-items-center'>
                          <div className='icon-wrap'>
                            <Rating
                              // onChange={this.handleRating}
                              initialRating={3}
                              emptySymbol={
                                <i className='fal fa-star rating_color'></i>
                              }
                              fullSymbol={
                                <i className='fas fa-star rating_color'></i>
                              }
                              readonly
                            />
                          </div>
                          <div className='media-body'>
                            <p>
                              Based on
                              <br />
                              {3} User reviews
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-7'>
                        <div className='button-wrap'>
                          <button
                            className='src-btn'
                            type='button'
                            data-toggle='collapse'
                            data-target='#collapsereview'
                            aria-expanded='false'
                            aria-controls='collapsereview'>
                            Write a Review
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* <div className='collapse comment-card' id='collapsereview'>
                      <div className='comment-body'>
                        <h3>
                          Write your Comment on{' '}
                          {this.state.detail.selectPplId?.brandId.brandName}{' '}
                          {this.state.detail.vehicleName}
                        </h3>
                        <div className='form-group'>
                          <textarea
                            className='form-control'
                            name='review'
                            value={this.state.formdata.review}
                            onChange={this.handleChange}
                          />
                          <Rating
                            onChange={this.handleRating}
                            initialRating={this.state.formdata.rating}
                            emptySymbol={
                              <i className='fal fa-star rating_color'></i>
                            }
                            fullSymbol={
                              <i className='fas fa-star rating_color'></i>
                            }
                          />
                        </div>
                        <button className='src-btn' onClick={this.handleReview}>
                          Post Comment
                        </button>
                      </div>
                    </div>
                  */}
                  </div>
                  {/* <div className='rating-list-wrap'>
                    {this.state.reviews.map((item) => (
                      <div key={item._id} className='rating-wrap'>
                        <div className='rating-stars'>
                          <Rating
                            onChange={this.handleRating}
                            initialRating={item.rating}
                            emptySymbol={
                              <i className='fal fa-star rating_color'></i>
                            }
                            fullSymbol={
                              <i className='fas fa-star rating_color'></i>
                            }
                            readonly
                          />
                        </div>
                        <div className='text-wrap'>
                          <p>{item.review}</p>
                        </div>
                        <div className='comment-mata'>
                          {item.added_by !== undefined &&
                          item.added_by !== null ? (
                            <h5>
                              By{' '}
                              {item.added_by.firstName
                                ? item.added_by.firstName +
                                  ' ' +
                                  item.added_by.lastName
                                : 'Anonymous'}
                            </h5>
                          ) : (
                            <h5>By Anonymous </h5>
                          )}
                          <small>
                            On:{' '}
                            <Moment format='MMM DD, YYYY'>
                              {item.createdAt}
                            </Moment>
                          </small>
                        </div>

                        <div
                          className='collapse comment-card'
                          id='collapseCom1'>
                          <div className='comment-body'>
                            <h3>
                              Write your Comment on{' '}
                              {this.state.detail.selectPplId?.brandId.brandName}{' '}
                              {this.state.detail.vehicleName}
                            </h3>
                            <div className='form-group'>
                              <textarea className='form-control' />
                            </div>
                            <button className='src-btn'>Post Comment</button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {this.state.currentCount >= this.state.limit && (
                      <div className='col-md-2 '>
                        <div className='button-wrap text-center'>
                          <button
                            className='src-btn'
                            type='button'
                            onClick={this.handleViewMore}>
                            View More
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                */}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
      <div
        className='modal fade offerModal'
        id='offerModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='offerModalTitle'
        aria-hidden='true'>
        <div
          className='modal-dialog modal-lg modal-dialog-centered '
          role='document'>
          <div className='modal-content'>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'>
              <i className='fal fa-times'></i>
            </button>
            <div className='modal-body p-0'>
              <div className='row no-gutters'>
                <div className='col-lg-4'>
                  <div className='img-wrap'>
                    <img
                      src='/assets/images/imag.jpg'
                      alt='Offers'
                      className='img-fluid'
                    />
                  </div>
                </div>
                <div className='col-lg-8'>
                  <div className='form-wrap'>
                    <div className='heading-wrap text-center'>
                      <h3>View Personalized Offers On {this.state.model}</h3>
                      <p>
                        We only ask these once and your details are safe with
                        us.
                      </p>
                    </div>
                    <div className='form-inner'>
                      <div className='form-group'>
                        <Select
                          value={this.state.selectedState}
                          options={this.state.states}
                          onChange={this.handleChangeOnSelectState}
                          placeholder='Select State'
                        />
                        {this.state.submitted &&
                          this.state.formOnRoad.state === '' && (
                            <span className='text-danger'>
                              This is required
                            </span>
                          )}
                      </div>
                      <div className='form-group'>
                        {this.state.cities.length > 1 && (
                          <Select
                            value={this.state.selectedCity}
                            options={this.state.cities}
                            onChange={this.handleChangeOnSelect}
                            placeholder='Select City'
                          />
                        )}
                        {this.state.submitted &&
                          this.state.formOnRoad.state !== '' &&
                          this.state.formOnRoad.city === '' && (
                            <span className='text-danger'>
                              This is required
                            </span>
                          )}
                      </div>
                      <div className='form-group'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Name'
                          name='name'
                          value={this.state.formOnRoad.name}
                          onChange={this.handleChangeOnRoad}
                        />
                        {this.state.submitted &&
                          this.state.formOnRoad.name === '' && (
                            <span className='text-danger'>
                              This is required
                            </span>
                          )}
                      </div>
                      <div className='form-group'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Phone Number'
                          name='phoneNumber'
                          value={this.state.formOnRoad.phoneNumber}
                          onChange={this.handleChangeOnRoad}
                          maxLength={10}
                        />
                        {this.state.submitted &&
                          this.state.formOnRoad.phoneNumber === '' && (
                            <span className='text-danger'>
                              This is required
                            </span>
                          )}

                        {this.state.submitted &&
                          this.state.formOnRoad.phoneNumber !== '' &&
                          this.state.formOnRoad.phoneNumber.length < 10 && (
                            <span className='text-danger'>
                              Number not less than 10 digit
                            </span>
                          )}
                      </div>

                      <div className='button-wrap'>
                        <button
                          className='src-btn'
                          onClick={this.handleOnRoadForm}>
                          <i className='far fa-long-arrow-alt-right'></i>
                          {this.state.month} Offers
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    */}
    </>
  );
};

export default withRouter(VehicleDetail);
