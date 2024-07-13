import React, {useEffect, useState} from 'react';

//  React router
import {HashRouter as Router, useRoutes} from 'react-router-dom';

//  Primereact UI
//  Theme selection is below, in component render
import "primeflex/primeflex.css";                                   //flex
import "primereact/resources/primereact.min.css";                   //core css
import "primeicons/primeicons.css";                                 //icons

//  Global styles
import './App.css';

//  App components
import SetupHome from './components/SetupHome';
import SaveReboot from "./components/SaveReboot";
import NotFound from './components/common/NotFound';

function Routes() {

  //  Our routes
  //  Because we use a HashRouter, these all have
  //  a leading /# in front of them.
  //  Example: /#/edit
  //  Example: /#/    <-- for the root
  return useRoutes([
    {path: "/", element: <SetupHome/>},
    {path: "/sr", element: <SaveReboot/>},
    {path: "*", element: <NotFound/>}
  ]);
}

function App() {

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const setThemeMode = (mode) => {
            const existingLink = document.getElementById('app-theme-css');
            if (existingLink) {
                //  Full list of themes under the 'public/themes' folder
                //  Examples are here: https://primereact.org/theming/
                existingLink.href = `/themes/md-${mode}-indigo/theme.css`;
            } else {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `/themes/md-${mode}-indigo/theme.css`;
                link.id = 'app-theme-css';
                document.head.appendChild(link);
            }
            return () => {
                const existingLink = document.getElementById('theme-link');
                if (existingLink) {
                    document.head.removeChild(existingLink);
                }
            };
        }

        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = isDarkMode ? 'dark' : 'light';
        setTheme(initialTheme);
        const cleanup = setThemeMode(isDarkMode ? 'dark' : 'light');

        // Listen for changes to the color scheme preference
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            const newMode = e.matches ? 'dark' : 'light';
            setTheme(newMode);
            cleanup();
            setThemeMode(newMode);
        };

        mediaQueryList.addEventListener('change', handleChange);

        return () => {
            mediaQueryList.removeEventListener('change', handleChange);
            cleanup();
        };

    }, [theme]);


  return (
      <Router>
        <Routes/>
      </Router>
  );
}

export default App;
