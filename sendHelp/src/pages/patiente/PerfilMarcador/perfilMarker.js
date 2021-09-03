import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	Pressable,
	TouchableOpacity,
	SafeAreaView,
	FlatList,
	SectionList,
	ScrollView,
	StyleSheet,
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

	const { valorid } = route.route.params;
	const { token, user } = useAuth();

	useEffect(() => {
		async function getData() {
			try {
				const valorrequest = valorid;
				console.log('VALOR DA PAGINA' + valorid);
				console.log('VALOR DE REQUEST' + valorrequest);
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
				console.log(scheduledata.data);
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
							</View>
						)}
					/>

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
                  varcount += 1;
									console.log(
										`valor tamanho: ${segunda.length} \n valor varCount ${varcount}`
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
															Horário Indisponível
														</Text>
													</ListItem.Title>
												</ListItem.Content>
											</ListItem>
										</View>
									) : (
										(varcount = varcount + 1)
									);
								}
							}}
						/>

						{terca.length != 0 && terca !== [] ? (
							<View>
								<Text style={css.scheduleSubtitle}>Terça</Text>
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
								<Text style={css.scheduleSubtitle}>Quarta</Text>
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
									if (varcountquarta == quarta.length) {
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
								<Text style={css.scheduleSubtitle}>Quinta</Text>
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
										`valor tamanho: ${quinta.length} \n valor varCount ${varcountquinta}`
									);
									if (varcountquinta == quinta.length) {
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
								<Text style={css.scheduleSubtitle}>Sexta</Text>
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
								<Text style={css.scheduleSubtitle}>Sabádo</Text>
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
									if (varcountsabado == sabado.length) {
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
									varcountdomingo = varcountdomingo + 1;
									if (varcountdomingo == domingo.length) {
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
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 2,
		paddingHorizontal: 6,
		borderRadius: 12,
		elevation: 2,
		backgroundColor: 'lightgray',
	},
	buttoncontato: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderRadius: 12,
		elevation: 5,
		backgroundColor: 'lightgray',
	},
	text: {
		fontSize: 16,
		marginLeft: 12,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},
	container: {
		flex: 1,
		margin: 12,
	},
	Title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	texttitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	viewtitle: {
		flex: 2,
		alignContent: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		width: '100%',
	},
	valorConsulta: {
		color: '#2CAF29',
		fontSize: 20,
		fontWeight: '900',
	},
	listsview: {
		margin: 20,
	},
});
