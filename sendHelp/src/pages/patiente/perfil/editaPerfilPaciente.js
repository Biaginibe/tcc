import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { css } from '../../../css/style'; 
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/Auth'; 
import { useNavigation } from '@react-navigation/native';

export default function editaPacienteProfile(navigation) {
	const { token, user, signOut } = useAuth();
    console.log("Teste"+user);
	return (
		<View style={css.container}>
				<SafeAreaView style={css.container}>
			<Text>Edita DO USUARIO</Text>
			<ScrollView>
				<Text>Nome: {user.nome}</Text>
				<Text>CPF: {user.cpf}</Text>
				<Text>Email: {user.email}</Text>
				<Text>Idade: {user.idade}</Text>
				<Text>Senha: {user.senha}</Text>
				
			</ScrollView>
			
			<TouchableOpacity onPress={signOut}>
				<Octicons name='sign-out' size={24} color='black' />
			</TouchableOpacity>
		</SafeAreaView>
		</View>
	);
}
