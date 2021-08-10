import React from 'react';
import PsychologistProfile from '../pages/psychologist/perfil/perfilPsychologist';
import Psychologistschedule from '../pages/psychologist/agenda/agenda'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const Tabs = createBottomTabNavigator();
const ProfilelUserStack = createStackNavigator();
const PsychologistscheduleStack = createStackNavigator();


const ProfilelUserStackScreen = () => (
	<ProfilelUserStack.Navigator>
		<ProfilelUserStack.Screen
			name="Perfil"
			component={PsychologistProfile}
			options={{
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
				}}
				/>
	</ProfilelUserStack.Navigator>
);

const PsychologistScheduleStackScreen = () => (
	<PsychologistscheduleStack.Navigator>
		<PsychologistscheduleStack.Screen
			name="Agenda"
			component={Psychologistschedule}
			options={{
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
			}}
			/>
	</PsychologistscheduleStack.Navigator>
);

export default function PsychologistRoutes() {
	
	return (
		<Tabs.Navigator
			initialRouteName="Agenda"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Agenda') {
						iconName = focused ? 'notebook' : 'notebook-outline';
					} else if (route.name === 'Perfil') {
						iconName = focused ? 'account-circle' : 'account-circle-outline';
					}
					return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
				},
			})}
			tabBarOptions={{
				activeTintColor: '#0851aa',
				inactiveTintColor: 'gray',
			}}
		>
			<Tabs.Screen name="Perfil" component={ProfilelUserStackScreen} />
			<Tabs.Screen name="Agenda" component={PsychologistScheduleStackScreen} />
		</Tabs.Navigator>
	);
}
