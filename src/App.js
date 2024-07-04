import React from 'react';

//  React router
import {HashRouter as Router, useRoutes} from 'react-router-dom';

//  Primereact UI
//  (Full list of themes here: https://primereact.org/theming/)
import "primeflex/primeflex.css";                                   //flex
import "primereact/resources/themes/md-light-indigo/theme.css";      //theme
import "primereact/resources/primereact.min.css";                   //core css
import "primeicons/primeicons.css";                                 //icons

//  Global styles
import './App.css';

//  App components
import SetupHome from './components/SetupHome';
import EditConnection from "./components/EditConnection";
import NotFound from './components/common/NotFound';

function Routes() {

  //  Our routes
  //  Because we use a HashRouter, these all have
  //  a leading /# in front of them.
  //  Example: /#/edit
  //  Example: /#/    <-- for the root
  return useRoutes([
    {path: "/", element: <SetupHome/>},
    {path: "/edit", element: <EditConnection/>},
    {path: "*", element: <NotFound/>}
  ]);
}

function App() {
  return (
      <Router>
        <Routes/>
      </Router>
  );
}

export default App;
