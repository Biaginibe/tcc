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

export default function RegisterPsychologist() {
	// const [long, setLong] = useState(null);
	// const [lat, setLat] = useState(null);
	// const [endereco, setEndereco] = useState(null);
	// const { navigate } = useNavigation();
	// const { user, type } = useAuth();

	// async function registrarCliente() {
	// 	const { data } = await instance.post(`/freeAccess/${user.id}/client`, {
	// 		endereco: endereco,
	// 		let: lat,
	// 		long: long,
	// 		type: type
	// 	});

	// 	if( type === 'psycologo'){
	// 	Alert.alert('Dados registrados com sucesso! Vamos prosseguir.')
	// 	navigate('RegisterPsychologist')
	// 	}else{
	// 		Alert.alert('Registro finalizado, agora é só fazer login!')
	// 		navigate('Login')
	// 	}
	// }

	return (
		<SafeAreaView style={css.container}>
			<Text style={css.title}>SendHelp</Text>
			<Text style={css.subTitle}>Registro psicologo</Text>
			
		</SafeAreaView>
	);
}
