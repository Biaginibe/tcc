import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { css } from '../../../css/style'; 
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/Auth'; 
import { useNavigation } from '@react-navigation/native';
import { instance } from "../../../config/axios";

export default function PsychologistProfile() {
	const { token, user, signOut, psychologist } = useAuth();
	const {navigate} = useNavigation();
	const [perfil, setPerfil] = useState([])
    //console.log(user);
	console.log("--------------------------");
	//console.log(perfil);
	console.log(psychologist);
	useEffect(() => {
		async function getData() {
		  try {
			const valorrequest = user.id;
			console.log(user.id);
			const perfildata = await instance.get(
				`/Psychologist/${user.id}}/findPsychologistsjoinUsers`,
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);
				//console.log(perfildata);
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
				<Text>CRP: {psychologist.crp}</Text>
				<Text>Valor da Consulta: {psychologist.valorConsulta}</Text>
				<Text>Numero de Contato: {psychologist.numeroContato}</Text>
				<Text>Metodologia: {psychologist.metodologia}</Text>
				<Text>Tempo de Sessão: {psychologist.tempoSessao}</Text>
				<Text>Tipo de Atendimento: {psychologist.tipoAtendimento}</Text>
				<Text>Preferência de Faixa Etária: {psychologist.prefFaixaEtaria}</Text>
				<Text>Descrição: {psychologist.descricao}</Text>
				
				
			</ScrollView>
			<TouchableOpacity onPress={(e)=>{navigate('EditarPsichologist')}}>
				<Octicons name='pencil' size={24} color='black' />
			</TouchableOpacity>
			
		</SafeAreaView>
	);
}
