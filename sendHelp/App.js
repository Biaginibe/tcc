import React from 'react';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import FilterProvider from './src/context/Filter';
import Login from './src/pages/patiente/Login/login';
import RegisterUser from './src/pages/patiente/Registro/RegisterUser';

export default function app() {
  return (
	// <Login/>
    <FilterProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </FilterProvider>
  );
}
