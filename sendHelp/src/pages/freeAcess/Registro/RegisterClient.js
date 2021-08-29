import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import {
	View,
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
		<View style={css.container}>
			<Text style={css.title}>SendHelp</Text>
			<Text style={css.subTitle}>Registro Cliente</Text>
			<View style={{width: '100%', alignSelf: 'center', flex: 1, marginTop: 10}}>
				<GooglePlacesAutocomplete
					placeholder='Seu endereço ou consultorio'
					onPress={(data, details) => {
						// 'details' is provided when fetchDetails = true
						console.log('CLIQUEI');
						console.log(data, details);
					}}
					query={{
						key: 'AIzaSyCIpl95k29LzkMdt2wgb8eWSPLsQbkiBfg',
						language: 'pt-br',
					}}
				/>
			</View>
		</View>
	);
}
