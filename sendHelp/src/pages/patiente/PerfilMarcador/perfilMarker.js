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
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { css } from './style';
import { instance } from '../../../config/axios';
import { useAuth } from '../../../context/Auth';

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
	const [thatQueue, setThatQueue] = useState(null);
	const [runAgain, setRunAgain] = useState(true);

	const { valorid } = route.route.params;
	const { token, user } = useAuth();

	useEffect(() => {
		async function getData() {
			try {
				const valorrequest = valorid;
				const perfildata = await instance.get(
					`/Psychologist/${valorrequest}}/findPsychologistsjoinUsers`,
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
				);

				setPerfil(perfildata.data);
			} catch (err) {
				console.log(err);
			}
			try {
				const valorrequest = valorid;
				const scheduledata = await instance.get(
					`/psychologist/${valorrequest}}/findAllbyWeekSchedules`,
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
				);
				setSegunda(scheduledata.data.scheduleSeg);
				setTerca(scheduledata.data.scheduleTer);
				setQuarta(scheduledata.data.scheduleQua);
				setQuinta(scheduledata.data.scheduleQui);
				setSexta(scheduledata.data.scheduleSex);
				setSabado(scheduledata.data.scheduleSab);
				setDomingo(scheduledata.data.scheduleDom);
			} catch (err) {
				console.log(err);
			}
		}
		getData();
	}, [route.route.params]);

	useEffect(() => {
		async function Details() {
			const sum =
				segunda.length +
				terca.length +
				quarta.length +
				quinta.length +
				sexta.length +
				sabado.length +
				domingo.length;

			const data = await instance.post(
				'/patiente/hasQueue',
				{
					id_paciente: user.id,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);
			setHasQueue(data.data);

			const data2 = await instance.post(
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
			);
			setThatQueue(data2.data);

			if (sum > 0) {
				setHasSchedule(true);
			} else {
				setHasSchedule(false);
			}
		}
		Details();
	}, [segunda, terca, quarta, quinta, sexta, sabado, domingo, runAgain]);

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

	return (
		<SafeAreaView style={css.container}>
			<ScrollView>
				<View>
					<FlatList
						data={perfil}
						renderItem={({ item }) => (
							<View>
								<ListItem>
									<ListItem.Content>
										<View style={css.inline}>
											<ListItem.Title style={css.name}>
												{item.client.user.nome}
											</ListItem.Title>
											<ListItem.Title style={css.value}>
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
													style={css.infoContentTitle}
												>
													Idade:{' '}
												</Text>
												{item.client.user.idade}
											</ListItem.Title>
											<ListItem.Title
												style={css.infoContent}
											>
												<Text
													style={css.infoContentTitle}
												>
													Abordagem:{' '}
												</Text>
												{item.metodologia}
											</ListItem.Title>
											<ListItem.Title
												style={css.infoContent}
											>
												<Text
													style={css.infoContentTitle}
												>
													Faixa etária:{' '}
												</Text>
												{item.prefFaixaEtaria}
											</ListItem.Title>
											<ListItem.Title
												style={css.infoContent}
											>
												<Text
													style={css.infoContentTitle}
												>
													Tempo de Sessão:{' '}
												</Text>
												{'' + item.tempoSessao}
											</ListItem.Title>
											<Text style={css.infoContentTitle}>
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
					{hasSchedule ? (
						<>
							<View style={css.btn}>
								<TouchableOpacity style={css.inline}>
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
							<View>
								<Text style={css.scheduleTitle}>
									Horarios Disponiveis
								</Text>
							</View>
							<View style={css.infoContent}>
								{segunda.length != 0 && segunda !== [] ? (
									<View>
										<Text style={css.scheduleSubtitle}>
											Segunda
										</Text>
									</View>
								) : null}

								<FlatList
									data={segunda}
									horizontal
									keyExtractor={(item) => Number(item.id)}
									renderItem={({ item }) => {
										var varcount = 0;
										if (item.disponivel == true) {
											return (
												<View>
													<ListItem>
														<ListItem.Content>
															<ListItem.Title
																style={
																	css.schedulesTouchable
																}
															>
																<TouchableOpacity>
																	<Text
																		style={
																			css.schedules
																		}
																	>
																		{
																			item.horarioDisponivel
																		}
																	</Text>
																</TouchableOpacity>
															</ListItem.Title>
														</ListItem.Content>
													</ListItem>
												</View>
											);
										} else {
											varcount++;
											console.log(
												varcount +
													'tamamho ' +
													segunda.length
											);
											varcount == segunda.length ? (
												<View>
													<ListItem>
														<ListItem.Content>
															<ListItem.Title
																style={
																	css.inactiveSchedule
																}
															>
																<Text>
																	Horário
																	Indisponível
																</Text>
															</ListItem.Title>
														</ListItem.Content>
													</ListItem>
												</View>
											) : null;
										}
									}}
								/>

								{terca.length != 0 && terca !== [] ? (
									<View>
										<Text style={css.scheduleSubtitle}>
											Terça
										</Text>
									</View>
								) : null}
								<FlatList
									data={terca}
									horizontal
									keyExtractor={(item) => Number(item.id)}
									renderItem={({ item }) => {
										let varcountterca = 0;
										if (item.disponivel == true) {
											return (
												<View>
													<ListItem>
														<ListItem.Content>
															<ListItem.Title
																style={
																	css.schedulesTouchable
																}
															>
																<TouchableOpacity>
																	<Text
																		style={
																			css.schedules
																		}
																	>
																		{
																			item.horarioDisponivel
																		}
																	</Text>
																</TouchableOpacity>
															</ListItem.Title>
														</ListItem.Content>
													</ListItem>
												</View>
											);
										} else {
											varcountterca = varcountterca + 1;
											if (varcountterca == terca.length) {
												return (
													<View>
														<ListItem>
															<ListItem.Content>
																<ListItem.Title
																	style={
																		css.inactiveSchedule
																	}
																>
																	<Text>
																		Horário
																		Indisponível
																	</Text>
																</ListItem.Title>
															</ListItem.Content>
														</ListItem>
													</View>
												);
											} else {
												null;
											}
										}
									}}
								/>

								{quarta.length != 0 && quarta !== [] ? (
									<View>
										<Text style={css.scheduleSubtitle}>
											Quarta
										</Text>
									</View>
								) : null}
								<FlatList
									data={quarta}
									horizontal
									keyExtractor={(item) => Number(item.id)}
									renderItem={({ item }) => {
										let varcountquarta = 0;
										if (item.disponivel == true) {
											return (
												<View>
													<ListItem>
														<ListItem.Content>
															<ListItem.Title
																style={
																	css.schedulesTouchable
																}
															>
																<TouchableOpacity>
																	<Text
																		style={
																			css.schedules
																		}
																	>
																		{
																			item.horarioDisponivel
																		}
																	</Text>
																</TouchableOpacity>
															</ListItem.Title>
														</ListItem.Content>
													</ListItem>
												</View>
											);
										} else {
											varcountquarta = varcountquarta + 1;
											if (
												varcountquarta == quarta.length
											) {
												return (
													<View>
														<ListItem>
															<ListItem.Content>
																<ListItem.Title
																	style={
																		css.inactiveSchedule
																	}
																>
																	<Text>
																		Horário
																		Indisponível
																	</Text>
																</ListItem.Title>
															</ListItem.Content>
														</ListItem>
													</View>
												);
											} else {
												null;
											}
										}
									}}
								/>
								{quinta.length != 0 && quinta.segunda !== [] ? (
									<View>
										<Text style={css.scheduleSubtitle}>
											Quinta
										</Text>
									</View>
								) : null}
								<FlatList
									data={quinta}
									horizontal
									keyExtractor={(item) => Number(item.id)}
									renderItem={({ item }) => {
										let varcountquinta = 0;
										if (item.disponivel == true) {
											return (
												<View>
													<ListItem>
														<ListItem.Content>
															<ListItem.Title
																style={
																	css.schedulesTouchable
																}
															>
																<TouchableOpacity>
																	<Text
																		style={
																			css.schedules
																		}
																	>
																		{
																			item.horarioDisponivel
																		}
																	</Text>
																</TouchableOpacity>
															</ListItem.Title>
														</ListItem.Content>
													</ListItem>
												</View>
											);
										} else {
											varcountquinta = varcountquinta + 1;
											console.log(
												varcountquinta +
													'tamamho ' +
													quinta.length
											);
											if (
												varcountquinta == quinta.length
											) {
												return (
													<View>
														<ListItem>
															<ListItem.Content>
																<ListItem.Title
																	style={
																		css.inactiveSchedule
																	}
																>
																	<Text>
																		Horário
																		Indisponível
																	</Text>
																</ListItem.Title>
															</ListItem.Content>
														</ListItem>
													</View>
												);
											} else {
												null;
											}
										}
									}}
								/>
								{sexta.length != 0 && sexta !== [] ? (
									<View>
										<Text style={css.scheduleSubtitle}>
											Sexta
										</Text>
									</View>
								) : null}
								<FlatList
									data={sexta}
									horizontal
									keyExtractor={(item) => Number(item.id)}
									renderItem={({ item }) => {
										let varcountsexta = 0;
										if (item.disponivel == true) {
											return (
												<View>
													<ListItem>
														<ListItem.Content>
															<ListItem.Title
																style={
																	css.schedulesTouchable
																}
															>
																<TouchableOpacity>
																	<Text
																		style={
																			css.schedules
																		}
																	>
																		{
																			item.horarioDisponivel
																		}
																	</Text>
																</TouchableOpacity>
															</ListItem.Title>
														</ListItem.Content>
													</ListItem>
												</View>
											);
										} else {
											varcountsexta = varcountsexta + 1;
											if (varcountsexta == sexta.length) {
												return (
													<View>
														<ListItem>
															<ListItem.Content>
																<ListItem.Title
																	style={
																		css.inactiveSchedule
																	}
																>
																	<Text>
																		Horário
																		Indisponível
																	</Text>
																</ListItem.Title>
															</ListItem.Content>
														</ListItem>
													</View>
												);
											} else {
												null;
											}
										}
									}}
								/>
								{sabado.length != 0 && sabado !== [] ? (
									<View>
										<Text style={css.scheduleSubtitle}>
											Sabádo
										</Text>
									</View>
								) : null}
								<FlatList
									data={sabado}
									horizontal
									keyExtractor={(item) => Number(item.id)}
									renderItem={({ item }) => {
										let varcountsabado = 0;
										if (item.disponivel == true) {
											return (
												<View>
													<ListItem>
														<ListItem.Content>
															<ListItem.Title
																style={
																	css.schedulesTouchable
																}
															>
																<TouchableOpacity>
																	<Text
																		style={
																			css.schedules
																		}
																	>
																		{
																			item.horarioDisponivel
																		}
																	</Text>
																</TouchableOpacity>
															</ListItem.Title>
														</ListItem.Content>
													</ListItem>
												</View>
											);
										} else {
											varcountsabado = varcountsabado + 1;
											if (
												varcountsabado == sabado.length
											) {
												return (
													<View>
														<ListItem>
															<ListItem.Content>
																<ListItem.Title
																	style={
																		css.inactiveSchedule
																	}
																>
																	<Text>
																		Horário
																		Indisponível
																	</Text>
																</ListItem.Title>
															</ListItem.Content>
														</ListItem>
													</View>
												);
											} else {
												null;
											}
										}
									}}
								/>
								{domingo.length != 0 && domingo !== [] ? (
									<View>
										<Text style={css.scheduleSubtitle}>
											Domingo
										</Text>
									</View>
								) : null}
								<FlatList
									data={domingo}
									horizontal
									keyExtractor={(item) => Number(item.id)}
									renderItem={({ item }) => {
										let varcountdomingo = 0;
										if (item.disponivel == true) {
											return (
												<View>
													<ListItem>
														<ListItem.Content>
															<ListItem.Title
																style={
																	css.schedulesTouchable
																}
															>
																<TouchableOpacity>
																	<Text
																		style={
																			css.schedules
																		}
																	>
																		{
																			item.horarioDisponivel
																		}
																	</Text>
																</TouchableOpacity>
															</ListItem.Title>
														</ListItem.Content>
													</ListItem>
												</View>
											);
										} else {
											varcountdomingo =
												varcountdomingo + 1;
											if (
												varcountdomingo ==
												domingo.length
											) {
												return (
													<View>
														<ListItem>
															<ListItem.Content>
																<ListItem.Title
																	style={
																		css.inactiveSchedule
																	}
																>
																	<Text>
																		Horário
																		Indisponível
																	</Text>
																</ListItem.Title>
															</ListItem.Content>
														</ListItem>
													</View>
												);
											} else {
												null;
											}
										}
									}}
								/>
							</View>
						</>
					) : (
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
									<TouchableOpacity onPress={onClickInsert}>
										<Text style={css.btnTxtQueue}>
											Entre na fila
										</Text>
									</TouchableOpacity>
								</View>
							)}
						</>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
