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
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../../../context/Auth';
import { useNavigation } from '@react-navigation/native';
import PatienteRoutes from '../../../routes/patiente.routes';

import SelectDropdown from 'react-native-select-dropdown';

export default function PacienteProfile() {
	const { token, user, signOut } = useAuth();
	const { navigate } = useNavigation();
	console.log(user);

	function select(index) {
		// console.log(index);
		if (index === 0) {
			navigate('EditarPaciente');
		} else if (index === 1) {
			navigate('MudarSenha');
		}
	}

	return (
		<SafeAreaView style={css.container}>
			<ScrollView>
				<View style={css.inline}>
					<Text style={css.name}>{user.nome}</Text>
					
					<AntDesign name='setting' size={24} color='black' />
					<SelectDropdown
						buttonStyle={css.dropdrown}
						data={['Editar perfil', 'Alterar senha']}
						onSelect={(selectedItem, index) => {
							console.log(selectedItem, index);
							select(index);
						}}
						buttonTextAfterSelection={() => {
							return ' ';
						}}
						defaultButtonText=' '
					/>
				</View>
				<Text style={css.info}>{user.email}</Text>
				<Text style={css.info}>{user.idade} anos</Text>
			</ScrollView>
		</SafeAreaView>
	);
}
