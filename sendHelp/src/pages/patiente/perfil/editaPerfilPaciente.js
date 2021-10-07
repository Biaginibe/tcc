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
	const [senha, setSenha] = useState('');
	const [novaSenha, setNovaSenha] = useState('');
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
		});
		// console.log(user, token);
		setUpdate(true);
		handleNavigate();
	}

	useEffect(() => {
		async function getData() {
			try {
				const valorrequest = user.id;
				if (update != null) {
					try {
						await instance.put(
							`/patientes/${valorrequest}/updatePatientes?nome=${nome}&idade=${idade}&email=${email}`,
							{
								headers: {
									Authorization: 'Bearer ' + token,
								},
							}
						);

						setUpdate(null);
					} catch (err) {
						console.error(err);
					}

					if (senha !== '' && novaSenha !== '') {
						try {
							await instance.put(
								`/patientes/${valorrequest}/updatePatientesPassword`,
								{ senha: senha, novaSenha: novaSenha },
								{
									headers: {
										Authorization: 'Bearer ' + token,
									},
								}
							);
						} catch (err) {
							Alert.alert('Senha atual incorreta.');
							console.error(err);
						}
					}  else if((senha !== '' && novaSenha === '') || (senha === '' && novaSenha !== '')) {
						Alert.alert(
							'É necessario informar os dois campos para alterar a senha.'
						);
						navigate('EditarPaciente');
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
				console.log('AQUI?');
				console.error(err);
			}
		}
		getData();
	}, [update]);

	// console.log(perfil.nome);

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
					<View style={css.borderInput}>
						<TextInput
							style={css.input}
							value={senha}
							onChangeText={(e) => setSenha(e)}
							placeholder='Senha atual'
							secureTextEntry={true}
						></TextInput>
					</View>
					<View style={css.borderInput}>
						<TextInput
							style={css.input}
							value={novaSenha}
							onChangeText={(e) => setNovaSenha(e)}
							placeholder='Nova senha'
							secureTextEntry={true}
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
