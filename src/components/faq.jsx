import React, { Component } from 'react'
import * as service from "../services/apiServices";
import showNotification from '../services/notificationService';
import * as constant from '../services/constant';

export default class Faq extends Component {
    constructor(props){
        super(props);
        this.state = {
            formdata:{
                name:'',
                email:'',
                subject:'',
                question:'',
            },
            submitted:false,
            emailError:false,
            faq:[]
        }
    }
    componentDidMount(){
        this.getFaq();
    }

    getFaq(){
        service.getFaq()
        .then(resp=>{
            if(resp?.data?.success){
                this.setState({
                    faq:resp.data.data
                });
            }
        })
    }

    handleChange=(e)=>{
        const {target} = e;
        this.setState((prev) => ({
            formdata: {
              ...prev.formdata,
              [target.name]: target.value,
            }
        }));
    }

    handleForm=(e)=>{
        e.preventDefault();

        this.setState({
            submitted:true
        });

        if(this.state.formdata.name==='' || this.state.formdata.email===''){
            return false;
        }

        let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!pattern.test(this.state.formdata.email)){
            
            this.setState({
                emailError:true
            });
            return;
        }else{
            this.setState({
                emailError:false
            });
        }

        service.askYourQuestions(this.state.formdata)
        .then((resp)=>{
            
            if(resp?.data?.success){
                showNotification('success', resp.data.message)
                
                this.setState({
                    formdata:{
                        name:'',
                        email:'',
                        subject:'',
                        question:''
                    }
                });               
                this.setState({
                    submitted:false,
                    emailError:false
                });
            }

        }).catch(err=>{
            showNotification('danger', constant.ERRORMSG)
        });

    }

    render() {
        return (
            <div className="page-wrapper">
                <div className="section-padding faq-page">
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-7">
                        <div className="accordion" id="faq">
                            {this.state.faq.map((item,i)=>(

                                <div key={item._id} className="card">
                                    
                                    <div className="card-header" id={`faqhead${i}`}>
                                    
                                        <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target={`#faq${i}`} aria-expanded="true" aria-controls={`faq${i}`}>{item.question}
                                        </a>
                                    </div>
                                    <div id={`faq${i}`} className="collapse" aria-labelledby={`faqhead${i}`} data-parent="#faq">
                                        <div className="card-body">
                                        {item.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                        </div>
                        <div className="col-lg-4 col-md-5">
                        <div className="default-form-area">
                            <div className="section-heading mb-3">
                            <h3>Ask Your Questions</h3>
                            </div>
                            <form onSubmit={this.handleForm}>
                            <div className="default-form">
                                <div className="form-group">
                                <input type="text" className="form-control" placeholder="Name *" value={this.state.formdata.name} name="name" onChange={this.handleChange} maxLength="100"/>
                                {this.state.submitted && this.state.formdata.name==='' && (
                                    <span className="text-danger"> This is required</span>
                                )}
                                </div>
                                <div className="form-group">
                                <input type="email" className="form-control" placeholder="Mail *" value={this.state.formdata.email} name="email" onChange={this.handleChange} maxLength="100"/>
                                {this.state.submitted && this.state.formdata.email==='' && (
                                    <span className="text-danger"> This is required</span>
                                )}
                                {this.state.submitted && this.state.emailError && (
                                    <span className="text-danger"> Please enter valid email</span>
                                )}
                                </div>
                                <div className="form-group">
                                <input type="text" className="form-control" placeholder="Subject" value={this.state.formdata.subject} name="subject" onChange={this.handleChange} maxLength="100" />
                               
                                </div>
                                <div className="form-group">
                                <textarea className="form-control" placeholder="Your questions...." value={this.state.formdata.question} name="question" onChange={this.handleChange} maxLength="100"/>
                                
                                </div>
                                <div className="button-wrap">
                                <button className="src-btn auto-width">Write a Review</button>
                                </div>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

        )
    }
}
