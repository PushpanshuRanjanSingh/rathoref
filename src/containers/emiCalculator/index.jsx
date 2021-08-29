import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  InputGroup,
  Octicon,
  FormControl,
  Card,
} from "react-bootstrap";
import ReactToPdf from "react-to-pdf";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { Image } from "react-bootstrap";
import base from "../../globals/base";
import Header from "../header/header";
import Footer from "../footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { PieChart } from "react-minimal-pie-chart";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import ReactToPrint from "react-to-print";
import "react-rangeslider/lib/index.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

var month = new Date().getMonth();
var nf = new Intl.NumberFormat();
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    var today = new Date(),
      date = today.getMonth() + 1;
    this.state = {
      currentMonth: date,
      setMonth: month,
      monthOnly: 0,

      yearSelected: true,
      monthSelected: false,

      interestInput: 10,
      amountInput: 2000,
      yearApplied: 1,
      principal: 0,
      interestRate: 0,
      timesCompounded: 0,
      termOfLoan: 0,
      interestAmount: 0,
      finalPayment: 0,
      finalEmi: 0,
      totalYear: 0,
      totalMonth: 0,

      interestThree: 0,
      amountThree: 0,
      yearMonthThree: 0,
      principalThree: 0,
      interestRateThree: 0,
      timesCompoundedThree: 0,
      termOfLoanThree: 0,
      amountThree: 0,
      interestAmountThree: 0,
      finalPaymentThree: 0,
      finalEmiThree: 0,
      totalYearThree: 0,
      totalMonthThree: 0,

      interestFour: 0,
      amountFour: 0,
      yearMonthFour: 0,
      principalFour: 0,
      interestFour: 0,
      timesCompoundedFour: 0,
      termOfLoanFour: 0,
      amountFour: 0,
      interestAmountFour: 0,
      finalPaymentFour: 0,
      finalFour: 0,
      totalYearFour: 0,
      totalMonthFour: 0,

      interestSix: 0,
      amountSix: 0,
      yearMonthSix: 0,
      principalSix: 0,
      interestRateSix: 0,
      timesCompoundedSix: 0,
      termOfLoanSix: 0,
      amountSix: 0,
      interestAmountSix: 0,
      finalPaymentSix: 0,
      finalEmiSix: 0,
      totalYearSix: 0,
      totalMonthSix: 0,
      totalPayment: 0,

      dateSelected: new Date(),
      emistartMonth: "",
      emistartMonthforGraph: "",
      emistartMonthYearWise: "",
      interestPerMonth: 0,
      monthsArray: [],
      monthWisePrincipal: [],
      totalPaymentAandB: [],
      emiGenerted: 0,
      remainingAmountPercentage: [],

      arrayEmiPrinciple: [],
      monthForGraph: [],

      amountTotal: 2000,
      emiPayed: 184,
      arrayRemainingPrincipal: [],
      arrayEmiPayYear: [],

      xyz: 0,
      balanceLeft: 0,

      particularYear: [],
      headerData: [],
      particularYearPrincipal: [],
      particularYearTotalInterest: [],
      particularYearTotalBalance: [],
      particularYearPayPrincipal: [],
      particularYearPayInterest: [],
      forPrincipalInYear: [],
      forPrincipalInterstYear: [],
      forPrincipalRemainingInYear: [],
      forTotalInYear: [],
      forInterestInYear: 0,
      forOneMonthPrincipal: 0,
      monthInYear: [],
      totalPayment: [],
    };
  }

  checkMonthName = (month) => {
    var monthName;
    if (month == 1) monthName = "January";
    else if (month == 2) monthName = "February";
    else if (month == 3) monthName = "March";
    else if (month == 4) monthName = "April";
    else if (month == 5) monthName = "May";
    else if (month == 6) monthName = "June";
    else if (month == 7) monthName = "July";
    else if (month == 8) monthName = "August";
    else if (month == 9) monthName = "September";
    else if (month == 10) monthName = "October";
    else if (month == 11) monthName = "November";
    else if (month == 12) monthName = "December";
    return monthName;
  };
  calculateEmi() {
    let myArry = [];
    if (this.state.yearSelected == true) {
      this.setState({
        interestAmount:
          (this.state.amountInput *
            this.state.interestInput *
            this.state.yearApplied) /
          100,
      });
      this.setState({
        finalPayment:
          parseInt(this.state.amountInput) +
          parseInt(this.state.interestAmount),
      });
      this.setState({
        finalEmi: this.state.finalPayment / (this.state.yearApplied * 12),
      });
      for (var i = 0; i < this.state.yearApplied; i++) {
        myArry.push(this.state.finalPayment / month);
      }
      this.setState({ emiGenerted: myArry });
    } else {
      this.setState({
        interestAmount:
          (this.state.amountInput *
            this.state.interestInput *
            (this.state.monthOnly / 12)) /
          100,
      });
      this.setState({
        finalPayment:
          parseInt(this.state.amountInput) +
          parseInt(this.state.interestAmount),
      });
      this.setState({
        finalEmi: this.state.finalPayment / this.state.monthOnly,
      });
      for (var i = 0; i < this.state.monthOnly; i++) {
        myArry.push(this.state.finalEmi);
      }
      this.setState({ emiGenerted: myArry });
    }
    this.pieChartValue();
  }

  calculateEmiThree() {
    this.setState({
      interestAmountThree:
        (this.state.amountThree * this.state.interestThree * 1) / 100,
    });
    var n1 = parseInt(this.state.amountThree);
    var n2 = parseInt(this.state.interestAmountThree);
    var finalAmountThree = n1 + n2;
    this.setState({ finalPaymentThree: finalAmountThree });
    this.setState({
      finalEmiThree: this.state.finalPaymentThree / this.state.yearMonthThree,
    });
  }

  calculateEmiFour() {
    this.setState({
      interestAmountFour:
        (this.state.amountFour * this.state.interestFour * 1) / 100,
    });
    var n1 = parseInt(this.state.amountFour);
    var n2 = parseInt(this.state.interestAmountFour);
    var finalAmountFour = n1 + n2;
    this.setState({ finalPaymentFour: finalAmountFour });
    this.setState({
      finalFour: this.state.finalPaymentFour / this.state.yearMonthFour,
    });
  }
  calculateEmiSix() {
    this.setState({
      interestAmountSix:
        (this.state.amountSix * this.state.interestSix * 1) / 100,
    });
    var n1 = parseInt(this.state.amountSix);
    var n2 = parseInt(this.state.interestAmountSix);
    var finalAmountSix = n1 + n2;
    this.setState({ finalPaymentSix: finalAmountSix });
    this.setState({
      finalEmiSix: this.state.finalPaymentSix / this.state.yearMonthSix,
    });
  }
  restrictAlpha = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };
  pieChartValue() {
    let arrayEmiPrinciple = [];
    let emi = 10;
    let interest = 10;
    let payment = 10;
    let interestPercent = 0;
    let amount = 0;
    if (
      this.state.finalEmi >= 1 &&
      this.state.finalEmi != Infinity &&
      this.state.finalPayment >= 1 &&
      this.state.finalPayment != Infinity
    ) {
      emi = this.state.finalEmi;
      interest = this.state.interestAmount;
      payment = this.state.finalPayment;
      amount = this.state.finalPayment - this.state.interestAmount;
      interestPercent =
        (this.state.interestAmount * 100) / this.state.finalPayment;

      arrayEmiPrinciple.push(
        {
          title: "Total Interest" + " " + interest,
          value: interest,
          color: "#C13C37",
        },
        { title: "Loan Amount" + " " + amount, value: amount, color: "#e38627" }
      );
      this.setState({ arrayEmiPrinciple: arrayEmiPrinciple });
    } else if (
      this.state.interestAmount >= 1 &&
      this.state.interestAmount != Infinity &&
      this.state.finalPayment >= 1 &&
      this.state.finalPayment != Infinity
    ) {
      payment = this.state.finalPayment;
      emi = "";
      interest = this.state.interestAmount;
      amount = this.state.finalPayment - this.state.interestAmount;
      interestPercent =
        (this.state.interestAmount * 100) / this.state.finalPayment;
      arrayEmiPrinciple.push(
        {
          title: "Total Interest" + " " + interest,
          value: interest,
          color: "#C13C37",
        },
        { title: "Loan Amount" + " " + amount, value: amount, color: "#e38627" }
      );
      this.setState({ arrayEmiPrinciple: arrayEmiPrinciple });
    } else if (
      this.state.finalPayment >= 1 &&
      this.state.finalPayment != Infinity
    ) {
      payment = this.state.finalPayment;
      emi = "";
      interest = "";
      arrayEmiPrinciple.push(
        {
          title: "Total Interest" + " " + interest,
          value: interest,
          color: "#C13C37",
        },
        {
          title: "Total Amount" + " " + payment,
          value: payment,
          color: "#e38627",
        }
      );
      this.setState({ arrayEmiPrinciple: arrayEmiPrinciple });
    } else {
      arrayEmiPrinciple.push(
        {
          title: "Total Interest" + " " + 0,
          value: 10,
          color: "#C13C37",
        },
        { title: "Total Amount" + " " + 0, value: 10, color: "#e38627" }
      );
      this.setState({ arrayEmiPrinciple: arrayEmiPrinciple });
    }
  }
  componentDidMount() {
    this.monthYearFind();
    this.alertFunction();
    // this.remainingEmi()
    this.graphData();
  }
  monthYearFind() {
    var dateStart = moment("2013-8-31");
    var dateEnd = moment("2015-3-30");
    var timeValues = [];

    var onlyMonthReturn = [];

    while (
      dateEnd > dateStart ||
      dateStart.format("M") === dateEnd.format("M")
    ) {
      timeValues.push(dateStart.format("YYYY-MM"));
      dateStart.add(1, "month");
      onlyMonthReturn.push(moment(dateStart.format("YYYY-MM")).format("MMMM"));
    }

    var dates = ["5-12-2013", "12-12-2015"];
    var diff = dates.map(function (i) {
      var m = moment(i);
      return {
        month: m.month(),
        year: m.year(),
      };
    });
    var start = Object.assign({}, diff[0]),
      end = Object.assign({}, diff[diff.length - 1]);
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var months = [];
    if (end.year >= start.year) {
      while (start.month < end.month || start.year < end.year) {
        if (start.month < 11) {
          start.month++;
        } else {
          start.month = 0;
          start.year++;
        }
        months.push(monthNames[start.month] + " ," + start.year);
      }
    }
  }
  alertFunction = () => {
    setTimeout(() => {
      this.state.headerData = [];
      this.calculateEmi();
      this.graphData();
      this.resultForEmiPayYear();
      this.calculateEmiThree();
      this.calculateYearMonthThree();
      this.calculateEmiFour();
      this.calculateYearMonthFour();
      this.calculateEmiSix();
      this.calculateYearMonthSix();
      // this.remainingEmi();
    }, 100);
  };
  calculateYearMonthThree() {
    var dur1 = Math.floor(this.state.yearMonthThree / 12);
    var dur2 = this.state.yearMonthThree / 12 - dur1;
    var dur3 = Math.floor(dur2 * 12);
    var month = this.state.yearApplied % 12;
    this.setState({ totalYearThree: dur1 });
    this.setState({ totalMonthThree: month });
  }
  calculateYearMonthFour() {
    var dur1 = Math.floor(this.state.yearMonthFour / 12);
    var dur2 = this.state.yearMonthFour / 12 - dur1;
    var dur3 = Math.floor(dur2 * 12);
    var month = this.state.yearApplied % 12;
    this.setState({ totalYearFour: dur1 });
    this.setState({ totalMonthFour: month });
  }
  calculateYearMonthSix() {
    var dur1 = Math.floor(this.state.yearMonthSix / 12);
    var dur2 = this.state.yearMonthSix / 12 - dur1;
    var dur3 = Math.floor(dur2 * 12);
    var month = this.state.yearApplied % 12;
    this.setState({ totalYearSix: dur1 });
    this.setState({ totalMonthSix: month });
  }
  amountChange = (event) => {};
  graphData = () => {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var d;
    var month;
    let months = [];
    var todayDate = new Date();
    let arrayRemainingPrincipal = [];

    if (this.state.yearSelected == true) {
      let numberOftime = this.state.yearApplied * 12;
      if (this.state.emistartMonthforGraph == "") {
        this.setState({
          emistartMonthforGraph: moment(new Date()).format("MM"),
        });
      }
      for (var i = numberOftime; i > 0; i -= 1) {
        d = new Date(
          todayDate.getFullYear(),
          this.state.emistartMonthforGraph - 1 - i,
          1
        );
        month = monthNames[d.getMonth()];
        months.push(month);
      }
      this.setState({ monthForGraph: months });

      //Value for graph
      let newVal = this.state.finalPayment;
      //For calculate Emi show on graph
      for (var i = 0; i < numberOftime; i++) {
        newVal = newVal - this.state.finalEmi;
        arrayRemainingPrincipal.push(Math.round(newVal));
      }
      this.setState({ arrayRemainingPrincipal: arrayRemainingPrincipal });
    } else {
      for (var i = 0; i < this.state.monthOnly; i++) {
        d = new Date(todayDate.getFullYear(), this.state.emistartMonth + i, 1);
        month = monthNames[d.getMonth()];
        months.push(month);
      }
      this.setState({ monthForGraph: months });

      let newVal = this.state.finalPayment;
      var month = new Date().getMonth();
      for (var i = 0; i < this.state.monthOnly; i++) {
        newVal = newVal - this.state.finalEmi;
        arrayRemainingPrincipal.push(Math.round(newVal));
      }
      this.setState({ arrayRemainingPrincipal: arrayRemainingPrincipal });
    }
  };
  resultForEmiPayYear = () => {
    let arr = [];
    var today = new Date();

    if (this.state.emistartMonthYearWise == "") {
      var dateStarts = moment(today).format("YYYY-MM-DD");
    } else {
      var dateStarts = moment(this.state.dateSelected).format("YYYY-MM-DD");
    }

    var dateStart = moment(dateStarts);

    if (this.state.yearSelected == true) {
      var dateEndselected = moment(dateStart).add(this.state.yearApplied, "y");
      this.setState({
        forOneMonthPrincipal:
          this.state.amountInput / (this.state.yearApplied * 12),
      });
    } else {
      var dateEndselected = moment(dateStart).add(
        this.state.monthOnly / 12,
        "y"
      );
      this.setState({
        forOneMonthPrincipal:
          this.state.amountInput / (this.state.monthOnly / 12),
      });
    }
    var dateEnds = moment(dateEndselected).format("YYYY-MM-DD");
    var dateEnd = moment(dateEnds);
    var timeValues = [];

    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let principalAccordingToYearFirst = 0;
    let forPrincipalRemainingInYear = [];
    let forTotalInYear = [];
    let forPrincipalYearWise = [];
    let forPrincipalInterstYear = [];
    let totalPayment = [];

    //Get difference between two date and save in array
    while (
      dateEnd > dateStart ||
      dateStart.format("M") === dateEnd.format("M")
    ) {
      timeValues.push(moment(dateStart.format("YYYY-MM")).format("YYYY"));
      dateStart.add(1, "month");
    }
    this.setState({ arrayEmiPayYear: timeValues });
    let counts = {};
    let remainingMonths = [];
    let monthStart = [];
    let particularYear = [];
    for (let i = 0; i < timeValues.length - 1; i++) {
      if (counts[timeValues[i]]) {
        counts[timeValues[i]] += 1;
      } else {
        counts[timeValues[i]] = 1;
      }
    }
    for (let prop in counts) {
      if (counts[prop] >= 2) {
        particularYear.push(prop);
        monthStart.push(counts[prop]);
        remainingMonths.push(12 - counts[prop]);
      }
    }
    this.setState({ particularYear: particularYear });
    let xyz;
    let month;
    let monthsArray = [];
    let particularYearMonth = [];
    let totalAmountParticularYear = 0;
    let monthWiseBalance = [];
    let monthWisePrincipal = [];
    let balanceFromLastIndex = [];
    let percentageLastIndex = [];
    let percentageLeft = [];
    let percentageLefts = [];
    let oneMonthInterest =
      Math.round(this.state.interestAmount) / (this.state.yearApplied * 12);
    let principalAsYearWise =
      this.state.amountInput / (this.state.yearApplied * 12);

    monthStart.map((data) =>
      monthWiseBalance.push(this.state.arrayRemainingPrincipal.splice(0, data))
    );

    monthWiseBalance.map((data) => {
      data.map((data) => {
        percentageLeft.push(100 - (data / this.state.finalPayment) * 100);
      });
      balanceFromLastIndex.push(data[data.length - 1]);
    });
    //Main loop after which everything calcuulate
    monthStart.map((data, index) => {
      totalAmountParticularYear = this.state.finalPayment / data;

      //monthWiseBalance.push(this.state.arrayRemainingPrincipal.splice(0, data));

      this.setState({ particularYearPayPrincipal: this.state.finalEmi * data });
      this.setState({
        particularYearPayInterest:
          (this.state.finalEmi * data * this.state.interestInput * data) / 100,
      });

      particularYearMonth.push([]);
      forPrincipalRemainingInYear.push([]);
      forTotalInYear.push([]);

      //for first year data
      if (index == 0) {
        forPrincipalYearWise.push(principalAsYearWise * data);
        this.setState({ forPrincipalInYear: forPrincipalYearWise });

        totalPayment.push(principalAsYearWise * data + oneMonthInterest * data);
        forPrincipalInterstYear.push(oneMonthInterest * data);

        this.setState({ forPrincipalInterstYear: forPrincipalInterstYear });

        this.setState({
          totalPaymentAandB: forPrincipalInterstYear + oneMonthInterest * data,
        });

        this.setState({ totalPayment: totalPayment });

        this.setState({ forInterestInYear: Math.round(oneMonthInterest) });
        if (!data >= 0) {
          let remainingPrincipleMonthly = this.state.forPrincipalInYear / data;
          for (var i = 0; i < data; i++) {
            remainingPrincipleMonthly =
              remainingPrincipleMonthly + oneMonthInterest;
            monthWisePrincipal.push(this.state.amountInput / data);

            forPrincipalRemainingInYear[index].push(
              Math.round(remainingPrincipleMonthly)
            );
            forTotalInYear[index].push(
              Math.round(remainingPrincipleMonthly + oneMonthInterest)
            );
          }
          this.setState({
            forPrincipalRemainingInYear: Math.round(
              forPrincipalRemainingInYear
            ),
          });
          this.setState({
            forTotalInYear: Math.round(forTotalInYear),
          });
          for (var i = 0; i < data; i++) {
            xyz = new Date(today.getFullYear(), 12 - data + i, 1);
            month = monthNames[xyz.getMonth()];
            particularYearMonth[index].push(month);
            principalAccordingToYearFirst = oneMonthInterest * data;
          }
        } else {
          let remainingPrincipleMonthly = this.state.forPrincipalInYear / data;
          for (var i = 0; i < data; i++) {
            remainingPrincipleMonthly =
              remainingPrincipleMonthly + oneMonthInterest;
            monthWisePrincipal.push(this.state.amountInput / data);

            forPrincipalRemainingInYear[index].push(
              Math.round(remainingPrincipleMonthly)
            );
            forTotalInYear[index].push(
              Math.round(remainingPrincipleMonthly + oneMonthInterest)
            );
          }
          this.setState({
            forPrincipalRemainingInYear: Math.round(
              forPrincipalRemainingInYear
            ),
          });
          this.setState({
            forTotalInYear: Math.round(forTotalInYear),
          });
          for (var i = 0; i < data; i++) {
            xyz = new Date(today.getFullYear(), data + i, 1);
            month = monthNames[xyz.getMonth()];
            particularYearMonth[index].push(month);
          }
        }
        this.state.particularYearPrincipal.push({
          principalAccordingToYearFirst,
        });
      } else if (index > 0) {
        forPrincipalYearWise.push(principalAsYearWise * data);
        this.setState({ forPrincipalInYear: forPrincipalYearWise });

        totalPayment.push(principalAsYearWise * data + oneMonthInterest * data);
        this.setState({ totalPayment: totalPayment });

        forPrincipalInterstYear.push(Math.round(oneMonthInterest * data));
        this.setState({ forPrincipalInterstYear: forPrincipalInterstYear });

        this.setState({ forInterestInYear: Math.round(oneMonthInterest) });
        this.setState({
          totalPaymentAandB: forPrincipalInterstYear + oneMonthInterest * data,
        });
        let remainingPrincipleMonthly = (principalAsYearWise * data) / data;
        for (var i = 0; i < data; i++) {
          remainingPrincipleMonthly =
            remainingPrincipleMonthly + oneMonthInterest;
          monthWisePrincipal.push(this.state.amountInput / data);

          forPrincipalRemainingInYear[index].push(
            Math.round(remainingPrincipleMonthly)
          );
          forTotalInYear[index].push(
            Math.round(remainingPrincipleMonthly + oneMonthInterest)
          );
        }
        this.setState({
          forPrincipalRemainingInYear: Math.round(forPrincipalRemainingInYear),
        });
        this.setState({
          forTotalInYear: Math.round(forTotalInYear),
        });

        for (var i = 0; i < data; i++) {
          xyz = new Date(today.getFullYear(), this.state.emistartMonth + i, 1);
          month = monthNames[xyz.getMonth()];
          particularYearMonth[index].push(month);
        }
      }
      this.state.particularYearPrincipal.push({
        principalAccordingToYearFirst,
      });
      this.setState({ monthInYear: particularYearMonth });

      this.setState({ monthsArray: monthsArray });
    });

    this.setState({ forMonthInYear: particularYearMonth });

    monthStart.map((data) =>
      monthWisePrincipal.push(monthWisePrincipal.splice(0, data))
    );

    let graphMonth = [];
    this.state.forMonthInYear.map((data) => {
      for (var i = 0; i < data.length; i++) {
        graphMonth.push(data[i]);
      }
    });

    let newArr = [];
    monthStart.map((data) => newArr.push(percentageLeft.splice(0, data)));

    newArr.map((data) => {
      percentageLastIndex.push(data[data.length - 1]);
    });

    this.state.particularYear.map((data) => {
      arr.push({
        year: data,
        forPrincipalInYear: "",
        forPrincipalInterstYear: "",
        balanceFromLastIndex: "",
        forMonthInYear: "",
        monthWiseBalance: monthWiseBalance,
        percentageLeft: percentageLeft,
        percentageLastIndex: "",
      });
    });

    this.state.forPrincipalInYear.map((data, index) => {
      if (arr[index] != undefined) {
        arr[index].forPrincipalInYear = data;
      }
    });

    this.state.forPrincipalInterstYear.map((data, index) => {
      if (arr[index] != undefined) {
        arr[index].forPrincipalInterstYear = data;
      }
    });
    balanceFromLastIndex.map((data, index) => {
      arr[index].balanceFromLastIndex = data;
    });
    percentageLastIndex.map((data, index) => {
      arr[index].percentageLastIndex = data;
    });

    this.state.forMonthInYear.map((data, index) => {
      arr[index].forMonthInYear = data;
    });
    monthWiseBalance.map((data, index) => {
      arr[index].monthWiseBalance = data;
    });
    newArr.map((data, index) => {
      arr[index].newArr = data;
    });
    this.setState({ headerData: arr });
  };

  handleDateSelect = () => {
    setTimeout(() => {
      this.setState({
        emistartMonth: moment(this.state.dateSelected).format("MM"),
        emistartMonthYearWise: moment(this.state.dateSelected).format(
          "YYYY-MM-DD"
        ),
      });
      this.setState({
        emistartMonthforGraph: moment(this.state.dateSelected).format("MM"),
        emistartMonthYearWise: moment(this.state.dateSelected).format(
          "YYYY-MM-DD"
        ),
      });
    }, 100);
  };

  calculateYearMonthForPDF() {
    var dur1 = Math.floor(this.state.yearMonthSix / 12);
    var dur2 = this.state.yearMonthSix / 12 - dur1;
    var dur3 = Math.floor(dur2 * 12);
    var month = this.state.yearApplied % 12;
    this.setState({ totalYearSix: dur1 });
    this.setState({ totalMonthSix: month });
  }

  printDocument() {
    const input = document.getElementById("ViewMilestone");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }

  handleDateSelectForPDF = () => {
    setTimeout(() => {
      this.setState({
        emistartMonth: moment(this.state.dateSelected).format("MM"),
        emistartMonthYearWise: moment(this.state.dateSelected).format(
          "YYYY-MM-DD"
        ),
      });
      this.setState({
        emistartMonthforGraph: moment(this.state.dateSelected).format("MM"),
        emistartMonthYearWise: moment(this.state.dateSelected).format(
          "YYYY-MM-DD"
        ),
      });
    }, 100);
  };
  ref = () => React.createRef();
  render() {
    return (
      <>
        <Header />
        <div className="content-body" style={{ display: "none" }}>
          <div ref={(el) => (this.componentRef = el)}>
            <table
              style={{
                fontFamily: "Arial",
                width: "950px",
                fontSize: "16px",
                verticalAlign: "top",
                lineHeight: "1.4",
                margin: "2% auto",
              }}
            >
              <tbody>
                <tr>
                  <td>
                    <table style={{ width: "100%", margin: "0 0 30px 0px;" }}>
                      <tbody>
                        <tr>
                          <td colspan="2">
                            {" "}
                            <Image
                              className="logo-abbr"
                              alt="img"
                              src={"assets/images/emilogo.png"}
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <table
                            style={{
                              width: "100%",
                              margin: "20px 0px 20px 0px",
                            }}
                          >
                            <tr>
                              <td style={{ width: "50%" }}>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td style={{ fontSize: "16px" }}>
                                        Head Office:
                                      </td>
                                      <td>B-4/20, Safdarjung Enclave</td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                      <td>New Delhi - 110029</td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                      <td>www.naayak.in</td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                      <td>+91 9292929292</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td
                                style={{ verticalAlign: "top", width: "50%" }}
                              >
                                <table style={{ marginLeft: "auto" }}>
                                  <tbody>
                                    <tr>
                                      <td>
                                        Agent name: <b>Jhon Doe</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Contact Number: +91 8282828282</td>
                                    </tr>
                                    <tr>
                                      <td>Email: mail@mail.com</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </tr>
                        <tr>
                          <td style={{ width: "100%" }}>
                            <table
                              style={{
                                width: "100%",
                                margin: "30px 0 30px 0px;",
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td style={{ verticalAlign: "top" }}>
                                    <p
                                      style={{
                                        margin: "0",
                                        padding: "10px",
                                        backgroundColor: "#002060",
                                        color: "#fff",
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      EMI Calculator for Vehicle Loan (Simple
                                      Interest)
                                    </p>
                                    <table
                                      style={{
                                        width: "100%",
                                        border: "1px solid #000",
                                        borderCollapse: "collapse",
                                        textAlign: "left",
                                      }}
                                    >
                                      <tbody>
                                        <tr>
                                          <th
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            {" "}
                                            Loan Amount (Principal){" "}
                                          </th>
                                          <th
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            {" "}
                                            Interest rate
                                          </th>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            ₹ {this.state.amountInput}
                                          </td>
                                          <th
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            {this.state.interestInput}%
                                          </th>
                                        </tr>
                                        <tr>
                                          <th
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            {" "}
                                            Total Payable Amount{" "}
                                          </th>
                                          <th
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            {" "}
                                            Total Interest Amount{" "}
                                          </th>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            ₹{" "}
                                            {nf.format(
                                              Math.ceil(this.state.finalPayment)
                                            )}
                                          </td>
                                          <td
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            ₹{" "}
                                            {nf.format(
                                              Math.ceil(
                                                this.state.interestAmount
                                              )
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            Year(s)
                                          </th>
                                          <th
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            Month(s)
                                          </th>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            {this.state.yearApplied}
                                          </td>
                                          <td
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            {this.state.yearApplied * 12}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            EMI
                                          </th>
                                          <td
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            ₹{" "}
                                            {this.state.finalEmi >= 1 &&
                                            this.state.finalEmi != Infinity
                                              ? nf.format(
                                                  Math.ceil(this.state.finalEmi)
                                                )
                                              : 0}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            Loan starts from
                                          </th>
                                          <td
                                            style={{
                                              border: "1px solid #000",
                                              padding: "10px",
                                            }}
                                          >
                                            10/05/2021
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td style={{ verticalAlign: "top" }}>
                                    <Row className="mb-4">
                                      <Col sm={12}>
                                        <div>
                                          <div className="widget-stat card">
                                            <div className="card-body p-4 d-flex justify-content-center flex-column align-items-center">
                                              <div className="media ai-icon pi-chart-box ">
                                                <PieChart
                                                  label={({ dataEntry }) =>
                                                    `${Math.round(
                                                      dataEntry.percentage
                                                    )} %`
                                                  }
                                                  data={
                                                    this.state.arrayEmiPrinciple
                                                  }
                                                  style={{ label: "white" }}
                                                  labelStyle={{
                                                    fontSize: 3,
                                                    backgroundColor: "#fff",
                                                  }}
                                                />
                                              </div>
                                              <ul className="pt-4 ">
                                                <li className="d-flex align-items-center mb-2">
                                                  Principal Loan Amount
                                                  <div className="emi-colr-box1"></div>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                  Total Interest
                                                  <div className="emi-colr-box"></div>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </Col>
                                    </Row>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          {this.state.headerData &&
                            this.state.headerData.map((item, index) => (
                              <table
                                style={{
                                  width: "100%",
                                  border: "1px solid #000",
                                  borderCollapse: "collapse",
                                  textAlign: "left",
                                  marginBottom: "50px",
                                }}
                              >
                                <tbody>
                                  <tr>
                                    <th
                                      style={{
                                        border: "1px solid #000",
                                        padding: "10px",
                                        textAlign: "center",
                                        backgroundColor: "#002060",
                                        color: "#fff",
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Year/Month
                                    </th>

                                    <th
                                      style={{
                                        border: "1px solid #000",
                                        padding: "10px",
                                        textAlign: "center",
                                        backgroundColor: "#002060",
                                        color: "#fff",
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Principal
                                      <br />
                                      (A){" "}
                                    </th>
                                    <th
                                      style={{
                                        border: "1px solid #000",
                                        padding: "10px",
                                        textAlign: "center",
                                        backgroundColor: "#002060",
                                        color: "#fff",
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Interest (B)
                                    </th>
                                    <th
                                      style={{
                                        border: "1px solid #000",
                                        padding: "10px",
                                        textAlign: "center",
                                        backgroundColor: "#002060",
                                        color: "#fff",
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Total
                                      <br />
                                      Payment <br />
                                      (A+B){" "}
                                    </th>
                                    <th
                                      style={{
                                        border: "1px solid #000",
                                        padding: "10px",
                                        textAlign: "center",
                                        backgroundColor: "#002060",
                                        color: "#fff",
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Balance
                                    </th>
                                    <th
                                      style={{
                                        border: "1px solid #000",
                                        padding: "10px",
                                        textAlign: "center",
                                        backgroundColor: "#002060",
                                        color: "#fff",
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Loan Paid
                                      <br />
                                      till date
                                    </th>
                                  </tr>

                                  <tr
                                    style={{
                                      border: "1px solid #000",
                                      padding: "10px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <td
                                      class="width110"
                                      data-toggle="collapse"
                                      data-target="#demo"
                                      aria-expanded="false"
                                      key={index}
                                    >
                                      {item.year}
                                    </td>

                                    <td
                                      style={{
                                        border: "1px solid #000",
                                        padding: "10px",
                                        textAlign: "center",
                                      }}
                                    >
                                      ₹{" "}
                                      {nf.format(
                                        Math.round(item.forPrincipalInYear)
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        border: "1px solid #000",
                                        padding: "10px",
                                        textAlign: "center",
                                      }}
                                    >
                                      ₹{" "}
                                      {nf.format(
                                        Math.round(item.forPrincipalInterstYear)
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        border: "1px solid #000",
                                        padding: "10px",
                                        textAlign: "center",
                                      }}
                                    >
                                      ₹{" "}
                                      {nf.format(
                                        Math.round(
                                          item.forPrincipalInYear +
                                            item.forPrincipalInterstYear
                                        )
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        border: "1px solid #000",
                                        padding: "10px",
                                        textAlign: "center",
                                      }}
                                    >
                                      ₹ {nf.format(item.balanceFromLastIndex)}
                                    </td>
                                    <td
                                      style={{
                                        border: "1px solid #000",
                                        padding: "10px",
                                        textAlign: "center",
                                      }}
                                    >
                                      <span class="badge light badge-success">
                                        {Math.round(item.percentageLastIndex) +
                                          "%"}
                                      </span>
                                    </td>
                                  </tr>

                                  {item.forMonthInYear.map((res, indexx) => (
                                    <tr
                                      style={{
                                        border: "1px solid #000",
                                        padding: "10px",
                                        textAlign: "center",
                                      }}
                                    >
                                      <td
                                        class="width110"
                                        style={{
                                          border: "1px solid #000",
                                          padding: "10px",
                                          textAlign: "center",
                                        }}
                                      >
                                        {res}
                                      </td>

                                      <td
                                        style={{
                                          border: "1px solid #000",
                                          padding: "10px",
                                          textAlign: "center",
                                        }}
                                      >
                                        ₹{" "}
                                        {nf.format(
                                          Math.round(
                                            this.state.forOneMonthPrincipal
                                          )
                                        )}
                                      </td>

                                      <td
                                        style={{
                                          border: "1px solid #000",
                                          padding: "10px",
                                          textAlign: "center",
                                        }}
                                      >
                                        ₹{" "}
                                        {nf.format(
                                          Math.round(
                                            this.state.forInterestInYear
                                          )
                                        )}
                                      </td>

                                      <td
                                        style={{
                                          border: "1px solid #000",
                                          padding: "10px",
                                          textAlign: "center",
                                        }}
                                      >
                                        ₹{" "}
                                        {nf.format(
                                          Math.round(
                                            this.state.forOneMonthPrincipal +
                                              this.state.forInterestInYear
                                          )
                                        )}
                                      </td>

                                      <td
                                        style={{
                                          border: "1px solid #000",
                                          padding: "10px",
                                          textAlign: "center",
                                        }}
                                      >
                                        ₹{" "}
                                        {nf.format(
                                          Math.round(
                                            this.state.headerData[index] &&
                                              this.state.headerData[index]
                                                .monthWiseBalance
                                              ? this.state.headerData[index]
                                                  .monthWiseBalance[indexx]
                                              : ""
                                          )
                                        )}
                                      </td>

                                      <td
                                        style={{
                                          border: "1px solid #000",
                                          padding: "10px",
                                          textAlign: "center",
                                        }}
                                      >
                                        <span class="badge light badge-success">
                                          {Math.round(
                                            this.state.headerData[index] &&
                                              this.state.headerData[index]
                                                .newArr
                                              ? this.state.headerData[index]
                                                  .newArr[indexx]
                                              : ""
                                          ) + "%"}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ))}
                        </tr>
                        <tr>
                          <td>
                            <table
                              style={{
                                width: "100%",
                                verticalAlign: "top",
                                lineHeight: "1.4",
                                margin: "5% 0px 0px 0px",
                              }}
                            >
                              <tbody>
                                <tr>
                                  <th
                                    style={{
                                      textAlign: "left",
                                      width: "120px",
                                      verticalAlign: "top",
                                      padding: "0 0 10px 0",
                                    }}
                                  >
                                    Regd Office{" "}
                                  </th>
                                  <td
                                    style={{
                                      width: "30px",
                                      verticalAlign: "top",
                                      padding: "0 0 10px 0",
                                    }}
                                  >
                                    :
                                  </td>
                                  <td
                                    style={{
                                      verticalAlign: "top",
                                      padding: "0 0 10px 0",
                                    }}
                                  >
                                    B-4/20, Safdarjung Enclave, New Delhi -
                                    110029{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    style={{
                                      textAlign: "left",
                                      verticalAlign: "top",
                                      padding: "0 0 10px 0",
                                    }}
                                  >
                                    Sales Office
                                  </th>
                                  <td
                                    style={{
                                      verticalAlign: "top",
                                      padding: "0 0 10px 0",
                                    }}
                                  >
                                    :
                                  </td>
                                  <td
                                    style={{
                                      verticalAlign: "top",
                                      padding: "0 0 10px 0",
                                    }}
                                  >
                                    Plot No. - 290 &amp; 291, Mauj-Mustafapur,
                                    P.O-Kansari, Patna-Gaya Highway,
                                    Thana-Gaurichak, Patna - 804451
                                    <br /> Contact Nos. - 9117003300,
                                    9117922222, 9117122222; <br /> Email :
                                    laxmibarter.sales@gmail.com
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    style={{
                                      textAlign: "left",
                                      verticalAlign: "top",
                                      padding: "0 0 10px 0",
                                    }}
                                  >
                                    Workshop
                                  </th>
                                  <td
                                    style={{
                                      verticalAlign: "top",
                                      padding: "0 0 10px 0",
                                    }}
                                  >
                                    :
                                  </td>
                                  <td
                                    style={{
                                      verticalAlign: "top",
                                      padding: "0 0 10px 0",
                                    }}
                                  >
                                    Plot No. - 290 &amp; 291, Mauj-Mustafapur,
                                    P.O-Kansari, Patna-Gaya Highway,
                                    Thana-Gaurichak, Patna - 804451
                                    <br /> Contact Nos. - 9117003300,
                                    9117922222, 9117122222; <br /> Email :
                                    laxmibarter.sales@gmail.com
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "center", fontSize: "15px" }}>
                            {" "}
                            This EMI chart is generated online on Naayak. You
                            can generate your EMI chart at
                            www.naayak.in/EMIcalculator{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button type="button" className="btn btn-success ml-2">
            <i class="fa fa-share-alt" aria-hidden="true"></i> Share
          </button>
        </div>

        <div className="content-body">
          <div className="container-fluid">
            <Row className="mb-0">
              <Col lg={12} className="mb-2">
                <div className="d-block pb-0 border-0">
                  <div className="mr-auto pr-3">
                    <h4 className="text-black font-w600 fs-20">
                      EMI Calculator for Vehicles Loan
                    </h4>
                    <div className="emi_two_btns_ps  mb-2 ">
                      {/* <ReactToPdf>
    {({toPdf, targetRef}) =>  (
      
      <div>
  <button type='button' className='btn btn-success ml-2' onClick={toPdf} >
        <i class='fa fa-share-alt' aria-hidden='true'></i> Share
      </button>
     
     <div  style={{display:"none"}}>

    
       <h4 className='text-black font-w600 fs-20'
       ref={targetRef}>  EMI Calculator for Vehicles Loan


        </h4>
        </div>
      </div>
    )}
</ReactToPdf>  */}

                      <ReactToPrint
                        trigger={() => (
                          <button type="button" className="btn btn-primary">
                            <i class="fa fa-print" aria-hidden="true"></i> Print
                          </button>
                        )}
                        content={() => this.componentRef}
                      />

                      <button type="button" className="btn btn-success ml-2">
                        <i class="fa fa-share-alt" aria-hidden="true"></i> Share
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mb-0">
              <Col lg={12} className="mb-2">
               
                <div className="container-fluid px-0">
                  <Row className="mb-4 emi_row">
                    <Col lg={4}>
                      <div className="widget-stat card">
                        <div className="card-body p-4">
                          <div className="media ai-icon">
                            <Form>
                              <div class="mb-2">
                                <Form.Group
                                  as={Row}
                                  controlId="formPlaintextPassword"
                                >
                                  <Form.Label column sm="12">
                                    Loan Amount:
                                  </Form.Label>
                                  <Col sm="12">
                                    <InputGroup>
                                      <InputGroup.Prepend>
                                        <InputGroup.Text>₹</InputGroup.Text>
                                      </InputGroup.Prepend>

                                      <FormControl
                                        value={this.state.amountInput}
                                        onKeyPress={(e) =>
                                          this.restrictAlpha(e)
                                        }
                                        onChange={(event) => {
                                          this.alertFunction();

                                          this.setState({
                                            amountInput: event.target.value,
                                          });
                                        }}
                                      />
                                    </InputGroup>
                                  </Col>
                                </Form.Group>

                                <Form.Group controlId="formBasicRange">
                                  <Form.Control
                                    type="range"
                                    min={0}
                                    max={200000}
                                    step={2000}
                                    onChange={(event) => {
                                      this.alertFunction();
                                      this.setState({
                                        amountInput: event.target.value,
                                      });
                                    }}
                                    value={this.state.amountInput}
                                  />
                                  <div id="loanamountsteps" className="steps">
                                    <span className="tick tick-1">
                                      | <br />
                                      <span className="marker ">0</span>
                                    </span>
                                    <span className="tick tick-2">
                                      | <br />
                                      <span className="marker">50k</span>
                                    </span>
                                    <span className="tick tick-3">
                                      | <br />
                                      <span className="marker">1L</span>
                                    </span>
                                    <span className="tick tick-4  ">
                                      | <br />
                                      <span className="marker">1.50L</span>
                                    </span>
                                    <span className="tick tick-5 ">
                                      | <br />
                                      <span className="marker">2L</span>
                                    </span>
                                  </div>
                                </Form.Group>
                              </div>

                              <div class="mb-2">
                                <Form.Group
                                  as={Row}
                                  controlId="formPlaintextPassword"
                                >
                                  <Form.Label column sm="12">
                                    Interest Rate :
                                  </Form.Label>
                                  <Col sm="12">
                                    <InputGroup>
                                      <InputGroup.Prepend>
                                        <InputGroup.Text>%</InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <FormControl
                                        value={this.state.interestInput}
                                        onKeyPress={(e) =>
                                          this.restrictAlpha(e)
                                        }
                                        onChange={(event) => {
                                          this.alertFunction();
                                          this.setState({
                                            interestInput: event.target.value,
                                          });
                                        }}
                                      />
                                    </InputGroup>
                                  </Col>
                                </Form.Group>

                                <Form.Group controlId="formBasicRange">
                                  <Form.Control
                                    type="range"
                                    min={5}
                                    max={15}
                                    onChange={(event) => {
                                      this.alertFunction();

                                      this.setState({
                                        interestInput: event.target.value,
                                      });
                                    }}
                                    value={this.state.interestInput}
                                  />
                                  <div id="loanamountsteps" className="steps">
                                    <span className="tick tick-1">
                                      | <br />
                                      <span className="marker ">5</span>
                                    </span>
                                    <span className="tick tick-2">
                                      | <br />
                                      <span className="marker">7.5</span>
                                    </span>
                                    <span className="tick tick-3">
                                      | <br />
                                      <span className="marker">10</span>
                                    </span>
                                    <span className="tick tick-4  ">
                                      | <br />
                                      <span className="marker">12.5</span>
                                    </span>
                                    <span className="tick tick-5 ">
                                      | <br />
                                      <span className="marker">15</span>
                                    </span>
                                  </div>
                                </Form.Group>
                              </div>

                              <div class="mb-2">
                                <Form.Group
                                  as={Row}
                                  controlId="formPlaintextPassword"
                                >
                                  <Form.Label column sm="12">
                                    Loan Tenure :
                                  </Form.Label>
                                  <Col sm="12">
                                    <InputGroup>
                                      <InputGroup.Prepend>
                                        {this.state.yearSelected == true ? (
                                          <InputGroup.Prepend>
                                            <InputGroup.Text className="yr-sel mo_input_selected">
                                              Yr
                                            </InputGroup.Text>
                                            <InputGroup.Text
                                              className="mon-sel"
                                              onClick={() =>
                                                this.setState({
                                                  yearSelected: false,
                                                  monthOnly:
                                                    this.state.yearApplied * 12,
                                                })
                                              }
                                            >
                                              Mo
                                            </InputGroup.Text>
                                          </InputGroup.Prepend>
                                        ) : (
                                          <InputGroup.Prepend>
                                            <InputGroup.Text
                                              className="yr-sel"
                                              onClick={() =>
                                                this.setState({
                                                  yearSelected: true,
                                                  yearApplied:
                                                    this.state.monthOnly / 12,
                                                })
                                              }
                                            >
                                              Yr
                                            </InputGroup.Text>
                                            <InputGroup.Text className="mon-sel mo_input_selected">
                                              Mo
                                            </InputGroup.Text>
                                          </InputGroup.Prepend>
                                        )}
                                      </InputGroup.Prepend>
                                      {this.state.yearSelected == true ? (
                                        <FormControl
                                          value={this.state.yearApplied}
                                          onKeyPress={(e) =>
                                            this.restrictAlpha(e)
                                          }
                                          onChange={(event) => {
                                            this.alertFunction();
                                            this.setState({
                                              yearApplied: event.target.value,
                                            });
                                          }}
                                        />
                                      ) : (
                                        <FormControl
                                          value={this.state.monthOnly}
                                          onKeyPress={(e) =>
                                            this.restrictAlpha(e)
                                          }
                                          onChange={(event) => {
                                            this.alertFunction();
                                            this.setState({
                                              monthOnly: event.target.value,
                                            });
                                          }}
                                        />
                                      )}
                                    </InputGroup>
                                  </Col>
                                </Form.Group>
                                {this.state.yearSelected == true ? (
                                  <Form.Group controlId="formBasicRange">
                                    <Form.Control
                                      type="range"
                                      min={0}
                                      max={20}
                                      onChange={(event) => {
                                        this.alertFunction();
                                        this.setState({
                                          yearApplied: event.target.value,
                                        });
                                      }}
                                      value={this.state.yearApplied}
                                    />
                                    <div id="loanamountsteps" className="steps">
                                      <span className="tick tick-1">
                                        | <br />
                                        <span className="marker ">0</span>
                                      </span>
                                      <span className="tick tick-2">
                                        | <br />
                                        <span className="marker">5</span>
                                      </span>
                                      <span className="tick tick-3">
                                        | <br />
                                        <span className="marker">10</span>
                                      </span>
                                      <span className="tick tick-4  ">
                                        | <br />
                                        <span className="marker">15</span>
                                      </span>
                                      <span className="tick tick-5 ">
                                        | <br />
                                        <span className="marker">20</span>
                                      </span>
                                    </div>
                                  </Form.Group>
                                ) : (
                                  <Form.Group controlId="formBasicRange">
                                    <Form.Control
                                      type="range"
                                      min={0}
                                      max={720}
                                      onChange={(event) => {
                                        this.alertFunction();
                                        this.setState({
                                          monthOnly: event.target.value,
                                        });
                                      }}
                                      value={this.state.monthOnly}
                                    />
                                    <div
                                      id="loanamountsteps"
                                      className="steps ms-form"
                                    >
                                      <span className="tick tick-1">
                                        | <br />
                                        <span className="marker ">60</span>
                                      </span>
                                      <span className="tick tick-2">
                                        | <br />
                                        <span className="marker">120</span>
                                      </span>
                                      <span className="tick tick-3">
                                        | <br />
                                        <span className="marker">180</span>
                                      </span>
                                      <span className="tick tick-4  ">
                                        | <br />
                                        <span className="marker">240</span>
                                      </span>
                                      <span className="tick tick-5 ">
                                        | <br />
                                        <span className="marker">300</span>
                                      </span>
                                    </div>
                                  </Form.Group>
                                )}
                              </div>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="widget-stat card">
                        <Card.Header className="bg-custom-blue text-white">
                          Your EMI Details
                        </Card.Header>
                        <div className="card-body p-0">
                          <div className="media ai-icon border_bottom_cus p-cus">
                            <div className="emi-details-box text-left">
                              <p>Loan EMI</p>
                              <div className="d-flex">
                                <h3 className="color_9d font-weight-bold">
                                  ₹{" "}
                                  {this.state.finalEmi >= 1 &&
                                  this.state.finalEmi != Infinity
                                    ? nf.format(Math.ceil(this.state.finalEmi))
                                    : 0}
                                </h3>
                                <div></div>
                              </div>
                            </div>
                          </div>
                          <div className="media ai-icon border_bottom_cus p-cus">
                            <div className="emi-details-box text-left">
                              <p>Total Interest Payable</p>
                              <div className="d-flex">
                                <h3 className="color_9d font-weight-bold">
                                  ₹{" "}
                                  {nf.format(
                                    Math.ceil(this.state.interestAmount)
                                  )}
                                </h3>
                                {/* <div className="emi-colr-box">

                                    </div> */}
                              </div>
                            </div>
                          </div>
                          <div className="media ai-icon  p-cus">
                            <div className="emi-details-box text-left">
                              <p>Total Payment (Principal + Interest)</p>
                              <div className="d-flex">
                                <h3 className="color_9d font-weight-bold">
                                  ₹{" "}
                                  {nf.format(
                                    Math.ceil(this.state.finalPayment)
                                  )}
                                </h3>
                                {/* <div className="emi-colr-box1">

                                    </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="widget-stat card">
                        <div className="card-body p-4 d-flex justify-content-center flex-column align-items-center">
                          <div className="media ai-icon pi-chart-box ">
                            <PieChart
                              label={({ dataEntry }) =>
                                `${Math.round(dataEntry.percentage)} %`
                              }
                              data={this.state.arrayEmiPrinciple}
                              style={{ label: "white" }}
                              labelStyle={{
                                fontSize: 3,
                                backgroundColor: "#fff",
                              }}
                            />
                          </div>
                          <ul className="pt-4 ">
                            <li className="d-flex align-items-center mb-2">
                              Principal Loan Amount
                              <div className="emi-colr-box1"></div>
                            </li>
                            <li className="d-flex align-items-center">
                              Total Interest
                              <div className="emi-colr-box"></div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            <Row className="emi_row ">
              <Col lg={12}>
                <div className="widget-stat card">
                  <div className="card-body p-4">
                    <Row className="formgroup mb-5">
                      <Col sm={6} className="emi_cal_txt">
                        Schedule showing EMI payments starting from
                      </Col>

                      <Col sm={6}>
                        <div class="form-group mb-0 w-260">
                          <div class="input-group date" id="datetimepicker1">
                            {/* <input type='date' class="form-control" /> */}
                            <DatePicker
                              placeholderText="Select Emi Starting Month"
                              onSelect={this.handleDateSelect.bind(this)}
                              selected={this.state.dateSelected}
                              onChange={(event) => {
                                setTimeout(() => {
                                  this.alertFunction();
                                }, 100);
                                this.setState({ dateSelected: event });
                              }}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col sm={12}>
                        <div>
                          <Line
                            data={{
                              labels: this.state.monthForGraph,
                              datasets: [
                                {
                                  label: "Amount left to pay",
                                  fill: false,
                                  lineTension: 0.5,
                                  backgroundColor: "rgba(75,192,192,1)",
                                  borderColor: "rgba(0,0,0,1)",
                                  borderWidth: 2,
                                  data: this.state.arrayRemainingPrincipal,
                                },
                              ],
                            }}
                            options={{
                              title: {
                                display: true,
                                text: "Emi payment loan graph",
                                fontSize: 20,
                              },
                              legend: {
                                display: true,
                                position: "right",
                              },
                            }}
                          />
                        </div>
                      </Col>
                    </Row>

                    <div class="table-responsive">
                      <table class="table table-responsive-md table_cus_52">
                        <thead>
                          <tr>
                            <th class="width110">Year</th>
                            <th>Principal (A)</th>
                            <th>Interest (B)</th>
                            <th>Total Payment (A + B)</th>
                            <th>Balance</th>
                            <th>Loan Paid To Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.headerData &&
                            this.state.headerData.map((item, index) => (
                              <>
                                <tr>
                                  <td
                                    class="btn btn-primary"
                                    data-toggle="collapse"
                                    data-target={"#demo" + index}
                                    className="collapsed icon_show d-flex align-items-center"
                                    aria-expanded="false"
                                    key={index}
                                  >
                                    <i class=" mr-2 fa fa-plus"></i>
                                    <i class="fa fa-minus mr-2"></i>
                                    {item.year}
                                  </td>

                                  <td>
                                    ₹{" "}
                                    {nf.format(
                                      Math.round(item.forPrincipalInYear)
                                    )}
                                  </td>
                                  <td>
                                    ₹{" "}
                                    {nf.format(
                                      Math.round(item.forPrincipalInterstYear)
                                    )}
                                  </td>
                                  <td>
                                    ₹{" "}
                                    {nf.format(
                                      Math.round(
                                        item.forPrincipalInYear +
                                          item.forPrincipalInterstYear
                                      )
                                    )}
                                  </td>
                                  <td>
                                    ₹ {nf.format(item.balanceFromLastIndex)}
                                  </td>
                                  <td>
                                    <span class="badge light badge-success">
                                      {Math.round(item.percentageLastIndex) +
                                        "%"}
                                    </span>
                                  </td>
                                </tr>

                                <tr class="collapse" id={"demo" + index}>
                                  <td colspan="6" className="cus_td">
                                    <div classname="">
                                      <div class="table-responsive">
                                        <table class="table table-responsive-md table_cus_52">
                                          <thead className="vs-hi">
                                            <tr>
                                              <th class="width110">Year</th>
                                              <th>Principal (A)</th>
                                              <th>Interest (B)</th>
                                              <th>Total Payment (A + B)</th>
                                              <th>Balance</th>
                                              <th>Loan Paid To Date</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {item.forMonthInYear.map(
                                              (res, indexx) => (
                                                <tr>
                                                  <td class="width110">
                                                    {res}
                                                  </td>

                                                  <td>
                                                    ₹{" "}
                                                    {nf.format(
                                                      Math.round(
                                                        this.state
                                                          .forOneMonthPrincipal
                                                      )
                                                    )}
                                                  </td>

                                                  <td>
                                                    ₹{" "}
                                                    {nf.format(
                                                      Math.round(
                                                        this.state
                                                          .forInterestInYear
                                                      )
                                                    )}
                                                  </td>

                                                  <td>
                                                    ₹{" "}
                                                    {nf.format(
                                                      Math.round(
                                                        this.state
                                                          .forOneMonthPrincipal +
                                                          this.state
                                                            .forInterestInYear
                                                      )
                                                    )}
                                                  </td>

                                                  <td>
                                                    ₹{" "}
                                                    {nf.format(
                                                      Math.round(
                                                        this.state.headerData[
                                                          index
                                                        ] &&
                                                          this.state.headerData[
                                                            index
                                                          ].monthWiseBalance
                                                          ? this.state
                                                              .headerData[index]
                                                              .monthWiseBalance[
                                                              indexx
                                                            ]
                                                          : ""
                                                      )
                                                    )}
                                                  </td>

                                                  <td>
                                                    <span class="badge light badge-success">
                                                      {Math.round(
                                                        this.state.headerData[
                                                          index
                                                        ] &&
                                                          this.state.headerData[
                                                            index
                                                          ].newArr
                                                          ? this.state
                                                              .headerData[index]
                                                              .newArr[indexx]
                                                          : ""
                                                      ) + "%"}
                                                    </span>
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            ))}
                        </tbody>
                      </table>
                      <span>
                        Note- All the numbers are indicative. Please consult to
                        your financer/finance executive for more details and
                        exact report. Naayak cannot be accountable for any
                        differences from the actual EMI chart I
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className="modal" id="ViewMilestone">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">View Beneficiary</h4>
                <button
                  type="button"
                  className="close"
                  id="close1"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <img
                        style={{
                          height: "200px",
                          width: "200px",
                          justifyContent: "center",
                          margin: "0px auto",
                        }}
                        className="form-img__img-preview d-block"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Title</label>
                      <p className="form-control" type="text"></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Description</label>
                      <p className="form-control" type="text"></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Information</label>
                      <p
                        className="form-control"
                        placeholder="Info"
                        type="text"
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <Footer /> style={{ display: "none" }}  */}
      </>
    );
  }
}
