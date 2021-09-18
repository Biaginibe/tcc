import React from 'react';
import { View } from "react-native-animatable";
import PsychologistProfile from '../pages/psychologist/perfil/perfilPsychologist';
import editaPsychologistProfile from '../pages/psychologist/perfil/editaPerfilPsicologo';
import Psychologistschedule from '../pages/psychologist/agenda/agenda'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/Auth'



const Tabs = createBottomTabNavigator();
const ProfilelUserStack = createStackNavigator();
const PsichologistProfileStack = createStackNavigator();
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
const PsichologistProfileStackScreen = ({navigation}) => {
	const { navigate } = useNavigation();
	const {signOut } = useAuth();
	return (
	  <PsichologistProfileStack.Navigator>
		<PsichologistProfileStack.Screen
		  name="PerfilPsicologo"
		  component={PsychologistProfile}
		  options={{
			title: "SendHelp",
			headerStyle: {
			  backgroundColor: "#053165",
			},
			headerTintColor: "#fff",
			headerTitleStyle: {
			  fontWeight: "bold",
			  fontSize: 28,
			  fontFamily: "sans-serif",
			},
			headerRight: () => (
			  <View style={{ marginRight: 10 }}>
				<Octicons.Button
				  backgroundColor="#053165"
				  name="sign-out"
				  size={25}
				  color={"white"}
				  onPress={signOut}
				/>
			  </View>
			),
		  }}
		/>
		<PsichologistProfileStack.Screen
		 name="EditarPsichologist"
		 component={editaPsychologistProfile}
		 options={{
		   title: "SendHelp",
		   headerStyle: {
			 backgroundColor: "#053165",
		   },
		   headerTintColor: "#fff",
   
		   headerTitleStyle: {
			 fontWeight: "bold",
			 fontSize: 28,
			 fontFamily: "sans-serif",
		   },
	   headerRight: () => (
		<View style={{ marginRight: 10 }}>
		  <Octicons.Button
			backgroundColor="#053165"
			name="sign-out"
			size={25}
			color={"white"}
			onPress={signOut}
		  />
		</View>
	  ),
		 }}>
			
		</PsichologistProfileStack.Screen>
	  </PsichologistProfileStack.Navigator>
	)
	  
	  
	
  };

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
			<Tabs.Screen name="Perfil" component={PsichologistProfileStackScreen} />
			<Tabs.Screen name="Agenda" component={PsychologistScheduleStackScreen} />
		</Tabs.Navigator>
	);
}
