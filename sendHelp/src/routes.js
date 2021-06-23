import React from 'react';
import MapPatiente from './pages/patiente/map';
import ProfileUser from './pages/patiente/perfilUser';
import ListPsychologist from './pages/patiente/ListarPsicologos/listaPsycho';
import PsychologistSchedulle from './pages/psychologist/agenda/agenda'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator();
const MapStack = createStackNavigator();
const ProfilelUserStack = createStackNavigator();
const ListPsychologistStack = createStackNavigator();
const PsychologistSchedulleStack = createStackNavigator();

const MapStackScreen = () => (
	<MapStack.Navigator>
		<MapStack.Screen
			name="Mapa"
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
	</MapStack.Navigator>
);
const ProfilelUserStackScreen = () => (
	<ProfilelUserStack.Navigator>
		<ProfilelUserStack.Screen
			name="Perfil"
			component={ProfileUser}
			options={{
				title: 'SendHelp - Seu Perfil',
				headerStyle: {
					backgroundColor: '#053165',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}
		/>
	</ProfilelUserStack.Navigator>
);
const ListPsychologistStackScreen = () => (
	<ListPsychologistStack.Navigator>
		<ListPsychologistStack.Screen
			name="Lista"
			component={ListPsychologist}
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
	</ListPsychologistStack.Navigator>
);
const PsychologistSchedulleStackScreen = () => (
	<PsychologistSchedulleStack.Navigator>
		<PsychologistSchedulleStack.Screen
			name="Agenda"
			component={PsychologistSchedulle}
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
	</PsychologistSchedulleStack.Navigator>
);

export default function Routes() {
	return (
		<Tabs.Navigator
			initialRouteName="Mapa"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Mapa') {
						iconName = focused
							? 'map-marker-radius'
							: 'map-marker-radius-outline';
					} else if (route.name === 'Perfil') {
						iconName = focused ? 'account-circle' : 'account-circle-outline';
					} else if (route.name === 'Lista') {
						iconName = focused ? 'view-list' : 'view-list-outline';
					}


					// You can return any component that you like here!
					return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
				},
			})}
			tabBarOptions={{
				activeTintColor: '#0851aa',
				inactiveTintColor: 'gray',
			}}
		>
			<Tabs.Screen name="Mapa" component={MapStackScreen} />
			<Tabs.Screen name="Lista" component={ListPsychologistStackScreen} />
			<Tabs.Screen name="Perfil" component={ProfilelUserStackScreen} />
			<Tabs.Screen name="Agenda" component={PsychologistSchedulleStackScreen} />
		</Tabs.Navigator>
	);
}
