import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import { css } from './style';
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/Auth';
import { useNavigation } from '@react-navigation/native';
import PatienteRoutes from '../../../routes/patiente.routes';

export default function PacienteProfile() {
	const { token, user, signOut } = useAuth();
	const { navigate } = useNavigation();
	console.log(user);

	return (
		<SafeAreaView style={css.container}>
			<ScrollView>
				<View style={css.inline}>
					<Text style={css.name}>{user.nome}</Text>
					<TouchableOpacity
						onPress={(e) => {
							navigate('EditarPaciente');
						}}
					>
						<Octicons name='pencil' size={24} color='gray' />
					</TouchableOpacity>
				</View>
				<Text style={css.info}>{user.email}</Text>
				<Text style={css.info}>{user.idade} anos</Text>
			</ScrollView>
		</SafeAreaView>
	);
}
