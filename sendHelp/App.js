import React from 'react';
import { View, Text } from 'react-native';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { css } from './src/css/style';
export default function app() {
	return (
		
	<NavigationContainer>
		<Routes/>
	</NavigationContainer>
	);
}
