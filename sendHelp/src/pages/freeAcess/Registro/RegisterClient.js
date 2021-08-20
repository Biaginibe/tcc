import React, { useState, useEffect } from 'react';
import {
	View,
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert,
} from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { RadioButton } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import { useAuth } from '../../../context/Auth';
// import { instance } from '../../../config/axios';


import { css } from './style';

export default function RegisterClient() {
	// const [name, setName] = useState('');
	// const [perfil, setPerfil] = useState('');
	// const [cpf, setCpf] = useState('');
	// const [pass, setPass] = useState('');
	// const [pass2, setPass2] = useState('');
	// const [email, setEmail] = useState('');
	// const [idade, setIdade] = useState('');
	// const [genero, setGenero] = useState('');
	// const { navigate } = useNavigation();
	// const {setUser, setToken, setType} = useAuth();



		// async function registrarUsuario() {
		// 	const { data } = await instance.post(`/admin/createUser`, {
		// 		cpf: cpf,
		// 		nome: name,
		// 		ativo: true,
		// 		senha: pass,
		// 		perfil: perfil,
		// 		idade: idade,
		// 		email: email,
		// 		genero: genero,
		// 	});

		// 	console.log(data);
		// 	setUser(data.user);
		// 	setType(data.type);
		// 	setToken(data.type);
		// 	Alert.alert('Dados registrados com sucesso! Vamos prosseguir.')
		// 	// navigate('Register')
		// }

	return (
		<KeyboardAvoidingView style={css.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View>
					<Text style={css.title}>SendHelp</Text>
					<Text style={css.subTitle}>Registro Cliente</Text>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
