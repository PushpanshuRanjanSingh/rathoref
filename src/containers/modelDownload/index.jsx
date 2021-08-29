import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
export default function Index(props) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div class='modal fade' id='myModal'>
      <div class='modal-dialog modal-dialog-centered modal-lg'>
        <div class='modal-content' >
          <div class='modal-body'>
            <button type='button' className='close' data-dismiss='modal'>
              &times;
            </button>

            <div class='profile-personal-info'></div>
            <table class='table borderless'>
              <tbody>
                <tr>
                  <th> Name</th>
                  <td colSpan='2'>{props.download.firstName}</td>
                </tr>

                <tr>
                  <th> Contact Number</th>
                  <td colSpan='2'>{props.download.phoneNo}</td>
                </tr>
                <button onClick={handlePrint}>Print this out!</button>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
