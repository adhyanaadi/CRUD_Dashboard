import React, { useState } from 'react'
import { FaPerson } from "react-icons/fa6";
import { AiFillAccountBook, AiFillFileAdd, AiTwotoneMail } from "react-icons/ai";
import { CiMobile2 } from "react-icons/ci";
import { MdDateRange } from "react-icons/md";
import { IoFootsteps } from "react-icons/io5";
import { GoGoal } from "react-icons/go";
import { GiNightSleep } from "react-icons/gi";
import { FaFireAlt } from "react-icons/fa";

const Dashboard = () => {

  const [formData, setformData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    dailyStepGoal: '',
  })

  const handleChange = (e) => {
    setformData({
      ...formData, 
      [e.target.name]:e.target.value,
    });
  };

  //To be understood later
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Customer data submitted successfully');
        // You can reset the form or redirect as needed here
      } else {
        alert('Error submitting customer data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <>
      <div className='right-content w-100'>
        <div className='dashboardBoxWrapper flex flex-col'>
          <div className='dashboardBox flex flex-row'>
            <div className='details'></div>
            
              <form className='flex' onSubmit={handleSubmit}>
              <div className='d1 flex flex-col w-[40%] justify-center p-4'>
                <div className='flex flex-row w-full'>
                  <div className='w-[35%]'>
                    <h2 className='text-xl font-semibold mb-2 p-2 text-white'>First Name</h2>
                    <h2 className='text-xl font-semibold mb-2 p-2 text-white'>Last Name</h2>
                    <h2 className='text-xl font-semibold mb-2 p-2 text-white'>Email</h2>
                  </div>
                  <div className='flex flex-col w-[65%] space-y-2'>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='Eg. Aditya' className='border border-gray-300 p-2 rounded-md' />
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Eg. Adhyan' className='border border-gray-300 p-2 rounded-md' />
                    <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder='Eg. something@gmail.com'className='border border-gray-300 p-2 rounded-md' />
                  </div>
                </div>
              </div>


              <div className='d1 flex flex-col w-[40%] justify-center p-4'>
                <div className='flex flex-row w-full'>
                  <div className='w-[35%]'>
                    <h2 className='text-xl font-semibold mb-2 p-2 text-white'>Phone</h2>
                    <h2 className='text-xl font-semibold mb-2 p-2 text-white'>Date of Birth</h2>
                    <h2 className='text-xl font-semibold mb-2 p-2 text-white'>Daily Goal</h2>
                  </div>
                  <div className='flex flex-col w-[65%] space-y-2'>
                    <input type="text" name='phone' value={formData.phone} onChange={handleChange} placeholder='Eg. 8203091522' className='border border-gray-300 p-2 rounded-md' />
                    <input type="text" name='dob' value={formData.dob} onChange={handleChange} placeholder='Eg. 27.09.2002' className='border border-gray-300 p-2 rounded-md' />
                    <input type="text" name='dailyStepGoal' value={formData.dailyStepGoal} onChange={handleChange} placeholder='Eg. 4000 steps'className='border border-gray-300 p-2 rounded-md' />
                  </div>
                </div>
              </div>

              <div className='submit w-[20%] flex items-center justify-center'>
                <button onClick={handleSubmit} type="submit" className='bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg'>
                  SUBMIT
                </button>
              </div>
              </form>
          </div>
        </div>

        <div className='dashboardHealth flex flex-col text-white'>
          <div className='dashboarditem flex flex-row font-semibold'>
            <div className='ItemDetails1 flex flex-col justify-center w-[40%]'>
              <h2 className='flex'><FaPerson className='mr-4 ml-4'/>Aditya Adhyan</h2>
              <h2 className='flex'><AiTwotoneMail className='mr-4 ml-4'/>aadiadhyan@gmail.com</h2>
              <h2 className='flex'><CiMobile2 className='mr-4 ml-4'/>8102091322</h2>
              <h2 className='flex'><MdDateRange className='mr-4 ml-4'/>28/11/2001</h2>
            </div>
            <div className='ItemDetails2 flex flex-col justify-center w-[40%]'>
              <h2 className='flex'><GoGoal className='mr-4 ml-4'/>Daily Step Goal</h2>
              <h2 className='flex'><IoFootsteps className='mr-4 ml-4'/>Average Steps - 3268</h2>
              <h2 className='flex'><GiNightSleep className='mr-4 ml-4'/>Average Sleep - 9</h2>
              <h2 className='flex'><FaFireAlt className='mr-4 ml-4'/>Average Calories - 2456</h2>
            </div>
            <div className='ItemButtons flex flex-col justify-center items-center space-y-1.5 w-[20%]'>
            <button className='bg-gray-700 hover:bg-gray-800 text-white text-lg font-bold py-1.5 px-2 rounded-lg w-[50%]'>Edit</button>
            <button className='bg-gray-700 hover:bg-gray-800 text-white text-lg font-bold py-1.5 px-2 rounded-lg w-[50%]'>Delete</button>
            <button className='bg-gray-700 hover:bg-gray-800 text-white text-lg font-bold py-1.5 px-2 rounded-lg w-[50%]'>View</button>
            </div>
          </div>
          {/* <div className='dashboarditem'></div> */}
        </div>
      </div>
    </>
  )
}

export default Dashboard
