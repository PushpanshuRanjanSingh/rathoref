import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import base from "../globals/base";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import apiBase from '../globals/config';
import * as loadjs from "loadjs";
import * as service from "../services/apiServices";
// import ReactPaginate from "react-paginate";
import Pagination from "./pagination/pagination";
import StoreContext from '../context/store';
import {getPriceInLakh, getCarImageUrl} from '../globals/constant'

export default class VehicleListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      showSecondForm: false,
      otp: "",
      page:1,
      limit:12,
      filter:'',
      vehicles:[],
      count:0,
      budget:'',
      brand:[],
      model:[],
      color:[],
      fuel:[],
      search:'',
      minPrice:'',
      maxPrice:'',
      brands:[],
      models:[],
      colors:[]
    };
  }

  static contextType = StoreContext;

  componentDidMount() {
    
    var search = this.context.store.filter;
    
    
   
    if(search.brand !== undefined){

        let brands = this.state.brand;
        brands.push(search.brand);

        let fuels = this.state.fuel;
        fuels.push(search.fuel);

        let models = this.state.model;
        models.push(search.model);

        this.getFilterForCarsBasedOnBrandModelFuel(search.brandId,'','')

        this.setState({
            brand:brands,
            model:models,
            fuel:fuels
        });

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
        )

    }else{

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
        )
    }
    this.changePage();
    this.getAllCarBrands();
  }


  getFilterForCarsBasedOnBrandModelFuel(brand,model,fuelType){
    
    service.filterForCarsBasedOnBrandModelFuel(brand,model,fuelType)
      .then(resp => {
        if (resp?.data?.success) {
          this.setState({
            models: resp.data.data
          });
          
        }
      })
  }
  getAllCarBrands() {
    service.getAllCarBrands()
      .then(resp => {
        if (resp?.data?.success) {
          this.setState({
            brands: resp.data.data
          });
          
        }
    })
  }

  

  changePage = () => {
    this.context.setPathName();
  };

  loadVehicleList(page,limit,filter,minPrice,maxPrice,brand,model,color,fuel,search){
    service.getVehicleList(page,limit,filter,minPrice,maxPrice,brand,model,color,fuel,search).then(
      (resp) => {

        if(resp?.data?.success){
          
          this.setState({
            vehicles:resp.data.data[0].data,
            count:resp.data.data[0].count
          });
          // this.setState({
          //   vehicles:resp.data.data[0].data,
          //   count:resp.data.data[0].count[0].count
          // });
        }
      }
    );
  }

  handlePageChange(data){
    
    let page = data.selected + 1;
    this.setState({
      page:page
    });
    this.loadVehicleList(
      this.state.limit, 
      page, 
      this.state.filter, 
      this.state.minPrice, 
      this.state.maxPrice, 
      this.state.brand, 
      this.state.model, 
      this.state.color, 
      this.state.fuel,
      this.state.search
    )

  }
  handleChange=(e)=>{
    const {target} = e;

    
    if(target.name === 'filter') {

      this.setState({
        [target.name]:target.value
      });

      this.loadVehicleList(
        this.state.limit, 
        this.state.page, 
        target.value, 
        this.state.minPrice, 
        this.state.maxPrice, 
        this.state.brand, 
        this.state.model, 
        this.state.color, 
        this.state.fuel,
        this.state.search
      )

    }else if(target.name === 'search'){

      this.setState({
        [target.name]:target.value
      });

      

    }else if(target.name === 'budget'){

      var price = target.value.split("-"); 
      this.setState({
        minPrice:price[0],
        maxPrice:price[1]
      });

     

    }else if(target.name === 'brand'){

      let brands = this.state.brand;
      if(!brands.includes(target.value)){
        brands.push(target.value);

      }else{
        let index = brands.indexOf(target.value);
        brands.splice(index,1);
      }

      this.setState({
        [target.name]:brands
      });
      

    }else if(target.name === 'model'){

      let models = this.state.model;
      if(!models.includes(target.value)){
        models.push(target.value);

      }else{
        let index = models.indexOf(target.value);
        models.splice(index,1);
      }

      this.setState({
        [target.name]:models
      });
      

    }else if(target.name === 'color'){

      let colors = this.state.color;
      if(!colors.includes(target.value)){
        colors.push(target.value);

      }else{
        let index = colors.indexOf(target.value);
        colors.splice(index,1);
      }

      this.setState({
        [target.name]:colors
      });
      

    }else if(target.name === 'fuel'){

      let fuels = this.state.fuel;
      if(!fuels.includes(target.value)){
        fuels.push(target.value);

      }else{
        let index = fuels.indexOf(target.value);
        fuels.splice(index,1);
      }

      this.setState({
        [target.name]:fuels
      });
      

    }
    

  }

  handleBrandChange=(v,id,e)=>{

    
    const {target} = e;

    let brands = [];
      
    brands.push(target.value);
    this.setState({
        brand: brands
    });

    this.getFilterForCarsBasedOnBrandModelFuel(id,'','')

  }
  handleModelChange=(v,id,e)=>{

    
    const {target} = e;

    let models = [];
      
    models.push(target.value);
    this.setState({
        model: models
    });

    this.getColorbyCarId(id)

  }

  getColorbyCarId(id){
    service.getColorbyCarId(id).then(
        (resp) => {
  
          if(resp?.data?.success){
            this.setState({
              colors:resp.data.data,
            });
            
          }
        }
      );
  }


  apply=()=> {
    
    this.loadVehicleList(
      this.state.limit, 
      1, 
      this.state.filter, 

      // this.state.budget, 
      this.state.minPrice, 
      this.state.maxPrice, 
      

      this.state.brand, 
      this.state.model, 
      this.state.color, 
      this.state.fuel,
      this.state.search
    )
  }
  search=(e)=>{
    e.preventDefault();
    this.loadVehicleList(
      this.state.limit, 
      1, 
      this.state.filter, 
      this.state.minPrice, 
      this.state.maxPrice, 
      this.state.brand, 
      this.state.model, 
      this.state.color, 
      this.state.fuel,
      this.state.search
    )

  }

  handleClickLink=(fuel,e)=>{

    

    localStorage.setItem('fuel',fuel);

  }
  

  render() {
        return (
            <>
  <div class="btc_tittle_main_wrapper">
  <div class="btc_tittle_img_overlay"></div>
  <div class="container">
    <div class="row">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 full_width">
        <div class="btc_tittle_left_heading">
          <h1>Vehicle Listing</h1>
        </div>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 full_width">
        <div class="btc_tittle_right_heading">
          <div class="btc_tittle_right_cont_wrapper">
            <ul>
              <li><Link to="/home">Home</Link> <i class="fa fa-angle-right"></i>
              </li>
              <li>Vehicle Listing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <div id="main-wrappers">
    <div className="page-wrapper">
      <section className="explore-products-main">
        <div className="container max-container">
          <div className="wrap explore_wrap section-ptb">
            <div className="media media-side-list">
              <div className="media-sidebar">
                <div className="sidebar-style mr-50">
                  <div className="sidebar-widget mb-20">
                    <div className="pro-sidebar-search detail-search">
                      <form className="pro-sidebar-search-form" action="#">
                        <input type="text" placeholder="Search here..." name="search" onChange={this.handleChange} />
                        <button onClick={this.search}><i className="fal fa-search" /></button>
                      </form>
                    </div>
                  </div>
                  <div className="sidebar-widget">
                    <h6 className="pro-sidebar-title">SELECT BY BUDGET</h6>
                    <div className="pro-sidebar-search my-3">
                      <form className="sidebar-widget-list" action="#">
                        <div className="custom-control custom-radio pl-0">
                          <input type="radio" id="customRadio1" name="budget" className="custom-control-input" onChange={this.handleChange} value="0-200000" />
                          <label className="custom-control-label" htmlFor="customRadio1">0-2 Lakh</label>
                        </div>
                        <div className="custom-control custom-radio pl-0">
                          <input type="radio" id="customRadio2" name="budget" className="custom-control-input" onChange={this.handleChange} value="200000-500000" />
                          <label className="custom-control-label" htmlFor="customRadio2">2-5 Lakh</label>
                        </div>
                        <div className="custom-control custom-radio pl-0">
                          <input type="radio" id="customRadio3" name="budget" className="custom-control-input" onChange={this.handleChange} value="500000-800000" />
                          <label className="custom-control-label" htmlFor="customRadio3">5-8 Lakh</label>
                        </div>
                        <div className="custom-control custom-radio pl-0">
                          <input type="radio" id="customRadio4" name="budget" className="custom-control-input" onChange={this.handleChange} value="1000000-1200000" />
                          <label className="custom-control-label" htmlFor="customRadio4">10-12 Lakh</label>
                        </div>
                        <div className="custom-control custom-radio pl-0">
                          <input type="radio" id="customRadio5" name="budget" className="custom-control-input" onChange={this.handleChange} value="1200000-10000000" />
                          <label className="custom-control-label" htmlFor="customRadio5">12+ Lakh</label>
                        </div>
                      </form>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div className="sidebar-widget mb-20">
                    <h6 className="pro-sidebar-title">SEARCH BY BRAND</h6>
                    <div className="pro-sidebar-search my-3">
                      <form className="sidebar-widget-list" action="#">
                          {this.state.brands
                          .filter(item=>{
                              return item.brandName!==undefined
                          })
                          .map((item,i)=>(

                            <div key={item._id} className="custom-control custom-radio cc-min-box pl-0">
                            <input type="radio" className="custom-control-input" id={`brands-${i}`}
                                checked={this.state.brand.includes(item.brandName)}
                                value={item.brandName}
                                name="brand"
                                onChange={this.handleBrandChange.bind(this,item.brandName,item._id)}
                            />
                            <label className="custom-control-label" htmlFor={`brands-${i}`}>{item.brandName} <span className="categories-num"></span></label>
                            </div>
                          ))}
                        
                      </form>
                    </div>
                  </div>
                  {this.state.models.length>0 &&(
                      <>
                  <hr className="my-3" />
                  <div className="sidebar-widget mb-20">
                    <h6 className="pro-sidebar-title">SEARCH BY MODEL</h6>
                    <div className="pro-sidebar-search my-3">
                      <form className="sidebar-widget-list" action="#">
                      {this.state.models
                        .filter((q) => {
                            return q.vehicleDescription[0].plName !== undefined 
                        })
                        .map((item,i)=>(

                            <div key={item._id} className="custom-control custom-radio cc-min-box pl-0">
                                <input type="checkbox" className="custom-control-input" id={`customCheck-${i}`} 
                                checked={this.state.model.includes(item.vehicleDescription[0].plName)}
                                value={item.vehicleDescription[0].plName}
                                name="model"
                                onChange={this.handleModelChange.bind(this,item.vehicleDescription[0].vehicleName,item.VehicleName)}
                                />
                                <label className="custom-control-label" htmlFor={`customCheck-${i}`}>{item.vehicleDescription[0].plName} <span className="categories-num"></span></label>
                            </div>
                        ))}
                        
                      </form>
                    </div>
                  </div>
                  </>
                  )}
                  {this.state.colors.length>0 &&(

                  <>
                  <hr className="my-3" />
                  <div className="sidebar-widget mb-20">
                    <h6 className="pro-sidebar-title">Colors</h6>
                    <div className="pro-sidebar-search my-3">
                      <form className="sidebar-widget-list" action="#">
                          {this.state.colors.map((item,i)=>(

                            <div key={item._id} className="custom-control custom-checkbox cc-min-box pl-0">
                            <input type="checkbox" className="custom-control-input" id={`colors-${i}`} 
                                checked={this.state.color.includes(item.colorName)}
                                value={item.colorName}
                                name="color"
                                onChange={this.handleChange} 
                            />
                            <label className="custom-control-label" htmlFor={`colors-${i}`}>{item.colorName} <span className="categories-num"></span></label>
                            </div>
                          ))}
                        
                      </form>
                    </div>
                  </div>
                  </>
                  )}
                  <hr className="my-3" />
                  <div className="sidebar-widget mb-20">
                    <h6 className="pro-sidebar-title">FUEL TYPE</h6>
                    <div className="pro-sidebar-search my-3">
                      <form className="sidebar-widget-list" action="#">
                        <div className="custom-control custom-checkbox cc-min-box pl-0">
                          <input type="checkbox" className="custom-control-input" id="sizes-1" 
                            checked={this.state.fuel.includes('Petrol')}
                            value="Petrol"
                            name="fuel"
                            onChange={this.handleChange} 
                          />
                          <label className="custom-control-label" htmlFor="sizes-1">Petrol <span className="categories-num"></span></label>
                        </div>
                        <div className="custom-control custom-checkbox cc-min-box pl-0">
                          <input type="checkbox" className="custom-control-input" id="sizes-2" 
                            checked={this.state.fuel.includes('Diesel')}
                            value="Diesel"
                            name="fuel"
                            onChange={this.handleChange} 
                          />
                          <label className="custom-control-label" htmlFor="sizes-2">Diesel <span className="categories-num"></span></label>
                        </div>
                        <div className="custom-control custom-checkbox cc-min-box pl-0">
                          <input type="checkbox" className="custom-control-input" id="sizes-3" 
                          checked={this.state.fuel.includes('cng')}
                          value="cng"
                          name="fuel"
                          onChange={this.handleChange} 
                          />
                          <label className="custom-control-label" htmlFor="sizes-3">CNG <span className="categories-num"></span></label>
                        </div>
                      </form>
                    </div>
                  </div>
                  <a className=" src-btn" href="#0" onClick={this.apply}>Apply</a>
                </div>
              </div>
              <div className="media-body pl-0 pl-lg-4">
                <div className="filter-btn-wrap d-lg-none">
                  <button className="filter-btn"><i className="fal fa-bars" /></button>
                </div>
                <div className="pagecontent-box">
                  <h4>Best Cars</h4>
                  <p>There are 15 cars available in India, among which popular car models include Thar, Creta, Seltos,
                    Scorpio, Swift &amp; many
                    more. The top Indian car brands are.Hatchbacks and SUVs have dominated sales figures in India. Here
                    are some of the best-selling
                    cars in 2020: Maruti Swift,Maruti WagonR,Hyundai Creta,Kia Seltos,Maruti Baleno. </p>
                </div>
                <div className="shop-top-bar">
                  <div className="select-shoing-wrap mt-3 mt-lg-0">
                    <p>Showing {this.state.vehicles.length} of {this.state.count} result</p>
                    <p></p>
                    <div className="shop-select">
                      <p>Sort By</p>
                      <select className="custom-select" name="filter" onChange={this.handleChange} value={this.state.filter}>
                        <option value="">----</option>
                        <option value="1">Price - High to Low</option>
                        <option value="2">Price - Low to High</option>
                        <option value="3">Newest to Oldest</option>
                        <option value="4">Oldest to Newest</option>
                        <option value="5">Recently Added</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  {this.state.vehicles.map((item)=>(
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="x_car_offer_main_boxes_wrapper float_left">
                        <Link title={item.vehicleDescription[0].ppl[0].brands[0].brandName+' '+item.vehicleDescription[0].vehicleName} className="title " to={`vehicle-detail/${item.vehicleDescription[0]._id}/${item.vehicleDescription[0].ppl[0].pplName}/${item.variants[0].variantName}`}>
                      <div className="x_car_offer_img float_left">
                        {/* {JSON.stringify(item.variants[0])} */}
                        <img
                          src={getCarImageUrl(item.vehicleDescription[0].primaryImage)}
                          alt="img"
                        />
                      </div>
                      <div className="gsc_col-xs-12 holder truncate">
                        <span onClick={this.handleClickLink.bind(this, item.variants[0].selectVehicleType?item.variants[0].selectVehicleType:'')}>

                        
                        <Link title={item.vehicleDescription[0].ppl[0].brands[0].brandName+' '+item.vehicleDescription[0].vehicleName} className="title " to={`vehicle-detail/${item.vehicleDescription[0]._id}/${item.vehicleDescription[0].ppl[0].pplName}/${item.variants[0].variantName}`}>
                       
                          {/* {item.vehicleDescription[0].ppl[0].brands[0].brandName} */}
                           {item.vehicleDescription[0].vehicleName}
                        </Link>
                        </span>
                        <div className="price"><span className="icon-cd_R">Rs</span>{getPriceInLakh(item.vehicleDescription[0].minimumPriceRange)} - {getPriceInLakh(item.vehicleDescription[0].maximumPriceRange)} Lakh
                                           <sup>*</sup></div>
                        
                        <div className="dotlist BottomMarginRemove">
                        { item.vehicleDescription[0].ppl[0].brands[0].brandName!==undefined && (

                          <span class="position-relative">{item.vehicleDescription[0].ppl[0].brands[0].brandName} </span>
                        )}
                        { item.vehicleDescription[0].plName!==undefined && (

                          <span class="position-relative">{item.vehicleDescription[0].plName}</span>
                        )}
                          <span class="position-relative">{item.variants[0].selectVehicleType}</span>
                        </div>
                       
                            <div className="BtnFull buttonHolder buttonHolder virtualNumberBtn ">
                            {/* <div className="primaryButton btn-dcb">View May Offers</div> */}
                            </div>
                        
                      </div>
                      </Link>
                    </div>
                  </div>
                  ))
                   }
                  <div className="col-md-12 mt-5">
                    <nav aria-label="Page navigation">
                    {this.state.count > this.state.limit ? (
                      <ul className="pagination justify-content-center">
                        <Pagination
                          page={this.state.count ? (this.state.count < this.state.limit ? 1 : this.state.count / this.state.limit) : ""}
                          handlePageClick={(data) => this.handlePageChange(data)}
                          forcepage={this.state.page}
                        />
                        </ul>
                      ) : (
                        ""
                      )}
                      {/* <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                          <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">5</a></li>
                        <li className="page-item">
                          <a className="page-link" href="#">Next</a>
                        </li>
                      </ul> */}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</>

        )
    }
}
