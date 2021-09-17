import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { css } from '../../../css/style'; 
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/Auth'; 
import { useNavigation } from '@react-navigation/native';
import { instance } from "../../../config/axios";

export default function PsychologistProfile() {
	const { token, user, signOut } = useAuth();
	const {navigate} = useNavigation();
	const [perfil, setPerfil] = useState()
    console.log(user);
	console.log("--------------------------");
	console.log(perfil.id);
	useEffect(() => {
		async function getData() {
		  try {
			const valorrequest = user.id;
			const perfildata = await instance.get(
				`/Psychologist/${valorrequest}}/findPsychologistsjoinUsers`,
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);
				console.log(perfildata);
			setPerfil(perfildata.data);
			// console.log(perfil);
		  } catch (err) {
			console.log(err);
		  }
		}
		getData();
	  }, []);

	return (
		<SafeAreaView style={css.container}>
			<Text>PERFIL DO PSICO</Text>
			<ScrollView>
				<Text>Nome: {user.nome}</Text>
				<Text>CPF: {user.cpf}</Text>
				<Text>Email: {user.email}</Text>
				<Text>Idade: {user.idade}</Text>
				<Text>Senha: {user.senha}</Text>
				
			</ScrollView>
			<TouchableOpacity onPress={(e)=>{navigate('EditarPaciente')}}>
				<Octicons name='sign-out' size={24} color='black' />
			</TouchableOpacity>
			<TouchableOpacity onPress={signOut}>
				<Octicons name='sign-out' size={24} color='black' />
			</TouchableOpacity>
		</SafeAreaView>
	);
}
