import React, { useState, useEffect } from 'react';
import {
	View,
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { css } from './style';
import RegisterUser from '../Registro/RegisterUser';

export default function Login({navigation}) {
	const [login, setLogin] = useState(null);
	const [pass, setPass] = useState(null);

	const {navigate} = useNavigation(); 

	return (
		<KeyboardAvoidingView style={css.container}>
			<View>
				<Text style={css.title}>SendHelp</Text>
				<View>
					<TextInput
						style={css.input}
						onChangeText={setLogin}
						value={login}
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
				<TouchableOpacity style={css.btn} onPress={()=>{console.log('entrei')}}>
					<Text style={css.btnTxt}>Entrar</Text>
				</TouchableOpacity>
				<TouchableOpacity style={css.inline} onPress={()=> navigation.navigate('../Registro/RegisterUser.js')}>
					<Text>Não tem cadastro ainda? </Text>
					<Text  style={css.cadastro} onPress={()=>navigate('RegisterUser')}>Clique aqui.</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}
