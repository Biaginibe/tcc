import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/freeAcess/Login/login';
import RegisterUser from '../pages/freeAcess/Registro/RegisterUser';

const Free = createStackNavigator();

export const FreeRoutes = () => {
	<Free.Navigator initialRouteName='Login'>
		<Free.Screen name='Login' component={Login} />

        <Free.Screen name="RegisterUser" component={RegisterUser}/>
	</Free.Navigator>;
};
