import React, { Component } from "react";
import StoreContext from "../context/store";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import base from "../globals/base";
import apiBase from "../globals/config";
import * as loadjs from "loadjs";
import { withRouter } from "react-router";
import * as service from "../services/apiServices";
import showNotification from '../services/notificationService';
import * as constant from '../services/constant';
import Rating from 'react-rating';
import Moment from 'react-moment';
import { getCarImageUrl, getPriceInLakh } from '../globals/constant';
import { Link } from 'react-router-dom';
import { Country, State, City }  from 'country-state-city';
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

class VehicleDetail extends Component {
  constructor(props){
    super(props)
    this.state={
        id: '',
        pplName:'',
        vehicleName:'',
        brand:'',
        model:'',
        fuel:'',
        formdata:{
            review:'',
            rating:''
        },
        reviews:[],
        limit:6,
        offset:0,
        count:0,
        rating:0,
        detail:[],
        specification:{},
        similarCars:[],
        images:[],
        faq:[],
        onRoadPrice:[],
        currentCount:0,
        spec:[],
        submitted:false,
        formOnRoad:{
            city:'',
            name:'',
            phoneNumber:'',
            lookingdays:'',
            oldcar:'',
            offer:false,
            state:''
        },
        monthNames:["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
          ],
        month:'',
        cities:[],
        states:[],
        selectedCity:{
          value: '0', 
          label: 'Select City' 
        },
        selectVehicle:'',
        minimumPriceRange:0,
        maximumPriceRange:0,
        selectedState:{
          value: '0', 
          label: 'Select State' 
        },
        specCount:0,
        features:[]

    }

  }

  static contextType = StoreContext;

    componentDidMount() {

        this.changePage();
        // loadjs([base + "assets/js/common.js"]);

        var fuel = localStorage.getItem('fuel');

        if(fuel !== undefined && fuel !== null){
            this.setState({
                fuel:fuel
            });

        }
    
        const id = this.props.match.params.id;
        const pplName = this.props.match.params.pplName;
        const vehicleName = this.props.match.params.vehicleName;
        const selectVehicle = this.props.match.params.selectVehicle;
        
            
        this.setState({
            id:id,
            pplName:pplName,
            vehicleName:vehicleName,
            selectVehicle:selectVehicle
        });
        this.getReviewsForCarModel(pplName,this.state.limit,this.state.offset);
        this.getVehicalSpecificationsForCar(id);
        
        this.getCarModelDetails(pplName,id);
        this.getFaqForCarModel(id);
        this.getOnRoadPriceForSpecificCar(id);
        this.getSpecificationVehicle(id);
        this.setMonth();
        this.setCities();
        
    }


    
    
   

    setCities(){

        const options = [{
            value: '0', 
            label: 'Select City' 
        }];
    
        // City.getCitiesOfCountry("IN").map(item=>{
        //     var obj={ 
        //         value: item.name, 
        //         label: item.name 
        //     }
        //     options.push(obj);
        // })
        this.setState({
            cities:options
        })
        //state
        const optionss = [{
            value: '0', 
            label: 'Select State' 
        }];

        var st = State.getStatesOfCountry("IN")
        st.map(item=>{
    
        
            var obj={ 
                value: item.isoCode, 
                label: item.name 
            }
            optionss.push(obj);
        })
        this.setState({
            states:optionss
        })
        
        
    }


    setMonth(){
        const d = new Date();
        this.setState({
            month:this.state.monthNames[d.getMonth()]
        });
    }

    getSpecificationVehicle(id){
      service.getSpecificationVehicle(id)
      .then((resp)=>{
          
          if(resp?.data?.success){
            if(resp.data.data.length>0){

              this.setState({
                  spec:resp.data.data[0].specification?resp.data.data[0].specification:[]
              });
              var count=0;
              var features=[];

              if(resp.data.data[0].powerSteering==true){
                var obj = {
                  name:'Power Steering'
                }
                features.push(obj);
                count++;
              }
              if(resp.data.data[0].powerWindowsFront==true){
                var obj = {
                  name:'Power Windows Front'
                }
                features.push(obj);
                count++;
              }
              if(resp.data.data[0].antiLockBrakingSystem==true){
                var obj = {
                  name:'Anti Lock Braking System'
                }
                features.push(obj);
                count++;
              }
              if(resp.data.data[0].airConditioner==true){
                var obj = {
                  name:'Air Conditioner'
                }
                features.push(obj);
                count++;
              }
              if(resp.data.data[0].driverAirbag==true){
                var obj = {
                  name:'Driver Airbag'
                }
                features.push(obj);
                count++;
              }
              if(resp.data.data[0].passengerAirbag==true){
                var obj = {
                  name:'Passenger Airbag'
                }
                features.push(obj);
                count++;
              }
              if(resp.data.data[0].automaticClimateControl==true){
                var obj = {
                  name:'Automatic Climate Control'
                }
                features.push(obj);
                count++;
              }
              if(resp.data.data[0].fogLightsFront==true){
                var obj = {
                  name:'Fog Lights - Front'
                }
                features.push(obj);
                count++;
              }
              if(resp.data.data[0].alloyWheels==true){
                var obj = {
                  name:'Alloy Wheels'
                }
                features.push(obj);
                count++;
              }
              
              this.setState({
                specCount:count
              })
              this.setState({
                features:features
              })
              
            }  
          }
          
      })
    }

  

  

    getCarModelDetails(pplName,id){
        service.getCarModelDetails(id)
        .then((resp)=>{
            
          if(resp?.data?.success){
            this.setState({
              detail:resp.data.data
            });

            const minimumPriceRange = resp.data.data.minimumPriceRange;
            const maximumPriceRange = resp.data.data.maximumPriceRange;

            this.setState({
              minimumPriceRange: minimumPriceRange,
              maximumPriceRange: maximumPriceRange
            });

            this.getOffersSimilarCars(pplName,id,minimumPriceRange,maximumPriceRange)

            

            
            
            

           

                if(resp.data.data){

                    this.setState({
                        brand: resp.data?.data?.selectPplId?.brandId?.brandName,
                        model: resp.data?.data?.vehicleName
        
                    });
                    
                    

                    var images = [];

                    if(resp.data.data?.primaryImage){
                        images.push(resp.data.data?.primaryImage);
                    }

                    let newimages = images.concat(resp.data.data?.otherImage);
                    
    
                    this.setState({
                        images:newimages
                    })
                }
                
                
            }
        })
    }

  getOnRoadPriceForSpecificCar(pplName) {
    service.getOnRoadPriceForSpecificCar(pplName).then((resp) => {
      if (resp?.data?.success) {
        this.setState({
          onRoadPrice: resp.data.data,
        });
      }
    });
  }
  getFaqForCarModel(pplName) {
    service.getFaqForCarModel(pplName).then((resp) => {
      if (resp?.data?.success) {
        this.setState({
          faq: resp.data.data,
        });
      }
    });
  }

    getOffersSimilarCars(pplName,id,minimumPriceRange,maximumPriceRange){
        service.getOffersSimilarCars(pplName,[],id,minimumPriceRange,maximumPriceRange)
        .then((resp)=>{
            if(resp?.data?.success){
                this.setState({
                    similarCars:resp.data.data.carModelDetail	?resp.data.data.carModelDetail	:[]
                });
                
                var selectVehicle=[];
                for (let item of resp.data.data.getSimilarCars||[]){
                    
                    if(id!==item._id){

                      let items = item._id;
                      selectVehicle.push(items);
                    }
                } 
                var obj={
                  id:selectVehicle,
                    // id:id
                }
                
                service.getOffersSimilarCars(pplName,obj,id,minimumPriceRange,maximumPriceRange)
                .then((resp)=>{
                    this.setState({
                        similarCars:resp.data.data.carModelDetail	?resp.data.data.carModelDetail	:[]
                    });
                    
                })
                
             
                
            }
        })
    }

    getVehicalSpecificationsForCar(pplName){
        service.getVehicalSpecificationsForCar(pplName)
        .then((resp)=>{
            
            if(resp?.data?.success){
                this.setState({
                    specification:resp.data.data[0]
                });
                
               
            }
        })
    }
    

  getReviewsForCarModel(pplName,offset,limit){
    service.getReviewsForCarModel(pplName,offset,limit)
    .then((resp)=>{
        
        if(resp?.data?.success){

            var rev = this.state.reviews;

            this.setState({
                currentCount:resp.data.data.data.length
            });
            

            let all = rev.concat(resp.data.data.data);
            
            this.setState({
                reviews:all,
                count:resp.data.data.count,
                rating:resp.data.data.avgRating[0]?resp.data.data.avgRating[0].averageRating:0
            });

        
        }
      
    });
  }


  getVehicalSpecificationsForCar(pplName) {
    service.getVehicalSpecificationsForCar(pplName).then((resp) => {
      if (resp?.data?.success) {
        this.setState({
          specification: resp.data.data[0],
        });
      }
    });
  }

  getReviewsForCarModel(pplName, offset, limit) {
    service.getReviewsForCarModel(pplName, offset, limit).then((resp) => {
      if (resp?.data?.success) {
        var rev = this.state.reviews;

        this.setState({
          currentCount: resp.data.data.data.length,
        });

        let all = rev.concat(resp.data.data.data);

        this.setState({
          reviews: all,
          count: resp.data.data.count,
          rating: resp.data.data.avgRating[0]
            ? resp.data.data.avgRating[0].averageRating
            : 0,
        });
      }
    });
  }

  resetReview(pplName, offset, limit) {
    service.getReviewsForCarModel(pplName, offset, limit).then((resp) => {
      if (resp?.data?.success) {
        var rev = [];

        this.setState({
          currentCount: resp.data.data.data.length,
        });

        let all = rev.concat(resp.data.data.data);

        this.setState({
          reviews: all,
          count: resp.data.data.count,
          rating: resp.data.data.avgRating[0]
            ? resp.data.data.avgRating[0].averageRating
            : 0,
        });
      }
    });
  }
  changePage = () => {
    this.context.setPathName();
  };

  handleChange = (e) => {
    const { target } = e;
    this.setState((prev) => ({
      formdata: {
        ...prev.formdata,
        [target.name]: target.value,
      },
    }));
  };
 
    handleChangeOnRoad=(e)=>{
        const {target}=e;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState((prev) => ({
            formOnRoad: {
                ...prev.formOnRoad,
                [target.name]: value,
            }
        }));

    }

    handleChangeOnSelect = (e) => {
        const { value } = e;

        this.setState({
            selectedCity: e
        })
        
        this.setState((prev) => ({
            formOnRoad: {
                ...prev.formOnRoad,
                city: value,
            }
        }));
    }
    handleChangeOnSelectState = (e) => {
      const { value,label } = e;

      

      this.setState({
          selectedState: e
      })
      
      this.setState((prev) => ({
          formOnRoad: {
              ...prev.formOnRoad,
              state: label,
          }
      }));

      const options = [{
        value: '0', 
        label: 'Select City' 
      }];
      var ci=City.getCitiesOfState('IN',value)
      
      
      ci.map(item=>{
      // City.getCitiesOfCountry("IN").map(item=>{
          var obj={ 
              value: item.name, 
              label: item.name 
          }
          options.push(obj);
      })
      this.setState({
        cities:options
      })
  }

    

  resetReviews() {
    this.resetReview(this.state.pplName, this.state.limit, 0);
  }
  handleReview = (e) => {
    e.preventDefault();

    // return;

    service.addReviewForCarModel(this.state.pplName,this.state.formdata)
        .then((resp)=>{
            
            if(resp.data.success){
                showNotification('success', resp.data.message)
                this.setState({
                    formdata:{
                        review:'',
                        rating:''
                    }
                });
                this.resetReviews();
            }

        }).catch(err=>{
            showNotification('danger', 'Something went wrong')
        });
  }

  handleRating = (rating) => {
    this.setState((prev) => ({
      formdata: {
        ...prev.formdata,
        rating: rating,
      },
    }));
  };

  handleViewMore = (e) => {
    var offset = this.state.offset++;

    this.getReviewsForCarModel(this.state.pplName, this.state.limit, offset);
  };

  handleOnRoadForm=(e)=>{
      e.preventDefault();
    this.setState({
        submitted:true
    })
      
      let pattern = /^[0-9]+$/;
    if(this.state.formOnRoad.state==='' || this.state.formOnRoad.city==='' || this.state.formOnRoad.name==='' ||this.state.formOnRoad.phoneNumber===''){
        return;
    }
    if(!pattern.test(this.state.formOnRoad.phoneNumber)){
        showNotification('danger', 'Please enter valid number')
        return;
    }
    if (this.state.formOnRoad.phoneNumber.length < 10) {
      return;
    }
    var obj = {};
    const myArr = this.state.formOnRoad.name.split(" ");
    obj = {
        city:this.state.formOnRoad.city,
        firstName:myArr[0]?myArr[0]:'',
        lastName:myArr[1]?myArr[1]:'',
        phoneNumber:this.state.formOnRoad.phoneNumber,
        brand:this.state.brand,
        model:this.state.model,
        fuel:this.state.fuel,
        state:this.state.formOnRoad.state

      }
    //   obj['id']=this.state.id

      service.saveDetailsToContact(obj)
        .then((resp)=>{
            
            if(resp.data.success){
                showNotification('success', resp.data.message)
                // showNotification('danger', 'Your information has been saved, we will contact you soon');
                this.setState({
                    formOnRoad:{
                        city:'',
                        name:'',
                        phoneNumber:'',
                        lookingdays:'',
                        oldcar:'',
                        offer:false,
                        state:''
                    }
                });
                this.setState({
                    submitted:false
                })
                this.setState({
                  selectedCity:{
                    value: '0', 
                    label: 'Select City' 
                  }
                })
                this.setState({
                  selectedState:{
                    value: '0', 
                    label: 'Select State' 
                  }
              })
                $('#offerModal').modal('hide');
            }

        }
        ).catch(err=>{
            showNotification('danger', 'We already have this query associated with this number,we will contact you soon');
            $('#offerModal').modal('hide');
        });

  }

  openModal = () => {
    
    this.setState({
        selectedCity:{
          value: '0', 
          label: 'Select City' 
        }
    })
    this.setState({
      selectedState:{
        value: '0', 
        label: 'Select State' 
      }
  })
    this.setState({
      formOnRoad:{
          city:'',
          name:'',
          phoneNumber:'',
          lookingdays:'',
          oldcar:'',
          offer:false,
          state:''
      }
    });
    this.setState({
        submitted:false
    })

  }

    render() {
      




        return (
            <>
           <div className="btc_tittle_main_wrapper">
  <div className="btc_tittle_img_overlay"></div>
  <div className="container">
    <div className="row">
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 full_width">
        <div className="btc_tittle_left_heading">
          {/* dd{JSON.stringify(this.state.detail)} */}
          <h1>{this.state.detail.selectPplId?.brandId.brandName} {this.state.detail.vehicleName}</h1>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 full_width">
        <div className="btc_tittle_right_heading">
          <div className="btc_tittle_right_cont_wrapper">
            <ul>
              <li><Link to="/home">Home</Link> <i className="fa fa-angle-right"></i>
              </li>
              <li><Link to="/vehicle-listing">Vehicle Listing</Link> <i className="fa fa-angle-right"></i>
              </li>
              <li>{this.state.detail.selectPplId?.brandId.brandName} {this.state.detail.vehicleName}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        <div className="page-wrapper">
          <div className="page-details-top-section">
            <div className="container nayk-container">
              <div className="row align-items-center">
                <div className="col-lg-5">
                  {this.state.images.length > 0 && (
                    <OwlCarousel
                      className="vehicle-details-top-slider owl-carousel owl-theme custom-slider"
                      loop
                      margin={10}
                      items={1}
                      nav
                      dots={false}
                    >
                      {this.state.images.map((item, i) => (
                        <div key={i} className="item">
                          <div className="img-wrap">
                            <img src={getCarImageUrl(item)} alt />
                          </div>
                        </div>
                      ))}
                    </OwlCarousel>
                  )}
                </div>
                
          
          
        
        <div className="col-lg-7" >
          <div className="top-text-wrap">
            <h1>
                {/* {JSON.stringify(this.state.detail[0])} */}
                {/* dd{JSON.stringify(this.state.detail.minimumPriceRange)} */}
            {this.state.detail.selectPplId?.brandId.brandName} {this.state.detail.vehicleName}</h1>
            <div className="rating-wrap d-flex">
              <div className="rating-list">
                <Rating
                    onChange={this.handleRating}
                    initialRating={this.state.rating}
                    emptySymbol={<i className="fal fa-star rating_color"></i>}
                    fullSymbol={<i className="fas fa-star rating_color"></i>}
                    readonly
                />
              </div>
              <div className="rating-text">
                <span>{this.state.count} reviews</span>
                <a href="#rating_div">Rate This Car</a>
              </div>
            </div>
            <div className="pricing-part d-sm-flex align-items-center">
            { this.state.detail?.minimumPriceRange!==undefined && (

              <h3>Rs.{getPriceInLakh(this.state.detail?.minimumPriceRange)} - {getPriceInLakh(this.state.detail?.maximumPriceRange)} Lakh 
              {/* <sup>*</sup> */}
              </h3>
            )}
              
            </div>
            <div className="button-wrap">
              <button className="src-btn" data-toggle="modal" data-target="#offerModal" onClick={this.openModal}>Get On Road Price</button>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
  
        <div className="page-details-main-section">
            <div className="container nayk-container">
              <div className="row">
                <div className="col-lg-9">
                  {this.state.similarCars.length > 0 && (
                    <div className="offers-section main-column-card">
                      <div className="section-heading mb-3">
                        <h3>Get Offers on Similar Cars</h3>
                      </div>

                      <OwlCarousel
                        className="similar-cars owl-carousel owl-theme custom-slider"
                        margin={10}
                        items={3}
                        nav
                        dots={false}
                        {...options}
                      >
                        {this.state.similarCars.map((item) => (
                          <div key={item._id} className="item">
                            <div className="x_car_offer_main_boxes_wrapper float_left">
                              <div className="x_car_offer_img float_left">
                                <img
                                  src={getCarImageUrl(item.primaryImage)}
                                  alt={item.vehicleName}
                                />
                              </div>
                              <div className="gsc_col-xs-12 holder truncate">
                                {/* {JSON.stringify(item)} */}
                                {/* {JSON.stringify(item.selectVehicle.selectPplId.pplName)} */}
                                {/* {JSON.stringify(item.selectVehicle.selectPplId.brandId.brandName)} */}
                                <a 
                                title={`${item?.selectPplId?.brandId?.brandName} ${item.vehicleName}`} 
                                // className="title "
                                href={`/vehicle-detail/${item._id}/${item.selectPplId.pplName}/${item.vehicleName}`} 
                                >
                                    {item.selectPplId.brandId.brandName} {item.vehicleName} 
                                </a>
                                {item.minimumPriceRange!==undefined && (

                                <div className="price"><span className="icon-cd_R">Rs</span>{getPriceInLakh(item?.minimumPriceRange)} -{getPriceInLakh(item?.maximumPriceRange)} Lakh
                                <sup>*</sup></div>
                                )}
                              </div>
                            </div>
                        </div>

                    ))}
                </OwlCarousel>
                </div>
            )}
            <section className="key-spec main-column-card">
              {this.state.spec.length > 0 && (

                <div className="spex-feature">
                  <div className="section-heading mb-3">
                    <h3>Key Specs of {this.state.detail.selectPplId?.brandId.brandName} {this.state.detail.vehicleName}</h3>
                  </div>
                  <div className="spec-list">
                    <table className="keyfeature">
                      <tbody>
                        {this.state.spec.map((item,i)=>(

                            <tr key={item._id} className={i % 2 == 0?"lefttd":"righttd"}>
                              <td>{item.title}</td>
                              <td className="right">
                                <span>{item.description}</span>
                              </td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {this.state.features.length>0 && (

              
              <div className="spex-feature">
                <div className="section-heading mb-3">
                  <h3>Key Features of {this.state.detail.selectPplId?.brandId.brandName} {this.state.detail.vehicleName}</h3>
                </div>
                <div className="spec-list">
                  <table className="keyfeature">
                    <tbody>
                      {/* {JSON.stringify(this.state.spec)} */}
                    {this.state.features.map((item,i)=>(

                      <tr key={item._id} className={i % 2 == 0?"lefttd":"righttd"}>
                        <td>{item.name}</td>
                        <td className="right">
                        
                          <i className="fal fa-check" />
                       
                       
                        </td>
                      </tr>
                    ))}
                    
                    {this.state.spec?.powerWindowsFront===true && (
                      <tr className="righttd">
                        <td>Power Windows Front</td>
                        <td className="right">
                        {this.state.spec?.powerWindowsFront===true
                        ?
            
                          <i className="fal fa-check" />
                       
                        :
                        
                          <i className="fal fa-times" />
                        
                        }
                          
                        </td>
                      </tr>
                      )}
                      {this.state.spec?.antiLockBrakingSystem===true && (
                      <tr className="lefttd">
                        <td>Anti Lock Braking System</td>
                        <td className="right">
                        {this.state.spec?.antiLockBrakingSystem===true
                        ?
            
                          <i className="fal fa-check" />
                       
                        :
                        
                          <i className="fal fa-times" />
                        
                        }
                        </td>
                      </tr>
                      )}
                      {this.state.spec?.airConditioner===true && (
                      <tr className="righttd">
                        <td>Air Conditioner</td>
                        <td className="right">
                        {this.state.spec?.airConditioner===true
                        ?
            
                          <i className="fal fa-check" />
                       
                        :
                        
                          <i className="fal fa-times" />
                        
                        }
                        </td>
                      </tr>
                      )}
                      {this.state.spec?.driverAirbag===true && (
                      <tr className="lefttd">
                        <td>Driver Airbag</td>
                        <td className="right">
                        {this.state.spec?.driverAirbag===true
                        ?
            
                          <i className="fal fa-check" />
                       
                        :
                        
                          <i className="fal fa-times" />
                        
                        }
                        </td>
                      </tr>
                      )}
                      {this.state.spec?.passengerAirbag===true && (
                      <tr className="righttd">
                        <td>Passenger Airbag</td>
                        <td className="right">
                        {this.state.spec?.passengerAirbag===true
                        ?
            
                          <i className="fal fa-check" />
                       
                        :
                        
                          <i className="fal fa-times" />
                        
                        }
                        </td>
                      </tr>
                      )}
                      {this.state.spec?.automaticClimateControl===true && (
                      <tr className="lefttd">
                        <td>Automatic Climate Control</td>
                        <td className="right">
                        {this.state.spec?.automaticClimateControl===true
                        ?
            
                          <i className="fal fa-check" />
                       
                        :
                        
                          <i className="fal fa-times" />
                        
                        }
                        </td>
                      </tr>
                      )}
                      {this.state.spec?.fogLightsFront===true && (
                      <tr className="righttd">
                        <td>Fog Lights - Front</td>
                        <td className="right">
                        {this.state.spec?.fogLightsFront===true
                        ?
            
                          <i className="fal fa-check" />
                       
                        :
                        
                          <i className="fal fa-times" />
                        
                        }
                        </td>
                      </tr>
                      )}
                      {this.state.spec?.alloyWheels===true && (
                      <tr className="lefttd">
                        <td>Alloy Wheels</td>
                        <td className="right">
                        {this.state.spec?.alloyWheels===true
                        ?
            
                          <i className="fal fa-check" />
                       
                        :
                        
                          <i className="fal fa-times" />
                        
                        }
                        </td>
                      </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              )}
            </section>

            {this.state.specification && (
                <section className="key-spec main-column-card">
                    <div className="section-heading mb-3">
                        <h3>{this.state.specification?.addTitle}</h3>
                    </div>
                    <div dangerouslySetInnerHTML={{__html:this.state.specification?.description}}></div>
                </section>
                
                
                
            )}
         

            
                 
                {this.state.faq.length > 0 && (
                <section className="faq-section main-column-card">
                    <div className="section-heading mb-3">
                    <h3>FAQ</h3>
                    </div>
                    <div className="faq-wrap">
                    <div className="accordion" id="faq">
                        {this.state.faq.map((item, i) => (
                        <div key={item._id} className="card">
                            <div className="card-header" id={`faqhead${i}`}>
                            <a
                                href="#"
                                className="btn btn-header-link"
                                data-toggle="collapse"
                                data-target={`#faq${i}`}
                                aria-expanded="true"
                                aria-controls={`faq${i}`}
                            >
                                {item.question}
                            </a>
                            </div>
                            <div
                            id={`faq${i}`}
                            className="collapse"
                            aria-labelledby={`faqhead${i}`}
                            data-parent="#faq"
                            >
                            <div className="card-body">{item.answer}</div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </section>
                )}
                  <section
                    className="ratings-section main-column-card"
                    id="rating_div"
                  >
                    <div className="section-heading mb-3">
                      <h3>
                        {this.state.detail.selectPplId?.brandId.brandName}{" "}
                        {this.state.detail.vehicleName} User Reviews{" "}
                      </h3>
                    </div>
                    <div className="rating-sumary">
                      <div className="row">
                        <div className="col-md-5 mb-3 mb-md-0">
                          <div className="media rating-star-text align-items-center">
                            <div className="icon-wrap">
                              {/* <i className="fas fa-star" /> */}
                              <Rating
                                onChange={this.handleRating}
                                initialRating={this.state.rating}
                                emptySymbol={
                                  <i className="fal fa-star rating_color"></i>
                                }
                                fullSymbol={
                                  <i className="fas fa-star rating_color"></i>
                                }
                                readonly
                              />
                            </div>
                            <div className="media-body">
                              <p>
                                Based on
                                <br />
                                {this.state.count} User reviews
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <div className="button-wrap">
                            <button
                              className="src-btn"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapsereview"
                              aria-expanded="false"
                              aria-controls="collapsereview"
                            >
                              Write a Review
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className="collapse comment-card"
                        id="collapsereview"
                      >
                        <div className="comment-body">
                          <h3>
                            Write your Comment on{" "}
                            {this.state.detail.selectPplId?.brandId.brandName}{" "}
                            {this.state.detail.vehicleName}
                          </h3>
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              name="review"
                              value={this.state.formdata.review}
                              onChange={this.handleChange}
                            />
                            <Rating
                              onChange={this.handleRating}
                              initialRating={this.state.formdata.rating}
                              emptySymbol={
                                <i className="fal fa-star rating_color"></i>
                              }
                              fullSymbol={
                                <i className="fas fa-star rating_color"></i>
                              }
                            />
                          </div>
                          <button
                            className="src-btn"
                            onClick={this.handleReview}
                          >
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="rating-list-wrap">
                      {this.state.reviews.map((item) => (
                        <div key={item._id} className="rating-wrap">
                          {/* {JSON.stringify(item)} */}
                          <div className="rating-stars">
                            <Rating
                              onChange={this.handleRating}
                              initialRating={item.rating}
                              emptySymbol={
                                <i className="fal fa-star rating_color"></i>
                              }
                              fullSymbol={
                                <i className="fas fa-star rating_color"></i>
                              }
                              readonly
                            />
                          </div>
                          <div className="text-wrap">
                            {/* <h3>Best Premium Hatchback</h3> */}
                            <p>{item.review}</p>
                          </div>
                          <div className="comment-mata">
                            {item.added_by !== undefined &&
                            item.added_by !== null ? (
                              <h5>
                                By{" "}
                                {item.added_by.firstName
                                  ? item.added_by.firstName +
                                    " " +
                                    item.added_by.lastName
                                  : "Anonymous"}
                              </h5>
                            ) : (
                              <h5>By Anonymous </h5>
                            )}
                            <small>
                              On:{" "}
                              <Moment format="MMM DD, YYYY">
                                {item.createdAt}
                              </Moment>
                              {/* | 28 Views */}
                            </small>
                          </div>

                          <div
                            className="collapse comment-card"
                            id="collapseCom1"
                          >
                            <div className="comment-body">
                              <h3>
                                Write your Comment on{" "}
                                {
                                  this.state.detail.selectPplId?.brandId
                                    .brandName
                                }{" "}
                                {this.state.detail.vehicleName}
                              </h3>
                              <div className="form-group">
                                <textarea className="form-control" />
                              </div>
                              <button className="src-btn">Post Comment</button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {this.state.currentCount >= this.state.limit && (
                        <div className="col-md-2 ">
                          <div className="button-wrap text-center">
                            <button
                              className="src-btn"
                              type="button"
                              onClick={this.handleViewMore}
                            >
                              View More
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
                <div className="col-lg-3">
                  {this.state.onRoadPrice.length > 0 && (
                    <div className="sidebar-column-card sidebar-price">
                      <div className="section-heading mb-3">
                        <h3>
                          {this.state.detail.selectPplId?.brandId.brandName}{" "}
                          {this.state.detail.vehicleName} Price in India
                        </h3>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>City</th>
                            <th>Ex-Showroom Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.onRoadPrice.map((item) => (
                            <tr key={item._id}>
                              <td>
                                <a
                                  href
                                  title={`${item.carModel} Price in ${item.city}`}
                                >
                                  {item.city}
                                </a>
                              </td>
                              <td>
                                {item.minimumPriceRange} -{" "}
                                {item.maximumPriceRange}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        </table>
                </div>
                    )}
                </div>
            </div>
            </div>
        </div>
        </div>
     
        <div className="modal fade offerModal" id="offerModal" tabindex="-1" role="dialog" aria-labelledby="offerModalTitle"
    aria-hidden="true">
    <div className="modal-dialog modal-lg modal-dialog-centered " role="document">
        <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <i className="fal fa-times"></i>
            </button>
            <div className="modal-body p-0">
                <div className="row no-gutters">
                    <div className="col-lg-4">
                        <div className="img-wrap">
                            
                            <img src="/assets/images/imag.jpg"
                                alt="Offers" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="form-wrap">
                            <div className="heading-wrap text-center">
                                <h3>View Personalized Offers On {this.state.model}</h3>
                                <p>We only ask these once and your details are safe with us.</p>
                            </div>
                            <div className="form-inner">
                                <div className="form-group">
                                    <Select 
                                        value={this.state.selectedState}
                                        options={this.state.states} 
                                        onChange={this.handleChangeOnSelectState} 
                                        placeholder="Select State"
                                    />
                                    {this.state.submitted && this.state.formOnRoad.state==='' && (
                                        <span className="text-danger">This is required</span>
                                    )}
                                    

                                </div>
                                <div className="form-group">
                                {this.state.cities.length>1 && (

                                  <Select 
                                      value={this.state.selectedCity}
                                      options={this.state.cities} 
                                      onChange={this.handleChangeOnSelect} 
                                      placeholder="Select City"
                                  />
                                  )}
                                  {this.state.submitted && this.state.formOnRoad.state!==''&& this.state.formOnRoad.city==='' && (
                                      <span className="text-danger">This is required</span>
                                  )}
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.formOnRoad.name} onChange={this.handleChangeOnRoad}/>
                                    {this.state.submitted && this.state.formOnRoad.name==='' && (
                                        <span className="text-danger">This is required</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Phone Number" name="phoneNumber" value={this.state.formOnRoad.phoneNumber} onChange={this.handleChangeOnRoad} maxLength={10}/>
                                    {this.state.submitted && this.state.formOnRoad.phoneNumber==='' && (
                                        <span className="text-danger">This is required</span>
                                    )}
                                  
                                    {this.state.submitted &&
                                      this.state.formOnRoad.phoneNumber !== "" &&
                                      this.state.formOnRoad.phoneNumber.length <
                                        10 && (
                                        <span className="text-danger">
                                          Number not less than 10 digit
                                        </span>
                                      )}
                                </div>

                                
                                
                                <div className="button-wrap">
                                    <button className="src-btn" onClick={this.handleOnRoadForm}><i className="far fa-long-arrow-alt-right"></i> 
                                    {this.state.month} Offers</button>
                                </div>

                            </div>
                        </div>
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

export default withRouter(VehicleDetail);
