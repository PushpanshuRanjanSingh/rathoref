/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import apiBase from './config';
export const LOGIN = '/user/register';
export const OTP = 'user/otpVerification';

export const getModelImageUrl = (image) => {
  return image ? apiBase + image : '/assets/images/brand-4-model-71.jpg';
};
export const getCarImageUrl = (image) => {
  return image ? apiBase + image : '/assets/images/ch-car-img.jpg';
};
export const getTeamImageUrl = (image) => {
  return image ? apiBase + image : '/assets/images/about/team-02.jpg';
};
export const getPriceInLakh = (price) => {
  return price ? price / 100000 : '';
};
export const APIBLOCK =
  'SUBSCRIPTION END PLEASE CONTACT WITH Toxsl Technologies Pvt. Ltd.';
