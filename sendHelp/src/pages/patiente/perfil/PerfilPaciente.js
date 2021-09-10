import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { css } from '../../../css/style'; 
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/Auth'; 
import { useNavigation } from '@react-navigation/native';
import PatienteRoutes from '../../../routes/patiente.routes';

export default function PacienteProfile() {
	const { token, user, signOut } = useAuth();
	const {navigate} = useNavigation();
    console.log(user);

	return (
		
		<SafeAreaView style={css.container}>
			<Text>PERFIL DO USUARIO</Text>
			<ScrollView>
				<Text>Nome: {user.nome}</Text>
				<Text>CPF: {user.cpf}</Text>
				<Text>Email: {user.email}</Text>
				<Text>Idade: {user.idade}</Text>
				<Text>Senha: {user.senha}</Text>
				
			</ScrollView>
			<TouchableOpacity onPress={(e)=>{navigate('editaPacientePerfil')}}>
				<Octicons name='sign-out' size={24} color='black' />
			</TouchableOpacity>
			<TouchableOpacity onPress={signOut}>
				<Octicons name='sign-out' size={24} color='black' />
			</TouchableOpacity>
		</SafeAreaView>
	);
}
