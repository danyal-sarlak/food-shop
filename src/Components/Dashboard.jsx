
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineFastfood } from 'react-icons/md';
import { CiViewTimeline } from 'react-icons/ci';
import { SlBasket } from 'react-icons/sl';
import { AiOutlineClose } from 'react-icons/ai'; 

export function Dashboard({ closeMenu }) {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState('');

  const handleNavigation = (path, item) => {
    navigate(path);
    setSelectedItem(item); // به‌روزرسانی وضعیت انتخاب شده
    if (closeMenu) closeMenu(); // Close menu if provided
  };

  return (
    <div className='h-screen relative flex flex-col  items-center'>
   
      <h1 className='text-2xl justify-center pt-5 flex font-bold'>منو</h1>
      <ul dir='rtl' className='flex flex-col  px-4 py-3 xl:py-3 w-full max-w-xs mx-auto items-center'>
        <li
          className={`py-4 lg:py-3 flex text-xs xl:text-base xl:font-bold items-center cursor-pointer justify-center w-full text-center rounded-md transition-colors duration-200 ${selectedItem === 'dashboard' ? 'text-white bg-yellow-500' : 'text-gray-500 bg-transparent'}`}
          onClick={() => handleNavigation('/', 'dashboard')}
        >
          <MdOutlineFastfood className='ml-2 lg:block hidden' />
          داشبورد
        </li>
        <li
          className={`py-4 pr-5  lg:py-3 xl:pr-8 flex text-xs xl:font-bold xl:text-base items-center cursor-pointer justify-center w-full text-center rounded-md transition-colors duration-200 ${selectedItem === 'timeline' ? 'text-white bg-yellow-500' : 'text-gray-500 bg-transparent'}`}
          onClick={() => handleNavigation('/timeline', 'timeline')}
        >
          <CiViewTimeline className='ml-2 lg:block hidden ' />
          نمایش لاگ ها
        </li>
        <li
          className={`py-4 lg:py-3 flex xl:pr-1 text-xs xl:font-bold xl:text-base items-center cursor-pointer justify-center w-full text-center rounded-md transition-colors duration-200 ${selectedItem === 'cart' ? 'text-white bg-yellow-500' : 'text-gray-500 bg-transparent'}`}
          onClick={() => handleNavigation('/basket', 'cart')}
        >
          <SlBasket className='ml-2 lg:block hidden' />
          سبد خرید
        </li>
      </ul>
    </div>
  );
}