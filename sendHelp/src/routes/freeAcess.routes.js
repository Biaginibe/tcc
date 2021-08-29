import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/freeAcess/Login/login';
import RegisterUser from '../pages/freeAcess/Registro/RegisterUser';
import RegisterClient from '../pages/freeAcess/Registro/RegisterClient';
import RegisterPsychologist from '../pages/freeAcess/Registro/RegisterPsychologist';

const Free = createStackNavigator();

export const FreeRoutes = () => {
	return (
		<Free.Navigator
			initialRouteName='Login'
			screenOptions={{
				headerShown: false,
			}}
		>
			<Free.Screen name='Login' component={Login} />

			<Free.Screen name='RegisterUser' component={RegisterUser} />

			<Free.Screen name='RegisterClient' component={RegisterClient} />
			
			<Free.Screen name='RegisterPsychologist' component={RegisterPsychologist} />
		</Free.Navigator>
	);
};
