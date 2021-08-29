import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import base from '../../globals/base';
import Header from '../header/header';
import Footer from '../footer/footer';
import * as constant from '../../services/constant';
import OwlCarousel from 'react-owl-carousel';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import 'owl.carousel/dist/assets/owl.carousel.css';
import showNotification from '../../services/notificationService';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import apiUrl from '../../globals/config';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Cmtcreate from './component/Cmtcreate';
import Insurancecreate from './component/Insurancecreate';
import Financecreate from './component/financecreate';
import Naayak from './component/Naayak';
import Financer from './component/Financer';
import Insurance from './component/Insurance';
// import UserBanner from './component/UserBanner';
import Delear from './component/Delear';
function User(props) {
  const name = useRef(null);
  const { register, errors, handleSubmit } = useForm();
  const [view, setview] = useState('');
  const [state, setstate] = React.useState({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Interest',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  });
  const [role, setRole] = useState();
  const [show, setshow] = useState(true);
  const [page, setPage] = useState(1);
  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  useEffect(() => {
    setRole(localStorage.getItem('role'));
    ongoing(page);
  }, [page]);
  const ongoing = (page) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .get(apiUrl + 'user/getallRoles?skip=' + page + '&limit=10', headers)

      .then((resp) => {
        setconfirmLead(resp?.data?.data[0].data); //user/getallRoles?skip=1&limit=109
        setdatacount(resp?.data?.data[0].count);
      })
      .catch((err) => {
        showNotification('danger', err.message);
      });
  };
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };
  const updateOne = (phoneNo, otp, id) => {
    props.history.push({
      pathname: '/UpdateData',
      data: { phoneNo, otp, id },
    });
  };
  const deleteOne = (id) => {
    let token = localStorage.getItem('myData');
    let headers = {
      headers: {
        'x-token': `Bearer ${token}`,
      },
    };
    axios
      .delete(apiUrl + 'user/deleteRecord/' + id, headers) //http://localhost:3040/user/deleteRecord/60543c0fc166d7237d880b1f

      .then((resp) => {
        ongoing(page);
      })
      .catch((err) => {
        showNotification('danger', err.message);
      });
  };
  const restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleChange = (evt) => {
    const value = evt.target.value;
    setview({
      ...view,
      [evt.target.name]: value,
    });
  };
  const submit = (e) => {
    var data = view;
    data.role = constant.CMT;
    axios
      .post(apiUrl + 'user/register', data)
      .then(function (response) {
        if (response) {
          setshow(false);
          // localStorage.setItem('myData', response.data.token);
          // history.push('/');
        }
        // setstatus(false);
      })
      .catch(function (error) {
        showNotification('danger', error.message);
      });
  };
  const otpsubmit = (e) => {
    axios
      .post(apiUrl + 'user/otpVerification', view)
      .then(function (response) {
        if (response) {
          setshow(false);
        }
      })
      .catch(function (err) {
        showNotification('danger', err.message);
      });
  };
  return (
    <>
      <div className='page-wrapper'>
        <div className='container-fluid'>
          <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
            <Tab label='Naayak'>
              <Naayak />
            </Tab>
            {role == constant.ADMIN ? (
              <Tab label='CMT'>
                <Naayak />
              </Tab>
            ) : (
              <Tab label='Dealer'>
                <Delear />
              </Tab>
            )}
            <Tab label='Financer'>
              <Financer />
            </Tab>
            <Tab label='Insurance'>
              <Insurance />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default User;
