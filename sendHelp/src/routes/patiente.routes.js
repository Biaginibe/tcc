import React from 'react';
import { View } from 'react-native-animatable';
import MapPatiente from '../pages/patiente/map';
import ProfileUser from '../pages/patiente/perfilUser';
import PacienteProfile from '../pages/patiente/perfil/PerfilPaciente';
import editaPacienteProfile from '../pages/patiente/perfil/editaPerfilPaciente';
import ListPsychologist from '../pages/patiente/ListarPsicologos/listaPsycho';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import ProfileMarker from '../pages/patiente/PerfilMarcador/perfilMarker';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/Auth';
import changePassword from '../pages/patiente/perfil/mudarSenha';

const Tabs = createBottomTabNavigator();
const MapStack = createStackNavigator();
const ProfilelUserStack = createStackNavigator();
const PacienteProfileStack = createStackNavigator();
const editaPacienteProfileStack = createStackNavigator();
const ListPsychologistStack = createStackNavigator();
const MarkMapStack = createStackNavigator();

const MapStackScreen = () => {
	const { navigate } = useNavigation();
	const { signOut } = useAuth();
	return (
		<MapStack.Navigator>
			<MapStack.Screen
				name='Mapa'
				component={MapPatiente}
				options={{
					title: 'SendHelp',
					headerStyle: {
						backgroundColor: '#053165',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
						fontSize: 28,
						fontFamily: 'sans-serif',
					},
					headerRight: () => (
						<View style={{ marginRight: 10 }}>
							<Octicons.Button
								backgroundColor='#053165'
								name='sign-out'
								size={25}
								color={'white'}
								onPress={signOut}
							/>
						</View>
					),
				}}
			/>
		</MapStack.Navigator>
	);
};

const ProfilelUserStackScreen = () => {
	const { navigate } = useNavigation();
	const { signOut } = useAuth();
	return (
		<ProfilelUserStack.Navigator>
			<ProfilelUserStack.Screen
				name='Perfil'
				component={ProfileUser}
				options={{
					title: 'SendHelp',
					headerStyle: {
						backgroundColor: '#053165',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
						fontSize: 28,
						fontFamily: 'sans-serif',
					},
					headerRight: () => (
						<View style={{ marginRight: 10 }}>
							<MaterialCommunityIcons.Button
								backgroundColor='#053165'
								name='account-edit'
								size={25}
								color={'white'}
								onPress={signOut}
							/>
						</View>
					),
				}}
			/>
		</ProfilelUserStack.Navigator>
	);
};
const PacienteProfileStackScreen = ({ navigation }) => {
	const { navigate } = useNavigation();
	const { signOut } = useAuth();
	return (
		<PacienteProfileStack.Navigator>
			<PacienteProfileStack.Screen
				name='PerfilPaciente'
				component={PacienteProfile}
				options={{
					title: 'SendHelp',
					headerStyle: {
						backgroundColor: '#053165',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
						fontSize: 28,
						fontFamily: 'sans-serif',
					},
					headerRight: () => (
						<View style={{ marginRight: 10 }}>
							<Octicons.Button
								backgroundColor='#053165'
								name='sign-out'
								size={25}
								color={'white'}
								onPress={signOut}
							/>
						</View>
					),
				}}
			/>
			<PacienteProfileStack.Screen
				name='EditarPaciente'
				component={editaPacienteProfile}
				options={{
					title: 'SendHelp',
					headerStyle: {
						backgroundColor: '#053165',
					},
					headerTintColor: '#fff',

					headerTitleStyle: {
						fontWeight: 'bold',
						fontSize: 28,
						fontFamily: 'sans-serif',
					},
					headerRight: () => (
						<View style={{ marginRight: 10 }}>
							<Octicons.Button
								backgroundColor='#053165'
								name='sign-out'
								size={25}
								color={'white'}
								onPress={signOut}
							/>
						</View>
					),
				}}
			></PacienteProfileStack.Screen>
			<PacienteProfileStack.Screen
				name='MudarSenha'
				component={changePassword}
				options={{
					title: 'SendHelp',
					headerStyle: {
						backgroundColor: '#053165',
					},
					headerTintColor: '#fff',

					headerTitleStyle: {
						fontWeight: 'bold',
						fontSize: 28,
						fontFamily: 'sans-serif',
					},
					headerRight: () => (
						<View style={{ marginRight: 10 }}>
							<Octicons.Button
								backgroundColor='#053165'
								name='sign-out'
								size={25}
								color={'white'}
								onPress={signOut}
							/>
						</View>
					),
				}}
			></PacienteProfileStack.Screen>
		</PacienteProfileStack.Navigator>
	);
};

const ListPsychologistStackScreen = () => {
	const { navigate } = useNavigation();
	const { signOut } = useAuth();
	return (
		<ListPsychologistStack.Navigator>
			<ListPsychologistStack.Screen
				name='Lista'
				component={ListPsychologist}
				options={{
					title: 'SendHelp',
					headerStyle: {
						backgroundColor: '#053165',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
						fontSize: 28,
						fontFamily: 'sans-serif',
					},
					headerRight: () => (
						<View style={{ marginRight: 10 }}>
							<Octicons.Button
								backgroundColor='#053165'
								name='sign-out'
								size={25}
								color={'white'}
								onPress={signOut}
							/>
						</View>
					),
				}}
			/>
		</ListPsychologistStack.Navigator>
	);
};

export default function PatienteRoutes() {
	return (
		<>
			<Tabs.Navigator
				initialRouteName='Mapa'
				screenOptions={({ route }) => ({
					tabBarButton: ['ProfileMarker'].includes(route.name)
						? () => {
								return null;
						  }
						: undefined,
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === 'Mapa') {
							iconName = focused
								? 'map-marker-radius'
								: 'map-marker-radius-outline';
						} else if (route.name === 'Perfil') {
							iconName = focused
								? 'account-circle'
								: 'account-circle-outline';
						} else if (route.name === 'Lista') {
							iconName = focused
								? 'view-list'
								: 'view-list-outline';
						}

						return (
							<MaterialCommunityIcons
								name={iconName}
								size={size}
								color={color}
							/>
						);
					},
				})}
				tabBarOptions={{
					activeTintColor: '#0851aa',
					inactiveTintColor: 'gray',
				}}
			>
				<Tabs.Screen name='Mapa' component={MapStackScreen} />
				<Tabs.Screen
					name='Lista'
					component={ListPsychologistStackScreen}
				/>
				<Tabs.Screen
					name='Perfil'
					component={PacienteProfileStackScreen}
				/>
				<MarkMapStack.Screen
					tabBarShowLabel='false'
					name='ProfileMarker'
					component={ProfileMarker}
				/>
			</Tabs.Navigator>
		</>
	);
}
