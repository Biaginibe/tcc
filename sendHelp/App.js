import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FilterProvider from './src/context/Filter';
import AuthProvider from './src/context/Auth';
import { Routes } from './src/routes';

export default function app() {
	return (
		<AuthProvider>
			<FilterProvider>
				<NavigationContainer>
					<Routes />
				</NavigationContainer>
			</FilterProvider>
		</AuthProvider>
	);
}
