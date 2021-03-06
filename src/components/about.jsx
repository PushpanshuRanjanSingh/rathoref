import React, { Component } from 'react';
import * as service from '../services/apiServices';
import showNotification from '../services/notificationService';
import { getTeamImageUrl } from '../globals/constant';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      team: [],
    };
  }
  // componentDidMount() {
  //   this.getAbout();
  // // }

  // getAbout() {
  //   service.getAbout().then((resp) => {
  //     if (resp?.data?.success) {
  //       this.setState({
  //         detail: resp.data.data[0],
  //       });
  //     }
  //   });
  //   service.getTeamMembers().then((resp) => {
  //     if (resp?.data?.success) {
  //       this.setState({
  //         team: resp.data.data,
  //       });
  //     }
  //   });

  //   // getTeamMembers
  // }

  render() {
    return (
      <>
        <div className='page-wrapper'>
          <div className='about-page-sections section-padding'>
            <div className='container nayk-container'>
              <div className='row axil-featured align-items-center'>
                <div className='col-lg-6 col-xl-6 col-md-12 col-12 mb-4 mb-lg-0'>
                  <div className='thumb-inner'>
                    <img
                      className='image w-100 img-fluid'
                      src='./assets/images/about/about.png'
                      alt='Featured Images'
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-xl-6 col-md-12 col-12'>
                  <div className='inner'>
                    <div className='section-title text-left'>
                      <h2 className='title '>{'About us'}</h2>
                    </div>
                    <div className='text-wrap'>
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer. Lorem ipsum dolor sit, amet consectetur
                      adipisicing elit. Laudantium in dicta saepe corporis
                      quidem unde officia sint, impedit explicabo error earum
                      nisi odio quam molestias, ab maiores cumque adipisci
                      perspiciatis. Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Labore placeat unde laudantium ipsa
                      animi maiores autem temporibus, ullam aut, atque officia
                      laborum quaerat ipsam facilis id. Incidunt maxime pariatur
                      beatae. Lorem, ipsum dolor sit amet consectetur
                      adipisicing elit. Delectus qui animi veniam pariatur
                      nulla! Pariatur distinctio corrupti voluptatum ut
                      consequuntur itaque facere, quibusdam repellat qui libero
                      voluptatem et iusto esse!Lor Lorem ipsum dolor sit amet
                      consectetur, adipisicing elit. Obcaecati labore ipsa enim
                      assumenda, reprehenderit recusandae doloremque saepe.
                      Rerum porro deleniti, neque repellendus explicabo non a
                      facere aliquid qui autem minus!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='section-padding why-choose-section'>
            <div className='container nayk-container'>
              <div className='section-title text-center mb--20'>
                <h2 className='title'>Why Choose Us</h2>
                <p className='subtitle-2'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia, corrupti inventore repellat quod libero nisi
                  cupiditate, reprehenderit commodi vel, nostrum rerum labore
                  odit eveniet porro aliquid. Esse adipisci fugit rerum?
                </p>
              </div>
              <div className='row'>
                {/* Start Single Service */}
                <div className='col-lg-4 col-md-6 col-12 mt-40'>
                  <div className='service-box '>
                    <div className='icon'>
                      <img
                        src='./assets/images/about/layer.svg'
                        alt='Icon Images'
                      />
                      <div className='text'>1</div>
                    </div>
                    <div className='content'>
                      <h4 className='title'>
                        <a href>Exceed clients??? and colleagues??? expectations</a>
                      </h4>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Iusto asperiores dolorum exercitationem. Nulla nostrum
                        itaque hic quas? Praesentium, dolorum veniam deserunt
                        sed nam quia voluptatum quaerat temporibus id? Quisquam,
                        laboriosam.
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Single Service  */}
                {/* Start Single Service  */}
                <div className='col-lg-4 col-md-6 col-12 mt-40'>
                  <div className='service-box color-var-2 '>
                    <div className='icon'>
                      <img
                        src='./assets/images/about/layer.svg'
                        alt='Icon Images'
                      />
                      <div className='text'>2</div>
                    </div>
                    <div className='content'>
                      <h4 className='title'>
                        <a href>
                          Take ownership and question the status quo in a
                          constructive manner
                        </a>
                      </h4>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illum, dolor fuga? Harum itaque eos voluptas. Debitis
                        perspiciatis, suscipit laborum consequuntur soluta
                        necessitatibus, facilis quaerat, veniam quod
                        voluptatibus inventore deserunt repellendus?
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Single Service  */}
                {/* Start Single Service  */}
                <div className='col-lg-4 col-md-6 col-12 mt-40'>
                  <div className='service-box color-var-3 '>
                    <div className='icon'>
                      <img
                        src='./assets/images/about/layer.svg'
                        alt='Icon Images'
                      />
                      <div className='text'>3</div>
                    </div>
                    <div className='content'>
                      <h4 className='title'>
                        <a href>
                          Take ownership and question the status quo in a
                          constructive manner
                        </a>
                      </h4>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illum, dolor fuga? Harum itaque eos voluptas. Debitis
                        perspiciatis, suscipit laborum consequuntur soluta
                        necessitatibus, facilis quaerat, veniam quod
                        voluptatibus inventore deserunt repellendus?
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Single Service  */}
                {/* Start Single Service  */}
                <div className='col-lg-4 col-md-6 col-12 mt-40'>
                  <div className='service-box color-var-4'>
                    <div className='icon'>
                      <img
                        src='./assets/images/about/layer.svg'
                        alt='Icon Images'
                      />
                      <div className='text'>4</div>
                    </div>
                    <div className='content'>
                      <h4 className='title'>
                        <a href>
                          Take ownership and question the status quo in a
                          constructive manner
                        </a>
                      </h4>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illum, dolor fuga? Harum itaque eos voluptas. Debitis
                        perspiciatis, suscipit laborum consequuntur soluta
                        necessitatibus, facilis quaerat, veniam quod
                        voluptatibus inventore deserunt repellendus?
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Single Service  */}
                {/* Start Single Service  */}
                <div className='col-lg-4 col-md-6 col-12 mt-40'>
                  <div className='service-box color-var-5'>
                    <div className='icon'>
                      <img
                        src='./assets/images/about/layer.svg'
                        alt='Icon Images'
                      />
                      <div className='text'>5</div>
                    </div>
                    <div className='content'>
                      <h4 className='title'>
                        <a href>
                          Take ownership and question the status quo in a
                          constructive manner
                        </a>
                      </h4>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illum, dolor fuga? Harum itaque eos voluptas. Debitis
                        perspiciatis, suscipit laborum consequuntur soluta
                        necessitatibus, facilis quaerat, veniam quod
                        voluptatibus inventore deserunt repellendus?
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Single Service  */}
                {/* Start Single Service  */}
                <div className='col-lg-4 col-md-6 col-12 mt-40'>
                  <div className='service-box color-var-2'>
                    <div className='icon'>
                      <img
                        src='./assets/images/about/layer.svg'
                        alt='Icon Images'
                      />
                      <div className='text'>6</div>
                    </div>
                    <div className='content'>
                      <h4 className='title'>
                        <a href>
                          Take ownership and question the status quo in a
                          constructive manner
                        </a>
                      </h4>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illum, dolor fuga? Harum itaque eos voluptas. Debitis
                        perspiciatis, suscipit laborum consequuntur soluta
                        necessitatibus, facilis quaerat, veniam quod
                        voluptatibus inventore deserunt repellendus?
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Single Service  */}
              </div>
            </div>
          </div>
          <div className='shipping-area about-shipping'>
            <div className='container'>
              <div className='shipping-bg'>
                <div className='row shipping-wrap py-5 py-xl-0'>
                  <div className='col-lg-3'>
                    <div className='shipping-item'>
                      <div className='shipping-img'>
                        <i className='far fa-award' />
                      </div>
                      <div className='shipping-content'>
                        <h2 className='title'>India???s #1</h2>
                        {/* <p className='short-desc mb-0'>Largest Auto portal.</p> */}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-3 pt-4 pt-lg-0'>
                    <div className='shipping-item'>
                      <div className='shipping-img'>
                        <i className='fal fa-users' />
                      </div>
                      <div className='shipping-content'>
                        <h2 className='title'>Total Distrubter</h2>
                        {/* <p className='short-desc mb-0'>Every 4 minute.</p> */}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-3 pt-4 pt-lg-0'>
                    <div className='shipping-item'>
                      <div className='shipping-img'>
                        <i className='fal fa-users' />
                      </div>
                      <div className='shipping-content'>
                        <h2 className='title'>Total Company</h2>
                        {/* <p className='short-desc mb-0'>Every 4 minute.</p> */}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-3 pt-4 pt-lg-0'>
                    <div className='shipping-item'>
                      <div className='shipping-img'>
                        <i className='fas fa-tags' />
                      </div>
                      <div className='shipping-content'>
                        <h2 className='title'>Offers</h2>
                        {/* <p className='short-desc mb-0'>
                          Stay updated pay less.
                        </p> */}
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
