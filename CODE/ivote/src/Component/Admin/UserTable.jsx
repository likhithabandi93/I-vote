// src/components/UserTable.js
import React, { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getCustomer } from '../../action/Admin';





const UserTable = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCustomer());
    }, [dispatch]);


    const customers = useSelector((state) => state.admin.customerData);


  // Dummy data for users
  const [users , setusers] = useState([
    {
      first_name: 'John',
      middle_name: 'M.',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      photo: 'https://via.placeholder.com/50',
      aadhar_no: 123456789012,
      voter_id: 'VOTER12345',
      age: 30,
    },
    {
      first_name: 'Jane',
      middle_name: 'A.',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      photo: 'https://via.placeholder.com/50',
      aadhar_no: 987654321012,
      voter_id: 'VOTER54321',
      age: 28,
    },
    {
      first_name: 'Alice',
      middle_name: '',
      last_name: 'Johnson',
      email: 'alice.johnson@example.com',
      phone: '555-555-5555',
      photo: 'https://via.placeholder.com/50',
      aadhar_no: 456789123012,
      voter_id: 'VOTER67890',
      age: 32,
    },
  ]);

    useEffect(() => {
        if(customers){
            setusers(customers);
        }
    }, [customers]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">View Users</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Photo</th>
            <th className="border border-gray-300 px-4 py-2">First Name</th>
            <th className="border border-gray-300 px-4 py-2">Middle Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Aadhar No</th>
            <th className="border border-gray-300 px-4 py-2">Voter ID</th>
            <th className="border border-gray-300 px-4 py-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={`http://localhost:5000/uploads/customer/${user.photo}`}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="rounded-full w-10 h-10"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.first_name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.middle_name || 'N/A'}</td>
              <td className="border border-gray-300 px-4 py-2">{user.last_name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{user.aadhar_no}</td>
              <td className="border border-gray-300 px-4 py-2">{user.voter_id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
