import React, { Component } from 'react'
import * as service from '../services/apiServices';
import showNotification from "../services/notificationService";
import * as constant from '../services/constant';


export default class TermsCondition extends Component {
    constructor(props){
        super(props);
        this.state = {
            detail:{}
            
        }
    }

    componentDidMount(){
        this.getPrivacyPolicy();
    }

    getPrivacyPolicy(){
        service.getPrivacyPolicy()
        .then((resp)=>{
            
            if(resp?.data?.success){
                
                
                var filtered =resp.data.data.filter(item=>{
                    return item.title==='Terms and Conditions'
                    
                })
                
                this.setState({
                    detail:filtered[0]
                });
            }
            

        })
    }

    render() {
        return (
            <div className="page-wrapper">
                <div className="section-padding content-based-page">
                    <div className="container" >
                    <h2><strong>{this.state.detail.title}</strong></h2>
                    <div dangerouslySetInnerHTML={{ __html: this.state.detail.information }}></div>

                    </div> 
                    
                </div>
            </div>

        )
    }
}
