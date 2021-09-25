import React, { useState } from 'react';

function ViewCompany(props) {
  const [state, setstate] = useState(props.state);
  console.log(`state..2..`, state);
  return (
    <div>
      <div className=' text-center'>
        <h1> {state?.companyName}</h1>
        <p> Brand Name – Jockey</p>
      </div>
      <div className='img'>
        <div className='innerimg' />
      </div>
      <div className='container'>
        <div className='row'>
          <h3>About Us</h3>
          <div className='col-12'>
            <p>{state.aboutCompany.substring(0, 100)}</p>
          </div>
        </div>
      </div>
      <hr className='hr' />
      <div className='container'>
        <h3 className='pb-3'>Company Product Category Details: -</h3>
        <div className='row'>
          <div className='col-sm-4 '>
            <h4>Category </h4>
            <p>{state.category.toString()}</p>
          </div>
          <div className='col-sm-4'>
            <h4>Sub Category </h4>
            {state?.subCategory.map((data) => {
              return <p>{data?.name}</p>;
            })}
          </div>
          <div className='col-sm-4'>
            <h4>Brand Name </h4>
            {state?.subCategory.map((data) => {
              return <p>{data?.brandName}</p>;
            })}
          </div>
        </div>
      </div>
      <hr className='hr' />
      <div className='container'>
        <h3 className='pb-3'>
          Company Offering Distribution-ship For Preferred Category &amp;
          Location : -
        </h3>
        <div className='row'>
          <div className='col-sm-4 '>
            <h4>Category </h4>
            <p>{state.category.toString()}</p>
          </div>
          <div className='col-sm-4'>
            <h4>Sub Category </h4>
            {state?.intreset.map((data) => {
              return <p>{data?.name}</p>;
            })}
          </div>
          <div className='col-sm-4'>
            <h4>Brand Name </h4>
            {state?.intreset.map((data) => {
              return <p>{data?.brandName}</p>;
            })}
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4 '>
            <h4>State</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris...
            </p>
          </div>
          <div className='col-sm-8'>
            <h4>City</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris...
            </p>
          </div>
        </div>
      </div>
      <div className='container'>
        <h2 className='pb-3'>Company Contact Details: -</h2>
        <div className='row'>
          <div className='col-sm-4 '>
            <h5>Column 1</h5>
          </div>
          <div className='col-sm-8 '>
            <h5>Column 1</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCompany;
