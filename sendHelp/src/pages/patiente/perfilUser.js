import React, {useState} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { instance } from '../../config/axios';
import { css } from '../../css/style';

export default function ProfileUser(){
	
	return (
		
		<View style={css.container}>
			<Text>{'Perfil do Usuário'}</Text>

		</View>
	);
}
