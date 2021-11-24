import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Button, Platform, Alert } from 'react-native';
import { css } from '../../css/style';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { instance } from '../../config/axios';
import Filters from '../../components/patiente/filter/Filter';
import { useFilter } from '../../context/Filter';
import { useAuth } from '../../context/Auth';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MapPatiente(navigation) {
	const [origin, setOrigin] = useState(null);
	const [psychologist, setPsychologist] = useState(null);
	const { filters } = useFilter();
	const { token, user, setUser } = useAuth();
	const { navigate } = useNavigation();
	const [expoPushToken, setExpoPushToken] = useState(user.notitoken);

	async function registerForPushNotificationsAsync() {
		if (Constants.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } =
					await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			const token = (await Notifications.getExpoPushTokenAsync()).data;
			setExpoPushToken(token);
		} else {
			alert('Must use physical device for Push Notifications');
		}

		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}
	}

	useEffect(() => {
		async function saveUser() {
			await instance
				.put(
					`/update_userToken/${user.id}`,
					{
						notitoken: expoPushToken,
					},
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
				)
				.then((response) => {
					AsyncStorage.removeItem('@sendHelp:user');
					const data = { ...user, notitoken: expoPushToken };
					AsyncStorage.setItem(
						'@sendHelp:user',
						JSON.stringify(data)
					);
					if (response.status === 200) {
						setUser(data);
					}
				})
				.catch((err) => console.log(err));
		}

		saveUser();
	}, [expoPushToken]);

	useEffect(() => {
		if (!user.notitoken) {
			registerForPushNotificationsAsync();
		} else {
			return;
		}
	}, []);

	useEffect(() => {
		(async function getLocationAsync() {
			const { status } = await Location.requestPermissionsAsync();
			if (status === 'granted') {
				let location = await Location.getCurrentPositionAsync({
					enableHighAccuracy: true,
					psychologist,
				});
				setOrigin({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.1922,
					longitudeDelta: 0.1421,
				});
			} else {
				throw new Error('Localização não autorizada');
			}
		})();
	}, []);

	useEffect(() => {
		async function fetch() {
			try {
				if (filters.abordagem == null) {
					filters.abordagem = '';
				}
				if (filters.tipoAtendimento == null) {
					filters.tipoAtendimento = '';
				}
				if (filters.valor == null) {
					filters.valor = '';
				}
				if (filters.genero == null) {
					filters.genero = '';
				}
				if (filters.faixaEtaria == null) {
					filters.faixaEtaria = '';
				}
				if (filters.tempoSessao == null) {
					filters.tempoSessao = '';
				}
				const { data } = await instance.get(
					`/filter?abordagem=${filters.abordagem}&
												tipoAtendimento=${filters.tipoAtendimento}&
												valor=${filters.valor}&
												genero=${filters.genero}&
												faixaEtaria=${filters.faixaEtaria}&
												tempoSessao=${filters.tempoSessao}`,
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
				);
				setPsychologist(data);
			} catch (err) {
				console.error(err);
			}
		}

		fetch();
	}, [filters]);

	return (
		<View style={css.container}>
			<MapView
				style={css.map}
				initialRegion={origin}
				showsUserLocation={true}
				loadingEnabled={false}
				zoomEnabled={true}
				showsMyLocationButton={true}
			>
				{psychologist &&
					psychologist.map((psychologist, index) => (
						<Marker
							key={index}
							coordinate={{
								latitude: Number(psychologist.latitude),
								longitude: Number(psychologist.longitude),
							}}
							onPress={(e) => {
								navigate('ProfileMarker', {
									valorid: psychologist.id,
								});
							}}
						>
							<AntDesign
								name='enviroment'
								size={24}
								color='#054781'
							/>
						</Marker>
					))}
			</MapView>
			<Filters cssName={'mapa'} />

			<StatusBar style='auto' />
		</View>
	);
}
