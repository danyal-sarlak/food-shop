import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import Routes from "./Routes";
import store from "./Redux/store";
import Balance from "./Components/Balance";
import HamburgerMenu from "./Components/HamburgerMenu";
import { Dashboard } from "./Components/Dashboard";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <div dir="rtl" className="grid grid-cols-12 h-screen">
            <div className="bg-white  col-start-1 col-end-3 md:block hidden">
              <Dashboard />
            </div>
            <div className="bg-slate-200 md:col-start-3 md:col-end-10 col-start-1 col-end-13  ">
              <Routes />
            </div>
            {/* Balance component for mobile below other components */}
            <div className="bg-white col-start-10 col-end-13 md:block hidden">
              <Balance />
            </div>
            {/* Balance component for mobile */}
            <div className="md:hidden col-start-1 col-end-13">
              <Balance />
            </div>
            {/* Hamburger Menu Icon for Mobile */}
            <div className="md:hidden  absolute top-4 right-4 z-50">
              <HamburgerMenu />
            </div>
          </div>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}
