import React from 'react';
import MapPatiente from './pages/patiente/map';
import ProfilePsycho from './pages/patiente/perfilPsycho';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator initialRouteName="Map">
			<Stack.Screen
				name="Map"
				component={MapPatiente}
				options={{
					title: 'SendHelp',
					headerStyle: {
						backgroundColor: '#053165',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			/>
			<Stack.Screen name="ProfilePsychologist" component={ProfilePsycho} />
		</Stack.Navigator>
	);
}
