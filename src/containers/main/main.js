import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Home from '../home/index';

import BankDetails from '../bankDetails';
// import BankDetails from ../bankDetails";
import Buying from '../buying';
import Documents from '../Documents';
import BuyingDetails from '../buyingDetails';
import Address from '../address';
import VehicleInformation from '../vehicleInformation';
import NewLeads from '../newLeads';
import AddLead from '../addLead';
import Vehicles from '../vehicles';
import Leads from '../leads';
import Earnings from '../earnings';
import UploadDocument from '../uploadDocument';
import EmiCalculator from '../emiCalculator';
// import Profile from ../profile";
import customerdelear from '../customermanpanel/customerdelear';
//  inventory
import Inventorymanagement from '../inventory/inventorymanagement';
import Help from '../help';

//dealer ----
import CompletedDeals from '../dealer/completedDeals';
import Inventory from '../dealer/inventory';
import InventoryEdit from '../dealer/inventoryEdit';
import OngoingDeals from '../dealer/ongoingDeals';
import PendingDeals from '../dealer/pendingDeals';
import PendingForm from '../dealer/pendingForm';
import UpdateLeadData from '../updateLeadData';
import UpdateData from '../updateData';
import Stageone from '../dealer/stageone';
import Stagetwo from '../dealer/stagetwo';
import Stagefour from '../dealer/stagefour';
import Stagefive from '../dealer/stagefive';
// import UpdateLeadData from "../updateLeadData"
import ViewOnGoingDeals from '../dealer/viewOngoingDeals';
import Viewcompletedlead from '../dealer/viewcompletedlead';
import ViewLead from '../viewLead';
//finance ----
import Financedasboard from '../financedasboard/finance';
import Completeddeal from '../financepanel/completeddeal/index';
import Freshclients from '../financepanel/freshclients/index';
import Reviewedclients from '../financepanel/reviewedclients/index';
import Rejectedcases from '../financepanel/rejectedcases/index';
import Doreadyclients from '../financepanel/doreadyclients/index';
import Financel2 from '../financepanel/financel2/index';
import Ammount from '../financepanel/ammount/index';
import Financel3 from '../financepanel/financel3/index';
import Financel4 from '../financepanel/financel4/index';

import GeneratePDF from '../customermanpanel/component/estimatePDF';
//insurance ----
import Insurancedasboard from '../insurancedasboard/insuranceview';
import Clientdetails from '../insurance/clientdetails';
import InsuranceComplete from '../insurance/insuranceComplete';
import InsuranceUpload from '../insurance/insuranceUpload/index';
//customermanagement ----
import Customermanagement from '../customermanagement/customer';
import Customerdocument from '../customermanpanel/customerdocument';
import Customerquotation from '../customermanpanel/customerquotation';
import Customerinsurance from '../customermanpanel/customerinsurance';
import Customerreview from '../customermanpanel/customerreview';
import Customerlead from '../customermanpanel/customerLead';
import CustomerReport from '../customermanpanel/customerreport';
import Customeradvertisement from '../customermanpanel/customeradvertisement';
import Helplinecontactform from '../customermanpanel/Helplinecontactform';
import Customeraddslist from '../customermanpanel/customeraddslist';
import Addupdatevehicle from '../customermanpanel/Addupdatevehicle';
import Helpline from '../customermanpanel/Helpline';
import VehicleCmt from '../customermanpanel/VehicleCmt';

import Addagent from '../customermanpanel/addagent';
import Adddealer from '../customermanpanel/adddealer';
import Addfinancer from '../customermanpanel/addfinancer';
import Addinsurance from '../customermanpanel/addinsurance';

import Updateagent from '../customermanpanel/updateagent';
import Updatedealer from '../customermanpanel/updatedealer';
import Updatefinancer from '../customermanpanel/updatefinancer';
import Updateinsurance from '../customermanpanel/updateinsurance';

import Customer from '../admin/customer';
import Agent from '../admin/agent';
import Dealeradmin from '../admin/dealer';
import User from '../admin/user';
import DealerSection from '../admin/dealerSection';
import AgentEarning from '../admin/AgentEarning';
import Report from '../admin/reprot';
import Onboardingdasboard from '../onboardingdasboard/onboarding';
import Onboardinguser from '../onboardingpanel/onboardinguser/index';
import Onboardinglisting from '../onboardingpanel/onboardinglisting/index';
import Onboardingreport from '../onboardingpanel/onboardingreport/index';
import Notifications from '../notifications';
import EstimateGenetate from '../customermanpanel/EstimateGenetate';
import InsuranceSelect from '../customermanpanel/component/InsuranceSelect';
import DoUploadVoc from '../customermanpanel/DoUploadVoc';
import Sendtonewfinancer from '../customermanpanel/Sendtonewfinancer';
import Dealer from '../dealership/dealer';
import Viewdocumentl2 from '../customermanpanel/Viewdocumentl2';
// import Financedasboard from "../financedasboard/finance";
// import Insurancedasboard from "../../containers/insurancedasboard/insuranceview";
// import Insurancedasboard from ../insurancedasboard/insuranceview";
// import Dealer from "../dealership/dealer";
// import Customermanagement from "../../containers/customermanagement/customer";
import { Redirect, Route } from 'react-router-dom';
import Login from '../login/login';
import Otp from '../otp/otp';
import Forgotpassword from '../forgotpassword/forgotpassword';
import loadjs from 'loadjs';
// import '../../assets/css/bootstrap.min.css';
// import '../../assets/css/main.css';
// import '../../assets/css/icons/flaticon/flaticon.css';
// import '../../assets/css/animate/animate.min.css';
// import '../../assets/css/perfect-scrollbar/css/perfect-scrollbar.css';
// import '../../assets/css/metismenu/css/metisMenu.min.css';
import base from '../../globals/base';
import { useHistory } from 'react-router-dom';
import AdminDashboard from '../admin/adminDashboard';
import ViewProfile from '../viewProfile';
import Profile from '../profile';
import Cmtfinance from '../customermanpanel/cmtfinance';
import Customerprofile from '../customerprofile';
import DelerviewProfile from '../delerviewProfile';
import Delerprofile from '../delerprofile';
import Subdelerprofile from '../dealer/subdelerprofile';
import Addsubdelerprofile from '../dealer/Addsubdelerprofile';
import Approved from '../customermanpanel/Approved';
import Rejected from '../customermanpanel/Reject';
import Customerpanel from '../customerpanel';
import Updatecustomer from '../updatecumtomer';
// import Onboardingdasboard from "../onboardingdasboard/onboarding";
// import Onboardingdasboard from ../onboardingdasboard/onboarding";
import UpdateLead from '../updateLead';
// import UpdateLeadData from "../updateLeadData"
function Main() {
  const history = useHistory();
  const role_n = localStorage.getItem('role');
  const [role, setRole] = useState(role_n);
  function clickHandle() {
    if (
      document.querySelectorAll('.navbar-collapse.collapse.show').length > 0
    ) {
      document.getElementById('navbar-toggler').click();
    }
  }
  useEffect(() => {
    loadjs([
      'assets/js/jquery.min.js',
      'assets/js/popper.min.js',
      'assets/js/modernizr.min.js',
      'assets/js/bootstrap.min.js',
      'assets/js/owl.carousel.min.js',
      'assets/js/price-range.js',
      'assets/js/jquery.countdown.js',
      'assets/js/scrollup.min.js',
      'assets/js/jquery-3.3.1.slim.min.js',
      'assets/js/custom.js',
      'assets/js/jquery.jqZoom.js',
    ]);
  });

  return (
    <>
      {localStorage.getItem('myData') ? (
        <Route history={history}>
          {history.location.pathname !== base + 'redirection' ? (
            <Header routeName={history.location.pathname} />
          ) : (
            ''
          )}
          <Route path='/vehicles' component={Vehicles} />
          <Route path='/buying' component={Buying} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/otp' component={Otp} />
          <Route path='/rejectedLead' component={Rejected} />
          <Route path='/profile' component={Profile} />
          <Route path='/subdelerprofile' component={Subdelerprofile} />
          <Route path='/addsubdelerprofile' component={Addsubdelerprofile} />
          <Route path='/delerprofile' component={Delerprofile} />
          <Route path='/UpdateLead' component={UpdateLead} />
          <Route path='/vehicleCmt' component={VehicleCmt} />
          <Route path='/cmtfinance' component={Cmtfinance} />
          <Route path='/viewProfile' component={ViewProfile} />
          <Route path='/doUploadVoc' component={DoUploadVoc} />
          <Route path='/sendtonewfinancer' component={Sendtonewfinancer} />
          <Route path='/estimateGenetate' component={EstimateGenetate} />
          <Route path='/insuranceSelect' component={InsuranceSelect} />
          <Route path='/dealerviewProfile' component={DelerviewProfile} />
          <Route exact path='/forgotpassword' component={Forgotpassword} />
          <Route
            exact
            path='/dashboard'
            component={
              role == 3
                ? Dealer
                : role == 4
                ? Financedasboard
                : role == 5
                ? Insurancedasboard
                : role == 6
                ? Customermanagement
                : role == 2
                ? AdminDashboard
                : role == 7
                ? Onboardingdasboard
                : role == 0
                ? Customerpanel
                : Home
            }
          />
          <Route path='/stageone' component={Stageone} />
          <Route path='/stagetwo' component={Stagetwo} />
          <Route path='/stagefour' component={Stagefour} />
          <Route path='/stagefive' component={Stagefive} />
          <Route path='/customermanagementreview' component={Customerreview} />
          <Route path='/customermanagementlead' component={Customerlead} />
          <Route path='/customermanagementreport' component={CustomerReport} />
          <Route
            path='/customermanagementinsurance'
            component={Customerinsurance}
          />
          <Route
            path='/customermanagementquotation'
            component={Customerquotation}
          />
          <Route
            path='/customermanagementdocument'
            component={Customerdocument}
          />
          <Route path='/Customermanagement' component={Customermanagement} />
          <Route path='/admincustomers' component={Customer} />
          <Route path='/adminagents' component={Agent} />
          <Route path='/admindealer' component={Dealeradmin} />
          <Route path='/adminusers' component={User} />
          <Route path='/dealerSection' component={DealerSection} />
          <Route path='/agentEarning' component={AgentEarning} />
          <Route path='/adminreports' component={Report} />
          <Route path='/customerprofile' component={Customerprofile} />
          <Route path='/insuranceComplete' component={InsuranceComplete} />
          <Route path='/clientdetails' component={Clientdetails} />
          <Route path='/insuranceUpload' component={InsuranceUpload} />
          <Route path='/insurancedasboard' component={Insurancedasboard} />
          <Route path='/doreadyclients' component={Doreadyclients} />
          <Route path='/financel2' component={Financel2} />
          <Route path='/financel3' component={Financel3} />
          <Route path='/financel4' component={Financel4} />
          <Route path='/ammount' component={Ammount} />
          <Route path='/viewdocumentl2' component={Viewdocumentl2} />
          <Route path='/rejectedcases' component={Rejectedcases} />
          <Route path='/reviewedclients' component={Reviewedclients} />
          <Route path='/freshclients' component={Freshclients} />
          <Route path='/completeddeal' component={Completeddeal} />
          <Route path='/financedasboard' component={Financedasboard} />
          <Route path='/inventory' component={Inventorymanagement} />
          <Route path='/addupdatevehicle' component={Addupdatevehicle} />
          <Route path='/buying' component={Buying} />
          <Route path='/Documents' component={Documents} />
          <Route path='/buyingDetails' component={BuyingDetails} />
          <Route path='/address' component={Address} />
          <Route path='/vehicleInformation' component={VehicleInformation} />
          <Route path='/newLeads' component={NewLeads} />
          <Route path='/addLead' component={AddLead} />
          <Route path='/emiCalculator' component={EmiCalculator} />
          <Route path='/uploadDocument' component={UploadDocument} />
          <Route path='/earnings' component={Earnings} />
          <Route path='/leads' component={Leads} />
          <Route path='/help' component={Help} />
          <Route path='/bankDetails' component={BankDetails} />
          <Route path='/updateData' component={UpdateData} />
          <Route path='/generatePDF' component={GeneratePDF} />
          <Route path='/updateLeadData' component={UpdateLeadData} />
          <Route path='/viewcompletedlead' component={Viewcompletedlead} />
          <Route path='/view' component={ViewOnGoingDeals} />
          <Route path='/viewLead' component={ViewLead} />
          <Route path='/completedDeals' component={CompletedDeals} />
          <Route path='/pendingDeals' component={PendingDeals} />
          <Route path='/PendingForm' component={PendingForm} />
          <Route path='/inventoryMain' component={Inventory} />
          <Route path='/inventoryEdit' component={InventoryEdit} />
          <Route path='/ongoingDeals' component={OngoingDeals} />
          <Route path='/onboardingdasboard' component={Onboardingdasboard} />
          <Route path='/onboardinguser' component={Onboardinguser} />
          <Route path='/onboardinglisting' component={Onboardinglisting} />
          <Route path='/onboardingreport' component={Onboardingreport} />
          <Route path='/notifications' component={Notifications} />
          <Route path='/updatecustomer' component={Updatecustomer} />
          <Route
            path='/customeradvertisement'
            component={Customeradvertisement}
          />
          <Route path='/customeraddslist' component={Customeraddslist} />
          <Route path='/helplinecontactform' component={Helplinecontactform} />
          <Route path='/helpline' component={Helpline} />
          <Route path='/addagent' component={Addagent} />
          <Route path='/adddealer' component={Adddealer} />
          <Route path='/addfinancer' component={Addfinancer} />
          <Route path='/addinsurance' component={Addinsurance} />

          <Route path='/updateagent' component={Updateagent} />
          <Route path='/updatedealer' component={Updatedealer} />
          <Route path='/updatefinancer' component={Updatefinancer} />
          <Route path='/updateinsurance' component={Updateinsurance} />

          {history.location.pathname !== base + 'redirection' ? <Footer /> : ''}
        </Route>
      ) : (
        <Redirect to='/home'></Redirect>
        // history.push('/')
        // "signup routing"
      )}
    </>
  );
}

export default Main;
