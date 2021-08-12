import React, {useState} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { instance } from '../../config/axios';
import { css } from '../../css/style';

export default function ProfileUser(){
	const [info, setInfo] = useState(null);
	const teste = 1; 
	async function getProfile(){
		const data = await instance.get(`Psychologist/${teste}/findPsychologistsjoinUsers`);
		console.log('teste'+ data);
		setInfo(data)
		
	}
	return (
		
		<View style={css.container}>
			<Text>{'Perfil do Usuário' + console.log(info)}</Text>

		</View>
	);
}
