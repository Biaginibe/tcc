import React, { useState, useEffect } from 'react';
import {
	View,
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	TextInput,
	Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { css } from './style';
import { useAuth } from '../../../context/Auth';
import { instance } from '../../../config/axios';
import { TextInputMask } from 'react-native-masked-text'

export default function Login() {
	const [cpf, setCpf] = useState(null);
	const [pass, setPass] = useState(null);
	const { signIn } = useAuth();
	const { navigate } = useNavigation();

	async function login() {
		await instance
			.post('/login', {
				cpf: cpf,
				pass: pass,
			})
			.then((response) => signIn(response.data))
			.catch((err) => {
				setPass('');
				Alert.alert('Aviso!', 'CPF ou senha incorreto.');
				console.log(err);
			});
	}

	return (
		<KeyboardAvoidingView style={css.container}>
			<View>
				<Text style={css.title}>SendHelp</Text>
				<View>
					<TextInputMask
						type={'cpf'}
						style={css.input}
						onChangeText={setCpf}
						value={cpf}
						placeholder='CPF'
						keyboardType='numeric'

					/>
				</View>
				<View>
					<TextInput
						style={css.input}
						onChangeText={setPass}
						value={pass}
						placeholder='Senha'
						secureTextEntry={true}
						
					/>
				</View>
				<TouchableOpacity style={css.btn} onPress={login}>
					<Text style={css.btnTxt}>Entrar</Text>
				</TouchableOpacity>
				<TouchableOpacity style={css.inline}>
					<Text>Não tem cadastro ainda? </Text>
					<Text
						style={css.cadastro}
						onPress={() => navigate('RegisterUser')}
					>
						Clique aqui.
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}
