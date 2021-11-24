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

import { CheckBox } from 'react-native-elements';

import { useAuth } from '../../../context/Auth';
import { instance } from '../../../config/axios';

import { css } from './style';

export default function Queue() {
	const { token, psychologist, user, setPsychologist } = useAuth();

	const [size, setSize] = useState(0);
	const [names, setNames] = useState(null);
	const [check, setCheck] = useState(psychologist.fila);

	const [run, setRun] = useState(true);

	async function pressCheck() {
		try {
			const tempdata = await instance.post(
				'/psychologist/disable_enableQueue',
				{
					id_psico: psychologist.id,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);
			setCheck(tempdata.data);
		} catch (error) {
			Alert.alert(error.response.data.error);
		}
	}

	async function callTheNext() {
		await instance
			.post(
				`/psychologist/callNext`,
				{
					id_user: user.id,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			)
			.then(() => {
				Alert.alert('Paciente notificado, aguarde contato dele');
				setSize(size - 1);
				let arr = names;
				arr.shift();
				setNames(arr)
			})
			.catch((error) => {
				console.log();
				Alert.alert(error.response.data.error);
			});
	}

	useEffect(() => {
		async function count() {
			const count = await instance.post(
				'/psychologist/countQueue',
				{
					id_psico: psychologist.id,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);
			setSize(count.data);
			const names = await instance.post(
				'/psychologist/listNames',
				{
					id_psico: psychologist.id,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);
			console.log(names.data);
			setNames(names.data);
		}
		count();
	}, [size, run]);

	return (
		<SafeAreaView style={css.container}>
		
			<Text style={css.title}>Gerenciamento de fila</Text>
			<View style={css.check}>
				<Text style={{ width: '60%', fontSize: 16 }}>
					Deseja disponibilizar uma fila no caso de acabarem seus
					horários?
				</Text>
				<CheckBox
					containerStyle={{
						backgroundColor: '#F9f9f9',
						width: '10%',
					}}
					checkedColor='#053260'
					onPress={pressCheck}
					checked={check}
				/>
			</View>
			<Text style={css.txt}>Número de pessoas na fila: {size}</Text>
			<View style={css.list}>{names && names.map((item, index) => <Text style={css.txtList}>{index + 1 + ' -    ' + item}</Text>)}</View>
			<TouchableOpacity onPress={callTheNext}>
				<View style={css.btnCallNext}>
					<Text style={css.txtCallNext}>Chamar proximo da fila</Text>
				</View>
			</TouchableOpacity>
			{/* <TouchableOpacity onPress={()=>setRun(!run)}>
				<View style={css.btnCallNext}>
					<Text style={css.txtCallNext}>RODARODA</Text>
				</View>
			</TouchableOpacity> */}
			
		</SafeAreaView>
	);
}
