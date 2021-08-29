

import * as api from "../utils/requests";
import * as constant from "../globals/constant";

/* Content API (POST) */
export const LoginApi = async (data) => {
  return await api.PostReq(constant.LOGIN, data).then((response) => {
    return response;
  });
};

/* Content API (POST) */
export const verifyOtpApi = async (data) => {
    return await api.PostReq(constant.OTP, data).then((response) => {
      return response;
    });
};
export const getVehicleList = async (limit,offset,filter,minPrice,maxPrice,brand,model,color,fuel,search) => {

  var obj ={
    srt:filter,
    minPrice:minPrice,
    maxPrice:maxPrice,
    brand:brand,
    model:model,
    color:color,
    fuel:fuel,
    search:search
  }

  return await api
    .PostReq(
      "/color/getAllFilters?"
      +
      "limit="+
      limit +
      "&skip=" +
      offset 
      
      ,obj
    ).then((response) => {
    return response;
  });
};

export const howItWorks = async () => {
  return await api.getReq('home/howItWorks').then((response) => {
    return response;
  });
};
export const askYourQuestions = async (data) => {
  return await api.PostReq('faq/askYourQuestions', data).then((response) => {
    return response;
  });
};
export const newsLetter = async (data) => {
  return await api.PostReq('/home/subscribeNewsletter', data).then((response) => {
    return response;
  });
};
export const getFaq = async () => {
  return await api.getReq('home/faq').then((response) => {
    return response;
  });
};
export const getTestimonials = async () => {
  return await api.getReq('home/testimonials').then((response) => {
    return response;
  });
};
export const getAllCarBrands = async () => {
  return await api.getReq('home/getAllCarBrands').then((response) => {
    return response;
  });
};
export const filterForCarsBasedOnBrandModelFuel = async (brand, model, fuelType) => {
  return await api.getReq(
    'color/filterForCarsBasedOnBrandModelFuel?'+
  'brand='+
  brand+
  '&model='+
  model+
  '&fuelType='+
  fuelType


  ).then((response) => {
    return response;
  });
};
export const getColorbyCarId = async (id) => {
  return await api.getReq('/color/getColorbyCarId/'+id).then((response) => {
    return response;
  });
};
export const addReviewForCarModel = async (id,data) => {
  return await api.PostReq('/vehicalDetails/addReviewForCarModel/'+id, data).then((response) => {
    return response;
  });
};
export const getVehicalSpecificationsForCar = async (id) => {
  return await api.getReq('/vehicalDetails/getVehicalSpecificationsForCar/'+id).then((response) => {
    return response;
  });
};
export const getOffersSimilarCars = async (variantName,data,id,minimumPriceRange,maximumPriceRange) => {
  return await api.PostReq('/vehicalDetails/getOffersSimilarCars'+
  
  '?maximumPriceRange='+
  maximumPriceRange
  
  ,
  data
  ).then((response) => {
    return response;
  });
};
export const getReviewsForCarModel = async (id,limit,offset) => {
  return await api.getReq('/vehicalDetails/getReviewsForCarModel/'+id+
  '?limit='+
  limit+
  '&offset='+
  offset
  ).then((response) => {
    return response;
  });
};
export const getCarModelDetails = async (id) => {
  return await api.getReq('/vehicalDetails/getCarModelDetails/'+id).then((response) => {
    return response;
  });
};
export const getFaqForCarModel = async (id) => {
  return await api.getReq('/vehicalDetails/getFaqForCarModel/'+id).then((response) => {
    return response;
  });
};
export const getPrivacyPolicy = async () => {
  return await api.getReq('/home/getPrivacyPolicy/').then((response) => {
    return response;
  });
};
export const postMessageContactUs = async (data) => {
  return await api.PostReq('/home/postMessageContactUs/',data).then((response) => {
    return response;
  });
};
export const getAbout = async () => {
  return await api.getReq('/home/getAbout/').then((response) => {
    return response;
  });
};
export const getServices = async () => {
  return await api.getReq('/home/getServices/').then((response) => {
    return response;
  });
};
export const getContactUsData = async () => {
  return await api.getReq('/home/getContactUsData/').then((response) => {
    return response;
  });
};
export const getTeamMembers = async () => {
  return await api.getReq('/home/getTeamMembers/').then((response) => {
    return response;
  });
};
export const getOnRoadPriceForSpecificCar = async (plName) => {
  return await api.getReq('/vehicalDetails/getExShowroomPriceForSpecificCar'+
  '?id='+
  plName
  ).then((response) => {
    return response;
  });
};

export const saveDetailsToContact = async (data) => {
  return await api.PostReq('/home/saveDetailsToContact', data
  ).then((response) => {
    return response;
  });
};

export const getSpecificationVehicle = async (id) => {
  return await api.getReq('/vehicalDetails/getSpecificationVehicle/'+id,
  ).then((response) => {
    return response;
  });
};
export const addContactInfoForOnRoadPrice = async (data,id) => {
  return await api.PostReq('/vehicalDetails/addContactInfoForOnRoadPrice/?id='+id,data,
  ).then((response) => {
    return response;
  });
};
export const getVariantId = async (id) => {
  return await api.getReq('/variant/getVariantId/?id='+id
  ).then((response) => {
    return response;
  });
};
export const deleteExShowroomPriceForSpecificCar = async (id) => {
  return await api.delReq('/vehicalDetails/deleteExShowroomPriceForSpecificCar?id='+id
  ).then((response) => {
    return response;
  });
};
export const updateExShowroomPriceForSpecificCar = async (id,data) => {
  return await api.putReq('/vehicalDetails/updateExShowroomPriceForSpecificCar?id='+id,data
  ).then((response) => {
    return response;
  });
};
export const addExShowroomPriceForSpecificCar = async (id,data) => {
  return await api.PostReq('/vehicalDetails/addExShowroomPriceForSpecificCar?id='+id,data
  ).then((response) => {
    return response;
  });
};


export const addFaqForCarModel = async (id,data) => {
  return await api.PostReq('/vehicalDetails/addFaqForCarModel/'+id,data
  ).then((response) => {
    return response;
  });
};
export const deleteSpecificFaqForCarModel = async (id) => {
  return await api.delReq('/vehicalDetails/deleteSpecificFaqForCarModel/'+id
  ).then((response) => {
    return response;
  });
};
export const updateFaqForCarModel = async (id,data) => {
  return await api.putReq('/vehicalDetails/updateFaqForCarModel/'+id,data
  ).then((response) => {
    return response;
  });
};
// put 
// /vehicalDetails/updateExShowroomPriceForSpecificCar

// delete
// vehicalDetails/deleteExShowroomPriceForSpecificCar













