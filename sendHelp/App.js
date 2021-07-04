import React from 'react';
import { View, Text } from 'react-native';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { css } from './src/css/style';
import FilterProvider from './src/context/Filter';

export default function app() {
	return (
		<FilterProvider>

		<NavigationContainer>
			<Routes/>
		</NavigationContainer>
		</FilterProvider>
	);
}
