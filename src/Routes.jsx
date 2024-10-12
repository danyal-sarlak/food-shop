// src/Routes.jsx
import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './Pages/Home';
import Basket from './Pages/Basket';
import Timeline from './Components/Timeline';
const Routes = () => {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: '/basket', element: <Basket /> },          
    { path: '/timeline', element: <Timeline/> },          
  ]);
};

export default Routes;
