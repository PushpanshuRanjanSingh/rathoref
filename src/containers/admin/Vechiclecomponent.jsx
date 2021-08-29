import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import showNotification from "../../services/notificationService";
import apiUrl from '../../globals/config';
function Vechiclecomponent(props) {
  let history = useHistory();
  const [page, setPage] = useState(1);
  const [datacount, setdatacount] = useState();
  const [confirmLead, setconfirmLead] = useState([]);
  useEffect(() => {
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
      .get(apiUrl + 'user/topPerforming', headers)

      .then((resp) => {
        setconfirmLead(resp?.data?.data[0].data);
        setdatacount(resp?.data?.data[0].count);
      })
      .catch((err) => {
        showNotification('danger', err.message)
      });
  };
  const handlePageClick = (data) => {
    setPage(parseInt(data.selected) + 1);
  };
  const updateOne = (phoneNo, otp, id) => {
    history.push({
      pathname: '/UpdateData',
      data: { phoneNo, otp, id },
    });
  };
  const viewClient = (phoneNo, otp) => {
    history.push({
      pathname: '/view',
      data: { phoneNo, otp },
    });
  };
  return (
    <section className='stage_lead_sec'>
      <div className='row dataTables_wrapper'>
        <div class='col-lg-12 mt-0'>
          <div class='card'>
            <div class='card-body'>
              <div class='mr-auto '>
                <h4 class='text-black font-w600 fs-20 pl-3'>
                  Best performing Naayaks (Top 10 List)
                </h4>
              </div>
             
              <div class='table-responsive'>
                <table class='table'>
                  <thead>
                    <tr className='table_th'>
                      <th class='width100'>
                        <span>S.NO</span>
                      </th>
                      <th>
                        <span>Full Name</span>
                      </th>
                      <th>
                        <span>Contact Number</span>
                      </th>
                      <th>
                        <span>Prospected Vehicle</span>
                      </th>
                      <th>
                        <span>Update</span>
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {confirmLead.map((data, index) => (
                      <tr>
                        <td>
                          <strong>{(page - 1) * 10 + index + 1}</strong>
                        </td>
                        <td onClick={() => viewClient(data.phoneNo, data.otp)}>
                          {data.firstName}
                        </td>
                        <td>{data.phoneNo}</td>
                        <td>Tata Ace - Diesel-Black</td>

                        <td>
                          <span
                            class='badge light badge-success mr-1'
                            onClick={() =>
                              updateOne(data.phoneNo, data.otp, data._id)
                            }>
                            Update
                          </span>
                         
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vechiclecomponent;
