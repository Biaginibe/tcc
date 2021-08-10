import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { css } from '../../../css/style'; 
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/Auth'; 

export default function PsychologistProfile() {
	const { signOut } = useAuth();
	return (
		<View style={css.container}>
			<Text>PERFIL DO USUARIO</Text>
			<TouchableOpacity onPress={signOut}>
				<Octicons name='sign-out' size={24} color='black' />
			</TouchableOpacity>
		</View>
	);
}
