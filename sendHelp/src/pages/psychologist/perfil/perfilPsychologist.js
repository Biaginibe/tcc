import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { css } from '../../../css/style'; 
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/Auth'; 

export default function PacienteProfile() {
	const { signOut, psychologist, user } = useAuth();
	return (
		<View style={css.container}>
			<Text>EDitar DO USUARIO</Text>
			<Text>{user.nome}</Text>
			<TouchableOpacity style={{marginVertical:50}} onPress={()=> console.log(psychologist)}>
				<Text>TESTE</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={signOut}>
				<Octicons name='sign-out' size={24} color='black' />
			</TouchableOpacity>
		</View>
	);
}
