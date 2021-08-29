import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilePsycho from './pages/patiente/perfilPsycho';

const MarkMapStack = createStackNavigator();

export const MarkRoutes = () => {
	return(
		<MarkMapStack.Navigator>
			<MarkMapStack.Screen name='ProfilePsycho' component={ProfilePsycho} />
		</MarkMapStack.Navigator>
	)
};