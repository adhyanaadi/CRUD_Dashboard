import React, { useState } from 'react';
import Logo from '../../assets/revfin_light.png';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { MdOutlineDashboard, MdHealthAndSafety, MdKeyboardArrowRight } from 'react-icons/md';
import { FaUser } from "react-icons/fa";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(0); // Track the active tab
  const [isToggleSubmenu, setisToggleSubmenu] = useState(false); // Track submenu toggle state

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (index === 2) { // Toggle submenu only for 'Customer Health'
      setisToggleSubmenu(!isToggleSubmenu);
    } else {
      setisToggleSubmenu(false); // Close submenu when switching tabs
    }
  };

  return (
    <div className='sidebar fixed top-0 left-0 z-[100] w-[20%]'>
      <Link to="/">
        <div className='logoWrapper py-2 px-2'>
          <img src={Logo} className='w-100' alt="Logo" />
        </div>
      </Link>

      <div className='sidebarTabs'>
        <ul className='flex gap-2 flex-col'>
          <li>
            {/* Customer Dashboard Button */}
            <Button
              className={`w-100 ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => handleTabClick(1)}
            >
              <span className='icon w-[25px] h-[25px] flex items-center justify-center rounded-md'>
                <MdOutlineDashboard />
              </span>
              Customer Dashboard
            </Button>
          </li>

          <li className={`${activeTab===2 && handleTabClick === true ? 'colapse' : ''}`}>
            {/* Customer Health Button */}
            <Button
              className={`w-100 ${activeTab === 2 ? 'active' : ''}`}
              onClick={() => handleTabClick(2)}
            >
              <span className='icon w-[25px] h-[25px] flex items-center justify-center rounded-md'>
                <MdHealthAndSafety />
              </span>
              Customer Health
              <span className='arrow ml-auto w-[25px] h-[25px] flex items-center right-0 justify-center rounded-md'>
                <MdKeyboardArrowRight />
              </span>
            </Button>

            {/* Dropdown submenu - Visible only if submenu is toggled */}
            {isToggleSubmenu && (
              <div className='submenu'>
                <Button className='w-100'><span className='icon w-[25px] h-[25px] flex items-center justify-center rounded-md'><FaUser /></span>Narender Kumar</Button>
                <Button className='w-100'><span className='icon w-[25px] h-[25px] flex items-center justify-center rounded-md'><FaUser /></span>Muskan Yadav</Button>
                <Button className='w-100'><span className='icon w-[25px] h-[25px] flex items-center justify-center rounded-md'><FaUser /></span>Ayush Kumar</Button>
                <Button className='w-100'><span className='icon w-[25px] h-[25px] flex items-center justify-center rounded-md'><FaUser /></span>Aditya Adhyan</Button>
                <Button className='w-100'><span className='icon w-[25px] h-[25px] flex items-center justify-center rounded-md'><FaUser /></span>Ishika Raj</Button>
                <Button className='w-100'><span className='icon w-[25px] h-[25px] flex items-center justify-center rounded-md'><FaUser /></span>Gaurav Sharan</Button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
