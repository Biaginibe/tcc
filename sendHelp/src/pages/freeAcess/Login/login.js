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
import { useAuth } from '../../../context/Auth' 
import { instance } from '../../../config/axios';

export default function Login() {
	const [cpf, setCpf] = useState(null);
	const [pass, setPass] = useState(null);
	const { signIn } = useAuth();
	const {navigate} = useNavigation(); 

	async function login(){
		console.log(cpf)
		console.log(pass)		
		await instance.post('/login', {
			cpf: cpf,
			pass: pass
		}).then((response) => console.log(response.data)) 
		.then((response) => signIn(response.data))
		.catch((err)=>{
			//setPass('');
			Alert.alert('Aviso!', 'CPF ou senha incorreto.');
			console.log(err)
		})
	}

	return (
		<KeyboardAvoidingView style={css.container}>
			<View>
				<Text style={css.title}>SendHelp</Text>
				<View>
					<TextInput
						style={css.input}
						onChangeText={setCpf}
						value={cpf}
						placeholder='CPF'
					/>
				</View>
				<View>
					<TextInput
						style={css.input}
						onChangeText={setPass}
						value={pass}
						placeholder='Senha'
					/>
				</View>
				<TouchableOpacity style={css.btn} onPress={login}>
					<Text style={css.btnTxt}>Entrar</Text>
				</TouchableOpacity>
				<TouchableOpacity style={css.inline}>
					<Text>Não tem cadastro ainda? </Text>
					<Text  style={css.cadastro} onPress={()=>navigate('RegisterUser')}>Clique aqui.</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}
