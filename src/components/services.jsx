import React, { Component } from 'react'
import * as loadjs from 'loadjs';
import base from './../globals/base';
import * as service from '../services/apiServices';
import showNotification from "../services/notificationService";
import * as constant from '../services/constant';



export default class Services extends Component {
    constructor(props){
        super(props);
        this.state = {
            detail:[],
            section:['VehicleRepair','VehicleSale','Insuarance','Accessories']
         
            
        }
    }

    componentDidMount(){
        loadjs(["/assets/js/common.js"]);
        this.getServices();
    }

    getServices(){
        service.getServices()
        .then((resp)=>{
            
            if(resp?.data?.success){
                
             
                this.setState({
                    detail:resp.data.data
                });
            }
            

        })
    }
    
    render() {
        return (
        <div className="page-wrapper services-page">
            <div className="headers" id="myHeader">
                <div className="bottom-header-bar-cus">
                <div className="container">
                    <div className="d-flex align-items-center">
                    <div className="arrow-btn">
                        <button className="prev-button btn">
                        <i className="far fa-angle-left" />
                        </button>
                    </div>
                    <ul className="menu navbar-nav mx-auto">
                        <a className="nav-link active" href="#VehicleRepair">Vehicle Repair</a>
                        <a className="nav-link" href="#VehicleSale">Vehicle Sale</a>
                        <a className="nav-link" href="#Insuarance">Insurance</a>
                        <a className="nav-link" href="#Accessories">Accessories</a>
                    </ul>
                    <button className="next-button btn">
                        <i className="far fa-angle-right" />
                    </button>
                    </div>
                </div>
                </div>
            </div>
            <div className="main-content-box home-main-cb services-page">
          
            {this.state.detail.map((item,i)=>(

           
                <section key={item._id} className="page-section section-padding" id={this.state.section[i]}>
                    <div className="container">
                        <div className="section-title text-center mb-4 mb-lg-5">
                        <h2 className="title">{item.t1}</h2>
                        <p className="subtitle-2">{item.d1}
                        </p>
                        </div>
                        <div className="row">
                        <div className="col-lg-4 mb-3 mb-lg-4">
                            <div className="service-wrap">
                            <div className="inner">
                                <div className="icon">
                                <div className="icon-inner">
                                    <img src="./assets/images/about/layer.svg" alt="Icon Images" />
                                    <div className="image-2"> <i aria-hidden="true" className="fas fa-business-time" />
                                    </div>
                                </div>
                                </div>
                                <div className="content">
                                <h4 className="title">{item.t2}</h4>
                                <p className>{item.d2}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3 mb-lg-4">
                            <div className="service-wrap">
                            <div className="inner">
                                <div className="icon">
                                <div className="icon-inner">
                                    <img src="./assets/images/about/layer.svg" alt="Icon Images" />
                                    <div className="image-2"> <i aria-hidden="true" className="fas fa-business-time" />
                                    </div>
                                </div>
                                </div>
                                <div className="content">
                                <h4 className="title">{item.t3}</h4>
                                <p className>{item.d3}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3 mb-lg-4">
                            <div className="service-wrap">
                            <div className="inner">
                                <div className="icon">
                                <div className="icon-inner">
                                    <img src="./assets/images/about/layer.svg" alt="Icon Images" />
                                    <div className="image-2"> <i aria-hidden="true" className="fas fa-business-time" />
                                    </div>
                                </div>
                                </div>
                                <div className="content">
                                <h4 className="title">{item.t4}</h4>
                                <p className>{item.d4}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                 ))}
        
            </div>
        </div>

        )
    }
}
