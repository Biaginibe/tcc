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
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';

import { css } from './style';
import { instance } from '../../../config/axios';
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/Auth';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import SwitchSelector from 'react-native-switch-selector';

export default function changePassword(navigation) {
	const { token, user, signOut, setUser, psychologist, setPsychologist } =
		useAuth();
	const { navigate } = useNavigation();

	const [senha, setSenha] = useState('');
	const [novaSenha, setNovaSenha] = useState('');

	function handleNavigate() {
		navigate('PerfilPsicologo');
	}

	async function handleUpdate() {
		const valorrequest = user.id;
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
                Alert.alert('Senha atualizada com sucesso!')
                handleNavigate();
			} catch (err) {
				Alert.alert(err.response.data.error);
				console.error(err);
			}
		} else if (
			(senha !== '' && novaSenha === '') ||
			(senha === '' && novaSenha !== '')
		) {
			Alert.alert(
				'É necessario informar os dois campos para alterar a senha.'
			);
			navigate('MudarSenha');
		}else{
            Alert.alert('É necessario preencher os campos.')
        }
	}

	return (
		<View style={css.container}>
			<View style={css.containerChangePass}>
				<View style={css.borderInputPass}>
					<TextInput
						style={css.input}
						value={senha}
						onChangeText={(e) => setSenha(e)}
						placeholder='Senha atual'
						secureTextEntry={true}
					></TextInput>
				</View>
				<View style={css.borderInputPass}>
					<TextInput
						style={css.input}
						value={novaSenha}
						onChangeText={(e) => setNovaSenha(e)}
						placeholder='Nova senha'
						secureTextEntry={true}
					></TextInput>
				</View>

				<TouchableOpacity onPress={handleUpdate}>
					<View style={css.btnSavePass}>
						<Text style={css.txtSave}>Salvar</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}
