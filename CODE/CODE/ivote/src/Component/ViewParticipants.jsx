// src/components/ViewParticipants.js
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getCustomer } from '../action/Customer';
import Slider from 'react-slick';

const ViewParticipants = () => {
  const dispatch = useDispatch();
  const [participantsData, setParticipantsData] = useState([]);
  const customer = JSON.parse(sessionStorage.getItem('customer'));

  // Fetch customer data on component mount
  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  // Get participants from Redux state
  const participants = useSelector((state) => state.customer.customerData);

  // Update local state when participants data is fetched
  useEffect(() => {
    if (participants) {
      setParticipantsData(participants);
    }
  }, [participants]);

  // Slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="">
     
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">View Participants</h2>
        <Slider {...settings}>
          {participantsData.map((participant) => (
            <div key={participant._id} className="border border-gray-300 rounded-lg p-4 m-2 bg-white">
              <div className="mb-4 text-center">
                <img
                  src={`http://192.168.1.130:5000/uploads/party_symbols/${participant.party_symbol}`}
                  alt={participant.party_name}
                  className="rounded-full w-24 h-24 mx-auto mb-2"
                />
                <h3 className="text-xl font-semibold">{participant.party_leader}</h3>
                <p className="text-gray-600">{participant.party_name}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Additional details about the participant can go here.</p>
                {/* You can include any other relevant details here */}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ViewParticipants;
