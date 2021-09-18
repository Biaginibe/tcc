import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/Auth';
import { useNavigation } from '@react-navigation/native';
import { instance } from '../../../config/axios';
import { css } from './style';

export default function PsychologistProfile() {
	const { token, user, signOut, psychologist } = useAuth();
	const { navigate } = useNavigation();
	const [perfil, setPerfil] = useState([]);
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
				setPerfil(perfildata.data);
			} catch (err) {
				console.log(err);
			}
		}
		getData();
	}, []);

	return (
		<SafeAreaView style={css.container}>
			<ScrollView>
				<View style={css.inline}>
					<Text style={css.name}>{user.nome}</Text>
					<TouchableOpacity
						onPress={(e) => {
							navigate('EditarPsichologist');
						}}
					>
						<Octicons name='pencil' size={24} color='gray' />
					</TouchableOpacity>
				</View>
				<Text style={css.info}>{user.idade} anos</Text>
				<Text style={css.info}>{user.email}</Text>
				<Text style={css.info}>{user.cpf}</Text>
				{psychologist.valorConsulta ? (
					<Text style={css.info}>
						Valor da Consulta: {psychologist.valorConsulta}
					</Text>
				) : (
					<Text style={css.infoNull}>
						Registre a faixa de valor da sua consulta
					</Text>
				)}
				{psychologist.metodologia ? (
					<Text style={css.info}>
						Metodologia: {psychologist.metodologia}
					</Text>
				) : (
					<Text style={css.infoNull}>
						Registre a metodologia que você trabalha
					</Text>
				)}
				{psychologist.tempoSessao ? (
					<Text style={css.info}>
						{psychologist.tempoSessao} por sessão
					</Text>
				) : (
					<Text style={css.infoNull}>
						Registre a duração de cada sessão
					</Text>
				)}
				{psychologist.tipoAtendimento ? (
					<Text style={css.info}>
						Atendimento {psychologist.tipoAtendimento}
					</Text>
				) : (
					<Text style={css.infoNull}>
						Registre o tipo do de atendimento (online/ remoto)
					</Text>
				)}
				{psychologist.prefFaixaEtaria ? (
					<Text style={css.info}>
						Atende a faixa de {psychologist.prefFaixaEtaria}
					</Text>
				) : (
					<Text style={css.infoNull}>
						Registre a faixa etaria que você atende
					</Text>
				)}
				{psychologist.crp ? (
					<Text style={css.info}>CRP {psychologist.crp}</Text>
				) : (
					<Text style={css.infoNull}>Registre o seu CRP</Text>
				)}
				<View>
					<Text style={css.info}>Descrição</Text>
					<View style={css.desc}>
						{psychologist.descricao ? (
							<Text> {psychologist.descricao}</Text>
						) : (
							<Text style={css.infoNull}>Registre sua descrição</Text>
						)}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
