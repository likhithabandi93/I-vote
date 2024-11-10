// src/components/ViewParticipants.js
import React, { useState, useEffect } from 'react';
import VotingNavbar from './VotingNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomer, voting,alreadyVoted } from '../../action/Customer';

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



  const handleVote = (participantId) => {
   const data = {
    customer_id:customer._id,
   }
    dispatch(voting(data, participantId));
  };

  return (
    <div className="">
      <VotingNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">View Participants</h2>
        <table className="min-w-full border border-gray-300 ">
          <thead>
            <tr className="bg-gray-100">
              {/* <th className="border border-gray-300 px-4 py-2">Photo</th>
              <th className="border border-gray-300 px-4 py-2">Party Name</th> */}
              <th className="border border-gray-300 px-4 py-2">Participant Name</th>
              <th className="border border-gray-300 px-4 py-2">Party Symbol</th>
              <th className="border border-gray-300 px-4 py-2">Vote</th>
            </tr>
          </thead>
          <tbody>
            {participantsData.map((participant) => (
              <tr key={participant._id}>
                {/* <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={`http://192.168.1.130:5000/uploads/participant/${participant.participant_photo}`} // Use the correct photo property
                    alt={participant.party_leader} // Consider using party_leader for better accessibility
                    className="rounded-full w-10 h-10" // Adjust size as necessary
                  />
                </td> */}
                {/* <td className="border border-gray-300 px-4 py-2">{participant.party_name}</td> */}
                <td className="border border-gray-300 px-4 py-2">{participant.party_leader}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={`http://localhost:5000/uploads/party_symbols/${participant.party_symbol}`} // Use the correct photo property
                    alt={participant.party_name} // Use party_name for better context
                    className="rounded-full w-24 h-24" // Adjust size as necessary
                  />
                  {participant.party_name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <input
                    type="radio"
                    name="vote" // Ensure all radio buttons belong to the same group
                    value={participant._id} // Changed to use _id for uniqueness
                    onChange={() => handleVote(participant._id)} // Call handleVote on change
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewParticipants;
