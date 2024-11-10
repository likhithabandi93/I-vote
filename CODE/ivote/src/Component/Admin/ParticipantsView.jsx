import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getParticipant ,deleteParticipant} from '../../action/Admin';

// Dummy data for participants


const ParticipantsView = () => {

  const [participantsData , setparticipantsData] = useState([
    {
      party_name: 'Party A',
      party_logo: 'https://via.placeholder.com/50',
      party_leader: 'Leader A',
      party_slogan: 'Slogan A',
      party_symbol: '⚡',
      participant_photo: 'https://via.placeholder.com/100',
    },
    {
      party_name: 'Party B',
      party_logo: 'https://via.placeholder.com/50',
      party_leader: 'Leader B',
      party_slogan: 'Slogan B',
      party_symbol: '🌟',
      participant_photo: 'https://via.placeholder.com/100',
    },
    {
      party_name: 'Party C',
      party_logo: 'https://via.placeholder.com/50',
      party_leader: 'Leader C',
      party_slogan: 'Slogan C',
      party_symbol: '🌈',
      participant_photo: 'https://via.placeholder.com/100',
    },
    // Add more dummy data as needed
  ]);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParticipant());
  }, [dispatch]);


  const participants = useSelector((state) => state.admin.participantData);


   useEffect(() => {
    if(participants){
      setparticipantsData(participants);
    }
  }, [participants]);





  const [searchTerm, setSearchTerm] = useState('');

  // Filter participants based on the search term
  const filteredParticipants = participantsData.filter((participant) =>
    participant.party_name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleDelete = (id) => {
    dispatch(deleteParticipant(id));
  };


  const handleEdit = (id) => {
    window.location.href = `/admin/edit-participant/${id}`;
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Participants</h1>
      <input
        type="text"
        placeholder="Search by Party Name"
        className="mb-4 p-2 border rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {/* <th className="border border-gray-300 p-2">Logo</th> */}
              <th className="border border-gray-300 p-2">Party Name</th>
              <th className="border border-gray-300 p-2">Party Leader</th>
              <th className="border border-gray-300 p-2">Party Slogan</th>
              <th className="border border-gray-300 p-2">Party Symbol</th>
              <th className="border border-gray-300 p-2">Participant Photo</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredParticipants.map((participant, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {/* <td className="border border-gray-300 p-2">
                  <img src={participant.party_logo} alt={`${participant.party_name} logo`} />
                </td> */}
                <td className="border border-gray-300 p-2">{participant.party_name}</td>
                <td className="border border-gray-300 p-2">{participant.party_leader}</td>
                <td className="border border-gray-300 p-2">{participant.party_slogan}</td>
                <td className="border border-gray-300 p-2">
                <img
                    src={`http://localhost:5000/uploads/party_symbols/${participant?.party_symbol}`}
                    alt={`${participant.party_leader} photo`}
                    className="w-20 h-20 rounded-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <img
                    src={`http://localhost:5000/uploads/participant_photos/${participant.participant_photo}`}
                    alt={`${participant.party_leader} photo`}
                    className="w-20 h-20 rounded-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <button onClick={()=>handleEdit(participant._id)} className="bg-blue-500 text-white px-4 py-1 rounded-md">Edit</button>
                  <button onClick={()=>handleDelete(participant._id)} className="bg-red-500 text-white px-4 py-1 rounded-md ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipantsView;
