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
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/Auth';
import { instance } from '../../../config/axios';

import { css } from './style';

export default function RegisterClient() {
	const [long, setLong] = useState(null);
	const [lat, setLat] = useState(null);
	const [endereco, setEndereco] = useState(null);
	const { navigate } = useNavigation();
	const { user, setToken, type, setPsychologist } = useAuth();

	async function registrarCliente() {
		if (lat != null && long != null && lat != '' && long != '') {
			const { data } = await instance.post(
				`/freeAccess/${user.id}/client`,
				{
					endereco: endereco,
					latitude: lat,
					longitude: long,
				}
			);

			setToken(data.token);
			if(type == 'psicologo')
				Alert.alert('Registre suas informações especificas na tela de perfil.')
			// let data2 = data.psychologist[0]
			setPsychologist(data.psychologist)
		}

		if (!data.token) {
			Alert.alert('Registro finalizado! Seja bem vinde.');
			type === 'paciente' ? navigate('Mapa') : navigate('Agenda');
		}else{
			Alert.alert('Algo deu errado, por favor tente novamente.')
		}
	}

	return (
		<SafeAreaView style={css.container}>
			<Text style={css.title}>SendHelp</Text>
			<Text style={css.subTitle}>Registro Cliente</Text>
			<View
				style={{
					width: '100%',
					alignSelf: 'center',
					position: 'absolute',
					top: '100%',
				}}
			>
				<GooglePlacesAutocomplete
					placeholder='Seu endereço ou consultorio'
					onPress={(data, details) => {
						setLat(details.geometry.location.lat);
						setLong(details.geometry.location.lng);
						setEndereco(details.formatted_address);
					}}
					query={{
						key: 'AIzaSyAXBQNlzrJL88x7MjnQnbtPCD-_9sIl2ug',
						language: 'pt-br',
					}}
					fetchDetails={true}
					onFail={(error) => console.error(error)}
				/>
			</View>
					
			<TouchableOpacity style={css.btn} onPress={registrarCliente}>
				<Text style={css.btnTxt}>Prosseguir</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
