import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
	Alert,
	Button,
} from 'react-native';
import { css } from './style';
import { instance } from '../../../config/axios';
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/Auth';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

export default function editaPacienteProfile(navigation) {
	const { token, user, signOut, setUser } = useAuth();
	const { navigate } = useNavigation();
	const [perfil, setPerfil] = useState(user);
	const [nome, setNome] = useState(user.nome);
	const [email, setEmail] = useState(user.email);
	const [idade, setIdade] = useState(user.idade);
	const [senha, setSenha] = useState(user.senha);
	const [update, setUpdate] = useState(null);

	function handleNavigate() {
		navigate('PerfilPaciente');
	}
	function handleUpdate() {
		setUser({
			...user,
			nome: nome,
			idade: idade,
			email: email,
			senha: senha,
		});
		console.log(user, token);
		setUpdate(true);
		handleNavigate();
	}

	useEffect(() => {
		async function getData() {
			try {
				const valorrequest = user.id;
				if (update != null) {
					try {
						console.log('Entrou no IF');
						await instance.put(
							`/patientes/${valorrequest}/updatePatientes?nome=${nome}&idade=${idade}&email=${email}&senha=${senha}`,
							{
								headers: {
									Authorization: 'Bearer ' + token,
								},
							}
						);

						setUpdate(null);
					} catch {
						console.error(err);
					}
				}
				const perfildata = await instance.get(
					`/patientes/${valorrequest}}/findOnebyIDPatientes`,
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
				);

				setPerfil(perfildata.data);
				// console.log(perfil);
			} catch (err) {
				console.log(err);
			}
		}
		getData();
	}, [update]);

	console.log(perfil.nome);

	return (
		<View style={css.container}>
			<SafeAreaView style={css.containerLateral}>
				<ScrollView>
					<View style={css.borderInput}>
						<TextInput
              style={css.input}
							value={nome}
							onChangeText={(e) => setNome(e)}
              placeholder='Nome'
              ></TextInput>
					</View>
					<View style={css.borderInput}>
						<TextInput
              style={css.input}
							value={email}
							onChangeText={(e) => setEmail(e)}
							placeholder='Email'
              ></TextInput>
					</View>
					<View style={css.borderInput}>
						<TextInput
              style={css.input}
							value={String(idade)}
							onChangeText={(e) => setIdade(e)}
							placeholder='Idade'
						></TextInput>
					</View>
				<TouchableOpacity onPress={handleUpdate}>
					<View style={css.btnSave}>
						<Text style={css.txtSave}>Salvar</Text>
					</View>
				</TouchableOpacity>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}
