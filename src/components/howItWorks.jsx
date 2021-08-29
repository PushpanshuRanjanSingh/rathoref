import React, { Component } from "react";
import * as service from "../services/apiServices";


export default class HowItWorks extends Component {
    constructor(props) {
        super(props);
        this.state = {

            howitwork: []
        };
    }
    componentDidMount() {
        this.getHowItWorks();
    }

    getHowItWorks() {

        service.howItWorks().then(
            (resp) => {
                if (resp?.data?.success) {
                    this.setState({
                        howitwork: resp.data.data
                    });
                }
            }
        )
    }

    render() {
        return (
            <>
                <div className="page-wrapper">
                    <section
                        className="bsteps text-center section-default parallax page-section bg-white"
                    >
                        <div className="b-steps__inner">
                            <div className="container-fluid nayk-container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="headingWrap mb-3 mb-md-4">

                                            <div className="ui-title-slogan">
                                                Helps you to find perfect car
                                            </div>
                                            <h2 className="ui-title">
                                                How Naayak
                                                <span className="text-primary"> Works</span>
                                            </h2>
                                        </div>
                                        <ul className="b-steps-list list-unstyled row">

                                            {this.state.howitwork.map((item, i) => (

                                                <li key={item._id} className="b-steps-list__item col-lg">
                                                    <span className="b-steps-list__number">
                                                        0{i + 1}
                                                    </span>
                                                    <div className="b-steps-list__title">
                                                        {item.title}
                                                    </div>
                                                    <div className="b-steps-list__info">
                                                        {item.description}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="shipping-area about-shipping">
                        <div className="container">
                            <div className="shipping-bg">
                                <div className="row shipping-wrap py-5 py-xl-0">
                                    <div className="col-lg-3">
                                        <div className="shipping-item">
                                            <div className="shipping-img">
                                                <i className="far fa-award" />
                                            </div>
                                            <div className="shipping-content">
                                                <h2 className="title">India’s #1</h2>
                                                <p className="short-desc mb-0">Largest Auto portal.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 pt-4 pt-lg-0">
                                        <div className="shipping-item">
                                            <div className="shipping-img">
                                                <i className="fal fa-truck" />
                                            </div>
                                            <div className="shipping-content">
                                                <h2 className="title">Car Sold</h2>
                                                <p className="short-desc mb-0">Every 4 minute.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 pt-4 pt-lg-0">
                                        <div className="shipping-item">
                                            <div className="shipping-img">
                                                <i className="fas fa-tags" />
                                            </div>
                                            <div className="shipping-content">
                                                <h2 className="title">Offers</h2>
                                                <p className="short-desc mb-0">
                                                    Stay updated pay less.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 pt-4 pt-lg-0">
                                        <div className="shipping-item">
                                            <div className="shipping-img">
                                                <i className="fal fa-cars" />
                                            </div>
                                            <div className="shipping-content">
                                                <h2 className="title">Compare</h2>
                                                <p className="short-desc mb-0">Decode the right car.</p>
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
