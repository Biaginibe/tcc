import React, { useState, useEffect } from 'react';
import {
	View,
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { css } from './style';

export default function RegisterUser() {
	const [name, setName] = useState('');
	const [perfil, setPerfil] = useState('');
	const [cpf, setCpf] = useState('');
	const [pass, setPass] = useState('');
	const [pass2, setPass2] = useState('');
	const [email, setEmail] = useState('');
	const [idade, setIdade] = useState('');

	return (
		<KeyboardAvoidingView style={css.container}>
			<View>
				<Text style={css.title}>SendHelp</Text>
				<Text style={css.subTitle}>Registro</Text>
				<Text>Deseja criar perfil como:</Text>
                <Picker
					selectedValue={perfil}
					style={css.input}
					onValueChange={(itemValue, itemIndex) =>
						setPerfil(itemValue)
					}
				>
					<Picker.Item label='Selecione' value={''} />
					<Picker.Item label='Paciente' value='paciente' />
					<Picker.Item
						label='Psicologo'
						value='psicologo'
					/>
				</Picker>
				<TextInput
					style={css.input}
					onChangeText={setName}
					value={name}
					placeholder='Nome completo'
				/>
				<TextInput
					style={css.input}
					onChangeText={setCpf}
					value={cpf}
					placeholder='CPF'
				/>
				<TextInput
					style={css.input}
					onChangeText={setPass}
					value={pass}
					placeholder='Senha'
				/>
				<TextInput
					style={css.input}
					onChangeText={setPass2}
					value={pass2}
					placeholder='Confirmar senha'
				/>
				<TextInput
					style={css.input}
					onChangeText={setEmail}
					value={email}
					placeholder='Email'
				/>
				<TextInput
					style={css.input}
					onChangeText={setIdade}
					value={idade}
					placeholder='Idade'
				/>
				<TouchableOpacity
					style={css.btn}
					onPress={() => {
						console.log('entrei');
					}}
				>
					<Text style={css.btnTxt}>Prosseguir</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}
