import React, {useState} from 'react';
import {  ScrollView, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { instance } from '../../config/axios';
import { css } from '../../css/style';
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '../../context/Auth'; 
import {Text} from 'react-native-elements'

export default function ProfileUser() {
	
	const { token, user, signOut } = useAuth();

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
			
			<TouchableOpacity onPress={signOut}>
				<Octicons name='sign-out' size={24} color='black' />
			</TouchableOpacity>
		</SafeAreaView>
	);
}
