// src/components/LiveViewLeaderboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { leaderboard } from '../../action/Admin';

const LiveViewLeaderboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(leaderboard());
  }, [dispatch]);

  // Use the actual leaderboard data from Redux
  const participants = useSelector((state) => state.admin.leaderboardData);

  console.log(participants);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Live View Leaderboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {participants && participants.map((participant) => (
          <div
            key={participant._id} // Assuming _id is the unique identifier
            className="bg-white border border-gray-300 rounded-lg p-4 flex items-center shadow-md"
          >
            <img
              src={`http://localhost:5000/uploads/participant_photos/${participant.participant_photo}`} // Use actual participant photo URL
              alt={participant.party_leader} // Using party leader for better context
              className="rounded-full w-16 h-16 mr-4"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{participant.party_leader}</h3> {/* Display party leader's name */}
              <p className="text-gray-600">{participant.party_name}</p>
              <p className="text-gray-800 font-bold">{participant.voting_count} Votes</p> {/* Correct spelling */}
            </div>
            {participant.voiting_count === Math.max(...participants.map(p => p.voting_count)) && ( // Check if participant has the max votes
              <img
                src="https://via.placeholder.com/20?text=W" // Use a winner icon
                alt="Winner"
                className="w-8 h-8 ml-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveViewLeaderboard;
