
import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Dashboard } from './Dashboard';



function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <AiOutlineMenu className='text-3xl cursor-pointer' onClick={toggleMenu} />
      {/* Conditional rendering of Dashboard for mobile */}
      <div
        className={`fixed top-0 right-0 h-screen w-2/4 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex justify-end pt-4 pl-4'>
          <button onClick={toggleMenu} className='text-xl'>✕</button>
        </div>
        <Dashboard closeMenu={toggleMenu} />
      </div>
    </div>
  );
}

export default HamburgerMenu;
