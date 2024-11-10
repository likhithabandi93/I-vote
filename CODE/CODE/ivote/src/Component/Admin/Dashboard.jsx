import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dashboard } from '../../action/Admin';

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(dashboard());
    }, [dispatch]);

    const datas = useSelector((state) => state.admin.dashboardData);

    // console.log(datas.top_participants);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-700">Number of Voters</h2>
                    <p className="text-3xl font-bold text-blue-600">{datas?.total_customers}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-700">Number of Participants</h2>
                    <p className="text-3xl font-bold text-green-600">{datas?.total_participants}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-700">Voting Count</h2>
                    <p className="text-3xl font-bold text-red-600">{datas?.voiting_count[0].total_voiting_count}</p>
                </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Participants</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {datas?.top_participants?.map((participant, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                        <img
                            src={`http://192.168.1.130:5000/uploads/participant_photos/${participant.participant_photo}`} // Assuming this is the correct path for the image
                            alt={participant.party_name}
                            className="w-full h-56 object-cover rounded-t-lg"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 mt-2">{participant.party_name}</h3>
                        <p className="text-sm text-gray-600">Leader: {participant.party_leader}</p>
                        <p className="text-sm text-gray-600">Slogan: {participant.party_slogan}</p>
                        <p className="text-sm text-gray-600">Votes: {participant.voting_count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
