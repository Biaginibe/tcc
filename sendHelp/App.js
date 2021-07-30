import React from 'react';
//import Routes from './src/routes'; preciso terminar o index do routes
import { NavigationContainer } from '@react-navigation/native';
import FilterProvider from './src/context/Filter';
import Login from './src/pages/freeAcess/Login/login';
import RegisterUser from './src/pages/freeAcess/Registro/RegisterUser';

export default function app() {
	return (
		<Login />
		// <RegisterUser/>
	);
	// <FilterProvider>
	//   <NavigationContainer>
	//     <Routes />
	//   </NavigationContainer>
	// </FilterProvider>
}
