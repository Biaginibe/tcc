import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	FlatList,
	TextInput,
	SafeAreaView,
	KeyboardAvoidingView,
	Alert,
	ScrollView,
} from 'react-native';
import { css } from './style';
import { ListItem, CheckBox } from 'react-native-elements';
import { instance } from '../../../config/axios';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';
import { useAuth } from '../../../context/Auth';
import { TextInputMask } from 'react-native-masked-text';

export default function Psychologistschedule() {
	const [modalVisibleAdd, setmodalVisibleAdd] = useState(false);
	const [modalVisibleUpdate, setmodalVisibleUpdate] = useState(false);
	const [schedule, setSchedule] = useState(null);
	const [check, setCheck] = useState(null);
	const [add, setAdd] = useState(null);
	const [update, setUpdate] = useState(null);
	const [delet, setDelete] = useState(null); //não usei delete por ser palavra reservada

	const { token, user } = useAuth();

	const [findOne, setFindOne] = useState(null);
	const [oneSchedule, setOneSchedule] = useState([
		{ diaDisponivel: '', horarioDisponivel: '' },
	]);

	const [dia, setDia] = useState(null);
	const [horario, setHorario] = useState(null);

	const toggleModal = () => {
		setmodalVisibleAdd(false);
		setmodalVisibleUpdate(false);
		setFindOne(null);
	};

	function pressCheck(id) {
		setCheck(id);
	}

	function pressDelete(id) {
		setDelete(id);
	}

	function pressAdd() {
		if (dia != null && horario != null) {
			setmodalVisibleAdd(false);
			setAdd(true);
		} else {
			alert(
				'É necessário preencher o dia e o horario disponiveis para adicionar um horário.'
			);
		}
	}

	function addSchedule() {
		setmodalVisibleAdd(true);
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
			.then(() =>
				Alert.alert('Paciente notificado, aguarde contato dele')
			)
			.catch(() =>
				Alert.alert(
					'Erro no servidor, tente novamente em alguns instantes'
				)
			);
	}

	function pressUpdate() {
		setUpdate(true);
		setmodalVisibleUpdate(false);
	}

	function updateSchedule(id) {
		setFindOne(id);
		setmodalVisibleUpdate(true);
	}

	useEffect(() => {
		async function getSchedule() {
			try {
				if (check != null) {
					try {
						await instance.put(
							`/psychologist/${user.id}/${check}/disable_enableSchedule`,
							{
								headers: {
									Authorization: 'Bearer ' + token,
								},
							}
						);
						setCheck(null);
					} catch (err) {
						console.error(err);
					}
				}

				if (add != null) {
					try {
						await instance.post(
							`/psychologist/${
								user.id
							}/createSchedule?diaDisponivel=${dia}&horarioDisponivel=${horario}&disponivel=${true}`,
							{
								headers: {
									Authorization: 'Bearer ' + token,
								},
							}
						);
						setAdd(null);
						setHorario(null);
						setDia(null);
					} catch (err) {
						console.error(err);
					}
				}
				if (update != null) {
					try {
						await instance.put(
							`/psychologist/${user.id}/${findOne}/updateSchedule?diaDisponivel=${dia}&horarioDisponivel=${horario}`,
							{
								headers: {
									Authorization: 'Bearer ' + token,
								},
							}
						);
						setUpdate(null);
						setHorario(null);
						setDia(null);
						setFindOne(null);
					} catch (err) {
						console.error(err);
					}
				}

				if (delet != null) {
					try {
						await instance.delete(
							`/psychologist/${user.id}/${delet}/deleteSchedule`,
							{
								headers: {
									Authorization: 'Bearer ' + token,
								},
							}
						);
						setDelete(null);
					} catch (err) {
						console.error(err);
					}
				}
				const { data } = await instance.get(
					`/psychologist/${user.id}/findSchedule`,
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
				);
				setSchedule(data);
			} catch (err) {
				console.error(err);
			}
		}
		getSchedule();
	}, [check, delet, add, update]);

	useEffect(() => {
		async function getOneSchedule() {
			try {
				if (findOne != null) {
					const { data } = await instance.get(
						`/psychologist/1/findOneSchedule?id=${findOne}`,
						{
							headers: {
								Authorization: 'Bearer ' + token,
							},
						}
					);
					setOneSchedule(data);

					oneSchedule.map(
						(item, id) => (
							setDia(item.diaDisponivel),
							setHorario(item.horarioDisponivel)
						)
					);
				}
			} catch (err) {
				console.error(err);
			}
		}
		getOneSchedule();
	}, [findOne]);

	return (
		<>
			<ScrollView>
				<View style={{ display: 'flex' }}>
					<FlatList
						data={schedule}
						keyExtractor={(item) => String(item.id)}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => updateSchedule(item.id)}
							>
								<ListItem bottomDivider style={css.container}>
									<ListItem.Content>
										<View style={css.text}>
											<ListItem.Title style={css.dia}>
												{item.diaDisponivel}
											</ListItem.Title>

											<ListItem.Title>
												{'Horario: ' +
													item.horarioDisponivel}
											</ListItem.Title>
										</View>

										<View style={css.checkbox}>
											<CheckBox
												color='#053260'
												center
												title='Disponivel'
												onPress={() =>
													pressCheck(item.id)
												}
												checked={item.disponivel}
											/>
										</View>
										<TouchableOpacity
											style={css.trash}
											onPress={() => pressDelete(item.id)}
										>
											<Ionicons
												name='md-trash-sharp'
												size={24}
												color='#970000'
											/>
										</TouchableOpacity>
									</ListItem.Content>
								</ListItem>
							</TouchableOpacity>
						)}
					/>
					<TouchableOpacity onPress={addSchedule}>
						<View style={css.btnAdd}>
							<Entypo name='plus' size={24} color='green' />
							<Text style={css.textAdd}>Adicionar horario</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={callTheNext}>
						<View style={css.btnCallNext}>
							<Text style={css.txtCallNext}>
								Chamar proximo da fila
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>

			{/* MODAL ADD */}

			<Modal
				style={{ flex: 1 }}
				animationType='slide'
				transparent={true}
				isVisible={modalVisibleAdd}
				swipeDirection='up'
				onSwipeComplete={() => {
					setmodalVisibleAdd(false);
				}}
				onRequestClose={() => {
					Alert.alert('Você saiu sem salvar o horário efetivamente!');
					setmodalVisibleAdd(false);
				}}
				coverScreen={false}
			>
				<KeyboardAvoidingView>
					<SafeAreaView style={css.modal}>
						<View>
							<Text style={css.label}>Dia</Text>
							<View style={{ marginBottom: 15, padding: 10 }}>
								<View style={css.radio}>
									<RadioButton
										color='#053260'
										value='Segunda'
										status={
											dia === 'Segunda'
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setDia('Segunda')}
									/>
									<Text style={css.textRadio}>Segunda</Text>
								</View>

								<View style={css.radio}>
									<RadioButton
										color='#053260'
										value='Terça'
										status={
											dia === 'Terça'
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setDia('Terça')}
									/>
									<Text style={css.textRadio}>Terça</Text>
								</View>

								<View style={css.radio}>
									<RadioButton
										color='#053260'
										value='Quarta'
										status={
											dia === 'Quarta'
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setDia('Quarta')}
									/>
									<Text style={css.textRadio}>Quarta</Text>
								</View>

								<View style={css.radio}>
									<RadioButton
										color='#053260'
										value='Quinta'
										status={
											dia === 'Quinta'
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setDia('Quinta')}
									/>
									<Text style={css.textRadio}>Quinta</Text>
								</View>

								<View style={css.radio}>
									<RadioButton
										color='#053260'
										value='Sexta'
										status={
											dia === 'Sexta'
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setDia('Sexta')}
									/>
									<Text style={css.textRadio}>Sexta</Text>
								</View>

								<View style={css.radio}>
									<RadioButton
										color='#053260'
										value='Sabado'
										status={
											dia === 'Sabado'
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setDia('Sabado')}
									/>
									<Text style={css.textRadio}>Sábado</Text>
								</View>

								<View style={css.radio}>
									<RadioButton
										color='#053260'
										value='Domingo'
										status={
											dia === 'Domingo'
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setDia('Domingo')}
									/>
									<Text style={css.textRadio}>Domingo</Text>
								</View>
							</View>
							<Text style={css.label}>Horário</Text>
							<KeyboardAvoidingView>
								<View>
									<TextInputMask
										type={'datetime'}
										options={{
											format: 'HH:mm',
										}}
										style={css.input}
										onChangeText={setHorario}
										value={horario}
										placeholder='Ex: 15:00'
									/>
								</View>
							</KeyboardAvoidingView>
						</View>
						<View style={css.inline}>
							<TouchableOpacity
								style={css.botao}
								onPress={pressAdd}
							>
								<Text style={css.textModal}>
									Adicionar horario
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={css.botaoCancelar}
								onPress={toggleModal}
							>
								<Text style={css.textModal}>Cancelar</Text>
							</TouchableOpacity>
						</View>
					</SafeAreaView>
				</KeyboardAvoidingView>
			</Modal>

			{/* MODAL UPDATE */}
			<Modal
				style={{ flex: 1 }}
				animationType='slide'
				transparent={true}
				isVisible={modalVisibleUpdate}
				swipeDirection='up'
				onSwipeComplete={() => {
					setmodalVisibleUpdate(false);
				}}
				onRequestClose={() => {
					alert('Você não salvou suas alterações!');
					setmodalVisibleUpdate(false);
				}}
				coverScreen={false}
			>
				<KeyboardAvoidingView>
					<SafeAreaView style={css.modal}>
						<View>
							<Text style={css.label}>Dia</Text>
							<View style={{ marginBottom: 15, padding: 10 }}>
								<View style={css.radio}>
									<RadioButton
										color='#053260'
										value='Segunda'
										status={
											dia === 'Segunda'
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setDia('Segunda')}
									/>
									<Text style={css.textRadio}>Segunda</Text>
								</View>

								<View style={css.radio}>
									<RadioButton
										color='#053260'
										value='Terça'
										status={
											dia === 'Terça'
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setDia('Terça')}
									/>
									<Text style={css.textRadio}>Terça</Text>
								</View>

								<View style={css.radio}>
									<RadioButton
										color='#053260'
										value='Quarta'
										status={
											dia === 'Quarta'
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setDia('Quarta')}
									/>
									<Text style={css.textRadio}>Quarta</Text>
								</View>

								<View style={css.radio}>
									<RadioButton
										color='#053260'
										value='Quinta'
										status={
											dia === 'Quinta'
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setDia('Quinta')}
									/>
									<Text style={css.textRadio}>Quinta</Text>
								</View>

								<View style={css.radio}>
									<RadioButton
										color='#053260'
										value='Sexta'
										status={
											dia === 'Sexta'
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setDia('Sexta')}
									/>
									<Text style={css.textRadio}>Sexta</Text>
								</View>

								<View style={css.radio}>
									<RadioButton
										color='#053260'
										value='Sabado'
										status={
											dia === 'Sabado'
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setDia('Sabado')}
									/>
									<Text style={css.textRadio}>Sábado</Text>
								</View>

								<View style={css.radio}>
									<RadioButton
										color='#053260'
										value='Domingo'
										status={
											dia === 'Domingo'
												? 'checked'
												: 'unchecked'
										}
										onPress={() => setDia('Domingo')}
									/>
									<Text style={css.textRadio}>Domingo</Text>
								</View>
							</View>
							<Text style={css.label}>Horário</Text>
							<View>
								<TextInputMask
									type={'datetime'}
									options={{
										format: 'HH:mm',
									}}
									style={css.input}
									onChangeText={setHorario}
									value={horario}
								/>
							</View>
						</View>
						<View style={css.inline}>
							<TouchableOpacity
								style={css.botao}
								onPress={pressUpdate}
							>
								<Text style={css.textModal}>Salvar</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={css.botaoCancelar}
								onPress={toggleModal}
							>
								<Text style={css.textModal}>Cancelar</Text>
							</TouchableOpacity>
						</View>
					</SafeAreaView>
				</KeyboardAvoidingView>
			</Modal>
		</>
	);
}
