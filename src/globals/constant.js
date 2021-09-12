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
