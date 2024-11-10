import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addParticipant,updateParticipant } from '../../action/Admin';
import { useParams } from 'react-router-dom';

const AddParticipant = () => {
  const [formData, setFormData] = useState({
    party_name: '',
    party_leader: '',
    party_slogan: '',
  });

  const [party_symbol, setPartySymbol] = useState('');

  const handleFileChangesss = (e) => {
    setPartySymbol(e.target.files[0]);
  };


  const [participant_photo, setParticipantPhoto] = useState('');

  const handleFileChange = (e) => {
    setParticipantPhoto(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const dispatch = useDispatch();

  const { id } = useParams();

  const isrequired =  id ? false : true;

  const title = id ? 'Edit' : 'Add';

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('party_name', formData.party_name);
    data.append('party_leader', formData.party_leader);
    data.append('party_slogan', formData.party_slogan);
    data.append('party_symbol', party_symbol);
    data.append('participant_photo', participant_photo);
    if(id){
      dispatch(updateParticipant(data,id));
    }else{

    dispatch(addParticipant(data));
    }

  

  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">{title} Participant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Party Name</label>
          <input
            type="text"
            name="party_name"
            value={formData.party_name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={isrequired}
          />
        </div>
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Party Logo URL</label>
          <input
            type="text"
            name="party_logo"
            value={formData.party_logo}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div> */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Party Leader</label>
          <input
            type="text"
            name="party_leader"
            value={formData.party_leader}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={isrequired}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Party Slogan</label>
          <input
            type="text"
            name="party_slogan"
            value={formData.party_slogan}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={isrequired}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Party Symbol</label>
          <input
            type="file"
            name="party_symbol"
            onChange={handleFileChangesss}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={isrequired}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Participant Photo </label>
          <input
            type="file"
            name="participant_photo"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={isrequired}
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {title} Participant
        </button>
      </form>
    </div>
  );
};

export default AddParticipant;
