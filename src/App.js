/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

import React, { useEffect, useState } from 'react';
import * as loadjs from 'loadjs';
// import React from "react";
import MainAdmin from '../src/containers/main/main';
import { Route, Switch, BrowserRouter, Router } from 'react-router-dom';

import BankDetails from './containers/bankDetails';
import Buying from './containers/buying';
import Documents from './containers/Documents';
import BuyingDetails from './containers/buyingDetails';
import Address from './containers/address';
import VehicleInformation from './containers/vehicleInformation';
import NewLeads from './containers/newLeads';
import AddLead from './containers/addLead';
import Signup from './containers/signup';
import Leads from './containers/leads';
import Earnings from './containers/earnings';
import UploadDocument from './containers/uploadDocument';
import EmiCalculator from './containers/emiCalculator';
// import Profile from "./containers/profile";
// import Dealer from "./container/dealership/dealer";
/* import Dealer from "./containers/dealership/dealer"; */
import Inventorymanagement from './containers/inventory/inventorymanagement';
import history from './history';
import base from './globals/base';
// import Header from "./containers/header/header";
import Help from './containers/help';
//dealer ----
import CompletedDeals from './containers/dealer/completedDeals';
import Inventory from './containers/dealer/inventory';
import InventoryEdit from './containers/dealer/inventoryEdit';
import OngoingDeals from './containers/dealer/ongoingDeals';
import PendingDeals from './containers/dealer/pendingDeals';
import PendingForm from './containers/dealer/pendingForm';
import UpdateLeadData from './containers/updateLeadData';
import Stageone from './containers/dealer/stageone';
import Stagetwo from './containers/dealer/stagetwo';
import Stagefour from './containers/dealer/stagefour';
import Stagefive from './containers/dealer/stagefive';
// import UpdateLeadData from "./containers/updateLeadData"
import ViewOnGoingDeals from './containers/dealer/viewOngoingDeals';
//finance ----
import Financedasboard from './containers/financedasboard/finance';
import Completeddeal from './containers/financepanel/completeddeal/index';
import Freshclients from './containers/financepanel/freshclients/index';
import Reviewedclients from './containers/financepanel/reviewedclients/index';
import Doreadyclients from './containers/financepanel/doreadyclients/index';
import Financel2 from './containers/financepanel/financel2/index';
import Ammount from './containers/financepanel/ammount/index';
import Financel3 from './containers/financepanel/financel3/index';
//insurance ----
import Insurancedasboard from './containers/insurancedasboard/insuranceview';
import Clientdetails from './containers/insurance/clientdetails';
import InsuranceUpload from './containers/insurance/insuranceUpload/index';
//customermanagement ----
import Customermanagement from './containers/customermanagement/customer';
import Customerdocument from './containers/customermanpanel/customerdocument';
import Customerquotation from './containers/customermanpanel/customerquotation';
import Customerinsurance from './containers/customermanpanel/customerinsurance';
import Customerreview from './containers/customermanpanel/customerreview';
import Customerlead from './containers/customermanpanel/customerLead';
import CustomerReport from './containers/customermanpanel/customerreport';
import Customer from './containers/admin/customer';
import Agent from './containers/admin/agent';
import User from './containers/admin/user';
import Report from './containers/admin/reprot';
import Onboardingdasboard from './containers/onboardingdasboard/onboarding';
import Onboardinguser from './containers/onboardingpanel/onboardinguser/index';
import Onboardinglisting from './containers/onboardingpanel/onboardinglisting/index';
import Onboardingreport from './containers/onboardingpanel/onboardingreport/index';
import Notifications from './containers/notifications';

// import { Footer } from "rsuite";

// import base from "./globals/base";
import './App.css';
import HomePage from './components/homePage';
import './front_assets/css/plugins/bootstrap.min.css';
import './front_assets/css/style.css';
import './front_assets/css/common.css';
import './assets/css/main.css';
import './front_assets/css/helper.css';
import './front_assets/css/plugins/animate.min.css';
import './front_assets/css/perfect-scrollbar.css';
import './front_assets/css/metisMenu.min.css';
import './front_assets/css/fontawesome/css/all.css';
import './front_assets/css/responsive.css';
import Header from './components/header';
import Footer from './components/footer';
import About from './components/about';
import Company from './components/Company';
import Distributer from './components/Distributer';
// import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Services from './components/services';
import Faq from './components/faq';
import PrivacyPolicy from './components/privacyPolicy';
import TermsCondition from './components/termsCondition';
import VehicleListing from './components/vehicleListing';
import VehicleDetail from './components/vehicleDetail';
import Account from './components/account';
import Provider from './context/provider';
import HowItWorks from './components/howItWorks';
import ContactUs from './components/contactUs';

const routes = [
  {
    exact: true,
    path: '/about',
    Component: About,
  },
  {
    exact: true,
    path: '/services',
    Component: Services,
  },
  {
    exact: true,
    path: '/faq',
    Component: Faq,
  },
  {
    exact: true,
    path: '/privacy-policy',
    Component: PrivacyPolicy,
  },
  {
    exact: true,
    path: '/terms-condition',
    Component: TermsCondition,
  },
  {
    exact: true,
    path: '/vehicle-listing',
    Component: VehicleListing,
  },
  {
    exact: true,
    path: '/vehicle-detail/:id/:pplName/:vehicleName',
    Component: VehicleDetail,
  },
  {
    exact: true,
    path: '/account',
    Component: Account,
  },

  {
    exact: true,
    path: '/home',
    Component: HomePage,
  },

  {
    exact: true,
    path: '/how-it-works',
    Component: HowItWorks,
  },
  {
    exact: true,
    path: '/contact-us',
    Component: ContactUs,
  },
  {
    exact: true,
    path: '/company',
    Component: Company,
  },
  {
    exact: true,
    path: '/distributer',
    Component: Distributer,
  },
];

function App() {
  const role_n = localStorage.getItem('role');

  const [role, setRole] = useState(role_n);
  useEffect(() => {
    loadjs(['/naayak/assets/js/custom.js']);
    loadjs(['/assets/js/header_login.js']);
    loadjs(['/assets/js/sticky.js']);
  }, []);
  history.listen((location, action) => {
    loadjs(['/naayak/assets/js/custom.js']);
    // loadjs([base + "assets/js/common.js"]);
  });
  return (
    <Provider>
      <BrowserRouter history={history}>
        <Switch>
          <Route path='/signup' component={Signup} />
          {/* onboardingdasboardmponent={Stageone} /> */}
          {/* <Route path="/customermanagementreview" component={Customerreview} />
        <Route path="/customermanagementlead" component={Customerlead} />
        <Route path="/customermanagementreport" component={CustomerReport} />
          <Route
          path="/customermanagementinsurance"
          component={Customerinsurance}
        />
        <Route
          path="/customermanagementquotation"
          component={Customerquotation}
        />
        <Route
          path="/customermanagementdocument"
          component={Customerdocument}
        />
        <Route path="/Customermanagement" component={Customermanagement} />
        <Route path="/admincustomers" component={Customer} />
        <Route path="/adminagents" component={Agent} />
        <Route path="/adminusers" component={User} />
        <Route path="/adminreports" component={Report} />

        <Route path="/clientdetails" component={Clientdetails} />
        <Route path="/insuranceUpload" component={InsuranceUpload} />
       
        <Route path="/insurancedasboard" component={Insurancedasboard} />
        <Route path="/doreadyclients" component={Doreadyclients} />
        <Route path="/financel2" component={Financel2} />
        <Route path="/financel3" component={Financel3} />
        <Route path="/ammount" component={Ammount} />
        <Route path="/reviewedclients" component={Reviewedclients} />
        <Route path="/freshclients" component={Freshclients} />
        <Route path="/completeddeal" component={Completeddeal} />
        <Route path="/financedasboard" component={Financedasboard} />
        <Route path="/inventory" component={Inventorymanagement} />
        {/* <Route path="/dealership" component={Dealer} />
        <Route path="/buying" component={Buying} />
        <Route path="/signup" component={Signup} />
        <Route path="/Documents" component={Documents} />
        <Route path="/buyingDetails" component={BuyingDetails} />
        <Route path="/address" component={Address} />
        <Route path="/vehicleInformation" component={VehicleInformation} />
        <Route path="/newLeads" component={NewLeads} />
        <Route path="/addLead" component={AddLead} />
        <Route path="/emiCalculator" component={EmiCalculator} />
        <Route path="/uploadDocument" component={UploadDocument} />
        <Route path="/earnings" component={Earnings} />
        <Route path="/leads" component={Leads} />
        <Route path="/help" component={Help} />

        <Route path="/bankDetails" component={BankDetails} />
        <Route path="/updateLeadData" component={UpdateLeadData} />
        <Route path="/view" component={ViewOnGoingDeals} />
        <Route path="/completedDeals" component={CompletedDeals} />
        <Route path="/pendingDeals" component={PendingDeals} />
        <Route path="/PendingForm" component={PendingForm} />
        <Route path="/inventoryMain" component={Inventory} />
        <Route path="/inventoryEdit" component={InventoryEdit} />
        <Route path="/ongoingDeals" component={OngoingDeals} />
        <Route path="/onboardingdasboard" component={Onboardingdasboard} />
        <Route path="/onboardinguser" component={Onboardinguser} />
        <Route path="/onboardinglisting" component={Onboardinglisting} />
        <Route path="/onboardingreport" component={Onboardingreport} />
        <Route path="/notifications" component={Notifications} /> */}

          {routes.map((route, idx) => {
            const { exact, path, Component } = route;
            return (
              <Route
                key={`route-${idx}`}
                exact={exact}
                path={path}
                render={() => (
                  <RenderPage history={history}>
                    <Component />
                  </RenderPage>
                )}
              />
            );
          })}

          {/* <Route path="/services" component={Services} />
        <Route path="/faq" component={Faq} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-condition" component={TermsCondition} />
        <Route path="/vehicle-listing" component={VehicleListing} />
        <Route path="/vehicle-detail" component={VehicleDetail} />
        <Route path="/account" component={Account} /> */}
          {/* <Route path="/home" component={HomePage} /> */}

          {/* <Route path="/kk" component={()=><Header  history={history}/>} /> */}
          <Route path='/' component={MainAdmin} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export const RenderPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [200]);
  return (
    <>
      <Header history={props.history} />
      {props.children}
      <Footer />
    </>
  );
};

export default App;
