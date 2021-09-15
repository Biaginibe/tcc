import React, { useState } from 'react';
import {
	View,
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/Auth';
import { instance } from '../../../config/axios';
import { TextInputMask } from 'react-native-masked-text';

import { css } from './style';

export default function RegisterUser() {
	const [name, setName] = useState('');
	const [perfil, setPerfil] = useState('');
	const [cpf, setCpf] = useState('');
	const [pass, setPass] = useState('');
	const [pass2, setPass2] = useState('');
	const [email, setEmail] = useState('');
	const [idade, setIdade] = useState('');
	const [genero, setGenero] = useState('');
	const { navigate } = useNavigation();
	const { setUser, setType } = useAuth();

	async function registrarUsuario() {
		const { data } = await instance.post(`/admin/createUser`, {
			cpf: cpf,
			nome: name,
			ativo: true,
			senha: pass,
			perfil: perfil,
			idade: idade,
			email: email,
			genero: genero,
		});

		console.log(data);
		setUser(data.user);
		setType(data.user.perfil);
		Alert.alert('Dados registrados com sucesso! Vamos prosseguir.');
		navigate('RegisterClient');
	}

	return (
		<KeyboardAvoidingView style={css.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
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
						<Picker.Item label='Psicologo' value='psicologo' />
					</Picker>
					<TextInput
						style={css.input}
						onChangeText={setName}
						value={name}
						placeholder='Nome completo'
					/>
					<TextInputMask
						type={'cpf'}
						style={css.input}
						onChangeText={setCpf}
						value={cpf}
						placeholder='CPF'
						keyboardType='numeric'
					/>
					<TextInput
						style={css.input}
						onChangeText={setPass}
						value={pass}
						secureTextEntry={true}
						placeholder='Senha'
					/>
					{/* <TextInput
					style={css.input}
					onChangeText={setPass2}
					value={pass2}
					placeholder='Confirmar senha'
				/> */}
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
						keyboardType='numeric'
					/>
					<View style={css.radio}>
						<RadioButton
							color='#053260'
							value='Feminino'
							status={
								genero === 'Feminino' ? 'checked' : 'unchecked'
							}
							onPress={() => setGenero('Feminino')}
						/>
						<Text style={css.textRadio}>Feminino</Text>
					</View>
					<View style={css.radio}>
						<RadioButton
							color='#053260'
							value='Masculino'
							status={
								genero === 'Masculino' ? 'checked' : 'unchecked'
							}
							onPress={() => setGenero('Masculino')}
						/>
						<Text style={css.textRadio}>Masculino</Text>
					</View>
					<View style={css.radio}>
						<RadioButton
							color='#053260'
							value='NB'
							status={genero === 'NB' ? 'checked' : 'unchecked'}
							onPress={() => setGenero('NB')}
						/>
						<Text style={css.textRadio}>Não Binario</Text>
					</View>

					<TouchableOpacity
						style={css.btn}
						onPress={registrarUsuario}
					>
						<Text style={css.btnTxt}>Prosseguir</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
