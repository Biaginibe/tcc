import React, { useState, useEffect } from 'react';
import {
	View,
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import { css } from './style';

export default function Login() {
	const [login, setLogin] = useState(null);
	const [pass, setPass] = useState(null);
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
			</View>
		</KeyboardAvoidingView>
	);
}
