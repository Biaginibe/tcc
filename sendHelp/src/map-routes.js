import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileMarker from './pages/patiente/perfilMarker';

const MarkMapStack = createStackNavigator();

export const MarkRoutes = () => {
	return(
		<MarkMapStack.Navigator>
			<MarkMapStack.Screen name='ProfileMarker' component={ProfileMarker} options={{
				title: 'SendHelp',
				headerStyle: {
					backgroundColor: '#053165',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
					fontSize: 28,
					fontFamily:'sans-serif'
				},
			}}  />
		</MarkMapStack.Navigator>
	)
};