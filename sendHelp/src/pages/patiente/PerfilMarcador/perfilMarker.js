import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	SafeAreaView,
	FlatList,
	ScrollView,
	StyleSheet,
	Alert,
	Linking,
	ActivityIndicator,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { css } from './style';
import { instance } from '../../../config/axios';
import { useAuth } from '../../../context/Auth';
import FlatSchedule from '../../../components/patiente/agendaPerfilMarker/Schedule';

export default function ProfileMarker(route, navigation) {
	const [perfil, setPerfil] = useState(null);

	const [segunda, setSegunda] = useState([]);
	const [terca, setTerca] = useState([]);
	const [quarta, setQuarta] = useState([]);
	const [quinta, setQuinta] = useState([]);
	const [sexta, setSexta] = useState([]);
	const [sabado, setSabado] = useState([]);
	const [domingo, setDomingo] = useState([]);

	const [hasQueue, setHasQueue] = useState(null);
	const [hasSchedule, setHasSchedule] = useState(null);
	const [position, setPosition] = useState(null);
	const [thatQueue, setThatQueue] = useState(null);
	const [enableQueue, setEnableQueue] = useState(null);
	const [sum, setSum] = useState(null);
	const [runAgain, setRunAgain] = useState(true);

	const [loading, setLoading] = useState(true);
	const [loading2, setLoading2] = useState(true);
	const [loading3, setLoading3] = useState(true);
	const [loading4, setLoading4] = useState(true);
	const [loading5, setLoading5] = useState(true);

	const { valorid } = route.route.params;
	const { token, user } = useAuth();

	async function callWhatsapp() {
		try {
			const phone = await instance.post(
				`/patiente/NumeroContato`,
				{
					id_psycho: valorid,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);
			Linking.openURL(
				`https://api.whatsapp.com/send?phone=55${phone.data.replace(
					/[^0-9]/g,
					''
				)}&text=Olá!%20Vi%20seu%20perfil%20no%20SendHelp%20e%20estou%20entrando%20em%20contato.%20Gostaria%20de%20falar%20sobre%20seu%20atendimento`
			);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		async function getData() {
			setLoading(true);
			try {
				const valorrequest = valorid;
				const perfildata = await instance.get(
					`/Psychologist/${valorrequest}/findPsychologistsjoinUsers`,
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
				);
				// console.log(perfildata.data);
				setPerfil(perfildata.data);
			} catch (err) {
				console.log(err);
			}
			try {
				const valorrequest = valorid;
				const scheduledata = await instance
					.get(
						`/psychologist/${valorrequest}/findAllbyWeekSchedules`,
						{
							headers: {
								Authorization: 'Bearer ' + token,
							},
						}
					)
					.then(setLoading(false));
				console.log(scheduledata.data.sum);
				setSegunda(scheduledata.data.scheduleSeg);
				setTerca(scheduledata.data.scheduleTer);
				setQuarta(scheduledata.data.scheduleQua);
				setQuinta(scheduledata.data.scheduleQui);
				setSexta(scheduledata.data.scheduleSex);
				setSabado(scheduledata.data.scheduleSab);
				setDomingo(scheduledata.data.scheduleDom);
				setSum(scheduledata.data.sum);
			} catch (err) {
				console.log(err);
			}
		}
		getData();
	}, [route.route.params]);

	useEffect(() => {
		async function Details() {
			setLoading2(true);
			setLoading3(true);
			setLoading4(true);
			setLoading5(true);
			const posFila = await instance
				.post(
					`/psychologist/position`,
					{ id_paciente: user.id },
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
				)
				.then(setLoading2(false));

			setPosition(posFila.data);
			console.log(position);
			const data = await instance
				.post(
					'/patiente/hasQueue',
					{
						id_paciente: user.id,
					},
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
				)
				.then(setLoading3(false));
			setHasQueue(data.data);
			const data2 = await instance
				.post(
					'/patiente/itsThatQueue',
					{
						id_paciente: user.id,
						id_psico: valorid,
					},
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
				)
				.then(setLoading4(false));
			setThatQueue(data2.data);
			const data3 = await instance
				.post(
					'/psychologist/checkQueue',
					{
						id_user: valorid,
					},
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
				)
				.then(setLoading5(false));
			// console.log('DATA3');
			// console.log(data3.data);
			setEnableQueue(data3.data);

			console.log('SOMA');
			console.log(sum);
			if (sum > 0) {
				setHasSchedule(true);
			} else {
				setHasSchedule(false);
			}
		}
		Details();
	}, [runAgain, sum, route.route.params]);

	async function onClickInsert() {
		if (hasQueue) {
			return Alert.alert(
				'Desculpe, não foi possivel de adicionar a está fila pois você já faz parte de uma.'
			);
		} else {
			await instance.post(
				'patiente/insertQueue',
				{
					id_paciente: user.id,
					id_psico: valorid,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);
			Alert.alert('Inserido na fila com sucesso');
			setRunAgain(!runAgain);
		}
	}

	async function onClickQuit() {
		await instance.post(
			'patiente/quitQueue',
			{
				id_paciente: user.id,
				id_psico: valorid,
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		);
		Alert.alert('Você saiu da fila com sucesso');
		setRunAgain(!runAgain);
	}
	console.log('\n\n');
	console.log(loading);
	console.log(loading2);
	console.log(loading3);
	console.log(loading4);
	console.log(loading5);
	console.log('\n\n');
	return (
		<SafeAreaView style={css.container }>
			{loading || loading2 || loading3 || loading4 || loading5 ? (
				<View style={{width: '100%', height: '100%', flex: 1, flexDirection: "row",
				justifyContent: "space-around",
				padding: '50%'}}>
					{/* <Text>Aqui um texto</Text> */}
					<ActivityIndicator size={65} color="#053165"/>
				</View>
			) : (
				<ScrollView>
					<View>
						<FlatList
							data={perfil}
							renderItem={({ item }) => (
								<View>
									<ListItem>
										<ListItem.Content>
											<View style={css.inline}>
												<ListItem.Title
													style={css.name}
												>
													{item.nome}
												</ListItem.Title>
												<ListItem.Title
													style={css.value}
												>
													{item.valorConsulta}
												</ListItem.Title>
											</View>
											<View style={css.infos}>
												<ListItem.Subtitle
													style={{
														fontSize: 16,
														marginBottom: '15%',
													}}
												>
													{item.tipoAtendimento}
												</ListItem.Subtitle>
												<ListItem.Title
													style={css.infoContent}
												>
													<Text
														style={
															css.infoContentTitle
														}
													>
														Idade:{' '}
													</Text>
													{item.idade}
												</ListItem.Title>
												<ListItem.Title
													style={css.infoContent}
												>
													<Text
														style={
															css.infoContentTitle
														}
													>
														Abordagem:{' '}
													</Text>
													{item.metodologia}
												</ListItem.Title>
												<ListItem.Title
													style={css.infoContent}
												>
													<Text
														style={
															css.infoContentTitle
														}
													>
														Faixa etária:{' '}
													</Text>
													{item.prefFaixaEtaria}
												</ListItem.Title>
												<ListItem.Title
													style={css.infoContent}
												>
													<Text
														style={
															css.infoContentTitle
														}
													>
														Tempo de Sessão:{' '}
													</Text>
													{'' + item.tempoSessao}
												</ListItem.Title>
												<ListItem.Title
													style={css.infoContent}
												>
													<Text
														style={
															css.infoContentTitle
														}
													>
														Endereço do consultorio:{' '}
													</Text>
													{'\n' + item.endereco[0]}
												</ListItem.Title>
												<Text
													style={css.infoContentTitle}
												>
													Descrição:{' '}
												</Text>
												<ListItem.Title
													style={css.infoContent}
												>
													{item.descricao}{' '}
												</ListItem.Title>
											</View>
										</ListItem.Content>
									</ListItem>
								</View>
							)}
						/>
						{(sum && hasSchedule) || position == 0 ? (
							<>
								<View style={css.btn}>
									<TouchableOpacity
										style={css.inline}
										onPress={callWhatsapp}
									>
										<Text style={css.btnTxt}>
											Entre em Contato
										</Text>

										<Ionicons
											style={css.btnZap}
											name='logo-whatsapp'
											size={24}
											color='white'
										></Ionicons>
									</TouchableOpacity>
								</View>
								{sum && hasSchedule ? (
									<View>
										<Text style={css.scheduleTitle}>
											Horarios Disponiveis
										</Text>
									</View>
								) : null}
								<View style={css.infoContent}>
									{segunda.length != 0 && segunda !== [] ? (
										<View>
											<Text style={css.scheduleSubtitle}>
												Segunda
											</Text>
										</View>
									) : null}
									<FlatSchedule data={segunda} />
									{terca.length != 0 && terca !== [] ? (
										<View>
											<Text style={css.scheduleSubtitle}>
												Terça
											</Text>
										</View>
									) : null}
									<FlatSchedule data={terca} />
									{quarta.length != 0 && quarta !== [] ? (
										<View>
											<Text style={css.scheduleSubtitle}>
												Quarta
											</Text>
										</View>
									) : null}
									<FlatSchedule data={quarta} />
									{quinta.length != 0 &&
									quinta.segunda !== [] ? (
										<View>
											<Text style={css.scheduleSubtitle}>
												Quinta
											</Text>
										</View>
									) : null}
									<FlatSchedule data={quinta} />
									{sexta.length != 0 && sexta !== [] ? (
										<View>
											<Text style={css.scheduleSubtitle}>
												Sexta
											</Text>
										</View>
									) : null}
									<FlatSchedule data={sexta} />
									{sabado.length != 0 && sabado !== [] ? (
										<View>
											<Text style={css.scheduleSubtitle}>
												Sabádo
											</Text>
										</View>
									) : null}
									<FlatSchedule data={sabado} />

									{domingo.length != 0 && domingo !== [] ? (
										<View>
											<Text style={css.scheduleSubtitle}>
												Domingo
											</Text>
										</View>
									) : null}
									<FlatSchedule data={domingo} />
								</View>
							</>
						) : enableQueue ? (
							<>
								{thatQueue ? (
									<View style={css.btnQuitQueue}>
										<TouchableOpacity onPress={onClickQuit}>
											<Text style={css.btnTxtQueue}>
												Sair da fila
											</Text>
										</TouchableOpacity>
									</View>
								) : (
									<View style={css.btnInsertQueue}>
										<TouchableOpacity
											onPress={onClickInsert}
										>
											<Text style={css.btnTxtQueue}>
												Entre na fila
											</Text>
										</TouchableOpacity>
									</View>
								)}
							</>
						) : (
							<Text style={css.grayText}>
								Este psicologo não possui fila
							</Text>
						)}
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
}
